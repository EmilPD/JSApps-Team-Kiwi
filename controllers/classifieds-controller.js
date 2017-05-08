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
    let price = reqAd.price;
    let reqUser = req.user;
    let catId = db.get('categories')
      .find({shortname: categoryName})
      .value()
      .id;

    if (!reqUser || typeof reqUser.username !== 'string') {
      res.status(400)
        .json('You must login in order to post ads!');
      return;
    }

    let allClassifiedsCount = db.get('categories')
      .reduce((acc, val) => acc.concat( val.ads ), [])
      .value()
      .length;

    if (typeof reqUser.phone === 'undefined' && typeof reqUser.email === 'undefined') {
      if (typeof price === 'undefined') {
        db.get('categories')
        .find({ shortname: categoryName })
        .get('ads')
        .push({
          id: allClassifiedsCount + 1,
          categoryid: catId,
          title: reqAd.title,
          description: reqAd.description,
          comments: [],
          date: new Date()
        })
        .write();
      } else {
        db.get('categories')
        .find({ shortname: categoryName })
        .get('ads')
        .push({
          id: allClassifiedsCount + 1,
          categoryid: catId,
          title: reqAd.title,
          price: price,
          description: reqAd.description,
          comments: [],
          date: new Date()
        })
        .write();
      }
      
    } else {
      if (typeof price === 'undefined') {
        db.get('categories')
          .find({ shortname: categoryName })
          .get('ads')
          .push({
            id: allClassifiedsCount + 1,
            categoryid: catId,
            title: reqAd.title,
            description: reqAd.description,
            phone: reqUser.phone,
            email: reqUser.email,
            comments: [],
            date: new Date()
          })
          .write();
      } else {
        db.get('categories')
          .find({ shortname: categoryName })
          .get('ads')
          .push({
            id: allClassifiedsCount + 1,
            categoryid: catId,
            title: reqAd.title,
            price: price,
            description: reqAd.description,
            phone: reqUser.phone,
            email: reqUser.email,
            comments: [],
            date: new Date()
          })
          .write();
      }
    }

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

  function postComment(req, res) {
    let adId = Number(req.params.id);
    
    let catId = db.get('categories')
      .reduce((acc, val) => acc.concat( val.ads ), [])
      .find({ id: adId })
      .value()
      .categoryid;

    let reqComment = req.body;
    let reqUser = req.user;
    if (!reqUser || typeof reqUser.username !== 'string') {
      res.status(400)
        .json('You must login in order to post comments!');
      return;
    }

    db.get('categories')
      .find({ id: catId })
      .get('ads')
      .find({ id: adId })
      .get('comments')
      .push({
        author: reqUser.name,
        text: reqComment.text,
        date: new Date()
      })
      .write();

    res.status(200)
    .json({
      result: 'Comment posted successfully!'
    });

  }

  return {
    getCount: getCount,
    get: get,
    post: post,
    postComment: postComment
  };
};