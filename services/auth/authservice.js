(function(){
	'use strict'

	angular
		.module('site')
		.service('authService', ['$http', '$cookies', '$location', authService]);

	function authService($http, $cookies, $location){
		var self = this;

		/**
		 * Store user auth data in cookie (localstorage)
		 * @param {Object} authcred user auth data
		 */
		self.setCredentials = function(authcred){
			$cookies.putObject('session', authcred);
			$http.defaults.headers.common['Authorization'] = authcred.token;
		}

		/**
		 * Unset user auth credentials
		 * @return {[type]} [description]
		 */
		self.clearCredentials = function(){
			$cookies.remove('session');
			delete $http.defaults.headers.common.Authorization
		}

		/**
		 * Check access of a user against ACL for a specific URL
		 * @param  {String} url    current browswe url
		 * @param  {String} userId current user
		 * @return {Boolean}        true/false
		 */
		self.checkAccess = function(url, userId){}

		/**
		 * Returns current user ID
		 * @return {String} current user id
		 */
		self.userId = function(){
			var session = $cookies.getObject('session');
			if(typeof session === 'undefined') return;
			else return session.id;	
		}

		/**
		 * Returns current username
		 * @return {String} current username
		 */
		self.userName = function(){
			var session = $cookies.getObject('session');
			if(typeof session === 'undefined') return;
			else return session.name;
		}

		/**
		 * Returns user complete data
		 * @return {object} User data (id, username, token)
		 */
		self.user = function(){
			var session = $cookies.getObject('session');
			if(typeof session === 'undefined') return;
			else return session;
		}

		/**
		 * Check if user is authorized
		 * @return {Boolean} true/false
		 */
		self.isAuth = function(){
			var session = $cookies.getObject('session');
			if(typeof session === 'undefined') return true;
			else return false;			
		}

		/**
		 * Check user authentication and redirect user to login page
		 * @param  {String} url Login page URL
		 */
		self.requiredLogin = function(url){
			if(!self.isAuth) $location.path(url);
		}
	}
})()