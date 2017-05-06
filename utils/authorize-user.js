const AUTH_KEY_HEADER_NAME = 'kiwi-auth-key';
module.exports = function(app, db) {
  app.use(function(req, res, next) {
    let authKey = req.headers[AUTH_KEY_HEADER_NAME];
    let user = db.get('users')
      .find({ authKey: authKey })
      .value();
    req.user = user || null;
    next();
  });
};