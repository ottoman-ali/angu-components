(function(){
	'use strict';

	angular
		.module('site')
		.directive('onFinishRender', ['$timeout', onFinishRender]);

	function onFinishRender($timeout){
		var directive = {};
			directive.restrict = 'A';
			directive.link = link;

		function link(scope, element, attributes){
			if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit(attributes.onFinishRender);
                });
            }
		}

		return directive;
	}
})()