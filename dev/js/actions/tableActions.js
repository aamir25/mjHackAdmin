import * as firebase from 'firebase';

export function getData() {
	return (dispatch) => {
		dispatch({ type : 'FETCH_DATA' });
		firebase.database().ref().child('/participants').once('value', (snapshot) => {
			dispatch({
				type : 'DATA_FETCHED',
				payload : snapshot.val()
			});
		}, (error) => {
				dispatch({
					type : 'ERROR',
					payload : error
				});
			console.log(error);
		})
	};
}

export function checkIn(id, isCheckedIn) {
	return (dispatch) => {
		firebase.database().ref().child('/participants/' + id).update({isCheckedIn: !isCheckedIn})
		.then((response) => {
			dispatch(getData());
		})
		.catch((error) => {
			dispatch({
				type : 'ERROR',
				payload : error
			});
		}) 
	}
}