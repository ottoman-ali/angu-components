(function () {
    'use strict';

    angular
    	.module('front')
    	.directive('pagination', ['$compile', pagination]);

	function pagination($compile){
		var directive = {};
			directive.restrict= 'E';
			directive.templateUrl = templateUrl;
			directive.link = link;
			directive.scope = {
				currentPage: "=",
				totalPages: '<',
				gotoPage: "&"
			}

		function templateUrl(element, attributes){
			// return 'modules/pager/views/pager.html';
			return attributes.templateUrl;
		}

		function link(scope, element, attributes){
			scope.pages = [];

			scope.$watch(watchtrigger, function(val){
				if(val) {
					scope.pages = [];
					paginate(scope.currentPage, scope.totalPages);
				}
			})

			//for duplicate keys in array ng-repeat
			scope.tracker = function(id, index) {
                return id + '_' + index;
            };

            function watchtrigger(){
				return scope.currentPage+'.'+scope.totalPages;
			}

			// generate pagination
			function paginate( current, total ){
				var skiped = true;
					current = parseInt(current);
					
				var i=2;
				if(total>1){
					scope.pages.push(1); //always show first 
					while(i<total){
						if( (i !== current-2) && (i !== current-1) && (i !== current-0) && (i !== current+1) && (i !== current+2) ){
							if(skiped){
								scope.pages.push('...');
								skiped = false;
							}
							i++;
						}
						else {
							scope.pages.push(i);
							skiped = true;
							i++;
						}
					}
					scope.pages.push(total); // always show last
				}
			}
		}

		return directive;
	}

})();