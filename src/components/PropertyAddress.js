import React, { Component } from 'react';
import axios from 'axios';

export default class PropertyAddress extends Component {
	constructor() {
		super()

		this.state = {
			address: '',
			city: '',
			state: '',
			zip: ''
		}
	}

	componentDidMount() {
		axios.get('http://localhost:3031/api/newHousing').then(
			response => {console.log(response.data); this.setState(response.data)}
		)
	}

	nextButtonClick() {
		axios.put('http://localhost:3031/api/updateNewHousing', this.state).then((e) => console.log('putted'))

	}



	onChange(prop, val) {
		this.setState({
			[prop]: val
		})
	}

	render() {
		return (
			<div>
				<div>
					<label>Address</label>
					<input type="text" onChange={(e) => this.onChange('address', e.target.value)} value={this.state.address}></input>
				</div>
				<br/>
				<div>
					<label>City</label>
					<input type="text" onChange={(e) => this.onChange('city', e.target.value)} value={this.state.city}></input>
				</div>
				<br/>
				<div>
					<label>State</label>
					<input type="text" onChange={(e) => this.onChange('state', e.target.value)} value={this.state.state}></input>
				</div>
				<br/>
				<div>
					<label>Zip</label>
					<input type="text" onChange={(e) => this.onChange('zip', e.target.value)} value={this.state.zip}></input>
				</div>
				<br/>
				<br/>

				<button>PREVIOUS</button>&nbsp;&nbsp;&nbsp;
				

				<button onClick={ ()=> this.nextButtonClick()}>NEXT</button>

			</div>

		)
	}
}