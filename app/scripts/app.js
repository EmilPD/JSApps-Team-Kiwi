import { router } from './routing.js';
    
$('#main').on('click', function (ev) {
    let target = ev.target;
    let article = $(target).closest('article');
    let adId = article.data('ad-id');
    
    if (adId) {
        let url = '/classifieds/' + adId;
        window.location.hash = url;
    }
});

router.init();