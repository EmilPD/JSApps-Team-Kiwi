import { validator } from '../utils/validator.js';
import { Person } from './person.js';

let User = (function() {
    class User extends Person {
        constructor(name, username, password) {
            super(name);
            this.username = username;
            this.password = password;
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
    }

    return User;
})();

export { User };