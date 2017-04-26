// import { dataServer } from './data/dataServer.js';
// import { data as comicData } from './data/data.js';
//import { templateLoader as tl } from './template-loader.js';
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
            //'details/:id': (params) => {
            //    controller.loadDetailedComicBook(params.id);
            //},
            // 'marvel': () => {
            //     comicData.getCategory('Marvel')
            //         .then((data) => {
            //             Promise.all([data, tl.loadTemplate('comicBooksPreview')])
            //                 .then(([data, template]) => $('#container').html(template(data)))
            //                 .catch(console.log);
            //         }, (error) => {
            //             alert(JSON.stringify(error));
            //         }).then(() => {
            //             $("#container-slider").removeClass('hidden');
            //         });
            // },
            // 'dc': () => {
            //     comicData.getCategory('DC Comics')
            //         .then((data) => {
            //             Promise.all([data, tl.loadTemplate('comicBooksPreview')])
            //                 .then(([data, template]) => $('#container').html(template(data)))
            //                 .catch(console.log);
            //         }, (error) => {
            //             alert(JSON.stringify(error));
            //         }).then(() => {
            //             $("#container-slider").removeClass('hidden');
            //         });
            // },
            // 'favorites': controller.loadFavorites,
            // 'hot': () => {
            //     Promise.all([dataServer.get.book(), tl.loadTemplate('readOnline')])
            //         .then(([data, template]) => {
            //             $("#comic-book-holder").removeClass('hidden');
            //             $("#container-slider").addClass('hidden');
            //             $('#container').append("<div id='hot' />");
            //             $("#hot").html(template(data[0]));
            //         })
            //         .catch(console.log);
            // },
            // 'hot/read': () => {
            //     Promise.all([dataServer.images.get(), tl.loadTemplate('gallery')])
            //         .then(([data, template]) => {
            //             $("#comic-book-holder").addClass('hidden');
            //             $("#container-slider").addClass('hidden');
            //             $('#container').html(template(data));
            //         })
            //         .catch(console.log);
            // }
        }).resolve();

        // navigo.notFound(() => {
        //     Promise.all([tl.loadTemplate('pageNotFound')])
        //         .then(([template]) => {
        //             $("#container-slider").addClass('hidden');
        //             $('#container').html(template(template));
        //         })
        //         .catch(console.log);

        // });
        // navigo
        //     .on('home', controller.loadHomeTemplate)
        //     .on('comic', controller.loadComicBooks)
        //     .on('contact', controller.loadContacts)
        //     .on('register', controller.loadRegister)
        //     .on('details/:id', (params) => {
        //         controller.loadDetailedComicBook(params.id);
        //     })
        //     .on('marvel', () => {
        //         comicData.getCategory('Marvel')
        //             .then((data) => {
        //                 Promise.all([data, tl.loadTemplate('comicBooksPreview')])
        //                     .then(([data, template]) => $('#container').html(template(data)))
        //                     .catch(console.log);
        //             }, (error) => {
        //                 alert(JSON.stringify(error));
        //             }).then(() => {
        //                 $("#container-slider").removeClass('hidden');
        //             });
        //     })
        //     .on('dc', () => {
        //         comicData.getCategory('DC Comics')
        //             .then((data) => {
        //                 Promise.all([data, tl.loadTemplate('comicBooksPreview')])
        //                     .then(([data, template]) => $('#container').html(template(data)))
        //                     .catch(console.log);
        //             }, (error) => {
        //                 alert(JSON.stringify(error));
        //             }).then(() => {
        //                 $("#container-slider").removeClass('hidden');
        //             });
        //     })
        //     .on('favorites', controller.loadFavorites)
        //     .on('hot', () => {
        //         Promise.all([dataServer.get.book(), tl.loadTemplate('readOnline')])
        //             .then(([data, template]) => {
        //                 $("#comic-book-holder").removeClass('hidden');
        //                 $("#container-slider").addClass('hidden');
        //                 $('#container').append("<div id='hot' />");
        //                 $("#hot").html(template(data[0]));
        //             })
        //             .catch(console.log);
        //     })
        //     .on('hot/read', () => {
        //         Promise.all([dataServer.images.get(), tl.loadTemplate('gallery')])
        //             .then(([data, template]) => {
        //                 $("#comic-book-holder").addClass('hidden');
        //                 $("#container-slider").addClass('hidden');
        //                 $('#container').html(template(data));
        //             })
        //             .catch(console.log);
        //     })
        //     .resolve();
    }
    return {
        init
    };

})();

export { router };