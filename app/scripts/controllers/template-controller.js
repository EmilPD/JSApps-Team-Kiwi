import { templateLoader as tl} from '../template-loader.js';

let TemplateController = (function() {
    class TemplateController {
        loadHome() {
            Promise.all([tl.loadTemplate('home')])
                .then((template) => $('#main').html(template))
                .catch(console.log);
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
    }

    return TemplateController;
})();

export { TemplateController };