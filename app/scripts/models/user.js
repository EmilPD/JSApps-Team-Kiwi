let User = (function() {
    class User {
        constructor(name, username, password, phone, email) {
            this.name = name;
            this.username = username;
            this.password = password;
            this.phone = phone;
            this.email = email;
        }

    return User;
})();

export { User };