exports.index = function(req, res, next) {

};

exports.create = function(req, res, next) {
	console.log('Req: ', req.files);
	res.end('ok');
};
