import { templateLoader as tl} from '../template-loader.js';
import { requester } from '../requester.js';
import { data } from '../data/data.js';
import { handlebarsSubstr } from '../helpers/handlebars-substr.js';
import { User } from '../models/user.js';
import { VIPUser } from '../models/vip-user';
import { SmallAd } from '../models/small-ad.js';
import { Offer } from '../models/offer.js';
import { Comment } from '../models/comment.js';

let commentData = data;

let TemplateController = (function() {
    class TemplateController {
        hideLoginRegister() {
            if (data.users.hasUser()) {
                $('#login-register-links').addClass('hidden');
                $('#logout-link').removeClass('hidden');
            }
        }

        loadTopContainer() {
            Promise.all([data.classifieds.getCount(), tl.loadTemplate('classifiedscount')])
                .then(([data, template]) => $('#classifieds-count').html(template(data)))
                .catch(console.log);
        }

        loadHome() {
            this.loadTopContainer();
            Promise.all([data.categories.get('all'), tl.loadTemplate('home')])
                .then(([data, template]) =>  $('#main').html(template(data)))
                .catch(console.log);
        }

        loadLogin() {
            let self = this;
            this.loadTopContainer();

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
                                self.hideLoginRegister();
                                toastr.success(`Hi, ${username}`);
                                location.href = '#/postfreead';
                            },
                            errorMsg => toastr.error(errorMsg.responseJSON));
                    });
                    
                })
                .catch(console.log);
        }

        loadRegister() {
            this.loadTopContainer();

            Promise.all([tl.loadTemplate('register')])
                .then((template) => $('#main').html(template))
                .then(() => {
                        let userType = $('#user-type').val;
                        if (userType === 'normal') {
                            $('#vip-user-info').addClass('hidden');
                        }
                        else if (userType === 'vip') {
                            $('#vip-user-info').removeClass('hidden');
                        }
                        $('#user-type').change(function () {
                            userType = $(this).val();
                            if (userType === 'normal') {
                                $('#vip-user-info').addClass('hidden');
                            }
                            else if (userType === 'vip') {
                                $('#vip-user-info').removeClass('hidden');
                            }
                        });

                    $('#register-form').on('submit', function(e) {
                        e.preventDefault();

                        userType = $('#user-type').val();
                        const name = $('#input-name').val();
                        const username = $('#input-username').val();
                        const password = $('#input-password').val();
                        const phone = $('#input-phone').val();
                        const email = $('#input-email').val();

                        let newUser;
                        if (userType == 'normal') {
                            newUser = new User(name, username, password);
                        }
                        else if (userType == 'vip') {
                            newUser = new VIPUser(name, username, password, phone, email);
                        }
                        
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
                this.hideLoginRegister();
            }

            this.loadTopContainer();

            Promise.all([tl.loadTemplate('postfreead')])
                .then((template) => $('#main').html(template))
                .then(() => {
                    let adType = $('#select-ad-type').val;
                        if (adType === 'smallad') {
                            $('#offer-info').addClass('hidden');
                        }
                        else if (adType === 'offer') {
                            $('#offer-info').removeClass('hidden');
                        }
                        $('#select-ad-type').change(function () {
                            adType = $(this).val();
                            if (adType === 'smallad') {
                                $('#offer-info').addClass('hidden');
                            }
                            else if (adType === 'offer') {
                                $('#offer-info').removeClass('hidden');
                            }
                        });

                    $('#post-ad-form').on('submit', function(e) {
                        e.preventDefault();

                        adType = $('#select-ad-type').val();
                        const category = $('#select-ad-category').val();
                        const title = $('#ad-title').val();
                        const description = $('#ad-description').val();
                        const price = $('#offer-price').val();

                        let newAd,
                            Ad;
                        if (adType === 'smallad') {
                            Ad = new SmallAd(title, description);
                            console.log('Ad smallad', Ad);
                            newAd = {
                                category: category,
                                title: Ad.title,
                                description: Ad.description
                            }
                        }
                        else if (adType === 'offer') {
                            Ad = new Offer(title, description, price);
                            console.log('Ad offer', Ad);
                            newAd = {
                                category: category,
                                title: Ad.title,
                                description: Ad.description,
                                price: Ad.price
                            }
                        }
                        
                        data.classifieds.post(newAd)
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
            this.loadTopContainer();

            data.categories.get(categoryName)
            .then((data) => {
                Promise.all([data, tl.loadTemplate('category')])
                    .then(([data, template]) => $('#main').html(template(data)))
                    .catch(console.log);
            })
        }

        loadAd(id) {
            $("#add-new-comment-btn").off();
            $("#submit-comment").off();
            let self = this;
            this.hideLoginRegister();
            this.loadTopContainer();

            data.classifieds.get(id)
            .then((result) => {
                Promise.all([result, tl.loadTemplate('singlead')])
                    .then(([result, template]) => $('#main').html(template(result)))
                    .then(() => {
                        $(function() {
                            $("#comment-dialog").dialog({
                                autoOpen: false,
                                maxWidth:600,
                                maxHeight: 400,
                                width: 480,
                                height: 330,
                            });
                            $("#add-new-comment-btn").on("click", function() { 
                                $("#comment-dialog").dialog("open");
                            });
                        });
                        
                        $("#submit-comment").on('click', function(e) {
                            e.preventDefault();
                            $("#comment-dialog").dialog("close");

                            let commentText = $("#comment-text").val();
                            let newComment = new Comment(commentText);

                            let adId = window.location.hash.replace(/\D/g, '');

                            let newCommentWithId = {
                                id: adId,
                                text: newComment.text
                            };

                            data.classifieds.postComment(newCommentWithId)
                            .then(
                                result => {
                                    toastr.success(`Your comment was posted successfully`);
                                    self.loadAd(id);
                                },
                                errorMsg => {
                                    toastr.error(errorMsg.responseJSON);
                                }
                            );
                        });
                    })
                    .catch(console.log);
            })
            
        }
    }

    return TemplateController;
})();

export { TemplateController };