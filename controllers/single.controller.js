const data = require('../db/news.json')


// Single controller
const Single = {
	GET: (req, res) => {
		const newData = data.find((item) => item.id == req.params.id);
		res.status(200).send(newData);
	},
};

module.exports = Single;
