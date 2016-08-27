(function () {
	"use strict";

	angular
		.module('site')
		.directive('flashDirective', ['$parse', '$compile', flashDirective]);

    function flashDirective($parse, $compile){
		var directive = {}
			directive.restrict= 'E';
			directive.templateUrl = templateUrl;
			directive.scope = true;
			
		return directive;

		function templateUrl(element, attributes){
			return attributes.templateUrl;
		}
    }

})();