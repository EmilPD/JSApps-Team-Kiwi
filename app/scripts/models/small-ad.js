import { validator } from '../utils/validator.js';
import { Ad } from './ad.js';

let SmallAd = (function() {
    class SmallAd extends Ad {
        constructor(title, description) {
            super(title)
            this.description = description;
        }

        get description() {
			return this._description;
		}
        
		set description(value) {
            validator.validateIfUndefinedOrNull(value, 'Description');
			validator.validateTypeOf(value, 'Description', 'string');
            validator.validateIfEmptyString(value, 'Description');
			this._description = value;
		}
    }

    return SmallAd;
})();

export { SmallAd };