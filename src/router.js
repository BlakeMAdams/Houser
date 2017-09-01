import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home.js';



export default (
	<Switch>
		<Route exact path='/' component={Login} />
		<Route path='/dashboard' component={Dashboard} />
		<Route path='/step/1' component={PropertyName} />
		<Route path='/step/2' component={PropertyAddress} />
		<Route path='/step/3' component={PropertyImage} />
		<Route path='/step/4' component={PropertyLoan} />
		<Route path='/step/5' component={PropertyRent} />
		
	</Switch>
)