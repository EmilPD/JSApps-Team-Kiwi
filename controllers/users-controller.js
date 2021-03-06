const CryptoJS = require('../node_modules/crypto-js/index.js');

module.exports = function(db) {
  const AUTH_KEY_LENGTH = 60;
  const AUTH_KEY_CHARS = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM!@#$%^&*()_+-=';

  function generateAuthKey(uniquePart) {
    let authKey = uniquePart;
    let index;

    while (authKey.length < AUTH_KEY_LENGTH) {
      index = Math.floor(Math.random() * AUTH_KEY_CHARS.length);
      authKey += AUTH_KEY_CHARS[index];
    }

    return authKey;
  }

  function get(req, res) {
    let user = req.user;
    if (!user) {
      res.status(401)
        .json('Unauthorized user!');
      return;
    }
    let users = db.get('users')
      .map(function(user) {
        return {
          username: user.username,
          id: user.id
        };
      });

    res.json({
      result: users
    });
  }

  function post(req, res) {
    let reqUser = req.body;
    if (!reqUser || typeof reqUser.username !== 'string') {
      res.status(400)
        .json('Invalid data');
      return;
    }
    
    let dbUser = db.get('users')
      .find({ username: reqUser.username })
      .value();

    if (dbUser) {
      res.status(400)
        .json('Duplicated user');
      return;
    }
    
    const passHash = CryptoJS.SHA1(reqUser.username + reqUser.password).toString();

    let userCount = db.get('users')
      .value()
      .length;

    if (typeof reqUser.phone === 'undefined' && typeof reqUser.email === 'undefined') {
      db.get('users')
      .push({
        id: userCount + 1,
        status: 'normal',
        name: reqUser.name,
        username: reqUser.username,
        passHash: passHash
      })
      .write();
    } else {
      db.get('users')
      .push({
        id: userCount + 1,
        status: 'vip',
        name: reqUser.name,
        username: reqUser.username,
        passHash: passHash,
        phone: reqUser.phone,
        email: reqUser.email
      })
      .write();
    }
      
    res.status(201)
      .json({
        result: {
          username: reqUser.username
        }
      });
  }

  function put(req, res) {
    let reqUser = req.body;
    let user = db.get('users')
      .find({ username: reqUser.username })
      .value();

    if (!user) {
      res.status(404)
        .json('Invalid username');
      return;
    }
    const passHash = CryptoJS.SHA1(reqUser.username + reqUser.password).toString();
    if (user.passHash !== passHash) {
      res.status(404)
        .json('Invalid password');
      return;
    }
    if (!user.authKey) {
      user.authKey = generateAuthKey(user.passHash);
      db.write();
    }

    res.json({
      result: {
        name: user.name,
        username: user.username,
        authKey: user.authKey
      }
    });
  }

  return {
    get: get,
    post: post,
    put: put
  };
};