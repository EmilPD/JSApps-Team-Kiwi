const templateLoader = (() => {
    const cache = {};

    function loadTemplate(templateName) {
        return new Promise((resolve, reject) => {
            if (cache[templateName]) {
                resolve(cache[templateName]);
            } else {
                $.get(`../templates/${templateName}.handlebars`)
                    .done((data) => {
                        let template = Handlebars.compile(data);
                        cache[templateName] = template;
                        resolve(template);
                    })
                    .fail(() => {
                        //debugger;
                        reject();
                    });
            }
        });
    }
    return {
        loadTemplate
    };
})();

export { templateLoader };
