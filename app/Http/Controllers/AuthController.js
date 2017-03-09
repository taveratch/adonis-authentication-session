'use strict';

const Hash = use('Hash');
const User = use('App/Model/User');

class AuthController {
	* index (request, response) {
		yield response.sendView('login');
	}

	* login (request, response) {
		const data = request.only('email', 'password');

		const loginMessage = {
			success: 'Logged-in Successfully',
			error: 'Invalid Credentials'
		};

		let user = yield User.query().where('email', data.email);
		if(user.length > 0) {
			user = user[0];
			const isSame = yield Hash.verify(data.password, user.password);
			if(isSame) {
				yield request.auth.login(user);
				return response.redirect('/');
			}
		}

		yield response.sendView('login', { error: loginMessage.error });
	}

	* logout (request, response) {
		yield request.auth.logout();

		return response.redirect('/');
	}
}

module.exports = AuthController;
