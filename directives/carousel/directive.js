(function(){
	'use strict'

	angular
		.module('front')
		.directive('owlCarousel', ['$compile', '$parse', owlCarousel]);

	function owlCarousel($compile, $parse){
		var directive = {}
			directive.restrict= 'A';
			directive.scope = true;
			directive.compile = compile;

		function getOptions(attributes){
			var options = {}
			var optionsArray = owlOptions();

			for (var i = 0; i < optionsArray.length; i++) {
				var opt = optionsArray[i];
				if (typeof attributes[opt] !== 'undefined') {
					options[opt] = $parse(attributes[opt])();
				}
			}

			return options;
		}

		function postLink(scope, element, attributes){
			var propertyName = attributes.owlCarousel;
			var options = getOptions(attributes);
			var slider = element[0];

			scope.$watch(watch, function(newvalue, oldvalue){
				if(typeof newvalue !== 'undefined'){
					if(newvalue.length > 0){
						scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
						    element.owlCarousel(options);
						});
					}
				}
			});

			function watch(){
				return $parse(attributes.owlWaitfor)(scope);
			}
		}

		function compile(element, attributes){
			return postLink;
		}

		function owlOptions(){
			return [
					'items',
					'margin',
					'loop',
					'center',
					'mouseDrag',
					'touchDrag',
					'pullDrag',
					'freeDrag',
					'merge',
					'mergeFit',
					'autoWidth',
					'startPosition',
					'URLhashListener',
					'nav',
					'navRewind',
					'navText',
					'slideBy',
					'dots',
					'dotsEach',
					'dotData',
					'lazyLoad',
					'lazyContent',
					'autoplay',
					'autoplayTimeout',
					'autoplayHoverPause',
					'smartSpeed',
					'fluidSpeed',
					'autoplaySpeed',
					'dotsSpeed',
					'dragEndSpeed',
					'callbacks',
					'responsive',
					'responsiveRefreshRate',
					'responsiveBaseElement',
					'responsiveClass',
					'video',
					'videoHeight',
					'videoWidth',
					'animateOut',
					'animateIn',
					'fallbackEasing',
					'info',
					'nestedItemSelector',
					'itemElement',
					'stageElement',
					'navContainer',
					'dotsContainer',
					'themeClass',
					'baseClass',
					'itemClass',
					'centerClass',
					'activeClass',
					'navContainerClass',
					'navClass',
					'controlsClass',
					'dotClass',
					'dotsClass',
					'autoHeightClass',
					'onInitialize',
					'onInitialized',
					'onResize',
					'onResized',
					'onRefresh',
					'onRefreshed',
					'onDrag',
					'onDragged',
					'onTranslate',
					'onTranslated',
					'onChange',
					'onChanged',
					'onStopVideo',
					'onPlayVideo',
					'onLoadLazy',
					'onLoadedLazy'
				];
		}
			
		return directive;
	}
})();
