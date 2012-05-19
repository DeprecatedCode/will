/**
 * Will.js
 * Condition-Driven Development
 * Will makes logical async flows much simpler!
 * @author Nate Ferrero
 */

/**
 * When Conditions Generator
 * @author Nate Ferrero
 */
var _when = function(will, func, conditions, args, set) {

	/**
	 * Re-Evaluate Conditions and Process Will
	 * @author Nate Ferrero
	 */
	var evaluate = function() {
		
		/**
		 * Loop through all args and conditions
		 */
		for(var arg in conditions) {
			for(var i in conditions[arg]) {

				/**
				 * Assemble arguments, first is always the value
				 */
				var x = [args[arg]];
				for(var j in conditions[arg][i].args)
					x.push(conditions[arg][i].args[j]);

				/**
				 * If a condition test fails, return
				 */
				if(!conditions[arg][i].condition.apply({}, x))
					return;
			}
		}

		/**
		 * All conditions passed, execute the will!
		 * @author Nate Ferrero
		 */
		func(args, set);

	};

	/**
	 * Argument Setter Generator
	 * @author Nate Ferrero
	 */
	var _set = function(arg) {
		return function(value) {
			//console.log('Setting when args are', args);
			args[arg] = value;
			evaluate();
		}
	};

	/**
	 * Condition Generator
	 * @author Nate Ferrero
	 */
	var _condition = function(arg, condition) {
		return function() {

			if(typeof conditions[arg] == 'undefined')
				conditions[arg] = [];

			/**
			 * Handle Condition Functions
			 * Any custom args may be passed to condition functions
			 */
			conditions[arg].push({condition: condition, args: arguments});

			/**
			 * Add Setter if needed
			 */
			if(typeof set[arg] !== 'function')
				set[arg] = _set(arg);

			/**
			 * Return will for chaining
			 */
			return will;
		}
	}

	/**
	 * Return Condition Accessors
	 * @author Nate Ferrero
	 */
	return function(arg) {
		return {

			/**
			 * Verify Argument Exists
			 * @author Nate Ferrero
			 */
			exists: _condition(arg, function(x) {
				return typeof x !== 'undefined';
			})

		}
	}
};

/**
 * Do generator for initial processing, a spark starts
 * processing the chain of functions
 * A spark takes the arguments (args, set)
 * @author Nate Ferrero
 */
var _do = function(will, set) {
	return function(spark) {
		spark(set);
		return will;
	};
};

/**
 * Will generator
 * @author Nate Ferrero
 */
var _will = function(args, set) {
	return function(func) {
		return new will(func, {}, args, set);
	};
};

/**
 * Will
 * @author Nate Ferrero
 */
var will = function(func, conditions, args, set) {

	/**
	 * Chainable methods
	 * @author Nate Ferrero
	 */
	this.will = _will(args, set);
	this.when = _when(this, func, conditions, args, set);
	this.do = _do(this, set);
};

/**
 * Export a new will generator with blank scope
 * @author Nate Ferrero
 */
module.exports = _will({}, {});