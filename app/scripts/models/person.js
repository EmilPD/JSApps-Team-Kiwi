import { validator } from '../utils/validator.js';

let Person = (function() {
    class Person {
        constructor(name) {
            this.name = name;
        }

        get name() {
            return this._name;
        }

        set name(value) {
            validator.validateIfUndefinedOrNull(value, 'Name');
            validator.validateTypeOf(value, 'Name', 'string');
            validator.validateIfEmptyString(value, 'Name');
            this._name = value;
        }
    }

    return Person;
})();

export { Person };