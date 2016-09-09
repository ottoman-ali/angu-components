(function(){
	'use strict';

	angular
		.module('site')
		.directive('hoverIntent', ['$compile', '$parse', hoverIntent]);

	function hoverIntent($compile, $parse){
		var directive = {}; 
			directive.restrict= 'A';
			directive.link = link;

		function link(scope, element, attributes){
			var elm_subject = document.querySelector('.'+attributes.hoverIntent);
			var elm_object = element[0];
			var hover_time;

			//show dropdown on mouseover
			elm_subject.addEventListener('mouseover',function(event){
				hover_time = setTimeout(function(){
					elm_object.classList.add('active');
				},300);
			});

			//dont show dropdown if mouseover is quick
			elm_subject.addEventListener('mouseout',function(event){
				clearTimeout(hover_time);
			});

			//hide dropdown if loose focus
			document.addEventListener('click', function(event){
				if(!isDescendant(elm_object, event.target) && !isDescendant(elm_subject, event.target)){
					elm_object.classList.remove('active');
				}
			});
		}

		function isDescendant(parent, child) {
		     var node = child.parentNode;
		     while (node != null) {
		         if (node == parent) {
		             return true;
		         }
		         node = node.parentNode;
		     }
		     return false;
		}
		return directive;
	};

})()