const validator = {
    validateTypeOf: (value, property, type) => {
        if (typeof value !== type) {
            toastr.error(property + ' is not of type ' + type);
            throw new Error(property + ' is not of type ' + type);
        }
    },
    validateIfEmptyString: (value, property) => {
        if (value === '') {
            toastr.error(property + ' is Empty');
            throw new Error(property + ' is Empty');
        }
    },
    validateIfUndefinedOrNull: (value, property) => {
        if (typeof value === 'undefined' || value === null) {
            toastr.error(property + ' is undefined or null');
            throw new Error(property + ' is undefined or null');
        }
    },
    validateIsInstanceOf: (value, property, type) => {
        if (!(value instanceof type)) {
            toastr.error(property + ' is not an instance of ' + type);
            throw new Error(property + ' is not an instance of ' + type);
        }
    },
    validateEmail: (email) => {
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(email)) {
            console.log('regex.test.email ' + regex.test(email));
            toastr.error('Invalid Email');
            throw new Error('Invalid Email');
        }
    },
    validatePhone: (phone) => {
        let regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (!regex.test(phone)) {
            console.log('regex.test.phone ' + regex.test(phone));
            toastr.error('Invalid Phone');
            throw new Error('Invalid Phone');
        }
    },
    validatePassword: (password) => {
        let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!regex.test(password)) {
            console.log('regex.test.password ' + regex.test(password));
            toastr.error('Password has to be Minimum 8 characters at least 1 Alphabet and 1 Number');
            throw new Error('Password has to be Minimum 8 characters at least 1 Alphabet and 1 Number');
        }
    },
    validateUsername: (username) => {
        let regex = /^[A-Za-z0-9_-]*[A-Za-z0-9][A-Za-z0-9_-]*$/;
        if (!regex.test(username)) {
            console.log('regex.test.username ' + regex.test(username));
            toastr.error('Username contain invalid symbols');
            throw new Error('Username contain invalid symbols');
        }
    }
};

export { validator };