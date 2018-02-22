
exports.getNearby = (req, resp) => {
  let shops = [];
  resp.status(200).json(shops);
};

exports.getById = (req, resp) => {
  resp.status(400).json('get shop by id');
};
