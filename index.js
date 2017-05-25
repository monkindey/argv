/**
 * @author monkindey
 * @decription Simple arguments validator
 */

function typeOf(target) {
	return {}.toString.call(target).match(/\[object\s+(\w+)\]/)[1];
}

function findSuitable(schema, args) {
	return schema.filter(function(s) {
		return s.length === args.length;
	});
}

function englisify(arr) {
	if (arr.length === 1) {
		return arr.toString();
	}
	var pre = arr.slice(0, -1);
	return pre.join(', ') + ' or ' + arr.slice(-1);
}

function argv(raw) {
	var typeMap = {
		A: 'Array',
		S: 'String',
		N: 'Number',
		F: 'Function',
		O: 'Object',
		B: 'Boolean',
		E: 'Error',
		Z: 'Null'
	};

	return function(fn) {
		return function() {
			var args = arguments;
			var wrongIndex = 0;
			var schema = raw.split('|');
			var suitableSchema = findSuitable(schema, args);

			// not match
			if (suitableSchema.length === 0) {
				// check the arguments length
				throw new Error(
					'Excepted ' +
						englisify(
							schema
								.map(function(s) {
									return s.length;
								})
								.filter(function(s, i, ss) {
									return ss.indexOf(s) === i;
								})
						) +
						' argument but got ' +
						args.length
				);
			}

			(function check(schema) {
				var filteredSchema = schema.filter(function(s) {
					return typeOf(args[wrongIndex]) === typeMap[s[wrongIndex]];
				});

				// 验证没问题就退出这个循环
				if (wrongIndex > suitableSchema.length) {
					return true;
				}

				if (filteredSchema.length === 0) {
					throw new Error(
						'Argument #' +
							(wrongIndex + 1) +
							': Expected ' +
							englisify(
								schema.map(function(s) {
									return typeMap[s[wrongIndex]];
								})
							) +
							' but got ' +
							typeOf(args[wrongIndex])
					);
				}

				wrongIndex++;

				return check(filteredSchema);
			})(suitableSchema);

			fn.apply(this, args);
		};
	};
}
