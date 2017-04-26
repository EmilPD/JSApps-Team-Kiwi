import { router } from './routing.js';
//import { db } from './controllers/data-controller.js';

console.log('stana');

$(function(){
    $('#categories').change(function () {
        var url = '/category/' + $(this).val();
        window.location.hash = url;
        console.log('select Changed');
    });
});

router.init();