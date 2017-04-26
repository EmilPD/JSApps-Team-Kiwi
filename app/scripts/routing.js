import { TemplateController } from './controllers/template-controller.js';

var router = (() => {
    let navigo,
        controller;

    function init() {
        navigo = new Navigo(null, true);
        controller = new TemplateController();

        navigo.on({
            'home': () => {
                console.log('home from router');
                controller.loadHome();
            },
            'register': () => {
                console.log('register from router');
                controller.loadRegister();
            },
            'login': () => {
                console.log('login from router');
                controller.loadLogin();
            },
            'postfreead': () => {
                console.log('post free ad from router');
                controller.loadPostFreeAd();
            },
        }).resolve();
    }
    return {
        init
    };

})();

export { router };