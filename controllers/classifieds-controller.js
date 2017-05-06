let _ = require('lodash');

module.exports = function(db) {

  function getCount(req, res) {
    let count = db.get('categories')
      .reduce((acc, val) => acc.concat( val.ads ), [])
      .value()
      .length;
      
    res.json({
      result: {
        count: count
      }
    });
  }

  function get(req, res) {
    let adId = Number(req.params.id);
    let foundAd = db.get('categories')
      .reduce((acc, val) => acc.concat( val.ads ), [])
      .find({ id: adId })
      .value();

    res.json({
      result: foundAd
    });
  }

  function post(req, res) {
    let categoryName = req.params.category;
    let reqAd = req.body;
    let reqUser = req.user;
    if (!reqUser || typeof reqUser.username !== 'string') {
      res.status(400)
        .json('You must login in order to post ads!');
      return;
    }

    let allClassifiedsCount = db.get('categories')
      .reduce((acc, val) => acc.concat( val.ads ), [])
      .value()
      .length;

    console.log('allClassifiedsCount ', allClassifiedsCount);
    
    db.get('categories')
      .find({ shortname: categoryName })
      .get('ads')
      .push({
        id: allClassifiedsCount + 1,
        title: reqAd.title,
        description: reqAd.description,
        phone: reqUser.phone,
        email: reqUser.email,
        date: new Date()
      })
      .write();

      let newAd = db.get('categories')
        .find({ shortname: categoryName })
        .get('ads')
        .last()
        .value();

    res.status(200)
    .json({
      result: newAd
    });
  }

  return {
    getCount: getCount,
    get: get,
    post: post
  };
};