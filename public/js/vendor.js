/*!
 * jQuery JavaScript Library v2.1.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:01Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));


;(function(){

/**
 * Require the module at `name`.
 *
 * @param {String} name
 * @return {Object} exports
 * @api public
 */

function require(name) {
  var module = require.modules[name];
  if (!module) throw new Error('failed to require "' + name + '"');

  if (!('exports' in module) && typeof module.definition === 'function') {
    module.client = module.component = true;
    module.definition.call(this, module.exports = {}, module);
    delete module.definition;
  }

  return module.exports;
}

/**
 * Meta info, accessible in the global scope unless you use AMD option.
 */

require.loader = 'component';

/**
 * Internal helper object, contains a sorting function for semantiv versioning
 */
require.helper = {};
require.helper.semVerSort = function(a, b) {
  var aArray = a.version.split('.');
  var bArray = b.version.split('.');
  for (var i=0; i<aArray.length; ++i) {
    var aInt = parseInt(aArray[i], 10);
    var bInt = parseInt(bArray[i], 10);
    if (aInt === bInt) {
      var aLex = aArray[i].substr((""+aInt).length);
      var bLex = bArray[i].substr((""+bInt).length);
      if (aLex === '' && bLex !== '') return 1;
      if (aLex !== '' && bLex === '') return -1;
      if (aLex !== '' && bLex !== '') return aLex > bLex ? 1 : -1;
      continue;
    } else if (aInt > bInt) {
      return 1;
    } else {
      return -1;
    }
  }
  return 0;
}

/**
 * Find and require a module which name starts with the provided name.
 * If multiple modules exists, the highest semver is used. 
 * This function can only be used for remote dependencies.

 * @param {String} name - module name: `user~repo`
 * @param {Boolean} returnPath - returns the canonical require path if true, 
 *                               otherwise it returns the epxorted module
 */
require.latest = function (name, returnPath) {
  function showError(name) {
    throw new Error('failed to find latest module of "' + name + '"');
  }
  // only remotes with semvers, ignore local files conataining a '/'
  var versionRegexp = /(.*)~(.*)@v?(\d+\.\d+\.\d+[^\/]*)$/;
  var remoteRegexp = /(.*)~(.*)/;
  if (!remoteRegexp.test(name)) showError(name);
  var moduleNames = Object.keys(require.modules);
  var semVerCandidates = [];
  var otherCandidates = []; // for instance: name of the git branch
  for (var i=0; i<moduleNames.length; i++) {
    var moduleName = moduleNames[i];
    if (new RegExp(name + '@').test(moduleName)) {
        var version = moduleName.substr(name.length+1);
        var semVerMatch = versionRegexp.exec(moduleName);
        if (semVerMatch != null) {
          semVerCandidates.push({version: version, name: moduleName});
        } else {
          otherCandidates.push({version: version, name: moduleName});
        } 
    }
  }
  if (semVerCandidates.concat(otherCandidates).length === 0) {
    showError(name);
  }
  if (semVerCandidates.length > 0) {
    var module = semVerCandidates.sort(require.helper.semVerSort).pop().name;
    if (returnPath === true) {
      return module;
    }
    return require(module);
  }
  // if the build contains more than one branch of the same module
  // you should not use this funciton
  var module = otherCandidates.sort(function(a, b) {return a.name > b.name})[0].name;
  if (returnPath === true) {
    return module;
  }
  return require(module);
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Register module at `name` with callback `definition`.
 *
 * @param {String} name
 * @param {Function} definition
 * @api private
 */

require.register = function (name, definition) {
  require.modules[name] = {
    definition: definition
  };
};

/**
 * Define a module's exports immediately with `exports`.
 *
 * @param {String} name
 * @param {Generic} exports
 * @api private
 */

require.define = function (name, exports) {
  require.modules[name] = {
    exports: exports
  };
};
require.register("abpetkov~transitionize@0.0.3", function (exports, module) {

/**
 * Transitionize 0.0.2
 * https://github.com/abpetkov/transitionize
 *
 * Authored by Alexander Petkov
 * https://github.com/abpetkov
 *
 * Copyright 2013, Alexander Petkov
 * License: The MIT License (MIT)
 * http://opensource.org/licenses/MIT
 *
 */

/**
 * Expose `Transitionize`.
 */

module.exports = Transitionize;

/**
 * Initialize new Transitionize.
 *
 * @param {Object} element
 * @param {Object} props
 * @api public
 */

function Transitionize(element, props) {
  if (!(this instanceof Transitionize)) return new Transitionize(element, props);

  this.element = element;
  this.props = props || {};
  this.init();
}

/**
 * Detect if Safari.
 *
 * @returns {Boolean}
 * @api private
 */

Transitionize.prototype.isSafari = function() {
  return (/Safari/).test(navigator.userAgent) && (/Apple Computer/).test(navigator.vendor);
};

/**
 * Loop though the object and push the keys and values in an array.
 * Apply the CSS3 transition to the element and prefix with -webkit- for Safari.
 *
 * @api private
 */

Transitionize.prototype.init = function() {
  var transitions = [];

  for (var key in this.props) {
    transitions.push(key + ' ' + this.props[key]);
  }

  this.element.style.transition = transitions.join(', ');
  if (this.isSafari()) this.element.style.webkitTransition = transitions.join(', ');
};
});

require.register("ftlabs~fastclick@v0.6.11", function (exports, module) {
/**
 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
 *
 * @version 0.6.11
 * @codingstandard ftlabs-jsv2
 * @copyright The Financial Times Limited [All Rights Reserved]
 * @license MIT License (see LICENSE.txt)
 */

/*jslint browser:true, node:true*/
/*global define, Event, Node*/


/**
 * Instantiate fast-clicking listeners on the specificed layer.
 *
 * @constructor
 * @param {Element} layer The layer to listen on
 */
function FastClick(layer) {
	'use strict';
	var oldOnClick, self = this;


	/**
	 * Whether a click is currently being tracked.
	 *
	 * @type boolean
	 */
	this.trackingClick = false;


	/**
	 * Timestamp for when when click tracking started.
	 *
	 * @type number
	 */
	this.trackingClickStart = 0;


	/**
	 * The element being tracked for a click.
	 *
	 * @type EventTarget
	 */
	this.targetElement = null;


	/**
	 * X-coordinate of touch start event.
	 *
	 * @type number
	 */
	this.touchStartX = 0;


	/**
	 * Y-coordinate of touch start event.
	 *
	 * @type number
	 */
	this.touchStartY = 0;


	/**
	 * ID of the last touch, retrieved from Touch.identifier.
	 *
	 * @type number
	 */
	this.lastTouchIdentifier = 0;


	/**
	 * Touchmove boundary, beyond which a click will be cancelled.
	 *
	 * @type number
	 */
	this.touchBoundary = 10;


	/**
	 * The FastClick layer.
	 *
	 * @type Element
	 */
	this.layer = layer;

	if (!layer || !layer.nodeType) {
		throw new TypeError('Layer must be a document node');
	}

	/** @type function() */
	this.onClick = function() { return FastClick.prototype.onClick.apply(self, arguments); };

	/** @type function() */
	this.onMouse = function() { return FastClick.prototype.onMouse.apply(self, arguments); };

	/** @type function() */
	this.onTouchStart = function() { return FastClick.prototype.onTouchStart.apply(self, arguments); };

	/** @type function() */
	this.onTouchMove = function() { return FastClick.prototype.onTouchMove.apply(self, arguments); };

	/** @type function() */
	this.onTouchEnd = function() { return FastClick.prototype.onTouchEnd.apply(self, arguments); };

	/** @type function() */
	this.onTouchCancel = function() { return FastClick.prototype.onTouchCancel.apply(self, arguments); };

	if (FastClick.notNeeded(layer)) {
		return;
	}

	// Set up event handlers as required
	if (this.deviceIsAndroid) {
		layer.addEventListener('mouseover', this.onMouse, true);
		layer.addEventListener('mousedown', this.onMouse, true);
		layer.addEventListener('mouseup', this.onMouse, true);
	}

	layer.addEventListener('click', this.onClick, true);
	layer.addEventListener('touchstart', this.onTouchStart, false);
	layer.addEventListener('touchmove', this.onTouchMove, false);
	layer.addEventListener('touchend', this.onTouchEnd, false);
	layer.addEventListener('touchcancel', this.onTouchCancel, false);

	// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
	// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
	// layer when they are cancelled.
	if (!Event.prototype.stopImmediatePropagation) {
		layer.removeEventListener = function(type, callback, capture) {
			var rmv = Node.prototype.removeEventListener;
			if (type === 'click') {
				rmv.call(layer, type, callback.hijacked || callback, capture);
			} else {
				rmv.call(layer, type, callback, capture);
			}
		};

		layer.addEventListener = function(type, callback, capture) {
			var adv = Node.prototype.addEventListener;
			if (type === 'click') {
				adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
					if (!event.propagationStopped) {
						callback(event);
					}
				}), capture);
			} else {
				adv.call(layer, type, callback, capture);
			}
		};
	}

	// If a handler is already declared in the element's onclick attribute, it will be fired before
	// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
	// adding it as listener.
	if (typeof layer.onclick === 'function') {

		// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
		// - the old one won't work if passed to addEventListener directly.
		oldOnClick = layer.onclick;
		layer.addEventListener('click', function(event) {
			oldOnClick(event);
		}, false);
		layer.onclick = null;
	}
}


/**
 * Android requires exceptions.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0;


/**
 * iOS requires exceptions.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent);


/**
 * iOS 4 requires an exception for select elements.
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOS4 = FastClick.prototype.deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


/**
 * iOS 6.0(+?) requires the target element to be manually derived
 *
 * @type boolean
 */
FastClick.prototype.deviceIsIOSWithBadTarget = FastClick.prototype.deviceIsIOS && (/OS ([6-9]|\d{2})_\d/).test(navigator.userAgent);


/**
 * Determine whether a given element requires a native click.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element needs a native click
 */
FastClick.prototype.needsClick = function(target) {
	'use strict';
	switch (target.nodeName.toLowerCase()) {

	// Don't send a synthetic click to disabled inputs (issue #62)
	case 'button':
	case 'select':
	case 'textarea':
		if (target.disabled) {
			return true;
		}

		break;
	case 'input':

		// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
		if ((this.deviceIsIOS && target.type === 'file') || target.disabled) {
			return true;
		}

		break;
	case 'label':
	case 'video':
		return true;
	}

	return (/\bneedsclick\b/).test(target.className);
};


/**
 * Determine whether a given element requires a call to focus to simulate click into element.
 *
 * @param {EventTarget|Element} target Target DOM element
 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
 */
FastClick.prototype.needsFocus = function(target) {
	'use strict';
	switch (target.nodeName.toLowerCase()) {
	case 'textarea':
		return true;
	case 'select':
		return !this.deviceIsAndroid;
	case 'input':
		switch (target.type) {
		case 'button':
		case 'checkbox':
		case 'file':
		case 'image':
		case 'radio':
		case 'submit':
			return false;
		}

		// No point in attempting to focus disabled inputs
		return !target.disabled && !target.readOnly;
	default:
		return (/\bneedsfocus\b/).test(target.className);
	}
};


/**
 * Send a click event to the specified element.
 *
 * @param {EventTarget|Element} targetElement
 * @param {Event} event
 */
FastClick.prototype.sendClick = function(targetElement, event) {
	'use strict';
	var clickEvent, touch;

	// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
	if (document.activeElement && document.activeElement !== targetElement) {
		document.activeElement.blur();
	}

	touch = event.changedTouches[0];

	// Synthesise a click event, with an extra attribute so it can be tracked
	clickEvent = document.createEvent('MouseEvents');
	clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
	clickEvent.forwardedTouchEvent = true;
	targetElement.dispatchEvent(clickEvent);
};

FastClick.prototype.determineEventType = function(targetElement) {
	'use strict';

	//Issue #159: Android Chrome Select Box does not open with a synthetic click event
	if (this.deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
		return 'mousedown';
	}

	return 'click';
};


/**
 * @param {EventTarget|Element} targetElement
 */
FastClick.prototype.focus = function(targetElement) {
	'use strict';
	var length;

	// Issue #160: on iOS 7, some input elements (e.g. date datetime) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
	if (this.deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time') {
		length = targetElement.value.length;
		targetElement.setSelectionRange(length, length);
	} else {
		targetElement.focus();
	}
};


/**
 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
 *
 * @param {EventTarget|Element} targetElement
 */
FastClick.prototype.updateScrollParent = function(targetElement) {
	'use strict';
	var scrollParent, parentElement;

	scrollParent = targetElement.fastClickScrollParent;

	// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
	// target element was moved to another parent.
	if (!scrollParent || !scrollParent.contains(targetElement)) {
		parentElement = targetElement;
		do {
			if (parentElement.scrollHeight > parentElement.offsetHeight) {
				scrollParent = parentElement;
				targetElement.fastClickScrollParent = parentElement;
				break;
			}

			parentElement = parentElement.parentElement;
		} while (parentElement);
	}

	// Always update the scroll top tracker if possible.
	if (scrollParent) {
		scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
	}
};


/**
 * @param {EventTarget} targetElement
 * @returns {Element|EventTarget}
 */
FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
	'use strict';

	// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
	if (eventTarget.nodeType === Node.TEXT_NODE) {
		return eventTarget.parentNode;
	}

	return eventTarget;
};


/**
 * On touch start, record the position and scroll offset.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchStart = function(event) {
	'use strict';
	var targetElement, touch, selection;

	// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
	if (event.targetTouches.length > 1) {
		return true;
	}

	targetElement = this.getTargetElementFromEventTarget(event.target);
	touch = event.targetTouches[0];

	if (this.deviceIsIOS) {

		// Only trusted events will deselect text on iOS (issue #49)
		selection = window.getSelection();
		if (selection.rangeCount && !selection.isCollapsed) {
			return true;
		}

		if (!this.deviceIsIOS4) {

			// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
			// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
			// with the same identifier as the touch event that previously triggered the click that triggered the alert.
			// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
			// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
			if (touch.identifier === this.lastTouchIdentifier) {
				event.preventDefault();
				return false;
			}

			this.lastTouchIdentifier = touch.identifier;

			// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
			// 1) the user does a fling scroll on the scrollable layer
			// 2) the user stops the fling scroll with another tap
			// then the event.target of the last 'touchend' event will be the element that was under the user's finger
			// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
			// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
			this.updateScrollParent(targetElement);
		}
	}

	this.trackingClick = true;
	this.trackingClickStart = event.timeStamp;
	this.targetElement = targetElement;

	this.touchStartX = touch.pageX;
	this.touchStartY = touch.pageY;

	// Prevent phantom clicks on fast double-tap (issue #36)
	if ((event.timeStamp - this.lastClickTime) < 200) {
		event.preventDefault();
	}

	return true;
};


/**
 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.touchHasMoved = function(event) {
	'use strict';
	var touch = event.changedTouches[0], boundary = this.touchBoundary;

	if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
		return true;
	}

	return false;
};


/**
 * Update the last position.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchMove = function(event) {
	'use strict';
	if (!this.trackingClick) {
		return true;
	}

	// If the touch has moved, cancel the click tracking
	if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
		this.trackingClick = false;
		this.targetElement = null;
	}

	return true;
};


/**
 * Attempt to find the labelled control for the given label element.
 *
 * @param {EventTarget|HTMLLabelElement} labelElement
 * @returns {Element|null}
 */
FastClick.prototype.findControl = function(labelElement) {
	'use strict';

	// Fast path for newer browsers supporting the HTML5 control attribute
	if (labelElement.control !== undefined) {
		return labelElement.control;
	}

	// All browsers under test that support touch events also support the HTML5 htmlFor attribute
	if (labelElement.htmlFor) {
		return document.getElementById(labelElement.htmlFor);
	}

	// If no for attribute exists, attempt to retrieve the first labellable descendant element
	// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
	return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
};


/**
 * On touch end, determine whether to send a click event at once.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onTouchEnd = function(event) {
	'use strict';
	var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

	if (!this.trackingClick) {
		return true;
	}

	// Prevent phantom clicks on fast double-tap (issue #36)
	if ((event.timeStamp - this.lastClickTime) < 200) {
		this.cancelNextClick = true;
		return true;
	}

	// Reset to prevent wrong click cancel on input (issue #156).
	this.cancelNextClick = false;

	this.lastClickTime = event.timeStamp;

	trackingClickStart = this.trackingClickStart;
	this.trackingClick = false;
	this.trackingClickStart = 0;

	// On some iOS devices, the targetElement supplied with the event is invalid if the layer
	// is performing a transition or scroll, and has to be re-detected manually. Note that
	// for this to function correctly, it must be called *after* the event target is checked!
	// See issue #57; also filed as rdar://13048589 .
	if (this.deviceIsIOSWithBadTarget) {
		touch = event.changedTouches[0];

		// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
		targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
		targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
	}

	targetTagName = targetElement.tagName.toLowerCase();
	if (targetTagName === 'label') {
		forElement = this.findControl(targetElement);
		if (forElement) {
			this.focus(targetElement);
			if (this.deviceIsAndroid) {
				return false;
			}

			targetElement = forElement;
		}
	} else if (this.needsFocus(targetElement)) {

		// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
		// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
		if ((event.timeStamp - trackingClickStart) > 100 || (this.deviceIsIOS && window.top !== window && targetTagName === 'input')) {
			this.targetElement = null;
			return false;
		}

		this.focus(targetElement);

		// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
		if (!this.deviceIsIOS4 || targetTagName !== 'select') {
			this.targetElement = null;
			event.preventDefault();
		}

		return false;
	}

	if (this.deviceIsIOS && !this.deviceIsIOS4) {

		// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
		// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
		scrollParent = targetElement.fastClickScrollParent;
		if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
			return true;
		}
	}

	// Prevent the actual click from going though - unless the target node is marked as requiring
	// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
	if (!this.needsClick(targetElement)) {
		event.preventDefault();
		this.sendClick(targetElement, event);
	}

	return false;
};


/**
 * On touch cancel, stop tracking the click.
 *
 * @returns {void}
 */
FastClick.prototype.onTouchCancel = function() {
	'use strict';
	this.trackingClick = false;
	this.targetElement = null;
};


/**
 * Determine mouse events which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onMouse = function(event) {
	'use strict';

	// If a target element was never set (because a touch event was never fired) allow the event
	if (!this.targetElement) {
		return true;
	}

	if (event.forwardedTouchEvent) {
		return true;
	}

	// Programmatically generated events targeting a specific element should be permitted
	if (!event.cancelable) {
		return true;
	}

	// Derive and check the target element to see whether the mouse event needs to be permitted;
	// unless explicitly enabled, prevent non-touch click events from triggering actions,
	// to prevent ghost/doubleclicks.
	if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

		// Prevent any user-added listeners declared on FastClick element from being fired.
		if (event.stopImmediatePropagation) {
			event.stopImmediatePropagation();
		} else {

			// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			event.propagationStopped = true;
		}

		// Cancel the event
		event.stopPropagation();
		event.preventDefault();

		return false;
	}

	// If the mouse event is permitted, return true for the action to go through.
	return true;
};


/**
 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
 * an actual click which should be permitted.
 *
 * @param {Event} event
 * @returns {boolean}
 */
FastClick.prototype.onClick = function(event) {
	'use strict';
	var permitted;

	// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
	if (this.trackingClick) {
		this.targetElement = null;
		this.trackingClick = false;
		return true;
	}

	// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
	if (event.target.type === 'submit' && event.detail === 0) {
		return true;
	}

	permitted = this.onMouse(event);

	// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
	if (!permitted) {
		this.targetElement = null;
	}

	// If clicks are permitted, return true for the action to go through.
	return permitted;
};


/**
 * Remove all FastClick's event listeners.
 *
 * @returns {void}
 */
FastClick.prototype.destroy = function() {
	'use strict';
	var layer = this.layer;

	if (this.deviceIsAndroid) {
		layer.removeEventListener('mouseover', this.onMouse, true);
		layer.removeEventListener('mousedown', this.onMouse, true);
		layer.removeEventListener('mouseup', this.onMouse, true);
	}

	layer.removeEventListener('click', this.onClick, true);
	layer.removeEventListener('touchstart', this.onTouchStart, false);
	layer.removeEventListener('touchmove', this.onTouchMove, false);
	layer.removeEventListener('touchend', this.onTouchEnd, false);
	layer.removeEventListener('touchcancel', this.onTouchCancel, false);
};


/**
 * Check whether FastClick is needed.
 *
 * @param {Element} layer The layer to listen on
 */
FastClick.notNeeded = function(layer) {
	'use strict';
	var metaViewport;
	var chromeVersion;

	// Devices that don't support touch don't need FastClick
	if (typeof window.ontouchstart === 'undefined') {
		return true;
	}

	// Chrome version - zero for other browsers
	chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

	if (chromeVersion) {

		if (FastClick.prototype.deviceIsAndroid) {
			metaViewport = document.querySelector('meta[name=viewport]');
			
			if (metaViewport) {
				// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
				if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
					return true;
				}
				// Chrome 32 and above with width=device-width or less don't need FastClick
				if (chromeVersion > 31 && window.innerWidth <= window.screen.width) {
					return true;
				}
			}

		// Chrome desktop doesn't need FastClick (issue #15)
		} else {
			return true;
		}
	}

	// IE10 with -ms-touch-action: none, which disables double-tap-to-zoom (issue #97)
	if (layer.style.msTouchAction === 'none') {
		return true;
	}

	return false;
};


/**
 * Factory method for creating a FastClick object
 *
 * @param {Element} layer The layer to listen on
 */
FastClick.attach = function(layer) {
	'use strict';
	return new FastClick(layer);
};


if (typeof define !== 'undefined' && define.amd) {

	// AMD. Register as an anonymous module.
	define(function() {
		'use strict';
		return FastClick;
	});
} else if (typeof module !== 'undefined' && module.exports) {
	module.exports = FastClick.attach;
	module.exports.FastClick = FastClick;
} else {
	window.FastClick = FastClick;
}

});

require.register("component~indexof@0.0.3", function (exports, module) {
module.exports = function(arr, obj){
  if (arr.indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};
});

require.register("component~classes@1.2.1", function (exports, module) {
/**
 * Module dependencies.
 */

var index = require('component~indexof@0.0.3');

/**
 * Whitespace regexp.
 */

var re = /\s+/;

/**
 * toString reference.
 */

var toString = Object.prototype.toString;

/**
 * Wrap `el` in a `ClassList`.
 *
 * @param {Element} el
 * @return {ClassList}
 * @api public
 */

module.exports = function(el){
  return new ClassList(el);
};

/**
 * Initialize a new ClassList for `el`.
 *
 * @param {Element} el
 * @api private
 */

function ClassList(el) {
  if (!el) throw new Error('A DOM element reference is required');
  this.el = el;
  this.list = el.classList;
}

/**
 * Add class `name` if not already present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.add = function(name){
  // classList
  if (this.list) {
    this.list.add(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = index(arr, name);
  if (!~i) arr.push(name);
  this.el.className = arr.join(' ');
  return this;
};

/**
 * Remove class `name` when present, or
 * pass a regular expression to remove
 * any which match.
 *
 * @param {String|RegExp} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.remove = function(name){
  if ('[object RegExp]' == toString.call(name)) {
    return this.removeMatching(name);
  }

  // classList
  if (this.list) {
    this.list.remove(name);
    return this;
  }

  // fallback
  var arr = this.array();
  var i = index(arr, name);
  if (~i) arr.splice(i, 1);
  this.el.className = arr.join(' ');
  return this;
};

/**
 * Remove all classes matching `re`.
 *
 * @param {RegExp} re
 * @return {ClassList}
 * @api private
 */

ClassList.prototype.removeMatching = function(re){
  var arr = this.array();
  for (var i = 0; i < arr.length; i++) {
    if (re.test(arr[i])) {
      this.remove(arr[i]);
    }
  }
  return this;
};

/**
 * Toggle class `name`, can force state via `force`.
 *
 * For browsers that support classList, but do not support `force` yet,
 * the mistake will be detected and corrected.
 *
 * @param {String} name
 * @param {Boolean} force
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.toggle = function(name, force){
  // classList
  if (this.list) {
    if ("undefined" !== typeof force) {
      if (force !== this.list.toggle(name, force)) {
        this.list.toggle(name); // toggle again to correct
      }
    } else {
      this.list.toggle(name);
    }
    return this;
  }

  // fallback
  if ("undefined" !== typeof force) {
    if (!force) {
      this.remove(name);
    } else {
      this.add(name);
    }
  } else {
    if (this.has(name)) {
      this.remove(name);
    } else {
      this.add(name);
    }
  }

  return this;
};

/**
 * Return an array of classes.
 *
 * @return {Array}
 * @api public
 */

ClassList.prototype.array = function(){
  var str = this.el.className.replace(/^\s+|\s+$/g, '');
  var arr = str.split(re);
  if ('' === arr[0]) arr.shift();
  return arr;
};

/**
 * Check if class `name` is present.
 *
 * @param {String} name
 * @return {ClassList}
 * @api public
 */

ClassList.prototype.has =
ClassList.prototype.contains = function(name){
  return this.list
    ? this.list.contains(name)
    : !! ~index(this.array(), name);
};

});

require.register("component~event@0.1.4", function (exports, module) {
var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
    unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
    prefix = bind !== 'addEventListener' ? 'on' : '';

/**
 * Bind `el` event `type` to `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, type, fn, capture){
  el[bind](prefix + type, fn, capture || false);
  return fn;
};

/**
 * Unbind `el` event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  el[unbind](prefix + type, fn, capture || false);
  return fn;
};
});

require.register("component~query@0.0.3", function (exports, module) {
function one(selector, el) {
  return el.querySelector(selector);
}

exports = module.exports = function(selector, el){
  el = el || document;
  return one(selector, el);
};

exports.all = function(selector, el){
  el = el || document;
  return el.querySelectorAll(selector);
};

exports.engine = function(obj){
  if (!obj.one) throw new Error('.one callback required');
  if (!obj.all) throw new Error('.all callback required');
  one = obj.one;
  exports.all = obj.all;
  return exports;
};

});

require.register("component~matches-selector@0.1.5", function (exports, module) {
/**
 * Module dependencies.
 */

var query = require('component~query@0.0.3');

/**
 * Element prototype.
 */

var proto = Element.prototype;

/**
 * Vendor function.
 */

var vendor = proto.matches
  || proto.webkitMatchesSelector
  || proto.mozMatchesSelector
  || proto.msMatchesSelector
  || proto.oMatchesSelector;

/**
 * Expose `match()`.
 */

module.exports = match;

/**
 * Match `el` to `selector`.
 *
 * @param {Element} el
 * @param {String} selector
 * @return {Boolean}
 * @api public
 */

function match(el, selector) {
  if (!el || el.nodeType !== 1) return false;
  if (vendor) return vendor.call(el, selector);
  var nodes = query.all(selector, el.parentNode);
  for (var i = 0; i < nodes.length; ++i) {
    if (nodes[i] == el) return true;
  }
  return false;
}

});

require.register("component~closest@0.1.4", function (exports, module) {
var matches = require('component~matches-selector@0.1.5')

module.exports = function (element, selector, checkYoSelf, root) {
  element = checkYoSelf ? {parentNode: element} : element

  root = root || document

  // Make sure `element !== document` and `element != null`
  // otherwise we get an illegal invocation
  while ((element = element.parentNode) && element !== document) {
    if (matches(element, selector))
      return element
    // After `matches` on the edge case that
    // the selector matches the root
    // (when the root is not the document)
    if (element === root)
      return
  }
}

});

require.register("component~delegate@0.2.3", function (exports, module) {
/**
 * Module dependencies.
 */

var closest = require('component~closest@0.1.4')
  , event = require('component~event@0.1.4');

/**
 * Delegate event `type` to `selector`
 * and invoke `fn(e)`. A callback function
 * is returned which may be passed to `.unbind()`.
 *
 * @param {Element} el
 * @param {String} selector
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @return {Function}
 * @api public
 */

exports.bind = function(el, selector, type, fn, capture){
  return event.bind(el, type, function(e){
    var target = e.target || e.srcElement;
    e.delegateTarget = closest(target, selector, true, el);
    if (e.delegateTarget) fn.call(el, e);
  }, capture);
};

/**
 * Unbind event `type`'s callback `fn`.
 *
 * @param {Element} el
 * @param {String} type
 * @param {Function} fn
 * @param {Boolean} capture
 * @api public
 */

exports.unbind = function(el, type, fn, capture){
  event.unbind(el, type, fn, capture);
};

});

require.register("component~events@1.0.9", function (exports, module) {

/**
 * Module dependencies.
 */

var events = require('component~event@0.1.4');
var delegate = require('component~delegate@0.2.3');

/**
 * Expose `Events`.
 */

module.exports = Events;

/**
 * Initialize an `Events` with the given
 * `el` object which events will be bound to,
 * and the `obj` which will receive method calls.
 *
 * @param {Object} el
 * @param {Object} obj
 * @api public
 */

function Events(el, obj) {
  if (!(this instanceof Events)) return new Events(el, obj);
  if (!el) throw new Error('element required');
  if (!obj) throw new Error('object required');
  this.el = el;
  this.obj = obj;
  this._events = {};
}

/**
 * Subscription helper.
 */

Events.prototype.sub = function(event, method, cb){
  this._events[event] = this._events[event] || {};
  this._events[event][method] = cb;
};

/**
 * Bind to `event` with optional `method` name.
 * When `method` is undefined it becomes `event`
 * with the "on" prefix.
 *
 * Examples:
 *
 *  Direct event handling:
 *
 *    events.bind('click') // implies "onclick"
 *    events.bind('click', 'remove')
 *    events.bind('click', 'sort', 'asc')
 *
 *  Delegated event handling:
 *
 *    events.bind('click li > a')
 *    events.bind('click li > a', 'remove')
 *    events.bind('click a.sort-ascending', 'sort', 'asc')
 *    events.bind('click a.sort-descending', 'sort', 'desc')
 *
 * @param {String} event
 * @param {String|function} [method]
 * @return {Function} callback
 * @api public
 */

Events.prototype.bind = function(event, method){
  var e = parse(event);
  var el = this.el;
  var obj = this.obj;
  var name = e.name;
  var method = method || 'on' + name;
  var args = [].slice.call(arguments, 2);

  // callback
  function cb(){
    var a = [].slice.call(arguments).concat(args);
    obj[method].apply(obj, a);
  }

  // bind
  if (e.selector) {
    cb = delegate.bind(el, e.selector, name, cb);
  } else {
    events.bind(el, name, cb);
  }

  // subscription for unbinding
  this.sub(name, method, cb);

  return cb;
};

/**
 * Unbind a single binding, all bindings for `event`,
 * or all bindings within the manager.
 *
 * Examples:
 *
 *  Unbind direct handlers:
 *
 *     events.unbind('click', 'remove')
 *     events.unbind('click')
 *     events.unbind()
 *
 * Unbind delegate handlers:
 *
 *     events.unbind('click', 'remove')
 *     events.unbind('click')
 *     events.unbind()
 *
 * @param {String|Function} [event]
 * @param {String|Function} [method]
 * @api public
 */

Events.prototype.unbind = function(event, method){
  if (0 == arguments.length) return this.unbindAll();
  if (1 == arguments.length) return this.unbindAllOf(event);

  // no bindings for this event
  var bindings = this._events[event];
  if (!bindings) return;

  // no bindings for this method
  var cb = bindings[method];
  if (!cb) return;

  events.unbind(this.el, event, cb);
};

/**
 * Unbind all events.
 *
 * @api private
 */

Events.prototype.unbindAll = function(){
  for (var event in this._events) {
    this.unbindAllOf(event);
  }
};

/**
 * Unbind all events for `event`.
 *
 * @param {String} event
 * @api private
 */

Events.prototype.unbindAllOf = function(event){
  var bindings = this._events[event];
  if (!bindings) return;

  for (var method in bindings) {
    this.unbind(event, method);
  }
};

/**
 * Parse `event`.
 *
 * @param {String} event
 * @return {Object}
 * @api private
 */

function parse(event) {
  var parts = event.split(/ +/);
  return {
    name: parts.shift(),
    selector: parts.join(' ')
  }
}

});

require.register("switchery", function (exports, module) {
/**
 * Switchery 0.8.1
 * http://abpetkov.github.io/switchery/
 *
 * Authored by Alexander Petkov
 * https://github.com/abpetkov
 *
 * Copyright 2013-2015, Alexander Petkov
 * License: The MIT License (MIT)
 * http://opensource.org/licenses/MIT
 *
 */

/**
 * External dependencies.
 */

var transitionize = require('abpetkov~transitionize@0.0.3')
  , fastclick = require('ftlabs~fastclick@v0.6.11')
  , classes = require('component~classes@1.2.1')
  , events = require('component~events@1.0.9');

/**
 * Expose `Switchery`.
 */

module.exports = Switchery;

/**
 * Set Switchery default values.
 *
 * @api public
 */

var defaults = {
    color             : '#64bd63'
  , secondaryColor    : '#dfdfdf'
  , jackColor         : '#fff'
  , jackSecondaryColor: null
  , className         : 'switchery'
  , disabled          : false
  , disabledOpacity   : 0.5
  , speed             : '0.4s'
  , size              : 'default'
};

/**
 * Create Switchery object.
 *
 * @param {Object} element
 * @param {Object} options
 * @api public
 */

function Switchery(element, options) {
  if (!(this instanceof Switchery)) return new Switchery(element, options);

  this.element = element;
  this.options = options || {};

  for (var i in defaults) {
    if (this.options[i] == null) {
      this.options[i] = defaults[i];
    }
  }

  if (this.element != null && this.element.type == 'checkbox') this.init();
  if (this.isDisabled() === true) this.disable();
}

/**
 * Hide the target element.
 *
 * @api private
 */

Switchery.prototype.hide = function() {
  this.element.style.display = 'none';
};

/**
 * Show custom switch after the target element.
 *
 * @api private
 */

Switchery.prototype.show = function() {
  var switcher = this.create();
  this.insertAfter(this.element, switcher);
};

/**
 * Create custom switch.
 *
 * @returns {Object} this.switcher
 * @api private
 */

Switchery.prototype.create = function() {
  this.switcher = document.createElement('span');
  this.jack = document.createElement('small');
  this.switcher.appendChild(this.jack);
  this.switcher.className = this.options.className;
  this.events = events(this.switcher, this);

  return this.switcher;
};

/**
 * Insert after element after another element.
 *
 * @param {Object} reference
 * @param {Object} target
 * @api private
 */

Switchery.prototype.insertAfter = function(reference, target) {
  reference.parentNode.insertBefore(target, reference.nextSibling);
};

/**
 * Set switch jack proper position.
 *
 * @param {Boolean} clicked - we need this in order to uncheck the input when the switch is clicked
 * @api private
 */

Switchery.prototype.setPosition = function (clicked) {
  var checked = this.isChecked()
    , switcher = this.switcher
    , jack = this.jack;

  if (clicked && checked) checked = false;
  else if (clicked && !checked) checked = true;

  if (checked === true) {
    this.element.checked = true;

    if (window.getComputedStyle) jack.style.left = parseInt(window.getComputedStyle(switcher).width) - parseInt(window.getComputedStyle(jack).width) + 'px';
    else jack.style.left = parseInt(switcher.currentStyle['width']) - parseInt(jack.currentStyle['width']) + 'px';

    if (this.options.color) this.colorize();
    this.setSpeed();
  } else {
    jack.style.left = 0;
    this.element.checked = false;
    this.switcher.style.boxShadow = 'inset 0 0 0 0 ' + this.options.secondaryColor;
    this.switcher.style.borderColor = this.options.secondaryColor;
    this.switcher.style.backgroundColor = (this.options.secondaryColor !== defaults.secondaryColor) ? this.options.secondaryColor : '#fff';
    this.jack.style.backgroundColor = (this.options.jackSecondaryColor !== this.options.jackColor) ? this.options.jackSecondaryColor : this.options.jackColor;
    this.setSpeed();
  }
};

/**
 * Set speed.
 *
 * @api private
 */

Switchery.prototype.setSpeed = function() {
  var switcherProp = {}
    , jackProp = {
        'background-color': this.options.speed
      , 'left': this.options.speed.replace(/[a-z]/, '') / 2 + 's'
    };

  if (this.isChecked()) {
    switcherProp = {
        'border': this.options.speed
      , 'box-shadow': this.options.speed
      , 'background-color': this.options.speed.replace(/[a-z]/, '') * 3 + 's'
    };
  } else {
    switcherProp = {
        'border': this.options.speed
      , 'box-shadow': this.options.speed
    };
  }

  transitionize(this.switcher, switcherProp);
  transitionize(this.jack, jackProp);
};

/**
 * Set switch size.
 *
 * @api private
 */

Switchery.prototype.setSize = function() {
  var small = 'switchery-small'
    , normal = 'switchery-default'
    , large = 'switchery-large';

  switch (this.options.size) {
    case 'small':
      classes(this.switcher).add(small)
      break;
    case 'large':
      classes(this.switcher).add(large)
      break;
    default:
      classes(this.switcher).add(normal)
      break;
  }
};

/**
 * Set switch color.
 *
 * @api private
 */

Switchery.prototype.colorize = function() {
  var switcherHeight = this.switcher.offsetHeight / 2;

  this.switcher.style.backgroundColor = this.options.color;
  this.switcher.style.borderColor = this.options.color;
  this.switcher.style.boxShadow = 'inset 0 0 0 ' + switcherHeight + 'px ' + this.options.color;
  this.jack.style.backgroundColor = this.options.jackColor;
};

/**
 * Handle the onchange event.
 *
 * @param {Boolean} state
 * @api private
 */

Switchery.prototype.handleOnchange = function(state) {
  if (document.dispatchEvent) {
    var event = document.createEvent('HTMLEvents');
    event.initEvent('change', true, true);
    this.element.dispatchEvent(event);
  } else {
    this.element.fireEvent('onchange');
  }
};

/**
 * Handle the native input element state change.
 * A `change` event must be fired in order to detect the change.
 *
 * @api private
 */

Switchery.prototype.handleChange = function() {
  var self = this
    , el = this.element;

  if (el.addEventListener) {
    el.addEventListener('change', function() {
      self.setPosition();
    });
  } else {
    el.attachEvent('onchange', function() {
      self.setPosition();
    });
  }
};

/**
 * Handle the switch click event.
 *
 * @api private
 */

Switchery.prototype.handleClick = function() {
  var switcher = this.switcher;

  fastclick(switcher);
  this.events.bind('click', 'bindClick');
};

/**
 * Attach all methods that need to happen on switcher click.
 *
 * @api private
 */

Switchery.prototype.bindClick = function() {
  var parent = this.element.parentNode.tagName.toLowerCase()
    , labelParent = (parent === 'label') ? false : true;

  this.setPosition(labelParent);
  this.handleOnchange(this.element.checked);
};

/**
 * Mark an individual switch as already handled.
 *
 * @api private
 */

Switchery.prototype.markAsSwitched = function() {
  this.element.setAttribute('data-switchery', true);
};

/**
 * Check if an individual switch is already handled.
 *
 * @api private
 */

Switchery.prototype.markedAsSwitched = function() {
  return this.element.getAttribute('data-switchery');
};

/**
 * Initialize Switchery.
 *
 * @api private
 */

Switchery.prototype.init = function() {
  this.hide();
  this.show();
  this.setSize();
  this.setPosition();
  this.markAsSwitched();
  this.handleChange();
  this.handleClick();
};

/**
 * See if input is checked.
 *
 * @returns {Boolean}
 * @api public
 */

Switchery.prototype.isChecked = function() {
  return this.element.checked;
};

/**
 * See if switcher should be disabled.
 *
 * @returns {Boolean}
 * @api public
 */

Switchery.prototype.isDisabled = function() {
  return this.options.disabled || this.element.disabled || this.element.readOnly;
};

/**
 * Destroy all event handlers attached to the switch.
 *
 * @api public
 */

Switchery.prototype.destroy = function() {
  this.events.unbind();
};

/**
 * Enable disabled switch element.
 *
 * @api public
 */

Switchery.prototype.enable = function() {
  if (this.options.disabled) this.options.disabled = false;
  if (this.element.disabled) this.element.disabled = false;
  if (this.element.readOnly) this.element.readOnly = false;
  this.switcher.style.opacity = 1;
  this.events.bind('click', 'bindClick');
};

/**
 * Disable switch element.
 *
 * @api public
 */

Switchery.prototype.disable = function() {
  if (!this.options.disabled) this.options.disabled = true;
  if (!this.element.disabled) this.element.disabled = true;
  if (!this.element.readOnly) this.element.readOnly = true;
  this.switcher.style.opacity = this.options.disabledOpacity;
  this.destroy();
};

});

if (typeof exports == "object") {
  module.exports = require("switchery");
} else if (typeof define == "function" && define.amd) {
  define("Switchery", [], function(){ return require("switchery"); });
} else {
  (this || window)["Switchery"] = require("switchery");
}
})()

/**
 * @preserve jQuery DateTimePicker plugin v2.4.5
 * @homepage http://xdsoft.net/jqplugins/datetimepicker/
 * (c) 2014, Chupurnov Valeriy.
 */
/*global document,window,jQuery,setTimeout,clearTimeout,HighlightedDate,getCurrentValue*/
;(function (factory) {
	if ( typeof define === 'function' && define.amd ) {
		// AMD. Register as an anonymous module.
		define(['jquery', 'jquery-mousewheel', 'date-functions'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS style for Browserify
		module.exports = factory;
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
	'use strict';
	var default_options  = {
		i18n: {
			ar: { // Arabic
				months: [
					"كانون الثاني", "شباط", "آذار", "نيسان", "مايو", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"
				],
				dayOfWeekShort: [
					"ن", "ث", "ع", "خ", "ج", "س", "ح"
				],
				dayOfWeek: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"]
			},
			ro: { // Romanian
				months: [
					"Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"
				],
				dayOfWeekShort: [
					"Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sâ"
				],
				dayOfWeek: ["Duminică", "Luni", "Marţi", "Miercuri", "Joi", "Vineri", "Sâmbătă"]
			},
			id: { // Indonesian
				months: [
					"Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
				],
				dayOfWeekShort: [
					"Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"
				],
				dayOfWeek: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
			},
			is: { // Icelandic
				months: [
					"Janúar", "Febrúar", "Mars", "Apríl", "Maí", "Júní", "Júlí", "Ágúst", "September", "Október", "Nóvember", "Desember"
				],
				dayOfWeekShort: [
					"Sun", "Mán", "Þrið", "Mið", "Fim", "Fös", "Lau"
				],
				dayOfWeek: ["Sunnudagur", "Mánudagur", "Þriðjudagur", "Miðvikudagur", "Fimmtudagur", "Föstudagur", "Laugardagur"]
			},
			bg: { // Bulgarian
				months: [
					"Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"
				],
				dayOfWeekShort: [
					"Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"
				],
				dayOfWeek: ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота"]
			},
			fa: { // Persian/Farsi
				months: [
					'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
				],
				dayOfWeekShort: [
					'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'
				],
				dayOfWeek: ["یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه", "یک‌شنبه"]
			},
			ru: { // Russian
				months: [
					'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
				],
				dayOfWeekShort: [
					"Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"
				],
				dayOfWeek: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
			},
			uk: { // Ukrainian
				months: [
					'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
				],
				dayOfWeekShort: [
					"Ндл", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Сбт"
				],
				dayOfWeek: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"]
			},
			en: { // English
				months: [
					"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
				],
				dayOfWeekShort: [
					"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
				],
				dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
			},
			el: { // Ελληνικά
				months: [
					"Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"
				],
				dayOfWeekShort: [
					"Κυρ", "Δευ", "Τρι", "Τετ", "Πεμ", "Παρ", "Σαβ"
				],
				dayOfWeek: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"]
			},
			de: { // German
				months: [
					'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
				],
				dayOfWeekShort: [
					"So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"
				],
				dayOfWeek: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
			},
			nl: { // Dutch
				months: [
					"januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"
				],
				dayOfWeekShort: [
					"zo", "ma", "di", "wo", "do", "vr", "za"
				],
				dayOfWeek: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"]
			},
			tr: { // Turkish
				months: [
					"Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
				],
				dayOfWeekShort: [
					"Paz", "Pts", "Sal", "Çar", "Per", "Cum", "Cts"
				],
				dayOfWeek: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"]
			},
			fr: { //French
				months: [
					"Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
				],
				dayOfWeekShort: [
					"Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"
				],
				dayOfWeek: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]
			},
			es: { // Spanish
				months: [
					"Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
				],
				dayOfWeekShort: [
					"Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"
				],
				dayOfWeek: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
			},
			th: { // Thai
				months: [
					'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
				],
				dayOfWeekShort: [
					'อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'
				],
				dayOfWeek: ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "อาทิตย์"]
			},
			pl: { // Polish
				months: [
					"styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"
				],
				dayOfWeekShort: [
					"nd", "pn", "wt", "śr", "cz", "pt", "sb"
				],
				dayOfWeek: ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"]
			},
			pt: { // Portuguese
				months: [
					"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
				],
				dayOfWeekShort: [
					"Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"
				],
				dayOfWeek: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
			},
			ch: { // Simplified Chinese
				months: [
					"一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
				],
				dayOfWeekShort: [
					"日", "一", "二", "三", "四", "五", "六"
				]
			},
			se: { // Swedish
				months: [
					"Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September",  "Oktober", "November", "December"
				],
				dayOfWeekShort: [
					"Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"
				]
			},
			kr: { // Korean
				months: [
					"1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"
				],
				dayOfWeekShort: [
					"일", "월", "화", "수", "목", "금", "토"
				],
				dayOfWeek: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
			},
			it: { // Italian
				months: [
					"Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
				],
				dayOfWeekShort: [
					"Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"
				],
				dayOfWeek: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"]
			},
			da: { // Dansk
				months: [
					"January", "Februar", "Marts", "April", "Maj", "Juni", "July", "August", "September", "Oktober", "November", "December"
				],
				dayOfWeekShort: [
					"Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"
				],
				dayOfWeek: ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"]
			},
			no: { // Norwegian
				months: [
					"Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"
				],
				dayOfWeekShort: [
					"Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"
				],
				dayOfWeek: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag']
			},
			ja: { // Japanese
				months: [
					"1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"
				],
				dayOfWeekShort: [
					"日", "月", "火", "水", "木", "金", "土"
				],
				dayOfWeek: ["日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜"]
			},
			vi: { // Vietnamese
				months: [
					"Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
				],
				dayOfWeekShort: [
					"CN", "T2", "T3", "T4", "T5", "T6", "T7"
				],
				dayOfWeek: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"]
			},
			sl: { // Slovenščina
				months: [
					"Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"
				],
				dayOfWeekShort: [
					"Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"
				],
				dayOfWeek: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"]
			},
			cs: { // Čeština
				months: [
					"Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"
				],
				dayOfWeekShort: [
					"Ne", "Po", "Út", "St", "Čt", "Pá", "So"
				]
			},
			hu: { // Hungarian
				months: [
					"Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"
				],
				dayOfWeekShort: [
					"Va", "Hé", "Ke", "Sze", "Cs", "Pé", "Szo"
				],
				dayOfWeek: ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"]
			},
			az: { //Azerbaijanian (Azeri)
				months: [
					"Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
				],
				dayOfWeekShort: [
					"B", "Be", "Ça", "Ç", "Ca", "C", "Ş"
				],
				dayOfWeek: ["Bazar", "Bazar ertəsi", "Çərşənbə axşamı", "Çərşənbə", "Cümə axşamı", "Cümə", "Şənbə"]
			},
			bs: { //Bosanski
				months: [
					"Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"
				],
				dayOfWeekShort: [
					"Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"
				],
				dayOfWeek: ["Nedjelja","Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"]
			},
			ca: { //Català
				months: [
					"Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"
				],
				dayOfWeekShort: [
					"Dg", "Dl", "Dt", "Dc", "Dj", "Dv", "Ds"
				],
				dayOfWeek: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"]
			},
			'en-GB': { //English (British)
				months: [
					"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
				],
				dayOfWeekShort: [
					"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
				],
				dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
			},
			et: { //"Eesti"
				months: [
					"Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"
				],
				dayOfWeekShort: [
					"P", "E", "T", "K", "N", "R", "L"
				],
				dayOfWeek: ["Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"]
			},
			eu: { //Euskara
				months: [
					"Urtarrila", "Otsaila", "Martxoa", "Apirila", "Maiatza", "Ekaina", "Uztaila", "Abuztua", "Iraila", "Urria", "Azaroa", "Abendua"
				],
				dayOfWeekShort: [
					"Ig.", "Al.", "Ar.", "Az.", "Og.", "Or.", "La."
				],
				dayOfWeek: ['Igandea', 'Astelehena', 'Asteartea', 'Asteazkena', 'Osteguna', 'Ostirala', 'Larunbata']
			},
			fi: { //Finnish (Suomi)
				months: [
					"Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"
				],
				dayOfWeekShort: [
					"Su", "Ma", "Ti", "Ke", "To", "Pe", "La"
				],
				dayOfWeek: ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"]
			},
			gl: { //Galego
				months: [
					"Xan", "Feb", "Maz", "Abr", "Mai", "Xun", "Xul", "Ago", "Set", "Out", "Nov", "Dec"
				],
				dayOfWeekShort: [
					"Dom", "Lun", "Mar", "Mer", "Xov", "Ven", "Sab"
				],
				dayOfWeek: ["Domingo", "Luns", "Martes", "Mércores", "Xoves", "Venres", "Sábado"]
			},
			hr: { //Hrvatski
				months: [
					"Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"
				],
				dayOfWeekShort: [
					"Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"
				],
				dayOfWeek: ["Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"]
			},
			ko: { //Korean (한국어)
				months: [
					"1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"
				],
				dayOfWeekShort: [
					"일", "월", "화", "수", "목", "금", "토"
				],
				dayOfWeek: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
			},
			lt: { //Lithuanian (lietuvių)
				months: [
					"Sausio", "Vasario", "Kovo", "Balandžio", "Gegužės", "Birželio", "Liepos", "Rugpjūčio", "Rugsėjo", "Spalio", "Lapkričio", "Gruodžio"
				],
				dayOfWeekShort: [
					"Sek", "Pir", "Ant", "Tre", "Ket", "Pen", "Šeš"
				],
				dayOfWeek: ["Sekmadienis", "Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis"]
			},
			lv: { //Latvian (Latviešu)
				months: [
					"Janvāris", "Februāris", "Marts", "Aprīlis ", "Maijs", "Jūnijs", "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris"
				],
				dayOfWeekShort: [
					"Sv", "Pr", "Ot", "Tr", "Ct", "Pk", "St"
				],
				dayOfWeek: ["Svētdiena", "Pirmdiena", "Otrdiena", "Trešdiena", "Ceturtdiena", "Piektdiena", "Sestdiena"]
			},
			mk: { //Macedonian (Македонски)
				months: [
					"јануари", "февруари", "март", "април", "мај", "јуни", "јули", "август", "септември", "октомври", "ноември", "декември"
				],
				dayOfWeekShort: [
					"нед", "пон", "вто", "сре", "чет", "пет", "саб"
				],
				dayOfWeek: ["Недела", "Понеделник", "Вторник", "Среда", "Четврток", "Петок", "Сабота"]
			},
			mn: { //Mongolian (Монгол)
				months: [
					"1-р сар", "2-р сар", "3-р сар", "4-р сар", "5-р сар", "6-р сар", "7-р сар", "8-р сар", "9-р сар", "10-р сар", "11-р сар", "12-р сар"
				],
				dayOfWeekShort: [
					"Дав", "Мяг", "Лха", "Пүр", "Бсн", "Бям", "Ням"
				],
				dayOfWeek: ["Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба", "Ням"]
			},
			'pt-BR': { //Português(Brasil)
				months: [
					"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
				],
				dayOfWeekShort: [
					"Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"
				],
				dayOfWeek: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
			},
			sk: { //Slovenčina
				months: [
					"Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"
				],
				dayOfWeekShort: [
					"Ne", "Po", "Ut", "St", "Št", "Pi", "So"
				],
				dayOfWeek: ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"]
			},
			sq: { //Albanian (Shqip)
				months: [
					"Janar", "Shkurt", "Mars", "Prill", "Maj", "Qershor", "Korrik", "Gusht", "Shtator", "Tetor", "Nëntor", "Dhjetor"
				],
				dayOfWeekShort: [
					"Die", "Hën", "Mar", "Mër", "Enj", "Pre", "Shtu"
				],
				dayOfWeek: ["E Diel", "E Hënë", "E Martē", "E Mërkurë", "E Enjte", "E Premte", "E Shtunë"]
			},
			'sr-YU': { //Serbian (Srpski)
				months: [
					"Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"
				],
				dayOfWeekShort: [
					"Ned", "Pon", "Uto", "Sre", "čet", "Pet", "Sub"
				],
				dayOfWeek: ["Nedelja","Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota"]
			},
			sr: { //Serbian Cyrillic (Српски)
				months: [
					"јануар", "фебруар", "март", "април", "мај", "јун", "јул", "август", "септембар", "октобар", "новембар", "децембар"
				],
				dayOfWeekShort: [
					"нед", "пон", "уто", "сре", "чет", "пет", "суб"
				],
				dayOfWeek: ["Недеља","Понедељак", "Уторак", "Среда", "Четвртак", "Петак", "Субота"]
			},
			sv: { //Svenska
				months: [
					"Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"
				],
				dayOfWeekShort: [
					"Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"
				],
				dayOfWeek: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"]
			},
			'zh-TW': { //Traditional Chinese (繁體中文)
				months: [
					"一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
				],
				dayOfWeekShort: [
					"日", "一", "二", "三", "四", "五", "六"
				],
				dayOfWeek: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
			},
			zh: { //Simplified Chinese (简体中文)
				months: [
					"一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
				],
				dayOfWeekShort: [
					"日", "一", "二", "三", "四", "五", "六"
				],
				dayOfWeek: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
			},
			he: { //Hebrew (עברית)
				months: [
					'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
				],
				dayOfWeekShort: [
					'א\'', 'ב\'', 'ג\'', 'ד\'', 'ה\'', 'ו\'', 'שבת'
				],
				dayOfWeek: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת", "ראשון"]
			},
			hy: { // Armenian
				months: [
					"Հունվար", "Փետրվար", "Մարտ", "Ապրիլ", "Մայիս", "Հունիս", "Հուլիս", "Օգոստոս", "Սեպտեմբեր", "Հոկտեմբեր", "Նոյեմբեր", "Դեկտեմբեր"
				],
				dayOfWeekShort: [
					"Կի", "Երկ", "Երք", "Չոր", "Հնգ", "Ուրբ", "Շբթ"
				],
				dayOfWeek: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"]
			},
            kg: { // Kyrgyz
                months: [
                    'Үчтүн айы', 'Бирдин айы', 'Жалган Куран', 'Чын Куран', 'Бугу', 'Кулжа', 'Теке', 'Баш Оона', 'Аяк Оона', 'Тогуздун айы', 'Жетинин айы', 'Бештин айы'
                ],
                dayOfWeekShort: [
                    "Жек", "Дүй", "Шей", "Шар", "Бей", "Жум", "Ише"
                ],
				dayOfWeek: [
                    "Жекшемб", "Дүйшөмб", "Шейшемб", "Шаршемб", "Бейшемби", "Жума", "Ишенб"
                ]
            }
		},
		value: '',
		rtl: false,

		format:	'Y/m/d H:i',
		formatTime:	'H:i',
		formatDate:	'Y/m/d',

		startDate:	false, // new Date(), '1986/12/08', '-1970/01/05','-1970/01/05',
		step: 60,
		monthChangeSpinner: true,

		closeOnDateSelect: false,
		closeOnTimeSelect: true,
		closeOnWithoutClick: true,
		closeOnInputClick: true,

		timepicker: true,
		datepicker: true,
		weeks: false,

		defaultTime: false,	// use formatTime format (ex. '10:00' for formatTime:	'H:i')
		defaultDate: false,	// use formatDate format (ex new Date() or '1986/12/08' or '-1970/01/05' or '-1970/01/05')

		minDate: false,
		maxDate: false,
		minTime: false,
		maxTime: false,
		disabledMinTime: false,
		disabledMaxTime: false,

		allowTimes: [],
		opened: false,
		initTime: true,
		inline: false,
		theme: '',

		onSelectDate: function () {},
		onSelectTime: function () {},
		onChangeMonth: function () {},
		onChangeYear: function () {},
		onChangeDateTime: function () {},
		onShow: function () {},
		onClose: function () {},
		onGenerate: function () {},

		withoutCopyright: true,
		inverseButton: false,
		hours12: false,
		next: 'xdsoft_next',
		prev : 'xdsoft_prev',
		dayOfWeekStart: 0,
		parentID: 'body',
		timeHeightInTimePicker: 25,
		timepickerScrollbar: true,
		todayButton: true,
		prevButton: true,
		nextButton: true,
		defaultSelect: true,

		scrollMonth: true,
		scrollTime: true,
		scrollInput: true,

		lazyInit: false,
		mask: false,
		validateOnBlur: true,
		allowBlank: true,
		yearStart: 1950,
		yearEnd: 2050,
		monthStart: 0,
		monthEnd: 11,
		style: '',
		id: '',
		fixed: false,
		roundTime: 'round', // ceil, floor
		className: '',
		weekends: [],
		highlightedDates: [],
		highlightedPeriods: [],
		disabledDates : [],
		disabledWeekDays: [],
		yearOffset: 0,
		beforeShowDay: null,

		enterLikeTab: true,
        showApplyButton: false
	};

	var globalLocaleDefault = 'en',
		globalLocale = 'en';
	// for locale settings
	$.datetimepicker = {
		setLocale: function(locale){
			globalLocale = default_options.i18n[locale]?locale:globalLocaleDefault;
			// Override Parse and Format Library entities
			Date.monthNames = default_options.i18n[globalLocale].months;
			Date.dayNames = default_options.i18n[globalLocale].dayOfWeek;
		}
	};

	// fix for ie8
	if (!window.getComputedStyle) {
		window.getComputedStyle = function (el, pseudo) {
			this.el = el;
			this.getPropertyValue = function (prop) {
				var re = /(\-([a-z]){1})/g;
				if (prop === 'float') {
					prop = 'styleFloat';
				}
				if (re.test(prop)) {
					prop = prop.replace(re, function (a, b, c) {
						return c.toUpperCase();
					});
				}
				return el.currentStyle[prop] || null;
			};
			return this;
		};
	}
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function (obj, start) {
			var i, j;
			for (i = (start || 0), j = this.length; i < j; i += 1) {
				if (this[i] === obj) { return i; }
			}
			return -1;
		};
	}
	Date.prototype.countDaysInMonth = function () {
		return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
	};
	$.fn.xdsoftScroller = function (percent) {
		return this.each(function () {
			var timeboxparent = $(this),
				pointerEventToXY = function (e) {
					var out = {x: 0, y: 0},
						touch;
					if (e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend' || e.type === 'touchcancel') {
						touch  = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
						out.x = touch.clientX;
						out.y = touch.clientY;
					} else if (e.type === 'mousedown' || e.type === 'mouseup' || e.type === 'mousemove' || e.type === 'mouseover' || e.type === 'mouseout' || e.type === 'mouseenter' || e.type === 'mouseleave') {
						out.x = e.clientX;
						out.y = e.clientY;
					}
					return out;
				},
				move = 0,
				timebox,
				parentHeight,
				height,
				scrollbar,
				scroller,
				maximumOffset = 100,
				start = false,
				startY = 0,
				startTop = 0,
				h1 = 0,
				touchStart = false,
				startTopScroll = 0,
				calcOffset = function () {};
			if (percent === 'hide') {
				timeboxparent.find('.xdsoft_scrollbar').hide();
				return;
			}
			if (!$(this).hasClass('xdsoft_scroller_box')) {
				timebox = timeboxparent.children().eq(0);
				parentHeight = timeboxparent[0].clientHeight;
				height = timebox[0].offsetHeight;
				scrollbar = $('<div class="xdsoft_scrollbar"></div>');
				scroller = $('<div class="xdsoft_scroller"></div>');
				scrollbar.append(scroller);

				timeboxparent.addClass('xdsoft_scroller_box').append(scrollbar);
				calcOffset = function calcOffset(event) {
					var offset = pointerEventToXY(event).y - startY + startTopScroll;
					if (offset < 0) {
						offset = 0;
					}
					if (offset + scroller[0].offsetHeight > h1) {
						offset = h1 - scroller[0].offsetHeight;
					}
					timeboxparent.trigger('scroll_element.xdsoft_scroller', [maximumOffset ? offset / maximumOffset : 0]);
				};

				scroller
					.on('touchstart.xdsoft_scroller mousedown.xdsoft_scroller', function (event) {
						if (!parentHeight) {
							timeboxparent.trigger('resize_scroll.xdsoft_scroller', [percent]);
						}

						startY = pointerEventToXY(event).y;
						startTopScroll = parseInt(scroller.css('margin-top'), 10);
						h1 = scrollbar[0].offsetHeight;

						if (event.type === 'mousedown') {
							if (document) {
								$(document.body).addClass('xdsoft_noselect');
							}
							$([document.body, window]).on('mouseup.xdsoft_scroller', function arguments_callee() {
								$([document.body, window]).off('mouseup.xdsoft_scroller', arguments_callee)
									.off('mousemove.xdsoft_scroller', calcOffset)
									.removeClass('xdsoft_noselect');
							});
							$(document.body).on('mousemove.xdsoft_scroller', calcOffset);
						} else {
							touchStart = true;
							event.stopPropagation();
							event.preventDefault();
						}
					})
					.on('touchmove', function (event) {
						if (touchStart) {
							event.preventDefault();
							calcOffset(event);
						}
					})
					.on('touchend touchcancel', function (event) {
						touchStart =  false;
						startTopScroll = 0;
					});

				timeboxparent
					.on('scroll_element.xdsoft_scroller', function (event, percentage) {
						if (!parentHeight) {
							timeboxparent.trigger('resize_scroll.xdsoft_scroller', [percentage, true]);
						}
						percentage = percentage > 1 ? 1 : (percentage < 0 || isNaN(percentage)) ? 0 : percentage;

						scroller.css('margin-top', maximumOffset * percentage);

						setTimeout(function () {
							timebox.css('marginTop', -parseInt((timebox[0].offsetHeight - parentHeight) * percentage, 10));
						}, 10);
					})
					.on('resize_scroll.xdsoft_scroller', function (event, percentage, noTriggerScroll) {
						var percent, sh;
						parentHeight = timeboxparent[0].clientHeight;
						height = timebox[0].offsetHeight;
						percent = parentHeight / height;
						sh = percent * scrollbar[0].offsetHeight;
						if (percent > 1) {
							scroller.hide();
						} else {
							scroller.show();
							scroller.css('height', parseInt(sh > 10 ? sh : 10, 10));
							maximumOffset = scrollbar[0].offsetHeight - scroller[0].offsetHeight;
							if (noTriggerScroll !== true) {
								timeboxparent.trigger('scroll_element.xdsoft_scroller', [percentage || Math.abs(parseInt(timebox.css('marginTop'), 10)) / (height - parentHeight)]);
							}
						}
					});

				timeboxparent.on('mousewheel', function (event) {
					var top = Math.abs(parseInt(timebox.css('marginTop'), 10));

					top = top - (event.deltaY * 20);
					if (top < 0) {
						top = 0;
					}

					timeboxparent.trigger('scroll_element.xdsoft_scroller', [top / (height - parentHeight)]);
					event.stopPropagation();
					return false;
				});

				timeboxparent.on('touchstart', function (event) {
					start = pointerEventToXY(event);
					startTop = Math.abs(parseInt(timebox.css('marginTop'), 10));
				});

				timeboxparent.on('touchmove', function (event) {
					if (start) {
						event.preventDefault();
						var coord = pointerEventToXY(event);
						timeboxparent.trigger('scroll_element.xdsoft_scroller', [(startTop - (coord.y - start.y)) / (height - parentHeight)]);
					}
				});

				timeboxparent.on('touchend touchcancel', function (event) {
					start = false;
					startTop = 0;
				});
			}
			timeboxparent.trigger('resize_scroll.xdsoft_scroller', [percent]);
		});
	};

	$.fn.datetimepicker = function (opt) {
		var KEY0 = 48,
			KEY9 = 57,
			_KEY0 = 96,
			_KEY9 = 105,
			CTRLKEY = 17,
			DEL = 46,
			ENTER = 13,
			ESC = 27,
			BACKSPACE = 8,
			ARROWLEFT = 37,
			ARROWUP = 38,
			ARROWRIGHT = 39,
			ARROWDOWN = 40,
			TAB = 9,
			F5 = 116,
			AKEY = 65,
			CKEY = 67,
			VKEY = 86,
			ZKEY = 90,
			YKEY = 89,
			ctrlDown	=	false,
			options = ($.isPlainObject(opt) || !opt) ? $.extend(true, {}, default_options, opt) : $.extend(true, {}, default_options),

			lazyInitTimer = 0,
			createDateTimePicker,
			destroyDateTimePicker,

			lazyInit = function (input) {
				input
					.on('open.xdsoft focusin.xdsoft mousedown.xdsoft', function initOnActionCallback(event) {
						if (input.is(':disabled') || input.data('xdsoft_datetimepicker')) {
							return;
						}
						clearTimeout(lazyInitTimer);
						lazyInitTimer = setTimeout(function () {

							if (!input.data('xdsoft_datetimepicker')) {
								createDateTimePicker(input);
							}
							input
								.off('open.xdsoft focusin.xdsoft mousedown.xdsoft', initOnActionCallback)
								.trigger('open.xdsoft');
						}, 100);
					});
			};

		createDateTimePicker = function (input) {
			var datetimepicker = $('<div class="xdsoft_datetimepicker xdsoft_noselect"></div>'),
				xdsoft_copyright = $('<div class="xdsoft_copyright"><a target="_blank" href="http://xdsoft.net/jqplugins/datetimepicker/">xdsoft.net</a></div>'),
				datepicker = $('<div class="xdsoft_datepicker active"></div>'),
				mounth_picker = $('<div class="xdsoft_mounthpicker"><button type="button" class="xdsoft_prev"></button><button type="button" class="xdsoft_today_button"></button>' +
					'<div class="xdsoft_label xdsoft_month"><span></span><i></i></div>' +
					'<div class="xdsoft_label xdsoft_year"><span></span><i></i></div>' +
					'<button type="button" class="xdsoft_next"></button></div>'),
				calendar = $('<div class="xdsoft_calendar"></div>'),
				timepicker = $('<div class="xdsoft_timepicker active"><button type="button" class="xdsoft_prev"></button><div class="xdsoft_time_box"></div><button type="button" class="xdsoft_next"></button></div>'),
				timeboxparent = timepicker.find('.xdsoft_time_box').eq(0),
				timebox = $('<div class="xdsoft_time_variant"></div>'),
                applyButton = $('<button type="button" class="xdsoft_save_selected blue-gradient-button">Save Selected</button>'),
				/*scrollbar = $('<div class="xdsoft_scrollbar"></div>'),
				scroller = $('<div class="xdsoft_scroller"></div>'),*/
				monthselect = $('<div class="xdsoft_select xdsoft_monthselect"><div></div></div>'),
				yearselect = $('<div class="xdsoft_select xdsoft_yearselect"><div></div></div>'),
				triggerAfterOpen = false,
				XDSoft_datetime,
				//scroll_element,
				xchangeTimer,
				timerclick,
				current_time_index,
				setPos,
				timer = 0,
				timer1 = 0,
				_xdsoft_datetime;

			if (options.id) {
				datetimepicker.attr('id', options.id);
			}
			if (options.style) {
				datetimepicker.attr('style', options.style);
			}
			if (options.weeks) {
				datetimepicker.addClass('xdsoft_showweeks');
			}
			if (options.rtl) {
				datetimepicker.addClass('xdsoft_rtl');
			}

			datetimepicker.addClass('xdsoft_' + options.theme);
			datetimepicker.addClass(options.className);

			mounth_picker
				.find('.xdsoft_month span')
					.after(monthselect);
			mounth_picker
				.find('.xdsoft_year span')
					.after(yearselect);

			mounth_picker
				.find('.xdsoft_month,.xdsoft_year')
					.on('mousedown.xdsoft', function (event) {
					var select = $(this).find('.xdsoft_select').eq(0),
						val = 0,
						top = 0,
						visible = select.is(':visible'),
						items,
						i;

					mounth_picker
						.find('.xdsoft_select')
							.hide();
					if (_xdsoft_datetime.currentTime) {
						val = _xdsoft_datetime.currentTime[$(this).hasClass('xdsoft_month') ? 'getMonth' : 'getFullYear']();
					}

					select[visible ? 'hide' : 'show']();
					for (items = select.find('div.xdsoft_option'), i = 0; i < items.length; i += 1) {
						if (items.eq(i).data('value') === val) {
							break;
						} else {
							top += items[0].offsetHeight;
						}
					}

					select.xdsoftScroller(top / (select.children()[0].offsetHeight - (select[0].clientHeight)));
					event.stopPropagation();
					return false;
				});

			mounth_picker
				.find('.xdsoft_select')
					.xdsoftScroller()
				.on('mousedown.xdsoft', function (event) {
					event.stopPropagation();
					event.preventDefault();
				})
				.on('mousedown.xdsoft', '.xdsoft_option', function (event) {

					if (_xdsoft_datetime.currentTime === undefined || _xdsoft_datetime.currentTime === null) {
						_xdsoft_datetime.currentTime = _xdsoft_datetime.now();
					}

					var year = _xdsoft_datetime.currentTime.getFullYear();
					if (_xdsoft_datetime && _xdsoft_datetime.currentTime) {
						_xdsoft_datetime.currentTime[$(this).parent().parent().hasClass('xdsoft_monthselect') ? 'setMonth' : 'setFullYear']($(this).data('value'));
					}

					$(this).parent().parent().hide();

					datetimepicker.trigger('xchange.xdsoft');
					if (options.onChangeMonth && $.isFunction(options.onChangeMonth)) {
						options.onChangeMonth.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
					}

					if (year !== _xdsoft_datetime.currentTime.getFullYear() && $.isFunction(options.onChangeYear)) {
						options.onChangeYear.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
					}
				});

			datetimepicker.setOptions = function (_options) {
				var highlightedDates = {},
					getCaretPos = function (input) {
						try {
							if (document.selection && document.selection.createRange) {
								var range = document.selection.createRange();
								return range.getBookmark().charCodeAt(2) - 2;
							}
							if (input.setSelectionRange) {
								return input.selectionStart;
							}
						} catch (e) {
							return 0;
						}
					},
					setCaretPos = function (node, pos) {
						node = (typeof node === "string" || node instanceof String) ? document.getElementById(node) : node;
						if (!node) {
							return false;
						}
						if (node.createTextRange) {
							var textRange = node.createTextRange();
							textRange.collapse(true);
							textRange.moveEnd('character', pos);
							textRange.moveStart('character', pos);
							textRange.select();
							return true;
						}
						if (node.setSelectionRange) {
							node.setSelectionRange(pos, pos);
							return true;
						}
						return false;
					},
					isValidValue = function (mask, value) {
						var reg = mask
							.replace(/([\[\]\/\{\}\(\)\-\.\+]{1})/g, '\\$1')
							.replace(/_/g, '{digit+}')
							.replace(/([0-9]{1})/g, '{digit$1}')
							.replace(/\{digit([0-9]{1})\}/g, '[0-$1_]{1}')
							.replace(/\{digit[\+]\}/g, '[0-9_]{1}');
						return (new RegExp(reg)).test(value);
					};
				options = $.extend(true, {}, options, _options);

				if (_options.allowTimes && $.isArray(_options.allowTimes) && _options.allowTimes.length) {
					options.allowTimes = $.extend(true, [], _options.allowTimes);
				}

				if (_options.weekends && $.isArray(_options.weekends) && _options.weekends.length) {
					options.weekends = $.extend(true, [], _options.weekends);
				}

				if (_options.highlightedDates && $.isArray(_options.highlightedDates) && _options.highlightedDates.length) {
					$.each(_options.highlightedDates, function (index, value) {
						var splitData = $.map(value.split(','), $.trim),
							exDesc,
							hDate = new HighlightedDate(Date.parseDate(splitData[0], options.formatDate), splitData[1], splitData[2]), // date, desc, style
							keyDate = hDate.date.dateFormat(options.formatDate);
						if (highlightedDates[keyDate] !== undefined) {
							exDesc = highlightedDates[keyDate].desc;
							if (exDesc && exDesc.length && hDate.desc && hDate.desc.length) {
								highlightedDates[keyDate].desc = exDesc + "\n" + hDate.desc;
							}
						} else {
							highlightedDates[keyDate] = hDate;
						}
					});

					options.highlightedDates = $.extend(true, [], highlightedDates);
				}

				if (_options.highlightedPeriods && $.isArray(_options.highlightedPeriods) && _options.highlightedPeriods.length) {
					highlightedDates = $.extend(true, [], options.highlightedDates);
					$.each(_options.highlightedPeriods, function (index, value) {
						var dateTest, // start date
							dateEnd,
							desc,
							hDate,
							keyDate,
							exDesc,
							style;
						if ($.isArray(value)) {
							dateTest = value[0];
							dateEnd = value[1];
							desc = value[2];
							style = value[3];
						}
						else {
							var splitData = $.map(value.split(','), $.trim);
							dateTest = Date.parseDate(splitData[0], options.formatDate);
							dateEnd = Date.parseDate(splitData[1], options.formatDate);
							desc = splitData[2];
							style = splitData[3];
						}

						while (dateTest <= dateEnd) {
							hDate = new HighlightedDate(dateTest, desc, style);
							keyDate = dateTest.dateFormat(options.formatDate);
							dateTest.setDate(dateTest.getDate() + 1);
							if (highlightedDates[keyDate] !== undefined) {
								exDesc = highlightedDates[keyDate].desc;
								if (exDesc && exDesc.length && hDate.desc && hDate.desc.length) {
									highlightedDates[keyDate].desc = exDesc + "\n" + hDate.desc;
								}
							} else {
								highlightedDates[keyDate] = hDate;
							}
						}
					});

					options.highlightedDates = $.extend(true, [], highlightedDates);
				}

				if (_options.disabledDates && $.isArray(_options.disabledDates) && _options.disabledDates.length) {
					options.disabledDates = $.extend(true, [], _options.disabledDates);
				}

				if (_options.disabledWeekDays && $.isArray(_options.disabledWeekDays) && _options.disabledWeekDays.length) {
				    options.disabledWeekDays = $.extend(true, [], _options.disabledWeekDays);
				}

				if ((options.open || options.opened) && (!options.inline)) {
					input.trigger('open.xdsoft');
				}

				if (options.inline) {
					triggerAfterOpen = true;
					datetimepicker.addClass('xdsoft_inline');
					input.after(datetimepicker).hide();
				}

				if (options.inverseButton) {
					options.next = 'xdsoft_prev';
					options.prev = 'xdsoft_next';
				}

				if (options.datepicker) {
					datepicker.addClass('active');
				} else {
					datepicker.removeClass('active');
				}

				if (options.timepicker) {
					timepicker.addClass('active');
				} else {
					timepicker.removeClass('active');
				}

				if (options.value) {
					_xdsoft_datetime.setCurrentTime(options.value);
					if (input && input.val) {
						input.val(_xdsoft_datetime.str);
					}
				}

				if (isNaN(options.dayOfWeekStart)) {
					options.dayOfWeekStart = 0;
				} else {
					options.dayOfWeekStart = parseInt(options.dayOfWeekStart, 10) % 7;
				}

				if (!options.timepickerScrollbar) {
					timeboxparent.xdsoftScroller('hide');
				}

				if (options.minDate && /^[\+\-](.*)$/.test(options.minDate)) {
					options.minDate = _xdsoft_datetime.strToDateTime(options.minDate).dateFormat(options.formatDate);
				}

				if (options.maxDate &&  /^[\+\-](.*)$/.test(options.maxDate)) {
					options.maxDate = _xdsoft_datetime.strToDateTime(options.maxDate).dateFormat(options.formatDate);
				}

				applyButton.toggle(options.showApplyButton);

				mounth_picker
					.find('.xdsoft_today_button')
						.css('visibility', !options.todayButton ? 'hidden' : 'visible');

				mounth_picker
					.find('.' + options.prev)
						.css('visibility', !options.prevButton ? 'hidden' : 'visible');

				mounth_picker
					.find('.' + options.next)
						.css('visibility', !options.nextButton ? 'hidden' : 'visible');

				if (options.mask) {
					input.off('keydown.xdsoft');

					if (options.mask === true) {
						options.mask = options.format
							.replace(/Y/g, '9999')
							.replace(/F/g, '9999')
							.replace(/m/g, '19')
							.replace(/d/g, '39')
							.replace(/H/g, '29')
							.replace(/i/g, '59')
							.replace(/s/g, '59');
					}

					if ($.type(options.mask) === 'string') {
						if (!isValidValue(options.mask, input.val())) {
							input.val(options.mask.replace(/[0-9]/g, '_'));
						}

						input.on('keydown.xdsoft', function (event) {
							var val = this.value,
								key = event.which,
								pos,
								digit;

							if (((key >= KEY0 && key <= KEY9) || (key >= _KEY0 && key <= _KEY9)) || (key === BACKSPACE || key === DEL)) {
								pos = getCaretPos(this);
								digit = (key !== BACKSPACE && key !== DEL) ? String.fromCharCode((_KEY0 <= key && key <= _KEY9) ? key - KEY0 : key) : '_';

								if ((key === BACKSPACE || key === DEL) && pos) {
									pos -= 1;
									digit = '_';
								}

								while (/[^0-9_]/.test(options.mask.substr(pos, 1)) && pos < options.mask.length && pos > 0) {
									pos += (key === BACKSPACE || key === DEL) ? -1 : 1;
								}

								val = val.substr(0, pos) + digit + val.substr(pos + 1);
								if ($.trim(val) === '') {
									val = options.mask.replace(/[0-9]/g, '_');
								} else {
									if (pos === options.mask.length) {
										event.preventDefault();
										return false;
									}
								}

								pos += (key === BACKSPACE || key === DEL) ? 0 : 1;
								while (/[^0-9_]/.test(options.mask.substr(pos, 1)) && pos < options.mask.length && pos > 0) {
									pos += (key === BACKSPACE || key === DEL) ? -1 : 1;
								}

								if (isValidValue(options.mask, val)) {
									this.value = val;
									setCaretPos(this, pos);
								} else if ($.trim(val) === '') {
									this.value = options.mask.replace(/[0-9]/g, '_');
								} else {
									input.trigger('error_input.xdsoft');
								}
							} else {
								if (([AKEY, CKEY, VKEY, ZKEY, YKEY].indexOf(key) !== -1 && ctrlDown) || [ESC, ARROWUP, ARROWDOWN, ARROWLEFT, ARROWRIGHT, F5, CTRLKEY, TAB, ENTER].indexOf(key) !== -1) {
									return true;
								}
							}

							event.preventDefault();
							return false;
						});
					}
				}
				if (options.validateOnBlur) {
					input
						.off('blur.xdsoft')
						.on('blur.xdsoft', function () {
							if (options.allowBlank && !$.trim($(this).val()).length) {
								$(this).val(null);
								datetimepicker.data('xdsoft_datetime').empty();
							} else if (!Date.parseDate($(this).val(), options.format)) {
								var splittedHours   = +([$(this).val()[0], $(this).val()[1]].join('')),
									splittedMinutes = +([$(this).val()[2], $(this).val()[3]].join(''));

								// parse the numbers as 0312 => 03:12
								if (!options.datepicker && options.timepicker && splittedHours >= 0 && splittedHours < 24 && splittedMinutes >= 0 && splittedMinutes < 60) {
									$(this).val([splittedHours, splittedMinutes].map(function (item) {
										return item > 9 ? item : '0' + item;
									}).join(':'));
								} else {
									$(this).val((_xdsoft_datetime.now()).dateFormat(options.format));
								}

								datetimepicker.data('xdsoft_datetime').setCurrentTime($(this).val());
							} else {
								datetimepicker.data('xdsoft_datetime').setCurrentTime($(this).val());
							}

							datetimepicker.trigger('changedatetime.xdsoft');
						});
				}
				options.dayOfWeekStartPrev = (options.dayOfWeekStart === 0) ? 6 : options.dayOfWeekStart - 1;

				datetimepicker
					.trigger('xchange.xdsoft')
					.trigger('afterOpen.xdsoft');
			};

			datetimepicker
				.data('options', options)
				.on('mousedown.xdsoft', function (event) {
					event.stopPropagation();
					event.preventDefault();
					yearselect.hide();
					monthselect.hide();
					return false;
				});

			//scroll_element = timepicker.find('.xdsoft_time_box');
			timeboxparent.append(timebox);
			timeboxparent.xdsoftScroller();

			datetimepicker.on('afterOpen.xdsoft', function () {
				timeboxparent.xdsoftScroller();
			});

			datetimepicker
				.append(datepicker)
				.append(timepicker);

			if (options.withoutCopyright !== true) {
				datetimepicker
					.append(xdsoft_copyright);
			}

			datepicker
				.append(mounth_picker)
				.append(calendar)
				.append(applyButton);

			$(options.parentID)
				.append(datetimepicker);

			XDSoft_datetime = function () {
				var _this = this;
				_this.now = function (norecursion) {
					var d = new Date(),
						date,
						time;

					if (!norecursion && options.defaultDate) {
						date = _this.strToDateTime(options.defaultDate);
						d.setFullYear(date.getFullYear());
						d.setMonth(date.getMonth());
						d.setDate(date.getDate());
					}

					if (options.yearOffset) {
						d.setFullYear(d.getFullYear() + options.yearOffset);
					}

					if (!norecursion && options.defaultTime) {
						time = _this.strtotime(options.defaultTime);
						d.setHours(time.getHours());
						d.setMinutes(time.getMinutes());
					}
					return d;
				};

				_this.isValidDate = function (d) {
					if (Object.prototype.toString.call(d) !== "[object Date]") {
						return false;
					}
					return !isNaN(d.getTime());
				};

				_this.setCurrentTime = function (dTime) {
					_this.currentTime = (typeof dTime === 'string') ? _this.strToDateTime(dTime) : _this.isValidDate(dTime) ? dTime : _this.now();
					datetimepicker.trigger('xchange.xdsoft');
				};

				_this.empty = function () {
					_this.currentTime = null;
				};

				_this.getCurrentTime = function (dTime) {
					return _this.currentTime;
				};

				_this.nextMonth = function () {

					if (_this.currentTime === undefined || _this.currentTime === null) {
						_this.currentTime = _this.now();
					}

					var month = _this.currentTime.getMonth() + 1,
						year;
					if (month === 12) {
						_this.currentTime.setFullYear(_this.currentTime.getFullYear() + 1);
						month = 0;
					}

					year = _this.currentTime.getFullYear();

					_this.currentTime.setDate(
						Math.min(
							new Date(_this.currentTime.getFullYear(), month + 1, 0).getDate(),
							_this.currentTime.getDate()
						)
					);
					_this.currentTime.setMonth(month);

					if (options.onChangeMonth && $.isFunction(options.onChangeMonth)) {
						options.onChangeMonth.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
					}

					if (year !== _this.currentTime.getFullYear() && $.isFunction(options.onChangeYear)) {
						options.onChangeYear.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
					}

					datetimepicker.trigger('xchange.xdsoft');
					return month;
				};

				_this.prevMonth = function () {

					if (_this.currentTime === undefined || _this.currentTime === null) {
						_this.currentTime = _this.now();
					}

					var month = _this.currentTime.getMonth() - 1;
					if (month === -1) {
						_this.currentTime.setFullYear(_this.currentTime.getFullYear() - 1);
						month = 11;
					}
					_this.currentTime.setDate(
						Math.min(
							new Date(_this.currentTime.getFullYear(), month + 1, 0).getDate(),
							_this.currentTime.getDate()
						)
					);
					_this.currentTime.setMonth(month);
					if (options.onChangeMonth && $.isFunction(options.onChangeMonth)) {
						options.onChangeMonth.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
					}
					datetimepicker.trigger('xchange.xdsoft');
					return month;
				};

				_this.getWeekOfYear = function (datetime) {
					var onejan = new Date(datetime.getFullYear(), 0, 1);
					return Math.ceil((((datetime - onejan) / 86400000) + onejan.getDay() + 1) / 7);
				};

				_this.strToDateTime = function (sDateTime) {
					var tmpDate = [], timeOffset, currentTime;

					if (sDateTime && sDateTime instanceof Date && _this.isValidDate(sDateTime)) {
						return sDateTime;
					}

					tmpDate = /^(\+|\-)(.*)$/.exec(sDateTime);
					if (tmpDate) {
						tmpDate[2] = Date.parseDate(tmpDate[2], options.formatDate);
					}
					if (tmpDate  && tmpDate[2]) {
						timeOffset = tmpDate[2].getTime() - (tmpDate[2].getTimezoneOffset()) * 60000;
						currentTime = new Date((_this.now(true)).getTime() + parseInt(tmpDate[1] + '1', 10) * timeOffset);
					} else {
						currentTime = sDateTime ? Date.parseDate(sDateTime, options.format) : _this.now();
					}

					if (!_this.isValidDate(currentTime)) {
						currentTime = _this.now();
					}

					return currentTime;
				};

				_this.strToDate = function (sDate) {
					if (sDate && sDate instanceof Date && _this.isValidDate(sDate)) {
						return sDate;
					}

					var currentTime = sDate ? Date.parseDate(sDate, options.formatDate) : _this.now(true);
					if (!_this.isValidDate(currentTime)) {
						currentTime = _this.now(true);
					}
					return currentTime;
				};

				_this.strtotime = function (sTime) {
					if (sTime && sTime instanceof Date && _this.isValidDate(sTime)) {
						return sTime;
					}
					var currentTime = sTime ? Date.parseDate(sTime, options.formatTime) : _this.now(true);
					if (!_this.isValidDate(currentTime)) {
						currentTime = _this.now(true);
					}
					return currentTime;
				};

				_this.str = function () {
					return _this.currentTime.dateFormat(options.format);
				};
				_this.currentTime = this.now();
			};

			_xdsoft_datetime = new XDSoft_datetime();

			applyButton.on('click', function (e) {//pathbrite
                e.preventDefault();
                datetimepicker.data('changed', true);
                _xdsoft_datetime.setCurrentTime(getCurrentValue());
                input.val(_xdsoft_datetime.str());
                datetimepicker.trigger('close.xdsoft');
            });
			mounth_picker
				.find('.xdsoft_today_button')
				.on('mousedown.xdsoft', function () {
					datetimepicker.data('changed', true);
					_xdsoft_datetime.setCurrentTime(0);
					datetimepicker.trigger('afterOpen.xdsoft');
				}).on('dblclick.xdsoft', function () {
					var currentDate = _xdsoft_datetime.getCurrentTime(), minDate, maxDate;
					currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
					minDate = _xdsoft_datetime.strToDate(options.minDate);
					minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
					if (currentDate < minDate) {
						return;
					}
					maxDate = _xdsoft_datetime.strToDate(options.maxDate);
					maxDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
					if (currentDate > maxDate) {
						return;
					}
					input.val(_xdsoft_datetime.str());
					input.trigger('change');
					datetimepicker.trigger('close.xdsoft');
				});
			mounth_picker
				.find('.xdsoft_prev,.xdsoft_next')
				.on('mousedown.xdsoft', function () {
					var $this = $(this),
						timer = 0,
						stop = false;

					(function arguments_callee1(v) {
						if ($this.hasClass(options.next)) {
							_xdsoft_datetime.nextMonth();
						} else if ($this.hasClass(options.prev)) {
							_xdsoft_datetime.prevMonth();
						}
						if (options.monthChangeSpinner) {
							if (!stop) {
								timer = setTimeout(arguments_callee1, v || 100);
							}
						}
					}(500));

					$([document.body, window]).on('mouseup.xdsoft', function arguments_callee2() {
						clearTimeout(timer);
						stop = true;
						$([document.body, window]).off('mouseup.xdsoft', arguments_callee2);
					});
				});

			timepicker
				.find('.xdsoft_prev,.xdsoft_next')
				.on('mousedown.xdsoft', function () {
					var $this = $(this),
						timer = 0,
						stop = false,
						period = 110;
					(function arguments_callee4(v) {
						var pheight = timeboxparent[0].clientHeight,
							height = timebox[0].offsetHeight,
							top = Math.abs(parseInt(timebox.css('marginTop'), 10));
						if ($this.hasClass(options.next) && (height - pheight) - options.timeHeightInTimePicker >= top) {
							timebox.css('marginTop', '-' + (top + options.timeHeightInTimePicker) + 'px');
						} else if ($this.hasClass(options.prev) && top - options.timeHeightInTimePicker >= 0) {
							timebox.css('marginTop', '-' + (top - options.timeHeightInTimePicker) + 'px');
						}
						timeboxparent.trigger('scroll_element.xdsoft_scroller', [Math.abs(parseInt(timebox.css('marginTop'), 10) / (height - pheight))]);
						period = (period > 10) ? 10 : period - 10;
						if (!stop) {
							timer = setTimeout(arguments_callee4, v || period);
						}
					}(500));
					$([document.body, window]).on('mouseup.xdsoft', function arguments_callee5() {
						clearTimeout(timer);
						stop = true;
						$([document.body, window])
							.off('mouseup.xdsoft', arguments_callee5);
					});
				});

			xchangeTimer = 0;
			// base handler - generating a calendar and timepicker
			datetimepicker
				.on('xchange.xdsoft', function (event) {
					clearTimeout(xchangeTimer);
					xchangeTimer = setTimeout(function () {

						if (_xdsoft_datetime.currentTime === undefined || _xdsoft_datetime.currentTime === null) {
							_xdsoft_datetime.currentTime = _xdsoft_datetime.now();
						}

						var table =	'',
							start = new Date(_xdsoft_datetime.currentTime.getFullYear(), _xdsoft_datetime.currentTime.getMonth(), 1, 12, 0, 0),
							i = 0,
							j,
							today = _xdsoft_datetime.now(),
							maxDate = false,
							minDate = false,
							hDate,
							day,
							d,
							y,
							m,
							w,
							classes = [],
							customDateSettings,
							newRow = true,
							time = '',
							h = '',
							line_time,
							description;

						while (start.getDay() !== options.dayOfWeekStart) {
							start.setDate(start.getDate() - 1);
						}

						table += '<table><thead><tr>';

						if (options.weeks) {
							table += '<th></th>';
						}

						for (j = 0; j < 7; j += 1) {
							table += '<th>' + options.i18n[globalLocale].dayOfWeekShort[(j + options.dayOfWeekStart) % 7] + '</th>';
						}

						table += '</tr></thead>';
						table += '<tbody>';

						if (options.maxDate !== false) {
							maxDate = _xdsoft_datetime.strToDate(options.maxDate);
							maxDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate(), 23, 59, 59, 999);
						}

						if (options.minDate !== false) {
							minDate = _xdsoft_datetime.strToDate(options.minDate);
							minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
						}

						while (i < _xdsoft_datetime.currentTime.countDaysInMonth() || start.getDay() !== options.dayOfWeekStart || _xdsoft_datetime.currentTime.getMonth() === start.getMonth()) {
							classes = [];
							i += 1;

							day = start.getDay();
							d = start.getDate();
							y = start.getFullYear();
							m = start.getMonth();
							w = _xdsoft_datetime.getWeekOfYear(start);
							description = '';

							classes.push('xdsoft_date');

							if (options.beforeShowDay && $.isFunction(options.beforeShowDay.call)) {
								customDateSettings = options.beforeShowDay.call(datetimepicker, start);
							} else {
								customDateSettings = null;
							}

							if ((maxDate !== false && start > maxDate) || (minDate !== false && start < minDate) || (customDateSettings && customDateSettings[0] === false)) {
								classes.push('xdsoft_disabled');
							} else if (options.disabledDates.indexOf(start.dateFormat(options.formatDate)) !== -1) {
								classes.push('xdsoft_disabled');
							} else if (options.disabledWeekDays.indexOf(day) !== -1) {
							    classes.push('xdsoft_disabled');
							}

							if (customDateSettings && customDateSettings[1] !== "") {
								classes.push(customDateSettings[1]);
							}

							if (_xdsoft_datetime.currentTime.getMonth() !== m) {
								classes.push('xdsoft_other_month');
							}

							if ((options.defaultSelect || datetimepicker.data('changed')) && _xdsoft_datetime.currentTime.dateFormat(options.formatDate) === start.dateFormat(options.formatDate)) {
								classes.push('xdsoft_current');
							}

							if (today.dateFormat(options.formatDate) === start.dateFormat(options.formatDate)) {
								classes.push('xdsoft_today');
							}

							if (start.getDay() === 0 || start.getDay() === 6 || options.weekends.indexOf(start.dateFormat(options.formatDate)) !== -1) {
								classes.push('xdsoft_weekend');
							}

							if (options.highlightedDates[start.dateFormat(options.formatDate)] !== undefined) {
								hDate = options.highlightedDates[start.dateFormat(options.formatDate)];
								classes.push(hDate.style === undefined ? 'xdsoft_highlighted_default' : hDate.style);
								description = hDate.desc === undefined ? '' : hDate.desc;
							}

							if (options.beforeShowDay && $.isFunction(options.beforeShowDay)) {
								classes.push(options.beforeShowDay(start));
							}

							if (newRow) {
								table += '<tr>';
								newRow = false;
								if (options.weeks) {
									table += '<th>' + w + '</th>';
								}
							}

							table += '<td data-date="' + d + '" data-month="' + m + '" data-year="' + y + '"' + ' class="xdsoft_date xdsoft_day_of_week' + start.getDay() + ' ' + classes.join(' ') + '" title="' + description + '">' +
										'<div>' + d + '</div>' +
									'</td>';

							if (start.getDay() === options.dayOfWeekStartPrev) {
								table += '</tr>';
								newRow = true;
							}

							start.setDate(d + 1);
						}
						table += '</tbody></table>';

						calendar.html(table);

						mounth_picker.find('.xdsoft_label span').eq(0).text(options.i18n[globalLocale].months[_xdsoft_datetime.currentTime.getMonth()]);
						mounth_picker.find('.xdsoft_label span').eq(1).text(_xdsoft_datetime.currentTime.getFullYear());

						// generate timebox
						time = '';
						h = '';
						m = '';
						
						line_time = function line_time(h, m) {
							var now = _xdsoft_datetime.now(), optionDateTime, current_time,
								isALlowTimesInit = options.allowTimes && $.isArray(options.allowTimes) && options.allowTimes.length;
							now.setHours(h);
							h = parseInt(now.getHours(), 10);
							now.setMinutes(m);
							m = parseInt(now.getMinutes(), 10);
							optionDateTime = new Date(_xdsoft_datetime.currentTime);
							optionDateTime.setHours(h);
							optionDateTime.setMinutes(m);
							classes = [];
							if ((options.minDateTime !== false && options.minDateTime > optionDateTime) || (options.maxTime !== false && _xdsoft_datetime.strtotime(options.maxTime).getTime() < now.getTime()) || (options.minTime !== false && _xdsoft_datetime.strtotime(options.minTime).getTime() > now.getTime())) {
								classes.push('xdsoft_disabled');
							}
							if ((options.minDateTime !== false && options.minDateTime > optionDateTime) || ((options.disabledMinTime !== false && now.getTime() > _xdsoft_datetime.strtotime(options.disabledMinTime).getTime()) && (options.disabledMaxTime !== false && now.getTime() < _xdsoft_datetime.strtotime(options.disabledMaxTime).getTime()))) {
								classes.push('xdsoft_disabled');
							}

							current_time = new Date(_xdsoft_datetime.currentTime);
							current_time.setHours(parseInt(_xdsoft_datetime.currentTime.getHours(), 10));
							
							if (!isALlowTimesInit) {
								current_time.setMinutes(Math[options.roundTime](_xdsoft_datetime.currentTime.getMinutes() / options.step) * options.step);
							}

							if ((options.initTime || options.defaultSelect || datetimepicker.data('changed')) && current_time.getHours() === parseInt(h, 10) && ((!isALlowTimesInit && options.step > 59) || current_time.getMinutes() === parseInt(m, 10))) {
								if (options.defaultSelect || datetimepicker.data('changed')) {
									classes.push('xdsoft_current');
								} else if (options.initTime) {
									classes.push('xdsoft_init_time');
								}
							}
							if (parseInt(today.getHours(), 10) === parseInt(h, 10) && parseInt(today.getMinutes(), 10) === parseInt(m, 10)) {
								classes.push('xdsoft_today');
							}
							time += '<div class="xdsoft_time ' + classes.join(' ') + '" data-hour="' + h + '" data-minute="' + m + '">' + now.dateFormat(options.formatTime) + '</div>';
						};

						if (!options.allowTimes || !$.isArray(options.allowTimes) || !options.allowTimes.length) {
							for (i = 0, j = 0; i < (options.hours12 ? 12 : 24); i += 1) {
								for (j = 0; j < 60; j += options.step) {
									h = (i < 10 ? '0' : '') + i;
									m = (j < 10 ? '0' : '') + j;
									line_time(h, m);
								}
							}
						} else {
							for (i = 0; i < options.allowTimes.length; i += 1) {
								h = _xdsoft_datetime.strtotime(options.allowTimes[i]).getHours();
								m = _xdsoft_datetime.strtotime(options.allowTimes[i]).getMinutes();
								line_time(h, m);
							}
						}

						timebox.html(time);

						opt = '';
						i = 0;

						for (i = parseInt(options.yearStart, 10) + options.yearOffset; i <= parseInt(options.yearEnd, 10) + options.yearOffset; i += 1) {
							opt += '<div class="xdsoft_option ' + (_xdsoft_datetime.currentTime.getFullYear() === i ? 'xdsoft_current' : '') + '" data-value="' + i + '">' + i + '</div>';
						}
						yearselect.children().eq(0)
												.html(opt);

						for (i = parseInt(options.monthStart, 10), opt = ''; i <= parseInt(options.monthEnd, 10); i += 1) {
							opt += '<div class="xdsoft_option ' + (_xdsoft_datetime.currentTime.getMonth() === i ? 'xdsoft_current' : '') + '" data-value="' + i + '">' + options.i18n[globalLocale].months[i] + '</div>';
						}
						monthselect.children().eq(0).html(opt);
						$(datetimepicker)
							.trigger('generate.xdsoft');
					}, 10);
					event.stopPropagation();
				})
				.on('afterOpen.xdsoft', function () {
					if (options.timepicker) {
						var classType, pheight, height, top;
						if (timebox.find('.xdsoft_current').length) {
							classType = '.xdsoft_current';
						} else if (timebox.find('.xdsoft_init_time').length) {
							classType = '.xdsoft_init_time';
						}
						if (classType) {
							pheight = timeboxparent[0].clientHeight;
							height = timebox[0].offsetHeight;
							top = timebox.find(classType).index() * options.timeHeightInTimePicker + 1;
							if ((height - pheight) < top) {
								top = height - pheight;
							}
							timeboxparent.trigger('scroll_element.xdsoft_scroller', [parseInt(top, 10) / (height - pheight)]);
						} else {
							timeboxparent.trigger('scroll_element.xdsoft_scroller', [0]);
						}
					}
				});

			timerclick = 0;
			calendar
				.on('click.xdsoft', 'td', function (xdevent) {
					xdevent.stopPropagation();  // Prevents closing of Pop-ups, Modals and Flyouts in Bootstrap
					timerclick += 1;
					var $this = $(this),
						currentTime = _xdsoft_datetime.currentTime;

					if (currentTime === undefined || currentTime === null) {
						_xdsoft_datetime.currentTime = _xdsoft_datetime.now();
						currentTime = _xdsoft_datetime.currentTime;
					}

					if ($this.hasClass('xdsoft_disabled')) {
						return false;
					}

					currentTime.setDate(1);
					currentTime.setFullYear($this.data('year'));
					currentTime.setMonth($this.data('month'));
					currentTime.setDate($this.data('date'));

					datetimepicker.trigger('select.xdsoft', [currentTime]);

					input.val(_xdsoft_datetime.str());

					if (options.onSelectDate &&	$.isFunction(options.onSelectDate)) {
						options.onSelectDate.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), xdevent);
					}

					datetimepicker.data('changed', true);
					datetimepicker.trigger('xchange.xdsoft');
					datetimepicker.trigger('changedatetime.xdsoft');
					if ((timerclick > 1 || (options.closeOnDateSelect === true || (options.closeOnDateSelect === false && !options.timepicker))) && !options.inline) {
						datetimepicker.trigger('close.xdsoft');
					}
					setTimeout(function () {
						timerclick = 0;
					}, 200);
				});

			timebox
				.on('click.xdsoft', 'div', function (xdevent) {
					xdevent.stopPropagation();
					var $this = $(this),
						currentTime = _xdsoft_datetime.currentTime;

					if (currentTime === undefined || currentTime === null) {
						_xdsoft_datetime.currentTime = _xdsoft_datetime.now();
						currentTime = _xdsoft_datetime.currentTime;
					}

					if ($this.hasClass('xdsoft_disabled')) {
						return false;
					}
					currentTime.setHours($this.data('hour'));
					currentTime.setMinutes($this.data('minute'));
					datetimepicker.trigger('select.xdsoft', [currentTime]);

					datetimepicker.data('input').val(_xdsoft_datetime.str());

					if (options.onSelectTime && $.isFunction(options.onSelectTime)) {
						options.onSelectTime.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), xdevent);
					}
					datetimepicker.data('changed', true);
					datetimepicker.trigger('xchange.xdsoft');
					datetimepicker.trigger('changedatetime.xdsoft');
					if (options.inline !== true && options.closeOnTimeSelect === true) {
						datetimepicker.trigger('close.xdsoft');
					}
				});


			datepicker
				.on('mousewheel.xdsoft', function (event) {
					if (!options.scrollMonth) {
						return true;
					}
					if (event.deltaY < 0) {
						_xdsoft_datetime.nextMonth();
					} else {
						_xdsoft_datetime.prevMonth();
					}
					return false;
				});

			input
				.on('mousewheel.xdsoft', function (event) {
					if (!options.scrollInput) {
						return true;
					}
					if (!options.datepicker && options.timepicker) {
						current_time_index = timebox.find('.xdsoft_current').length ? timebox.find('.xdsoft_current').eq(0).index() : 0;
						if (current_time_index + event.deltaY >= 0 && current_time_index + event.deltaY < timebox.children().length) {
							current_time_index += event.deltaY;
						}
						if (timebox.children().eq(current_time_index).length) {
							timebox.children().eq(current_time_index).trigger('mousedown');
						}
						return false;
					}
					if (options.datepicker && !options.timepicker) {
						datepicker.trigger(event, [event.deltaY, event.deltaX, event.deltaY]);
						if (input.val) {
							input.val(_xdsoft_datetime.str());
						}
						datetimepicker.trigger('changedatetime.xdsoft');
						return false;
					}
				});

			datetimepicker
				.on('changedatetime.xdsoft', function (event) {
					if (options.onChangeDateTime && $.isFunction(options.onChangeDateTime)) {
						var $input = datetimepicker.data('input');
						options.onChangeDateTime.call(datetimepicker, _xdsoft_datetime.currentTime, $input, event);
						delete options.value;
						$input.trigger('change');
					}
				})
				.on('generate.xdsoft', function () {
					if (options.onGenerate && $.isFunction(options.onGenerate)) {
						options.onGenerate.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
					}
					if (triggerAfterOpen) {
						datetimepicker.trigger('afterOpen.xdsoft');
						triggerAfterOpen = false;
					}
				})
				.on('click.xdsoft', function (xdevent) {
					xdevent.stopPropagation();
				});

			current_time_index = 0;

			setPos = function () {
				var offset = datetimepicker.data('input').offset(), top = offset.top + datetimepicker.data('input')[0].offsetHeight - 1, left = offset.left, position = "absolute", node;
				if (datetimepicker.data('input').parent().css('direction') == 'rtl')
					left -= (datetimepicker.outerWidth() - datetimepicker.data('input').outerWidth());
				if (options.fixed) {
					top -= $(window).scrollTop();
					left -= $(window).scrollLeft();
					position = "fixed";
				} else {
					if (top + datetimepicker[0].offsetHeight > $(window).height() + $(window).scrollTop()) {
						top = offset.top - datetimepicker[0].offsetHeight + 1;
					}
					if (top < 0) {
						top = 0;
					}
					if (left + datetimepicker[0].offsetWidth > $(window).width()) {
						left = $(window).width() - datetimepicker[0].offsetWidth;
					}
				}

				node = datetimepicker[0];
				do {
					node = node.parentNode;
					if (window.getComputedStyle(node).getPropertyValue('position') === 'relative' && $(window).width() >= node.offsetWidth) {
						left = left - (($(window).width() - node.offsetWidth) / 2);
						break;
					}
				} while (node.nodeName !== 'HTML');
				datetimepicker.css({
					left: left,
					top: top,
					position: position
				});
			};
			datetimepicker
				.on('open.xdsoft', function (event) {
					var onShow = true;
					if (options.onShow && $.isFunction(options.onShow)) {
						onShow = options.onShow.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), event);
					}
					if (onShow !== false) {
						datetimepicker.show();
						setPos();
						$(window)
							.off('resize.xdsoft', setPos)
							.on('resize.xdsoft', setPos);

						if (options.closeOnWithoutClick) {
							$([document.body, window]).on('mousedown.xdsoft', function arguments_callee6() {
								datetimepicker.trigger('close.xdsoft');
								$([document.body, window]).off('mousedown.xdsoft', arguments_callee6);
							});
						}
					}
				})
				.on('close.xdsoft', function (event) {
					var onClose = true;
					mounth_picker
						.find('.xdsoft_month,.xdsoft_year')
							.find('.xdsoft_select')
								.hide();
					if (options.onClose && $.isFunction(options.onClose)) {
						onClose = options.onClose.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), event);
					}
					if (onClose !== false && !options.opened && !options.inline) {
						datetimepicker.hide();
					}
					event.stopPropagation();
				})
				.on('toggle.xdsoft', function (event) {
					if (datetimepicker.is(':visible')) {
						datetimepicker.trigger('close.xdsoft');
					} else {
						datetimepicker.trigger('open.xdsoft');
					}
				})
				.data('input', input);

			timer = 0;
			timer1 = 0;

			datetimepicker.data('xdsoft_datetime', _xdsoft_datetime);
			datetimepicker.setOptions(options);

			function getCurrentValue() {
				var ct = false, time;

				if (options.startDate) {
					ct = _xdsoft_datetime.strToDate(options.startDate);
				} else {
					ct = options.value || ((input && input.val && input.val()) ? input.val() : '');
					if (ct) {
						ct = _xdsoft_datetime.strToDateTime(ct);
					} else if (options.defaultDate) {
						ct = _xdsoft_datetime.strToDateTime(options.defaultDate);
						if (options.defaultTime) {
							time = _xdsoft_datetime.strtotime(options.defaultTime);
							ct.setHours(time.getHours());
							ct.setMinutes(time.getMinutes());
						}
					}
				}

				if (ct && _xdsoft_datetime.isValidDate(ct)) {
					datetimepicker.data('changed', true);
				} else {
					ct = '';
				}

				return ct || 0;
			}

			_xdsoft_datetime.setCurrentTime(getCurrentValue());

			input
				.data('xdsoft_datetimepicker', datetimepicker)
				.on('open.xdsoft focusin.xdsoft mousedown.xdsoft', function (event) {
					if (input.is(':disabled') || (input.data('xdsoft_datetimepicker').is(':visible') && options.closeOnInputClick)) {
						return;
					}
					clearTimeout(timer);
					timer = setTimeout(function () {
						if (input.is(':disabled')) {
							return;
						}

						triggerAfterOpen = true;
						_xdsoft_datetime.setCurrentTime(getCurrentValue());

						datetimepicker.trigger('open.xdsoft');
					}, 100);
				})
				.on('keydown.xdsoft', function (event) {
					var val = this.value, elementSelector,
						key = event.which;
					if ([ENTER].indexOf(key) !== -1 && options.enterLikeTab) {
						elementSelector = $("input:visible,textarea:visible");
						datetimepicker.trigger('close.xdsoft');
						elementSelector.eq(elementSelector.index(this) + 1).focus();
						return false;
					}
					if ([TAB].indexOf(key) !== -1) {
						datetimepicker.trigger('close.xdsoft');
						return true;
					}
				});
		};
		destroyDateTimePicker = function (input) {
			var datetimepicker = input.data('xdsoft_datetimepicker');
			if (datetimepicker) {
				datetimepicker.data('xdsoft_datetime', null);
				datetimepicker.remove();
				input
					.data('xdsoft_datetimepicker', null)
					.off('.xdsoft');
				$(window).off('resize.xdsoft');
				$([window, document.body]).off('mousedown.xdsoft');
				if (input.unmousewheel) {
					input.unmousewheel();
				}
			}
		};
		$(document)
			.off('keydown.xdsoftctrl keyup.xdsoftctrl')
			.on('keydown.xdsoftctrl', function (e) {
				if (e.keyCode === CTRLKEY) {
					ctrlDown = true;
				}
			})
			.on('keyup.xdsoftctrl', function (e) {
				if (e.keyCode === CTRLKEY) {
					ctrlDown = false;
				}
			});
		return this.each(function () {
			var datetimepicker = $(this).data('xdsoft_datetimepicker'), $input;
			if (datetimepicker) {
				if ($.type(opt) === 'string') {
					switch (opt) {
					case 'show':
						$(this).select().focus();
						datetimepicker.trigger('open.xdsoft');
						break;
					case 'hide':
						datetimepicker.trigger('close.xdsoft');
						break;
					case 'toggle':
						datetimepicker.trigger('toggle.xdsoft');
						break;
					case 'destroy':
						destroyDateTimePicker($(this));
						break;
					case 'reset':
						this.value = this.defaultValue;
						if (!this.value || !datetimepicker.data('xdsoft_datetime').isValidDate(Date.parseDate(this.value, options.format))) {
							datetimepicker.data('changed', false);
						}
						datetimepicker.data('xdsoft_datetime').setCurrentTime(this.value);
						break;
					case 'validate':
						$input = datetimepicker.data('input');
						$input.trigger('blur.xdsoft');
						break;
					}
				} else {
					datetimepicker
						.setOptions(opt);
				}
				return 0;
			}
			if ($.type(opt) !== 'string') {
				if (!options.lazyInit || options.open || options.inline) {
					createDateTimePicker($(this));
				} else {
					lazyInit($(this));
				}
			}
		});
	};
	$.fn.datetimepicker.defaults = default_options;

	function HighlightedDate(date, desc, style) {
		"use strict";
		this.date = date;
		this.desc = desc;
		this.style = style;
	}

}));
/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 */

(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice  = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    var special = $.event.special.mousewheel = {
        version: '3.1.12',

        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
            // Clean up the data we added to the element
            $.removeData(this, 'mousewheel-line-height');
            $.removeData(this, 'mousewheel-page-height');
        },

        getLineHeight: function(elem) {
            var $elem = $(elem),
                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
            if (!$parent.length) {
                $parent = $('body');
            }
            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
        },

        getPageHeight: function(elem) {
            return $(elem).height();
        },

        settings: {
            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
            normalizeOffset: true  // calls getBoundingClientRect for each event
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function(fn) {
            return this.unbind('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent   = event || window.event,
            args       = slice.call(arguments, 1),
            delta      = 0,
            deltaX     = 0,
            deltaY     = 0,
            absDelta   = 0,
            offsetX    = 0,
            offsetY    = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ( 'deltaY' in orgEvent ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( 'deltaX' in orgEvent ) {
            deltaX = orgEvent.deltaX;
            if ( deltaY === 0 ) { delta  = deltaX * -1; }
        }

        // No change actually happened, no reason to go any further
        if ( deltaY === 0 && deltaX === 0 ) { return; }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if ( orgEvent.deltaMode === 1 ) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta  *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if ( orgEvent.deltaMode === 2 ) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta  *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

        if ( !lowestDelta || absDelta < lowestDelta ) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                lowestDelta /= 40;
            }
        }

        // Adjust older deltas if necessary
        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
            // Divide all the things by 40!
            delta  /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

        // Normalise offsetX and offsetY properties
        if ( special.settings.normalizeOffset && this.getBoundingClientRect ) {
            var boundingRect = this.getBoundingClientRect();
            offsetX = event.clientX - boundingRect.left;
            offsetY = event.clientY - boundingRect.top;
        }

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        event.offsetX = offsetX;
        event.offsetY = offsetY;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }

}));
/*
 * Copyright (C) 2004 Baron Schwartz <baron at sequent dot org>
 * Modified by Jonathan Gotti aka malko <jgotti at jgotti dot org>
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by the
 * Free Software Foundation, version 2.1.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more
 * details.
 */
/* jshint laxbreak:true*/
!(function (factory) {
	if ( typeof define === 'function' && define.amd ) {
		define([], factory);
	} else if (typeof exports === 'object') {
		module.exports = factory;
	} else {
		factory();
	}
}(function(){
	"use strict";
	var parseFunctions = {};
	var parseRegexes = [];
	var formatFunctions = {};
	var charFormatters = {
		d: function(date) { return stringLeftPad(date.getDate(), 2, '0'); },
		D: function(date) { return Date.dayNames[date.getDay()].substring(0, 3); },
		j: function(date) { return date.getDate(); },
		l: function(date) { return Date.dayNames[date.getDay()]; },
		S: function(date) { return date.getSuffix(); },
		w: function(date) { return date.getDay(); },
		z: function(date) { return date.getDayOfYear(); },
		W: function(date) { return date.getWeekOfYear(); },
		F: function(date) { return Date.monthNames[date.getMonth()]; },
		m: function(date) { return stringLeftPad(date.getMonth() + 1, 2, '0'); },
		M: function(date) { return Date.monthNames[date.getMonth()].substring(0, 3); },
		n: function(date) { return (date.getMonth() + 1); },
		t: function(date) { return date.getDaysInMonth(); },
		L: function(date) { return (date.isLeapYear() ? 1 : 0); },
		Y: function(date) { return date.getFullYear(); },
		y: function(date) { return ('' + date.getFullYear()).substring(2, 4); },
		a: function(date) { return (date.getHours() < 12 ? 'am' : 'pm'); },
		A: function(date) { return (date.getHours() < 12 ? 'AM' : 'PM'); },
		g: function(date) { return ((date.getHours() %12) ? date.getHours() % 12 : 12); },
		G: function(date) { return date.getHours(); },
		h: function(date) { return stringLeftPad((date.getHours() %12) ? date.getHours() % 12 : 12, 2, '0'); },
		H: function(date) { return stringLeftPad(date.getHours(), 2, '0'); },
		i: function(date) { return stringLeftPad(date.getMinutes(), 2, '0'); },
		s: function(date) { return stringLeftPad(date.getSeconds(), 2, '0'); },
		O: function(date) { return date.getGMTOffset(); },
		T: function(date) { return date.getTimezone(); },
		Z: function(date) { return (date.getTimezoneOffset() * -60); }
	};

	Date.prototype.dateFormat = function(format) {
		formatFunctions[format]  || createNewFormat(format);
		return formatFunctions[format](this);
	};

	function createNewFormat(format) {
		var formatters = [];
		var special = false;
		var ch = '';
		for (var i = 0; i < format.length; ++i) {
			ch = format.charAt(i);
			if (!special && ch === "\\") {
				special = true;
			} else if (special) {
				special = false;
				formatters.push(stringEscape(ch));
			} else {
				formatters.push(charFormatters[ch] || stringEscape(ch));
			}
		}
		formatFunctions[format] = getFormatter(formatters);
	}

	function getFormatter(formatters) {
		return function(date) {
			var res = [];
			for (var i=0, l=formatters.length; i < l; i++) {
				res.push(typeof formatters[i] === 'string' ? formatters[i] : formatters[i](date));
			}
			return res.join('');
		};
	}

	Date.parseDate = function(input, format) {
		parseFunctions[format] || createParser(format);
		return parseFunctions[format](input);
	};

	function getParser(format, regexNum, assigns) {
		return function(input){
			var d = new Date();
			var results = input.match(parseRegexes[regexNum]);
			if (results && results.length > 0) {
				results.y = d.getFullYear();
				results.m = d.getMonth();
				results.d = d.getDate();
				results.h = -1;
				results.i = -1;
				results.s = -1;
				for ( var i = 0, l = assigns.length; i < l; i++) {
					assigns[i](results);
				}
				if (results.y > 0 && results.m >= 0 && results.d > 0 && results.h >= 0 && results.i >= 0 && results.s >= 0){
					return new Date(results.y, results.m, results.d, results.h, results.i, results.s);
				} else if (results.y > 0 && results.m >= 0 && results.d > 0 && results.h >= 0 && results.i >= 0) {
					return new Date(results.y, results.m, results.d, results.h, results.i);
				} else if (results.y > 0 && results.m >= 0 && results.d > 0 && results.h >= 0) {
					return new Date(results.y, results.m, results.d, results.h);
				} else if (results.y > 0 && results.m >= 0 && results.d > 0) {
					return new Date(results.y, results.m, results.d);
				} else if (results.y > 0 && results.m >= 0) {
					return new Date(results.y, results.m);
				} else if (results.y > 0) {
					return new Date(results.y);
				}
			}
			return null;
		};
	}

	function createParser(format) {
		var regexNum = parseRegexes.length;
		var currentGroup = 1;
		var regex = "";
		var special = false;
		var ch = '';
		var assigns=[];
		var obj;
		for (var i = 0; i < format.length; ++i) {
			ch = format.charAt(i);
			if (!special && ch === "\\") {
				special = true;
			} else if (special) {
				special = false;
				regex += stringEscape(ch);
			} else {
				obj = formatCodeToRegex(ch, currentGroup);
				currentGroup += obj.g;
				regex += obj.s;
				if (obj.g && obj.a) {
					assigns.push(obj.a);
				}
			}
		}

		parseRegexes[regexNum] = new RegExp("^" + regex + "$");
		parseFunctions[format] = getParser(format, regexNum, assigns);
	}

	function formatCodeToRegex(character, currentGroup) {
		switch (character) {
		case "D":
			return {g:0,
			s:"(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)"};
		case "j":
		case "d":
			return {g:1,
				a: function(results){ results.d = parseInt(results[currentGroup], 10);},
				s:"(\\d{1,2})"
			};
		case "l":
			return {g:0,
				s:"(?:" + Date.dayNames.join("|") + ")"};
		case "S":
			return {g:0,
				s:"(?:st|nd|rd|th)"};
		case "w":
			return {g:0,
				s:"\\d"};
		case "z":
			return {g:0,
				s:"(?:\\d{1,3})"};
		case "W":
			return {g:0,
				s:"(?:\\d{2})"};
		case "F":
			return {g:1,
				a: function(results) { results.m = parseInt(Date.monthNumbers[results[currentGroup].substring(0, 3)], 10);},
				s:"(" + Date.monthNames.join("|") + ")"};
		case "M":
			return {g:1,
				a: function(results) { results.m = parseInt(Date.monthNumbers[results[currentGroup]], 10);},
				s:"(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)"};
		case "n":
		case "m":
			return {g:1,
				a: function(results) { results.m = parseInt(results[currentGroup], 10) - 1;},
				s:"(\\d{1,2})"};
		case "t":
			return {g:0,
				s:"\\d{1,2}"};
		case "L":
			return {g:0,
				s:"(?:1|0)"};
		case "Y":
			return {g:1,
				a: function(results) { results.y = parseInt(results[currentGroup], 10);},
				s:"(\\d{4})"};
		case "y":
			return {g:1,
				a: function(results) {
					var ty = parseInt(results[currentGroup], 10);
					results.y = ty > Date.y2kYear ? 1900 + ty : 2000 + ty;
				},
				s:"(\\d{1,2})"};
		case "a":
			return {g:1,
				a: function(results) {
					if (results[currentGroup] === 'am') {
						if (results.h == 12) { results.h = 0; }
					} else {
						if (results.h < 12) { results.h += 12; }
					}
				},
				s:"(am|pm)"};
		case "A":
			return {g:1,
				a: function(results){
					if (results[currentGroup] === 'AM') {
						if (results.h == 12) { results.h = 0; }
					} else {
						if (results.h < 12) { results.h += 12; }
					}
				},
				s:"(AM|PM)"};
		case "g":
		case "G":
		case "h":
		case "H":
			return {g:1,
				a: function(results) {results.h = parseInt(results[currentGroup], 10);},
				s:"(\\d{1,2})"};
		case "i":
			return {g:1,
				a: function(results) {results.i = parseInt(results[currentGroup], 10);},
				s:"(\\d{2})"};
		case "s":
			return {g:1,
				a: function(results) {results.s = parseInt(results[currentGroup], 10);},
				s:"(\\d{2})"};
		case "O":
			return {g:0,
				s:"[+-]\\d{4}"};
		case "T":
			return {g:0,
				s:"[A-Z]{3}"};
		case "Z":
			return {g:0,
				s:"[+-]\\d{1,5}"};
		default:
			return {g:0,
				s:stringEscape(character)};
		 }
	}

	Date.prototype.getTimezone = function() {
		return this.toString().replace(
			/^.*? ([A-Z]{3}) [0-9]{4}.*$/, "$1").replace(
			/^.*?\(([A-Z])[a-z]+ ([A-Z])[a-z]+ ([A-Z])[a-z]+\)$/, "$1$2$3");
	};

	Date.prototype.getGMTOffset = function() {
		return (this.getTimezoneOffset() > 0 ? "-" : "+")
			+ stringLeftPad(Math.floor(this.getTimezoneOffset() / 60), 2, "0")
			+ stringLeftPad(this.getTimezoneOffset() % 60, 2, "0");
	};

	Date.prototype.getDayOfYear = function() {
		var num = 0;
		Date.daysInMonth[1] = this.isLeapYear() ? 29 : 28;
		for (var i = 0; i < this.getMonth(); ++i) {
			num += Date.daysInMonth[i];
		}
		return num + this.getDate() - 1;
	};

	Date.prototype.getWeekOfYear = function() {
		// Skip to Thursday of this week
		var now = this.getDayOfYear() + (4 - this.getDay());
		// Find the first Thursday of the year
		var jan1 = new Date(this.getFullYear(), 0, 1);
		var then = (7 - jan1.getDay() + 4);
		return stringLeftPad(((now - then) / 7) + 1, 2, "0");
	};

	Date.prototype.isLeapYear = function() {
		var year = this.getFullYear();
		return !!((year & 3) === 0 && (year % 100 || (year % 400 === 0 && year)));
	};

	Date.prototype.getFirstDayOfMonth = function() {
		var day = (this.getDay() - (this.getDate() - 1)) % 7;
		return (day < 0) ? (day + 7) : day;
	};

	Date.prototype.getLastDayOfMonth = function() {
		var day = (this.getDay() + (Date.daysInMonth[this.getMonth()] - this.getDate())) % 7;
		return (day < 0) ? (day + 7) : day;
	};

	Date.prototype.getDaysInMonth = function() {
		Date.daysInMonth[1] = this.isLeapYear() ? 29 : 28;
		return Date.daysInMonth[this.getMonth()];
	};

	Date.prototype.getSuffix = function() {
		switch (this.getDate()) {
			case 1:
			case 21:
			case 31:
				return "st";
			case 2:
			case 22:
				return "nd";
			case 3:
			case 23:
				return "rd";
			default:
				return "th";
		}
	};

	function stringEscape(string) {
		return string.replace(/('|\\)/g, "\\$1");
	}

	function stringLeftPad(val, size, ch) {
		var result = "" + val;
		ch = ("" + ch) || " ";
		while (result.length < size) {
			result = ch + result;
		}
		return result;
	}

	Date.daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
	Date.monthNames =
		["January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"];
	Date.dayNames =
		["Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday"];
	Date.y2kYear = 50;
	Date.monthNumbers = {
		Jan:0,
		Feb:1,
		Mar:2,
		Apr:3,
		May:4,
		Jun:5,
		Jul:6,
		Aug:7,
		Sep:8,
		Oct:9,
		Nov:10,
		Dec:11};
	Date.patterns = {
		ISO8601LongPattern:"Y-m-d H:i:s",
		ISO8601ShortPattern:"Y-m-d",
		ShortDatePattern: "n/j/Y",
		LongDatePattern: "l, F d, Y",
		FullDateTimePattern: "l, F d, Y g:i:s A",
		MonthDayPattern: "F d",
		ShortTimePattern: "g:i A",
		LongTimePattern: "g:i:s A",
		SortableDateTimePattern: "Y-m-d\\TH:i:s",
		UniversalSortableDateTimePattern: "Y-m-d H:i:sO",
		YearMonthPattern: "F, Y"};
}));

!function(t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else{if("function"==typeof define&&define.amd)return define([],t);this.CodeMirror=t()}}(function(){"use strict";function t(n,r){if(!(this instanceof t))return new t(n,r);this.options=r=r?Oo(r):{},Oo(Gl,r,!1),d(r);var i=r.value;"string"==typeof i&&(i=new pa(i,r.mode)),this.doc=i;var o=new t.inputStyles[r.inputStyle](this),l=this.display=new e(n,i,o);l.wrapper.CodeMirror=this,u(this),a(this),r.lineWrapping&&(this.display.wrapper.className+=" CodeMirror-wrap"),r.autofocus&&!wl&&l.input.focus(),m(this),this.state={keyMaps:[],overlays:[],modeGen:0,overwrite:!1,focused:!1,suppressEdits:!1,pasteIncoming:!1,cutIncoming:!1,draggingText:!1,highlight:new So,keySeq:null};var s=this;cl&&11>fl&&setTimeout(function(){s.display.input.reset(!0)},20),Pn(this),Uo(),yn(this),this.curOp.forceUpdate=!0,Ui(this,i),r.autofocus&&!wl||s.hasFocus()?setTimeout(Wo(cr,this),20):fr(this);for(var c in ql)ql.hasOwnProperty(c)&&ql[c](this,r[c],Kl);C(this),r.finishInit&&r.finishInit(this);for(var f=0;f<Yl.length;++f)Yl[f](this);wn(this),hl&&r.lineWrapping&&"optimizelegibility"==getComputedStyle(l.lineDiv).textRendering&&(l.lineDiv.style.textRendering="auto")}function e(t,e,n){var r=this;this.input=n,r.scrollbarFiller=Fo("div",null,"CodeMirror-scrollbar-filler"),r.scrollbarFiller.setAttribute("cm-not-content","true"),r.gutterFiller=Fo("div",null,"CodeMirror-gutter-filler"),r.gutterFiller.setAttribute("cm-not-content","true"),r.lineDiv=Fo("div",null,"CodeMirror-code"),r.selectionDiv=Fo("div",null,null,"position: relative; z-index: 1"),r.cursorDiv=Fo("div",null,"CodeMirror-cursors"),r.measure=Fo("div",null,"CodeMirror-measure"),r.lineMeasure=Fo("div",null,"CodeMirror-measure"),r.lineSpace=Fo("div",[r.measure,r.lineMeasure,r.selectionDiv,r.cursorDiv,r.lineDiv],null,"position: relative; outline: none"),r.mover=Fo("div",[Fo("div",[r.lineSpace],"CodeMirror-lines")],null,"position: relative"),r.sizer=Fo("div",[r.mover],"CodeMirror-sizer"),r.sizerWidth=null,r.heightForcer=Fo("div",null,null,"position: absolute; height: "+ka+"px; width: 1px;"),r.gutters=Fo("div",null,"CodeMirror-gutters"),r.lineGutter=null,r.scroller=Fo("div",[r.sizer,r.heightForcer,r.gutters],"CodeMirror-scroll"),r.scroller.setAttribute("tabIndex","-1"),r.wrapper=Fo("div",[r.scrollbarFiller,r.gutterFiller,r.scroller],"CodeMirror"),cl&&8>fl&&(r.gutters.style.zIndex=-1,r.scroller.style.paddingRight=0),hl||al&&wl||(r.scroller.draggable=!0),t&&(t.appendChild?t.appendChild(r.wrapper):t(r.wrapper)),r.viewFrom=r.viewTo=e.first,r.reportedViewFrom=r.reportedViewTo=e.first,r.view=[],r.renderedView=null,r.externalMeasured=null,r.viewOffset=0,r.lastWrapHeight=r.lastWrapWidth=0,r.updateLineNumbers=null,r.nativeBarWidth=r.barHeight=r.barWidth=0,r.scrollbarsClipped=!1,r.lineNumWidth=r.lineNumInnerWidth=r.lineNumChars=null,r.alignWidgets=!1,r.cachedCharWidth=r.cachedTextHeight=r.cachedPaddingH=null,r.maxLine=null,r.maxLineLength=0,r.maxLineChanged=!1,r.wheelDX=r.wheelDY=r.wheelStartX=r.wheelStartY=null,r.shift=!1,r.selForContextMenu=null,r.activeTouch=null,n.init(r)}function n(e){e.doc.mode=t.getMode(e.options,e.doc.modeOption),r(e)}function r(t){t.doc.iter(function(t){t.stateAfter&&(t.stateAfter=null),t.styles&&(t.styles=null)}),t.doc.frontier=t.doc.first,Fe(t,100),t.state.modeGen++,t.curOp&&Dn(t)}function i(t){t.options.lineWrapping?(Pa(t.display.wrapper,"CodeMirror-wrap"),t.display.sizer.style.minWidth="",t.display.sizerWidth=null):(za(t.display.wrapper,"CodeMirror-wrap"),h(t)),l(t),Dn(t),on(t),setTimeout(function(){y(t)},100)}function o(t){var e=vn(t.display),n=t.options.lineWrapping,r=n&&Math.max(5,t.display.scroller.clientWidth/mn(t.display)-3);return function(i){if(gi(t.doc,i))return 0;var o=0;if(i.widgets)for(var l=0;l<i.widgets.length;l++)i.widgets[l].height&&(o+=i.widgets[l].height);return n?o+(Math.ceil(i.text.length/r)||1)*e:o+e}}function l(t){var e=t.doc,n=o(t);e.iter(function(t){var e=n(t);e!=t.height&&Vi(t,e)})}function a(t){t.display.wrapper.className=t.display.wrapper.className.replace(/\s*cm-s-\S+/g,"")+t.options.theme.replace(/(^|\s)\s*/g," cm-s-"),on(t)}function s(t){u(t),Dn(t),setTimeout(function(){x(t)},20)}function u(t){var e=t.display.gutters,n=t.options.gutters;Io(e);for(var r=0;r<n.length;++r){var i=n[r],o=e.appendChild(Fo("div",null,"CodeMirror-gutter "+i));"CodeMirror-linenumbers"==i&&(t.display.lineGutter=o,o.style.width=(t.display.lineNumWidth||1)+"px")}e.style.display=r?"":"none",c(t)}function c(t){var e=t.display.gutters.offsetWidth;t.display.sizer.style.marginLeft=e+"px"}function f(t){if(0==t.height)return 0;for(var e,n=t.text.length,r=t;e=si(r);){var i=e.find(0,!0);r=i.from.line,n+=i.from.ch-i.to.ch}for(r=t;e=ui(r);){var i=e.find(0,!0);n-=r.text.length-i.from.ch,r=i.to.line,n+=r.text.length-i.to.ch}return n}function h(t){var e=t.display,n=t.doc;e.maxLine=Gi(n,n.first),e.maxLineLength=f(e.maxLine),e.maxLineChanged=!0,n.iter(function(t){var n=f(t);n>e.maxLineLength&&(e.maxLineLength=n,e.maxLine=t)})}function d(t){var e=To(t.gutters,"CodeMirror-linenumbers");-1==e&&t.lineNumbers?t.gutters=t.gutters.concat(["CodeMirror-linenumbers"]):e>-1&&!t.lineNumbers&&(t.gutters=t.gutters.slice(0),t.gutters.splice(e,1))}function p(t){var e=t.display,n=e.gutters.offsetWidth,r=Math.round(t.doc.height+Be(t.display));return{clientHeight:e.scroller.clientHeight,viewHeight:e.wrapper.clientHeight,scrollWidth:e.scroller.scrollWidth,clientWidth:e.scroller.clientWidth,viewWidth:e.wrapper.clientWidth,barLeft:t.options.fixedGutter?n:0,docHeight:r,scrollHeight:r+Ue(t)+e.barHeight,nativeBarWidth:e.nativeBarWidth,gutterWidth:n}}function g(t,e,n){this.cm=n;var r=this.vert=Fo("div",[Fo("div",null,null,"min-width: 1px")],"CodeMirror-vscrollbar"),i=this.horiz=Fo("div",[Fo("div",null,null,"height: 100%; min-height: 1px")],"CodeMirror-hscrollbar");t(r),t(i),wa(r,"scroll",function(){r.clientHeight&&e(r.scrollTop,"vertical")}),wa(i,"scroll",function(){i.clientWidth&&e(i.scrollLeft,"horizontal")}),this.checkedOverlay=!1,cl&&8>fl&&(this.horiz.style.minHeight=this.vert.style.minWidth="18px")}function v(){}function m(e){e.display.scrollbars&&(e.display.scrollbars.clear(),e.display.scrollbars.addClass&&za(e.display.wrapper,e.display.scrollbars.addClass)),e.display.scrollbars=new t.scrollbarModel[e.options.scrollbarStyle](function(t){e.display.wrapper.insertBefore(t,e.display.scrollbarFiller),wa(t,"mousedown",function(){e.state.focused&&setTimeout(function(){e.display.input.focus()},0)}),t.setAttribute("cm-not-content","true")},function(t,n){"horizontal"==n?Qn(e,t):Jn(e,t)},e),e.display.scrollbars.addClass&&Pa(e.display.wrapper,e.display.scrollbars.addClass)}function y(t,e){e||(e=p(t));var n=t.display.barWidth,r=t.display.barHeight;b(t,e);for(var i=0;4>i&&n!=t.display.barWidth||r!=t.display.barHeight;i++)n!=t.display.barWidth&&t.options.lineWrapping&&O(t),b(t,p(t)),n=t.display.barWidth,r=t.display.barHeight}function b(t,e){var n=t.display,r=n.scrollbars.update(e);n.sizer.style.paddingRight=(n.barWidth=r.right)+"px",n.sizer.style.paddingBottom=(n.barHeight=r.bottom)+"px",r.right&&r.bottom?(n.scrollbarFiller.style.display="block",n.scrollbarFiller.style.height=r.bottom+"px",n.scrollbarFiller.style.width=r.right+"px"):n.scrollbarFiller.style.display="",r.bottom&&t.options.coverGutterNextToScrollbar&&t.options.fixedGutter?(n.gutterFiller.style.display="block",n.gutterFiller.style.height=r.bottom+"px",n.gutterFiller.style.width=e.gutterWidth+"px"):n.gutterFiller.style.display=""}function w(t,e,n){var r=n&&null!=n.top?Math.max(0,n.top):t.scroller.scrollTop;r=Math.floor(r-Pe(t));var i=n&&null!=n.bottom?n.bottom:r+t.wrapper.clientHeight,o=Xi(e,r),l=Xi(e,i);if(n&&n.ensure){var a=n.ensure.from.line,s=n.ensure.to.line;o>a?(o=a,l=Xi(e,Yi(Gi(e,a))+t.wrapper.clientHeight)):Math.min(s,e.lastLine())>=l&&(o=Xi(e,Yi(Gi(e,s))-t.wrapper.clientHeight),l=s)}return{from:o,to:Math.max(l,o+1)}}function x(t){var e=t.display,n=e.view;if(e.alignWidgets||e.gutters.firstChild&&t.options.fixedGutter){for(var r=k(e)-e.scroller.scrollLeft+t.doc.scrollLeft,i=e.gutters.offsetWidth,o=r+"px",l=0;l<n.length;l++)if(!n[l].hidden){t.options.fixedGutter&&n[l].gutter&&(n[l].gutter.style.left=o);var a=n[l].alignable;if(a)for(var s=0;s<a.length;s++)a[s].style.left=o}t.options.fixedGutter&&(e.gutters.style.left=r+i+"px")}}function C(t){if(!t.options.lineNumbers)return!1;var e=t.doc,n=S(t.options,e.first+e.size-1),r=t.display;if(n.length!=r.lineNumChars){var i=r.measure.appendChild(Fo("div",[Fo("div",n)],"CodeMirror-linenumber CodeMirror-gutter-elt")),o=i.firstChild.offsetWidth,l=i.offsetWidth-o;return r.lineGutter.style.width="",r.lineNumInnerWidth=Math.max(o,r.lineGutter.offsetWidth-l),r.lineNumWidth=r.lineNumInnerWidth+l,r.lineNumChars=r.lineNumInnerWidth?n.length:-1,r.lineGutter.style.width=r.lineNumWidth+"px",c(t),!0}return!1}function S(t,e){return String(t.lineNumberFormatter(e+t.firstLineNumber))}function k(t){return t.scroller.getBoundingClientRect().left-t.sizer.getBoundingClientRect().left}function L(t,e,n){var r=t.display;this.viewport=e,this.visible=w(r,t.doc,e),this.editorIsHidden=!r.wrapper.offsetWidth,this.wrapperHeight=r.wrapper.clientHeight,this.wrapperWidth=r.wrapper.clientWidth,this.oldDisplayWidth=Ge(t),this.force=n,this.dims=D(t),this.events=[]}function _(t){var e=t.display;!e.scrollbarsClipped&&e.scroller.offsetWidth&&(e.nativeBarWidth=e.scroller.offsetWidth-e.scroller.clientWidth,e.heightForcer.style.height=Ue(t)+"px",e.sizer.style.marginBottom=-e.nativeBarWidth+"px",e.sizer.style.borderRightWidth=Ue(t)+"px",e.scrollbarsClipped=!0)}function T(t,e){var n=t.display,r=t.doc;if(e.editorIsHidden)return En(t),!1;if(!e.force&&e.visible.from>=n.viewFrom&&e.visible.to<=n.viewTo&&(null==n.updateLineNumbers||n.updateLineNumbers>=n.viewTo)&&n.renderedView==n.view&&0==zn(t))return!1;C(t)&&(En(t),e.dims=D(t));var i=r.first+r.size,o=Math.max(e.visible.from-t.options.viewportMargin,r.first),l=Math.min(i,e.visible.to+t.options.viewportMargin);n.viewFrom<o&&o-n.viewFrom<20&&(o=Math.max(r.first,n.viewFrom)),n.viewTo>l&&n.viewTo-l<20&&(l=Math.min(i,n.viewTo)),Tl&&(o=di(t.doc,o),l=pi(t.doc,l));var a=o!=n.viewFrom||l!=n.viewTo||n.lastWrapHeight!=e.wrapperHeight||n.lastWrapWidth!=e.wrapperWidth;Rn(t,o,l),n.viewOffset=Yi(Gi(t.doc,n.viewFrom)),t.display.mover.style.top=n.viewOffset+"px";var s=zn(t);if(!a&&0==s&&!e.force&&n.renderedView==n.view&&(null==n.updateLineNumbers||n.updateLineNumbers>=n.viewTo))return!1;var u=zo();return s>4&&(n.lineDiv.style.display="none"),H(t,n.updateLineNumbers,e.dims),s>4&&(n.lineDiv.style.display=""),n.renderedView=n.view,u&&zo()!=u&&u.offsetHeight&&u.focus(),Io(n.cursorDiv),Io(n.selectionDiv),n.gutters.style.height=0,a&&(n.lastWrapHeight=e.wrapperHeight,n.lastWrapWidth=e.wrapperWidth,Fe(t,400)),n.updateLineNumbers=null,!0}function M(t,e){for(var n=e.force,r=e.viewport,i=!0;;i=!1){if(i&&t.options.lineWrapping&&e.oldDisplayWidth!=Ge(t))n=!0;else if(n=!1,r&&null!=r.top&&(r={top:Math.min(t.doc.height+Be(t.display)-qe(t),r.top)}),e.visible=w(t.display,t.doc,r),e.visible.from>=t.display.viewFrom&&e.visible.to<=t.display.viewTo)break;if(!T(t,e))break;O(t);var o=p(t);Oe(t),N(t,o),y(t,o)}e.signal(t,"update",t),(t.display.viewFrom!=t.display.reportedViewFrom||t.display.viewTo!=t.display.reportedViewTo)&&(e.signal(t,"viewportChange",t,t.display.viewFrom,t.display.viewTo),t.display.reportedViewFrom=t.display.viewFrom,t.display.reportedViewTo=t.display.viewTo)}function A(t,e){var n=new L(t,e);if(T(t,n)){O(t),M(t,n);var r=p(t);Oe(t),N(t,r),y(t,r),n.finish()}}function N(t,e){t.display.sizer.style.minHeight=e.docHeight+"px";var n=e.docHeight+t.display.barHeight;t.display.heightForcer.style.top=n+"px",t.display.gutters.style.height=Math.max(n+Ue(t),e.clientHeight)+"px"}function O(t){for(var e=t.display,n=e.lineDiv.offsetTop,r=0;r<e.view.length;r++){var i,o=e.view[r];if(!o.hidden){if(cl&&8>fl){var l=o.node.offsetTop+o.node.offsetHeight;i=l-n,n=l}else{var a=o.node.getBoundingClientRect();i=a.bottom-a.top}var s=o.line.height-i;if(2>i&&(i=vn(e)),(s>.001||-.001>s)&&(Vi(o.line,i),W(o.line),o.rest))for(var u=0;u<o.rest.length;u++)W(o.rest[u])}}}function W(t){if(t.widgets)for(var e=0;e<t.widgets.length;++e)t.widgets[e].height=t.widgets[e].node.offsetHeight}function D(t){for(var e=t.display,n={},r={},i=e.gutters.clientLeft,o=e.gutters.firstChild,l=0;o;o=o.nextSibling,++l)n[t.options.gutters[l]]=o.offsetLeft+o.clientLeft+i,r[t.options.gutters[l]]=o.clientWidth;return{fixedPos:k(e),gutterTotalWidth:e.gutters.offsetWidth,gutterLeft:n,gutterWidth:r,wrapperWidth:e.wrapper.clientWidth}}function H(t,e,n){function r(e){var n=e.nextSibling;return hl&&xl&&t.display.currentWheelTarget==e?e.style.display="none":e.parentNode.removeChild(e),n}for(var i=t.display,o=t.options.lineNumbers,l=i.lineDiv,a=l.firstChild,s=i.view,u=i.viewFrom,c=0;c<s.length;c++){var f=s[c];if(f.hidden);else if(f.node&&f.node.parentNode==l){for(;a!=f.node;)a=r(a);var h=o&&null!=e&&u>=e&&f.lineNumber;f.changes&&(To(f.changes,"gutter")>-1&&(h=!1),E(t,f,u,n)),h&&(Io(f.lineNumber),f.lineNumber.appendChild(document.createTextNode(S(t.options,u)))),a=f.node.nextSibling}else{var d=U(t,f,u,n);l.insertBefore(d,a)}u+=f.size}for(;a;)a=r(a)}function E(t,e,n,r){for(var i=0;i<e.changes.length;i++){var o=e.changes[i];"text"==o?z(t,e):"gutter"==o?B(t,e,n,r):"class"==o?P(e):"widget"==o&&j(t,e,r)}e.changes=null}function F(t){return t.node==t.text&&(t.node=Fo("div",null,null,"position: relative"),t.text.parentNode&&t.text.parentNode.replaceChild(t.node,t.text),t.node.appendChild(t.text),cl&&8>fl&&(t.node.style.zIndex=2)),t.node}function I(t){var e=t.bgClass?t.bgClass+" "+(t.line.bgClass||""):t.line.bgClass;if(e&&(e+=" CodeMirror-linebackground"),t.background)e?t.background.className=e:(t.background.parentNode.removeChild(t.background),t.background=null);else if(e){var n=F(t);t.background=n.insertBefore(Fo("div",null,e),n.firstChild)}}function R(t,e){var n=t.display.externalMeasured;return n&&n.line==e.line?(t.display.externalMeasured=null,e.measure=n.measure,n.built):Oi(t,e)}function z(t,e){var n=e.text.className,r=R(t,e);e.text==e.node&&(e.node=r.pre),e.text.parentNode.replaceChild(r.pre,e.text),e.text=r.pre,r.bgClass!=e.bgClass||r.textClass!=e.textClass?(e.bgClass=r.bgClass,e.textClass=r.textClass,P(e)):n&&(e.text.className=n)}function P(t){I(t),t.line.wrapClass?F(t).className=t.line.wrapClass:t.node!=t.text&&(t.node.className="");var e=t.textClass?t.textClass+" "+(t.line.textClass||""):t.line.textClass;t.text.className=e||""}function B(t,e,n,r){e.gutter&&(e.node.removeChild(e.gutter),e.gutter=null);var i=e.line.gutterMarkers;if(t.options.lineNumbers||i){var o=F(e),l=e.gutter=Fo("div",null,"CodeMirror-gutter-wrapper","left: "+(t.options.fixedGutter?r.fixedPos:-r.gutterTotalWidth)+"px; width: "+r.gutterTotalWidth+"px");if(t.display.input.setUneditable(l),o.insertBefore(l,e.text),e.line.gutterClass&&(l.className+=" "+e.line.gutterClass),!t.options.lineNumbers||i&&i["CodeMirror-linenumbers"]||(e.lineNumber=l.appendChild(Fo("div",S(t.options,n),"CodeMirror-linenumber CodeMirror-gutter-elt","left: "+r.gutterLeft["CodeMirror-linenumbers"]+"px; width: "+t.display.lineNumInnerWidth+"px"))),i)for(var a=0;a<t.options.gutters.length;++a){var s=t.options.gutters[a],u=i.hasOwnProperty(s)&&i[s];u&&l.appendChild(Fo("div",[u],"CodeMirror-gutter-elt","left: "+r.gutterLeft[s]+"px; width: "+r.gutterWidth[s]+"px"))}}}function j(t,e,n){e.alignable&&(e.alignable=null);for(var r,i=e.node.firstChild;i;i=r){var r=i.nextSibling;"CodeMirror-linewidget"==i.className&&e.node.removeChild(i)}G(t,e,n)}function U(t,e,n,r){var i=R(t,e);return e.text=e.node=i.pre,i.bgClass&&(e.bgClass=i.bgClass),i.textClass&&(e.textClass=i.textClass),P(e),B(t,e,n,r),G(t,e,r),e.node}function G(t,e,n){if(q(t,e.line,e,n,!0),e.rest)for(var r=0;r<e.rest.length;r++)q(t,e.rest[r],e,n,!1)}function q(t,e,n,r,i){if(e.widgets)for(var o=F(n),l=0,a=e.widgets;l<a.length;++l){var s=a[l],u=Fo("div",[s.node],"CodeMirror-linewidget");s.handleMouseEvents||u.setAttribute("cm-ignore-events","true"),K(s,u,n,r),t.display.input.setUneditable(u),i&&s.above?o.insertBefore(u,n.gutter||n.text):o.appendChild(u),mo(s,"redraw")}}function K(t,e,n,r){if(t.noHScroll){(n.alignable||(n.alignable=[])).push(e);var i=r.wrapperWidth;e.style.left=r.fixedPos+"px",t.coverGutter||(i-=r.gutterTotalWidth,e.style.paddingLeft=r.gutterTotalWidth+"px"),e.style.width=i+"px"}t.coverGutter&&(e.style.zIndex=5,e.style.position="relative",t.noHScroll||(e.style.marginLeft=-r.gutterTotalWidth+"px"))}function V(t){return Ml(t.line,t.ch)}function $(t,e){return Al(t,e)<0?e:t}function X(t,e){return Al(t,e)<0?t:e}function Y(t){t.state.focused||(t.display.input.focus(),cr(t))}function Z(t){return t.options.readOnly||t.doc.cantEdit}function J(t,e,n,r){var i=t.doc;t.display.shift=!1,r||(r=i.sel);var o=Ua(e),l=null;t.state.pasteIncoming&&r.ranges.length>1&&(Nl&&Nl.join("\n")==e?l=r.ranges.length%Nl.length==0&&Mo(Nl,Ua):o.length==r.ranges.length&&(l=Mo(o,function(t){return[t]})));for(var a=r.ranges.length-1;a>=0;a--){var s=r.ranges[a],u=s.from(),c=s.to();s.empty()&&(n&&n>0?u=Ml(u.line,u.ch-n):t.state.overwrite&&!t.state.pasteIncoming&&(c=Ml(c.line,Math.min(Gi(i,c.line).text.length,c.ch+_o(o).length))));var f=t.curOp.updateInput,h={from:u,to:c,text:l?l[a%l.length]:o,origin:t.state.pasteIncoming?"paste":t.state.cutIncoming?"cut":"+input"};if(br(t.doc,h),mo(t,"inputRead",t,h),e&&!t.state.pasteIncoming&&t.options.electricChars&&t.options.smartIndent&&s.head.ch<100&&(!a||r.ranges[a-1].head.line!=s.head.line)){var d=t.getModeAt(s.head),p=Ul(h);if(d.electricChars){for(var g=0;g<d.electricChars.length;g++)if(e.indexOf(d.electricChars.charAt(g))>-1){Dr(t,p.line,"smart");break}}else d.electricInput&&d.electricInput.test(Gi(i,p.line).text.slice(0,p.ch))&&Dr(t,p.line,"smart")}}Or(t),t.curOp.updateInput=f,t.curOp.typing=!0,t.state.pasteIncoming=t.state.cutIncoming=!1}function Q(t){for(var e=[],n=[],r=0;r<t.doc.sel.ranges.length;r++){var i=t.doc.sel.ranges[r].head.line,o={anchor:Ml(i,0),head:Ml(i+1,0)};n.push(o),e.push(t.getRange(o.anchor,o.head))}return{text:e,ranges:n}}function te(t){t.setAttribute("autocorrect","off"),t.setAttribute("autocapitalize","off"),t.setAttribute("spellcheck","false")}function ee(t){this.cm=t,this.prevInput="",this.pollingFast=!1,this.polling=new So,this.inaccurateSelection=!1,this.hasSelection=!1}function ne(){var t=Fo("textarea",null,null,"position: absolute; padding: 0; width: 1px; height: 1em; outline: none"),e=Fo("div",[t],null,"overflow: hidden; position: relative; width: 3px; height: 0px;");return hl?t.style.width="1000px":t.setAttribute("wrap","off"),bl&&(t.style.border="1px solid black"),te(t),e}function re(t){this.cm=t,this.lastAnchorNode=this.lastAnchorOffset=this.lastFocusNode=this.lastFocusOffset=null,this.polling=new So}function ie(t,e){var n=Ye(t,e.line);if(!n||n.hidden)return null;var r=Gi(t.doc,e.line),i=Ve(n,r,e.line),o=Zi(r),l="left";if(o){var a=rl(o,e.ch);l=a%2?"right":"left"}var s=Qe(i.map,e.ch,"left");return s.offset="right"==s.collapse?s.end:s.start,s}function oe(t,e){return e&&(t.bad=!0),t}function le(t,e,n){var r;if(e==t.display.lineDiv){if(r=t.display.lineDiv.childNodes[n],!r)return oe(t.clipPos(Ml(t.display.viewTo-1)),!0);e=null,n=0}else for(r=e;;r=r.parentNode){if(!r||r==t.display.lineDiv)return null;if(r.parentNode&&r.parentNode==t.display.lineDiv)break}for(var i=0;i<t.display.view.length;i++){var o=t.display.view[i];if(o.node==r)return ae(o,e,n)}}function ae(t,e,n){function r(e,n,r){for(var i=-1;i<(c?c.length:0);i++)for(var o=0>i?u.map:c[i],l=0;l<o.length;l+=3){var a=o[l+2];if(a==e||a==n){var s=$i(0>i?t.line:t.rest[i]),f=o[l]+r;return(0>r||a!=e)&&(f=o[l+(r?1:0)]),Ml(s,f)}}}var i=t.text.firstChild,o=!1;if(!e||!Fa(i,e))return oe(Ml($i(t.line),0),!0);if(e==i&&(o=!0,e=i.childNodes[n],n=0,!e)){var l=t.rest?_o(t.rest):t.line;return oe(Ml($i(l),l.text.length),o)}var a=3==e.nodeType?e:null,s=e;for(a||1!=e.childNodes.length||3!=e.firstChild.nodeType||(a=e.firstChild,n&&(n=a.nodeValue.length));s.parentNode!=i;)s=s.parentNode;var u=t.measure,c=u.maps,f=r(a,s,n);if(f)return oe(f,o);for(var h=s.nextSibling,d=a?a.nodeValue.length-n:0;h;h=h.nextSibling){if(f=r(h,h.firstChild,0))return oe(Ml(f.line,f.ch-d),o);d+=h.textContent.length}for(var p=s.previousSibling,d=n;p;p=p.previousSibling){if(f=r(p,p.firstChild,-1))return oe(Ml(f.line,f.ch+d),o);d+=h.textContent.length}}function se(t,e,n,r,i){function o(t){return function(e){return e.id==t}}function l(e){if(1==e.nodeType){var n=e.getAttribute("cm-text");if(null!=n)return""==n&&(n=e.textContent.replace(/\u200b/g,"")),void(a+=n);var u,c=e.getAttribute("cm-marker");if(c){var f=t.findMarks(Ml(r,0),Ml(i+1,0),o(+c));return void(f.length&&(u=f[0].find())&&(a+=qi(t.doc,u.from,u.to).join("\n")))}if("false"==e.getAttribute("contenteditable"))return;for(var h=0;h<e.childNodes.length;h++)l(e.childNodes[h]);/^(pre|div|p)$/i.test(e.nodeName)&&(s=!0)}else if(3==e.nodeType){var d=e.nodeValue;if(!d)return;s&&(a+="\n",s=!1),a+=d}}for(var a="",s=!1;l(e),e!=n;)e=e.nextSibling;return a}function ue(t,e){this.ranges=t,this.primIndex=e}function ce(t,e){this.anchor=t,this.head=e}function fe(t,e){var n=t[e];t.sort(function(t,e){return Al(t.from(),e.from())}),e=To(t,n);for(var r=1;r<t.length;r++){var i=t[r],o=t[r-1];if(Al(o.to(),i.from())>=0){var l=X(o.from(),i.from()),a=$(o.to(),i.to()),s=o.empty()?i.from()==i.head:o.from()==o.head;e>=r&&--e,t.splice(--r,2,new ce(s?a:l,s?l:a))}}return new ue(t,e)}function he(t,e){return new ue([new ce(t,e||t)],0)}function de(t,e){return Math.max(t.first,Math.min(e,t.first+t.size-1))}function pe(t,e){if(e.line<t.first)return Ml(t.first,0);var n=t.first+t.size-1;return e.line>n?Ml(n,Gi(t,n).text.length):ge(e,Gi(t,e.line).text.length)}function ge(t,e){var n=t.ch;return null==n||n>e?Ml(t.line,e):0>n?Ml(t.line,0):t}function ve(t,e){return e>=t.first&&e<t.first+t.size}function me(t,e){for(var n=[],r=0;r<e.length;r++)n[r]=pe(t,e[r]);return n}function ye(t,e,n,r){if(t.cm&&t.cm.display.shift||t.extend){var i=e.anchor;if(r){var o=Al(n,i)<0;o!=Al(r,i)<0?(i=n,n=r):o!=Al(n,r)<0&&(n=r)}return new ce(i,n)}return new ce(r||n,n)}function be(t,e,n,r){Le(t,new ue([ye(t,t.sel.primary(),e,n)],0),r)}function we(t,e,n){for(var r=[],i=0;i<t.sel.ranges.length;i++)r[i]=ye(t,t.sel.ranges[i],e[i],null);var o=fe(r,t.sel.primIndex);Le(t,o,n)}function xe(t,e,n,r){var i=t.sel.ranges.slice(0);i[e]=n,Le(t,fe(i,t.sel.primIndex),r)}function Ce(t,e,n,r){Le(t,he(e,n),r)}function Se(t,e){var n={ranges:e.ranges,update:function(e){this.ranges=[];for(var n=0;n<e.length;n++)this.ranges[n]=new ce(pe(t,e[n].anchor),pe(t,e[n].head))}};return Ca(t,"beforeSelectionChange",t,n),t.cm&&Ca(t.cm,"beforeSelectionChange",t.cm,n),n.ranges!=e.ranges?fe(n.ranges,n.ranges.length-1):e}function ke(t,e,n){var r=t.history.done,i=_o(r);i&&i.ranges?(r[r.length-1]=e,_e(t,e,n)):Le(t,e,n)}function Le(t,e,n){_e(t,e,n),io(t,t.sel,t.cm?t.cm.curOp.id:0/0,n)}function _e(t,e,n){(xo(t,"beforeSelectionChange")||t.cm&&xo(t.cm,"beforeSelectionChange"))&&(e=Se(t,e));var r=n&&n.bias||(Al(e.primary().head,t.sel.primary().head)<0?-1:1);Te(t,Ae(t,e,r,!0)),n&&n.scroll===!1||!t.cm||Or(t.cm)}function Te(t,e){e.equals(t.sel)||(t.sel=e,t.cm&&(t.cm.curOp.updateInput=t.cm.curOp.selectionChanged=!0,wo(t.cm)),mo(t,"cursorActivity",t))}function Me(t){Te(t,Ae(t,t.sel,null,!1),_a)}function Ae(t,e,n,r){for(var i,o=0;o<e.ranges.length;o++){var l=e.ranges[o],a=Ne(t,l.anchor,n,r),s=Ne(t,l.head,n,r);(i||a!=l.anchor||s!=l.head)&&(i||(i=e.ranges.slice(0,o)),i[o]=new ce(a,s))}return i?fe(i,e.primIndex):e}function Ne(t,e,n,r){var i=!1,o=e,l=n||1;t.cantEdit=!1;t:for(;;){var a=Gi(t,o.line);if(a.markedSpans)for(var s=0;s<a.markedSpans.length;++s){var u=a.markedSpans[s],c=u.marker;if((null==u.from||(c.inclusiveLeft?u.from<=o.ch:u.from<o.ch))&&(null==u.to||(c.inclusiveRight?u.to>=o.ch:u.to>o.ch))){if(r&&(Ca(c,"beforeCursorEnter"),c.explicitlyCleared)){if(a.markedSpans){--s;continue}break}if(!c.atomic)continue;var f=c.find(0>l?-1:1);if(0==Al(f,o)&&(f.ch+=l,f.ch<0?f=f.line>t.first?pe(t,Ml(f.line-1)):null:f.ch>a.text.length&&(f=f.line<t.first+t.size-1?Ml(f.line+1,0):null),!f)){if(i)return r?(t.cantEdit=!0,Ml(t.first,0)):Ne(t,e,n,!0);i=!0,f=e,l=-l}o=f;continue t}}return o}}function Oe(t){t.display.input.showSelection(t.display.input.prepareSelection())}function We(t,e){for(var n=t.doc,r={},i=r.cursors=document.createDocumentFragment(),o=r.selection=document.createDocumentFragment(),l=0;l<n.sel.ranges.length;l++)if(e!==!1||l!=n.sel.primIndex){var a=n.sel.ranges[l],s=a.empty();(s||t.options.showCursorWhenSelecting)&&De(t,a,i),s||He(t,a,o)}return r}function De(t,e,n){var r=fn(t,e.head,"div",null,null,!t.options.singleCursorHeightPerLine),i=n.appendChild(Fo("div"," ","CodeMirror-cursor"));if(i.style.left=r.left+"px",i.style.top=r.top+"px",i.style.height=Math.max(0,r.bottom-r.top)*t.options.cursorHeight+"px",r.other){var o=n.appendChild(Fo("div"," ","CodeMirror-cursor CodeMirror-secondarycursor"));o.style.display="",o.style.left=r.other.left+"px",o.style.top=r.other.top+"px",o.style.height=.85*(r.other.bottom-r.other.top)+"px"}}function He(t,e,n){function r(t,e,n,r){0>e&&(e=0),e=Math.round(e),r=Math.round(r),a.appendChild(Fo("div",null,"CodeMirror-selected","position: absolute; left: "+t+"px; top: "+e+"px; width: "+(null==n?c-t:n)+"px; height: "+(r-e)+"px"))}function i(e,n,i){function o(n,r){return cn(t,Ml(e,n),"div",f,r)}var a,s,f=Gi(l,e),h=f.text.length;return $o(Zi(f),n||0,null==i?h:i,function(t,e,l){var f,d,p,g=o(t,"left");if(t==e)f=g,d=p=g.left;else{if(f=o(e-1,"right"),"rtl"==l){var v=g;g=f,f=v}d=g.left,p=f.right}null==n&&0==t&&(d=u),f.top-g.top>3&&(r(d,g.top,null,g.bottom),d=u,g.bottom<f.top&&r(d,g.bottom,null,f.top)),null==i&&e==h&&(p=c),(!a||g.top<a.top||g.top==a.top&&g.left<a.left)&&(a=g),(!s||f.bottom>s.bottom||f.bottom==s.bottom&&f.right>s.right)&&(s=f),u+1>d&&(d=u),r(d,f.top,p-d,f.bottom)}),{start:a,end:s}}var o=t.display,l=t.doc,a=document.createDocumentFragment(),s=je(t.display),u=s.left,c=Math.max(o.sizerWidth,Ge(t)-o.sizer.offsetLeft)-s.right,f=e.from(),h=e.to();if(f.line==h.line)i(f.line,f.ch,h.ch);else{var d=Gi(l,f.line),p=Gi(l,h.line),g=fi(d)==fi(p),v=i(f.line,f.ch,g?d.text.length+1:null).end,m=i(h.line,g?0:null,h.ch).start;g&&(v.top<m.top-2?(r(v.right,v.top,null,v.bottom),r(u,m.top,m.left,m.bottom)):r(v.right,v.top,m.left-v.right,v.bottom)),v.bottom<m.top&&r(u,v.bottom,null,m.top)}n.appendChild(a)}function Ee(t){if(t.state.focused){var e=t.display;clearInterval(e.blinker);var n=!0;e.cursorDiv.style.visibility="",t.options.cursorBlinkRate>0?e.blinker=setInterval(function(){e.cursorDiv.style.visibility=(n=!n)?"":"hidden"},t.options.cursorBlinkRate):t.options.cursorBlinkRate<0&&(e.cursorDiv.style.visibility="hidden")}}function Fe(t,e){t.doc.mode.startState&&t.doc.frontier<t.display.viewTo&&t.state.highlight.set(e,Wo(Ie,t))}function Ie(t){var e=t.doc;if(e.frontier<e.first&&(e.frontier=e.first),!(e.frontier>=t.display.viewTo)){var n=+new Date+t.options.workTime,r=Jl(e.mode,ze(t,e.frontier)),i=[];e.iter(e.frontier,Math.min(e.first+e.size,t.display.viewTo+500),function(o){if(e.frontier>=t.display.viewFrom){var l=o.styles,a=Ti(t,o,r,!0);o.styles=a.styles;var s=o.styleClasses,u=a.classes;u?o.styleClasses=u:s&&(o.styleClasses=null);for(var c=!l||l.length!=o.styles.length||s!=u&&(!s||!u||s.bgClass!=u.bgClass||s.textClass!=u.textClass),f=0;!c&&f<l.length;++f)c=l[f]!=o.styles[f];c&&i.push(e.frontier),o.stateAfter=Jl(e.mode,r)}else Ai(t,o.text,r),o.stateAfter=e.frontier%5==0?Jl(e.mode,r):null;return++e.frontier,+new Date>n?(Fe(t,t.options.workDelay),!0):void 0}),i.length&&Tn(t,function(){for(var e=0;e<i.length;e++)Hn(t,i[e],"text")})}}function Re(t,e,n){for(var r,i,o=t.doc,l=n?-1:e-(t.doc.mode.innerMode?1e3:100),a=e;a>l;--a){if(a<=o.first)return o.first;var s=Gi(o,a-1);if(s.stateAfter&&(!n||a<=o.frontier))return a;var u=Aa(s.text,null,t.options.tabSize);(null==i||r>u)&&(i=a-1,r=u)}return i}function ze(t,e,n){var r=t.doc,i=t.display;if(!r.mode.startState)return!0;var o=Re(t,e,n),l=o>r.first&&Gi(r,o-1).stateAfter;return l=l?Jl(r.mode,l):Ql(r.mode),r.iter(o,e,function(n){Ai(t,n.text,l);var a=o==e-1||o%5==0||o>=i.viewFrom&&o<i.viewTo;n.stateAfter=a?Jl(r.mode,l):null,++o}),n&&(r.frontier=o),l}function Pe(t){return t.lineSpace.offsetTop}function Be(t){return t.mover.offsetHeight-t.lineSpace.offsetHeight}function je(t){if(t.cachedPaddingH)return t.cachedPaddingH;var e=Ro(t.measure,Fo("pre","x")),n=window.getComputedStyle?window.getComputedStyle(e):e.currentStyle,r={left:parseInt(n.paddingLeft),right:parseInt(n.paddingRight)};return isNaN(r.left)||isNaN(r.right)||(t.cachedPaddingH=r),r}function Ue(t){return ka-t.display.nativeBarWidth}function Ge(t){return t.display.scroller.clientWidth-Ue(t)-t.display.barWidth}function qe(t){return t.display.scroller.clientHeight-Ue(t)-t.display.barHeight}function Ke(t,e,n){var r=t.options.lineWrapping,i=r&&Ge(t);if(!e.measure.heights||r&&e.measure.width!=i){var o=e.measure.heights=[];if(r){e.measure.width=i;for(var l=e.text.firstChild.getClientRects(),a=0;a<l.length-1;a++){var s=l[a],u=l[a+1];Math.abs(s.bottom-u.bottom)>2&&o.push((s.bottom+u.top)/2-n.top)}}o.push(n.bottom-n.top)}}function Ve(t,e,n){if(t.line==e)return{map:t.measure.map,cache:t.measure.cache};for(var r=0;r<t.rest.length;r++)if(t.rest[r]==e)return{map:t.measure.maps[r],cache:t.measure.caches[r]};for(var r=0;r<t.rest.length;r++)if($i(t.rest[r])>n)return{map:t.measure.maps[r],cache:t.measure.caches[r],before:!0}}function $e(t,e){e=fi(e);var n=$i(e),r=t.display.externalMeasured=new On(t.doc,e,n);r.lineN=n;var i=r.built=Oi(t,r);return r.text=i.pre,Ro(t.display.lineMeasure,i.pre),r}function Xe(t,e,n,r){return Je(t,Ze(t,e),n,r)}function Ye(t,e){if(e>=t.display.viewFrom&&e<t.display.viewTo)return t.display.view[Fn(t,e)];var n=t.display.externalMeasured;return n&&e>=n.lineN&&e<n.lineN+n.size?n:void 0}function Ze(t,e){var n=$i(e),r=Ye(t,n);r&&!r.text?r=null:r&&r.changes&&E(t,r,n,D(t)),r||(r=$e(t,e));var i=Ve(r,e,n);return{line:e,view:r,rect:null,map:i.map,cache:i.cache,before:i.before,hasHeights:!1}}function Je(t,e,n,r,i){e.before&&(n=-1);var o,l=n+(r||"");return e.cache.hasOwnProperty(l)?o=e.cache[l]:(e.rect||(e.rect=e.view.text.getBoundingClientRect()),e.hasHeights||(Ke(t,e.view,e.rect),e.hasHeights=!0),o=tn(t,e,n,r),o.bogus||(e.cache[l]=o)),{left:o.left,right:o.right,top:i?o.rtop:o.top,bottom:i?o.rbottom:o.bottom}}function Qe(t,e,n){for(var r,i,o,l,a=0;a<t.length;a+=3){var s=t[a],u=t[a+1];if(s>e?(i=0,o=1,l="left"):u>e?(i=e-s,o=i+1):(a==t.length-3||e==u&&t[a+3]>e)&&(o=u-s,i=o-1,e>=u&&(l="right")),null!=i){if(r=t[a+2],s==u&&n==(r.insertLeft?"left":"right")&&(l=n),"left"==n&&0==i)for(;a&&t[a-2]==t[a-3]&&t[a-1].insertLeft;)r=t[(a-=3)+2],l="left";if("right"==n&&i==u-s)for(;a<t.length-3&&t[a+3]==t[a+4]&&!t[a+5].insertLeft;)r=t[(a+=3)+2],l="right";break}}return{node:r,start:i,end:o,collapse:l,coverStart:s,coverEnd:u}}function tn(t,e,n,r){var i,o=Qe(e.map,n,r),l=o.node,a=o.start,s=o.end,u=o.collapse;if(3==l.nodeType){for(var c=0;4>c;c++){for(;a&&Eo(e.line.text.charAt(o.coverStart+a));)--a;for(;o.coverStart+s<o.coverEnd&&Eo(e.line.text.charAt(o.coverStart+s));)++s;if(cl&&9>fl&&0==a&&s==o.coverEnd-o.coverStart)i=l.parentNode.getBoundingClientRect();else if(cl&&t.options.lineWrapping){var f=Wa(l,a,s).getClientRects();i=f.length?f["right"==r?f.length-1:0]:Hl}else i=Wa(l,a,s).getBoundingClientRect()||Hl;if(i.left||i.right||0==a)break;s=a,a-=1,u="right"}cl&&11>fl&&(i=en(t.display.measure,i))}else{a>0&&(u=r="right");var f;i=t.options.lineWrapping&&(f=l.getClientRects()).length>1?f["right"==r?f.length-1:0]:l.getBoundingClientRect()}if(cl&&9>fl&&!a&&(!i||!i.left&&!i.right)){var h=l.parentNode.getClientRects()[0];i=h?{left:h.left,right:h.left+mn(t.display),top:h.top,bottom:h.bottom}:Hl}for(var d=i.top-e.rect.top,p=i.bottom-e.rect.top,g=(d+p)/2,v=e.view.measure.heights,c=0;c<v.length-1&&!(g<v[c]);c++);var m=c?v[c-1]:0,y=v[c],b={left:("right"==u?i.right:i.left)-e.rect.left,right:("left"==u?i.left:i.right)-e.rect.left,top:m,bottom:y};return i.left||i.right||(b.bogus=!0),t.options.singleCursorHeightPerLine||(b.rtop=d,b.rbottom=p),b
}function en(t,e){if(!window.screen||null==screen.logicalXDPI||screen.logicalXDPI==screen.deviceXDPI||!Vo(t))return e;var n=screen.logicalXDPI/screen.deviceXDPI,r=screen.logicalYDPI/screen.deviceYDPI;return{left:e.left*n,right:e.right*n,top:e.top*r,bottom:e.bottom*r}}function nn(t){if(t.measure&&(t.measure.cache={},t.measure.heights=null,t.rest))for(var e=0;e<t.rest.length;e++)t.measure.caches[e]={}}function rn(t){t.display.externalMeasure=null,Io(t.display.lineMeasure);for(var e=0;e<t.display.view.length;e++)nn(t.display.view[e])}function on(t){rn(t),t.display.cachedCharWidth=t.display.cachedTextHeight=t.display.cachedPaddingH=null,t.options.lineWrapping||(t.display.maxLineChanged=!0),t.display.lineNumChars=null}function ln(){return window.pageXOffset||(document.documentElement||document.body).scrollLeft}function an(){return window.pageYOffset||(document.documentElement||document.body).scrollTop}function sn(t,e,n,r){if(e.widgets)for(var i=0;i<e.widgets.length;++i)if(e.widgets[i].above){var o=yi(e.widgets[i]);n.top+=o,n.bottom+=o}if("line"==r)return n;r||(r="local");var l=Yi(e);if("local"==r?l+=Pe(t.display):l-=t.display.viewOffset,"page"==r||"window"==r){var a=t.display.lineSpace.getBoundingClientRect();l+=a.top+("window"==r?0:an());var s=a.left+("window"==r?0:ln());n.left+=s,n.right+=s}return n.top+=l,n.bottom+=l,n}function un(t,e,n){if("div"==n)return e;var r=e.left,i=e.top;if("page"==n)r-=ln(),i-=an();else if("local"==n||!n){var o=t.display.sizer.getBoundingClientRect();r+=o.left,i+=o.top}var l=t.display.lineSpace.getBoundingClientRect();return{left:r-l.left,top:i-l.top}}function cn(t,e,n,r,i){return r||(r=Gi(t.doc,e.line)),sn(t,r,Xe(t,r,e.ch,i),n)}function fn(t,e,n,r,i,o){function l(e,l){var a=Je(t,i,e,l?"right":"left",o);return l?a.left=a.right:a.right=a.left,sn(t,r,a,n)}function a(t,e){var n=s[e],r=n.level%2;return t==Xo(n)&&e&&n.level<s[e-1].level?(n=s[--e],t=Yo(n)-(n.level%2?0:1),r=!0):t==Yo(n)&&e<s.length-1&&n.level<s[e+1].level&&(n=s[++e],t=Xo(n)-n.level%2,r=!1),r&&t==n.to&&t>n.from?l(t-1):l(t,r)}r=r||Gi(t.doc,e.line),i||(i=Ze(t,r));var s=Zi(r),u=e.ch;if(!s)return l(u);var c=rl(s,u),f=a(u,c);return null!=$a&&(f.other=a(u,$a)),f}function hn(t,e){var n=0,e=pe(t.doc,e);t.options.lineWrapping||(n=mn(t.display)*e.ch);var r=Gi(t.doc,e.line),i=Yi(r)+Pe(t.display);return{left:n,right:n,top:i,bottom:i+r.height}}function dn(t,e,n,r){var i=Ml(t,e);return i.xRel=r,n&&(i.outside=!0),i}function pn(t,e,n){var r=t.doc;if(n+=t.display.viewOffset,0>n)return dn(r.first,0,!0,-1);var i=Xi(r,n),o=r.first+r.size-1;if(i>o)return dn(r.first+r.size-1,Gi(r,o).text.length,!0,1);0>e&&(e=0);for(var l=Gi(r,i);;){var a=gn(t,l,i,e,n),s=ui(l),u=s&&s.find(0,!0);if(!s||!(a.ch>u.from.ch||a.ch==u.from.ch&&a.xRel>0))return a;i=$i(l=u.to.line)}}function gn(t,e,n,r,i){function o(r){var i=fn(t,Ml(n,r),"line",e,u);return a=!0,l>i.bottom?i.left-s:l<i.top?i.left+s:(a=!1,i.left)}var l=i-Yi(e),a=!1,s=2*t.display.wrapper.clientWidth,u=Ze(t,e),c=Zi(e),f=e.text.length,h=Zo(e),d=Jo(e),p=o(h),g=a,v=o(d),m=a;if(r>v)return dn(n,d,m,1);for(;;){if(c?d==h||d==ol(e,h,1):1>=d-h){for(var y=p>r||v-r>=r-p?h:d,b=r-(y==h?p:v);Eo(e.text.charAt(y));)++y;var w=dn(n,y,y==h?g:m,-1>b?-1:b>1?1:0);return w}var x=Math.ceil(f/2),C=h+x;if(c){C=h;for(var S=0;x>S;++S)C=ol(e,C,1)}var k=o(C);k>r?(d=C,v=k,(m=a)&&(v+=1e3),f=x):(h=C,p=k,g=a,f-=x)}}function vn(t){if(null!=t.cachedTextHeight)return t.cachedTextHeight;if(null==Ol){Ol=Fo("pre");for(var e=0;49>e;++e)Ol.appendChild(document.createTextNode("x")),Ol.appendChild(Fo("br"));Ol.appendChild(document.createTextNode("x"))}Ro(t.measure,Ol);var n=Ol.offsetHeight/50;return n>3&&(t.cachedTextHeight=n),Io(t.measure),n||1}function mn(t){if(null!=t.cachedCharWidth)return t.cachedCharWidth;var e=Fo("span","xxxxxxxxxx"),n=Fo("pre",[e]);Ro(t.measure,n);var r=e.getBoundingClientRect(),i=(r.right-r.left)/10;return i>2&&(t.cachedCharWidth=i),i||10}function yn(t){t.curOp={cm:t,viewChanged:!1,startHeight:t.doc.height,forceUpdate:!1,updateInput:null,typing:!1,changeObjs:null,cursorActivityHandlers:null,cursorActivityCalled:0,selectionChanged:!1,updateMaxLine:!1,scrollLeft:null,scrollTop:null,scrollToPos:null,id:++Fl},El?El.ops.push(t.curOp):t.curOp.ownsGroup=El={ops:[t.curOp],delayedCallbacks:[]}}function bn(t){var e=t.delayedCallbacks,n=0;do{for(;n<e.length;n++)e[n]();for(var r=0;r<t.ops.length;r++){var i=t.ops[r];if(i.cursorActivityHandlers)for(;i.cursorActivityCalled<i.cursorActivityHandlers.length;)i.cursorActivityHandlers[i.cursorActivityCalled++](i.cm)}}while(n<e.length)}function wn(t){var e=t.curOp,n=e.ownsGroup;if(n)try{bn(n)}finally{El=null;for(var r=0;r<n.ops.length;r++)n.ops[r].cm.curOp=null;xn(n)}}function xn(t){for(var e=t.ops,n=0;n<e.length;n++)Cn(e[n]);for(var n=0;n<e.length;n++)Sn(e[n]);for(var n=0;n<e.length;n++)kn(e[n]);for(var n=0;n<e.length;n++)Ln(e[n]);for(var n=0;n<e.length;n++)_n(e[n])}function Cn(t){var e=t.cm,n=e.display;_(e),t.updateMaxLine&&h(e),t.mustUpdate=t.viewChanged||t.forceUpdate||null!=t.scrollTop||t.scrollToPos&&(t.scrollToPos.from.line<n.viewFrom||t.scrollToPos.to.line>=n.viewTo)||n.maxLineChanged&&e.options.lineWrapping,t.update=t.mustUpdate&&new L(e,t.mustUpdate&&{top:t.scrollTop,ensure:t.scrollToPos},t.forceUpdate)}function Sn(t){t.updatedDisplay=t.mustUpdate&&T(t.cm,t.update)}function kn(t){var e=t.cm,n=e.display;t.updatedDisplay&&O(e),t.barMeasure=p(e),n.maxLineChanged&&!e.options.lineWrapping&&(t.adjustWidthTo=Xe(e,n.maxLine,n.maxLine.text.length).left+3,e.display.sizerWidth=t.adjustWidthTo,t.barMeasure.scrollWidth=Math.max(n.scroller.clientWidth,n.sizer.offsetLeft+t.adjustWidthTo+Ue(e)+e.display.barWidth),t.maxScrollLeft=Math.max(0,n.sizer.offsetLeft+t.adjustWidthTo-Ge(e))),(t.updatedDisplay||t.selectionChanged)&&(t.preparedSelection=n.input.prepareSelection())}function Ln(t){var e=t.cm;null!=t.adjustWidthTo&&(e.display.sizer.style.minWidth=t.adjustWidthTo+"px",t.maxScrollLeft<e.doc.scrollLeft&&Qn(e,Math.min(e.display.scroller.scrollLeft,t.maxScrollLeft),!0),e.display.maxLineChanged=!1),t.preparedSelection&&e.display.input.showSelection(t.preparedSelection),t.updatedDisplay&&N(e,t.barMeasure),(t.updatedDisplay||t.startHeight!=e.doc.height)&&y(e,t.barMeasure),t.selectionChanged&&Ee(e),e.state.focused&&t.updateInput&&e.display.input.reset(t.typing)}function _n(t){var e=t.cm,n=e.display,r=e.doc;if(t.updatedDisplay&&M(e,t.update),null==n.wheelStartX||null==t.scrollTop&&null==t.scrollLeft&&!t.scrollToPos||(n.wheelStartX=n.wheelStartY=null),null==t.scrollTop||n.scroller.scrollTop==t.scrollTop&&!t.forceScroll||(r.scrollTop=Math.max(0,Math.min(n.scroller.scrollHeight-n.scroller.clientHeight,t.scrollTop)),n.scrollbars.setScrollTop(r.scrollTop),n.scroller.scrollTop=r.scrollTop),null==t.scrollLeft||n.scroller.scrollLeft==t.scrollLeft&&!t.forceScroll||(r.scrollLeft=Math.max(0,Math.min(n.scroller.scrollWidth-Ge(e),t.scrollLeft)),n.scrollbars.setScrollLeft(r.scrollLeft),n.scroller.scrollLeft=r.scrollLeft,x(e)),t.scrollToPos){var i=Tr(e,pe(r,t.scrollToPos.from),pe(r,t.scrollToPos.to),t.scrollToPos.margin);t.scrollToPos.isCursor&&e.state.focused&&_r(e,i)}var o=t.maybeHiddenMarkers,l=t.maybeUnhiddenMarkers;if(o)for(var a=0;a<o.length;++a)o[a].lines.length||Ca(o[a],"hide");if(l)for(var a=0;a<l.length;++a)l[a].lines.length&&Ca(l[a],"unhide");n.wrapper.offsetHeight&&(r.scrollTop=e.display.scroller.scrollTop),t.changeObjs&&Ca(e,"changes",e,t.changeObjs),t.update&&t.update.finish()}function Tn(t,e){if(t.curOp)return e();yn(t);try{return e()}finally{wn(t)}}function Mn(t,e){return function(){if(t.curOp)return e.apply(t,arguments);yn(t);try{return e.apply(t,arguments)}finally{wn(t)}}}function An(t){return function(){if(this.curOp)return t.apply(this,arguments);yn(this);try{return t.apply(this,arguments)}finally{wn(this)}}}function Nn(t){return function(){var e=this.cm;if(!e||e.curOp)return t.apply(this,arguments);yn(e);try{return t.apply(this,arguments)}finally{wn(e)}}}function On(t,e,n){this.line=e,this.rest=hi(e),this.size=this.rest?$i(_o(this.rest))-n+1:1,this.node=this.text=null,this.hidden=gi(t,e)}function Wn(t,e,n){for(var r,i=[],o=e;n>o;o=r){var l=new On(t.doc,Gi(t.doc,o),o);r=o+l.size,i.push(l)}return i}function Dn(t,e,n,r){null==e&&(e=t.doc.first),null==n&&(n=t.doc.first+t.doc.size),r||(r=0);var i=t.display;if(r&&n<i.viewTo&&(null==i.updateLineNumbers||i.updateLineNumbers>e)&&(i.updateLineNumbers=e),t.curOp.viewChanged=!0,e>=i.viewTo)Tl&&di(t.doc,e)<i.viewTo&&En(t);else if(n<=i.viewFrom)Tl&&pi(t.doc,n+r)>i.viewFrom?En(t):(i.viewFrom+=r,i.viewTo+=r);else if(e<=i.viewFrom&&n>=i.viewTo)En(t);else if(e<=i.viewFrom){var o=In(t,n,n+r,1);o?(i.view=i.view.slice(o.index),i.viewFrom=o.lineN,i.viewTo+=r):En(t)}else if(n>=i.viewTo){var o=In(t,e,e,-1);o?(i.view=i.view.slice(0,o.index),i.viewTo=o.lineN):En(t)}else{var l=In(t,e,e,-1),a=In(t,n,n+r,1);l&&a?(i.view=i.view.slice(0,l.index).concat(Wn(t,l.lineN,a.lineN)).concat(i.view.slice(a.index)),i.viewTo+=r):En(t)}var s=i.externalMeasured;s&&(n<s.lineN?s.lineN+=r:e<s.lineN+s.size&&(i.externalMeasured=null))}function Hn(t,e,n){t.curOp.viewChanged=!0;var r=t.display,i=t.display.externalMeasured;if(i&&e>=i.lineN&&e<i.lineN+i.size&&(r.externalMeasured=null),!(e<r.viewFrom||e>=r.viewTo)){var o=r.view[Fn(t,e)];if(null!=o.node){var l=o.changes||(o.changes=[]);-1==To(l,n)&&l.push(n)}}}function En(t){t.display.viewFrom=t.display.viewTo=t.doc.first,t.display.view=[],t.display.viewOffset=0}function Fn(t,e){if(e>=t.display.viewTo)return null;if(e-=t.display.viewFrom,0>e)return null;for(var n=t.display.view,r=0;r<n.length;r++)if(e-=n[r].size,0>e)return r}function In(t,e,n,r){var i,o=Fn(t,e),l=t.display.view;if(!Tl||n==t.doc.first+t.doc.size)return{index:o,lineN:n};for(var a=0,s=t.display.viewFrom;o>a;a++)s+=l[a].size;if(s!=e){if(r>0){if(o==l.length-1)return null;i=s+l[o].size-e,o++}else i=s-e;e+=i,n+=i}for(;di(t.doc,n)!=n;){if(o==(0>r?0:l.length-1))return null;n+=r*l[o-(0>r?1:0)].size,o+=r}return{index:o,lineN:n}}function Rn(t,e,n){var r=t.display,i=r.view;0==i.length||e>=r.viewTo||n<=r.viewFrom?(r.view=Wn(t,e,n),r.viewFrom=e):(r.viewFrom>e?r.view=Wn(t,e,r.viewFrom).concat(r.view):r.viewFrom<e&&(r.view=r.view.slice(Fn(t,e))),r.viewFrom=e,r.viewTo<n?r.view=r.view.concat(Wn(t,r.viewTo,n)):r.viewTo>n&&(r.view=r.view.slice(0,Fn(t,n)))),r.viewTo=n}function zn(t){for(var e=t.display.view,n=0,r=0;r<e.length;r++){var i=e[r];i.hidden||i.node&&!i.changes||++n}return n}function Pn(t){function e(){o.activeTouch&&(l=setTimeout(function(){o.activeTouch=null},1e3),a=o.activeTouch,a.end=+new Date)}function n(t){if(1!=t.touches.length)return!1;var e=t.touches[0];return e.radiusX<=1&&e.radiusY<=1}function r(t,e){if(null==e.left)return!0;var n=e.left-t.left,r=e.top-t.top;return n*n+r*r>400}function i(e){bo(t,e)||ba(e)}var o=t.display;wa(o.scroller,"mousedown",Mn(t,Gn)),cl&&11>fl?wa(o.scroller,"dblclick",Mn(t,function(e){if(!bo(t,e)){var n=Un(t,e);if(n&&!Xn(t,e)&&!jn(t.display,e)){ma(e);var r=t.findWordAt(n);be(t.doc,r.anchor,r.head)}}})):wa(o.scroller,"dblclick",function(e){bo(t,e)||ma(e)}),Ll||wa(o.scroller,"contextmenu",function(e){hr(t,e)});var l,a={end:0};wa(o.scroller,"touchstart",function(t){if(!n(t)){clearTimeout(l);var e=+new Date;o.activeTouch={start:e,moved:!1,prev:e-a.end<=300?a:null},1==t.touches.length&&(o.activeTouch.left=t.touches[0].pageX,o.activeTouch.top=t.touches[0].pageY)}}),wa(o.scroller,"touchmove",function(){o.activeTouch&&(o.activeTouch.moved=!0)}),wa(o.scroller,"touchend",function(n){var i=o.activeTouch;if(i&&!jn(o,n)&&null!=i.left&&!i.moved&&new Date-i.start<300){var l,a=t.coordsChar(o.activeTouch,"page");l=!i.prev||r(i,i.prev)?new ce(a,a):!i.prev.prev||r(i,i.prev.prev)?t.findWordAt(a):new ce(Ml(a.line,0),pe(t.doc,Ml(a.line+1,0))),t.setSelection(l.anchor,l.head),t.focus(),ma(n)}e()}),wa(o.scroller,"touchcancel",e),wa(o.scroller,"scroll",function(){o.scroller.clientHeight&&(Jn(t,o.scroller.scrollTop),Qn(t,o.scroller.scrollLeft,!0),Ca(t,"scroll",t))}),wa(o.scroller,"mousewheel",function(e){tr(t,e)}),wa(o.scroller,"DOMMouseScroll",function(e){tr(t,e)}),wa(o.wrapper,"scroll",function(){o.wrapper.scrollTop=o.wrapper.scrollLeft=0}),t.options.dragDrop&&(wa(o.scroller,"dragstart",function(e){Zn(t,e)}),wa(o.scroller,"dragenter",i),wa(o.scroller,"dragover",i),wa(o.scroller,"drop",Mn(t,Yn)));var s=o.input.getField();wa(s,"keyup",function(e){sr.call(t,e)}),wa(s,"keydown",Mn(t,lr)),wa(s,"keypress",Mn(t,ur)),wa(s,"focus",Wo(cr,t)),wa(s,"blur",Wo(fr,t))}function Bn(t){var e=t.display;(e.lastWrapHeight!=e.wrapper.clientHeight||e.lastWrapWidth!=e.wrapper.clientWidth)&&(e.cachedCharWidth=e.cachedTextHeight=e.cachedPaddingH=null,e.scrollbarsClipped=!1,t.setSize())}function jn(t,e){for(var n=go(e);n!=t.wrapper;n=n.parentNode)if(!n||1==n.nodeType&&"true"==n.getAttribute("cm-ignore-events")||n.parentNode==t.sizer&&n!=t.mover)return!0}function Un(t,e,n,r){var i=t.display;if(!n&&"true"==go(e).getAttribute("cm-not-content"))return null;var o,l,a=i.lineSpace.getBoundingClientRect();try{o=e.clientX-a.left,l=e.clientY-a.top}catch(e){return null}var s,u=pn(t,o,l);if(r&&1==u.xRel&&(s=Gi(t.doc,u.line).text).length==u.ch){var c=Aa(s,s.length,t.options.tabSize)-s.length;u=Ml(u.line,Math.max(0,Math.round((o-je(t.display).left)/mn(t.display))-c))}return u}function Gn(t){var e=this,n=e.display;if(!(n.activeTouch&&n.input.supportsTouch()||bo(e,t))){if(n.shift=t.shiftKey,jn(n,t))return void(hl||(n.scroller.draggable=!1,setTimeout(function(){n.scroller.draggable=!0},100)));if(!Xn(e,t)){var r=Un(e,t);switch(window.focus(),vo(t)){case 1:r?qn(e,t,r):go(t)==n.scroller&&ma(t);break;case 2:hl&&(e.state.lastMiddleDown=+new Date),r&&be(e.doc,r),setTimeout(function(){n.input.focus()},20),ma(t);break;case 3:Ll&&hr(e,t)}}}}function qn(t,e,n){cl?setTimeout(Wo(Y,t),0):Y(t);var r,i=+new Date;Dl&&Dl.time>i-400&&0==Al(Dl.pos,n)?r="triple":Wl&&Wl.time>i-400&&0==Al(Wl.pos,n)?(r="double",Dl={time:i,pos:n}):(r="single",Wl={time:i,pos:n});var o,l=t.doc.sel,a=xl?e.metaKey:e.ctrlKey;t.options.dragDrop&&ja&&!Z(t)&&"single"==r&&(o=l.contains(n))>-1&&!l.ranges[o].empty()?Kn(t,e,n,a):Vn(t,e,n,r,a)}function Kn(t,e,n,r){var i=t.display,o=Mn(t,function(l){hl&&(i.scroller.draggable=!1),t.state.draggingText=!1,xa(document,"mouseup",o),xa(i.scroller,"drop",o),Math.abs(e.clientX-l.clientX)+Math.abs(e.clientY-l.clientY)<10&&(ma(l),r||be(t.doc,n),i.input.focus(),cl&&9==fl&&setTimeout(function(){document.body.focus(),i.input.focus()},20))});hl&&(i.scroller.draggable=!0),t.state.draggingText=o,i.scroller.dragDrop&&i.scroller.dragDrop(),wa(document,"mouseup",o),wa(i.scroller,"drop",o)}function Vn(t,e,n,r,i){function o(e){if(0!=Al(v,e))if(v=e,"rect"==r){for(var i=[],o=t.options.tabSize,l=Aa(Gi(u,n.line).text,n.ch,o),a=Aa(Gi(u,e.line).text,e.ch,o),s=Math.min(l,a),d=Math.max(l,a),p=Math.min(n.line,e.line),g=Math.min(t.lastLine(),Math.max(n.line,e.line));g>=p;p++){var m=Gi(u,p).text,y=ko(m,s,o);s==d?i.push(new ce(Ml(p,y),Ml(p,y))):m.length>y&&i.push(new ce(Ml(p,y),Ml(p,ko(m,d,o))))}i.length||i.push(new ce(n,n)),Le(u,fe(h.ranges.slice(0,f).concat(i),f),{origin:"*mouse",scroll:!1}),t.scrollIntoView(e)}else{var b=c,w=b.anchor,x=e;if("single"!=r){if("double"==r)var C=t.findWordAt(e);else var C=new ce(Ml(e.line,0),pe(u,Ml(e.line+1,0)));Al(C.anchor,w)>0?(x=C.head,w=X(b.from(),C.anchor)):(x=C.anchor,w=$(b.to(),C.head))}var i=h.ranges.slice(0);i[f]=new ce(pe(u,w),x),Le(u,fe(i,f),Ta)}}function l(e){var n=++y,i=Un(t,e,!0,"rect"==r);if(i)if(0!=Al(i,v)){Y(t),o(i);var a=w(s,u);(i.line>=a.to||i.line<a.from)&&setTimeout(Mn(t,function(){y==n&&l(e)}),150)}else{var c=e.clientY<m.top?-20:e.clientY>m.bottom?20:0;c&&setTimeout(Mn(t,function(){y==n&&(s.scroller.scrollTop+=c,l(e))}),50)}}function a(t){y=1/0,ma(t),s.input.focus(),xa(document,"mousemove",b),xa(document,"mouseup",x),u.history.lastSelOrigin=null}var s=t.display,u=t.doc;ma(e);var c,f,h=u.sel,d=h.ranges;if(i&&!e.shiftKey?(f=u.sel.contains(n),c=f>-1?d[f]:new ce(n,n)):c=u.sel.primary(),e.altKey)r="rect",i||(c=new ce(n,n)),n=Un(t,e,!0,!0),f=-1;else if("double"==r){var p=t.findWordAt(n);c=t.display.shift||u.extend?ye(u,c,p.anchor,p.head):p}else if("triple"==r){var g=new ce(Ml(n.line,0),pe(u,Ml(n.line+1,0)));c=t.display.shift||u.extend?ye(u,c,g.anchor,g.head):g}else c=ye(u,c,n);i?-1==f?(f=d.length,Le(u,fe(d.concat([c]),f),{scroll:!1,origin:"*mouse"})):d.length>1&&d[f].empty()&&"single"==r?(Le(u,fe(d.slice(0,f).concat(d.slice(f+1)),0)),h=u.sel):xe(u,f,c,Ta):(f=0,Le(u,new ue([c],0),Ta),h=u.sel);var v=n,m=s.wrapper.getBoundingClientRect(),y=0,b=Mn(t,function(t){vo(t)?l(t):a(t)}),x=Mn(t,a);wa(document,"mousemove",b),wa(document,"mouseup",x)}function $n(t,e,n,r,i){try{var o=e.clientX,l=e.clientY}catch(e){return!1}if(o>=Math.floor(t.display.gutters.getBoundingClientRect().right))return!1;r&&ma(e);var a=t.display,s=a.lineDiv.getBoundingClientRect();if(l>s.bottom||!xo(t,n))return po(e);l-=s.top-a.viewOffset;for(var u=0;u<t.options.gutters.length;++u){var c=a.gutters.childNodes[u];if(c&&c.getBoundingClientRect().right>=o){var f=Xi(t.doc,l),h=t.options.gutters[u];return i(t,n,t,f,h,e),po(e)}}}function Xn(t,e){return $n(t,e,"gutterClick",!0,mo)}function Yn(t){var e=this;if(!bo(e,t)&&!jn(e.display,t)){ma(t),cl&&(Il=+new Date);var n=Un(e,t,!0),r=t.dataTransfer.files;if(n&&!Z(e))if(r&&r.length&&window.FileReader&&window.File)for(var i=r.length,o=Array(i),l=0,a=function(t,r){var a=new FileReader;a.onload=Mn(e,function(){if(o[r]=a.result,++l==i){n=pe(e.doc,n);var t={from:n,to:n,text:Ua(o.join("\n")),origin:"paste"};br(e.doc,t),ke(e.doc,he(n,Ul(t)))}}),a.readAsText(t)},s=0;i>s;++s)a(r[s],s);else{if(e.state.draggingText&&e.doc.sel.contains(n)>-1)return e.state.draggingText(t),void setTimeout(function(){e.display.input.focus()},20);try{var o=t.dataTransfer.getData("Text");if(o){if(e.state.draggingText&&!(xl?t.metaKey:t.ctrlKey))var u=e.listSelections();if(_e(e.doc,he(n,n)),u)for(var s=0;s<u.length;++s)Lr(e.doc,"",u[s].anchor,u[s].head,"drag");e.replaceSelection(o,"around","paste"),e.display.input.focus()}}catch(t){}}}}function Zn(t,e){if(cl&&(!t.state.draggingText||+new Date-Il<100))return void ba(e);if(!bo(t,e)&&!jn(t.display,e)&&(e.dataTransfer.setData("Text",t.getSelection()),e.dataTransfer.setDragImage&&!vl)){var n=Fo("img",null,null,"position: fixed; left: 0; top: 0;");n.src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",gl&&(n.width=n.height=1,t.display.wrapper.appendChild(n),n._top=n.offsetTop),e.dataTransfer.setDragImage(n,0,0),gl&&n.parentNode.removeChild(n)}}function Jn(t,e){Math.abs(t.doc.scrollTop-e)<2||(t.doc.scrollTop=e,al||A(t,{top:e}),t.display.scroller.scrollTop!=e&&(t.display.scroller.scrollTop=e),t.display.scrollbars.setScrollTop(e),al&&A(t),Fe(t,100))}function Qn(t,e,n){(n?e==t.doc.scrollLeft:Math.abs(t.doc.scrollLeft-e)<2)||(e=Math.min(e,t.display.scroller.scrollWidth-t.display.scroller.clientWidth),t.doc.scrollLeft=e,x(t),t.display.scroller.scrollLeft!=e&&(t.display.scroller.scrollLeft=e),t.display.scrollbars.setScrollLeft(e))}function tr(t,e){var n=Pl(e),r=n.x,i=n.y,o=t.display,l=o.scroller;if(r&&l.scrollWidth>l.clientWidth||i&&l.scrollHeight>l.clientHeight){if(i&&xl&&hl)t:for(var a=e.target,s=o.view;a!=l;a=a.parentNode)for(var u=0;u<s.length;u++)if(s[u].node==a){t.display.currentWheelTarget=a;break t}if(r&&!al&&!gl&&null!=zl)return i&&Jn(t,Math.max(0,Math.min(l.scrollTop+i*zl,l.scrollHeight-l.clientHeight))),Qn(t,Math.max(0,Math.min(l.scrollLeft+r*zl,l.scrollWidth-l.clientWidth))),ma(e),void(o.wheelStartX=null);if(i&&null!=zl){var c=i*zl,f=t.doc.scrollTop,h=f+o.wrapper.clientHeight;0>c?f=Math.max(0,f+c-50):h=Math.min(t.doc.height,h+c+50),A(t,{top:f,bottom:h})}20>Rl&&(null==o.wheelStartX?(o.wheelStartX=l.scrollLeft,o.wheelStartY=l.scrollTop,o.wheelDX=r,o.wheelDY=i,setTimeout(function(){if(null!=o.wheelStartX){var t=l.scrollLeft-o.wheelStartX,e=l.scrollTop-o.wheelStartY,n=e&&o.wheelDY&&e/o.wheelDY||t&&o.wheelDX&&t/o.wheelDX;o.wheelStartX=o.wheelStartY=null,n&&(zl=(zl*Rl+n)/(Rl+1),++Rl)}},200)):(o.wheelDX+=r,o.wheelDY+=i))}}function er(t,e,n){if("string"==typeof e&&(e=ta[e],!e))return!1;t.display.input.ensurePolled();var r=t.display.shift,i=!1;try{Z(t)&&(t.state.suppressEdits=!0),n&&(t.display.shift=!1),i=e(t)!=La}finally{t.display.shift=r,t.state.suppressEdits=!1}return i}function nr(t,e,n){for(var r=0;r<t.state.keyMaps.length;r++){var i=na(e,t.state.keyMaps[r],n,t);if(i)return i}return t.options.extraKeys&&na(e,t.options.extraKeys,n,t)||na(e,t.options.keyMap,n,t)}function rr(t,e,n,r){var i=t.state.keySeq;if(i){if(ra(e))return"handled";Bl.set(50,function(){t.state.keySeq==i&&(t.state.keySeq=null,t.display.input.reset())}),e=i+" "+e}var o=nr(t,e,r);return"multi"==o&&(t.state.keySeq=e),"handled"==o&&mo(t,"keyHandled",t,e,n),("handled"==o||"multi"==o)&&(ma(n),Ee(t)),i&&!o&&/\'$/.test(e)?(ma(n),!0):!!o}function ir(t,e){var n=ia(e,!0);return n?e.shiftKey&&!t.state.keySeq?rr(t,"Shift-"+n,e,function(e){return er(t,e,!0)})||rr(t,n,e,function(e){return("string"==typeof e?/^go[A-Z]/.test(e):e.motion)?er(t,e):void 0}):rr(t,n,e,function(e){return er(t,e)}):!1}function or(t,e,n){return rr(t,"'"+n+"'",e,function(e){return er(t,e,!0)})}function lr(t){var e=this;if(Y(e),!bo(e,t)){cl&&11>fl&&27==t.keyCode&&(t.returnValue=!1);var n=t.keyCode;e.display.shift=16==n||t.shiftKey;var r=ir(e,t);gl&&(jl=r?n:null,!r&&88==n&&!qa&&(xl?t.metaKey:t.ctrlKey)&&e.replaceSelection("",null,"cut")),18!=n||/\bCodeMirror-crosshair\b/.test(e.display.lineDiv.className)||ar(e)}}function ar(t){function e(t){18!=t.keyCode&&t.altKey||(za(n,"CodeMirror-crosshair"),xa(document,"keyup",e),xa(document,"mouseover",e))}var n=t.display.lineDiv;Pa(n,"CodeMirror-crosshair"),wa(document,"keyup",e),wa(document,"mouseover",e)}function sr(t){16==t.keyCode&&(this.doc.sel.shift=!1),bo(this,t)}function ur(t){var e=this;if(!(jn(e.display,t)||bo(e,t)||t.ctrlKey&&!t.altKey||xl&&t.metaKey)){var n=t.keyCode,r=t.charCode;if(gl&&n==jl)return jl=null,void ma(t);if(!gl||t.which&&!(t.which<10)||!ir(e,t)){var i=String.fromCharCode(null==r?n:r);or(e,t,i)||e.display.input.onKeyPress(t)}}}function cr(t){"nocursor"!=t.options.readOnly&&(t.state.focused||(Ca(t,"focus",t),t.state.focused=!0,Pa(t.display.wrapper,"CodeMirror-focused"),t.curOp||t.display.selForContextMenu==t.doc.sel||(t.display.input.reset(),hl&&setTimeout(function(){t.display.input.reset(!0)},20)),t.display.input.receivedFocus()),Ee(t))}function fr(t){t.state.focused&&(Ca(t,"blur",t),t.state.focused=!1,za(t.display.wrapper,"CodeMirror-focused")),clearInterval(t.display.blinker),setTimeout(function(){t.state.focused||(t.display.shift=!1)},150)}function hr(t,e){jn(t.display,e)||dr(t,e)||t.display.input.onContextMenu(e)}function dr(t,e){return xo(t,"gutterContextMenu")?$n(t,e,"gutterContextMenu",!1,Ca):!1}function pr(t,e){if(Al(t,e.from)<0)return t;if(Al(t,e.to)<=0)return Ul(e);var n=t.line+e.text.length-(e.to.line-e.from.line)-1,r=t.ch;return t.line==e.to.line&&(r+=Ul(e).ch-e.to.ch),Ml(n,r)}function gr(t,e){for(var n=[],r=0;r<t.sel.ranges.length;r++){var i=t.sel.ranges[r];n.push(new ce(pr(i.anchor,e),pr(i.head,e)))}return fe(n,t.sel.primIndex)}function vr(t,e,n){return t.line==e.line?Ml(n.line,t.ch-e.ch+n.ch):Ml(n.line+(t.line-e.line),t.ch)}function mr(t,e,n){for(var r=[],i=Ml(t.first,0),o=i,l=0;l<e.length;l++){var a=e[l],s=vr(a.from,i,o),u=vr(Ul(a),i,o);if(i=a.to,o=u,"around"==n){var c=t.sel.ranges[l],f=Al(c.head,c.anchor)<0;r[l]=new ce(f?u:s,f?s:u)}else r[l]=new ce(s,s)}return new ue(r,t.sel.primIndex)}function yr(t,e,n){var r={canceled:!1,from:e.from,to:e.to,text:e.text,origin:e.origin,cancel:function(){this.canceled=!0}};return n&&(r.update=function(e,n,r,i){e&&(this.from=pe(t,e)),n&&(this.to=pe(t,n)),r&&(this.text=r),void 0!==i&&(this.origin=i)}),Ca(t,"beforeChange",t,r),t.cm&&Ca(t.cm,"beforeChange",t.cm,r),r.canceled?null:{from:r.from,to:r.to,text:r.text,origin:r.origin}}function br(t,e,n){if(t.cm){if(!t.cm.curOp)return Mn(t.cm,br)(t,e,n);if(t.cm.state.suppressEdits)return}if(!(xo(t,"beforeChange")||t.cm&&xo(t.cm,"beforeChange"))||(e=yr(t,e,!0))){var r=_l&&!n&&ei(t,e.from,e.to);if(r)for(var i=r.length-1;i>=0;--i)wr(t,{from:r[i].from,to:r[i].to,text:i?[""]:e.text});else wr(t,e)}}function wr(t,e){if(1!=e.text.length||""!=e.text[0]||0!=Al(e.from,e.to)){var n=gr(t,e);no(t,e,n,t.cm?t.cm.curOp.id:0/0),Sr(t,e,n,Jr(t,e));var r=[];ji(t,function(t,n){n||-1!=To(r,t.history)||(ho(t.history,e),r.push(t.history)),Sr(t,e,null,Jr(t,e))})}}function xr(t,e,n){if(!t.cm||!t.cm.state.suppressEdits){for(var r,i=t.history,o=t.sel,l="undo"==e?i.done:i.undone,a="undo"==e?i.undone:i.done,s=0;s<l.length&&(r=l[s],n?!r.ranges||r.equals(t.sel):r.ranges);s++);if(s!=l.length){for(i.lastOrigin=i.lastSelOrigin=null;r=l.pop(),r.ranges;){if(oo(r,a),n&&!r.equals(t.sel))return void Le(t,r,{clearRedo:!1});o=r}var u=[];oo(o,a),a.push({changes:u,generation:i.generation}),i.generation=r.generation||++i.maxGeneration;for(var c=xo(t,"beforeChange")||t.cm&&xo(t.cm,"beforeChange"),s=r.changes.length-1;s>=0;--s){var f=r.changes[s];if(f.origin=e,c&&!yr(t,f,!1))return void(l.length=0);u.push(Qi(t,f));var h=s?gr(t,f):_o(l);Sr(t,f,h,ti(t,f)),!s&&t.cm&&t.cm.scrollIntoView({from:f.from,to:Ul(f)});var d=[];ji(t,function(t,e){e||-1!=To(d,t.history)||(ho(t.history,f),d.push(t.history)),Sr(t,f,null,ti(t,f))})}}}}function Cr(t,e){if(0!=e&&(t.first+=e,t.sel=new ue(Mo(t.sel.ranges,function(t){return new ce(Ml(t.anchor.line+e,t.anchor.ch),Ml(t.head.line+e,t.head.ch))}),t.sel.primIndex),t.cm)){Dn(t.cm,t.first,t.first-e,e);for(var n=t.cm.display,r=n.viewFrom;r<n.viewTo;r++)Hn(t.cm,r,"gutter")}}function Sr(t,e,n,r){if(t.cm&&!t.cm.curOp)return Mn(t.cm,Sr)(t,e,n,r);if(e.to.line<t.first)return void Cr(t,e.text.length-1-(e.to.line-e.from.line));if(!(e.from.line>t.lastLine())){if(e.from.line<t.first){var i=e.text.length-1-(t.first-e.from.line);Cr(t,i),e={from:Ml(t.first,0),to:Ml(e.to.line+i,e.to.ch),text:[_o(e.text)],origin:e.origin}}var o=t.lastLine();e.to.line>o&&(e={from:e.from,to:Ml(o,Gi(t,o).text.length),text:[e.text[0]],origin:e.origin}),e.removed=qi(t,e.from,e.to),n||(n=gr(t,e)),t.cm?kr(t.cm,e,r):zi(t,e,r),_e(t,n,_a)}}function kr(t,e,n){var r=t.doc,i=t.display,l=e.from,a=e.to,s=!1,u=l.line;t.options.lineWrapping||(u=$i(fi(Gi(r,l.line))),r.iter(u,a.line+1,function(t){return t==i.maxLine?(s=!0,!0):void 0})),r.sel.contains(e.from,e.to)>-1&&wo(t),zi(r,e,n,o(t)),t.options.lineWrapping||(r.iter(u,l.line+e.text.length,function(t){var e=f(t);e>i.maxLineLength&&(i.maxLine=t,i.maxLineLength=e,i.maxLineChanged=!0,s=!1)}),s&&(t.curOp.updateMaxLine=!0)),r.frontier=Math.min(r.frontier,l.line),Fe(t,400);var c=e.text.length-(a.line-l.line)-1;e.full?Dn(t):l.line!=a.line||1!=e.text.length||Ri(t.doc,e)?Dn(t,l.line,a.line+1,c):Hn(t,l.line,"text");var h=xo(t,"changes"),d=xo(t,"change");if(d||h){var p={from:l,to:a,text:e.text,removed:e.removed,origin:e.origin};d&&mo(t,"change",t,p),h&&(t.curOp.changeObjs||(t.curOp.changeObjs=[])).push(p)}t.display.selForContextMenu=null}function Lr(t,e,n,r,i){if(r||(r=n),Al(r,n)<0){var o=r;r=n,n=o}"string"==typeof e&&(e=Ua(e)),br(t,{from:n,to:r,text:e,origin:i})}function _r(t,e){if(!bo(t,"scrollCursorIntoView")){var n=t.display,r=n.sizer.getBoundingClientRect(),i=null;if(e.top+r.top<0?i=!0:e.bottom+r.top>(window.innerHeight||document.documentElement.clientHeight)&&(i=!1),null!=i&&!yl){var o=Fo("div","​",null,"position: absolute; top: "+(e.top-n.viewOffset-Pe(t.display))+"px; height: "+(e.bottom-e.top+Ue(t)+n.barHeight)+"px; left: "+e.left+"px; width: 2px;");t.display.lineSpace.appendChild(o),o.scrollIntoView(i),t.display.lineSpace.removeChild(o)}}}function Tr(t,e,n,r){null==r&&(r=0);for(var i=0;5>i;i++){var o=!1,l=fn(t,e),a=n&&n!=e?fn(t,n):l,s=Ar(t,Math.min(l.left,a.left),Math.min(l.top,a.top)-r,Math.max(l.left,a.left),Math.max(l.bottom,a.bottom)+r),u=t.doc.scrollTop,c=t.doc.scrollLeft;if(null!=s.scrollTop&&(Jn(t,s.scrollTop),Math.abs(t.doc.scrollTop-u)>1&&(o=!0)),null!=s.scrollLeft&&(Qn(t,s.scrollLeft),Math.abs(t.doc.scrollLeft-c)>1&&(o=!0)),!o)break}return l}function Mr(t,e,n,r,i){var o=Ar(t,e,n,r,i);null!=o.scrollTop&&Jn(t,o.scrollTop),null!=o.scrollLeft&&Qn(t,o.scrollLeft)}function Ar(t,e,n,r,i){var o=t.display,l=vn(t.display);0>n&&(n=0);var a=t.curOp&&null!=t.curOp.scrollTop?t.curOp.scrollTop:o.scroller.scrollTop,s=qe(t),u={};i-n>s&&(i=n+s);var c=t.doc.height+Be(o),f=l>n,h=i>c-l;if(a>n)u.scrollTop=f?0:n;else if(i>a+s){var d=Math.min(n,(h?c:i)-s);d!=a&&(u.scrollTop=d)}var p=t.curOp&&null!=t.curOp.scrollLeft?t.curOp.scrollLeft:o.scroller.scrollLeft,g=Ge(t)-(t.options.fixedGutter?o.gutters.offsetWidth:0),v=r-e>g;return v&&(r=e+g),10>e?u.scrollLeft=0:p>e?u.scrollLeft=Math.max(0,e-(v?0:10)):r>g+p-3&&(u.scrollLeft=r+(v?0:10)-g),u}function Nr(t,e,n){(null!=e||null!=n)&&Wr(t),null!=e&&(t.curOp.scrollLeft=(null==t.curOp.scrollLeft?t.doc.scrollLeft:t.curOp.scrollLeft)+e),null!=n&&(t.curOp.scrollTop=(null==t.curOp.scrollTop?t.doc.scrollTop:t.curOp.scrollTop)+n)}function Or(t){Wr(t);var e=t.getCursor(),n=e,r=e;t.options.lineWrapping||(n=e.ch?Ml(e.line,e.ch-1):e,r=Ml(e.line,e.ch+1)),t.curOp.scrollToPos={from:n,to:r,margin:t.options.cursorScrollMargin,isCursor:!0}}function Wr(t){var e=t.curOp.scrollToPos;if(e){t.curOp.scrollToPos=null;var n=hn(t,e.from),r=hn(t,e.to),i=Ar(t,Math.min(n.left,r.left),Math.min(n.top,r.top)-e.margin,Math.max(n.right,r.right),Math.max(n.bottom,r.bottom)+e.margin);t.scrollTo(i.scrollLeft,i.scrollTop)}}function Dr(t,e,n,r){var i,o=t.doc;null==n&&(n="add"),"smart"==n&&(o.mode.indent?i=ze(t,e):n="prev");var l=t.options.tabSize,a=Gi(o,e),s=Aa(a.text,null,l);a.stateAfter&&(a.stateAfter=null);var u,c=a.text.match(/^\s*/)[0];if(r||/\S/.test(a.text)){if("smart"==n&&(u=o.mode.indent(i,a.text.slice(c.length),a.text),u==La||u>150)){if(!r)return;n="prev"}}else u=0,n="not";"prev"==n?u=e>o.first?Aa(Gi(o,e-1).text,null,l):0:"add"==n?u=s+t.options.indentUnit:"subtract"==n?u=s-t.options.indentUnit:"number"==typeof n&&(u=s+n),u=Math.max(0,u);var f="",h=0;if(t.options.indentWithTabs)for(var d=Math.floor(u/l);d;--d)h+=l,f+="	";if(u>h&&(f+=Lo(u-h)),f!=c)Lr(o,f,Ml(e,0),Ml(e,c.length),"+input");else for(var d=0;d<o.sel.ranges.length;d++){var p=o.sel.ranges[d];if(p.head.line==e&&p.head.ch<c.length){var h=Ml(e,c.length);xe(o,d,new ce(h,h));break}}a.stateAfter=null}function Hr(t,e,n,r){var i=e,o=e;return"number"==typeof e?o=Gi(t,de(t,e)):i=$i(e),null==i?null:(r(o,i)&&t.cm&&Hn(t.cm,i,n),o)}function Er(t,e){for(var n=t.doc.sel.ranges,r=[],i=0;i<n.length;i++){for(var o=e(n[i]);r.length&&Al(o.from,_o(r).to)<=0;){var l=r.pop();if(Al(l.from,o.from)<0){o.from=l.from;break}}r.push(o)}Tn(t,function(){for(var e=r.length-1;e>=0;e--)Lr(t.doc,"",r[e].from,r[e].to,"+delete");Or(t)})}function Fr(t,e,n,r,i){function o(){var e=a+n;return e<t.first||e>=t.first+t.size?f=!1:(a=e,c=Gi(t,e))}function l(t){var e=(i?ol:ll)(c,s,n,!0);if(null==e){if(t||!o())return f=!1;s=i?(0>n?Jo:Zo)(c):0>n?c.text.length:0}else s=e;return!0}var a=e.line,s=e.ch,u=n,c=Gi(t,a),f=!0;if("char"==r)l();else if("column"==r)l(!0);else if("word"==r||"group"==r)for(var h=null,d="group"==r,p=t.cm&&t.cm.getHelper(e,"wordChars"),g=!0;!(0>n)||l(!g);g=!1){var v=c.text.charAt(s)||"\n",m=Do(v,p)?"w":d&&"\n"==v?"n":!d||/\s/.test(v)?null:"p";if(!d||g||m||(m="s"),h&&h!=m){0>n&&(n=1,l());break}if(m&&(h=m),n>0&&!l(!g))break}var y=Ne(t,Ml(a,s),u,!0);return f||(y.hitSide=!0),y}function Ir(t,e,n,r){var i,o=t.doc,l=e.left;if("page"==r){var a=Math.min(t.display.wrapper.clientHeight,window.innerHeight||document.documentElement.clientHeight);i=e.top+n*(a-(0>n?1.5:.5)*vn(t.display))}else"line"==r&&(i=n>0?e.bottom+3:e.top-3);for(;;){var s=pn(t,l,i);if(!s.outside)break;if(0>n?0>=i:i>=o.height){s.hitSide=!0;break}i+=5*n}return s}function Rr(e,n,r,i){t.defaults[e]=n,r&&(ql[e]=i?function(t,e,n){n!=Kl&&r(t,e,n)}:r)}function zr(t){for(var e,n,r,i,o=t.split(/-(?!$)/),t=o[o.length-1],l=0;l<o.length-1;l++){var a=o[l];if(/^(cmd|meta|m)$/i.test(a))i=!0;else if(/^a(lt)?$/i.test(a))e=!0;else if(/^(c|ctrl|control)$/i.test(a))n=!0;else{if(!/^s(hift)$/i.test(a))throw new Error("Unrecognized modifier name: "+a);r=!0}}return e&&(t="Alt-"+t),n&&(t="Ctrl-"+t),i&&(t="Cmd-"+t),r&&(t="Shift-"+t),t}function Pr(t){return"string"==typeof t?ea[t]:t
}function Br(t,e,n,r,i){if(r&&r.shared)return jr(t,e,n,r,i);if(t.cm&&!t.cm.curOp)return Mn(t.cm,Br)(t,e,n,r,i);var o=new aa(t,i),l=Al(e,n);if(r&&Oo(r,o,!1),l>0||0==l&&o.clearWhenEmpty!==!1)return o;if(o.replacedWith&&(o.collapsed=!0,o.widgetNode=Fo("span",[o.replacedWith],"CodeMirror-widget"),r.handleMouseEvents||o.widgetNode.setAttribute("cm-ignore-events","true"),r.insertLeft&&(o.widgetNode.insertLeft=!0)),o.collapsed){if(ci(t,e.line,e,n,o)||e.line!=n.line&&ci(t,n.line,e,n,o))throw new Error("Inserting collapsed marker partially overlapping an existing one");Tl=!0}o.addToHistory&&no(t,{from:e,to:n,origin:"markText"},t.sel,0/0);var a,s=e.line,u=t.cm;if(t.iter(s,n.line+1,function(t){u&&o.collapsed&&!u.options.lineWrapping&&fi(t)==u.display.maxLine&&(a=!0),o.collapsed&&s!=e.line&&Vi(t,0),Xr(t,new Kr(o,s==e.line?e.ch:null,s==n.line?n.ch:null)),++s}),o.collapsed&&t.iter(e.line,n.line+1,function(e){gi(t,e)&&Vi(e,0)}),o.clearOnEnter&&wa(o,"beforeCursorEnter",function(){o.clear()}),o.readOnly&&(_l=!0,(t.history.done.length||t.history.undone.length)&&t.clearHistory()),o.collapsed&&(o.id=++la,o.atomic=!0),u){if(a&&(u.curOp.updateMaxLine=!0),o.collapsed)Dn(u,e.line,n.line+1);else if(o.className||o.title||o.startStyle||o.endStyle||o.css)for(var c=e.line;c<=n.line;c++)Hn(u,c,"text");o.atomic&&Me(u.doc),mo(u,"markerAdded",u,o)}return o}function jr(t,e,n,r,i){r=Oo(r),r.shared=!1;var o=[Br(t,e,n,r,i)],l=o[0],a=r.widgetNode;return ji(t,function(t){a&&(r.widgetNode=a.cloneNode(!0)),o.push(Br(t,pe(t,e),pe(t,n),r,i));for(var s=0;s<t.linked.length;++s)if(t.linked[s].isParent)return;l=_o(o)}),new sa(o,l)}function Ur(t){return t.findMarks(Ml(t.first,0),t.clipPos(Ml(t.lastLine())),function(t){return t.parent})}function Gr(t,e){for(var n=0;n<e.length;n++){var r=e[n],i=r.find(),o=t.clipPos(i.from),l=t.clipPos(i.to);if(Al(o,l)){var a=Br(t,o,l,r.primary,r.primary.type);r.markers.push(a),a.parent=r}}}function qr(t){for(var e=0;e<t.length;e++){var n=t[e],r=[n.primary.doc];ji(n.primary.doc,function(t){r.push(t)});for(var i=0;i<n.markers.length;i++){var o=n.markers[i];-1==To(r,o.doc)&&(o.parent=null,n.markers.splice(i--,1))}}}function Kr(t,e,n){this.marker=t,this.from=e,this.to=n}function Vr(t,e){if(t)for(var n=0;n<t.length;++n){var r=t[n];if(r.marker==e)return r}}function $r(t,e){for(var n,r=0;r<t.length;++r)t[r]!=e&&(n||(n=[])).push(t[r]);return n}function Xr(t,e){t.markedSpans=t.markedSpans?t.markedSpans.concat([e]):[e],e.marker.attachLine(t)}function Yr(t,e,n){if(t)for(var r,i=0;i<t.length;++i){var o=t[i],l=o.marker,a=null==o.from||(l.inclusiveLeft?o.from<=e:o.from<e);if(a||o.from==e&&"bookmark"==l.type&&(!n||!o.marker.insertLeft)){var s=null==o.to||(l.inclusiveRight?o.to>=e:o.to>e);(r||(r=[])).push(new Kr(l,o.from,s?null:o.to))}}return r}function Zr(t,e,n){if(t)for(var r,i=0;i<t.length;++i){var o=t[i],l=o.marker,a=null==o.to||(l.inclusiveRight?o.to>=e:o.to>e);if(a||o.from==e&&"bookmark"==l.type&&(!n||o.marker.insertLeft)){var s=null==o.from||(l.inclusiveLeft?o.from<=e:o.from<e);(r||(r=[])).push(new Kr(l,s?null:o.from-e,null==o.to?null:o.to-e))}}return r}function Jr(t,e){if(e.full)return null;var n=ve(t,e.from.line)&&Gi(t,e.from.line).markedSpans,r=ve(t,e.to.line)&&Gi(t,e.to.line).markedSpans;if(!n&&!r)return null;var i=e.from.ch,o=e.to.ch,l=0==Al(e.from,e.to),a=Yr(n,i,l),s=Zr(r,o,l),u=1==e.text.length,c=_o(e.text).length+(u?i:0);if(a)for(var f=0;f<a.length;++f){var h=a[f];if(null==h.to){var d=Vr(s,h.marker);d?u&&(h.to=null==d.to?null:d.to+c):h.to=i}}if(s)for(var f=0;f<s.length;++f){var h=s[f];if(null!=h.to&&(h.to+=c),null==h.from){var d=Vr(a,h.marker);d||(h.from=c,u&&(a||(a=[])).push(h))}else h.from+=c,u&&(a||(a=[])).push(h)}a&&(a=Qr(a)),s&&s!=a&&(s=Qr(s));var p=[a];if(!u){var g,v=e.text.length-2;if(v>0&&a)for(var f=0;f<a.length;++f)null==a[f].to&&(g||(g=[])).push(new Kr(a[f].marker,null,null));for(var f=0;v>f;++f)p.push(g);p.push(s)}return p}function Qr(t){for(var e=0;e<t.length;++e){var n=t[e];null!=n.from&&n.from==n.to&&n.marker.clearWhenEmpty!==!1&&t.splice(e--,1)}return t.length?t:null}function ti(t,e){var n=so(t,e),r=Jr(t,e);if(!n)return r;if(!r)return n;for(var i=0;i<n.length;++i){var o=n[i],l=r[i];if(o&&l)t:for(var a=0;a<l.length;++a){for(var s=l[a],u=0;u<o.length;++u)if(o[u].marker==s.marker)continue t;o.push(s)}else l&&(n[i]=l)}return n}function ei(t,e,n){var r=null;if(t.iter(e.line,n.line+1,function(t){if(t.markedSpans)for(var e=0;e<t.markedSpans.length;++e){var n=t.markedSpans[e].marker;!n.readOnly||r&&-1!=To(r,n)||(r||(r=[])).push(n)}}),!r)return null;for(var i=[{from:e,to:n}],o=0;o<r.length;++o)for(var l=r[o],a=l.find(0),s=0;s<i.length;++s){var u=i[s];if(!(Al(u.to,a.from)<0||Al(u.from,a.to)>0)){var c=[s,1],f=Al(u.from,a.from),h=Al(u.to,a.to);(0>f||!l.inclusiveLeft&&!f)&&c.push({from:u.from,to:a.from}),(h>0||!l.inclusiveRight&&!h)&&c.push({from:a.to,to:u.to}),i.splice.apply(i,c),s+=c.length-1}}return i}function ni(t){var e=t.markedSpans;if(e){for(var n=0;n<e.length;++n)e[n].marker.detachLine(t);t.markedSpans=null}}function ri(t,e){if(e){for(var n=0;n<e.length;++n)e[n].marker.attachLine(t);t.markedSpans=e}}function ii(t){return t.inclusiveLeft?-1:0}function oi(t){return t.inclusiveRight?1:0}function li(t,e){var n=t.lines.length-e.lines.length;if(0!=n)return n;var r=t.find(),i=e.find(),o=Al(r.from,i.from)||ii(t)-ii(e);if(o)return-o;var l=Al(r.to,i.to)||oi(t)-oi(e);return l?l:e.id-t.id}function ai(t,e){var n,r=Tl&&t.markedSpans;if(r)for(var i,o=0;o<r.length;++o)i=r[o],i.marker.collapsed&&null==(e?i.from:i.to)&&(!n||li(n,i.marker)<0)&&(n=i.marker);return n}function si(t){return ai(t,!0)}function ui(t){return ai(t,!1)}function ci(t,e,n,r,i){var o=Gi(t,e),l=Tl&&o.markedSpans;if(l)for(var a=0;a<l.length;++a){var s=l[a];if(s.marker.collapsed){var u=s.marker.find(0),c=Al(u.from,n)||ii(s.marker)-ii(i),f=Al(u.to,r)||oi(s.marker)-oi(i);if(!(c>=0&&0>=f||0>=c&&f>=0)&&(0>=c&&(Al(u.to,n)>0||s.marker.inclusiveRight&&i.inclusiveLeft)||c>=0&&(Al(u.from,r)<0||s.marker.inclusiveLeft&&i.inclusiveRight)))return!0}}}function fi(t){for(var e;e=si(t);)t=e.find(-1,!0).line;return t}function hi(t){for(var e,n;e=ui(t);)t=e.find(1,!0).line,(n||(n=[])).push(t);return n}function di(t,e){var n=Gi(t,e),r=fi(n);return n==r?e:$i(r)}function pi(t,e){if(e>t.lastLine())return e;var n,r=Gi(t,e);if(!gi(t,r))return e;for(;n=ui(r);)r=n.find(1,!0).line;return $i(r)+1}function gi(t,e){var n=Tl&&e.markedSpans;if(n)for(var r,i=0;i<n.length;++i)if(r=n[i],r.marker.collapsed){if(null==r.from)return!0;if(!r.marker.widgetNode&&0==r.from&&r.marker.inclusiveLeft&&vi(t,e,r))return!0}}function vi(t,e,n){if(null==n.to){var r=n.marker.find(1,!0);return vi(t,r.line,Vr(r.line.markedSpans,n.marker))}if(n.marker.inclusiveRight&&n.to==e.text.length)return!0;for(var i,o=0;o<e.markedSpans.length;++o)if(i=e.markedSpans[o],i.marker.collapsed&&!i.marker.widgetNode&&i.from==n.to&&(null==i.to||i.to!=n.from)&&(i.marker.inclusiveLeft||n.marker.inclusiveRight)&&vi(t,e,i))return!0}function mi(t,e,n){Yi(e)<(t.curOp&&t.curOp.scrollTop||t.doc.scrollTop)&&Nr(t,null,n)}function yi(t){if(null!=t.height)return t.height;if(!Fa(document.body,t.node)){var e="position: relative;";t.coverGutter&&(e+="margin-left: -"+t.cm.display.gutters.offsetWidth+"px;"),t.noHScroll&&(e+="width: "+t.cm.display.wrapper.clientWidth+"px;"),Ro(t.cm.display.measure,Fo("div",[t.node],null,e))}return t.height=t.node.offsetHeight}function bi(t,e,n,r){var i=new ua(t,n,r);return i.noHScroll&&(t.display.alignWidgets=!0),Hr(t.doc,e,"widget",function(e){var n=e.widgets||(e.widgets=[]);if(null==i.insertAt?n.push(i):n.splice(Math.min(n.length-1,Math.max(0,i.insertAt)),0,i),i.line=e,!gi(t.doc,e)){var r=Yi(e)<t.doc.scrollTop;Vi(e,e.height+yi(i)),r&&Nr(t,null,i.height),t.curOp.forceUpdate=!0}return!0}),i}function wi(t,e,n,r){t.text=e,t.stateAfter&&(t.stateAfter=null),t.styles&&(t.styles=null),null!=t.order&&(t.order=null),ni(t),ri(t,n);var i=r?r(t):1;i!=t.height&&Vi(t,i)}function xi(t){t.parent=null,ni(t)}function Ci(t,e){if(t)for(;;){var n=t.match(/(?:^|\s+)line-(background-)?(\S+)/);if(!n)break;t=t.slice(0,n.index)+t.slice(n.index+n[0].length);var r=n[1]?"bgClass":"textClass";null==e[r]?e[r]=n[2]:new RegExp("(?:^|s)"+n[2]+"(?:$|s)").test(e[r])||(e[r]+=" "+n[2])}return t}function Si(e,n){if(e.blankLine)return e.blankLine(n);if(e.innerMode){var r=t.innerMode(e,n);return r.mode.blankLine?r.mode.blankLine(r.state):void 0}}function ki(e,n,r,i){for(var o=0;10>o;o++){i&&(i[0]=t.innerMode(e,r).mode);var l=e.token(n,r);if(n.pos>n.start)return l}throw new Error("Mode "+e.name+" failed to advance stream.")}function Li(t,e,n,r){function i(t){return{start:f.start,end:f.pos,string:f.current(),type:o||null,state:t?Jl(l.mode,c):c}}var o,l=t.doc,a=l.mode;e=pe(l,e);var s,u=Gi(l,e.line),c=ze(t,e.line,n),f=new oa(u.text,t.options.tabSize);for(r&&(s=[]);(r||f.pos<e.ch)&&!f.eol();)f.start=f.pos,o=ki(a,f,c),r&&s.push(i(!0));return r?s:i()}function _i(t,e,n,r,i,o,l){var a=n.flattenSpans;null==a&&(a=t.options.flattenSpans);var s,u=0,c=null,f=new oa(e,t.options.tabSize),h=t.options.addModeClass&&[null];for(""==e&&Ci(Si(n,r),o);!f.eol();){if(f.pos>t.options.maxHighlightLength?(a=!1,l&&Ai(t,e,r,f.pos),f.pos=e.length,s=null):s=Ci(ki(n,f,r,h),o),h){var d=h[0].name;d&&(s="m-"+(s?d+" "+s:d))}if(!a||c!=s){for(;u<f.start;)u=Math.min(f.start,u+5e4),i(u,c);c=s}f.start=f.pos}for(;u<f.pos;){var p=Math.min(f.pos,u+5e4);i(p,c),u=p}}function Ti(t,e,n,r){var i=[t.state.modeGen],o={};_i(t,e.text,t.doc.mode,n,function(t,e){i.push(t,e)},o,r);for(var l=0;l<t.state.overlays.length;++l){var a=t.state.overlays[l],s=1,u=0;_i(t,e.text,a.mode,!0,function(t,e){for(var n=s;t>u;){var r=i[s];r>t&&i.splice(s,1,t,i[s+1],r),s+=2,u=Math.min(t,r)}if(e)if(a.opaque)i.splice(n,s-n,t,"cm-overlay "+e),s=n+2;else for(;s>n;n+=2){var o=i[n+1];i[n+1]=(o?o+" ":"")+"cm-overlay "+e}},o)}return{styles:i,classes:o.bgClass||o.textClass?o:null}}function Mi(t,e,n){if(!e.styles||e.styles[0]!=t.state.modeGen){var r=Ti(t,e,e.stateAfter=ze(t,$i(e)));e.styles=r.styles,r.classes?e.styleClasses=r.classes:e.styleClasses&&(e.styleClasses=null),n===t.doc.frontier&&t.doc.frontier++}return e.styles}function Ai(t,e,n,r){var i=t.doc.mode,o=new oa(e,t.options.tabSize);for(o.start=o.pos=r||0,""==e&&Si(i,n);!o.eol()&&o.pos<=t.options.maxHighlightLength;)ki(i,o,n),o.start=o.pos}function Ni(t,e){if(!t||/^\s*$/.test(t))return null;var n=e.addModeClass?ha:fa;return n[t]||(n[t]=t.replace(/\S+/g,"cm-$&"))}function Oi(t,e){var n=Fo("span",null,null,hl?"padding-right: .1px":null),r={pre:Fo("pre",[n]),content:n,col:0,pos:0,cm:t};e.measure={};for(var i=0;i<=(e.rest?e.rest.length:0);i++){var o,l=i?e.rest[i-1]:e.line;r.pos=0,r.addToken=Di,(cl||hl)&&t.getOption("lineWrapping")&&(r.addToken=Hi(r.addToken)),Ko(t.display.measure)&&(o=Zi(l))&&(r.addToken=Ei(r.addToken,o)),r.map=[];var a=e!=t.display.externalMeasured&&$i(l);Ii(l,r,Mi(t,l,a)),l.styleClasses&&(l.styleClasses.bgClass&&(r.bgClass=Bo(l.styleClasses.bgClass,r.bgClass||"")),l.styleClasses.textClass&&(r.textClass=Bo(l.styleClasses.textClass,r.textClass||""))),0==r.map.length&&r.map.push(0,0,r.content.appendChild(qo(t.display.measure))),0==i?(e.measure.map=r.map,e.measure.cache={}):((e.measure.maps||(e.measure.maps=[])).push(r.map),(e.measure.caches||(e.measure.caches=[])).push({}))}return hl&&/\bcm-tab\b/.test(r.content.lastChild.className)&&(r.content.className="cm-tab-wrap-hack"),Ca(t,"renderLine",t,e.line,r.pre),r.pre.className&&(r.textClass=Bo(r.pre.className,r.textClass||"")),r}function Wi(t){var e=Fo("span","•","cm-invalidchar");return e.title="\\u"+t.charCodeAt(0).toString(16),e.setAttribute("aria-label",e.title),e}function Di(t,e,n,r,i,o,l){if(e){var a=t.cm.options.specialChars,s=!1;if(a.test(e))for(var u=document.createDocumentFragment(),c=0;;){a.lastIndex=c;var f=a.exec(e),h=f?f.index-c:e.length-c;if(h){var d=document.createTextNode(e.slice(c,c+h));u.appendChild(cl&&9>fl?Fo("span",[d]):d),t.map.push(t.pos,t.pos+h,d),t.col+=h,t.pos+=h}if(!f)break;if(c+=h+1,"	"==f[0]){var p=t.cm.options.tabSize,g=p-t.col%p,d=u.appendChild(Fo("span",Lo(g),"cm-tab"));d.setAttribute("role","presentation"),d.setAttribute("cm-text","	"),t.col+=g}else{var d=t.cm.options.specialCharPlaceholder(f[0]);d.setAttribute("cm-text",f[0]),u.appendChild(cl&&9>fl?Fo("span",[d]):d),t.col+=1}t.map.push(t.pos,t.pos+1,d),t.pos++}else{t.col+=e.length;var u=document.createTextNode(e);t.map.push(t.pos,t.pos+e.length,u),cl&&9>fl&&(s=!0),t.pos+=e.length}if(n||r||i||s||l){var v=n||"";r&&(v+=r),i&&(v+=i);var m=Fo("span",[u],v,l);return o&&(m.title=o),t.content.appendChild(m)}t.content.appendChild(u)}}function Hi(t){function e(t){for(var e=" ",n=0;n<t.length-2;++n)e+=n%2?" ":" ";return e+=" "}return function(n,r,i,o,l,a){t(n,r.replace(/ {3,}/g,e),i,o,l,a)}}function Ei(t,e){return function(n,r,i,o,l,a){i=i?i+" cm-force-border":"cm-force-border";for(var s=n.pos,u=s+r.length;;){for(var c=0;c<e.length;c++){var f=e[c];if(f.to>s&&f.from<=s)break}if(f.to>=u)return t(n,r,i,o,l,a);t(n,r.slice(0,f.to-s),i,o,null,a),o=null,r=r.slice(f.to-s),s=f.to}}}function Fi(t,e,n,r){var i=!r&&n.widgetNode;i&&t.map.push(t.pos,t.pos+e,i),!r&&t.cm.display.input.needsContentAttribute&&(i||(i=t.content.appendChild(document.createElement("span"))),i.setAttribute("cm-marker",n.id)),i&&(t.cm.display.input.setUneditable(i),t.content.appendChild(i)),t.pos+=e}function Ii(t,e,n){var r=t.markedSpans,i=t.text,o=0;if(r)for(var l,a,s,u,c,f,h,d=i.length,p=0,g=1,v="",m=0;;){if(m==p){s=u=c=f=a="",h=null,m=1/0;for(var y=[],b=0;b<r.length;++b){var w=r[b],x=w.marker;w.from<=p&&(null==w.to||w.to>p)?(null!=w.to&&m>w.to&&(m=w.to,u=""),x.className&&(s+=" "+x.className),x.css&&(a=x.css),x.startStyle&&w.from==p&&(c+=" "+x.startStyle),x.endStyle&&w.to==m&&(u+=" "+x.endStyle),x.title&&!f&&(f=x.title),x.collapsed&&(!h||li(h.marker,x)<0)&&(h=w)):w.from>p&&m>w.from&&(m=w.from),"bookmark"==x.type&&w.from==p&&x.widgetNode&&y.push(x)}if(h&&(h.from||0)==p&&(Fi(e,(null==h.to?d+1:h.to)-p,h.marker,null==h.from),null==h.to))return;if(!h&&y.length)for(var b=0;b<y.length;++b)Fi(e,0,y[b])}if(p>=d)break;for(var C=Math.min(d,m);;){if(v){var S=p+v.length;if(!h){var k=S>C?v.slice(0,C-p):v;e.addToken(e,k,l?l+s:s,c,p+k.length==m?u:"",f,a)}if(S>=C){v=v.slice(C-p),p=C;break}p=S,c=""}v=i.slice(o,o=n[g++]),l=Ni(n[g++],e.cm.options)}}else for(var g=1;g<n.length;g+=2)e.addToken(e,i.slice(o,o=n[g]),Ni(n[g+1],e.cm.options))}function Ri(t,e){return 0==e.from.ch&&0==e.to.ch&&""==_o(e.text)&&(!t.cm||t.cm.options.wholeLineUpdateBefore)}function zi(t,e,n,r){function i(t){return n?n[t]:null}function o(t,n,i){wi(t,n,i,r),mo(t,"change",t,e)}function l(t,e){for(var n=t,o=[];e>n;++n)o.push(new ca(u[n],i(n),r));return o}var a=e.from,s=e.to,u=e.text,c=Gi(t,a.line),f=Gi(t,s.line),h=_o(u),d=i(u.length-1),p=s.line-a.line;if(e.full)t.insert(0,l(0,u.length)),t.remove(u.length,t.size-u.length);else if(Ri(t,e)){var g=l(0,u.length-1);o(f,f.text,d),p&&t.remove(a.line,p),g.length&&t.insert(a.line,g)}else if(c==f)if(1==u.length)o(c,c.text.slice(0,a.ch)+h+c.text.slice(s.ch),d);else{var g=l(1,u.length-1);g.push(new ca(h+c.text.slice(s.ch),d,r)),o(c,c.text.slice(0,a.ch)+u[0],i(0)),t.insert(a.line+1,g)}else if(1==u.length)o(c,c.text.slice(0,a.ch)+u[0]+f.text.slice(s.ch),i(0)),t.remove(a.line+1,p);else{o(c,c.text.slice(0,a.ch)+u[0],i(0)),o(f,h+f.text.slice(s.ch),d);var g=l(1,u.length-1);p>1&&t.remove(a.line+1,p-1),t.insert(a.line+1,g)}mo(t,"change",t,e)}function Pi(t){this.lines=t,this.parent=null;for(var e=0,n=0;e<t.length;++e)t[e].parent=this,n+=t[e].height;this.height=n}function Bi(t){this.children=t;for(var e=0,n=0,r=0;r<t.length;++r){var i=t[r];e+=i.chunkSize(),n+=i.height,i.parent=this}this.size=e,this.height=n,this.parent=null}function ji(t,e,n){function r(t,i,o){if(t.linked)for(var l=0;l<t.linked.length;++l){var a=t.linked[l];if(a.doc!=i){var s=o&&a.sharedHist;(!n||s)&&(e(a.doc,s),r(a.doc,t,s))}}}r(t,null,!0)}function Ui(t,e){if(e.cm)throw new Error("This document is already in use.");t.doc=e,e.cm=t,l(t),n(t),t.options.lineWrapping||h(t),t.options.mode=e.modeOption,Dn(t)}function Gi(t,e){if(e-=t.first,0>e||e>=t.size)throw new Error("There is no line "+(e+t.first)+" in the document.");for(var n=t;!n.lines;)for(var r=0;;++r){var i=n.children[r],o=i.chunkSize();if(o>e){n=i;break}e-=o}return n.lines[e]}function qi(t,e,n){var r=[],i=e.line;return t.iter(e.line,n.line+1,function(t){var o=t.text;i==n.line&&(o=o.slice(0,n.ch)),i==e.line&&(o=o.slice(e.ch)),r.push(o),++i}),r}function Ki(t,e,n){var r=[];return t.iter(e,n,function(t){r.push(t.text)}),r}function Vi(t,e){var n=e-t.height;if(n)for(var r=t;r;r=r.parent)r.height+=n}function $i(t){if(null==t.parent)return null;for(var e=t.parent,n=To(e.lines,t),r=e.parent;r;e=r,r=r.parent)for(var i=0;r.children[i]!=e;++i)n+=r.children[i].chunkSize();return n+e.first}function Xi(t,e){var n=t.first;t:do{for(var r=0;r<t.children.length;++r){var i=t.children[r],o=i.height;if(o>e){t=i;continue t}e-=o,n+=i.chunkSize()}return n}while(!t.lines);for(var r=0;r<t.lines.length;++r){var l=t.lines[r],a=l.height;if(a>e)break;e-=a}return n+r}function Yi(t){t=fi(t);for(var e=0,n=t.parent,r=0;r<n.lines.length;++r){var i=n.lines[r];if(i==t)break;e+=i.height}for(var o=n.parent;o;n=o,o=n.parent)for(var r=0;r<o.children.length;++r){var l=o.children[r];if(l==n)break;e+=l.height}return e}function Zi(t){var e=t.order;return null==e&&(e=t.order=Xa(t.text)),e}function Ji(t){this.done=[],this.undone=[],this.undoDepth=1/0,this.lastModTime=this.lastSelTime=0,this.lastOp=this.lastSelOp=null,this.lastOrigin=this.lastSelOrigin=null,this.generation=this.maxGeneration=t||1}function Qi(t,e){var n={from:V(e.from),to:Ul(e),text:qi(t,e.from,e.to)};return lo(t,n,e.from.line,e.to.line+1),ji(t,function(t){lo(t,n,e.from.line,e.to.line+1)},!0),n}function to(t){for(;t.length;){var e=_o(t);if(!e.ranges)break;t.pop()}}function eo(t,e){return e?(to(t.done),_o(t.done)):t.done.length&&!_o(t.done).ranges?_o(t.done):t.done.length>1&&!t.done[t.done.length-2].ranges?(t.done.pop(),_o(t.done)):void 0}function no(t,e,n,r){var i=t.history;i.undone.length=0;var o,l=+new Date;if((i.lastOp==r||i.lastOrigin==e.origin&&e.origin&&("+"==e.origin.charAt(0)&&t.cm&&i.lastModTime>l-t.cm.options.historyEventDelay||"*"==e.origin.charAt(0)))&&(o=eo(i,i.lastOp==r))){var a=_o(o.changes);0==Al(e.from,e.to)&&0==Al(e.from,a.to)?a.to=Ul(e):o.changes.push(Qi(t,e))}else{var s=_o(i.done);for(s&&s.ranges||oo(t.sel,i.done),o={changes:[Qi(t,e)],generation:i.generation},i.done.push(o);i.done.length>i.undoDepth;)i.done.shift(),i.done[0].ranges||i.done.shift()}i.done.push(n),i.generation=++i.maxGeneration,i.lastModTime=i.lastSelTime=l,i.lastOp=i.lastSelOp=r,i.lastOrigin=i.lastSelOrigin=e.origin,a||Ca(t,"historyAdded")}function ro(t,e,n,r){var i=e.charAt(0);return"*"==i||"+"==i&&n.ranges.length==r.ranges.length&&n.somethingSelected()==r.somethingSelected()&&new Date-t.history.lastSelTime<=(t.cm?t.cm.options.historyEventDelay:500)}function io(t,e,n,r){var i=t.history,o=r&&r.origin;n==i.lastSelOp||o&&i.lastSelOrigin==o&&(i.lastModTime==i.lastSelTime&&i.lastOrigin==o||ro(t,o,_o(i.done),e))?i.done[i.done.length-1]=e:oo(e,i.done),i.lastSelTime=+new Date,i.lastSelOrigin=o,i.lastSelOp=n,r&&r.clearRedo!==!1&&to(i.undone)}function oo(t,e){var n=_o(e);n&&n.ranges&&n.equals(t)||e.push(t)}function lo(t,e,n,r){var i=e["spans_"+t.id],o=0;t.iter(Math.max(t.first,n),Math.min(t.first+t.size,r),function(n){n.markedSpans&&((i||(i=e["spans_"+t.id]={}))[o]=n.markedSpans),++o})}function ao(t){if(!t)return null;for(var e,n=0;n<t.length;++n)t[n].marker.explicitlyCleared?e||(e=t.slice(0,n)):e&&e.push(t[n]);return e?e.length?e:null:t}function so(t,e){var n=e["spans_"+t.id];if(!n)return null;for(var r=0,i=[];r<e.text.length;++r)i.push(ao(n[r]));return i}function uo(t,e,n){for(var r=0,i=[];r<t.length;++r){var o=t[r];if(o.ranges)i.push(n?ue.prototype.deepCopy.call(o):o);else{var l=o.changes,a=[];i.push({changes:a});for(var s=0;s<l.length;++s){var u,c=l[s];if(a.push({from:c.from,to:c.to,text:c.text}),e)for(var f in c)(u=f.match(/^spans_(\d+)$/))&&To(e,Number(u[1]))>-1&&(_o(a)[f]=c[f],delete c[f])}}}return i}function co(t,e,n,r){n<t.line?t.line+=r:e<t.line&&(t.line=e,t.ch=0)}function fo(t,e,n,r){for(var i=0;i<t.length;++i){var o=t[i],l=!0;if(o.ranges){o.copied||(o=t[i]=o.deepCopy(),o.copied=!0);for(var a=0;a<o.ranges.length;a++)co(o.ranges[a].anchor,e,n,r),co(o.ranges[a].head,e,n,r)}else{for(var a=0;a<o.changes.length;++a){var s=o.changes[a];if(n<s.from.line)s.from=Ml(s.from.line+r,s.from.ch),s.to=Ml(s.to.line+r,s.to.ch);else if(e<=s.to.line){l=!1;break}}l||(t.splice(0,i+1),i=0)}}}function ho(t,e){var n=e.from.line,r=e.to.line,i=e.text.length-(r-n)-1;fo(t.done,n,r,i),fo(t.undone,n,r,i)}function po(t){return null!=t.defaultPrevented?t.defaultPrevented:0==t.returnValue}function go(t){return t.target||t.srcElement}function vo(t){var e=t.which;return null==e&&(1&t.button?e=1:2&t.button?e=3:4&t.button&&(e=2)),xl&&t.ctrlKey&&1==e&&(e=3),e}function mo(t,e){function n(t){return function(){t.apply(null,o)}}var r=t._handlers&&t._handlers[e];if(r){var i,o=Array.prototype.slice.call(arguments,2);El?i=El.delayedCallbacks:Sa?i=Sa:(i=Sa=[],setTimeout(yo,0));for(var l=0;l<r.length;++l)i.push(n(r[l]))}}function yo(){var t=Sa;Sa=null;for(var e=0;e<t.length;++e)t[e]()}function bo(t,e,n){return"string"==typeof e&&(e={type:e,preventDefault:function(){this.defaultPrevented=!0}}),Ca(t,n||e.type,t,e),po(e)||e.codemirrorIgnore}function wo(t){var e=t._handlers&&t._handlers.cursorActivity;if(e)for(var n=t.curOp.cursorActivityHandlers||(t.curOp.cursorActivityHandlers=[]),r=0;r<e.length;++r)-1==To(n,e[r])&&n.push(e[r])}function xo(t,e){var n=t._handlers&&t._handlers[e];return n&&n.length>0}function Co(t){t.prototype.on=function(t,e){wa(this,t,e)},t.prototype.off=function(t,e){xa(this,t,e)}}function So(){this.id=null}function ko(t,e,n){for(var r=0,i=0;;){var o=t.indexOf("	",r);-1==o&&(o=t.length);var l=o-r;if(o==t.length||i+l>=e)return r+Math.min(l,e-i);if(i+=o-r,i+=n-i%n,r=o+1,i>=e)return r}}function Lo(t){for(;Na.length<=t;)Na.push(_o(Na)+" ");return Na[t]}function _o(t){return t[t.length-1]}function To(t,e){for(var n=0;n<t.length;++n)if(t[n]==e)return n;return-1}function Mo(t,e){for(var n=[],r=0;r<t.length;r++)n[r]=e(t[r],r);return n}function Ao(){}function No(t,e){var n;return Object.create?n=Object.create(t):(Ao.prototype=t,n=new Ao),e&&Oo(e,n),n}function Oo(t,e,n){e||(e={});for(var r in t)!t.hasOwnProperty(r)||n===!1&&e.hasOwnProperty(r)||(e[r]=t[r]);return e}function Wo(t){var e=Array.prototype.slice.call(arguments,1);return function(){return t.apply(null,e)}}function Do(t,e){return e?e.source.indexOf("\\w")>-1&&Ha(t)?!0:e.test(t):Ha(t)}function Ho(t){for(var e in t)if(t.hasOwnProperty(e)&&t[e])return!1;return!0}function Eo(t){return t.charCodeAt(0)>=768&&Ea.test(t)}function Fo(t,e,n,r){var i=document.createElement(t);if(n&&(i.className=n),r&&(i.style.cssText=r),"string"==typeof e)i.appendChild(document.createTextNode(e));else if(e)for(var o=0;o<e.length;++o)i.appendChild(e[o]);return i}function Io(t){for(var e=t.childNodes.length;e>0;--e)t.removeChild(t.firstChild);return t}function Ro(t,e){return Io(t).appendChild(e)}function zo(){return document.activeElement}function Po(t){return new RegExp("(^|\\s)"+t+"(?:$|\\s)\\s*")}function Bo(t,e){for(var n=t.split(" "),r=0;r<n.length;r++)n[r]&&!Po(n[r]).test(e)&&(e+=" "+n[r]);return e}function jo(t){if(document.body.getElementsByClassName)for(var e=document.body.getElementsByClassName("CodeMirror"),n=0;n<e.length;n++){var r=e[n].CodeMirror;r&&t(r)}}function Uo(){Ba||(Go(),Ba=!0)}function Go(){var t;wa(window,"resize",function(){null==t&&(t=setTimeout(function(){t=null,jo(Bn)},100))}),wa(window,"blur",function(){jo(fr)})}function qo(t){if(null==Ia){var e=Fo("span","​");Ro(t,Fo("span",[e,document.createTextNode("x")])),0!=t.firstChild.offsetHeight&&(Ia=e.offsetWidth<=1&&e.offsetHeight>2&&!(cl&&8>fl))}var n=Ia?Fo("span","​"):Fo("span"," ",null,"display: inline-block; width: 1px; margin-right: -1px");return n.setAttribute("cm-text",""),n}function Ko(t){if(null!=Ra)return Ra;var e=Ro(t,document.createTextNode("AخA")),n=Wa(e,0,1).getBoundingClientRect();if(!n||n.left==n.right)return!1;var r=Wa(e,1,2).getBoundingClientRect();return Ra=r.right-n.right<3}function Vo(t){if(null!=Ka)return Ka;var e=Ro(t,Fo("span","x")),n=e.getBoundingClientRect(),r=Wa(e,0,1).getBoundingClientRect();return Ka=Math.abs(n.left-r.left)>1}function $o(t,e,n,r){if(!t)return r(e,n,"ltr");for(var i=!1,o=0;o<t.length;++o){var l=t[o];(l.from<n&&l.to>e||e==n&&l.to==e)&&(r(Math.max(l.from,e),Math.min(l.to,n),1==l.level?"rtl":"ltr"),i=!0)}i||r(e,n,"ltr")}function Xo(t){return t.level%2?t.to:t.from}function Yo(t){return t.level%2?t.from:t.to}function Zo(t){var e=Zi(t);return e?Xo(e[0]):0}function Jo(t){var e=Zi(t);return e?Yo(_o(e)):t.text.length}function Qo(t,e){var n=Gi(t.doc,e),r=fi(n);r!=n&&(e=$i(r));var i=Zi(r),o=i?i[0].level%2?Jo(r):Zo(r):0;return Ml(e,o)}function tl(t,e){for(var n,r=Gi(t.doc,e);n=ui(r);)r=n.find(1,!0).line,e=null;var i=Zi(r),o=i?i[0].level%2?Zo(r):Jo(r):r.text.length;return Ml(null==e?$i(r):e,o)}function el(t,e){var n=Qo(t,e.line),r=Gi(t.doc,n.line),i=Zi(r);if(!i||0==i[0].level){var o=Math.max(0,r.text.search(/\S/)),l=e.line==n.line&&e.ch<=o&&e.ch;return Ml(n.line,l?0:o)}return n}function nl(t,e,n){var r=t[0].level;return e==r?!0:n==r?!1:n>e}function rl(t,e){$a=null;for(var n,r=0;r<t.length;++r){var i=t[r];if(i.from<e&&i.to>e)return r;if(i.from==e||i.to==e){if(null!=n)return nl(t,i.level,t[n].level)?(i.from!=i.to&&($a=n),r):(i.from!=i.to&&($a=r),n);n=r}}return n}function il(t,e,n,r){if(!r)return e+n;do e+=n;while(e>0&&Eo(t.text.charAt(e)));return e}function ol(t,e,n,r){var i=Zi(t);if(!i)return ll(t,e,n,r);for(var o=rl(i,e),l=i[o],a=il(t,e,l.level%2?-n:n,r);;){if(a>l.from&&a<l.to)return a;if(a==l.from||a==l.to)return rl(i,a)==o?a:(l=i[o+=n],n>0==l.level%2?l.to:l.from);if(l=i[o+=n],!l)return null;a=n>0==l.level%2?il(t,l.to,-1,r):il(t,l.from,1,r)}}function ll(t,e,n,r){var i=e+n;if(r)for(;i>0&&Eo(t.text.charAt(i));)i+=n;return 0>i||i>t.text.length?null:i}var al=/gecko\/\d/i.test(navigator.userAgent),sl=/MSIE \d/.test(navigator.userAgent),ul=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent),cl=sl||ul,fl=cl&&(sl?document.documentMode||6:ul[1]),hl=/WebKit\//.test(navigator.userAgent),dl=hl&&/Qt\/\d+\.\d+/.test(navigator.userAgent),pl=/Chrome\//.test(navigator.userAgent),gl=/Opera\//.test(navigator.userAgent),vl=/Apple Computer/.test(navigator.vendor),ml=/Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent),yl=/PhantomJS/.test(navigator.userAgent),bl=/AppleWebKit/.test(navigator.userAgent)&&/Mobile\/\w+/.test(navigator.userAgent),wl=bl||/Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(navigator.userAgent),xl=bl||/Mac/.test(navigator.platform),Cl=/win/i.test(navigator.platform),Sl=gl&&navigator.userAgent.match(/Version\/(\d*\.\d*)/);Sl&&(Sl=Number(Sl[1])),Sl&&Sl>=15&&(gl=!1,hl=!0);var kl=xl&&(dl||gl&&(null==Sl||12.11>Sl)),Ll=al||cl&&fl>=9,_l=!1,Tl=!1;g.prototype=Oo({update:function(t){var e=t.scrollWidth>t.clientWidth+1,n=t.scrollHeight>t.clientHeight+1,r=t.nativeBarWidth;if(n){this.vert.style.display="block",this.vert.style.bottom=e?r+"px":"0";var i=t.viewHeight-(e?r:0);this.vert.firstChild.style.height=Math.max(0,t.scrollHeight-t.clientHeight+i)+"px"}else this.vert.style.display="",this.vert.firstChild.style.height="0";if(e){this.horiz.style.display="block",this.horiz.style.right=n?r+"px":"0",this.horiz.style.left=t.barLeft+"px";var o=t.viewWidth-t.barLeft-(n?r:0);this.horiz.firstChild.style.width=t.scrollWidth-t.clientWidth+o+"px"}else this.horiz.style.display="",this.horiz.firstChild.style.width="0";return!this.checkedOverlay&&t.clientHeight>0&&(0==r&&this.overlayHack(),this.checkedOverlay=!0),{right:n?r:0,bottom:e?r:0}},setScrollLeft:function(t){this.horiz.scrollLeft!=t&&(this.horiz.scrollLeft=t)},setScrollTop:function(t){this.vert.scrollTop!=t&&(this.vert.scrollTop=t)},overlayHack:function(){var t=xl&&!ml?"12px":"18px";this.horiz.style.minHeight=this.vert.style.minWidth=t;var e=this,n=function(t){go(t)!=e.vert&&go(t)!=e.horiz&&Mn(e.cm,Gn)(t)};wa(this.vert,"mousedown",n),wa(this.horiz,"mousedown",n)},clear:function(){var t=this.horiz.parentNode;t.removeChild(this.horiz),t.removeChild(this.vert)}},g.prototype),v.prototype=Oo({update:function(){return{bottom:0,right:0}},setScrollLeft:function(){},setScrollTop:function(){},clear:function(){}},v.prototype),t.scrollbarModel={"native":g,"null":v},L.prototype.signal=function(t,e){xo(t,e)&&this.events.push(arguments)},L.prototype.finish=function(){for(var t=0;t<this.events.length;t++)Ca.apply(null,this.events[t])};var Ml=t.Pos=function(t,e){return this instanceof Ml?(this.line=t,void(this.ch=e)):new Ml(t,e)},Al=t.cmpPos=function(t,e){return t.line-e.line||t.ch-e.ch},Nl=null;ee.prototype=Oo({init:function(t){function e(t){if(r.somethingSelected())Nl=r.getSelections(),n.inaccurateSelection&&(n.prevInput="",n.inaccurateSelection=!1,o.value=Nl.join("\n"),Oa(o));else{var e=Q(r);Nl=e.text,"cut"==t.type?r.setSelections(e.ranges,null,_a):(n.prevInput="",o.value=e.text.join("\n"),Oa(o))}"cut"==t.type&&(r.state.cutIncoming=!0)}var n=this,r=this.cm,i=this.wrapper=ne(),o=this.textarea=i.firstChild;t.wrapper.insertBefore(i,t.wrapper.firstChild),bl&&(o.style.width="0px"),wa(o,"input",function(){cl&&fl>=9&&n.hasSelection&&(n.hasSelection=null),n.poll()}),wa(o,"paste",function(){if(hl&&!r.state.fakedLastChar&&!(new Date-r.state.lastMiddleDown<200)){var t=o.selectionStart,e=o.selectionEnd;o.value+="$",o.selectionEnd=e,o.selectionStart=t,r.state.fakedLastChar=!0}r.state.pasteIncoming=!0,n.fastPoll()}),wa(o,"cut",e),wa(o,"copy",e),wa(t.scroller,"paste",function(e){jn(t,e)||(r.state.pasteIncoming=!0,n.focus())}),wa(t.lineSpace,"selectstart",function(e){jn(t,e)||ma(e)})},prepareSelection:function(){var t=this.cm,e=t.display,n=t.doc,r=We(t);if(t.options.moveInputWithCursor){var i=fn(t,n.sel.primary().head,"div"),o=e.wrapper.getBoundingClientRect(),l=e.lineDiv.getBoundingClientRect();r.teTop=Math.max(0,Math.min(e.wrapper.clientHeight-10,i.top+l.top-o.top)),r.teLeft=Math.max(0,Math.min(e.wrapper.clientWidth-10,i.left+l.left-o.left))}return r},showSelection:function(t){var e=this.cm,n=e.display;Ro(n.cursorDiv,t.cursors),Ro(n.selectionDiv,t.selection),null!=t.teTop&&(this.wrapper.style.top=t.teTop+"px",this.wrapper.style.left=t.teLeft+"px")},reset:function(t){if(!this.contextMenuPending){var e,n,r=this.cm,i=r.doc;if(r.somethingSelected()){this.prevInput="";var o=i.sel.primary();e=qa&&(o.to().line-o.from().line>100||(n=r.getSelection()).length>1e3);var l=e?"-":n||r.getSelection();this.textarea.value=l,r.state.focused&&Oa(this.textarea),cl&&fl>=9&&(this.hasSelection=l)}else t||(this.prevInput=this.textarea.value="",cl&&fl>=9&&(this.hasSelection=null));this.inaccurateSelection=e}},getField:function(){return this.textarea},supportsTouch:function(){return!1},focus:function(){if("nocursor"!=this.cm.options.readOnly&&(!wl||zo()!=this.textarea))try{this.textarea.focus()}catch(t){}},blur:function(){this.textarea.blur()},resetPosition:function(){this.wrapper.style.top=this.wrapper.style.left=0},receivedFocus:function(){this.slowPoll()},slowPoll:function(){var t=this;t.pollingFast||t.polling.set(this.cm.options.pollInterval,function(){t.poll(),t.cm.state.focused&&t.slowPoll()})},fastPoll:function(){function t(){var r=n.poll();r||e?(n.pollingFast=!1,n.slowPoll()):(e=!0,n.polling.set(60,t))}var e=!1,n=this;n.pollingFast=!0,n.polling.set(20,t)},poll:function(){var t=this.cm,e=this.textarea,n=this.prevInput;if(!t.state.focused||Ga(e)&&!n||Z(t)||t.options.disableInput||t.state.keySeq)return!1;t.state.pasteIncoming&&t.state.fakedLastChar&&(e.value=e.value.substring(0,e.value.length-1),t.state.fakedLastChar=!1);var r=e.value;if(r==n&&!t.somethingSelected())return!1;if(cl&&fl>=9&&this.hasSelection===r||xl&&/[\uf700-\uf7ff]/.test(r))return t.display.input.reset(),!1;8203!=r.charCodeAt(0)||t.doc.sel!=t.display.selForContextMenu||n||(n="​");for(var i=0,o=Math.min(n.length,r.length);o>i&&n.charCodeAt(i)==r.charCodeAt(i);)++i;var l=this;return Tn(t,function(){J(t,r.slice(i),n.length-i),r.length>1e3||r.indexOf("\n")>-1?e.value=l.prevInput="":l.prevInput=r
}),!0},ensurePolled:function(){this.pollingFast&&this.poll()&&(this.pollingFast=!1)},onKeyPress:function(){cl&&fl>=9&&(this.hasSelection=null),this.fastPoll()},onContextMenu:function(t){function e(){if(null!=l.selectionStart){var t=i.somethingSelected(),e=l.value="​"+(t?l.value:"");r.prevInput=t?"":"​",l.selectionStart=1,l.selectionEnd=e.length,o.selForContextMenu=i.doc.sel}}function n(){if(r.contextMenuPending=!1,r.wrapper.style.position="relative",l.style.cssText=c,cl&&9>fl&&o.scrollbars.setScrollTop(o.scroller.scrollTop=s),null!=l.selectionStart){(!cl||cl&&9>fl)&&e();var t=0,n=function(){o.selForContextMenu==i.doc.sel&&0==l.selectionStart?Mn(i,ta.selectAll)(i):t++<10?o.detectingSelectAll=setTimeout(n,500):o.input.reset()};o.detectingSelectAll=setTimeout(n,200)}}var r=this,i=r.cm,o=i.display,l=r.textarea,a=Un(i,t),s=o.scroller.scrollTop;if(a&&!gl){var u=i.options.resetSelectionOnContextMenu;u&&-1==i.doc.sel.contains(a)&&Mn(i,Le)(i.doc,he(a),_a);var c=l.style.cssText;if(r.wrapper.style.position="absolute",l.style.cssText="position: fixed; width: 30px; height: 30px; top: "+(t.clientY-5)+"px; left: "+(t.clientX-5)+"px; z-index: 1000; background: "+(cl?"rgba(255, 255, 255, .05)":"transparent")+"; outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);",hl)var f=window.scrollY;if(o.input.focus(),hl&&window.scrollTo(null,f),o.input.reset(),i.somethingSelected()||(l.value=r.prevInput=" "),r.contextMenuPending=!0,o.selForContextMenu=i.doc.sel,clearTimeout(o.detectingSelectAll),cl&&fl>=9&&e(),Ll){ba(t);var h=function(){xa(window,"mouseup",h),setTimeout(n,20)};wa(window,"mouseup",h)}else setTimeout(n,50)}},setUneditable:Ao,needsContentAttribute:!1},ee.prototype),re.prototype=Oo({init:function(t){function e(t){if(r.somethingSelected())Nl=r.getSelections(),"cut"==t.type&&r.replaceSelection("",null,"cut");else{var e=Q(r);Nl=e.text,"cut"==t.type&&r.operation(function(){r.setSelections(e.ranges,0,_a),r.replaceSelection("",null,"cut")})}if(t.clipboardData&&!bl)t.preventDefault(),t.clipboardData.clearData(),t.clipboardData.setData("text/plain",Nl.join("\n"));else{var n=ne(),i=n.firstChild;r.display.lineSpace.insertBefore(n,r.display.lineSpace.firstChild),i.value=Nl.join("\n");var o=document.activeElement;Oa(i),setTimeout(function(){r.display.lineSpace.removeChild(n),o.focus()},50)}}var n=this,r=n.cm,i=n.div=t.lineDiv;i.contentEditable="true",te(i),wa(i,"paste",function(t){var e=t.clipboardData&&t.clipboardData.getData("text/plain");e&&(t.preventDefault(),r.replaceSelection(e,null,"paste"))}),wa(i,"compositionstart",function(t){var e=t.data;if(n.composing={sel:r.doc.sel,data:e,startData:e},e){var i=r.doc.sel.primary(),o=r.getLine(i.head.line),l=o.indexOf(e,Math.max(0,i.head.ch-e.length));l>-1&&l<=i.head.ch&&(n.composing.sel=he(Ml(i.head.line,l),Ml(i.head.line,l+e.length)))}}),wa(i,"compositionupdate",function(t){n.composing.data=t.data}),wa(i,"compositionend",function(t){var e=n.composing;e&&(t.data==e.startData||/\u200b/.test(t.data)||(e.data=t.data),setTimeout(function(){e.handled||n.applyComposition(e),n.composing==e&&(n.composing=null)},50))}),wa(i,"touchstart",function(){n.forceCompositionEnd()}),wa(i,"input",function(){n.composing||n.pollContent()||Tn(n.cm,function(){Dn(r)})}),wa(i,"copy",e),wa(i,"cut",e)},prepareSelection:function(){var t=We(this.cm,!1);return t.focus=this.cm.state.focused,t},showSelection:function(t){t&&this.cm.display.view.length&&(t.focus&&this.showPrimarySelection(),this.showMultipleSelections(t))},showPrimarySelection:function(){var t=window.getSelection(),e=this.cm.doc.sel.primary(),n=le(this.cm,t.anchorNode,t.anchorOffset),r=le(this.cm,t.focusNode,t.focusOffset);if(!n||n.bad||!r||r.bad||0!=Al(X(n,r),e.from())||0!=Al($(n,r),e.to())){var i=ie(this.cm,e.from()),o=ie(this.cm,e.to());if(i||o){var l=this.cm.display.view,a=t.rangeCount&&t.getRangeAt(0);if(i){if(!o){var s=l[l.length-1].measure,u=s.maps?s.maps[s.maps.length-1]:s.map;o={node:u[u.length-1],offset:u[u.length-2]-u[u.length-3]}}}else i={node:l[0].measure.map[2],offset:0};try{var c=Wa(i.node,i.offset,o.offset,o.node)}catch(f){}c&&(t.removeAllRanges(),t.addRange(c),a&&null==t.anchorNode&&t.addRange(a)),this.rememberSelection()}}},showMultipleSelections:function(t){Ro(this.cm.display.cursorDiv,t.cursors),Ro(this.cm.display.selectionDiv,t.selection)},rememberSelection:function(){var t=window.getSelection();this.lastAnchorNode=t.anchorNode,this.lastAnchorOffset=t.anchorOffset,this.lastFocusNode=t.focusNode,this.lastFocusOffset=t.focusOffset},selectionInEditor:function(){var t=window.getSelection();if(!t.rangeCount)return!1;var e=t.getRangeAt(0).commonAncestorContainer;return Fa(this.div,e)},focus:function(){"nocursor"!=this.cm.options.readOnly&&this.div.focus()},blur:function(){this.div.blur()},getField:function(){return this.div},supportsTouch:function(){return!0},receivedFocus:function(){function t(){e.cm.state.focused&&(e.pollSelection(),e.polling.set(e.cm.options.pollInterval,t))}var e=this;this.selectionInEditor()?this.pollSelection():Tn(this.cm,function(){e.cm.curOp.selectionChanged=!0}),this.polling.set(this.cm.options.pollInterval,t)},pollSelection:function(){if(!this.composing){var t=window.getSelection(),e=this.cm;if(t.anchorNode!=this.lastAnchorNode||t.anchorOffset!=this.lastAnchorOffset||t.focusNode!=this.lastFocusNode||t.focusOffset!=this.lastFocusOffset){this.rememberSelection();var n=le(e,t.anchorNode,t.anchorOffset),r=le(e,t.focusNode,t.focusOffset);n&&r&&Tn(e,function(){Le(e.doc,he(n,r),_a),(n.bad||r.bad)&&(e.curOp.selectionChanged=!0)})}}},pollContent:function(){var t=this.cm,e=t.display,n=t.doc.sel.primary(),r=n.from(),i=n.to();if(r.line<e.viewFrom||i.line>e.viewTo-1)return!1;var o;if(r.line==e.viewFrom||0==(o=Fn(t,r.line)))var l=$i(e.view[0].line),a=e.view[0].node;else var l=$i(e.view[o].line),a=e.view[o-1].node.nextSibling;var s=Fn(t,i.line);if(s==e.view.length-1)var u=e.viewTo-1,c=e.view[s].node;else var u=$i(e.view[s+1].line)-1,c=e.view[s+1].node.previousSibling;for(var f=Ua(se(t,a,c,l,u)),h=qi(t.doc,Ml(l,0),Ml(u,Gi(t.doc,u).text.length));f.length>1&&h.length>1;)if(_o(f)==_o(h))f.pop(),h.pop(),u--;else{if(f[0]!=h[0])break;f.shift(),h.shift(),l++}for(var d=0,p=0,g=f[0],v=h[0],m=Math.min(g.length,v.length);m>d&&g.charCodeAt(d)==v.charCodeAt(d);)++d;for(var y=_o(f),b=_o(h),w=Math.min(y.length-(1==f.length?d:0),b.length-(1==h.length?d:0));w>p&&y.charCodeAt(y.length-p-1)==b.charCodeAt(b.length-p-1);)++p;f[f.length-1]=y.slice(0,y.length-p),f[0]=f[0].slice(d);var x=Ml(l,d),C=Ml(u,h.length?_o(h).length-p:0);return f.length>1||f[0]||Al(x,C)?(Lr(t.doc,f,x,C,"+input"),!0):void 0},ensurePolled:function(){this.forceCompositionEnd()},reset:function(){this.forceCompositionEnd()},forceCompositionEnd:function(){this.composing&&!this.composing.handled&&(this.applyComposition(this.composing),this.composing.handled=!0,this.div.blur(),this.div.focus())},applyComposition:function(t){t.data&&t.data!=t.startData&&Mn(this.cm,J)(this.cm,t.data,0,t.sel)},setUneditable:function(t){t.setAttribute("contenteditable","false")},onKeyPress:function(t){t.preventDefault(),Mn(this.cm,J)(this.cm,String.fromCharCode(null==t.charCode?t.keyCode:t.charCode),0)},onContextMenu:Ao,resetPosition:Ao,needsContentAttribute:!0},re.prototype),t.inputStyles={textarea:ee,contenteditable:re},ue.prototype={primary:function(){return this.ranges[this.primIndex]},equals:function(t){if(t==this)return!0;if(t.primIndex!=this.primIndex||t.ranges.length!=this.ranges.length)return!1;for(var e=0;e<this.ranges.length;e++){var n=this.ranges[e],r=t.ranges[e];if(0!=Al(n.anchor,r.anchor)||0!=Al(n.head,r.head))return!1}return!0},deepCopy:function(){for(var t=[],e=0;e<this.ranges.length;e++)t[e]=new ce(V(this.ranges[e].anchor),V(this.ranges[e].head));return new ue(t,this.primIndex)},somethingSelected:function(){for(var t=0;t<this.ranges.length;t++)if(!this.ranges[t].empty())return!0;return!1},contains:function(t,e){e||(e=t);for(var n=0;n<this.ranges.length;n++){var r=this.ranges[n];if(Al(e,r.from())>=0&&Al(t,r.to())<=0)return n}return-1}},ce.prototype={from:function(){return X(this.anchor,this.head)},to:function(){return $(this.anchor,this.head)},empty:function(){return this.head.line==this.anchor.line&&this.head.ch==this.anchor.ch}};var Ol,Wl,Dl,Hl={left:0,right:0,top:0,bottom:0},El=null,Fl=0,Il=0,Rl=0,zl=null;cl?zl=-.53:al?zl=15:pl?zl=-.7:vl&&(zl=-1/3);var Pl=function(t){var e=t.wheelDeltaX,n=t.wheelDeltaY;return null==e&&t.detail&&t.axis==t.HORIZONTAL_AXIS&&(e=t.detail),null==n&&t.detail&&t.axis==t.VERTICAL_AXIS?n=t.detail:null==n&&(n=t.wheelDelta),{x:e,y:n}};t.wheelEventPixels=function(t){var e=Pl(t);return e.x*=zl,e.y*=zl,e};var Bl=new So,jl=null,Ul=t.changeEnd=function(t){return t.text?Ml(t.from.line+t.text.length-1,_o(t.text).length+(1==t.text.length?t.from.ch:0)):t.to};t.prototype={constructor:t,focus:function(){window.focus(),this.display.input.focus()},setOption:function(t,e){var n=this.options,r=n[t];(n[t]!=e||"mode"==t)&&(n[t]=e,ql.hasOwnProperty(t)&&Mn(this,ql[t])(this,e,r))},getOption:function(t){return this.options[t]},getDoc:function(){return this.doc},addKeyMap:function(t,e){this.state.keyMaps[e?"push":"unshift"](Pr(t))},removeKeyMap:function(t){for(var e=this.state.keyMaps,n=0;n<e.length;++n)if(e[n]==t||e[n].name==t)return e.splice(n,1),!0},addOverlay:An(function(e,n){var r=e.token?e:t.getMode(this.options,e);if(r.startState)throw new Error("Overlays may not be stateful.");this.state.overlays.push({mode:r,modeSpec:e,opaque:n&&n.opaque}),this.state.modeGen++,Dn(this)}),removeOverlay:An(function(t){for(var e=this.state.overlays,n=0;n<e.length;++n){var r=e[n].modeSpec;if(r==t||"string"==typeof t&&r.name==t)return e.splice(n,1),this.state.modeGen++,void Dn(this)}}),indentLine:An(function(t,e,n){"string"!=typeof e&&"number"!=typeof e&&(e=null==e?this.options.smartIndent?"smart":"prev":e?"add":"subtract"),ve(this.doc,t)&&Dr(this,t,e,n)}),indentSelection:An(function(t){for(var e=this.doc.sel.ranges,n=-1,r=0;r<e.length;r++){var i=e[r];if(i.empty())i.head.line>n&&(Dr(this,i.head.line,t,!0),n=i.head.line,r==this.doc.sel.primIndex&&Or(this));else{var o=i.from(),l=i.to(),a=Math.max(n,o.line);n=Math.min(this.lastLine(),l.line-(l.ch?0:1))+1;for(var s=a;n>s;++s)Dr(this,s,t);var u=this.doc.sel.ranges;0==o.ch&&e.length==u.length&&u[r].from().ch>0&&xe(this.doc,r,new ce(o,u[r].to()),_a)}}}),getTokenAt:function(t,e){return Li(this,t,e)},getLineTokens:function(t,e){return Li(this,Ml(t),e,!0)},getTokenTypeAt:function(t){t=pe(this.doc,t);var e,n=Mi(this,Gi(this.doc,t.line)),r=0,i=(n.length-1)/2,o=t.ch;if(0==o)e=n[2];else for(;;){var l=r+i>>1;if((l?n[2*l-1]:0)>=o)i=l;else{if(!(n[2*l+1]<o)){e=n[2*l+2];break}r=l+1}}var a=e?e.indexOf("cm-overlay "):-1;return 0>a?e:0==a?null:e.slice(0,a-1)},getModeAt:function(e){var n=this.doc.mode;return n.innerMode?t.innerMode(n,this.getTokenAt(e).state).mode:n},getHelper:function(t,e){return this.getHelpers(t,e)[0]},getHelpers:function(t,e){var n=[];if(!Zl.hasOwnProperty(e))return Zl;var r=Zl[e],i=this.getModeAt(t);if("string"==typeof i[e])r[i[e]]&&n.push(r[i[e]]);else if(i[e])for(var o=0;o<i[e].length;o++){var l=r[i[e][o]];l&&n.push(l)}else i.helperType&&r[i.helperType]?n.push(r[i.helperType]):r[i.name]&&n.push(r[i.name]);for(var o=0;o<r._global.length;o++){var a=r._global[o];a.pred(i,this)&&-1==To(n,a.val)&&n.push(a.val)}return n},getStateAfter:function(t,e){var n=this.doc;return t=de(n,null==t?n.first+n.size-1:t),ze(this,t+1,e)},cursorCoords:function(t,e){var n,r=this.doc.sel.primary();return n=null==t?r.head:"object"==typeof t?pe(this.doc,t):t?r.from():r.to(),fn(this,n,e||"page")},charCoords:function(t,e){return cn(this,pe(this.doc,t),e||"page")},coordsChar:function(t,e){return t=un(this,t,e||"page"),pn(this,t.left,t.top)},lineAtHeight:function(t,e){return t=un(this,{top:t,left:0},e||"page").top,Xi(this.doc,t+this.display.viewOffset)},heightAtLine:function(t,e){var n=!1,r=this.doc.first+this.doc.size-1;t<this.doc.first?t=this.doc.first:t>r&&(t=r,n=!0);var i=Gi(this.doc,t);return sn(this,i,{top:0,left:0},e||"page").top+(n?this.doc.height-Yi(i):0)},defaultTextHeight:function(){return vn(this.display)},defaultCharWidth:function(){return mn(this.display)},setGutterMarker:An(function(t,e,n){return Hr(this.doc,t,"gutter",function(t){var r=t.gutterMarkers||(t.gutterMarkers={});return r[e]=n,!n&&Ho(r)&&(t.gutterMarkers=null),!0})}),clearGutter:An(function(t){var e=this,n=e.doc,r=n.first;n.iter(function(n){n.gutterMarkers&&n.gutterMarkers[t]&&(n.gutterMarkers[t]=null,Hn(e,r,"gutter"),Ho(n.gutterMarkers)&&(n.gutterMarkers=null)),++r})}),addLineWidget:An(function(t,e,n){return bi(this,t,e,n)}),removeLineWidget:function(t){t.clear()},lineInfo:function(t){if("number"==typeof t){if(!ve(this.doc,t))return null;var e=t;if(t=Gi(this.doc,t),!t)return null}else{var e=$i(t);if(null==e)return null}return{line:e,handle:t,text:t.text,gutterMarkers:t.gutterMarkers,textClass:t.textClass,bgClass:t.bgClass,wrapClass:t.wrapClass,widgets:t.widgets}},getViewport:function(){return{from:this.display.viewFrom,to:this.display.viewTo}},addWidget:function(t,e,n,r,i){var o=this.display;t=fn(this,pe(this.doc,t));var l=t.bottom,a=t.left;if(e.style.position="absolute",e.setAttribute("cm-ignore-events","true"),this.display.input.setUneditable(e),o.sizer.appendChild(e),"over"==r)l=t.top;else if("above"==r||"near"==r){var s=Math.max(o.wrapper.clientHeight,this.doc.height),u=Math.max(o.sizer.clientWidth,o.lineSpace.clientWidth);("above"==r||t.bottom+e.offsetHeight>s)&&t.top>e.offsetHeight?l=t.top-e.offsetHeight:t.bottom+e.offsetHeight<=s&&(l=t.bottom),a+e.offsetWidth>u&&(a=u-e.offsetWidth)}e.style.top=l+"px",e.style.left=e.style.right="","right"==i?(a=o.sizer.clientWidth-e.offsetWidth,e.style.right="0px"):("left"==i?a=0:"middle"==i&&(a=(o.sizer.clientWidth-e.offsetWidth)/2),e.style.left=a+"px"),n&&Mr(this,a,l,a+e.offsetWidth,l+e.offsetHeight)},triggerOnKeyDown:An(lr),triggerOnKeyPress:An(ur),triggerOnKeyUp:sr,execCommand:function(t){return ta.hasOwnProperty(t)?ta[t](this):void 0},findPosH:function(t,e,n,r){var i=1;0>e&&(i=-1,e=-e);for(var o=0,l=pe(this.doc,t);e>o&&(l=Fr(this.doc,l,i,n,r),!l.hitSide);++o);return l},moveH:An(function(t,e){var n=this;n.extendSelectionsBy(function(r){return n.display.shift||n.doc.extend||r.empty()?Fr(n.doc,r.head,t,e,n.options.rtlMoveVisually):0>t?r.from():r.to()},Ma)}),deleteH:An(function(t,e){var n=this.doc.sel,r=this.doc;n.somethingSelected()?r.replaceSelection("",null,"+delete"):Er(this,function(n){var i=Fr(r,n.head,t,e,!1);return 0>t?{from:i,to:n.head}:{from:n.head,to:i}})}),findPosV:function(t,e,n,r){var i=1,o=r;0>e&&(i=-1,e=-e);for(var l=0,a=pe(this.doc,t);e>l;++l){var s=fn(this,a,"div");if(null==o?o=s.left:s.left=o,a=Ir(this,s,i,n),a.hitSide)break}return a},moveV:An(function(t,e){var n=this,r=this.doc,i=[],o=!n.display.shift&&!r.extend&&r.sel.somethingSelected();if(r.extendSelectionsBy(function(l){if(o)return 0>t?l.from():l.to();var a=fn(n,l.head,"div");null!=l.goalColumn&&(a.left=l.goalColumn),i.push(a.left);var s=Ir(n,a,t,e);return"page"==e&&l==r.sel.primary()&&Nr(n,null,cn(n,s,"div").top-a.top),s},Ma),i.length)for(var l=0;l<r.sel.ranges.length;l++)r.sel.ranges[l].goalColumn=i[l]}),findWordAt:function(t){var e=this.doc,n=Gi(e,t.line).text,r=t.ch,i=t.ch;if(n){var o=this.getHelper(t,"wordChars");(t.xRel<0||i==n.length)&&r?--r:++i;for(var l=n.charAt(r),a=Do(l,o)?function(t){return Do(t,o)}:/\s/.test(l)?function(t){return/\s/.test(t)}:function(t){return!/\s/.test(t)&&!Do(t)};r>0&&a(n.charAt(r-1));)--r;for(;i<n.length&&a(n.charAt(i));)++i}return new ce(Ml(t.line,r),Ml(t.line,i))},toggleOverwrite:function(t){(null==t||t!=this.state.overwrite)&&((this.state.overwrite=!this.state.overwrite)?Pa(this.display.cursorDiv,"CodeMirror-overwrite"):za(this.display.cursorDiv,"CodeMirror-overwrite"),Ca(this,"overwriteToggle",this,this.state.overwrite))},hasFocus:function(){return this.display.input.getField()==zo()},scrollTo:An(function(t,e){(null!=t||null!=e)&&Wr(this),null!=t&&(this.curOp.scrollLeft=t),null!=e&&(this.curOp.scrollTop=e)}),getScrollInfo:function(){var t=this.display.scroller;return{left:t.scrollLeft,top:t.scrollTop,height:t.scrollHeight-Ue(this)-this.display.barHeight,width:t.scrollWidth-Ue(this)-this.display.barWidth,clientHeight:qe(this),clientWidth:Ge(this)}},scrollIntoView:An(function(t,e){if(null==t?(t={from:this.doc.sel.primary().head,to:null},null==e&&(e=this.options.cursorScrollMargin)):"number"==typeof t?t={from:Ml(t,0),to:null}:null==t.from&&(t={from:t,to:null}),t.to||(t.to=t.from),t.margin=e||0,null!=t.from.line)Wr(this),this.curOp.scrollToPos=t;else{var n=Ar(this,Math.min(t.from.left,t.to.left),Math.min(t.from.top,t.to.top)-t.margin,Math.max(t.from.right,t.to.right),Math.max(t.from.bottom,t.to.bottom)+t.margin);this.scrollTo(n.scrollLeft,n.scrollTop)}}),setSize:An(function(t,e){function n(t){return"number"==typeof t||/^\d+$/.test(String(t))?t+"px":t}var r=this;null!=t&&(r.display.wrapper.style.width=n(t)),null!=e&&(r.display.wrapper.style.height=n(e)),r.options.lineWrapping&&rn(this);var i=r.display.viewFrom;r.doc.iter(i,r.display.viewTo,function(t){if(t.widgets)for(var e=0;e<t.widgets.length;e++)if(t.widgets[e].noHScroll){Hn(r,i,"widget");break}++i}),r.curOp.forceUpdate=!0,Ca(r,"refresh",this)}),operation:function(t){return Tn(this,t)},refresh:An(function(){var t=this.display.cachedTextHeight;Dn(this),this.curOp.forceUpdate=!0,on(this),this.scrollTo(this.doc.scrollLeft,this.doc.scrollTop),c(this),(null==t||Math.abs(t-vn(this.display))>.5)&&l(this),Ca(this,"refresh",this)}),swapDoc:An(function(t){var e=this.doc;return e.cm=null,Ui(this,t),on(this),this.display.input.reset(),this.scrollTo(t.scrollLeft,t.scrollTop),this.curOp.forceScroll=!0,mo(this,"swapDoc",this,e),e}),getInputField:function(){return this.display.input.getField()},getWrapperElement:function(){return this.display.wrapper},getScrollerElement:function(){return this.display.scroller},getGutterElement:function(){return this.display.gutters}},Co(t);var Gl=t.defaults={},ql=t.optionHandlers={},Kl=t.Init={toString:function(){return"CodeMirror.Init"}};Rr("value","",function(t,e){t.setValue(e)},!0),Rr("mode",null,function(t,e){t.doc.modeOption=e,n(t)},!0),Rr("indentUnit",2,n,!0),Rr("indentWithTabs",!1),Rr("smartIndent",!0),Rr("tabSize",4,function(t){r(t),on(t),Dn(t)},!0),Rr("specialChars",/[\t\u0000-\u0019\u00ad\u200b-\u200f\u2028\u2029\ufeff]/g,function(t,e){t.options.specialChars=new RegExp(e.source+(e.test("	")?"":"|	"),"g"),t.refresh()},!0),Rr("specialCharPlaceholder",Wi,function(t){t.refresh()},!0),Rr("electricChars",!0),Rr("inputStyle",wl?"contenteditable":"textarea",function(){throw new Error("inputStyle can not (yet) be changed in a running editor")},!0),Rr("rtlMoveVisually",!Cl),Rr("wholeLineUpdateBefore",!0),Rr("theme","default",function(t){a(t),s(t)},!0),Rr("keyMap","default",function(e,n,r){var i=Pr(n),o=r!=t.Init&&Pr(r);o&&o.detach&&o.detach(e,i),i.attach&&i.attach(e,o||null)}),Rr("extraKeys",null),Rr("lineWrapping",!1,i,!0),Rr("gutters",[],function(t){d(t.options),s(t)},!0),Rr("fixedGutter",!0,function(t,e){t.display.gutters.style.left=e?k(t.display)+"px":"0",t.refresh()},!0),Rr("coverGutterNextToScrollbar",!1,function(t){y(t)},!0),Rr("scrollbarStyle","native",function(t){m(t),y(t),t.display.scrollbars.setScrollTop(t.doc.scrollTop),t.display.scrollbars.setScrollLeft(t.doc.scrollLeft)},!0),Rr("lineNumbers",!1,function(t){d(t.options),s(t)},!0),Rr("firstLineNumber",1,s,!0),Rr("lineNumberFormatter",function(t){return t},s,!0),Rr("showCursorWhenSelecting",!1,Oe,!0),Rr("resetSelectionOnContextMenu",!0),Rr("readOnly",!1,function(t,e){"nocursor"==e?(fr(t),t.display.input.blur(),t.display.disabled=!0):(t.display.disabled=!1,e||t.display.input.reset())}),Rr("disableInput",!1,function(t,e){e||t.display.input.reset()},!0),Rr("dragDrop",!0),Rr("cursorBlinkRate",530),Rr("cursorScrollMargin",0),Rr("cursorHeight",1,Oe,!0),Rr("singleCursorHeightPerLine",!0,Oe,!0),Rr("workTime",100),Rr("workDelay",100),Rr("flattenSpans",!0,r,!0),Rr("addModeClass",!1,r,!0),Rr("pollInterval",100),Rr("undoDepth",200,function(t,e){t.doc.history.undoDepth=e}),Rr("historyEventDelay",1250),Rr("viewportMargin",10,function(t){t.refresh()},!0),Rr("maxHighlightLength",1e4,r,!0),Rr("moveInputWithCursor",!0,function(t,e){e||t.display.input.resetPosition()}),Rr("tabindex",null,function(t,e){t.display.input.getField().tabIndex=e||""}),Rr("autofocus",null);var Vl=t.modes={},$l=t.mimeModes={};t.defineMode=function(e,n){t.defaults.mode||"null"==e||(t.defaults.mode=e),arguments.length>2&&(n.dependencies=Array.prototype.slice.call(arguments,2)),Vl[e]=n},t.defineMIME=function(t,e){$l[t]=e},t.resolveMode=function(e){if("string"==typeof e&&$l.hasOwnProperty(e))e=$l[e];else if(e&&"string"==typeof e.name&&$l.hasOwnProperty(e.name)){var n=$l[e.name];"string"==typeof n&&(n={name:n}),e=No(n,e),e.name=n.name}else if("string"==typeof e&&/^[\w\-]+\/[\w\-]+\+xml$/.test(e))return t.resolveMode("application/xml");return"string"==typeof e?{name:e}:e||{name:"null"}},t.getMode=function(e,n){var n=t.resolveMode(n),r=Vl[n.name];if(!r)return t.getMode(e,"text/plain");var i=r(e,n);if(Xl.hasOwnProperty(n.name)){var o=Xl[n.name];for(var l in o)o.hasOwnProperty(l)&&(i.hasOwnProperty(l)&&(i["_"+l]=i[l]),i[l]=o[l])}if(i.name=n.name,n.helperType&&(i.helperType=n.helperType),n.modeProps)for(var l in n.modeProps)i[l]=n.modeProps[l];return i},t.defineMode("null",function(){return{token:function(t){t.skipToEnd()}}}),t.defineMIME("text/plain","null");var Xl=t.modeExtensions={};t.extendMode=function(t,e){var n=Xl.hasOwnProperty(t)?Xl[t]:Xl[t]={};Oo(e,n)},t.defineExtension=function(e,n){t.prototype[e]=n},t.defineDocExtension=function(t,e){pa.prototype[t]=e},t.defineOption=Rr;var Yl=[];t.defineInitHook=function(t){Yl.push(t)};var Zl=t.helpers={};t.registerHelper=function(e,n,r){Zl.hasOwnProperty(e)||(Zl[e]=t[e]={_global:[]}),Zl[e][n]=r},t.registerGlobalHelper=function(e,n,r,i){t.registerHelper(e,n,i),Zl[e]._global.push({pred:r,val:i})};var Jl=t.copyState=function(t,e){if(e===!0)return e;if(t.copyState)return t.copyState(e);var n={};for(var r in e){var i=e[r];i instanceof Array&&(i=i.concat([])),n[r]=i}return n},Ql=t.startState=function(t,e,n){return t.startState?t.startState(e,n):!0};t.innerMode=function(t,e){for(;t.innerMode;){var n=t.innerMode(e);if(!n||n.mode==t)break;e=n.state,t=n.mode}return n||{mode:t,state:e}};var ta=t.commands={selectAll:function(t){t.setSelection(Ml(t.firstLine(),0),Ml(t.lastLine()),_a)},singleSelection:function(t){t.setSelection(t.getCursor("anchor"),t.getCursor("head"),_a)},killLine:function(t){Er(t,function(e){if(e.empty()){var n=Gi(t.doc,e.head.line).text.length;return e.head.ch==n&&e.head.line<t.lastLine()?{from:e.head,to:Ml(e.head.line+1,0)}:{from:e.head,to:Ml(e.head.line,n)}}return{from:e.from(),to:e.to()}})},deleteLine:function(t){Er(t,function(e){return{from:Ml(e.from().line,0),to:pe(t.doc,Ml(e.to().line+1,0))}})},delLineLeft:function(t){Er(t,function(t){return{from:Ml(t.from().line,0),to:t.from()}})},delWrappedLineLeft:function(t){Er(t,function(e){var n=t.charCoords(e.head,"div").top+5,r=t.coordsChar({left:0,top:n},"div");return{from:r,to:e.from()}})},delWrappedLineRight:function(t){Er(t,function(e){var n=t.charCoords(e.head,"div").top+5,r=t.coordsChar({left:t.display.lineDiv.offsetWidth+100,top:n},"div");return{from:e.from(),to:r}})},undo:function(t){t.undo()},redo:function(t){t.redo()},undoSelection:function(t){t.undoSelection()},redoSelection:function(t){t.redoSelection()},goDocStart:function(t){t.extendSelection(Ml(t.firstLine(),0))},goDocEnd:function(t){t.extendSelection(Ml(t.lastLine()))},goLineStart:function(t){t.extendSelectionsBy(function(e){return Qo(t,e.head.line)},{origin:"+move",bias:1})},goLineStartSmart:function(t){t.extendSelectionsBy(function(e){return el(t,e.head)},{origin:"+move",bias:1})},goLineEnd:function(t){t.extendSelectionsBy(function(e){return tl(t,e.head.line)},{origin:"+move",bias:-1})},goLineRight:function(t){t.extendSelectionsBy(function(e){var n=t.charCoords(e.head,"div").top+5;return t.coordsChar({left:t.display.lineDiv.offsetWidth+100,top:n},"div")},Ma)},goLineLeft:function(t){t.extendSelectionsBy(function(e){var n=t.charCoords(e.head,"div").top+5;return t.coordsChar({left:0,top:n},"div")},Ma)},goLineLeftSmart:function(t){t.extendSelectionsBy(function(e){var n=t.charCoords(e.head,"div").top+5,r=t.coordsChar({left:0,top:n},"div");return r.ch<t.getLine(r.line).search(/\S/)?el(t,e.head):r},Ma)},goLineUp:function(t){t.moveV(-1,"line")},goLineDown:function(t){t.moveV(1,"line")},goPageUp:function(t){t.moveV(-1,"page")},goPageDown:function(t){t.moveV(1,"page")},goCharLeft:function(t){t.moveH(-1,"char")},goCharRight:function(t){t.moveH(1,"char")},goColumnLeft:function(t){t.moveH(-1,"column")},goColumnRight:function(t){t.moveH(1,"column")},goWordLeft:function(t){t.moveH(-1,"word")},goGroupRight:function(t){t.moveH(1,"group")},goGroupLeft:function(t){t.moveH(-1,"group")},goWordRight:function(t){t.moveH(1,"word")},delCharBefore:function(t){t.deleteH(-1,"char")},delCharAfter:function(t){t.deleteH(1,"char")},delWordBefore:function(t){t.deleteH(-1,"word")},delWordAfter:function(t){t.deleteH(1,"word")},delGroupBefore:function(t){t.deleteH(-1,"group")},delGroupAfter:function(t){t.deleteH(1,"group")},indentAuto:function(t){t.indentSelection("smart")},indentMore:function(t){t.indentSelection("add")},indentLess:function(t){t.indentSelection("subtract")},insertTab:function(t){t.replaceSelection("	")},insertSoftTab:function(t){for(var e=[],n=t.listSelections(),r=t.options.tabSize,i=0;i<n.length;i++){var o=n[i].from(),l=Aa(t.getLine(o.line),o.ch,r);e.push(new Array(r-l%r+1).join(" "))}t.replaceSelections(e)},defaultTab:function(t){t.somethingSelected()?t.indentSelection("add"):t.execCommand("insertTab")},transposeChars:function(t){Tn(t,function(){for(var e=t.listSelections(),n=[],r=0;r<e.length;r++){var i=e[r].head,o=Gi(t.doc,i.line).text;if(o)if(i.ch==o.length&&(i=new Ml(i.line,i.ch-1)),i.ch>0)i=new Ml(i.line,i.ch+1),t.replaceRange(o.charAt(i.ch-1)+o.charAt(i.ch-2),Ml(i.line,i.ch-2),i,"+transpose");else if(i.line>t.doc.first){var l=Gi(t.doc,i.line-1).text;l&&t.replaceRange(o.charAt(0)+"\n"+l.charAt(l.length-1),Ml(i.line-1,l.length-1),Ml(i.line,1),"+transpose")}n.push(new ce(i,i))}t.setSelections(n)})},newlineAndIndent:function(t){Tn(t,function(){for(var e=t.listSelections().length,n=0;e>n;n++){var r=t.listSelections()[n];t.replaceRange("\n",r.anchor,r.head,"+input"),t.indentLine(r.from().line+1,null,!0),Or(t)}})},toggleOverwrite:function(t){t.toggleOverwrite()}},ea=t.keyMap={};ea.basic={Left:"goCharLeft",Right:"goCharRight",Up:"goLineUp",Down:"goLineDown",End:"goLineEnd",Home:"goLineStartSmart",PageUp:"goPageUp",PageDown:"goPageDown",Delete:"delCharAfter",Backspace:"delCharBefore","Shift-Backspace":"delCharBefore",Tab:"defaultTab","Shift-Tab":"indentAuto",Enter:"newlineAndIndent",Insert:"toggleOverwrite",Esc:"singleSelection"},ea.pcDefault={"Ctrl-A":"selectAll","Ctrl-D":"deleteLine","Ctrl-Z":"undo","Shift-Ctrl-Z":"redo","Ctrl-Y":"redo","Ctrl-Home":"goDocStart","Ctrl-End":"goDocEnd","Ctrl-Up":"goLineUp","Ctrl-Down":"goLineDown","Ctrl-Left":"goGroupLeft","Ctrl-Right":"goGroupRight","Alt-Left":"goLineStart","Alt-Right":"goLineEnd","Ctrl-Backspace":"delGroupBefore","Ctrl-Delete":"delGroupAfter","Ctrl-S":"save","Ctrl-F":"find","Ctrl-G":"findNext","Shift-Ctrl-G":"findPrev","Shift-Ctrl-F":"replace","Shift-Ctrl-R":"replaceAll","Ctrl-[":"indentLess","Ctrl-]":"indentMore","Ctrl-U":"undoSelection","Shift-Ctrl-U":"redoSelection","Alt-U":"redoSelection",fallthrough:"basic"},ea.emacsy={"Ctrl-F":"goCharRight","Ctrl-B":"goCharLeft","Ctrl-P":"goLineUp","Ctrl-N":"goLineDown","Alt-F":"goWordRight","Alt-B":"goWordLeft","Ctrl-A":"goLineStart","Ctrl-E":"goLineEnd","Ctrl-V":"goPageDown","Shift-Ctrl-V":"goPageUp","Ctrl-D":"delCharAfter","Ctrl-H":"delCharBefore","Alt-D":"delWordAfter","Alt-Backspace":"delWordBefore","Ctrl-K":"killLine","Ctrl-T":"transposeChars"},ea.macDefault={"Cmd-A":"selectAll","Cmd-D":"deleteLine","Cmd-Z":"undo","Shift-Cmd-Z":"redo","Cmd-Y":"redo","Cmd-Home":"goDocStart","Cmd-Up":"goDocStart","Cmd-End":"goDocEnd","Cmd-Down":"goDocEnd","Alt-Left":"goGroupLeft","Alt-Right":"goGroupRight","Cmd-Left":"goLineLeft","Cmd-Right":"goLineRight","Alt-Backspace":"delGroupBefore","Ctrl-Alt-Backspace":"delGroupAfter","Alt-Delete":"delGroupAfter","Cmd-S":"save","Cmd-F":"find","Cmd-G":"findNext","Shift-Cmd-G":"findPrev","Cmd-Alt-F":"replace","Shift-Cmd-Alt-F":"replaceAll","Cmd-[":"indentLess","Cmd-]":"indentMore","Cmd-Backspace":"delWrappedLineLeft","Cmd-Delete":"delWrappedLineRight","Cmd-U":"undoSelection","Shift-Cmd-U":"redoSelection","Ctrl-Up":"goDocStart","Ctrl-Down":"goDocEnd",fallthrough:["basic","emacsy"]},ea["default"]=xl?ea.macDefault:ea.pcDefault,t.normalizeKeyMap=function(t){var e={};for(var n in t)if(t.hasOwnProperty(n)){var r=t[n];if(/^(name|fallthrough|(de|at)tach)$/.test(n))continue;if("..."==r){delete t[n];continue}for(var i=Mo(n.split(" "),zr),o=0;o<i.length;o++){var l,a;o==i.length-1?(a=n,l=r):(a=i.slice(0,o+1).join(" "),l="...");var s=e[a];if(s){if(s!=l)throw new Error("Inconsistent bindings for "+a)}else e[a]=l}delete t[n]}for(var u in e)t[u]=e[u];return t};var na=t.lookupKey=function(t,e,n,r){e=Pr(e);var i=e.call?e.call(t,r):e[t];if(i===!1)return"nothing";if("..."===i)return"multi";if(null!=i&&n(i))return"handled";if(e.fallthrough){if("[object Array]"!=Object.prototype.toString.call(e.fallthrough))return na(t,e.fallthrough,n,r);for(var o=0;o<e.fallthrough.length;o++){var l=na(t,e.fallthrough[o],n,r);if(l)return l}}},ra=t.isModifierKey=function(t){var e="string"==typeof t?t:Va[t.keyCode];return"Ctrl"==e||"Alt"==e||"Shift"==e||"Mod"==e},ia=t.keyName=function(t,e){if(gl&&34==t.keyCode&&t["char"])return!1;var n=Va[t.keyCode],r=n;return null==r||t.altGraphKey?!1:(t.altKey&&"Alt"!=n&&(r="Alt-"+r),(kl?t.metaKey:t.ctrlKey)&&"Ctrl"!=n&&(r="Ctrl-"+r),(kl?t.ctrlKey:t.metaKey)&&"Cmd"!=n&&(r="Cmd-"+r),!e&&t.shiftKey&&"Shift"!=n&&(r="Shift-"+r),r)};t.fromTextArea=function(e,n){function r(){e.value=u.getValue()}if(n=n?Oo(n):{},n.value=e.value,!n.tabindex&&e.tabIndex&&(n.tabindex=e.tabIndex),!n.placeholder&&e.placeholder&&(n.placeholder=e.placeholder),null==n.autofocus){var i=zo();n.autofocus=i==e||null!=e.getAttribute("autofocus")&&i==document.body}if(e.form&&(wa(e.form,"submit",r),!n.leaveSubmitMethodAlone)){var o=e.form,l=o.submit;try{var a=o.submit=function(){r(),o.submit=l,o.submit(),o.submit=a}}catch(s){}}n.finishInit=function(t){t.save=r,t.getTextArea=function(){return e},t.toTextArea=function(){t.toTextArea=isNaN,r(),e.parentNode.removeChild(t.getWrapperElement()),e.style.display="",e.form&&(xa(e.form,"submit",r),"function"==typeof e.form.submit&&(e.form.submit=l))}},e.style.display="none";var u=t(function(t){e.parentNode.insertBefore(t,e.nextSibling)},n);return u};var oa=t.StringStream=function(t,e){this.pos=this.start=0,this.string=t,this.tabSize=e||8,this.lastColumnPos=this.lastColumnValue=0,this.lineStart=0};oa.prototype={eol:function(){return this.pos>=this.string.length},sol:function(){return this.pos==this.lineStart},peek:function(){return this.string.charAt(this.pos)||void 0},next:function(){return this.pos<this.string.length?this.string.charAt(this.pos++):void 0},eat:function(t){var e=this.string.charAt(this.pos);if("string"==typeof t)var n=e==t;else var n=e&&(t.test?t.test(e):t(e));return n?(++this.pos,e):void 0},eatWhile:function(t){for(var e=this.pos;this.eat(t););return this.pos>e},eatSpace:function(){for(var t=this.pos;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;return this.pos>t},skipToEnd:function(){this.pos=this.string.length},skipTo:function(t){var e=this.string.indexOf(t,this.pos);return e>-1?(this.pos=e,!0):void 0},backUp:function(t){this.pos-=t},column:function(){return this.lastColumnPos<this.start&&(this.lastColumnValue=Aa(this.string,this.start,this.tabSize,this.lastColumnPos,this.lastColumnValue),this.lastColumnPos=this.start),this.lastColumnValue-(this.lineStart?Aa(this.string,this.lineStart,this.tabSize):0)},indentation:function(){return Aa(this.string,null,this.tabSize)-(this.lineStart?Aa(this.string,this.lineStart,this.tabSize):0)
},match:function(t,e,n){if("string"!=typeof t){var r=this.string.slice(this.pos).match(t);return r&&r.index>0?null:(r&&e!==!1&&(this.pos+=r[0].length),r)}var i=function(t){return n?t.toLowerCase():t},o=this.string.substr(this.pos,t.length);return i(o)==i(t)?(e!==!1&&(this.pos+=t.length),!0):void 0},current:function(){return this.string.slice(this.start,this.pos)},hideFirstChars:function(t,e){this.lineStart+=t;try{return e()}finally{this.lineStart-=t}}};var la=0,aa=t.TextMarker=function(t,e){this.lines=[],this.type=e,this.doc=t,this.id=++la};Co(aa),aa.prototype.clear=function(){if(!this.explicitlyCleared){var t=this.doc.cm,e=t&&!t.curOp;if(e&&yn(t),xo(this,"clear")){var n=this.find();n&&mo(this,"clear",n.from,n.to)}for(var r=null,i=null,o=0;o<this.lines.length;++o){var l=this.lines[o],a=Vr(l.markedSpans,this);t&&!this.collapsed?Hn(t,$i(l),"text"):t&&(null!=a.to&&(i=$i(l)),null!=a.from&&(r=$i(l))),l.markedSpans=$r(l.markedSpans,a),null==a.from&&this.collapsed&&!gi(this.doc,l)&&t&&Vi(l,vn(t.display))}if(t&&this.collapsed&&!t.options.lineWrapping)for(var o=0;o<this.lines.length;++o){var s=fi(this.lines[o]),u=f(s);u>t.display.maxLineLength&&(t.display.maxLine=s,t.display.maxLineLength=u,t.display.maxLineChanged=!0)}null!=r&&t&&this.collapsed&&Dn(t,r,i+1),this.lines.length=0,this.explicitlyCleared=!0,this.atomic&&this.doc.cantEdit&&(this.doc.cantEdit=!1,t&&Me(t.doc)),t&&mo(t,"markerCleared",t,this),e&&wn(t),this.parent&&this.parent.clear()}},aa.prototype.find=function(t,e){null==t&&"bookmark"==this.type&&(t=1);for(var n,r,i=0;i<this.lines.length;++i){var o=this.lines[i],l=Vr(o.markedSpans,this);if(null!=l.from&&(n=Ml(e?o:$i(o),l.from),-1==t))return n;if(null!=l.to&&(r=Ml(e?o:$i(o),l.to),1==t))return r}return n&&{from:n,to:r}},aa.prototype.changed=function(){var t=this.find(-1,!0),e=this,n=this.doc.cm;t&&n&&Tn(n,function(){var r=t.line,i=$i(t.line),o=Ye(n,i);if(o&&(nn(o),n.curOp.selectionChanged=n.curOp.forceUpdate=!0),n.curOp.updateMaxLine=!0,!gi(e.doc,r)&&null!=e.height){var l=e.height;e.height=null;var a=yi(e)-l;a&&Vi(r,r.height+a)}})},aa.prototype.attachLine=function(t){if(!this.lines.length&&this.doc.cm){var e=this.doc.cm.curOp;e.maybeHiddenMarkers&&-1!=To(e.maybeHiddenMarkers,this)||(e.maybeUnhiddenMarkers||(e.maybeUnhiddenMarkers=[])).push(this)}this.lines.push(t)},aa.prototype.detachLine=function(t){if(this.lines.splice(To(this.lines,t),1),!this.lines.length&&this.doc.cm){var e=this.doc.cm.curOp;(e.maybeHiddenMarkers||(e.maybeHiddenMarkers=[])).push(this)}};var la=0,sa=t.SharedTextMarker=function(t,e){this.markers=t,this.primary=e;for(var n=0;n<t.length;++n)t[n].parent=this};Co(sa),sa.prototype.clear=function(){if(!this.explicitlyCleared){this.explicitlyCleared=!0;for(var t=0;t<this.markers.length;++t)this.markers[t].clear();mo(this,"clear")}},sa.prototype.find=function(t,e){return this.primary.find(t,e)};var ua=t.LineWidget=function(t,e,n){if(n)for(var r in n)n.hasOwnProperty(r)&&(this[r]=n[r]);this.cm=t,this.node=e};Co(ua),ua.prototype.clear=function(){var t=this.cm,e=this.line.widgets,n=this.line,r=$i(n);if(null!=r&&e){for(var i=0;i<e.length;++i)e[i]==this&&e.splice(i--,1);e.length||(n.widgets=null);var o=yi(this);Tn(t,function(){mi(t,n,-o),Hn(t,r,"widget"),Vi(n,Math.max(0,n.height-o))})}},ua.prototype.changed=function(){var t=this.height,e=this.cm,n=this.line;this.height=null;var r=yi(this)-t;r&&Tn(e,function(){e.curOp.forceUpdate=!0,mi(e,n,r),Vi(n,n.height+r)})};var ca=t.Line=function(t,e,n){this.text=t,ri(this,e),this.height=n?n(this):1};Co(ca),ca.prototype.lineNo=function(){return $i(this)};var fa={},ha={};Pi.prototype={chunkSize:function(){return this.lines.length},removeInner:function(t,e){for(var n=t,r=t+e;r>n;++n){var i=this.lines[n];this.height-=i.height,xi(i),mo(i,"delete")}this.lines.splice(t,e)},collapse:function(t){t.push.apply(t,this.lines)},insertInner:function(t,e,n){this.height+=n,this.lines=this.lines.slice(0,t).concat(e).concat(this.lines.slice(t));for(var r=0;r<e.length;++r)e[r].parent=this},iterN:function(t,e,n){for(var r=t+e;r>t;++t)if(n(this.lines[t]))return!0}},Bi.prototype={chunkSize:function(){return this.size},removeInner:function(t,e){this.size-=e;for(var n=0;n<this.children.length;++n){var r=this.children[n],i=r.chunkSize();if(i>t){var o=Math.min(e,i-t),l=r.height;if(r.removeInner(t,o),this.height-=l-r.height,i==o&&(this.children.splice(n--,1),r.parent=null),0==(e-=o))break;t=0}else t-=i}if(this.size-e<25&&(this.children.length>1||!(this.children[0]instanceof Pi))){var a=[];this.collapse(a),this.children=[new Pi(a)],this.children[0].parent=this}},collapse:function(t){for(var e=0;e<this.children.length;++e)this.children[e].collapse(t)},insertInner:function(t,e,n){this.size+=e.length,this.height+=n;for(var r=0;r<this.children.length;++r){var i=this.children[r],o=i.chunkSize();if(o>=t){if(i.insertInner(t,e,n),i.lines&&i.lines.length>50){for(;i.lines.length>50;){var l=i.lines.splice(i.lines.length-25,25),a=new Pi(l);i.height-=a.height,this.children.splice(r+1,0,a),a.parent=this}this.maybeSpill()}break}t-=o}},maybeSpill:function(){if(!(this.children.length<=10)){var t=this;do{var e=t.children.splice(t.children.length-5,5),n=new Bi(e);if(t.parent){t.size-=n.size,t.height-=n.height;var r=To(t.parent.children,t);t.parent.children.splice(r+1,0,n)}else{var i=new Bi(t.children);i.parent=t,t.children=[i,n],t=i}n.parent=t.parent}while(t.children.length>10);t.parent.maybeSpill()}},iterN:function(t,e,n){for(var r=0;r<this.children.length;++r){var i=this.children[r],o=i.chunkSize();if(o>t){var l=Math.min(e,o-t);if(i.iterN(t,l,n))return!0;if(0==(e-=l))break;t=0}else t-=o}}};var da=0,pa=t.Doc=function(t,e,n){if(!(this instanceof pa))return new pa(t,e,n);null==n&&(n=0),Bi.call(this,[new Pi([new ca("",null)])]),this.first=n,this.scrollTop=this.scrollLeft=0,this.cantEdit=!1,this.cleanGeneration=1,this.frontier=n;var r=Ml(n,0);this.sel=he(r),this.history=new Ji(null),this.id=++da,this.modeOption=e,"string"==typeof t&&(t=Ua(t)),zi(this,{from:r,to:r,text:t}),Le(this,he(r),_a)};pa.prototype=No(Bi.prototype,{constructor:pa,iter:function(t,e,n){n?this.iterN(t-this.first,e-t,n):this.iterN(this.first,this.first+this.size,t)},insert:function(t,e){for(var n=0,r=0;r<e.length;++r)n+=e[r].height;this.insertInner(t-this.first,e,n)},remove:function(t,e){this.removeInner(t-this.first,e)},getValue:function(t){var e=Ki(this,this.first,this.first+this.size);return t===!1?e:e.join(t||"\n")},setValue:Nn(function(t){var e=Ml(this.first,0),n=this.first+this.size-1;br(this,{from:e,to:Ml(n,Gi(this,n).text.length),text:Ua(t),origin:"setValue",full:!0},!0),Le(this,he(e))}),replaceRange:function(t,e,n,r){e=pe(this,e),n=n?pe(this,n):e,Lr(this,t,e,n,r)},getRange:function(t,e,n){var r=qi(this,pe(this,t),pe(this,e));return n===!1?r:r.join(n||"\n")},getLine:function(t){var e=this.getLineHandle(t);return e&&e.text},getLineHandle:function(t){return ve(this,t)?Gi(this,t):void 0},getLineNumber:function(t){return $i(t)},getLineHandleVisualStart:function(t){return"number"==typeof t&&(t=Gi(this,t)),fi(t)},lineCount:function(){return this.size},firstLine:function(){return this.first},lastLine:function(){return this.first+this.size-1},clipPos:function(t){return pe(this,t)},getCursor:function(t){var e,n=this.sel.primary();return e=null==t||"head"==t?n.head:"anchor"==t?n.anchor:"end"==t||"to"==t||t===!1?n.to():n.from()},listSelections:function(){return this.sel.ranges},somethingSelected:function(){return this.sel.somethingSelected()},setCursor:Nn(function(t,e,n){Ce(this,pe(this,"number"==typeof t?Ml(t,e||0):t),null,n)}),setSelection:Nn(function(t,e,n){Ce(this,pe(this,t),pe(this,e||t),n)}),extendSelection:Nn(function(t,e,n){be(this,pe(this,t),e&&pe(this,e),n)}),extendSelections:Nn(function(t,e){we(this,me(this,t,e))}),extendSelectionsBy:Nn(function(t,e){we(this,Mo(this.sel.ranges,t),e)}),setSelections:Nn(function(t,e,n){if(t.length){for(var r=0,i=[];r<t.length;r++)i[r]=new ce(pe(this,t[r].anchor),pe(this,t[r].head));null==e&&(e=Math.min(t.length-1,this.sel.primIndex)),Le(this,fe(i,e),n)}}),addSelection:Nn(function(t,e,n){var r=this.sel.ranges.slice(0);r.push(new ce(pe(this,t),pe(this,e||t))),Le(this,fe(r,r.length-1),n)}),getSelection:function(t){for(var e,n=this.sel.ranges,r=0;r<n.length;r++){var i=qi(this,n[r].from(),n[r].to());e=e?e.concat(i):i}return t===!1?e:e.join(t||"\n")},getSelections:function(t){for(var e=[],n=this.sel.ranges,r=0;r<n.length;r++){var i=qi(this,n[r].from(),n[r].to());t!==!1&&(i=i.join(t||"\n")),e[r]=i}return e},replaceSelection:function(t,e,n){for(var r=[],i=0;i<this.sel.ranges.length;i++)r[i]=t;this.replaceSelections(r,e,n||"+input")},replaceSelections:Nn(function(t,e,n){for(var r=[],i=this.sel,o=0;o<i.ranges.length;o++){var l=i.ranges[o];r[o]={from:l.from(),to:l.to(),text:Ua(t[o]),origin:n}}for(var a=e&&"end"!=e&&mr(this,r,e),o=r.length-1;o>=0;o--)br(this,r[o]);a?ke(this,a):this.cm&&Or(this.cm)}),undo:Nn(function(){xr(this,"undo")}),redo:Nn(function(){xr(this,"redo")}),undoSelection:Nn(function(){xr(this,"undo",!0)}),redoSelection:Nn(function(){xr(this,"redo",!0)}),setExtending:function(t){this.extend=t},getExtending:function(){return this.extend},historySize:function(){for(var t=this.history,e=0,n=0,r=0;r<t.done.length;r++)t.done[r].ranges||++e;for(var r=0;r<t.undone.length;r++)t.undone[r].ranges||++n;return{undo:e,redo:n}},clearHistory:function(){this.history=new Ji(this.history.maxGeneration)},markClean:function(){this.cleanGeneration=this.changeGeneration(!0)},changeGeneration:function(t){return t&&(this.history.lastOp=this.history.lastSelOp=this.history.lastOrigin=null),this.history.generation},isClean:function(t){return this.history.generation==(t||this.cleanGeneration)},getHistory:function(){return{done:uo(this.history.done),undone:uo(this.history.undone)}},setHistory:function(t){var e=this.history=new Ji(this.history.maxGeneration);e.done=uo(t.done.slice(0),null,!0),e.undone=uo(t.undone.slice(0),null,!0)},addLineClass:Nn(function(t,e,n){return Hr(this,t,"gutter"==e?"gutter":"class",function(t){var r="text"==e?"textClass":"background"==e?"bgClass":"gutter"==e?"gutterClass":"wrapClass";if(t[r]){if(Po(n).test(t[r]))return!1;t[r]+=" "+n}else t[r]=n;return!0})}),removeLineClass:Nn(function(t,e,n){return Hr(this,t,"gutter"==e?"gutter":"class",function(t){var r="text"==e?"textClass":"background"==e?"bgClass":"gutter"==e?"gutterClass":"wrapClass",i=t[r];if(!i)return!1;if(null==n)t[r]=null;else{var o=i.match(Po(n));if(!o)return!1;var l=o.index+o[0].length;t[r]=i.slice(0,o.index)+(o.index&&l!=i.length?" ":"")+i.slice(l)||null}return!0})}),markText:function(t,e,n){return Br(this,pe(this,t),pe(this,e),n,"range")},setBookmark:function(t,e){var n={replacedWith:e&&(null==e.nodeType?e.widget:e),insertLeft:e&&e.insertLeft,clearWhenEmpty:!1,shared:e&&e.shared};return t=pe(this,t),Br(this,t,t,n,"bookmark")},findMarksAt:function(t){t=pe(this,t);var e=[],n=Gi(this,t.line).markedSpans;if(n)for(var r=0;r<n.length;++r){var i=n[r];(null==i.from||i.from<=t.ch)&&(null==i.to||i.to>=t.ch)&&e.push(i.marker.parent||i.marker)}return e},findMarks:function(t,e,n){t=pe(this,t),e=pe(this,e);var r=[],i=t.line;return this.iter(t.line,e.line+1,function(o){var l=o.markedSpans;if(l)for(var a=0;a<l.length;a++){var s=l[a];i==t.line&&t.ch>s.to||null==s.from&&i!=t.line||i==e.line&&s.from>e.ch||n&&!n(s.marker)||r.push(s.marker.parent||s.marker)}++i}),r},getAllMarks:function(){var t=[];return this.iter(function(e){var n=e.markedSpans;if(n)for(var r=0;r<n.length;++r)null!=n[r].from&&t.push(n[r].marker)}),t},posFromIndex:function(t){var e,n=this.first;return this.iter(function(r){var i=r.text.length+1;return i>t?(e=t,!0):(t-=i,void++n)}),pe(this,Ml(n,e))},indexFromPos:function(t){t=pe(this,t);var e=t.ch;return t.line<this.first||t.ch<0?0:(this.iter(this.first,t.line,function(t){e+=t.text.length+1}),e)},copy:function(t){var e=new pa(Ki(this,this.first,this.first+this.size),this.modeOption,this.first);return e.scrollTop=this.scrollTop,e.scrollLeft=this.scrollLeft,e.sel=this.sel,e.extend=!1,t&&(e.history.undoDepth=this.history.undoDepth,e.setHistory(this.getHistory())),e},linkedDoc:function(t){t||(t={});var e=this.first,n=this.first+this.size;null!=t.from&&t.from>e&&(e=t.from),null!=t.to&&t.to<n&&(n=t.to);var r=new pa(Ki(this,e,n),t.mode||this.modeOption,e);return t.sharedHist&&(r.history=this.history),(this.linked||(this.linked=[])).push({doc:r,sharedHist:t.sharedHist}),r.linked=[{doc:this,isParent:!0,sharedHist:t.sharedHist}],Gr(r,Ur(this)),r},unlinkDoc:function(e){if(e instanceof t&&(e=e.doc),this.linked)for(var n=0;n<this.linked.length;++n){var r=this.linked[n];if(r.doc==e){this.linked.splice(n,1),e.unlinkDoc(this),qr(Ur(this));break}}if(e.history==this.history){var i=[e.id];ji(e,function(t){i.push(t.id)},!0),e.history=new Ji(null),e.history.done=uo(this.history.done,i),e.history.undone=uo(this.history.undone,i)}},iterLinkedDocs:function(t){ji(this,t)},getMode:function(){return this.mode},getEditor:function(){return this.cm}}),pa.prototype.eachLine=pa.prototype.iter;var ga="iter insert remove copy getEditor".split(" ");for(var va in pa.prototype)pa.prototype.hasOwnProperty(va)&&To(ga,va)<0&&(t.prototype[va]=function(t){return function(){return t.apply(this.doc,arguments)}}(pa.prototype[va]));Co(pa);var ma=t.e_preventDefault=function(t){t.preventDefault?t.preventDefault():t.returnValue=!1},ya=t.e_stopPropagation=function(t){t.stopPropagation?t.stopPropagation():t.cancelBubble=!0},ba=t.e_stop=function(t){ma(t),ya(t)},wa=t.on=function(t,e,n){if(t.addEventListener)t.addEventListener(e,n,!1);else if(t.attachEvent)t.attachEvent("on"+e,n);else{var r=t._handlers||(t._handlers={}),i=r[e]||(r[e]=[]);i.push(n)}},xa=t.off=function(t,e,n){if(t.removeEventListener)t.removeEventListener(e,n,!1);else if(t.detachEvent)t.detachEvent("on"+e,n);else{var r=t._handlers&&t._handlers[e];if(!r)return;for(var i=0;i<r.length;++i)if(r[i]==n){r.splice(i,1);break}}},Ca=t.signal=function(t,e){var n=t._handlers&&t._handlers[e];if(n)for(var r=Array.prototype.slice.call(arguments,2),i=0;i<n.length;++i)n[i].apply(null,r)},Sa=null,ka=30,La=t.Pass={toString:function(){return"CodeMirror.Pass"}},_a={scroll:!1},Ta={origin:"*mouse"},Ma={origin:"+move"};So.prototype.set=function(t,e){clearTimeout(this.id),this.id=setTimeout(e,t)};var Aa=t.countColumn=function(t,e,n,r,i){null==e&&(e=t.search(/[^\s\u00a0]/),-1==e&&(e=t.length));for(var o=r||0,l=i||0;;){var a=t.indexOf("	",o);if(0>a||a>=e)return l+(e-o);l+=a-o,l+=n-l%n,o=a+1}},Na=[""],Oa=function(t){t.select()};bl?Oa=function(t){t.selectionStart=0,t.selectionEnd=t.value.length}:cl&&(Oa=function(t){try{t.select()}catch(e){}});var Wa,Da=/[\u00df\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,Ha=t.isWordChar=function(t){return/\w/.test(t)||t>""&&(t.toUpperCase()!=t.toLowerCase()||Da.test(t))},Ea=/[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;Wa=document.createRange?function(t,e,n,r){var i=document.createRange();return i.setEnd(r||t,n),i.setStart(t,e),i}:function(t,e,n){var r=document.body.createTextRange();try{r.moveToElementText(t.parentNode)}catch(i){return r}return r.collapse(!0),r.moveEnd("character",n),r.moveStart("character",e),r};var Fa=t.contains=function(t,e){if(3==e.nodeType&&(e=e.parentNode),t.contains)return t.contains(e);do if(11==e.nodeType&&(e=e.host),e==t)return!0;while(e=e.parentNode)};cl&&11>fl&&(zo=function(){try{return document.activeElement}catch(t){return document.body}});var Ia,Ra,za=t.rmClass=function(t,e){var n=t.className,r=Po(e).exec(n);if(r){var i=n.slice(r.index+r[0].length);t.className=n.slice(0,r.index)+(i?r[1]+i:"")}},Pa=t.addClass=function(t,e){var n=t.className;Po(e).test(n)||(t.className+=(n?" ":"")+e)},Ba=!1,ja=function(){if(cl&&9>fl)return!1;var t=Fo("div");return"draggable"in t||"dragDrop"in t}(),Ua=t.splitLines=3!="\n\nb".split(/\n/).length?function(t){for(var e=0,n=[],r=t.length;r>=e;){var i=t.indexOf("\n",e);-1==i&&(i=t.length);var o=t.slice(e,"\r"==t.charAt(i-1)?i-1:i),l=o.indexOf("\r");-1!=l?(n.push(o.slice(0,l)),e+=l+1):(n.push(o),e=i+1)}return n}:function(t){return t.split(/\r\n?|\n/)},Ga=window.getSelection?function(t){try{return t.selectionStart!=t.selectionEnd}catch(e){return!1}}:function(t){try{var e=t.ownerDocument.selection.createRange()}catch(n){}return e&&e.parentElement()==t?0!=e.compareEndPoints("StartToEnd",e):!1},qa=function(){var t=Fo("div");return"oncopy"in t?!0:(t.setAttribute("oncopy","return;"),"function"==typeof t.oncopy)}(),Ka=null,Va={3:"Enter",8:"Backspace",9:"Tab",13:"Enter",16:"Shift",17:"Ctrl",18:"Alt",19:"Pause",20:"CapsLock",27:"Esc",32:"Space",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",44:"PrintScrn",45:"Insert",46:"Delete",59:";",61:"=",91:"Mod",92:"Mod",93:"Mod",107:"=",109:"-",127:"Delete",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",63232:"Up",63233:"Down",63234:"Left",63235:"Right",63272:"Delete",63273:"Home",63275:"End",63276:"PageUp",63277:"PageDown",63302:"Insert"};t.keyNames=Va,function(){for(var t=0;10>t;t++)Va[t+48]=Va[t+96]=String(t);for(var t=65;90>=t;t++)Va[t]=String.fromCharCode(t);for(var t=1;12>=t;t++)Va[t+111]=Va[t+63235]="F"+t}();var $a,Xa=function(){function t(t){return 247>=t?n.charAt(t):t>=1424&&1524>=t?"R":t>=1536&&1773>=t?r.charAt(t-1536):t>=1774&&2220>=t?"r":t>=8192&&8203>=t?"w":8204==t?"b":"L"}function e(t,e,n){this.level=t,this.from=e,this.to=n}var n="bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN",r="rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm",i=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,o=/[stwN]/,l=/[LRr]/,a=/[Lb1n]/,s=/[1n]/,u="L";return function(n){if(!i.test(n))return!1;for(var r,c=n.length,f=[],h=0;c>h;++h)f.push(r=t(n.charCodeAt(h)));for(var h=0,d=u;c>h;++h){var r=f[h];"m"==r?f[h]=d:d=r}for(var h=0,p=u;c>h;++h){var r=f[h];"1"==r&&"r"==p?f[h]="n":l.test(r)&&(p=r,"r"==r&&(f[h]="R"))}for(var h=1,d=f[0];c-1>h;++h){var r=f[h];"+"==r&&"1"==d&&"1"==f[h+1]?f[h]="1":","!=r||d!=f[h+1]||"1"!=d&&"n"!=d||(f[h]=d),d=r}for(var h=0;c>h;++h){var r=f[h];if(","==r)f[h]="N";else if("%"==r){for(var g=h+1;c>g&&"%"==f[g];++g);for(var v=h&&"!"==f[h-1]||c>g&&"1"==f[g]?"1":"N",m=h;g>m;++m)f[m]=v;h=g-1}}for(var h=0,p=u;c>h;++h){var r=f[h];"L"==p&&"1"==r?f[h]="L":l.test(r)&&(p=r)}for(var h=0;c>h;++h)if(o.test(f[h])){for(var g=h+1;c>g&&o.test(f[g]);++g);for(var y="L"==(h?f[h-1]:u),b="L"==(c>g?f[g]:u),v=y||b?"L":"R",m=h;g>m;++m)f[m]=v;h=g-1}for(var w,x=[],h=0;c>h;)if(a.test(f[h])){var C=h;for(++h;c>h&&a.test(f[h]);++h);x.push(new e(0,C,h))}else{var S=h,k=x.length;for(++h;c>h&&"L"!=f[h];++h);for(var m=S;h>m;)if(s.test(f[m])){m>S&&x.splice(k,0,new e(1,S,m));var L=m;for(++m;h>m&&s.test(f[m]);++m);x.splice(k,0,new e(2,L,m)),S=m}else++m;h>S&&x.splice(k,0,new e(1,S,h))}return 1==x[0].level&&(w=n.match(/^\s+/))&&(x[0].from=w[0].length,x.unshift(new e(0,0,w[0].length))),1==_o(x).level&&(w=n.match(/\s+$/))&&(_o(x).to-=w[0].length,x.push(new e(0,c-w[0].length,c))),x[0].level!=_o(x).level&&x.push(new e(x[0].level,c,c)),x}}();return t.version="5.0.0",t}),function(t){"object"==typeof exports&&"object"==typeof module?t(require("../../lib/codemirror"),require("../xml/xml"),require("../meta")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../xml/xml","../meta"],t):t(CodeMirror)}(function(t){"use strict";t.defineMode("markdown",function(e,n){function r(n){if(t.findModeByName){var r=t.findModeByName(n);r&&(n=r.mime||r.mimes[0])}var i=t.getMode(e,n);return"null"==i.name?null:i}function i(t,e,n){return e.f=e.inline=n,n(t,e)}function o(t,e,n){return e.f=e.block=n,n(t,e)}function l(t){return t.linkTitle=!1,t.em=!1,t.strong=!1,t.strikethrough=!1,t.quote=0,x||t.f!=s||(t.f=d,t.block=a),t.trailingSpace=0,t.trailingSpaceNewLine=!1,t.thisLineHasContent=!1,null}function a(t,e){var o=t.sol(),l=e.list!==!1;e.list!==!1&&e.indentationDiff>=0?(e.indentationDiff<4&&(e.indentation-=e.indentationDiff),e.list=null):e.list!==!1&&e.indentation>0?(e.list=null,e.listDepth=Math.floor(e.indentation/4)):e.list!==!1&&(e.list=!1,e.listDepth=0);var a=null;if(e.indentationDiff>=4)return e.indentation-=4,t.skipToEnd(),L;if(t.eatSpace())return null;if(a=t.match(G))return e.header=a[0].length<=6?a[0].length:6,n.highlightFormatting&&(e.formatting="header"),e.f=e.inline,f(e);if(e.prevLineHasContent&&(a=t.match(q)))return e.header="="==a[0].charAt(0)?1:2,n.highlightFormatting&&(e.formatting="header"),e.f=e.inline,f(e);if(t.eat(">"))return e.indentation++,e.quote=o?1:e.quote+1,n.highlightFormatting&&(e.formatting="quote"),t.eatSpace(),f(e);if("["===t.peek())return i(t,e,m);if(t.match(P,!0))return N;if((!e.prevLineHasContent||l)&&(t.match(B,!1)||t.match(j,!1))){var s=null;return t.match(B,!0)?s="ul":(t.match(j,!0),s="ol"),e.indentation+=4,e.list=!0,e.listDepth++,n.taskLists&&t.match(U,!1)&&(e.taskList=!0),e.f=e.inline,n.highlightFormatting&&(e.formatting=["list","list-"+s]),f(e)}return n.fencedCodeBlocks&&t.match(/^```[ \t]*([\w+#]*)/,!0)?(e.localMode=r(RegExp.$1),e.localMode&&(e.localState=e.localMode.startState()),e.f=e.block=u,n.highlightFormatting&&(e.formatting="code-block"),e.code=!0,f(e)):i(t,e,e.inline)}function s(t,e){var n=C.token(t,e.htmlState);return(x&&null===e.htmlState.tagStart&&!e.htmlState.context||e.md_inside&&t.current().indexOf(">")>-1)&&(e.f=d,e.block=a,e.htmlState=null),n}function u(t,e){return t.sol()&&t.match("```",!1)?(e.localMode=e.localState=null,e.f=e.block=c,null):e.localMode?e.localMode.token(t,e.localState):(t.skipToEnd(),L)}function c(t,e){t.match("```"),e.block=a,e.f=d,n.highlightFormatting&&(e.formatting="code-block"),e.code=!0;var r=f(e);return e.code=!1,r}function f(t){var e=[];if(t.formatting){e.push(W),"string"==typeof t.formatting&&(t.formatting=[t.formatting]);for(var r=0;r<t.formatting.length;r++)e.push(W+"-"+t.formatting[r]),"header"===t.formatting[r]&&e.push(W+"-"+t.formatting[r]+"-"+t.header),"quote"===t.formatting[r]&&e.push(!n.maxBlockquoteDepth||n.maxBlockquoteDepth>=t.quote?W+"-"+t.formatting[r]+"-"+t.quote:"error")}if(t.taskOpen)return e.push("meta"),e.length?e.join(" "):null;if(t.taskClosed)return e.push("property"),e.length?e.join(" "):null;if(t.linkHref)return e.push(F),e.length?e.join(" "):null;if(t.strong&&e.push(R),t.em&&e.push(I),t.strikethrough&&e.push(z),t.linkText&&e.push(E),t.code&&e.push(L),t.header&&(e.push(k),e.push(k+"-"+t.header)),t.quote&&(e.push(_),e.push(!n.maxBlockquoteDepth||n.maxBlockquoteDepth>=t.quote?_+"-"+t.quote:_+"-"+n.maxBlockquoteDepth)),t.list!==!1){var i=(t.listDepth-1)%3;e.push(i?1===i?M:A:T)}return t.trailingSpaceNewLine?e.push("trailing-space-new-line"):t.trailingSpace&&e.push("trailing-space-"+(t.trailingSpace%2?"a":"b")),e.length?e.join(" "):null}function h(t,e){return t.match(K,!0)?f(e):void 0}function d(e,r){var i=r.text(e,r);if("undefined"!=typeof i)return i;if(r.list)return r.list=null,f(r);if(r.taskList){var l="x"!==e.match(U,!0)[1];return l?r.taskOpen=!0:r.taskClosed=!0,n.highlightFormatting&&(r.formatting="task"),r.taskList=!1,f(r)}if(r.taskOpen=!1,r.taskClosed=!1,r.header&&e.match(/^#+$/,!0))return n.highlightFormatting&&(r.formatting="header"),f(r);var a=e.sol(),u=e.next();if("\\"===u&&(e.next(),n.highlightFormatting)){var c=f(r);return c?c+" formatting-escape":"formatting-escape"}if(r.linkTitle){r.linkTitle=!1;var h=u;"("===u&&(h=")"),h=(h+"").replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1");var d="^\\s*(?:[^"+h+"\\\\]+|\\\\\\\\|\\\\.)"+h;if(e.match(new RegExp(d),!0))return F}if("`"===u){var v=r.formatting;n.highlightFormatting&&(r.formatting="code");var m=f(r),y=e.pos;e.eatWhile("`");var b=1+e.pos-y;return r.code?b===S?(r.code=!1,m):(r.formatting=v,f(r)):(S=b,r.code=!0,f(r))}if(r.code)return f(r);if("!"===u&&e.match(/\[[^\]]*\] ?(?:\(|\[)/,!1))return e.match(/\[[^\]]*\]/),r.inline=r.f=g,O;if("["===u&&e.match(/.*\](\(.*\)| ?\[.*\])/,!1))return r.linkText=!0,n.highlightFormatting&&(r.formatting="link"),f(r);if("]"===u&&r.linkText&&e.match(/\(.*\)| ?\[.*\]/,!1)){n.highlightFormatting&&(r.formatting="link");var c=f(r);return r.linkText=!1,r.inline=r.f=g,c}if("<"===u&&e.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/,!1)){r.f=r.inline=p,n.highlightFormatting&&(r.formatting="link");var c=f(r);return c?c+=" ":c="",c+D}if("<"===u&&e.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/,!1)){r.f=r.inline=p,n.highlightFormatting&&(r.formatting="link");var c=f(r);return c?c+=" ":c="",c+H}if("<"===u&&e.match(/^\w/,!1)){if(-1!=e.string.indexOf(">")){var w=e.string.substring(1,e.string.indexOf(">"));/markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(w)&&(r.md_inside=!0)}return e.backUp(1),r.htmlState=t.startState(C),o(e,r,s)}if("<"===u&&e.match(/^\/\w*?>/))return r.md_inside=!1,"tag";var x=!1;if(!n.underscoresBreakWords&&"_"===u&&"_"!==e.peek()&&e.match(/(\w)/,!1)){var k=e.pos-2;if(k>=0){var L=e.string.charAt(k);"_"!==L&&L.match(/(\w)/,!1)&&(x=!0)}}if("*"===u||"_"===u&&!x)if(a&&" "===e.peek());else{if(r.strong===u&&e.eat(u)){n.highlightFormatting&&(r.formatting="strong");var m=f(r);return r.strong=!1,m}if(!r.strong&&e.eat(u))return r.strong=u,n.highlightFormatting&&(r.formatting="strong"),f(r);if(r.em===u){n.highlightFormatting&&(r.formatting="em");var m=f(r);return r.em=!1,m}if(!r.em)return r.em=u,n.highlightFormatting&&(r.formatting="em"),f(r)}else if(" "===u&&(e.eat("*")||e.eat("_"))){if(" "===e.peek())return f(r);e.backUp(1)}if(n.strikethrough)if("~"===u&&e.eatWhile(u)){if(r.strikethrough){n.highlightFormatting&&(r.formatting="strikethrough");var m=f(r);return r.strikethrough=!1,m}if(e.match(/^[^\s]/,!1))return r.strikethrough=!0,n.highlightFormatting&&(r.formatting="strikethrough"),f(r)}else if(" "===u&&e.match(/^~~/,!0)){if(" "===e.peek())return f(r);e.backUp(2)}return" "===u&&(e.match(/ +$/,!1)?r.trailingSpace++:r.trailingSpace&&(r.trailingSpaceNewLine=!0)),f(r)}function p(t,e){var r=t.next();if(">"===r){e.f=e.inline=d,n.highlightFormatting&&(e.formatting="link");var i=f(e);return i?i+=" ":i="",i+D}return t.match(/^[^>]+/,!0),D}function g(t,e){if(t.eatSpace())return null;var r=t.next();return"("===r||"["===r?(e.f=e.inline=v("("===r?")":"]"),n.highlightFormatting&&(e.formatting="link-string"),e.linkHref=!0,f(e)):"error"}function v(t){return function(e,r){var i=e.next();if(i===t){r.f=r.inline=d,n.highlightFormatting&&(r.formatting="link-string");var o=f(r);return r.linkHref=!1,o}return e.match(w(t),!0)&&e.backUp(1),r.linkHref=!0,f(r)}}function m(t,e){return t.match(/^[^\]]*\]:/,!1)?(e.f=y,t.next(),n.highlightFormatting&&(e.formatting="link"),e.linkText=!0,f(e)):i(t,e,d)}function y(t,e){if(t.match(/^\]:/,!0)){e.f=e.inline=b,n.highlightFormatting&&(e.formatting="link");var r=f(e);return e.linkText=!1,r}return t.match(/^[^\]]+/,!0),E}function b(t,e){return t.eatSpace()?null:(t.match(/^[^\s]+/,!0),void 0===t.peek()?e.linkTitle=!0:t.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/,!0),e.f=e.inline=d,F)}function w(t){return V[t]||(t=(t+"").replace(/([.?*+^$[\]\\(){}|-])/g,"\\$1"),V[t]=new RegExp("^(?:[^\\\\]|\\\\.)*?("+t+")")),V[t]}var x=t.modes.hasOwnProperty("xml"),C=t.getMode(e,x?{name:"xml",htmlMode:!0}:"text/plain");void 0===n.highlightFormatting&&(n.highlightFormatting=!1),void 0===n.maxBlockquoteDepth&&(n.maxBlockquoteDepth=0),void 0===n.underscoresBreakWords&&(n.underscoresBreakWords=!0),void 0===n.fencedCodeBlocks&&(n.fencedCodeBlocks=!1),void 0===n.taskLists&&(n.taskLists=!1),void 0===n.strikethrough&&(n.strikethrough=!1);var S=0,k="header",L="comment",_="quote",T="variable-2",M="variable-3",A="keyword",N="hr",O="tag",W="formatting",D="link",H="link",E="link",F="string",I="em",R="strong",z="strikethrough",P=/^([*\-=_])(?:\s*\1){2,}\s*$/,B=/^[*\-+]\s+/,j=/^[0-9]+\.\s+/,U=/^\[(x| )\](?=\s)/,G=/^#+/,q=/^(?:\={1,}|-{1,})$/,K=/^[^#!\[\]*_\\<>` "'(~]+/,V=[],$={startState:function(){return{f:a,prevLineHasContent:!1,thisLineHasContent:!1,block:a,htmlState:null,indentation:0,inline:d,text:h,formatting:!1,linkText:!1,linkHref:!1,linkTitle:!1,em:!1,strong:!1,header:0,taskList:!1,list:!1,listDepth:0,quote:0,trailingSpace:0,trailingSpaceNewLine:!1,strikethrough:!1}},copyState:function(e){return{f:e.f,prevLineHasContent:e.prevLineHasContent,thisLineHasContent:e.thisLineHasContent,block:e.block,htmlState:e.htmlState&&t.copyState(C,e.htmlState),indentation:e.indentation,localMode:e.localMode,localState:e.localMode?t.copyState(e.localMode,e.localState):null,inline:e.inline,text:e.text,formatting:!1,linkTitle:e.linkTitle,em:e.em,strong:e.strong,strikethrough:e.strikethrough,header:e.header,taskList:e.taskList,list:e.list,listDepth:e.listDepth,quote:e.quote,trailingSpace:e.trailingSpace,trailingSpaceNewLine:e.trailingSpaceNewLine,md_inside:e.md_inside}},token:function(t,e){if(e.formatting=!1,t.sol()){var n=!!e.header;if(e.header=0,t.match(/^\s*$/,!0)||n)return e.prevLineHasContent=!1,l(e),n?this.token(t,e):null;e.prevLineHasContent=e.thisLineHasContent,e.thisLineHasContent=!0,e.taskList=!1,e.code=!1,e.trailingSpace=0,e.trailingSpaceNewLine=!1,e.f=e.block;var r=t.match(/^\s*/,!0)[0].replace(/\t/g,"    ").length,i=4*Math.floor((r-e.indentation)/4);i>4&&(i=4);var o=e.indentation+i;if(e.indentationDiff=o-e.indentation,e.indentation=o,r>0)return null}return e.f(t,e)},innerMode:function(t){return t.block==s?{state:t.htmlState,mode:C}:t.localState?{state:t.localState,mode:t.localMode}:{state:t,mode:$}},blankLine:l,getType:f,fold:"markdown"};return $},"xml"),t.defineMIME("text/x-markdown","markdown")}),function(){function t(t,e){if(t!==e){var n=t===t,r=e===e;if(t>e||!n||"undefined"==typeof t&&r)return 1;if(e>t||!r||"undefined"==typeof e&&n)return-1}return 0}function e(t,e,n){if(e!==e)return h(t,n);for(var r=n-1,i=t.length;++r<i;)if(t[r]===e)return r;return-1}function n(t){return"function"==typeof t||!1}function r(t){return"string"==typeof t?t:null==t?"":t+""}function i(t){return t.charCodeAt(0)}function o(t,e){for(var n=-1,r=t.length;++n<r&&e.indexOf(t.charAt(n))>-1;);return n
}function l(t,e){for(var n=t.length;n--&&e.indexOf(t.charAt(n))>-1;);return n}function a(e,n){return t(e.criteria,n.criteria)||e.index-n.index}function s(e,n,r){for(var i=-1,o=e.criteria,l=n.criteria,a=o.length,s=r.length;++i<a;){var u=t(o[i],l[i]);if(u)return i>=s?u:u*(r[i]?1:-1)}return e.index-n.index}function u(t){return Re[t]}function c(t){return ze[t]}function f(t){return"\\"+je[t]}function h(t,e,n){for(var r=t.length,i=e+(n?0:-1);n?i--:++i<r;){var o=t[i];if(o!==o)return i}return-1}function d(t){return t&&"object"==typeof t||!1}function p(t){return 160>=t&&t>=9&&13>=t||32==t||160==t||5760==t||6158==t||t>=8192&&(8202>=t||8232==t||8233==t||8239==t||8287==t||12288==t||65279==t)}function g(t,e){for(var n=-1,r=t.length,i=-1,o=[];++n<r;)t[n]===e&&(t[n]=P,o[++i]=n);return o}function v(t,e){for(var n,r=-1,i=t.length,o=-1,l=[];++r<i;){var a=t[r],s=e?e(a,r,t):a;r&&n===s||(n=s,l[++o]=a)}return l}function m(t){for(var e=-1,n=t.length;++e<n&&p(t.charCodeAt(e)););return e}function y(t){for(var e=t.length;e--&&p(t.charCodeAt(e)););return e}function b(t){return Pe[t]}function w(p){function V(t){if(d(t)&&!ns(t)&&!(t instanceof Re)){if(t instanceof Q)return t;if(la.call(t,"__chain__")&&la.call(t,"__wrapped__"))return zr(t)}return new Q(t)}function Z(){}function Q(t,e,n){this.__wrapped__=t,this.__actions__=n||[],this.__chain__=!!e}function Re(t){this.__wrapped__=t,this.__actions__=null,this.__dir__=1,this.__dropCount__=0,this.__filtered__=!1,this.__iteratees__=null,this.__takeCount__=Fa,this.__views__=null}function ze(){var t=this.__actions__,e=this.__iteratees__,n=this.__views__,r=new Re(this.__wrapped__);return r.__actions__=t?Je(t):null,r.__dir__=this.__dir__,r.__filtered__=this.__filtered__,r.__iteratees__=e?Je(e):null,r.__takeCount__=this.__takeCount__,r.__views__=n?Je(n):null,r}function Pe(){if(this.__filtered__){var t=new Re(this);t.__dir__=-1,t.__filtered__=!0}else t=this.clone(),t.__dir__*=-1;return t}function Be(){var t=this.__wrapped__.value();if(!ns(t))return Jn(t,this.__actions__);var e=this.__dir__,n=0>e,r=Cr(0,t.length,this.__views__),i=r.start,o=r.end,l=o-i,a=n?o:i-1,s=Na(l,this.__takeCount__),u=this.__iteratees__,c=u?u.length:0,f=0,h=[];t:for(;l--&&s>f;){a+=e;for(var d=-1,p=t[a];++d<c;){var g=u[d],v=g.iteratee,m=g.type;if(m==F){if(g.done&&(n?a>g.index:a<g.index)&&(g.count=0,g.done=!1),g.index=a,!g.done){var y=g.limit;if(!(g.done=y>-1?g.count++>=y:!v(p)))continue t}}else{var b=v(p);if(m==R)p=b;else if(!b){if(m==I)continue t;break t}}}h[f++]=p}return h}function je(){this.__data__={}}function Ue(t){return this.has(t)&&delete this.__data__[t]}function Ge(t){return"__proto__"==t?x:this.__data__[t]}function qe(t){return"__proto__"!=t&&la.call(this.__data__,t)}function Ke(t,e){return"__proto__"!=t&&(this.__data__[t]=e),this}function Ve(t){var e=t?t.length:0;for(this.data={hash:_a(null),set:new ba};e--;)this.push(t[e])}function Ye(t,e){var n=t.data,r="string"==typeof e||No(e)?n.set.has(e):n.hash[e];return r?0:-1}function Ze(t){var e=this.data;"string"==typeof t||No(t)?e.set.add(t):e.hash[t]=!0}function Je(t,e){var n=-1,r=t.length;for(e||(e=Gl(r));++n<r;)e[n]=t[n];return e}function Qe(t,e){for(var n=-1,r=t.length;++n<r&&e(t[n],n,t)!==!1;);return t}function tn(t,e){for(var n=t.length;n--&&e(t[n],n,t)!==!1;);return t}function en(t,e){for(var n=-1,r=t.length;++n<r;)if(!e(t[n],n,t))return!1;return!0}function nn(t,e){for(var n=-1,r=t.length,i=-1,o=[];++n<r;){var l=t[n];e(l,n,t)&&(o[++i]=l)}return o}function rn(t,e){for(var n=-1,r=t.length,i=Gl(r);++n<r;)i[n]=e(t[n],n,t);return i}function on(t){for(var e=-1,n=t.length,r=Ea;++e<n;){var i=t[e];i>r&&(r=i)}return r}function ln(t){for(var e=-1,n=t.length,r=Fa;++e<n;){var i=t[e];r>i&&(r=i)}return r}function an(t,e,n,r){var i=-1,o=t.length;for(r&&o&&(n=t[++i]);++i<o;)n=e(n,t[i],i,t);return n}function sn(t,e,n,r){var i=t.length;for(r&&i&&(n=t[--i]);i--;)n=e(n,t[i],i,t);return n}function un(t,e){for(var n=-1,r=t.length;++n<r;)if(e(t[n],n,t))return!0;return!1}function cn(t,e){return"undefined"==typeof t?e:t}function fn(t,e,n,r){return"undefined"!=typeof t&&la.call(r,n)?t:e}function hn(t,e,n){var r=as(e);if(!n)return pn(e,t,r);for(var i=-1,o=r.length;++i<o;){var l=r[i],a=t[l],s=n(a,e[l],l,t,e);(s===s?s===a:a!==a)&&("undefined"!=typeof a||l in t)||(t[l]=s)}return t}function dn(t,e){for(var n=-1,r=t.length,i=Ar(r),o=e.length,l=Gl(o);++n<o;){var a=e[n];i?(a=parseFloat(a),l[n]=Tr(a,r)?t[a]:x):l[n]=t[a]}return l}function pn(t,e,n){n||(n=e,e={});for(var r=-1,i=n.length;++r<i;){var o=n[r];e[o]=t[o]}return e}function gn(t,e){for(var n=-1,r=e.length;++n<r;){var i=e[n];t[i]=gr(t[i],S,t)}return t}function vn(t,e,n){var r=typeof t;return"function"==r?"undefined"!=typeof e&&_r(t)?er(t,e,n):t:null==t?Ol:"object"==r?Rn(t):"undefined"==typeof e?jn(t+""):zn(t+"",e)}function mn(t,e,n,r,i,o,l){var a;if(n&&(a=i?n(t,r,i):n(t)),"undefined"!=typeof a)return a;if(!No(t))return t;var s=ns(t);if(s){if(a=Sr(t),!e)return Je(t,a)}else{var u=sa.call(t),c=u==K;if(u!=X&&u!=B&&(!c||i))return Fe[u]?Lr(t,u,e):i?t:{};if(a=kr(c?{}:t),!e)return pn(t,a,as(t))}o||(o=[]),l||(l=[]);for(var f=o.length;f--;)if(o[f]==t)return l[f];return o.push(t),l.push(a),(s?Qe:Nn)(t,function(r,i){a[i]=mn(r,e,n,i,t,o,l)}),a}function yn(t,e,n,r){if("function"!=typeof t)throw new Ql(z);return wa(function(){t.apply(x,Kn(n,r))},e)}function bn(t,n){var r=t?t.length:0,i=[];if(!r)return i;var o=-1,l=xr(),a=l==e,s=a&&n.length>=200?Ka(n):null,u=n.length;s&&(l=Ye,a=!1,n=s);t:for(;++o<r;){var c=t[o];if(a&&c===c){for(var f=u;f--;)if(n[f]===c)continue t;i.push(c)}else l(n,c,0)<0&&i.push(c)}return i}function wn(t,e){var n=t?t.length:0;if(!Ar(n))return Nn(t,e);for(var r=-1,i=Rr(t);++r<n&&e(i[r],r,i)!==!1;);return t}function xn(t,e){var n=t?t.length:0;if(!Ar(n))return On(t,e);for(var r=Rr(t);n--&&e(r[n],n,r)!==!1;);return t}function Cn(t,e){var n=!0;return wn(t,function(t,r,i){return n=!!e(t,r,i)}),n}function Sn(t,e,n,r){var i=t.length;for(n=null==n?0:+n||0,0>n&&(n=-n>i?0:i+n),r="undefined"==typeof r||r>i?i:+r||0,0>r&&(r+=i),i=n>r?0:r>>>0,n>>>=0;i>n;)t[n++]=e;return t}function kn(t,e){var n=[];return wn(t,function(t,r,i){e(t,r,i)&&n.push(t)}),n}function Ln(t,e,n,r){var i;return n(t,function(t,n,o){return e(t,n,o)?(i=r?n:t,!1):void 0}),i}function _n(t,e,n,r){for(var i=r-1,o=t.length,l=-1,a=[];++i<o;){var s=t[i];if(d(s)&&Ar(s.length)&&(ns(s)||So(s))){e&&(s=_n(s,e,n,0));var u=-1,c=s.length;for(a.length+=c;++u<c;)a[++l]=s[u]}else n||(a[++l]=s)}return a}function Tn(t,e,n){for(var r=-1,i=Rr(t),o=n(t),l=o.length;++r<l;){var a=o[r];if(e(i[a],a,i)===!1)break}return t}function Mn(t,e,n){for(var r=Rr(t),i=n(t),o=i.length;o--;){var l=i[o];if(e(r[l],l,r)===!1)break}return t}function An(t,e){return Tn(t,e,Qo)}function Nn(t,e){return Tn(t,e,as)}function On(t,e){return Mn(t,e,as)}function Wn(t,e){for(var n=-1,r=e.length,i=-1,o=[];++n<r;){var l=e[n];is(t[l])&&(o[++i]=l)}return o}function Dn(t,e,n){var r=-1,i="function"==typeof e,o=t?t.length:0,l=Ar(o)?Gl(o):[];return wn(t,function(t){var o=i?e:null!=t&&t[e];l[++r]=o?o.apply(t,n):x}),l}function Hn(t,e,n,r,i,o){if(t===e)return 0!==t||1/t==1/e;var l=typeof t,a=typeof e;return"function"!=l&&"object"!=l&&"function"!=a&&"object"!=a||null==t||null==e?t!==t&&e!==e:En(t,e,Hn,n,r,i,o)}function En(t,e,n,r,i,o,l){var a=ns(t),s=ns(e),u=j,c=j;a||(u=sa.call(t),u==B?u=X:u!=X&&(a=Ro(t))),s||(c=sa.call(e),c==B?c=X:c!=X&&(s=Ro(e)));var f=u==X,h=c==X,d=u==c;if(d&&!a&&!f)return mr(t,e,u);var p=f&&la.call(t,"__wrapped__"),g=h&&la.call(e,"__wrapped__");if(p||g)return n(p?t.value():t,g?e.value():e,r,i,o,l);if(!d)return!1;o||(o=[]),l||(l=[]);for(var v=o.length;v--;)if(o[v]==t)return l[v]==e;o.push(t),l.push(e);var m=(a?vr:yr)(t,e,n,r,i,o,l);return o.pop(),l.pop(),m}function Fn(t,e,n,r,i){var o=e.length;if(null==t)return!o;for(var l=-1,a=!i;++l<o;)if(a&&r[l]?n[l]!==t[e[l]]:!la.call(t,e[l]))return!1;for(l=-1;++l<o;){var s=e[l];if(a&&r[l])var u=la.call(t,s);else{var c=t[s],f=n[l];u=i?i(c,f,s):x,"undefined"==typeof u&&(u=Hn(f,c,i,!0))}if(!u)return!1}return!0}function In(t,e){var n=[];return wn(t,function(t,r,i){n.push(e(t,r,i))}),n}function Rn(t){var e=as(t),n=e.length;if(1==n){var r=e[0],i=t[r];if(Nr(i))return function(t){return null!=t&&t[r]===i&&la.call(t,r)}}for(var o=Gl(n),l=Gl(n);n--;)i=t[e[n]],o[n]=i,l[n]=Nr(i);return function(t){return Fn(t,e,o,l)}}function zn(t,e){return Nr(e)?function(n){return null!=n&&n[t]===e}:function(n){return null!=n&&Hn(e,n[t],null,!0)}}function Pn(t,e,n,r,i){if(!No(t))return t;var o=Ar(e.length)&&(ns(e)||Ro(e));return(o?Qe:Nn)(e,function(e,l,a){if(d(e))return r||(r=[]),i||(i=[]),Bn(t,a,l,Pn,n,r,i);var s=t[l],u=n?n(s,e,l,t,a):x,c="undefined"==typeof u;c&&(u=e),!o&&"undefined"==typeof u||!c&&(u===u?u===s:s!==s)||(t[l]=u)}),t}function Bn(t,e,n,r,i,o,l){for(var a=o.length,s=e[n];a--;)if(o[a]==s)return void(t[n]=l[a]);var u=t[n],c=i?i(u,s,n,t,e):x,f="undefined"==typeof c;f&&(c=s,Ar(s.length)&&(ns(s)||Ro(s))?c=ns(u)?u:u?Je(u):[]:os(s)||So(s)?c=So(u)?Bo(u):os(u)?u:{}:f=!1),o.push(s),l.push(c),f?t[n]=r(c,s,i,o,l):(c===c?c!==u:u===u)&&(t[n]=c)}function jn(t){return function(e){return null==e?x:e[t]}}function Un(e,n){var r=n.length,i=dn(e,n);for(n.sort(t);r--;){var o=parseFloat(n[r]);if(o!=l&&Tr(o)){var l=o;xa.call(e,o,1)}}return i}function Gn(t,e){return t+ga(Ha()*(e-t+1))}function qn(t,e,n,r,i){return i(t,function(t,i,o){n=r?(r=!1,t):e(n,t,i,o)}),n}function Kn(t,e,n){var r=-1,i=t.length;e=null==e?0:+e||0,0>e&&(e=-e>i?0:i+e),n="undefined"==typeof n||n>i?i:+n||0,0>n&&(n+=i),i=e>n?0:n-e>>>0,e>>>=0;for(var o=Gl(i);++r<i;)o[r]=t[r+e];return o}function Vn(t,e){var n;return wn(t,function(t,r,i){return n=e(t,r,i),!n}),!!n}function $n(t,e){var n=t.length;for(t.sort(e);n--;)t[n]=t[n].value;return t}function Xn(t,e,n){var r=-1,i=t.length,o=Ar(i)?Gl(i):[];return wn(t,function(t){for(var n=e.length,i=Gl(n);n--;)i[n]=null==t?x:t[e[n]];o[++r]={criteria:i,index:r,value:t}}),$n(o,function(t,e){return s(t,e,n)})}function Yn(t,n){var r=-1,i=xr(),o=t.length,l=i==e,a=l&&o>=200,s=a?Ka():null,u=[];s?(i=Ye,l=!1):(a=!1,s=n?[]:u);t:for(;++r<o;){var c=t[r],f=n?n(c,r,t):c;if(l&&c===c){for(var h=s.length;h--;)if(s[h]===f)continue t;n&&s.push(f),u.push(c)}else i(s,f,0)<0&&((n||a)&&s.push(f),u.push(c))}return u}function Zn(t,e){for(var n=-1,r=e.length,i=Gl(r);++n<r;)i[n]=t[e[n]];return i}function Jn(t,e){var n=t;n instanceof Re&&(n=n.value());for(var r=-1,i=e.length;++r<i;){var o=[n],l=e[r];ma.apply(o,l.args),n=l.func.apply(l.thisArg,o)}return n}function Qn(t,e,n){var r=0,i=t?t.length:r;if("number"==typeof e&&e===e&&za>=i){for(;i>r;){var o=r+i>>>1,l=t[o];(n?e>=l:e>l)?r=o+1:i=o}return i}return tr(t,e,Ol,n)}function tr(t,e,n,r){e=n(e);for(var i=0,o=t?t.length:0,l=e!==e,a="undefined"==typeof e;o>i;){var s=ga((i+o)/2),u=n(t[s]),c=u===u;if(l)var f=c||r;else f=a?c&&(r||"undefined"!=typeof u):r?e>=u:e>u;f?i=s+1:o=s}return Na(o,Ra)}function er(t,e,n){if("function"!=typeof t)return Ol;if("undefined"==typeof e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 3:return function(n,r,i){return t.call(e,n,r,i)};case 4:return function(n,r,i,o){return t.call(e,n,r,i,o)};case 5:return function(n,r,i,o,l){return t.call(e,n,r,i,o,l)}}return function(){return t.apply(e,arguments)}}function nr(t){return ha.call(t,0)}function rr(t,e,n){for(var r=n.length,i=-1,o=Aa(t.length-r,0),l=-1,a=e.length,s=Gl(o+a);++l<a;)s[l]=e[l];for(;++i<r;)s[n[i]]=t[i];for(;o--;)s[l++]=t[i++];return s}function ir(t,e,n){for(var r=-1,i=n.length,o=-1,l=Aa(t.length-i,0),a=-1,s=e.length,u=Gl(l+s);++o<l;)u[o]=t[o];for(var c=o;++a<s;)u[c+a]=e[a];for(;++r<i;)u[c+n[r]]=t[o++];return u}function or(t,e){return function(n,r,i){var o=e?e():{};if(r=wr(r,i,3),ns(n))for(var l=-1,a=n.length;++l<a;){var s=n[l];t(o,s,r(s,l,n),n)}else wn(n,function(e,n,i){t(o,e,r(e,n,i),i)});return o}}function lr(t){return function(){var e=arguments,n=e.length,r=e[0];if(2>n||null==r)return r;var i=e[n-2],o=e[n-1],l=e[3];n>3&&"function"==typeof i?(i=er(i,o,5),n-=2):(i=n>2&&"function"==typeof o?o:null,n-=i?1:0),l&&Mr(e[1],e[2],l)&&(i=3==n?null:i,n=2);for(var a=0;++a<n;){var s=e[a];s&&t(r,s,i)}return r}}function ar(t,e){function n(){var i=this&&this!==$e&&this instanceof n?r:t;return i.apply(e,arguments)}var r=cr(t);return n}function sr(t){return function(){var e=arguments.length,n=e,r=t?e-1:0;if(!e)return function(){return arguments[0]};for(var i=Gl(e);n--;)if(i[n]=arguments[n],"function"!=typeof i[n])throw new Ql(z);return function(){for(var n=r,o=i[n].apply(this,arguments);t?n--:++n<e;)o=i[n].call(this,o);return o}}}function ur(t){return function(e){for(var n=-1,r=Tl(fl(e)),i=r.length,o="";++n<i;)o=t(o,r[n],n);return o}}function cr(t){return function(){var e=Ga(t.prototype),n=t.apply(e,arguments);return No(n)?n:e}}function fr(t,e){return function(n,r,o){o&&Mr(n,r,o)&&(r=null);var l=wr(),a=null==r;if(l===vn&&a||(a=!1,r=l(r,o,3)),a){var s=ns(n);if(s||!Io(n))return t(s?n:Ir(n));r=i}return br(n,r,e)}}function hr(t,e,n,r,i,o,l,a,s,u){function c(){for(var w=arguments.length,x=w,C=Gl(w);x--;)C[x]=arguments[x];if(r&&(C=rr(C,r,i)),o&&(C=ir(C,o,l)),p||m){var L=c.placeholder,_=g(C,L);if(w-=_.length,u>w){var T=a?Je(a):null,N=Aa(u-w,0),O=p?_:null,W=p?null:_,D=p?C:null,H=p?null:C;e|=p?M:A,e&=~(p?A:M),v||(e&=~(S|k));var E=hr(t,e,n,D,O,H,W,T,s,N);return E.placeholder=L,E}}var F=h?n:this;d&&(t=F[b]),a&&(C=Hr(C,a)),f&&s<C.length&&(C.length=s);var I=this&&this!==$e&&this instanceof c?y||cr(t):t;return I.apply(F,C)}var f=e&O,h=e&S,d=e&k,p=e&_,v=e&L,m=e&T,y=!d&&cr(t),b=t;return c}function dr(t,e,n){var r=t.length;if(e=+e,r>=e||!Ta(e))return"";var i=e-r;return n=null==n?" ":n+"",bl(n,da(i/n.length)).slice(0,i)}function pr(t,e,n,r){function i(){for(var e=-1,a=arguments.length,s=-1,u=r.length,c=Gl(a+u);++s<u;)c[s]=r[s];for(;a--;)c[s++]=arguments[++e];var f=this&&this!==$e&&this instanceof i?l:t;return f.apply(o?n:this,c)}var o=e&S,l=cr(t);return i}function gr(t,e,n,r,i,o,l,a){var s=e&k;if(!s&&"function"!=typeof t)throw new Ql(z);var u=r?r.length:0;if(u||(e&=~(M|A),r=i=null),u-=i?i.length:0,e&A){var c=r,f=i;r=i=null}var h=!s&&Va(t),d=[t,e,n,r,i,c,f,o,l,a];if(h&&h!==!0&&(Or(d,h),e=d[1],a=d[9]),d[9]=null==a?s?0:t.length:Aa(a-u,0)||0,e==S)var p=ar(d[0],d[2]);else p=e!=M&&e!=(S|M)||d[4].length?hr.apply(x,d):pr.apply(x,d);var g=h?qa:$a;return g(p,d)}function vr(t,e,n,r,i,o,l){var a=-1,s=t.length,u=e.length,c=!0;if(s!=u&&!(i&&u>s))return!1;for(;c&&++a<s;){var f=t[a],h=e[a];if(c=x,r&&(c=i?r(h,f,a):r(f,h,a)),"undefined"==typeof c)if(i)for(var d=u;d--&&(h=e[d],!(c=f&&f===h||n(f,h,r,i,o,l))););else c=f&&f===h||n(f,h,r,i,o,l)}return!!c}function mr(t,e,n){switch(n){case U:case G:return+t==+e;case q:return t.name==e.name&&t.message==e.message;case $:return t!=+t?e!=+e:0==t?1/t==1/e:t==+e;case Y:case J:return t==e+""}return!1}function yr(t,e,n,r,i,o,l){var a=as(t),s=a.length,u=as(e),c=u.length;if(s!=c&&!i)return!1;for(var f,h=-1;++h<s;){var d=a[h],p=la.call(e,d);if(p){var g=t[d],v=e[d];p=x,r&&(p=i?r(v,g,d):r(g,v,d)),"undefined"==typeof p&&(p=g&&g===v||n(g,v,r,i,o,l))}if(!p)return!1;f||(f="constructor"==d)}if(!f){var m=t.constructor,y=e.constructor;if(m!=y&&"constructor"in t&&"constructor"in e&&!("function"==typeof m&&m instanceof m&&"function"==typeof y&&y instanceof y))return!1}return!0}function br(t,e,n){var r=n?Fa:Ea,i=r,o=i;return wn(t,function(t,l,a){var s=e(t,l,a);((n?i>s:s>i)||s===r&&s===o)&&(i=s,o=t)}),o}function wr(t,e,n){var r=V.callback||Al;return r=r===Al?vn:r,n?r(t,e,n):r}function xr(t,n,r){var i=V.indexOf||Qr;return i=i===Qr?e:i,t?i(t,n,r):i}function Cr(t,e,n){for(var r=-1,i=n?n.length:0;++r<i;){var o=n[r],l=o.size;switch(o.type){case"drop":t+=l;break;case"dropRight":e-=l;break;case"take":e=Na(e,t+l);break;case"takeRight":t=Aa(t,e-l)}}return{start:t,end:e}}function Sr(t){var e=t.length,n=new t.constructor(e);return e&&"string"==typeof t[0]&&la.call(t,"index")&&(n.index=t.index,n.input=t.input),n}function kr(t){var e=t.constructor;return"function"==typeof e&&e instanceof e||(e=Yl),new e}function Lr(t,e,n){var r=t.constructor;switch(e){case te:return nr(t);case U:case G:return new r(+t);case ee:case ne:case re:case ie:case oe:case le:case ae:case se:case ue:var i=t.buffer;return new r(n?nr(i):i,t.byteOffset,t.length);case $:case J:return new r(t);case Y:var o=new r(t.source,xe.exec(t));o.lastIndex=t.lastIndex}return o}function _r(t){var e=V.support,n=!(e.funcNames?t.name:e.funcDecomp);if(!n){var r=ia.call(t);e.funcNames||(n=!Ce.test(r)),n||(n=Ae.test(r)||Do(t),qa(t,n))}return n}function Tr(t,e){return t=+t,e=null==e?Ba:e,t>-1&&t%1==0&&e>t}function Mr(t,e,n){if(!No(n))return!1;var r=typeof e;if("number"==r)var i=n.length,o=Ar(i)&&Tr(e,i);else o="string"==r&&e in n;if(o){var l=n[e];return t===t?t===l:l!==l}return!1}function Ar(t){return"number"==typeof t&&t>-1&&t%1==0&&Ba>=t}function Nr(t){return t===t&&(0===t?1/t>0:!No(t))}function Or(t,e){var n=t[1],r=e[1],i=n|r,o=O|N,l=S|k,a=o|l|L|T,s=n&O&&!(r&O),u=n&N&&!(r&N),c=(u?t:e)[7],f=(s?t:e)[8],h=!(n>=N&&r>l||n>l&&r>=N),d=i>=o&&a>=i&&(N>n||(u||s)&&c.length<=f);if(!h&&!d)return t;r&S&&(t[2]=e[2],i|=n&S?0:L);var p=e[3];if(p){var v=t[3];t[3]=v?rr(v,p,e[4]):Je(p),t[4]=v?g(t[3],P):Je(e[4])}return p=e[5],p&&(v=t[5],t[5]=v?ir(v,p,e[6]):Je(p),t[6]=v?g(t[5],P):Je(e[6])),p=e[7],p&&(t[7]=Je(p)),r&O&&(t[8]=null==t[8]?e[8]:Na(t[8],e[8])),null==t[9]&&(t[9]=e[9]),t[0]=e[0],t[1]=i,t}function Wr(t,e){t=Rr(t);for(var n=-1,r=e.length,i={};++n<r;){var o=e[n];o in t&&(i[o]=t[o])}return i}function Dr(t,e){var n={};return An(t,function(t,r,i){e(t,r,i)&&(n[r]=t)}),n}function Hr(t,e){for(var n=t.length,r=Na(e.length,n),i=Je(t);r--;){var o=e[r];t[r]=Tr(o,n)?i[o]:x}return t}function Er(t){{var e;V.support}if(!d(t)||sa.call(t)!=X||!la.call(t,"constructor")&&(e=t.constructor,"function"==typeof e&&!(e instanceof e)))return!1;var n;return An(t,function(t,e){n=e}),"undefined"==typeof n||la.call(t,n)}function Fr(t){for(var e=Qo(t),n=e.length,r=n&&t.length,i=V.support,o=r&&Ar(r)&&(ns(t)||i.nonEnumArgs&&So(t)),l=-1,a=[];++l<n;){var s=e[l];(o&&Tr(s,r)||la.call(t,s))&&a.push(s)}return a}function Ir(t){return null==t?[]:Ar(t.length)?No(t)?t:Yl(t):ll(t)}function Rr(t){return No(t)?t:Yl(t)}function zr(t){return t instanceof Re?t.clone():new Q(t.__wrapped__,t.__chain__,Je(t.__actions__))}function Pr(t,e,n){e=(n?Mr(t,e,n):null==e)?1:Aa(+e||1,1);for(var r=0,i=t?t.length:0,o=-1,l=Gl(da(i/e));i>r;)l[++o]=Kn(t,r,r+=e);return l}function Br(t){for(var e=-1,n=t?t.length:0,r=-1,i=[];++e<n;){var o=t[e];o&&(i[++r]=o)}return i}function jr(){for(var t=arguments,e=-1,n=t.length;++e<n;){var r=t[e];if(ns(r)||So(r))break}return bn(r,_n(t,!1,!0,++e))}function Ur(t,e,n){var r=t?t.length:0;return r?((n?Mr(t,e,n):null==e)&&(e=1),Kn(t,0>e?0:e)):[]}function Gr(t,e,n){var r=t?t.length:0;return r?((n?Mr(t,e,n):null==e)&&(e=1),e=r-(+e||0),Kn(t,0,0>e?0:e)):[]}function qr(t,e,n){var r=t?t.length:0;if(!r)return[];for(e=wr(e,n,3);r--&&e(t[r],r,t););return Kn(t,0,r+1)}function Kr(t,e,n){var r=t?t.length:0;if(!r)return[];var i=-1;for(e=wr(e,n,3);++i<r&&e(t[i],i,t););return Kn(t,i)}function Vr(t,e,n,r){var i=t?t.length:0;return i?(n&&"number"!=typeof n&&Mr(t,e,n)&&(n=0,r=i),Sn(t,e,n,r)):[]}function $r(t,e,n){var r=-1,i=t?t.length:0;for(e=wr(e,n,3);++r<i;)if(e(t[r],r,t))return r;return-1}function Xr(t,e,n){var r=t?t.length:0;for(e=wr(e,n,3);r--;)if(e(t[r],r,t))return r;return-1}function Yr(t){return t?t[0]:x}function Zr(t,e,n){var r=t?t.length:0;return n&&Mr(t,e,n)&&(e=!1),r?_n(t,e,!1,0):[]}function Jr(t){var e=t?t.length:0;return e?_n(t,!0,!1,0):[]}function Qr(t,n,r){var i=t?t.length:0;if(!i)return-1;if("number"==typeof r)r=0>r?Aa(i+r,0):r;else if(r){var o=Qn(t,n),l=t[o];return(n===n?n===l:l!==l)?o:-1}return e(t,n,r||0)}function ti(t){return Gr(t,1)}function ei(){for(var t=[],n=-1,r=arguments.length,i=[],o=xr(),l=o==e;++n<r;){var a=arguments[n];(ns(a)||So(a))&&(t.push(a),i.push(l&&a.length>=120?Ka(n&&a):null))}r=t.length;var s=t[0],u=-1,c=s?s.length:0,f=[],h=i[0];t:for(;++u<c;)if(a=s[u],(h?Ye(h,a):o(f,a,0))<0){for(n=r;--n;){var d=i[n];if((d?Ye(d,a):o(t[n],a,0))<0)continue t}h&&h.push(a),f.push(a)}return f}function ni(t){var e=t?t.length:0;return e?t[e-1]:x}function ri(t,e,n){var r=t?t.length:0;if(!r)return-1;var i=r;if("number"==typeof n)i=(0>n?Aa(r+n,0):Na(n||0,r-1))+1;else if(n){i=Qn(t,e,!0)-1;var o=t[i];return(e===e?e===o:o!==o)?i:-1}if(e!==e)return h(t,i,!0);for(;i--;)if(t[i]===e)return i;return-1}function ii(){var t=arguments,e=t[0];if(!e||!e.length)return e;for(var n=0,r=xr(),i=t.length;++n<i;)for(var o=0,l=t[n];(o=r(e,l,o))>-1;)xa.call(e,o,1);return e}function oi(t){return Un(t||[],_n(arguments,!1,!1,1))}function li(t,e,n){var r=-1,i=t?t.length:0,o=[];for(e=wr(e,n,3);++r<i;){var l=t[r];e(l,r,t)&&(o.push(l),xa.call(t,r--,1),i--)}return o}function ai(t){return Ur(t,1)}function si(t,e,n){var r=t?t.length:0;return r?(n&&"number"!=typeof n&&Mr(t,e,n)&&(e=0,n=r),Kn(t,e,n)):[]}function ui(t,e,n,r){var i=wr(n);return i===vn&&null==n?Qn(t,e):tr(t,e,i(n,r,1))}function ci(t,e,n,r){var i=wr(n);return i===vn&&null==n?Qn(t,e,!0):tr(t,e,i(n,r,1),!0)}function fi(t,e,n){var r=t?t.length:0;return r?((n?Mr(t,e,n):null==e)&&(e=1),Kn(t,0,0>e?0:e)):[]}function hi(t,e,n){var r=t?t.length:0;return r?((n?Mr(t,e,n):null==e)&&(e=1),e=r-(+e||0),Kn(t,0>e?0:e)):[]}function di(t,e,n){var r=t?t.length:0;if(!r)return[];for(e=wr(e,n,3);r--&&e(t[r],r,t););return Kn(t,r+1)}function pi(t,e,n){var r=t?t.length:0;if(!r)return[];var i=-1;for(e=wr(e,n,3);++i<r&&e(t[i],i,t););return Kn(t,0,i)}function gi(){return Yn(_n(arguments,!1,!0,0))}function vi(t,n,r,i){var o=t?t.length:0;if(!o)return[];null!=n&&"boolean"!=typeof n&&(i=r,r=Mr(t,n,i)?null:n,n=!1);var l=wr();return(l!==vn||null!=r)&&(r=l(r,i,3)),n&&xr()==e?v(t,r):Yn(t,r)}function mi(t){for(var e=-1,n=(t&&t.length&&on(rn(t,oa)))>>>0,r=Gl(n);++e<n;)r[e]=rn(t,jn(e));return r}function yi(t){return bn(t,Kn(arguments,1))}function bi(){for(var t=-1,e=arguments.length;++t<e;){var n=arguments[t];if(ns(n)||So(n))var r=r?bn(r,n).concat(bn(n,r)):n}return r?Yn(r):[]}function wi(){for(var t=arguments.length,e=Gl(t);t--;)e[t]=arguments[t];return mi(e)}function xi(t,e){var n=-1,r=t?t.length:0,i={};for(!r||e||ns(t[0])||(e=[]);++n<r;){var o=t[n];e?i[o]=e[n]:o&&(i[o[0]]=o[1])}return i}function Ci(t){var e=V(t);return e.__chain__=!0,e}function Si(t,e,n){return e.call(n,t),t}function ki(t,e,n){return e.call(n,t)}function Li(){return Ci(this)}function _i(){return new Q(this.value(),this.__chain__)}function Ti(t){for(var e,n=this;n instanceof Z;){var r=zr(n);e?i.__wrapped__=r:e=r;var i=r;n=n.__wrapped__}return i.__wrapped__=t,e}function Mi(){var t=this.__wrapped__;return t instanceof Re?(this.__actions__.length&&(t=new Re(this)),new Q(t.reverse(),this.__chain__)):this.thru(function(t){return t.reverse()})}function Ai(){return this.value()+""}function Ni(){return Jn(this.__wrapped__,this.__actions__)}function Oi(t){var e=t?t.length:0;return Ar(e)&&(t=Ir(t)),dn(t,_n(arguments,!1,!1,1))}function Wi(t,e,n){var r=ns(t)?en:Cn;return("function"!=typeof e||"undefined"!=typeof n)&&(e=wr(e,n,3)),r(t,e)}function Di(t,e,n){var r=ns(t)?nn:kn;return e=wr(e,n,3),r(t,e)}function Hi(t,e,n){if(ns(t)){var r=$r(t,e,n);return r>-1?t[r]:x}return e=wr(e,n,3),Ln(t,e,wn)}function Ei(t,e,n){return e=wr(e,n,3),Ln(t,e,xn)}function Fi(t,e){return Hi(t,Rn(e))}function Ii(t,e,n){return"function"==typeof e&&"undefined"==typeof n&&ns(t)?Qe(t,e):wn(t,er(e,n,3))}function Ri(t,e,n){return"function"==typeof e&&"undefined"==typeof n&&ns(t)?tn(t,e):xn(t,er(e,n,3))}function zi(t,e,n){var r=t?t.length:0;return Ar(r)||(t=ll(t),r=t.length),r?(n="number"==typeof n?0>n?Aa(r+n,0):n||0:0,"string"==typeof t||!ns(t)&&Io(t)?r>n&&t.indexOf(e,n)>-1:xr(t,e,n)>-1):!1}function Pi(t,e){return Dn(t,e,Kn(arguments,2))}function Bi(t,e,n){var r=ns(t)?rn:In;return e=wr(e,n,3),r(t,e)}function ji(t,e){return Bi(t,jn(e))}function Ui(t,e,n,r){var i=ns(t)?an:qn;return i(t,wr(e,r,4),n,arguments.length<3,wn)}function Gi(t,e,n,r){var i=ns(t)?sn:qn;return i(t,wr(e,r,4),n,arguments.length<3,xn)}function qi(t,e,n){var r=ns(t)?nn:kn;return e=wr(e,n,3),r(t,function(t,n,r){return!e(t,n,r)})}function Ki(t,e,n){if(n?Mr(t,e,n):null==e){t=Ir(t);var r=t.length;return r>0?t[Gn(0,r-1)]:x}var i=Vi(t);return i.length=Na(0>e?0:+e||0,i.length),i}function Vi(t){t=Ir(t);for(var e=-1,n=t.length,r=Gl(n);++e<n;){var i=Gn(0,e);e!=i&&(r[e]=r[i]),r[i]=t[e]}return r}function $i(t){var e=t?t.length:0;return Ar(e)?e:as(t).length}function Xi(t,e,n){var r=ns(t)?un:Vn;return("function"!=typeof e||"undefined"!=typeof n)&&(e=wr(e,n,3)),r(t,e)}function Yi(t,e,n){if(null==t)return[];var r=-1,i=t.length,o=Ar(i)?Gl(i):[];return n&&Mr(t,e,n)&&(e=null),e=wr(e,n,3),wn(t,function(t,n,i){o[++r]={criteria:e(t,n,i),index:r,value:t}}),$n(o,a)}function Zi(t){if(null==t)return[];var e=arguments,n=e[3];return n&&Mr(e[1],e[2],n)&&(e=[t,e[1]]),Xn(t,_n(e,!1,!1,1),[])}function Ji(t,e,n,r){return null==t?[]:(r&&Mr(e,n,r)&&(n=null),ns(e)||(e=null==e?[]:[e]),ns(n)||(n=null==n?[]:[n]),Xn(t,e,n))}function Qi(t,e){return Di(t,Rn(e))}function to(t,e){if("function"!=typeof e){if("function"!=typeof t)throw new Ql(z);var n=t;t=e,e=n}return t=Ta(t=+t)?t:0,function(){return--t<1?e.apply(this,arguments):void 0}}function eo(t,e,n){return n&&Mr(t,e,n)&&(e=null),e=t&&null==e?t.length:Aa(+e||0,0),gr(t,O,null,null,null,null,e)}function no(t,e){var n;if("function"!=typeof e){if("function"!=typeof t)throw new Ql(z);var r=t;t=e,e=r}return function(){return--t>0?n=e.apply(this,arguments):e=null,n}}function ro(t,e){var n=S;if(arguments.length>2){var r=Kn(arguments,2),i=g(r,ro.placeholder);n|=M}return gr(t,n,e,r,i)}function io(t){return gn(t,arguments.length>1?_n(arguments,!1,!1,1):Yo(t))}function oo(t,e){var n=S|k;if(arguments.length>2){var r=Kn(arguments,2),i=g(r,oo.placeholder);n|=M}return gr(e,n,t,r,i)}function lo(t,e,n){n&&Mr(t,e,n)&&(e=null);var r=gr(t,_,null,null,null,null,null,e);return r.placeholder=lo.placeholder,r}function ao(t,e,n){n&&Mr(t,e,n)&&(e=null);var r=gr(t,T,null,null,null,null,null,e);return r.placeholder=ao.placeholder,r}function so(t,e,n){function r(){h&&pa(h),s&&pa(s),s=h=d=x}function i(){var n=e-(Qa()-c);if(0>=n||n>e){s&&pa(s);var r=d;s=h=d=x,r&&(p=Qa(),u=t.apply(f,a),h||s||(a=f=null))}else h=wa(i,n)}function o(){h&&pa(h),s=h=d=x,(v||g!==e)&&(p=Qa(),u=t.apply(f,a),h||s||(a=f=null))}function l(){if(a=arguments,c=Qa(),f=this,d=v&&(h||!m),g===!1)var n=m&&!h;else{s||m||(p=c);var r=g-(c-p),l=0>=r||r>g;l?(s&&(s=pa(s)),p=c,u=t.apply(f,a)):s||(s=wa(o,r))}return l&&h?h=pa(h):h||e===g||(h=wa(i,e)),n&&(l=!0,u=t.apply(f,a)),!l||h||s||(a=f=null),u}var a,s,u,c,f,h,d,p=0,g=!1,v=!0;if("function"!=typeof t)throw new Ql(z);if(e=0>e?0:+e||0,n===!0){var m=!0;v=!1}else No(n)&&(m=n.leading,g="maxWait"in n&&Aa(+n.maxWait||0,e),v="trailing"in n?n.trailing:v);return l.cancel=r,l}function uo(t){return yn(t,1,arguments,1)}function co(t,e){return yn(t,e,arguments,2)}function fo(t,e){if("function"!=typeof t||e&&"function"!=typeof e)throw new Ql(z);var n=function(){var r=arguments,i=n.cache,o=e?e.apply(this,r):r[0];if(i.has(o))return i.get(o);var l=t.apply(this,r);return i.set(o,l),l};return n.cache=new fo.Cache,n}function ho(t){if("function"!=typeof t)throw new Ql(z);return function(){return!t.apply(this,arguments)}}function po(t){return no(t,2)}function go(t){var e=Kn(arguments,1),n=g(e,go.placeholder);return gr(t,M,null,e,n)}function vo(t){var e=Kn(arguments,1),n=g(e,vo.placeholder);return gr(t,A,null,e,n)}function mo(t){var e=_n(arguments,!1,!1,1);return gr(t,N,null,null,null,e)}function yo(t){if("function"!=typeof t)throw new Ql(z);return function(e){return t.apply(this,e)}}function bo(t,e,n){var r=!0,i=!0;if("function"!=typeof t)throw new Ql(z);return n===!1?r=!1:No(n)&&(r="leading"in n?!!n.leading:r,i="trailing"in n?!!n.trailing:i),Ie.leading=r,Ie.maxWait=+e,Ie.trailing=i,so(t,e,Ie)}function wo(t,e){return e=null==e?Ol:e,gr(e,M,null,[t],[])}function xo(t,e,n,r){return e&&"boolean"!=typeof e&&Mr(t,e,n)?e=!1:"function"==typeof e&&(r=n,n=e,e=!1),n="function"==typeof n&&er(n,r,1),mn(t,e,n)}function Co(t,e,n){return e="function"==typeof e&&er(e,n,1),mn(t,!0,e)}function So(t){var e=d(t)?t.length:x;return Ar(e)&&sa.call(t)==B||!1}function ko(t){return t===!0||t===!1||d(t)&&sa.call(t)==U||!1}function Lo(t){return d(t)&&sa.call(t)==G||!1}function _o(t){return t&&1===t.nodeType&&d(t)&&sa.call(t).indexOf("Element")>-1||!1}function To(t){if(null==t)return!0;var e=t.length;return Ar(e)&&(ns(t)||Io(t)||So(t)||d(t)&&is(t.splice))?!e:!as(t).length}function Mo(t,e,n,r){if(n="function"==typeof n&&er(n,r,3),!n&&Nr(t)&&Nr(e))return t===e;var i=n?n(t,e):x;return"undefined"==typeof i?Hn(t,e,n):!!i}function Ao(t){return d(t)&&"string"==typeof t.message&&sa.call(t)==q||!1}function No(t){var e=typeof t;return"function"==e||t&&"object"==e||!1}function Oo(t,e,n,r){var i=as(e),o=i.length;if(n="function"==typeof n&&er(n,r,3),!n&&1==o){var l=i[0],a=e[l];if(Nr(a))return null!=t&&a===t[l]&&la.call(t,l)}for(var s=Gl(o),u=Gl(o);o--;)a=s[o]=e[i[o]],u[o]=Nr(a);return Fn(t,i,s,u,n)}function Wo(t){return Eo(t)&&t!=+t}function Do(t){return null==t?!1:sa.call(t)==K?ca.test(ia.call(t)):d(t)&&ke.test(t)||!1}function Ho(t){return null===t}function Eo(t){return"number"==typeof t||d(t)&&sa.call(t)==$||!1}function Fo(t){return d(t)&&sa.call(t)==Y||!1}function Io(t){return"string"==typeof t||d(t)&&sa.call(t)==J||!1}function Ro(t){return d(t)&&Ar(t.length)&&Ee[sa.call(t)]||!1}function zo(t){return"undefined"==typeof t}function Po(t){var e=t?t.length:0;return Ar(e)?e?Je(t):[]:ll(t)}function Bo(t){return pn(t,Qo(t))}function jo(t,e,n){var r=Ga(t);return n&&Mr(t,e,n)&&(e=null),e?pn(e,r,as(e)):r}function Uo(t){if(null==t)return t;var e=Je(arguments);return e.push(cn),ls.apply(x,e)}function Go(t,e,n){return e=wr(e,n,3),Ln(t,e,Nn,!0)}function qo(t,e,n){return e=wr(e,n,3),Ln(t,e,On,!0)}function Ko(t,e,n){return("function"!=typeof e||"undefined"!=typeof n)&&(e=er(e,n,3)),Tn(t,e,Qo)}function Vo(t,e,n){return e=er(e,n,3),Mn(t,e,Qo)}function $o(t,e,n){return("function"!=typeof e||"undefined"!=typeof n)&&(e=er(e,n,3)),Nn(t,e)}function Xo(t,e,n){return e=er(e,n,3),Mn(t,e,as)}function Yo(t){return Wn(t,Qo(t))}function Zo(t,e){return t?la.call(t,e):!1}function Jo(t,e,n){n&&Mr(t,e,n)&&(e=null);for(var r=-1,i=as(t),o=i.length,l={};++r<o;){var a=i[r],s=t[a];e?la.call(l,s)?l[s].push(a):l[s]=[a]:l[s]=a}return l}function Qo(t){if(null==t)return[];No(t)||(t=Yl(t));var e=t.length;e=e&&Ar(e)&&(ns(t)||Ua.nonEnumArgs&&So(t))&&e||0;for(var n=t.constructor,r=-1,i="function"==typeof n&&n.prototype===t,o=Gl(e),l=e>0;++r<e;)o[r]=r+"";for(var a in t)l&&Tr(a,e)||"constructor"==a&&(i||!la.call(t,a))||o.push(a);return o}function tl(t,e,n){var r={};return e=wr(e,n,3),Nn(t,function(t,n,i){r[n]=e(t,n,i)}),r}function el(t,e,n){if(null==t)return{};if("function"!=typeof e){var r=rn(_n(arguments,!1,!1,1),Jl);return Wr(t,bn(Qo(t),r))}return e=er(e,n,3),Dr(t,function(t,n,r){return!e(t,n,r)})}function nl(t){for(var e=-1,n=as(t),r=n.length,i=Gl(r);++e<r;){var o=n[e];i[e]=[o,t[o]]}return i}function rl(t,e,n){return null==t?{}:"function"==typeof e?Dr(t,er(e,n,3)):Wr(t,_n(arguments,!1,!1,1))}function il(t,e,n){var r=null==t?x:t[e];return"undefined"==typeof r&&(r=n),is(r)?r.call(t):r}function ol(t,e,n,r){var i=ns(t)||Ro(t);if(e=wr(e,r,4),null==n)if(i||No(t)){var o=t.constructor;n=i?ns(t)?new o:[]:Ga(is(o)&&o.prototype)}else n={};return(i?Qe:Nn)(t,function(t,r,i){return e(n,t,r,i)}),n}function ll(t){return Zn(t,as(t))}function al(t){return Zn(t,Qo(t))}function sl(t,e,n){return e=+e||0,"undefined"==typeof n?(n=e,e=0):n=+n||0,t>=e&&n>t}function ul(t,e,n){n&&Mr(t,e,n)&&(e=n=null);var r=null==t,i=null==e;if(null==n&&(i&&"boolean"==typeof t?(n=t,t=1):"boolean"==typeof e&&(n=e,i=!0)),r&&i&&(e=1,i=!1),t=+t||0,i?(e=t,t=0):e=+e||0,n||t%1||e%1){var o=Ha();return Na(t+o*(e-t+parseFloat("1e-"+((o+"").length-1))),e)}return Gn(t,e)}function cl(t){return t=r(t),t&&t.charAt(0).toUpperCase()+t.slice(1)}function fl(t){return t=r(t),t&&t.replace(Le,u)}function hl(t,e,n){t=r(t),e+="";var i=t.length;return n="undefined"==typeof n?i:Na(0>n?0:+n||0,i),n-=e.length,n>=0&&t.indexOf(e,n)==n}function dl(t){return t=r(t),t&&ve.test(t)?t.replace(pe,c):t}function pl(t){return t=r(t),t&&Me.test(t)?t.replace(Te,"\\$&"):t
}function gl(t,e,n){t=r(t),e=+e;var i=t.length;if(i>=e||!Ta(e))return t;var o=(e-i)/2,l=ga(o),a=da(o);return n=dr("",a,n),n.slice(0,l)+t+n}function vl(t,e,n){return t=r(t),t&&dr(t,e,n)+t}function ml(t,e,n){return t=r(t),t&&t+dr(t,e,n)}function yl(t,e,n){return n&&Mr(t,e,n)&&(e=0),Da(t,e)}function bl(t,e){var n="";if(t=r(t),e=+e,1>e||!t||!Ta(e))return n;do e%2&&(n+=t),e=ga(e/2),t+=t;while(e);return n}function wl(t,e,n){return t=r(t),n=null==n?0:Na(0>n?0:+n||0,t.length),t.lastIndexOf(e,n)==n}function xl(t,e,n){var i=V.templateSettings;n&&Mr(t,e,n)&&(e=n=null),t=r(t),e=hn(hn({},n||e),i,fn);var o,l,a=hn(hn({},e.imports),i.imports,fn),s=as(a),u=Zn(a,s),c=0,h=e.interpolate||_e,d="__p += '",p=Zl((e.escape||_e).source+"|"+h.source+"|"+(h===be?we:_e).source+"|"+(e.evaluate||_e).source+"|$","g"),g="//# sourceURL="+("sourceURL"in e?e.sourceURL:"lodash.templateSources["+ ++He+"]")+"\n";t.replace(p,function(e,n,r,i,a,s){return r||(r=i),d+=t.slice(c,s).replace(Ne,f),n&&(o=!0,d+="' +\n__e("+n+") +\n'"),a&&(l=!0,d+="';\n"+a+";\n__p += '"),r&&(d+="' +\n((__t = ("+r+")) == null ? '' : __t) +\n'"),c=s+e.length,e}),d+="';\n";var v=e.variable;v||(d="with (obj) {\n"+d+"\n}\n"),d=(l?d.replace(ce,""):d).replace(fe,"$1").replace(he,"$1;"),d="function("+(v||"obj")+") {\n"+(v?"":"obj || (obj = {});\n")+"var __t, __p = ''"+(o?", __e = _.escape":"")+(l?", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n":";\n")+d+"return __p\n}";var m=Ml(function(){return Vl(s,g+"return "+d).apply(x,u)});if(m.source=d,Ao(m))throw m;return m}function Cl(t,e,n){var i=t;return(t=r(t))?(n?Mr(i,e,n):null==e)?t.slice(m(t),y(t)+1):(e+="",t.slice(o(t,e),l(t,e)+1)):t}function Sl(t,e,n){var i=t;return t=r(t),t?t.slice((n?Mr(i,e,n):null==e)?m(t):o(t,e+"")):t}function kl(t,e,n){var i=t;return t=r(t),t?(n?Mr(i,e,n):null==e)?t.slice(0,y(t)+1):t.slice(0,l(t,e+"")+1):t}function Ll(t,e,n){n&&Mr(t,e,n)&&(e=null);var i=W,o=D;if(null!=e)if(No(e)){var l="separator"in e?e.separator:l;i="length"in e?+e.length||0:i,o="omission"in e?r(e.omission):o}else i=+e||0;if(t=r(t),i>=t.length)return t;var a=i-o.length;if(1>a)return o;var s=t.slice(0,a);if(null==l)return s+o;if(Fo(l)){if(t.slice(a).search(l)){var u,c,f=t.slice(0,a);for(l.global||(l=Zl(l.source,(xe.exec(l)||"")+"g")),l.lastIndex=0;u=l.exec(f);)c=u.index;s=s.slice(0,null==c?a:c)}}else if(t.indexOf(l,a)!=a){var h=s.lastIndexOf(l);h>-1&&(s=s.slice(0,h))}return s+o}function _l(t){return t=r(t),t&&ge.test(t)?t.replace(de,b):t}function Tl(t,e,n){return n&&Mr(t,e,n)&&(e=null),t=r(t),t.match(e||Oe)||[]}function Ml(){for(var t=arguments[0],e=arguments.length,n=Gl(e?e-1:0);--e>0;)n[e-1]=arguments[e];try{return t.apply(x,n)}catch(r){return Ao(r)?r:new Kl(r)}}function Al(t,e,n){return n&&Mr(t,e,n)&&(e=null),d(t)?Wl(t):vn(t,e)}function Nl(t){return function(){return t}}function Ol(t){return t}function Wl(t){return Rn(mn(t,!0))}function Dl(t,e){return zn(t+"",mn(e,!0))}function Hl(t,e,n){if(null==n){var r=No(e),i=r&&as(e),o=i&&i.length&&Wn(e,i);(o?o.length:r)||(o=!1,n=e,e=t,t=this)}o||(o=Wn(e,as(e)));var l=!0,a=-1,s=is(t),u=o.length;n===!1?l=!1:No(n)&&"chain"in n&&(l=n.chain);for(;++a<u;){var c=o[a],f=e[c];t[c]=f,s&&(t.prototype[c]=function(e){return function(){var n=this.__chain__;if(l||n){var r=t(this.__wrapped__);return(r.__actions__=Je(this.__actions__)).push({func:e,args:arguments,thisArg:t}),r.__chain__=n,r}var i=[this.value()];return ma.apply(i,arguments),e.apply(t,i)}}(f))}return t}function El(){return p._=ua,this}function Fl(){}function Il(t){return jn(t+"")}function Rl(t){return function(e){return null==t?x:t[e]}}function zl(t,e,n){n&&Mr(t,e,n)&&(e=n=null),t=+t||0,n=null==n?1:+n||0,null==e?(e=t,t=0):e=+e||0;for(var r=-1,i=Aa(da((e-t)/(n||1)),0),o=Gl(i);++r<i;)o[r]=t,t+=n;return o}function Pl(t,e,n){if(t=+t,1>t||!Ta(t))return[];var r=-1,i=Gl(Na(t,Ia));for(e=er(e,n,1);++r<t;)Ia>r?i[r]=e(r):e(r);return i}function Bl(t){var e=++aa;return r(t)+e}function jl(t,e){return t+e}function Ul(t){ns(t)||(t=Ir(t));for(var e=t.length,n=0;e--;)n+=+t[e]||0;return n}p=p?Xe.defaults($e.Object(),p,Xe.pick($e,De)):$e;var Gl=p.Array,ql=p.Date,Kl=p.Error,Vl=p.Function,$l=p.Math,Xl=p.Number,Yl=p.Object,Zl=p.RegExp,Jl=p.String,Ql=p.TypeError,ta=Gl.prototype,ea=Yl.prototype,na=Jl.prototype,ra=(ra=p.window)&&ra.document,ia=Vl.prototype.toString,oa=jn("length"),la=ea.hasOwnProperty,aa=0,sa=ea.toString,ua=p._,ca=Zl("^"+pl(sa).replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),fa=Do(fa=p.ArrayBuffer)&&fa,ha=Do(ha=fa&&new fa(0).slice)&&ha,da=$l.ceil,pa=p.clearTimeout,ga=$l.floor,va=Do(va=Yl.getPrototypeOf)&&va,ma=ta.push,ya=ea.propertyIsEnumerable,ba=Do(ba=p.Set)&&ba,wa=p.setTimeout,xa=ta.splice,Ca=Do(Ca=p.Uint8Array)&&Ca,Sa=Do(Sa=p.WeakMap)&&Sa,ka=function(){try{var t=Do(t=p.Float64Array)&&t,e=new t(new fa(10),0,1)&&t}catch(n){}return e}(),La=Do(La=Gl.isArray)&&La,_a=Do(_a=Yl.create)&&_a,Ta=p.isFinite,Ma=Do(Ma=Yl.keys)&&Ma,Aa=$l.max,Na=$l.min,Oa=Do(Oa=ql.now)&&Oa,Wa=Do(Wa=Xl.isFinite)&&Wa,Da=p.parseInt,Ha=$l.random,Ea=Xl.NEGATIVE_INFINITY,Fa=Xl.POSITIVE_INFINITY,Ia=$l.pow(2,32)-1,Ra=Ia-1,za=Ia>>>1,Pa=ka?ka.BYTES_PER_ELEMENT:0,Ba=$l.pow(2,53)-1,ja=Sa&&new Sa,Ua=V.support={};!function(){Ua.funcDecomp=!Do(p.WinRTError)&&Ae.test(w),Ua.funcNames="string"==typeof Vl.name;try{Ua.dom=11===ra.createDocumentFragment().nodeType}catch(t){Ua.dom=!1}try{Ua.nonEnumArgs=!ya.call(arguments,1)}catch(t){Ua.nonEnumArgs=!0}}(0,0),V.templateSettings={escape:me,evaluate:ye,interpolate:be,variable:"",imports:{_:V}};var Ga=function(){function t(){}return function(e){if(No(e)){t.prototype=e;var n=new t;t.prototype=null}return n||p.Object()}}(),qa=ja?function(t,e){return ja.set(t,e),t}:Ol;ha||(nr=fa&&Ca?function(t){var e=t.byteLength,n=ka?ga(e/Pa):0,r=n*Pa,i=new fa(e);if(n){var o=new ka(i,0,n);o.set(new ka(t,0,n))}return e!=r&&(o=new Ca(i,r),o.set(new Ca(t,r))),i}:Nl(null));var Ka=_a&&ba?function(t){return new Ve(t)}:Nl(null),Va=ja?function(t){return ja.get(t)}:Fl,$a=function(){var t=0,e=0;return function(n,r){var i=Qa(),o=E-(i-e);if(e=i,o>0){if(++t>=H)return n}else t=0;return qa(n,r)}}(),Xa=or(function(t,e,n){la.call(t,n)?++t[n]:t[n]=1}),Ya=or(function(t,e,n){la.call(t,n)?t[n].push(e):t[n]=[e]}),Za=or(function(t,e,n){t[n]=e}),Ja=or(function(t,e,n){t[n?0:1].push(e)},function(){return[[],[]]}),Qa=Oa||function(){return(new ql).getTime()},ts=sr(),es=sr(!0),ns=La||function(t){return d(t)&&Ar(t.length)&&sa.call(t)==j||!1};Ua.dom||(_o=function(t){return t&&1===t.nodeType&&d(t)&&!os(t)||!1});var rs=Wa||function(t){return"number"==typeof t&&Ta(t)},is=n(/x/)||Ca&&!n(Ca)?function(t){return sa.call(t)==K}:n,os=va?function(t){if(!t||sa.call(t)!=X)return!1;var e=t.valueOf,n=Do(e)&&(n=va(e))&&va(n);return n?t==n||va(t)==n:Er(t)}:Er,ls=lr(hn),as=Ma?function(t){if(t)var e=t.constructor,n=t.length;return"function"==typeof e&&e.prototype===t||"function"!=typeof t&&n&&Ar(n)?Fr(t):No(t)?Ma(t):[]}:Fr,ss=lr(Pn),us=ur(function(t,e,n){return e=e.toLowerCase(),t+(n?e.charAt(0).toUpperCase()+e.slice(1):e)}),cs=ur(function(t,e,n){return t+(n?"-":"")+e.toLowerCase()});8!=Da(We+"08")&&(yl=function(t,e,n){return(n?Mr(t,e,n):null==e)?e=0:e&&(e=+e),t=Cl(t),Da(t,e||(Se.test(t)?16:10))});var fs=ur(function(t,e,n){return t+(n?"_":"")+e.toLowerCase()}),hs=ur(function(t,e,n){return t+(n?" ":"")+(e.charAt(0).toUpperCase()+e.slice(1))}),ds=fr(on),ps=fr(ln,!0);return V.prototype=Z.prototype,Q.prototype=Ga(Z.prototype),Q.prototype.constructor=Q,Re.prototype=Ga(Z.prototype),Re.prototype.constructor=Re,je.prototype["delete"]=Ue,je.prototype.get=Ge,je.prototype.has=qe,je.prototype.set=Ke,Ve.prototype.push=Ze,fo.Cache=je,V.after=to,V.ary=eo,V.assign=ls,V.at=Oi,V.before=no,V.bind=ro,V.bindAll=io,V.bindKey=oo,V.callback=Al,V.chain=Ci,V.chunk=Pr,V.compact=Br,V.constant=Nl,V.countBy=Xa,V.create=jo,V.curry=lo,V.curryRight=ao,V.debounce=so,V.defaults=Uo,V.defer=uo,V.delay=co,V.difference=jr,V.drop=Ur,V.dropRight=Gr,V.dropRightWhile=qr,V.dropWhile=Kr,V.fill=Vr,V.filter=Di,V.flatten=Zr,V.flattenDeep=Jr,V.flow=ts,V.flowRight=es,V.forEach=Ii,V.forEachRight=Ri,V.forIn=Ko,V.forInRight=Vo,V.forOwn=$o,V.forOwnRight=Xo,V.functions=Yo,V.groupBy=Ya,V.indexBy=Za,V.initial=ti,V.intersection=ei,V.invert=Jo,V.invoke=Pi,V.keys=as,V.keysIn=Qo,V.map=Bi,V.mapValues=tl,V.matches=Wl,V.matchesProperty=Dl,V.memoize=fo,V.merge=ss,V.mixin=Hl,V.negate=ho,V.omit=el,V.once=po,V.pairs=nl,V.partial=go,V.partialRight=vo,V.partition=Ja,V.pick=rl,V.pluck=ji,V.property=Il,V.propertyOf=Rl,V.pull=ii,V.pullAt=oi,V.range=zl,V.rearg=mo,V.reject=qi,V.remove=li,V.rest=ai,V.shuffle=Vi,V.slice=si,V.sortBy=Yi,V.sortByAll=Zi,V.sortByOrder=Ji,V.spread=yo,V.take=fi,V.takeRight=hi,V.takeRightWhile=di,V.takeWhile=pi,V.tap=Si,V.throttle=bo,V.thru=ki,V.times=Pl,V.toArray=Po,V.toPlainObject=Bo,V.transform=ol,V.union=gi,V.uniq=vi,V.unzip=mi,V.values=ll,V.valuesIn=al,V.where=Qi,V.without=yi,V.wrap=wo,V.xor=bi,V.zip=wi,V.zipObject=xi,V.backflow=es,V.collect=Bi,V.compose=es,V.each=Ii,V.eachRight=Ri,V.extend=ls,V.iteratee=Al,V.methods=Yo,V.object=xi,V.select=Di,V.tail=ai,V.unique=vi,Hl(V,V),V.add=jl,V.attempt=Ml,V.camelCase=us,V.capitalize=cl,V.clone=xo,V.cloneDeep=Co,V.deburr=fl,V.endsWith=hl,V.escape=dl,V.escapeRegExp=pl,V.every=Wi,V.find=Hi,V.findIndex=$r,V.findKey=Go,V.findLast=Ei,V.findLastIndex=Xr,V.findLastKey=qo,V.findWhere=Fi,V.first=Yr,V.has=Zo,V.identity=Ol,V.includes=zi,V.indexOf=Qr,V.inRange=sl,V.isArguments=So,V.isArray=ns,V.isBoolean=ko,V.isDate=Lo,V.isElement=_o,V.isEmpty=To,V.isEqual=Mo,V.isError=Ao,V.isFinite=rs,V.isFunction=is,V.isMatch=Oo,V.isNaN=Wo,V.isNative=Do,V.isNull=Ho,V.isNumber=Eo,V.isObject=No,V.isPlainObject=os,V.isRegExp=Fo,V.isString=Io,V.isTypedArray=Ro,V.isUndefined=zo,V.kebabCase=cs,V.last=ni,V.lastIndexOf=ri,V.max=ds,V.min=ps,V.noConflict=El,V.noop=Fl,V.now=Qa,V.pad=gl,V.padLeft=vl,V.padRight=ml,V.parseInt=yl,V.random=ul,V.reduce=Ui,V.reduceRight=Gi,V.repeat=bl,V.result=il,V.runInContext=w,V.size=$i,V.snakeCase=fs,V.some=Xi,V.sortedIndex=ui,V.sortedLastIndex=ci,V.startCase=hs,V.startsWith=wl,V.sum=Ul,V.template=xl,V.trim=Cl,V.trimLeft=Sl,V.trimRight=kl,V.trunc=Ll,V.unescape=_l,V.uniqueId=Bl,V.words=Tl,V.all=Wi,V.any=Xi,V.contains=zi,V.detect=Hi,V.foldl=Ui,V.foldr=Gi,V.head=Yr,V.include=zi,V.inject=Ui,Hl(V,function(){var t={};return Nn(V,function(e,n){V.prototype[n]||(t[n]=e)}),t}(),!1),V.sample=Ki,V.prototype.sample=function(t){return this.__chain__||null!=t?this.thru(function(e){return Ki(e,t)}):Ki(this.value())},V.VERSION=C,Qe(["bind","bindKey","curry","curryRight","partial","partialRight"],function(t){V[t].placeholder=V}),Qe(["dropWhile","filter","map","takeWhile"],function(t,e){var n=e!=R,r=e==F;Re.prototype[t]=function(t,i){var o=this.__filtered__,l=o&&r?new Re(this):this.clone(),a=l.__iteratees__||(l.__iteratees__=[]);return a.push({done:!1,count:0,index:0,iteratee:wr(t,i,1),limit:-1,type:e}),l.__filtered__=o||n,l}}),Qe(["drop","take"],function(t,e){var n=t+"While";Re.prototype[t]=function(n){var r=this.__filtered__,i=r&&!e?this.dropWhile():this.clone();if(n=null==n?1:Aa(ga(n)||0,0),r)e?i.__takeCount__=Na(i.__takeCount__,n):ni(i.__iteratees__).limit=n;else{var o=i.__views__||(i.__views__=[]);o.push({size:n,type:t+(i.__dir__<0?"Right":"")})}return i},Re.prototype[t+"Right"]=function(e){return this.reverse()[t](e).reverse()},Re.prototype[t+"RightWhile"]=function(t,e){return this.reverse()[n](t,e).reverse()}}),Qe(["first","last"],function(t,e){var n="take"+(e?"Right":"");Re.prototype[t]=function(){return this[n](1).value()[0]}}),Qe(["initial","rest"],function(t,e){var n="drop"+(e?"":"Right");Re.prototype[t]=function(){return this[n](1)}}),Qe(["pluck","where"],function(t,e){var n=e?"filter":"map",r=e?Rn:jn;Re.prototype[t]=function(t){return this[n](r(t))}}),Re.prototype.compact=function(){return this.filter(Ol)},Re.prototype.reject=function(t,e){return t=wr(t,e,1),this.filter(function(e){return!t(e)})},Re.prototype.slice=function(t,e){t=null==t?0:+t||0;var n=0>t?this.takeRight(-t):this.drop(t);return"undefined"!=typeof e&&(e=+e||0,n=0>e?n.dropRight(-e):n.take(e-t)),n},Re.prototype.toArray=function(){return this.drop(0)},Nn(Re.prototype,function(t,e){var n=V[e],r=/^(?:filter|map|reject)|While$/.test(e),i=/^(?:first|last)$/.test(e);V.prototype[e]=function(){var e=arguments,o=(e.length,this.__chain__),l=this.__wrapped__,a=!!this.__actions__.length,s=l instanceof Re,u=e[0],c=s||ns(l);c&&r&&"function"==typeof u&&1!=u.length&&(s=c=!1);var f=s&&!a;if(i&&!o)return f?t.call(l):n.call(V,this.value());var h=function(t){var r=[t];return ma.apply(r,e),n.apply(V,r)};if(c){var d=f?l:new Re(this),p=t.apply(d,e);if(!i&&(a||p.__actions__)){var g=p.__actions__||(p.__actions__=[]);g.push({func:ki,args:[h],thisArg:V})}return new Q(p,o)}return this.thru(h)}}),Qe(["concat","join","pop","push","replace","shift","sort","splice","split","unshift"],function(t){var e=(/^(?:replace|split)$/.test(t)?na:ta)[t],n=/^(?:push|sort|unshift)$/.test(t)?"tap":"thru",r=/^(?:join|pop|replace|shift)$/.test(t);V.prototype[t]=function(){var t=arguments;return r&&!this.__chain__?e.apply(this.value(),t):this[n](function(n){return e.apply(n,t)})}}),Re.prototype.clone=ze,Re.prototype.reverse=Pe,Re.prototype.value=Be,V.prototype.chain=Li,V.prototype.commit=_i,V.prototype.plant=Ti,V.prototype.reverse=Mi,V.prototype.toString=Ai,V.prototype.run=V.prototype.toJSON=V.prototype.valueOf=V.prototype.value=Ni,V.prototype.collect=V.prototype.map,V.prototype.head=V.prototype.first,V.prototype.select=V.prototype.filter,V.prototype.tail=V.prototype.rest,V}var x,C="3.5.0",S=1,k=2,L=4,_=8,T=16,M=32,A=64,N=128,O=256,W=30,D="...",H=150,E=16,F=0,I=1,R=2,z="Expected a function",P="__lodash_placeholder__",B="[object Arguments]",j="[object Array]",U="[object Boolean]",G="[object Date]",q="[object Error]",K="[object Function]",V="[object Map]",$="[object Number]",X="[object Object]",Y="[object RegExp]",Z="[object Set]",J="[object String]",Q="[object WeakMap]",te="[object ArrayBuffer]",ee="[object Float32Array]",ne="[object Float64Array]",re="[object Int8Array]",ie="[object Int16Array]",oe="[object Int32Array]",le="[object Uint8Array]",ae="[object Uint8ClampedArray]",se="[object Uint16Array]",ue="[object Uint32Array]",ce=/\b__p \+= '';/g,fe=/\b(__p \+=) '' \+/g,he=/(__e\(.*?\)|\b__t\)) \+\n'';/g,de=/&(?:amp|lt|gt|quot|#39|#96);/g,pe=/[&<>"'`]/g,ge=RegExp(de.source),ve=RegExp(pe.source),me=/<%-([\s\S]+?)%>/g,ye=/<%([\s\S]+?)%>/g,be=/<%=([\s\S]+?)%>/g,we=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,xe=/\w*$/,Ce=/^\s*function[ \n\r\t]+\w/,Se=/^0[xX]/,ke=/^\[object .+?Constructor\]$/,Le=/[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g,_e=/($^)/,Te=/[.*+?^${}()|[\]\/\\]/g,Me=RegExp(Te.source),Ae=/\bthis\b/,Ne=/['\n\r\u2028\u2029\\]/g,Oe=function(){var t="[A-Z\\xc0-\\xd6\\xd8-\\xde]",e="[a-z\\xdf-\\xf6\\xf8-\\xff]+";return RegExp(t+"+(?="+t+e+")|"+t+"?"+e+"|"+t+"+|[0-9]+","g")}(),We=" 	\f ﻿\n\r\u2028\u2029 ᠎             　",De=["Array","ArrayBuffer","Date","Error","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Math","Number","Object","RegExp","Set","String","_","clearTimeout","document","isFinite","parseInt","setTimeout","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","WeakMap","window","WinRTError"],He=-1,Ee={};Ee[ee]=Ee[ne]=Ee[re]=Ee[ie]=Ee[oe]=Ee[le]=Ee[ae]=Ee[se]=Ee[ue]=!0,Ee[B]=Ee[j]=Ee[te]=Ee[U]=Ee[G]=Ee[q]=Ee[K]=Ee[V]=Ee[$]=Ee[X]=Ee[Y]=Ee[Z]=Ee[J]=Ee[Q]=!1;var Fe={};Fe[B]=Fe[j]=Fe[te]=Fe[U]=Fe[G]=Fe[ee]=Fe[ne]=Fe[re]=Fe[ie]=Fe[oe]=Fe[$]=Fe[X]=Fe[Y]=Fe[J]=Fe[le]=Fe[ae]=Fe[se]=Fe[ue]=!0,Fe[q]=Fe[K]=Fe[V]=Fe[Z]=Fe[Q]=!1;var Ie={leading:!1,maxWait:0,trailing:!1},Re={"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","Ç":"C","ç":"c","Ð":"D","ð":"d","È":"E","É":"E","Ê":"E","Ë":"E","è":"e","é":"e","ê":"e","ë":"e","Ì":"I","Í":"I","Î":"I","Ï":"I","ì":"i","í":"i","î":"i","ï":"i","Ñ":"N","ñ":"n","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","Ù":"U","Ú":"U","Û":"U","Ü":"U","ù":"u","ú":"u","û":"u","ü":"u","Ý":"Y","ý":"y","ÿ":"y","Æ":"Ae","æ":"ae","Þ":"Th","þ":"th","ß":"ss"},ze={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#96;"},Pe={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'","&#96;":"`"},Be={"function":!0,object:!0},je={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},Ue=Be[typeof exports]&&exports&&!exports.nodeType&&exports,Ge=Be[typeof module]&&module&&!module.nodeType&&module,qe=Ue&&Ge&&"object"==typeof global&&global,Ke=Be[typeof window]&&window,Ve=Ge&&Ge.exports===Ue&&Ue,$e=qe||Ke!==(this&&this.window)&&Ke||this,Xe=w();"function"==typeof define&&"object"==typeof define.amd&&define.amd?($e._=Xe,define(function(){return Xe})):Ue&&Ge?Ve?(Ge.exports=Xe)._=Xe:Ue._=Xe:$e._=Xe}.call(this),function(t){"use strict";function e(t,e){var r={theme:"mirrormark",tabSize:"2",indentWithTabs:!0,lineWrapping:!0,extraKeys:{Enter:"newlineAndIndentContinueMarkdownList"},mode:"markdown"};return _.assign(r,e),_.assign(Object.create(n),{element:t,options:r})}!function(t){if("object"==typeof exports&&"object"==typeof module)module.exports=t;else if("function"==typeof define&&define.amd)return define([],t);window&&(window.mirrorMark=t)}(e);var n={render:function(){this.registerKeyMaps(this.keyMaps),this.cm=t.fromTextArea(this.element,this.options),this.options.showToolbar&&this.setToolbar(this.tools)},setToolbar:function(t){var e=document.createElement("ul");e.className=this.options.theme+"-toolbar";var t=this.generateToolList(t);t.forEach(function(t){e.appendChild(t)});var n=this.cm.getWrapperElement();n.parentNode.insertBefore(e,n)},registerKeyMaps:function(t){for(var e in t){if("function"!=typeof this.actions[t[e]])throw"MirrorMark - '"+t[e]+"' is not a registered action";var n={};n[e]=this.actions[t[e]].bind(this),_.assign(this.options.extraKeys,n)}},registerActions:function(t){return _.assign(this.actions,t)},registerTools:function(t,e){for(var n in t)if(this.actions[t[n].action]&&"function"!=typeof this.actions[t[n].action])throw"MirrorMark - '"+t[n].action+"' is not a registered action";return e?void(this.tools=t):void(this.tools=this.tools.concat(t))},generateToolList:function r(t){return t.map(function(t){var e=document.createElement("li"),n=document.createElement("a");if(e.className=t.name,t.className&&(n.className=t.className),t.showName){var i=document.createTextNode(t.name);n.appendChild(i)}if(t.action&&(n.onclick=function(){this.cm.focus(),this.actions[t.action].call(this)}.bind(this)),e.appendChild(n),t.nested){e.className+=" has-nested";var o=document.createElement("ul");o.className=this.options.theme+"-toolbar-list";var l=r.call(this,t.nested);l.forEach(function(t){o.appendChild(t)}),e.appendChild(o)}return e}.bind(this))},tools:[{name:"bold",action:"bold",className:"fa fa-bold"},{name:"italicize",action:"italicize",className:"fa fa-italic"},{name:"blockquote",action:"blockquote",className:"fa fa-quote-left"},{name:"link",action:"link",className:"fa fa-link"},{name:"image",action:"image",className:"fa fa-image"},{name:"unorderedList",action:"unorderedList",className:"fa fa-list"},{name:"orderedList",action:"orderedList",className:"fa fa-list-ol"},{name:"fullScreen",action:"fullScreen",className:"fa fa-expand"}],keyMaps:{"Cmd-B":"bold","Cmd-I":"italicize","Cmd-'":"blockquote","Cmd-Alt-L":"orderedList","Cmd-L":"unorderedList","Cmd-Alt-I":"image","Cmd-H":"hr","Cmd-K":"link"},actions:{bold:function(){this.insertAround("**","**")},italicize:function(){this.insertAround("*","*")},code:function(){this.insertAround("```\r\n","\r\n```")},blockquote:function(){this.insertBefore("> ",2)},orderedList:function(){this.insertBefore("1. ",3)},unorderedList:function(){this.insertBefore("* ",2)},image:function(){this.insertBefore("![](http://)",2)},link:function(){this.insertAround("[","](http://)")},hr:function(){this.insert("---")},fullScreen:function(){var t=this.cm.getWrapperElement(),e=document,n=e.fullScreen||e.mozFullScreen||e.webkitFullScreen,r=function(){t.requestFullscreen?t.requestFullscreen():t.webkitRequestFullscreen?t.webkitRequestFullscreen():t.mozRequestFullScreen?t.mozRequestFullScreen():t.msRequestFullscreen&&t.msRequestFullscreen()},i=function(){e.cancelFullScreen?e.cancelFullScreen():e.mozCancelFullScreen?e.mozCancelFullScreen():e.webkitCancelFullScreen&&e.webkitCancelFullScreen()};n?i&&i():r()}},insert:function(t){var e=this.cm.getDoc(),n=e.getCursor();e.replaceRange(t,{line:n.line,ch:n.ch})},insertAround:function(t,e){var n=this.cm.getDoc(),r=n.getCursor();if(n.somethingSelected()){var i=n.getSelection();n.replaceSelection(t+i+e)}else n.replaceRange(t+e,{line:r.line,ch:r.ch}),n.setCursor({line:r.line,ch:r.ch+t.length})},insertBefore:function(t,e){var n=this.cm.getDoc(),r=n.getCursor();if(n.somethingSelected()){var i=n.listSelections();i.forEach(function(r){for(var i=[r.head.line,r.anchor.line].sort(),o=i[0];o<=i[1];o++)n.replaceRange(t,{line:o,ch:0});n.setCursor({line:i[0],ch:e||0})})}else n.replaceRange(t,{line:r.line,ch:0}),n.setCursor({line:r.line,ch:e||0})}}}(window.CodeMirror);
//# sourceMappingURL=vendor.js.map
