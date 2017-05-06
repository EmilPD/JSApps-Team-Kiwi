import { validator } from '../utils/validator.js';
//const validator = require('../utils/validator.js');

let User = (function() {
    class User {
        constructor(name, username, password, phone, email) {
            this.name = name;
            this.username = username;
            this.password = password;
            this.phone = phone;
            this.email = email;
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

        get username() {
            return this._username;
        }

        set username(value) {
            validator.validateIfUndefinedOrNull(value, 'Username');
            validator.validateUsername(value);
            validator.validateIfEmptyString(value, 'Username');
            this._username = value;
        }

        get password() {
            return this._password;
        }

        set password(value) {
            validator.validateIfUndefinedOrNull(value, 'Password');
            validator.validatePassword(value);
            validator.validateIfEmptyString(value, 'Password');
            this._password = value;
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

    return User;
})();

export { User };