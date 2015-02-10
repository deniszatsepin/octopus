var expect = require('chai').expect;
var Config = require('../');


describe('Octopus configurator', function() {
	describe('Getter and setter', function () {
		var configuration = {
			v: 0.1,
			modules: {
				path: '/root'
			}
		};
		var config;

		before(function() {
			"use strict";
			config = Config.init(configuration);
		});

		it('should get values', function() {
			var ver = config.get('v');
			var path = config.get('modules.path');
			expect(ver).to.be.equal(configuration.v);
			expect(path).to.be.equal(configuration.modules.path);
		});	

		it('should set values', function() {
			"use strict";
			config.set('a.b.c.d.e', true);
			expect(configuration.a.b.c.d.e).to.be.true;
		});

		it('should thorw exception on set to wrong path', function() {
			"use strict";
			var setter = function() {
				config.set('modules.path.root', 10);
			};
			expect(setter).to.throw(Error);
		});
	});
});
