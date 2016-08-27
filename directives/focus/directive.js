(function(){
	'use strict';

	angular
		.module('site')
		.directive('autoFocus', ['$parse', '$timeout', autoFocus]);

	function autoFocus($parse, $timeout) {
		var directive = {};
			directive.restrict = 'A';
			directive.link = link;

		function link(scope, element, attributes){
			scope.$watch(watch, function(newValue, oldValue){
				$timeout(function(){
					if(newValue) element[0].focus();
				})
			});
		    
			function watch(){
				return $parse(attributes.autoFocus)(scope);
			}
		}
		return directive;
  	}
})();