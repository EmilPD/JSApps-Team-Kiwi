const templateLoader = (() => {
    const cache = {};

    function loadTemplate(templateName, path) {
        const templatePath = path || `../templates/${templateName}.handlebars`;
        return new Promise((resolve, reject) => {
            if (cache[templateName]) {
                resolve(cache[templateName]);
            } else {
                $.get(templatePath)
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
