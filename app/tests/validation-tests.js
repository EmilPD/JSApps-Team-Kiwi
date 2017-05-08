import { validator } from '../app/scripts/utils/validator';

describe('Validation tests', function() {
    let undefinedName; // Undefined argument
    const name = 'Dan4o';
    const property = 'Name';
    const typeString = 'string';
    const typeArray = 'Array';
    const validString = 'valid string';
    const validEmail = 'proba@proba.com';
    const inValidEmail = '@proba@proba.com';
    const validPhone = '0898998877';
    const inValidPhone = '230-34_23';
    const validUsername = 'user1';
    const inValidUsername = '@dsan_';
    const validPassword = 'dandan13';
    const inValidPassword = 'dandandan'; // Valid Password must have at least 1 digit

    describe('String validation tests', () => {

        it('validateIfEmptyString should not throw when valid non empty string is provided', function() {
            expect(() => validator.validateIfEmptyString(validString)).to.not.throw();
        });

        it('validateIfEmptyString should throw when empty string is provided', function() {
            expect(() => validator.validateIfEmptyString('')).to.throw();
        });

    });

    describe('Type validation tests', () => {

        it('validateTypeOf should not throw when valid argument is provided', function() {
            expect(() => validator.validateTypeOf(name, property, typeString)).to.not.throw();
        });

        it('validateTypeOf should throw when the argument provided is of different than expected Type', function() {
            expect(() => validator.validateTypeOf(name, property, typeArray)).to.throw();
        });

    });

    describe('Undefined or Null validation tests', () => {
        
        it('validateIfUndefinedOrNull should not throw when valid argument is provided', function() {
            expect(() => validator.validateIfUndefinedOrNull(name, property)).to.not.throw();
        });

        it('validateIfUndefinedOrNull should throw when the argument provided is undefined', function() {
            expect(() => validator.validateIfUndefinedOrNull(undefinedName, property)).to.throw();
        });

        it('validateIfUndefinedOrNull should throw when the argument provided is null', function() {
            expect(() => validator.validateIfUndefinedOrNull(null, property)).to.throw();
        });

    });

    describe('Email validation tests', () => {

        it('validateEmail should not throw when valid Email is provided', function() {
            expect(() => validator.validateEmail(validEmail)).to.not.throw();
        });
        
        it('validateEmail should throw when invalid Email is provided', function() {
            expect(() => validator.validateEmail(inValidEmail)).to.throw();
        });

    });

    describe('Phone validation tests', () => {
        
        it('validatePhone should not throw when valid Phone is provided', function() {
            expect(() => validator.validatePhone(validPhone)).to.not.throw();
        });
        
        it('validatePhone should throw when invalid Phone is provided', function() {
            expect(() => validator.validatePhone(inValidPhone)).to.throw();
        });

    });

    describe('Username validation tests', () => {
        
        it('validateUsername should not throw when valid Username is provided', function() {
            expect(() => validator.validateUsername(validUsername)).to.not.throw();
        });
        
        it('validateUsername should throw when invalid Username is provided', function() {
            expect(() => validator.validateUsername(inValidUsername)).to.throw();
        });

    });

    describe('Password validation tests', () => {
        
        it('validatePassword should not throw when valid Password is provided', function() {
            expect(() => validator.validatePassword(validPassword)).to.not.throw();
        });
        
        it('validatePassword should throw when invalid Password is provided', function() {
            expect(() => validator.validatePassword(inValidPassword)).to.throw();
        });

    });
});

console.log('first test');