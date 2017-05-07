import { validator } from '../utils/validator.js';

let Comment = (function() {
    class Comment {
        constructor(text) {
            this.text = text;
        }
        
        get text() {
			return this._text;
		}
        
		set text(value) {
            validator.validateIfUndefinedOrNull(value, 'Text');
			validator.validateTypeOf(value, 'Text', 'string');
            validator.validateIfEmptyString(value, 'Text');
			this._text = value;
		}
    }

    return Comment;
})();

export { Comment };