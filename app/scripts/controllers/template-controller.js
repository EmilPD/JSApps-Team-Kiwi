import { templateLoader as tl} from '../template-loader.js';
import { data } from '../data/data.js';

let TemplateController = (function() {
    class TemplateController {
        loadHome() {
            data.getCategory('all')
            .then((data) => {
                Promise.all([data, tl.loadTemplate('home')])
                    .then(([data, template]) => {
                        $('#main').html(template(data));
                    })
                    .catch(console.log);
            })
        }

        loadLogin() {
            Promise.all([tl.loadTemplate('login')])
                .then((template) => $('#main').html(template))
                .catch(console.log);
        }

        loadRegister() {
            Promise.all([tl.loadTemplate('register')])
                .then((template) => $('#main').html(template))
                .catch(console.log);
        }

        loadPostFreeAd() {
            Promise.all([tl.loadTemplate('postfreead')])
                .then((template) => $('#main').html(template))
                .catch(console.log);
        }
		
		loadCategory(categoryName) {
            data.getCategory(categoryName)
            .then((data) => {
                //console.log(data + ' from templ. controller');
                Promise.all([data, tl.loadTemplate('category')])
                    .then(([data, template]) => $('#main').html(template(data)))
                    .catch(console.log);
            })
        }
    }

    return TemplateController;
})();

export { TemplateController };