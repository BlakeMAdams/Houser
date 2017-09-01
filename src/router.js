import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Login from './components/Login.js';
// import Dashboard from './components/Dashboard.js';
// import PropertyName from './components/PropertyName.js';
import PropertyAddress from './components/PropertyAddress.js';
// import PropertyImage from './components/PropertyImage.js';
// import PropertyLoan from './components/PropertyLoan.js';
// import PropertyRent from './components/PropertyRent.js';


export default (
	<Switch>
		<Route path='/step/2' component={PropertyAddress} />
		{/* <Route exact path='/' component={Login} />
		<Route path='/dashboard' component={Dashboard} />
		<Route path='/step/1' component={PropertyName} />
		
		<Route path='/step/3' component={PropertyImage} />
		<Route path='/step/4' component={PropertyLoan} />
		<Route path='/step/5' component={PropertyRent} /> */}
	</Switch>
)