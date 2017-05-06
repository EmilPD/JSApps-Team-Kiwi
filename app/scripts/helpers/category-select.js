let categorySelect = (function() {
    $('#categories').change(function () {
        let category = $(this).val();
        let url = '/categories/' + category;
        window.location.hash = url;
    });
}());

export { categorySelect };