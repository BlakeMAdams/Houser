const express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	massive = require('massive'),
	session = require('express-session'),
	housingCtrl = require('./controllers/housingCtr');
const connectionString= "postgres://postgres:asdf@localhost/simulation2";
//connectionString = postgres://[username]:[pw]@[host]:[port]/[database]
const user = require('./controllers/user');

var app = express();

//TOP LEVEL MIDDLEWARE
app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: "randomwordsmakegoodkeys",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3000000
    }
}));

// DATABASE CONNECTION
massive(connectionString).then(db => {
	app.set('db', db);
	console.log('connecting');
	});


//MIDDLEWARE
app.use(housingCtrl.initSession);


// check for session
// app.use( function(req, res, next) {
// 		const { session } = req;
// 		if (!session.user) {
// 			session.user = {username: '', cart: [], total: 0}
// 		} next();
// 	});

// app.use(express.static( `${__dirname}/../public/build`) );






//AUTHORIZATION ENDPOINTS
app.post('/api/auth/login', user.login)
app.post('/api/auth/register', user.register)
app.post('/api/auth/logout', user.logout)


//PROPERTIES ENDPOINTS
app.put('/api/updateNewHousing', housingCtrl.updateNewHousing);
app.get('/api/newHousing', housingCtrl.newHousing);
app.post('/api/properties', housingCtrl.addProperty); // add new properties
app.get('/api/properties', housingCtrl.getAllProperties); // gets all properties
app.delete('/api/properties/:id', housingCtrl.deleteProperty); // delete property  based on param
app.get('/api/properties/filter', housingCtrl.filterProperties); // filter properties based on min price (query)





//SERVER LISTENING PORT
app.listen(3031, () => {
	console.log('listening port 3031');
})

