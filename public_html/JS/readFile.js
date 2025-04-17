const fs = require('fs');
const path = require('path');


exports.readFile = function(fileName, res) {

	//  if no pathname default to index.html
	if (fileName==('./public_html/'))
                fileName='./public_html/index.html'
	
	// extracts extension 	
	extension = path.extname(fileName);
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

contentType = function(extension) {

	switch(extension) {
			case ".txt": {
					return 'text/plain';
					break;
			}
			case ".html": {
					return 'text/html';
					break;
			}
			case ".js": {
					return 'text/javascript';
					break;
			}
			case ".css": {
					return 'text/css';
					break;
			}
			case ".csv": {
					return 'text/csv';
					break;
			}
	case ".gif": {
					return 'image/gif';
					break;
			}
			case ".jpg":
			case ".jpeg": {
					return 'image/jpg';
					break;
			}
			case ".avif": {
					return 'image/avif';
					break;
			}
			case ".png": {
					return 'image/png';
					break;
			}
			case ".bmp": {
					return 'image/bmp';
					break;
			}
			case ".svg": {
					return 'image/svg+xml';
					break;
			}
			case ".ico": {
				   return 'image/vnd.microsoft.icon';
				   break;
			}
			case ".ics": {
				return 'text/calendar';
				break;
		 }
	}
};
