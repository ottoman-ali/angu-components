(function(){
	'use strict'

	angular
		.module('front')
		.directive('popupDirective', ['$parse', popupDirective]);

	function popupDirective($parse, $compile){
		var directive = {};
			directive.restrict  = 'AE';
			directive.transclude = true;
			directive.scope = {
				'toggle': '='
			};
			directive.templateUrl = templateUrl;
			directive.link   = link;

		function templateUrl(element, attributes){
			return attributes.templateUrl;
		}

		function link(scope, element, attributes){
			var popup = element[0].querySelector('.js_popup');
			var close_popup = element[0].querySelector('.js_closepopup');


			close_popup.addEventListener('click', function(){
				scope.$apply(function(){
					scope.toggle = false;
				})
			});

			scope.$watch(watch, function(toggle_new, toggle_old){
				if(toggle_new === true) popup.style.display = 'block';
				else popup.style.display = 'none';
			});

			function watch(){
				return scope.toggle;
			}
		}

		return directive;

	}

})();