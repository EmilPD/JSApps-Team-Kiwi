import { requester } from '../requester.js';

let data = (function() {

    function getCategory(category) {
        return requester.get(`/api/categories/${category}`);
    }
    
    function login(username, passHash) {
        const body = {
            username,
            passHash
        };

        return requester.put('/api/auth', body);
    }

    function register(username, passHash) {
        const body = {
            username,
            passHash
        };

        return requester.post('/api/users', body);
    }

    return {
        getCategory,
        login,
        register
    };

})();

export { data };