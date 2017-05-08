import { data } from '../scripts/data/data';
import { requester } from '../scripts/requester';
    
describe('Classifieds tests', () => {
    
    const count = 20;
    const response = {
        result: {
            count: count
        }
    }
    
    let requesterGetStub,
        requesterPostStub;

    beforeEach(() => {
        requesterGetStub = sinon.stub(requester, 'get');
        requesterPostStub = sinon.stub(requester, 'post');
    });

    afterEach(() => {
        requesterGetStub.restore();
        requesterPostStub.restore();
    });

    describe('getCount tests', () => {

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

    });

    describe('get tests', () => {

        it('expect get to make a GET request', (done) => {

            requesterGetStub.returns(Promise.resolve(response));

            data.classifieds.get()
                .then(() => {
                    expect(requesterGetStub).to.have.been.calledOnce;
                })
                .then(done, done);
        });

        it('expect get to make a GET request to /api/classifieds/10 when (id) is equal to 10', (done) => {

            const id = 10;

            requesterGetStub.returns(Promise.resolve(response));

            data.classifieds.get(id)
                .then(() => {
                    expect(requesterGetStub).to.have.been.calledWith(`/api/classifieds/${id}`);
                })
                .then(done, done);
        });

    });

});