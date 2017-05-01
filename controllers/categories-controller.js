var _ = require('lodash');

module.exports = function(db) {

  function get(req, res) {
    let categoryName = req.params.id;

    if (categoryName === 'all') {
      var category = _.chain(db.get('categories'))
        .value();
    } 
    else {
      var category = _.chain(db.get('categories'))
        .find({ shortname: categoryName })
        .value();
    }

    res.json({
      result: category
    });
  }

  return {
    get: get
  };
};