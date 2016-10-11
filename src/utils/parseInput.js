import moment from 'moment'

export default function parseInput(input, format, isStrict = false) {
	let output = null

	if (input instanceof Date) {
		output = moment(input)
	} else if (typeof input === 'string') {
		output = moment(input, format, isStrict)
	} else if (typeof input === 'function') {
		output = parseInput(input(moment()), format)
	} else if (input && input._isAMomentObject) {
		output = input.clone()
	}

	return output
}

export function parseTimeInput(input, format, isStrict = false) {
	let output = null
	if (!input) {
		output = moment()
		output.hour(0)
		output.minute(0)
		output.second(0)
	}else if (input instanceof Date) {
		output = moment(input)
	} else if (typeof input === 'string') {
		output = moment(input, format, isStrict)
	} else if (typeof input === 'function') {
		output = parseInput(input(moment()), format)
	} else if (input && input._isAMomentObject) {
		output = input.clone()
	}

	return output
}