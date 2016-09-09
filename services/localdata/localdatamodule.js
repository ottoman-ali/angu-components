(function(){
	'use strict';

	angular
		.module('site',[])
		.service('localdataService', ['$q', '$rootScope', '$timeout', 'appConstants', localdataService]);
	
	function localdataService($q, $rootScope, $timeout, appConstants){
		var self = this;

		/**
		 * Check if given key is avaialable in localstorage
		 * @param  {String} key Localstorage data key
		 * @return {Boolean}     True/Flase
		 */
		self.available = function(key){
			return (localStorage.getItem(key) != null);
		}

		/**
		 * Fetch required data from server
		 * @param  {Object}   model    instance of model
		 * @param  {Function}   getter   Function in model instance to query server
		 * @param  {Function} callback A callback function to return server query response
		 */
		self.fetch = function(model, getter, callback){
			model[getter]().then(function(state){
				var result = model.records;
				callback(result);
			}).catch(function(){
				callback();
			});
		}

		/**
		 * Save data to local storage
		 * @param  {String} key  data key against which data will be saved
		 * @param  {Object} data Actual data
		 */
		self.save = function(key, data){
			localStorage.setItem(key, JSON.stringify(data));
		}

		/**
		 * Read data from localstorage
		 * @param  {String} key localstorage data key
		 * @return {Object}     Required data
		 */
		self.read = function(key){
			return JSON.parse(localStorage.getItem(key));
		}

		/**
		 * Provide required from localstorage. If data is not available 
		 * fetch from server.
		 * @param  {String} key    Data key
		 * @param  {Object} model  Instance of model
		 * @param  {Function} getter Function in model instance to query server
		 * @return {Object}        Data promise
		 */
		self.provide = function(key, model, getter){
			var deferred = $q.defer();

			if(self.available(key)){
				var read_data = self.read(key);
				$rootScope.globals[key] = read_data;
				self.fetch(model, getter, function(fetch_data){
					if(typeof fetch_data !== 'undefined'){
						self.save(key, fetch_data);
					}
				});
				deferred.resolve(read_data);
			}
			else{
				self.fetch(model, getter, function(fetch_data){
					if(typeof fetch_data !== 'undefined'){
						self.save(key, fetch_data);
						$rootScope.globals[key] = fetch_data;
						deferred.resolve(fetch_data);
					}
					else{
						deferred.reject();
					}
				});
			}

			return deferred.promise;
		}
	}
})()