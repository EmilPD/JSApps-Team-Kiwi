import { data } from '../scripts/data/data';
import { requester } from '../scripts/requester';
    
describe('Categories tests', () => {
    
    const categoryName = 'garden';
    const response = {
        result: categoryName
    }
    
    let requesterGetStub;

    beforeEach(() => {
        requesterGetStub = sinon.stub(requester, 'get');
    });

    afterEach(() => {
        requesterGetStub.restore();
    });

    it('expect categories.get to make a GET request', (done) => {

        requesterGetStub.returns(Promise.resolve(response));

        data.categories.get(categoryName)
            .then(() => {
                expect(requesterGetStub).to.have.been.calledOnce;
            })
            .then(done, done);
    });

    it('expect categories.get to make a GET request to /api/categories/garden when category name is (garden)', (done) => {

        requesterGetStub.returns(Promise.resolve(response));

        data.categories.get(categoryName)
            .then(() => {
                expect(requesterGetStub).to.have.been.calledWith(`/api/categories/${categoryName}`);
            })
            .then(done, done);
    });

});