import { TemplateController } from './controllers/template-controller.js';

let router = (() => {
    let navigo,
        controller;

    function init() {
        navigo = new Navigo(null, true);
        controller = new TemplateController();

        navigo.on({
            '/': () => {
                console.log('initial from router');
                controller.loadHome();
            },
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
            'logout': () => {
                console.log('logout from router');
                controller.loadLogout();
            },
            'postfreead': () => {
                console.log('post free ad from router');
                controller.loadPostFreeAd();
            },
            'categories/:categoryName': (params) => {
                console.log('categories from router - Category Name: ' + params.categoryName);
                if (params.categoryName === 'all') {
                    console.log('home from category all');
                    controller.loadHome();
                } else {
                    controller.loadCategory(params.categoryName);
                }
            },
            'classifieds/:id': (params) => {
                console.log('classifieds from router - classifieds Id: ' + params.id);
                controller.loadAd(params.id);
            }
        }).resolve();

        // navigo.notFound(() => {
        //     Promise.all([tl.loadTemplate('pageNotFound')])
        //         .then(([template]) => $('#container').html(template(template)))
        //         .catch(console.log);
        // });
        
    }
    return {
        init
    };

})();

export { router };