# js-singleton
A singleton wrapper for creating single instances of functions.

This module can wrap an arbitrary number of functions in the same
Singleton meaning you can init everything you need and then just
use `require('js-singleton');` in other modules and work just fine.

# Examples

## Simple example in multi mode
```javascript
const Singleton = require('js-singleton')();

function Person(firstname, lastname){
  this.firstname = firstname;
  this.lastname = lastname;
}

var person = Singleton.getInstance(Person, 'George', 'Clooney');
console.log(person.firstname, person.lastname); // Prints George Clooney

var anotherPerson = Singleton.getInstance(Person, 'Michael', 'Jackson');
console.log(anotherPerson.firstname, anotherPerson.lastname); // Prints George Clooney

var anotherPersonMaybe = Singleton.getInstance(Person);
console.log(anotherPersonMaybe.firstname, anotherPersonMaybe.lastname); // Prints George Clooney
```
## Simple example in single mode
```javascript

function ff(d){
	this.d = d;
}

const SingletonSingle 	= require('js-singleton')(ff, 125);
const Singleton 		= require('js-singleton')();

var i1 = SingletonSingle.getInstance();
var i2 = SingletonSingle.getInstance();
var i3 = Singleton.getInstance(ff);

console.log(i1.d); // Prints 125
console.log(i2.d); // Prints 125
console.log(i3.d); // Prints 125
```
## Example with getInstance() by passing a string alias of the function via setName()
```javascript
function Complex(a, b){
  this.a = a;
  this.b = b;
}

var complex = Singleton.getInstance(Complex, 1, 2);
const SingletonSingle = require('js-singleton')(Complex);
Singleton.setName("MyCustomComplexClass", Complex);
SingletonSingle.setName("MyCustomComplexClass"); // Equivalent to previous line

var anotherComplex = Singleton.getInstance("MyCustomComplexClass");

var someOtherComplex = SingletonSingle.getInstance();

console.log(anotherComplex.a, anotherComplex.b); // Prints 1 2;
console.log(complex.a, complex.b); // Prints 1 2;
console.log(someOtherComplex.a, someOtherComplex.b); // Prints 1 2;
```
## Example with creating multiple aliases for the same function via setName()
```javascript
const Singleton = require('js-singleton')();
function Door(height, width){
  this.height = height;
  this.width = width;
}

var door = Singleton.getInstance(Door, 1.1, 2.3);
Singleton.setName("door", Door);
Singleton.setName("door", "otherDoorAlias");

var anotherDoor = Singleton.getInstance("door");

var anotherDoorMaybe = Singleton.getInstance("otherDoorAlias");

const SingletonSingle = require('js-singleton')("otherDoorAlias)";
var aDoorAlso = SingletonSingle.getInstace();

console.log(door.width, door.height); // Prints 2.3 1.1
console.log(anotherDoor.width, anotherDoor.height); // Prints 2.3 1.1
console.log(anotherDoorMaybe.width, anotherDoorMaybe.height); // Prints 2.3 1.1
console.log(aDoorAlso.width, aDoorAlso.height); // Prints 2.3 1.1
```
## Real world example
```javascript
/**
 *
 * This module is the server module
 * 
 * @author Some Author
 *
 */

function server(options){
	// Some beautiful code
}

var options = {}; // some options

const Singleton = require('js-singleton')();
Singleton.getInstance(server, options);
// equivalent
const SingletonSingle = require('js-singleton')(server, options);

Singleton.setName("myServer", server);
// equivalent
SingletonSinglet.setName("myServer");

// No need to module.export

/*
 *
 * In another file do
 *
 */

 const Singleton = require('js-singleton')();
 const myServer = Singleton.getInstance("myServer");
 // equivalent
 const SingletonSingle = require('js-singleton')("myServer");
 const myServer = SingletonSingle.getInstance();
 ```