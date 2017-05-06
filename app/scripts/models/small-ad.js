import { validator } from '../utils/validator.js';

let SmallAd = (function() {
    class SmallAd {
        constructor(title, description) {
            this.title = title;
            this.description = description;
        }

        get title() {
            return this._title;
        }

        set title(value) {
            validator.validateIfUndefinedOrNull(value, 'Title');
            validator.validateTypeOf(value, 'Title', 'string');
            validator.validateIfEmptyString(value, 'Title');
            this._title = value;
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