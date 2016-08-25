(function(){
	'use strict'

	angular
		.module('QstringModule')
		.service('qtringService', [qtringService]);
		
	function qtringService(){
		var self = this;

		self.encode = function(object){
			console.log(object);
		}
	}
})()