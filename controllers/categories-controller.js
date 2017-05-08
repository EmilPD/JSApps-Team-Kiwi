let _ = require('lodash');

module.exports = function(db) {

  function get(req, res) {
    let categoryName = req.params.categoryName;

    if (categoryName === 'all') {
      let category = _.chain(db.get('categories'))
        .sortBy('date')
        .value();
    } 
    else {
      let category = _.chain(db.get('categories'))
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
