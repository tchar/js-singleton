const assert = require('assert')
const should = require('should');
const Singleton = require('../singleton');




describe('Singleton', function() {
	it('should return the same instance', function(done) {

		function f1(){
		}

		var i1 = Singleton.getInstance(f1);
		var i2 = Singleton.getInstance(f1);

		assert(i1 === i2, true);

	done();
	});

	it('should create an instance with given parameters', function(done) {
	
		function f2(a, b){
			this.a = a;
			this.b = b;
		}

		var i1 = Singleton.getInstance(f2, 1, 2);

		assert(i1.a === 1 && i1.b === 2, true);
		done();
	});

	it('should not change the initial arguments if passed again', function(done) {
		function f3(a, b){
			this.a = a;
			this.b = b;
		}

		var i1 = Singleton.getInstance(f3, 3, 4);
		var i2 = Singleton.getInstance(f3, 6, 7);
		assert(i1 === i2 && i1.a === i2.a && i1.b === i2.b && i1.a === 3 && i1.b === 4, true);
		done();
	});

	it('should get instance with a name properly if setName was previously called', function(done){
		function f4(a, b){
			this.a = a;
			this.b = b;
		}

		var i1 = Singleton.getInstance(f4, 10, 20);
		Singleton.setName('f4', f4);
		var i2 = Singleton.getInstance('f4');
		
		assert(i1 === i2 && i1.a === i2.a && i1.b === i2.b && i1.a === 10 && i1.b === 20, true);
		done();
	});

	it('should get instance with a name properly even if it was assigned elsewhere', function(done) {
		var i1 = Singleton.getInstance("f4");

		assert(i1.a === 10 && i1.b === 20, true);
		done();
	})

	it('should be able to re assign multiple names', function(done){

		Singleton.setName("f4", "myF4");

		var i1 = Singleton.getInstance("myF4");
		assert(i1.a === 10 && i1.b === 20, true);
		done();
	});

	it('should return undefined if name does not exist', function(done) {

		var i1 = Singleton.getInstance("someName");

		assert(typeof i1 === "undefined", true);
		done();
	});

	it ('should return undefined if passed something other than string or function', function(done) {
		var i1 = Singleton.getInstance(1, 2, 4);

		var i2 = Singleton.getInstance({1: 1, 3: 1});

		var i3 = Singleton.getInstance(true);

		var i4 = Singleton.getInstance(undefined, 5, 6);

		assert(typeof i1 === "undefined", true);
		assert(typeof i2 === "undefined", true);
		assert(typeof i3 === "undefined", true);
		assert(typeof i4 === "undefined", true);
		done();
	});

});