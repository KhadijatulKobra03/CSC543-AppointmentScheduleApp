
const fs = require('fs');
const path = require('path');

const contentType = function(extension) {

	switch(extension) {
			case ".txt": {
					return 'text/plain';
			}
			case ".html": {
					return 'text/html';
			}
			case ".js": {
					return 'text/javascript';
			}
			case ".css": {
					return 'text/css';
			}
			case ".csv": {
					return 'text/csv';
			}
			case ".gif": {
					return 'image/gif';
			}
			case ".jpg":
			case ".jpeg": {
					return 'image/jpg';
			}
			case ".avif": {
					return 'image/avif';
			}
			case ".png": {
					return 'image/png';
			}
			case ".bmp": {
					return 'image/bmp';
			}
			case ".svg": {
					return 'image/svg+xml';
			}
			case ".ico": {
				   return 'image/vnd.microsoft.icon';
			}
			case ".ics": {
				return 'text/calendar';
		 	}
		 	default: {
				return 'text/plain'
			}
	}
};


exports.readFile = function(fileName, res) {

	//  if no pathname default to index.html
	if (fileName==('./public_html/'))
                fileName='./public_html/index.html'
	
	// extracts extension 	
	const extension = path.extname(fileName);
	console.log(extension);

	fs.readFile(fileName, function(err,data) {
		// reads file and sends data or error message
        	if (err) {
                	res.writeHead(404, {'Content-Type': 'text/plain' });
               		res.write('Error 404: resource not found.');
                	res.end();
        	}
        	else {
                	res.writeHead(200, {'Content-Type': contentType(extension)});
                	res.write(data);
                	res.end();
        	}
	});	
};
