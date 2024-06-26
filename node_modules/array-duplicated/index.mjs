/*!
 * array-duplicated | ISC (c) Shinnosuke Watanabe
 * https://github.com/shinnn/array-duplicated
*/
import appendType from 'append-type';

function is(val) {
	return Object.is(this, val);
}

function reducer(accumulator, val, index, arr) {
	if (accumulator.skippableIndexes.has(index)) {
		return accumulator;
	}

	if (accumulator.results.findIndex(is, val) !== -1) {
		return accumulator;
	}

	var foundIndex = arr.findIndex(is, val);

	if (foundIndex !== index) {
		accumulator.skippableIndexes.add(foundIndex);
		accumulator.results.unshift(val);
	}

	return accumulator;
}

export default function arrayDuplicated(arr) {
	if (!Array.isArray(arr)) {
		throw new TypeError('Expected an Array, but got ' + appendType(arr) + '.');
	}

	if (arr.length < 2) {
		return [];
	}

	return arr.reduceRight(reducer, {
		results: [],
		skippableIndexes: new Set()
	}).results;
}
