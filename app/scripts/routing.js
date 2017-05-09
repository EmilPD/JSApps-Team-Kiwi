import { TemplateController } from './controllers/template-controller.js';

let router = (() => {
    let navigo,
        controller;

    function init() {
        navigo = new Navigo(null, true);
        controller = new TemplateController();

        navigo.on({
            '/': () => {
                controller.loadHome();
            },
            'home': () => {
                controller.loadHome();
            },
            'register': () => {
                controller.loadRegister();
            },
            'login': () => {
                controller.loadLogin();
            },
            'logout': () => {
                controller.loadLogout();
            },
            'postfreead': () => {
                controller.loadPostFreeAd();
            },
            'categories/:categoryName': (params) => {
                if (params.categoryName === 'all') {
                    controller.loadHome();
                } else {
                    controller.loadCategory(params.categoryName);
                }
            },
            'classifieds/:id': (params) => {
                controller.loadAd(params.id);
            }
        }).resolve();

        navigo.notFound(() => {
            controller.loadPageNotFound();
        }).resolve();
        
    }
    return {
        init
    };

})();

export { router };