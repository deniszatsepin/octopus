	
exports.create = function(req, res, next) {
	console.log('Req: ', req.files);
	res.end('ok');
};