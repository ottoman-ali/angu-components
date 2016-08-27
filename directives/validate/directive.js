(function(){
	'use strict';

	angular
		.module('site')
		.directive('noRepeat',['$parse', noRepeat])
		.directive('packages', ['$parse', packages]);

	function noRepeat($parse){
		var directive = {};
			directive.restrict = 'A';
			directive.require = '?ngModel';
			directive.link = link;

		function link(scope, element, attributes, ctrl){

			if (!ctrl) return;
			//var spools = $parse(attributes.noRepeat)(scope);

			ctrl.$parsers.unshift(function(value) {
				var raw = $parse(attributes.noRepeat)(scope),
					data = reshapeData(raw),
					decoded = decode(value),
					valid = (data.indexOf(decoded.ordernumber) > -1) ? false : true;
				ctrl.$setValidity('norepeat', valid);
				return valid ? value : undefined;
			});

			function reshapeData(data){
				var result = [];
				angular.forEach(data, function(bit){
					if( bit.box_count.match(/[(/)]/g) == null) result.push(bit['order_number']);
				});
				return result;
			}

			function decode(code){
				var data = code.split(/[/,]/g);
				return {
					'ordernumber': data[0],
					'key': data[1],
					'currentbox': data[2],
					'totalboxes': data[3]
				}
			}
		}

		return directive;
	}

	function packages($parse){
		var directive = {};
			directive.restrict = 'A';
			directive.require = '?ngModel';
			directive.link = link;
		function link(scope, element, attributes, ctrl){
			if (!ctrl) return;
			ctrl.$parsers.unshift(function(value) {

				var pkg = $parse(attributes.packages)(scope),
					decoded = decode(value),
					validcount = (isCount(decoded, pkg)) ? true : false,
					validorder = (isPackage(decoded, pkg))  ? true : false,
					gtotal = (decoded.currentbox > decoded.totalboxes) ? false : true;

				ctrl.$setValidity('validcount', validcount);
				ctrl.$setValidity('validorder', validorder);
				ctrl.$setValidity('gtotal', gtotal);
				return (validcount && validorder && gtotal) ? value : undefined;
			})
		}

		function decode(code){
			var data = code.split(/[/,]/g);
			return {
				'ordernumber': data[0],
				'key': data[1],
				'currentbox': data[2],
				'totalboxes': data[3]
			}
		}

		function isPackage(code, pkg){
			var result = true;
			angular.forEach(pkg, function(value){
				result = result && (value.ordernumber == code.ordernumber) && (value.totalboxes == code.totalboxes);
			});

			return result;
		}

		function isCount(code, pkg){
			var result = true;
			angular.forEach(pkg, function(value){
				result = result && !(value.currentbox == code.currentbox);
			});

			return result;
		}
		return directive;
	}
})()