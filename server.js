const express = require('express');
const users = require('./db/users.json');
const app = express();
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const News = require('./controllers/news.controller');
const Admin = require('./controllers/admin.controller');
const Single = require('./controllers/single.controller');
const Login = require('./controllers/login.controller');
require('dotenv').config();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static('./public'));
app.use(cors());

app.get('/', (req, res) => {
	res.sendFile(path.resolve('./public/index.html'));
});

// Login controllers
app.get('/login', Login.GET);
app.post('/login', Login.POST);

// Admin check function
function checkAdmin(req, res, next) {
	req.headers['token'] = jwt.sign('admin', process.env.SECRET_KEY);
	const { token } = req.headers;
	console.log(token);
	if (!token) {
		res.redirect('/login');
	}
	jwt.verify(token, process.env.SECRET_KEY);

	next();
}
// Admin
app.get('/admin', checkAdmin, Admin.GET);

// Single
app.get('/single/:id', Single.GET);

// News controllers
app.get('/news/:id?', News.GET);
app.post('/news', News.POST);
app.put('/news/:userId', News.PUT);
app.delete('/news/:id', News.DELETE);


// Server
app.listen(PORT, () => console.log('server running PORT: ' + PORT));
