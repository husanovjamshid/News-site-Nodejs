const users = require('../db/users.json');
const jwt = require('jsonwebtoken');
const path = require('path');
const { write } = require('../util/model');

// Login controller
const Login = {
	GET: (req, res) => {
		res.sendFile(path.resolve('./public/login.html'));
	},

	POST: (req, res) => {
		try {
			const { username, password } = req.body;

			const user = users.find(
				(item) => item.username == username && item.password == password,
			);

			if (!user) {
				throw new Error('Wrong username or password');
			}
			// res.redirect('/admin');
			req.headers['token'] = jwt.sign(username, process.env.SECRET_KEY);
			console.log(req.headers);
			res.status(200).json({
				status: 200,
				message: 'success',
				token: jwt.sign(username, process.env.SECRET_KEY),
			});
		} catch (error) {
			res.status(404).send({ status: 404, message: error.message });
		}
	},
};

module.exports = Login;
