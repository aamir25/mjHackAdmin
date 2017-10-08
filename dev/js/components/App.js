import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from 'react-md-spinner';

import { getData, checkIn } from '../actions/tableActions';

class App extends Component {
	componentDidMount() {
		this.props.getData();
	}

	checkIn(id, isCheckedIn) {
		this.props.checkIn(id, isCheckedIn);
	}

	renderBody(data) {
		let tableRows = [];

		Object.keys(data).map(function(key) {
			data[key]._id = key; 
			tableRows.push(data[key]);
		})

		return (
			<tbody>
				{
					tableRows.map((entry) => {
						return (
							<tr className={entry.isCheckedIn ? 'success' : ''} key={ entry._id }>
								<td>{ entry.teamName }</td>
								<td>{ entry.college }</td>
								<td>{ entry.member0 || '-' }</td>
								<td>{ entry.member1 || '-' }</td>
								<td>{ entry.member2 || '-' }</td>
								<td>{ entry.member3 || '-' }</td>
								<td><button
									className="btn btn-success"
									onClick={() => this.checkIn(entry._id, entry.isCheckedIn)}
									>
									Check-IN
									</button>
								</td>
							</tr>
						)
					})
				}
			</tbody>
		)
	}

	render() {
		let {
			data,
			total,
			present,
			absent,
			isLoading,
			error
		} = this.props.table;

		return (
			<div className="container">
				<h3>Total : { total }&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				Present : { present }&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				Absent : { absent }</h3>

				<table className="table table-hover">
					<thead>
						<tr>
							<th>Team Name</th>
							<th>College Name</th>
							<th>Member 1</th>
							<th>Member 2</th>
							<th>Member 3</th>
							<th>Member 4</th>
							<th>isCheckedIn</th>
						</tr>
					</thead>
					{ this.renderBody(data) }
				</table>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		table : state.table
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		getData: getData,
		checkIn: checkIn
	}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(App);