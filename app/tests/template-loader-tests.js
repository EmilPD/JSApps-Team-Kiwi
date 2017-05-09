import { templateLoader as tl} from '../scripts/template-loader';

describe('Template loader tests', function () {

    let templatePath = `templates/${templateName}.handlebars`;
    let templateName;
    
    it('loadTemplate should compile template with no data', (done) => {

        templateName = 'nodata';

        const expectedTemplate = '<div class="template">Hello from loadTemplate function</div>';

        tl.loadTemplate(templateName, templatePath)
            .then((template) => { 
                expect(template()).to.be.equal(expectedTemplate);
            })
            .then(done, done);

    });

    it('should compile template with plain data', (done) => {

        templateName = 'plaindata';

        const data = {
            title: 'Hello from loadTemplate'
        }

        const expectedTemplate = '<div class="template">Hello from loadTemplate</div>';
        
        let promiseData = new Promise((resolve, reject) => {
            resolve(data);
        });

        Promise.all([promiseData, tl.loadTemplate(templateName, templatePath)])
            .then((data, template) => { 
                expect(template(data)).to.be.equal(expectedTemplate);
            })
            .then(done, done);

    });

    it('should compile template with conditional expression', (done) => {

        templateName = 'conditionaldata';

        const data = {
            title: 'Hello from loadTemplate',
            condition: true
        }

        const expectedTemplate = '<div class="template">Hello from loadTemplate</div>';
        
        let promiseData = new Promise((resolve, reject) => {
            resolve(data);
        });

        Promise.all([promiseData, tl.loadTemplate(templateName, templatePath)])
            .then((data, template) => { 
                expect(template(data)).to.be.equal(expectedTemplate);
            })
            .then(done, done);

    });

    it('should compile loop data', (done) => {

        templateName = 'loopdata';

        const data = {
            words: ['Hello', 'from', 'loadTemplate']
        }

        const expectedTemplate = '<div class="template">Hello from loadTemplate </div>';
        
        let promiseData = new Promise((resolve, reject) => {
            resolve(data);
        });

        Promise.all([promiseData, tl.loadTemplate(templateName, templatePath)])
            .then((data, template) => { 
                expect(template(data)).to.be.equal(expectedTemplate);
            })
            .then(done, done);

    });

    it('expect loadTemplate function to return a Promise', () => {

        let templateLoaderStub = sinon.stub(tl, 'loadTemplate');

        templateLoaderStub.returns(Promise.resolve('something'));

        const promise = tl.loadTemplate(templateName, templatePath);
        expect(promise).to.be.an.instanceof(Promise);

    });

});