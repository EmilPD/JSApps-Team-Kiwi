import { data } from '../scripts/data/data';
import { requester } from '../scripts/requester';

describe('Users tests', () => {
    const LOCALSTORAGE_AUTH_KEY_NAME = 'kiwi-auth-key';
    const LOCALSTORAGE_USER_NAME_KEY = 'kiwi-user-name-key';

    const clearLocalStorage = () => {
        localStorage.removeItem(LOCALSTORAGE_USER_NAME_KEY);
        localStorage.removeItem(LOCALSTORAGE_AUTH_KEY_NAME);
    };

    let requesterPostStub;
    const passHash = 'qwerty_pass_hash'; // dali da se trie

    const user = {
            name: 'dandan',
            username: 'testuser',
            password: 'dandan68',
            authKey: 'some_key',
        };

    const response = {
        result: {
            username: user.username
        }
    };

    beforeEach(clearLocalStorage);
    afterEach(clearLocalStorage);

    describe('Register tests', () => {
        
        beforeEach(() => {
            requesterPostStub = sinon.stub(requester, 'post');
        });

        afterEach(() => {
            requesterPostStub.restore();
        });

        it('expect register to make a POST request', (done) => {

            requesterPostStub.returns(Promise.resolve(response));

            data.users.register(user)
                .then(() => {
                    expect(requesterPostStub).to.have.been.calledOnce;
                })
                .then(done, done);
        });

        it('expect register to make a POST request to /api/auth/register', (done) => {

            requesterPostStub.returns(Promise.resolve(response));

            data.users.register(user)
                .then(() => {
                    expect(requesterPostStub).to.have.been.calledWith('/api/auth/register');
                })
                .then(done, done);
        });

        it('expect register to make a POST request with user data (username)', (done) => {

            requesterPostStub.returns(Promise.resolve(response));

            data.users.register(user)
                .then(() => {
                    const expected = {
                        result: {
                            username: user.username
                        }
                    };
                    expect(requesterPostStub.args[0][1].username).to.equal(user.username);
                })
                .then(done, done);
        });




        it('expect register function to return a Promise', () => {

            requesterPostStub.returns(Promise.resolve(response));

            const promise = data.users.register(user);
            expect(promise).to.be.an.instanceof(Promise);
        });

        it('expect register function to return a Promise which resolves with registered username', (done) => {

            requesterPostStub.returns(Promise.resolve(response));

            data.users.register(user)
                .then((value) => {
                    const expected = {
                        result : {
                            username: user.username
                        }
                    };

                    expect(value).to.deep.equal(expected);
                })
                .then(done, done);
        });

    });

    describe('Login tests', () => {

        beforeEach(() => {
            requesterPostStub = sinon.stub(requester, 'put');
        });

        afterEach(() => {
            requesterPostStub.restore();
        });

        it('expect login to make a PUT request', (done) => {

            requesterPostStub.returns(Promise.resolve(response));

            data.users.login(user)
                .then(() => {
                    expect(requesterPostStub).to.have.been.calledOnce;
                })
                .then(done, done);

        });

        it('expect login to make a PUT request to /api/auth/login', (done) => {

            requesterPostStub.returns(Promise.resolve(response));

            data.users.login(user)
                .then(() => {
                    expect(requesterPostStub).to.have.been.calledWith('/api/auth/login');
                })
                .then(done, done);
        });

        it('expect authKey to be set in localStorage', (done) => {

            const response = {
                result: {
                    username: user.username,
                    authKey: 'qwerty_key'
                }
            };

            requesterPostStub.returns(Promise.resolve(response));

            data.users.login(user)
                .then(() => {
                    expect(localStorage.getItem(LOCALSTORAGE_AUTH_KEY_NAME)).to.equal(response.result.authKey);
                })
                .then(done, done);

        });

        it('expect login function to return a Promise', () => {

            requesterPostStub.returns(Promise.resolve(response));

            const promise = data.users.login(user);
            expect(promise).to.be.an.instanceof(Promise);

        });

    });

    describe('Logout tests', () => {

        it('expect name to be cleared from localStorage', (done) => {
            data.users.logout()
                .then(expect(localStorage.getItem(LOCALSTORAGE_USER_NAME_KEY)).to.be.null)
                .then(done, done);
        });

        it('expect authKey to be cleared from localStorage', (done) => {
            data.users.logout()
                .then(expect(localStorage.getItem(LOCALSTORAGE_AUTH_KEY_NAME)).to.be.null)
                .then(done, done);
        });

        it('expect logout function to return a Promise', () => {
            const promise = data.users.logout();
            expect(promise).to.be.an.instanceof(Promise);
        });

    });

    describe('hasUser tests', () => {

        it('expect hasUser() to return false when no one is logged in', () => {
            expect(data.users.hasUser()).to.be.false;
        });

        it('expect hasUser() to return false when authKey is missing from localStorage', () => {
            localStorage.setItem(LOCALSTORAGE_USER_NAME_KEY, 'dandan');
            expect(data.users.hasUser()).to.be.false;
        });

        it('expect hasUser() to return false when user name is missing from localStorage', () => {
            localStorage.setItem(LOCALSTORAGE_AUTH_KEY_NAME, 'qwerty_key');
            expect(data.users.hasUser()).to.be.false;
        });

        it('expect hasUser() to return true when both user name and authKey are available in localStorage', () => {
            localStorage.setItem(LOCALSTORAGE_USER_NAME_KEY, 'dandan');
            localStorage.setItem(LOCALSTORAGE_AUTH_KEY_NAME, 'qwerty_key');
            expect(data.users.hasUser()).to.be.true;
        });

    });

    describe('getUser tests', () => {

        it('expect getUser() to return null when no one is logged in', () => {
            expect(data.users.getUser()).to.be.null;
        });

        it('expect getUser() to return user name when it is available in localStorage', () => {
            const name = 'dandan';
            localStorage.setItem(LOCALSTORAGE_USER_NAME_KEY, name);
            expect(data.users.getUser()).to.equal(name);
        });

    });

});