(function(){
	'use strict';

	angular
		.module('site')
		.service('httpService', ['$http', '$timeout', 'appConstants', httpService]);

	function httpService($http, $timeout, appConstants){
		var self = this;
		/**
		 * Query Server
		 * @param  {String}   url      Query URL
		 * @param  {Object}   params   Query params
		 * @param  {Function} callback Callback funtion
		 * @return {[type]}            [description]
		 */
		self.query = function(url, params, callback){
			$http({ 
				method: 'GET', 
				url: appConstants.BaseUrl+url,
				params : params
			})
			.then(function(receive){
				callback(receive);
			})
			.catch(function(reason, cause){
				console.error(reason, cause);
			});
		}

		/**
		 * Post Server
		 * @param  {String}   url      Post URL
		 * @param  {Object}   params   Post data
		 * @param  {Function} callback Callback funtion
		 * @return {[type]}            [description]
		 */
		self.post = function(url, data, callback){
			$http({ 
				method: 'POST', 
				url: appConstants.BaseUrl+url,
				data: data,
			})
			.then(function(receive){
				callback(receive);
			})
			.catch(function(reason, cause){
				console.error(reason, cause);
			});
		}

		/**
		 * Get Server
		 * @param  {String}   url      Get URL
		 * @param  {Function} callback Callback funtion
		 * @return {[type]}            [description]
		 */
		self.get = function(url, callback){
			$http({ 
				method: 'GET', 
				url: appConstants.BaseUrl+url
			})
			.then(function(receive){
				callback(receive);
			})
			.catch(function(reason, cause){
				console.error(reason, cause);
			});
		}

		/**
		 * Mulit-part post Server
		 * @param  {String}   url      Mulit-part post URL
		 * @param  {Object}   params   Mulit-part post data
		 * @param  {Function} callback Callback funtion
		 * @return {[type]}            [description]
		 */
		self.multi = function(url, data, callback){}

		/**
		 * Put Server
		 * @param  {String}   url      Put URL
		 * @param  {Object}   params   Put data
		 * @param  {Function} callback Callback funtion
		 * @return {[type]}            [description]
		 */
		self.put = function(url, data, callback){
			$http({ 
				method: 'POST', 
				url: appConstants.BaseUrl+url,
				data: data,
			})
			.then(function(receive){
				callback(receive);
			})
			.catch(function(reason, cause){
				console.error(reason, cause);
			});
		}

		/**
		 * Delete Server
		 * @param  {String}   url      Delete URL
		 * @param  {Function} callback Callback funtion
		 * @return {[type]}            [description]
		 */
		self.delete = function(url, callback){
			$http({ 
				method: 'DELETE', 
				url: appConstants.BaseUrl+url
			})
			.then(function(receive){
				callback(receive);
			})
			.catch(function(reason, cause){
				console.error(reason, cause);
			});
		}
	}
})()