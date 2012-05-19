/**
 * Simple Will example
 * @author Nate Ferrero
 */
var will = require('../index');

/**
 * If a string is provided, console log it
 * @author Nate Ferrero
 */
var log = will(function(args, set) {

	console.log("LOGGING:",args.string);
	set.status(true);

})
.when('string').exists();

/**
 * Chain additional operations with .will(func).when()...
 * Must do before using log.do
 */
log.will(function(args, set) {

	console.log("Yay, status is", args.status);

})
.when('status').exists();

/**
 * Invoke it with a setter function to start operation
 */
log.do(function(set) {

	set.string('Log this string to the console');

});

/**
 * And again
 */
log.do(function(set) {

	set.string('Also log this string to the console');

});