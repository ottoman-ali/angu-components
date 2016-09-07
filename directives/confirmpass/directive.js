(function(){
	'use strict';

	angular
		.module('site')
		.directive('confirmPassword', ['$parse', confirmPassword])

	function confirmPassword($parse){
		var directive = {};
			directive.require = 'ngModel';
			directive.restrict = 'A';
			directive.scope = true;
			directive.link = link;
			
		function link(scope, element, attr, ctrl){

			ctrl.$parsers.unshift(function(value) {
				var pass = $parse(attr.confirmPassword)(scope),
					valid = (value == pass);

				ctrl.$setValidity('confirmPassword', valid);
				return valid ? value : undefined;
			});
		}

		return directive;
	}
})()