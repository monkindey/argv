/**
 * @author monkindey
 * @decription simple arguments validator and inspired by the awesome aproba
 * @usage
 * *
 * A
 * S
 * N
 * F
 * O
 * B
 * E
 * Z
 */

function typeOf(target) {
	return {}.toString.call(target).match(/\[object\s+(\w+)\]/)[1];
}

function argv(types) {
	var typeMap = {
		A: "Array",
		S: "String",
		N: "Number",
		F: "Function",
		O: "Object",
		B: "Boolean",
		E: "Error",
		Z: "Null"
	};

	return function(fn) {
		return function() {
			var args = arguments;
			var wrongIndex;

			if (types.length < args.length) {
				return new Error("too many arguments error");
			}

			if (types.length > args.length) {
				return new Error("missing arguments error");
			}

			if (
				types.split("").every(function(type, i) {
					var verified = typeOf(args[i]) === typeMap[type];
					if (!verified) {
						wrongIndex = i;
					}
					return verified;
				})
			) {
				// OK
				fn.apply(this, args);
			} else {
				return new Error(
					"Argument #" +
						(wrongIndex + 1) +
						": Expected " +
						typeMap[types[wrongIndex]] +
						" but got " +
						typeOf(args[wrongIndex])
				);
			}
		};
	};
}