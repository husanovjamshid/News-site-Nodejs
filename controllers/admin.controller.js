const path = require('path');
const data = require('../db/news.json')

// Admin controller
const Admin = {
	GET: (req, res) => {
		res.sendFile(path.resolve('./public/admin.html'));
	},
};

module.exports = Admin;
