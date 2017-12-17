/**
 *
 * This module is designed to implement the Singleton
 * design pattern. This singleton may handle multiple 
 * class/function types and has two methods.
 *
 * getInstance: Method that returns the instance if it exists.
 *              If the first argument is a class/function then 
 *              it creates an instance of it with any other
 *              passed to the getInstance method.
 *              If the first argument is a string then it returns
 *              the instance if it was previously assigned a unique
 *              name via the setName method.
 * setName:     Method that assigns a name to a class/function.
 *              If used then getInstance can be called with a name
 *
 * @author Tilemachos Charalampous
 *
 */


"use strict";

var c = 1;

/**
 *
 * This is the implementation of the Singleton class/function.
 *
 */

var Singleton = function(){
	this.singletonClasses = new Map();
	this.singletonClassNames = new Map();
}

/**
 * 
 * This is the method that returns the instance.
 * If passed argument is typeof 'function' then it
 * returns an instance of it if it was previously created,
 * or creates a new one with any arguments passed if not.
 * If the argument is typeof 'string' then it returns
 * the instance of the name was previously associated with a
 * class/function
 * 
 * @param Cls string or function
 * @return instance
 *
 */

Singleton.prototype.getInstance = function(Cls){

	var instance = undefined;

	if (typeof Cls === "string"){
		var key = this.singletonClassNames.get(Cls);
		instance = (key) ? this.singletonClasses.get(key) : undefined;
	} else if (typeof Cls === "function") {
		instance = this.singletonClasses.get(Cls)
		if (!instance){
			instance = new (Function.prototype.bind.apply(Cls, arguments));
			this.singletonClasses.set(Cls, instance);
		}
	}
	return instance;
}


/**
 *
 * This method binds a name to a Class, so getInstance can be
 * called with a string instead of a function.
 * 
 * @param name string the name to associate the function with
 * @param Cls string or function if passed function then the function to be associated with
 *                               if passed string then an alias to the first one
 *
 */

Singleton.prototype.setName = function(name, Cls){

	if (!name){
		return;
	}

	if (typeof Cls === "string"){
		var func = this.singletonClassNames.get(name);
		if (func && Cls){
			this.singletonClassNames.set(Cls, func);
		}
	} else if (typeof Cls === "function"){
		this.singletonClassNames.set(name, Cls);
	}
}

/**
 *
 * This is the implementation of the SingletonSingle
 * function that accepts a function and does what
 * the Singleton do without needing to pass anything
 * to getInstance()
 *
 */

var SingletonSingle = function(Cls){
	if (typeof Cls === "string"){
		this.cls = singleton.singletonClassNames.get(Cls);
		this.args = arguments;
	} else if (typeof Cls === "function"){
		this.cls = Cls;
		this.args = arguments;
	}
}

/**
 *
 * Equivalent implementation of Singleton getInstance
 *
 */

SingletonSingle.prototype.getInstance = function(){
	return singleton.getInstance.apply(singleton, this.args);
}

/**
 *
 * Equivalent implementation of Singleton setName
 *
 */

SingletonSingle.prototype.setName = function(name){
	singleton.setName(name, this.cls);
}

var singleton = new Singleton();

function singletonWrapper(Cls){
	if (typeof Cls == "undefined"){
		return singleton;
	} else if (typeof Cls === "string" || typeof Cls == "function"){
		return new SingletonSingle(Cls);
	}
}

/*----------  This module exports the singletonWrapper  ----------*/

module.exports = singletonWrapper;