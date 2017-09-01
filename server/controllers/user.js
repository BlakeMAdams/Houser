
module.exports = {

	login: function (req, res, next) {
		// code to check for registered user
		const { session } = req;
		const { username, password } = req.body;

		// get database of users to object


		req.app.get('db').getUsers().then(users => {

			const user = users.find(user => user.un === username && user.pw === password)
			if (user) {
				session.username = user.un;
				session.userId = user.id;
				res.status(200).send(session.user);

			} else {
				res.status(500).send('Unauthorized');
			}
		});
	},


	register: function (req, res, next) {
		// code to check for registered user
		const { session } = req;
		const { username, password } = req.body;
		

		req.app.get('db').newUser(username, password).then(user => {
			session.username = user.un;
			session.userId = user.id;
			res.status(200).send(session.user)
		})
	},


	logout: function (req, res, next) {
		// code to logout user
		const { session } = req;

		session.destroy();
		res.status(200).send('You have logged out.');
	}
}