import { router } from './routing.js';

console.log('stana');

$(function(){
    $('#categories').change(function () {
        let category = $(this).val();
        let url = '/categories/' + category;
        window.location.hash = url;
        console.log('select Changed');
    });
});

router.init();