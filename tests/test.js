const assert = require('assert')
const should = require('should');
const Singleton = require('../singleton')();




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

	it('should work in single mode', function(done) {
		function f5(f, x){
			this.f = f;
			this.x = x;
		}

		const SingletonSingle = require('../singleton')(f5, 5, 7);

		var i1 = SingletonSingle.getInstance();
		var i2 = SingletonSingle.getInstance();

		assert(i1 === i2 && i1.x === i2.x && i1.f === i2.f, true);
		done();
	});

	it('should work with single and multi mode simultaneously', function(done){
		function f6(a){
			this.a = a;
		}

		const SingletonSingle = require('../singleton')(f6, 2123);
		var i1 = SingletonSingle.getInstance();
		var i2 = Singleton.getInstance(f6);

		assert(i1 === i2 && i1.a === i2.a, true);
		done();
	});

	it('should work with single and multi mode simultaneously with names', function(done) {
		function f7(b){
			this.b = b;
		}

		var i1 = Singleton.getInstance(f7, 39123);
		const SingletonSingle = require('../singleton')(f7);
		var i2 = SingletonSingle.getInstance();
		SingletonSingle.setName("f7");
		var i3 = SingletonSingle.getInstance("f7");
		var i4 = Singleton.getInstance("f7");

		assert(i1 === i2 && i1.b === i2.b &&
			   i2 === i3 && i3.b === i2.b &&
			   i3 === i4 && i3.b === i4.b, true);
		done();
	})

	it('should work with single and multi mode simultaneously with multiple names for the same function', function(done) {
		function f8(d){
			this.d = d;
		}

		var i1 = Singleton.getInstance(f8, 1235);
		const SingletonSingle = require('../singleton')(f8);
		SingletonSingle.setName("f8");
		Singleton.setName("myF8", f8);
		SingletonSingle.setName("myF8Test", "myF8");

		var i1 = SingletonSingle.getInstance();
		var i2 = Singleton.getInstance("f8");
		var i3 = Singleton.getInstance("myF8");
		var i4 = Singleton.getInstance("myF8Test");

		const SingletonSingle2 = require('../singleton')("f8");
		var i5 = SingletonSingle2.getInstance();

		const SingletonSingle4 = require('../singleton')("myF8Test");
		var i6 = SingletonSingle4.getInstance();

		assert(i5==i6 && i6.d === i5.d &&
			   i5 === i3 && i5.d === i3.d &&
			   i1 === i2 && i2.d === i1.d &&
			   i3 === i2 && i2.d === i3.d && 
			   i4 === i3 && i3.d === i4.d, true);
		done();
	});

});