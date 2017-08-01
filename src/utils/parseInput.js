import moment from 'moment'

export default function parseInput(input,initTime=false) {
	let output
	if (input instanceof Date) {
		output = moment(input)
	}else if (input && input._isAMomentObject && input.isValid()) {
		output = input.clone()
	}else{
		output = moment()
		if(initTime){
			output.hour(0)
			output.minute(0)
			output.second(0)
		}
	}

	return output
}