# js-singleton
A singleton wrapper for creating single instances of functions.

This module can wrap an arbitrary number of functions in the same
Singleton meaning you can init everything you need and then just
use `require('js-singleton');` in other modules and work just fine.

# Examples

## Simple example
```javascript
const Singleton = require('js-singleton');

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
## Example with getInstance() by passing a string alias of the function via setName()
```javascript
function Complex(a, b){
  this.a = a;
  this.b = b;
}

var complex = Singleton.getInstance(Complex, 1, 2);
Singleton.setName("MyCustomComplexClass", Complex);

var anotherComplex = Singleton.getInstance("MyCustomComplexClass");

console.log(anotherComplex.a, anotherComplex.b); // Prints 1, 2;
```
## Example with creating multiple aliases for the same function via setName()
```javascript
function Door(height, width){
  this.height = height;
  this.width = width;
}

var door = Singleton.getInstance(Door, 1.1, 2.3);
Singleton.setName("door", Door);
Singleton.setName("door", "otherDoorAlias");

var anotherDoor = Singleton.getInstance("door");

var anotherDoorMaybe = Singleton.getInstance("otherDoorAlias");

console.log(door.width, door.height); // Prints 2.3, 1.1
console.log(anotherDoor.width, anotherDoor.height); // Prints 2.3, 1.1
console.log(anotherDoorMaybe.width, anotherDoorMaybe.height); // Prints 2.3, 1.1
```
