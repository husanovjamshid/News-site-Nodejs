const data = require('../db/news.json')
const path = require('path');
const { write } = require('../util/model');


// News controller
const News = {
	GET: (req, res) => {
        if (req.params.id) {
            const newData = data.find((item) => item.id == req.params.id);
            res.status(200).send(newData);
        } else {
            res.status(200).send(data);
        }
    },

	POST: (req, res) => {
        const { title, desc } = req.body;
        const newData = {
            id: data.at(-1)?.id + 1 || 1,
            title,
            desc,
            date: new Date(),
        };
        data.push(newData);
    
        write('news', data);
        res.status(201).send(data);
    },
	PUT: (req, res) => {
        const { title, desc } = req.body;
        const { userId } = req.params;
        const newData = data.find((item) => item.id == userId);
        newData.title = title || newData.title;
        newData.desc = desc || newData.desc;
    
        write('news', data);
        res.status(201).send(data);
    },

	DELETE: (req, res) => {
        const { id } = req.params;
        const newData = data.findIndex((item) => item.id == id);
        data.splice(newData, 1);
    
        write('news', data);
        res.status(200).send(data);
    },
};

module.exports = News;
