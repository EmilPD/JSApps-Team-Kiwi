import { validator } from '../scripts/utils/validator';
import { Comment } from '../scripts/models/comment'
import { Ad } from '../scripts/models/ad'
import { SmallAd } from '../scripts/models/small-ad'
import { Offer } from '../scripts/models/offer'
import { Person } from '../scripts/models/person'
import { User } from '../scripts/models/user'
import { VIPUser } from '../scripts/models/vip-user'

describe('Models tests', () => {
    let validatorTypeOfStub,
        validatorIfEmptyStringStub,
        validatorIfUndefinedOrNullStub,
        validatorEmailStub,
        validatorPhoneStub,
        validatorPasswordStub,
        validatorUsernameStub,
        validatorIfNumberStub;

    beforeEach(() => {
        validatorTypeOfStub = sinon.stub(validator, 'validateTypeOf');
        validatorIfEmptyStringStub = sinon.stub(validator, 'validateIfEmptyString');
        validatorIfUndefinedOrNullStub = sinon.stub(validator, 'validateIfUndefinedOrNull');
        validatorEmailStub = sinon.stub(validator, 'validateEmail');
        validatorPhoneStub = sinon.stub(validator, 'validatePhone');
        validatorPasswordStub = sinon.stub(validator, 'validatePassword');
        validatorUsernameStub = sinon.stub(validator, 'validateUsername');
        validatorIfNumberStub = sinon.stub(validator, 'validateIfNumber');
    });

    afterEach(() => {
        validatorTypeOfStub.restore();
        validatorIfEmptyStringStub.restore();
        validatorIfUndefinedOrNullStub.restore();
        validatorEmailStub.restore();
        validatorPhoneStub.restore();
        validatorPasswordStub.restore();
        validatorUsernameStub.restore();
        validatorIfNumberStub.restore();
    });

    describe('Comment tests', () => {

        const expectedText = 'Comment text';

        it('Expect Comment to be created with passed text when valid text is provided', () => {

            const sut = new Comment(expectedText);

            expect(sut.text).to.equal(expectedText);
            
        });

        it('Expect Comment constructor to call validator to check if the passed value is undefined or null', () => {

            const sut = new Comment(expectedText);

            expect(validatorIfUndefinedOrNullStub).to.have.been.calledWith(expectedText);

        });

        it('Expect Comment constructor to call validator to check typeof the passed value', () => {

            const sut = new Comment(expectedText);

            expect(validatorTypeOfStub).to.have.been.calledWith(expectedText);

        });

        it('Expect Comment constructor to call validator to check if the passed value is empty string', () => {

            const sut = new Comment(expectedText);

            expect(validatorIfEmptyStringStub).to.have.been.calledWith(expectedText);

        });
        
    });

    describe('Ad tests', () => {

        const expectedTitle = 'title';

        it('Expect Ad to be created with passed initial title when valid title is provided', () => {

            const sut = new Ad(expectedTitle);

            expect(sut.title).to.equal(expectedTitle);
            
        });

        it('Expect Ad constructor to call validator to check if the passed value is undefined or null', () => {

            const sut = new Ad(expectedTitle);

            expect(validatorIfUndefinedOrNullStub).to.have.been.calledWith(expectedTitle);

        });

        it('Expect Ad constructor to call validator to check typeof the passed value', () => {

            const sut = new Ad(expectedTitle);

            expect(validatorTypeOfStub).to.have.been.calledWith(expectedTitle);

        });

        it('Expect Ad constructor to call validator to check if the passed value is empty string', () => {

            const sut = new Ad(expectedTitle);

            expect(validatorIfEmptyStringStub).to.have.been.calledWith(expectedTitle);

        });
        
    });

    describe('SmallAd tests', () => {

        const expectedTitle = 'title';
        const expectedDescription = 'description';

        it('Expect SmallAd to be created with passed initial properties when valid properties are provided', () => {

            const sut = new SmallAd(expectedTitle, expectedDescription);

            expect(sut.title).to.equal(expectedTitle);
            expect(sut.description).to.equal(expectedDescription);
            
        });

        it('Expect SmallAd constructor to call validator to check if the passed values are undefined or null', () => {

            const sut = new SmallAd(expectedTitle, expectedDescription);

            expect(validatorIfUndefinedOrNullStub).to.have.been.calledWith(expectedTitle);
            expect(validatorIfUndefinedOrNullStub).to.have.been.calledWith(expectedDescription);

        });

        it('Expect SmallAd constructor to call validator to check typeof the passed values', () => {

            const sut = new SmallAd(expectedTitle, expectedDescription);

            expect(validatorTypeOfStub).to.have.been.calledWith(expectedTitle);
            expect(validatorTypeOfStub).to.have.been.calledWith(expectedDescription);

        });

        it('Expect SmallAd constructor to call validator to check if the passed values are empty string', () => {

            const sut = new SmallAd(expectedTitle, expectedDescription);

            expect(validatorIfEmptyStringStub).to.have.been.calledWith(expectedTitle);
            expect(validatorIfEmptyStringStub).to.have.been.calledWith(expectedDescription);

        });
        
    });

    describe('Offer tests', () => {

        const expectedTitle = 'title';
        const expectedDescription = 'description';
        const expectedPrice = '999';

        it('Expect Offer to be created with passed initial properties when valid properties are provided', () => {

            const sut = new Offer(expectedTitle, expectedDescription, expectedPrice);

            expect(sut.title).to.equal(expectedTitle);
            expect(sut.description).to.equal(expectedDescription);
            expect(sut.price).to.equal(expectedPrice);
            
        });

        it('Expect Offer constructor to call validator to check if the passed values are undefined or null', () => {

            const sut = new Offer(expectedTitle, expectedDescription, expectedPrice);

            expect(validatorIfUndefinedOrNullStub).to.have.been.calledWith(expectedTitle);
            expect(validatorIfUndefinedOrNullStub).to.have.been.calledWith(expectedDescription);
            expect(validatorIfUndefinedOrNullStub).to.have.been.calledWith(expectedPrice);

        });

        it('Expect Offer constructor to call validator to check typeof the passed values', () => {

            const sut = new Offer(expectedTitle, expectedDescription, expectedPrice);

            expect(validatorTypeOfStub).to.have.been.calledWith(expectedTitle);
            expect(validatorTypeOfStub).to.have.been.calledWith(expectedDescription);

        });

        it('Expect Offer constructor to call validator to check if the passed values are empty string', () => {

            const sut = new Offer(expectedTitle, expectedDescription, expectedPrice);

            expect(validatorIfEmptyStringStub).to.have.been.calledWith(expectedTitle);
            expect(validatorIfEmptyStringStub).to.have.been.calledWith(expectedDescription);
            expect(validatorIfEmptyStringStub).to.have.been.calledWith(expectedPrice);

        });

        it('Expect Offer constructor to call validator to check if the price is number', () => {

            const sut = new Offer(expectedTitle, expectedDescription, expectedPrice);

            expect(validatorIfNumberStub).to.have.been.calledWith(expectedPrice);

        });
        
    });

    describe('Person tests', () => {

        const expectedName = 'name';

        it('Expect Person to be created with passed name when valid name is provided', () => {

            const sut = new Person(expectedName);

            expect(sut.name).to.equal(expectedName);
            
        });

        it('Expect Person constructor to call validator to check if the passed value is undefined or null', () => {

            const sut = new Person(expectedName);

            expect(validatorIfUndefinedOrNullStub).to.have.been.calledWith(expectedName);

        });

        it('Expect Person constructor to call validator to check typeof the passed value', () => {

            const sut = new Person(expectedName);

            expect(validatorTypeOfStub).to.have.been.calledWith(expectedName);

        });

        it('Expect Person constructor to call validator to check if the passed value is empty string', () => {

            const sut = new Person(expectedName);

            expect(validatorIfEmptyStringStub).to.have.been.calledWith(expectedName);

        });
        
    });

    describe('User tests', () => {

        const expectedName = 'name';
        const expectedUsername = 'dandan';
        const expectedPassword = 'dandan68';

        it('Expect User to be created with passed parameters when valid parameters are provided', () => {

            const sut = new User(expectedName, expectedUsername, expectedPassword);

            expect(sut.name).to.equal(expectedName);
            expect(sut.username).to.equal(expectedUsername);
            expect(sut.password).to.equal(expectedPassword);
            
        });

        it('Expect User constructor to call validator to check if the passed values are undefined or null', () => {

            const sut = new User(expectedName, expectedUsername, expectedPassword);

            expect(validatorIfUndefinedOrNullStub).to.have.been.calledWith(expectedName);
            expect(validatorIfUndefinedOrNullStub).to.have.been.calledWith(expectedUsername);
            expect(validatorIfUndefinedOrNullStub).to.have.been.calledWith(expectedPassword);

        });

        it('Expect User constructor to call validator to check if the passed values are empty string', () => {

            const sut = new User(expectedName, expectedUsername, expectedPassword);

            expect(validatorIfEmptyStringStub).to.have.been.calledWith(expectedName);
            expect(validatorIfEmptyStringStub).to.have.been.calledWith(expectedUsername);
            expect(validatorIfEmptyStringStub).to.have.been.calledWith(expectedPassword);

        });

        it('Expect User constructor to call validator to check if username is valid', () => {

            const sut = new User(expectedName, expectedUsername, expectedPassword);

            expect(validatorUsernameStub).to.have.been.calledWith(expectedUsername);

        });

        it('Expect User constructor to call validator to check if password is valid', () => {

            const sut = new User(expectedName, expectedUsername, expectedPassword);

            expect(validatorPasswordStub).to.have.been.calledWith(expectedPassword);

        });
        
    });

    describe('VIP User tests', () => {

        const expectedName = 'name';
        const expectedUsername = 'dandan';
        const expectedPassword = 'dandan68';
        const expectedPhone = '0899999999';
        const expectedEmail = 'dandan68@dan.bg';

        it('Expect VIP User to be created with passed parameters when valid parameters are provided', () => {

            const sut = new VIPUser(expectedName, expectedUsername, expectedPassword, expectedPhone, expectedEmail);

            expect(sut.name).to.equal(expectedName);
            expect(sut.username).to.equal(expectedUsername);
            expect(sut.password).to.equal(expectedPassword);
            
        });

        it('Expect VIP User constructor to call validator to check if the passed values are undefined or null', () => {

            const sut = new VIPUser(expectedName, expectedUsername, expectedPassword, expectedPhone, expectedEmail);

            expect(validatorIfUndefinedOrNullStub).to.have.been.calledWith(expectedName);
            expect(validatorIfUndefinedOrNullStub).to.have.been.calledWith(expectedUsername);
            expect(validatorIfUndefinedOrNullStub).to.have.been.calledWith(expectedPassword);
            expect(validatorIfUndefinedOrNullStub).to.have.been.calledWith(expectedPhone);
            expect(validatorIfUndefinedOrNullStub).to.have.been.calledWith(expectedEmail);

        });

        it('Expect VIP User constructor to call validator to check if the passed values are empty string', () => {

            const sut = new VIPUser(expectedName, expectedUsername, expectedPassword, expectedPhone, expectedEmail);

            expect(validatorIfEmptyStringStub).to.have.been.calledWith(expectedName);
            expect(validatorIfEmptyStringStub).to.have.been.calledWith(expectedUsername);
            expect(validatorIfEmptyStringStub).to.have.been.calledWith(expectedPassword);
            expect(validatorIfEmptyStringStub).to.have.been.calledWith(expectedPhone);
            expect(validatorIfEmptyStringStub).to.have.been.calledWith(expectedEmail);

        });

        it('Expect VIP User constructor to call validator to check if username is valid', () => {

            const sut = new VIPUser(expectedName, expectedUsername, expectedPassword, expectedPhone, expectedEmail);

            expect(validatorUsernameStub).to.have.been.calledWith(expectedUsername);

        });

        it('Expect VIP User constructor to call validator to check if password is valid', () => {

            const sut = new VIPUser(expectedName, expectedUsername, expectedPassword, expectedPhone, expectedEmail);

            expect(validatorPasswordStub).to.have.been.calledWith(expectedPassword);

        });

        it('Expect VIP User constructor to call validator to check if phone is valid', () => {

            const sut = new VIPUser(expectedName, expectedUsername, expectedPassword, expectedPhone, expectedEmail);

            expect(validatorPhoneStub).to.have.been.calledWith(expectedPhone);

        });

        it('Expect VIP User constructor to call validator to check if email is valid', () => {

            const sut = new VIPUser(expectedName, expectedUsername, expectedPassword, expectedPhone, expectedEmail);

            expect(validatorEmailStub).to.have.been.calledWith(expectedEmail);

        });
        
    });

});