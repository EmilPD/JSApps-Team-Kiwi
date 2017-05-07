import { validator } from '../utils/validator.js';
import { User } from './user.js';

let VIPUser = (function() {
    class VIPUser extends User {
        constructor(name, username, password, phone, email) {
            super(name, username, password);
            this.phone = phone;
            this.email = email;
        }

        get phone() {
            return this._phone;
        }

        set phone(value) {
            validator.validateIfUndefinedOrNull(value, 'Phone');
            validator.validatePhone(value);
            validator.validateIfEmptyString(value, 'Phone');
            this._phone = value;
        }

        get email() {
            return this._email;
        }

        set email(value) {
            validator.validateIfUndefinedOrNull(value, 'Email');
            validator.validateEmail(value);
            validator.validateIfEmptyString(value, 'Email');
            this._email = value;
        }
    }

    return VIPUser;
})();

export { VIPUser };