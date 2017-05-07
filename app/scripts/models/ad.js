import { validator } from '../utils/validator.js';

let Ad = (function() {
    class Ad {
        constructor(title) {
            this.title = title;
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
    }

    return Ad;
})();

export { Ad };