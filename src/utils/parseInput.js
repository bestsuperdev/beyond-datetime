import moment from 'moment'

export default function parseInput(input, format, isStrict = false) {
	let output = null
	
	if (input instanceof Date) {
		output = moment(input)
	} else if (input && typeof input === 'string') {
		output = moment(input, format, isStrict)
		if (!output.isValid()) {
			output = null
		}
	} else if (typeof input === 'function') {
		output = parseInput(input(moment()), format)
	} else if (input && input._isAMomentObject) {
		output = input.clone()
	}

	return output
}


function initTimeMoment(m){
	// m = m.clone()
	m.hour(0)
	m.minute(0)
	m.second(0)
	return m
}

export function parseTimeInput(input, format, isStrict = false) {
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

	if (!output || (output.isValid && !output.isValid())) {
		output = initTimeMoment(moment())
	}

	return output
}