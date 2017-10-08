const initialState = {
	data : {},
	total: 0,
	present: 0,
	absent: 0,
	error : "",
	isLoading : false
};

export default function(state = initialState, action) {
	switch(action.type) {
		case 'FETCH_DATA':
			return {
				...state,
				isLoading : true
			};
		break;

		case 'DATA_FETCHED':
			let absent = 0;
			let present = 0;

			Object.keys(action.payload).map((key) => {
				action.payload[key].isCheckedIn ? present++ : absent++
			});
			return {
				...state,
				data : action.payload,
				total : Object.keys(action.payload).length,
				present : present,
				absent : absent,
				isLoading : false
			}
		break;

		case 'ERROR':
			return {
				...state,
				error : action.payload,
				isLoading : false
			}
		break;
	}
	return state;
}