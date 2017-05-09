import { data } from '../scripts/data/data';
import { requester } from '../scripts/requester';
    
describe('Classifieds tests', () => {
    
    const LOCALSTORAGE_AUTH_KEY_NAME = 'kiwi-auth-key';
    const LOCALSTORAGE_USER_NAME_KEY = 'kiwi-user-name-key';

    const clearLocalStorage = () => {
        localStorage.removeItem(LOCALSTORAGE_USER_NAME_KEY);
        localStorage.removeItem(LOCALSTORAGE_AUTH_KEY_NAME);
    };

    beforeEach(clearLocalStorage);
    afterEach(clearLocalStorage);
    
    let requesterGetStub,
        requesterPostStub;

    const newAd = {
        category: 'garden',
        title: 'new title',
        description: 'new description',
        price: '300'
    }

    const response = {
        result: newAd
    }

    beforeEach(() => {
        requesterGetStub = sinon.stub(requester, 'get');
        requesterPostStub = sinon.stub(requester, 'post');
    });

    afterEach(() => {
        requesterGetStub.restore();
        requesterPostStub.restore();
    });

    describe('getCount tests', () => {

        const count = 20;
        const response = {
            result: {
                count: count
            }
        }

        it('expect getCount to make a GET request', (done) => {

            requesterGetStub.returns(Promise.resolve(response));

            data.classifieds.getCount()
                .then(() => {
                    expect(requesterGetStub).to.have.been.calledOnce;
                })
                .then(done, done);
        });

        it('expect getCount to make a GET request to /api/classifieds/count', (done) => {

            requesterGetStub.returns(Promise.resolve(response));

            data.classifieds.getCount()
                .then(() => {
                    expect(requesterGetStub).to.have.been.calledWith('/api/classifieds/count');
                })
                .then(done, done);
        });

        it('expect getCount function to return a Promise', () => {

            requesterGetStub.returns(Promise.resolve(response));

            const promise = data.classifieds.getCount();
            expect(promise).to.be.an.instanceof(Promise);

        });

    });

    describe('get tests', () => {

        const id = 10;

        it('expect get to make a GET request', (done) => {

            requesterGetStub.returns(Promise.resolve(response));

            data.classifieds.get()
                .then(() => {
                    expect(requesterGetStub).to.have.been.calledOnce;
                })
                .then(done, done);
        });

        it('expect get to make a GET request to /api/classifieds/10 when (id) is equal to 10', (done) => {

            requesterGetStub.returns(Promise.resolve(response));

            data.classifieds.get(id)
                .then(() => {
                    expect(requesterGetStub).to.have.been.calledWith(`/api/classifieds/${id}`);
                })
                .then(done, done);
        });

        it('expect get function to return a Promise', () => {

            requesterGetStub.returns(Promise.resolve(response));

            const promise = data.classifieds.get(id);
            expect(promise).to.be.an.instanceof(Promise);

        });

    });

    describe('post tests', () => {

        it('expect post to make a POST request', (done) => {

            requesterPostStub.returns(Promise.resolve(response));

            data.classifieds.post(newAd)
                .then(() => {
                    expect(requesterPostStub).to.have.been.calledOnce;
                })
                .then(done, done);
        });

        it('expect post to make a POST request to /api/classifieds/garden when called with (garden)', (done) => {

            requesterPostStub.returns(Promise.resolve(response));

            data.classifieds.post(newAd)
                .then(() => {
                    expect(requesterPostStub).to.have.been.calledWith(`/api/classifieds/${newAd.category}`);
                })
                .then(done, done);
        });

        it('expect post function to make a POST request to /api/classifieds/garden with authKey header', (done) => {
            
            const options = {
                headers: {
                    [LOCALSTORAGE_AUTH_KEY_NAME]: 'kiwi_valid_key'
                }
            };

            requesterPostStub.returns(Promise.resolve(response));

            localStorage.setItem(LOCALSTORAGE_USER_NAME_KEY, 'Dan4o');
            localStorage.setItem(LOCALSTORAGE_AUTH_KEY_NAME, options.headers[LOCALSTORAGE_AUTH_KEY_NAME]);

            data.classifieds.post(newAd)
                .then(() => {
                    expect(requesterPostStub.args[0][2]).to.deep.equal(options.headers);
                })
                .then(done, done);
        });

        it('expect post function to return a Promise', () => {

            requesterPostStub.returns(Promise.resolve(response));

            const promise = data.classifieds.post(newAd);
            expect(promise).to.be.an.instanceof(Promise);

        });

    });

    describe('postComment tests', () => {

        const comment = {
            id: 10,
            text: 'some random text'
        };

        const response = {
            result: 'Comment posted successfully!'
        }

        it('expect postComment to make a POST request', (done) => {

            requesterPostStub.returns(Promise.resolve(response));

            data.classifieds.postComment(comment)
                .then(() => {
                    expect(requesterPostStub).to.have.been.calledOnce;
                })
                .then(done, done);
        });

        it('expect postComment to make a POST request to /api/comments/10 when called with (id) equal to (10)', (done) => {

            requesterPostStub.returns(Promise.resolve(response));

            data.classifieds.postComment(comment)
                .then(() => {
                    expect(requesterPostStub).to.have.been.calledWith(`/api/comments/${comment.id}`);
                })
                .then(done, done);
        });

        it('expect postComment function to make a POST request to /api/comments/10 with authKey header', (done) => {
            
            const options = {
                headers: {
                    [LOCALSTORAGE_AUTH_KEY_NAME]: 'kiwi_valid_key'
                }
            };

            requesterPostStub.returns(Promise.resolve(response));

            localStorage.setItem(LOCALSTORAGE_USER_NAME_KEY, 'Dan4o');
            localStorage.setItem(LOCALSTORAGE_AUTH_KEY_NAME, options.headers[LOCALSTORAGE_AUTH_KEY_NAME]);

            data.classifieds.postComment(comment)
                .then(() => {
                    expect(requesterPostStub.args[0][2]).to.deep.equal(options.headers);
                })
                .then(done, done);
        });

        it('expect postComment function to return a Promise', () => {

            requesterPostStub.returns(Promise.resolve(response));

            const promise = data.classifieds.postComment(comment);
            expect(promise).to.be.an.instanceof(Promise);

        });

    });

});