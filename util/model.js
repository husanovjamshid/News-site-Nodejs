const fs = require('fs');
const path = require('path');

function write(data, filename) {
	fs.writeFileSync(
		path.resolve(path.resolve('db', data + '.json')),
		JSON.stringify(filename, null, 4),
	);

	return true;
}

module.exports = { write };
