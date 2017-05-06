import { templateLoader as tl} from '../template-loader.js';
import { requester } from '../requester.js';
import { data } from '../data/data.js';
import { handlebarsSubstr } from '../helpers/handlebars-substr.js';
import { User } from '../models/user.js';
import { SmallAd } from '../models/small-ad.js';

let TemplateController = (function() {
    class TemplateController {
        hideLoginRegister() {
            if (data.users.hasUser()) {
                $('#login-register-links').addClass('hidden');
                $('#logout-link').removeClass('hidden');
            }
        }

        loadHome() {
            data.classifieds.getCount()
            .then((data) => {
                Promise.all([data, tl.loadTemplate('top')])
                    .then(([data, template]) => $('#top-container').html(template(data)))
                    .then(() => {
                        $('#categories').change(function () {
                            let category = $(this).val();
                            let url = '/categories/' + category;
                            window.location.hash = url;
                        });
                    });
            });

            data.categories.get('all')
            .then((data) => {
                Promise.all([data, tl.loadTemplate('home')])
                    .then(([data, template]) =>  $('#main').html(template(data)))
                    .catch(console.log);
            })
        }

        loadLogin() {
            data.classifieds.getCount()
            .then((data) => {
                Promise.all([data, tl.loadTemplate('top')])
                    .then(([data, template]) => $('#top-container').html(template(data)))
                    .then(() => {
                        $('#categories').change(function () {
                            let category = $(this).val();
                            let url = '/categories/' + category;
                            window.location.hash = url;
                        });
                    });
            });

            Promise.all([tl.loadTemplate('login')])
                .then((template) => $('#main').html(template))
                .then(() => {
                    $('#login-form').on('submit', function(e) {
                        e.preventDefault();

                        const username = $('#input-username').val();
                        const password = $('#input-password').val();

                        data.users.login(username, password)
                        .then(
                            result => {
                                $('#login-register-links').addClass('hidden');
                                $('#logout-link').removeClass('hidden');
                                toastr.success(`Hi, ${username}`);
                                location.href = '#/postfreead';
                            },
                            errorMsg => toastr.error(errorMsg.responseJSON));
                    });
                    
                })
                .catch(console.log);
        }

        loadRegister() {
            data.classifieds.getCount()
            .then((data) => {
                Promise.all([data, tl.loadTemplate('top')])
                    .then(([data, template]) => $('#top-container').html(template(data)))
                    .then(() => {
                        $('#categories').change(function () {
                            let category = $(this).val();
                            let url = '/categories/' + category;
                            window.location.hash = url;
                        });
                    });
            });

            Promise.all([tl.loadTemplate('register')])
                .then((template) => $('#main').html(template))
                .then(() => {
                    $('#register-form').on('submit', function(e) {
                        e.preventDefault();

                        const name = $('#input-name').val();
                        const username = $('#input-username').val();
                        const password = $('#input-password').val();
                        const phone = $('#input-phone').val();
                        const email = $('#input-email').val();

                        let newUser = new User(name, username, password, phone, email);

                        data.users.register(newUser)
                        .then(
                            result => {
                                toastr.success(`${name} with ${username} registered successfully`);
                                location.href = '#/login';
                            },
                            errorMsg => {
                                toastr.error(errorMsg.responseJSON);
                            }
                        );
                    });
                    
                })
                .catch(console.log);
        }

        loadLogout() {
            data.users.logout()
            .then(() => {
                $('#login-register-links').removeClass('hidden');
                $('#logout-link').addClass('hidden');
                toastr.success('Logged out');
                location.href = '#/home';
            })
            .catch(() => {
                toastr.error('Something bad happened - i cannot log you out')
            });
        }

        loadPostFreeAd() {
            if (!data.users.hasUser()) {
                toastr.error('You are not logged in');
                location.href = '#/login';
                return;
            }
            else {
                $('#login-register-links').addClass('hidden');
                $('#logout-link').removeClass('hidden');
            }

            data.classifieds.getCount()
            .then((data) => {
                Promise.all([data, tl.loadTemplate('top')])
                    .then(([data, template]) => $('#top-container').html(template(data)))
                    .then(() => {
                        $('#categories').change(function () {
                            let category = $(this).val();
                            let url = '/categories/' + category;
                            window.location.hash = url;
                        });
                    });
            });

            Promise.all([tl.loadTemplate('postfreead')])
                .then((template) => $('#main').html(template))
                .then(() => {
                    $('#post-ad-form').on('submit', function(e) {
                        e.preventDefault();

                        const category = $('#select-ad-category').val();
                        const title = $('#ad-title').val();
                        const description = $('#ad-description').val();

                        let smallAd = new SmallAd(title, description);
                        console.log('smallAd ', smallAd);
                        let adWithCategory = {
                            category: category,
                            title: smallAd.title,
                            description: smallAd.description
                        }
                        console.log('adWithCategory ', adWithCategory);
                        
                        data.classifieds.post(adWithCategory)
                        .then(
                            result => {
                                toastr.success(`New ad was posted`);
                                location.href = `#/classifieds/${result.result.id}`;
                            },
                            errorMsg => {
                                toastr.error(errorMsg.responseJSON);
                                location.href = '#/login';
                            }
                        );
                    });
                    
                })
                .catch(console.log);
        }

        loadCategory(categoryName) {
            this.hideLoginRegister();

            data.classifieds.getCount()
            .then((data) => {
                Promise.all([data, tl.loadTemplate('top')])
                    .then(([data, template]) => $('#top-container').html(template(data)))
                    .then(() => {
                        $('#categories').change(function () {
                            let category = $(this).val();
                            let url = '/categories/' + category;
                            window.location.hash = url;
                        });
                    });
            });

            data.categories.get(categoryName)
            .then((data) => {
                Promise.all([data, tl.loadTemplate('category')])
                    .then(([data, template]) => $('#main').html(template(data)))
                    .catch(console.log);
            })
        }

        loadAd(id) {
            this.hideLoginRegister();

            data.classifieds.getCount()
            .then((data) => {
                Promise.all([data, tl.loadTemplate('top')])
                    .then(([data, template]) => $('#top-container').html(template(data)))
                    .then(() => {
                        $('#categories').change(function () {
                            let category = $(this).val();
                            let url = '/categories/' + category;
                            window.location.hash = url;
                        });
                    });
            });

            data.classifieds.get(id)
            .then((data) => {
                Promise.all([data, tl.loadTemplate('singlead')])
                    .then(([data, template]) => $('#main').html(template(data)))
                    .catch(console.log);
            })
        }
    }

    return TemplateController;
})();

export { TemplateController };