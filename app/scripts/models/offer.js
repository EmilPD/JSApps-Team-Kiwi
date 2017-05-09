import { validator } from '../utils/validator.js';
import { SmallAd } from './small-ad.js';

let Offer = (function() {
    class Offer extends SmallAd {
        constructor(title, description, price) {
            super(title, description)
            this.price = price;
        }

        get price() {
			return this._price;
		}
        
		set price(value) {
            validator.validateIfUndefinedOrNull(value, 'Price');
            validator.validateIfNumber(value, 'Price');
            validator.validateIfEmptyString(value, 'Price');
			this._price = value;
		}
    }

    return Offer;
})();

export { Offer };