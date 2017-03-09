'use strict';
const User = use('App/Model/User');
const Hash = use('Hash');

class RegisterController {
	* index (request, response) {
		yield response.sendView('register');
	}

	* doRegister (request, response) {
		const data = request.only('username', 'email', 'password');
		yield User.create(data);

		const registerMessage = {
			success: 'Registration successfully'
		};

		yield response.sendView('login', { registerMessage: registerMessage});
	}
}

module.exports = RegisterController;
