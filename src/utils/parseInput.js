import moment from 'moment'

export default function parseInput(input, format, isStrict = false) {
	let output = null

	if (typeof input === 'undefined' || typeof input === 'null' || !input || input === '') {
		output = moment()
	} else if (input instanceof Date) {
		output = moment(input)
	} else if (typeof input === 'string') {
		output = moment(input, format, isStrict)
	} else if (typeof input === 'function') {
		output = parseInput(input(moment()), format)
	} else if (input._isAMomentObject) {
		output = input.clone()
	}

	return output
}