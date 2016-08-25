(function(){
	'use strict';

	angular
		.module('site')
		.service('brigdeData', ['$rootScope', '$timeout', brigdeData]);

	function brigdeData($rootScope, $timeout){
		var self = this;
		
		/**
		 * Initalize the service(once), better to do in app run block
		 * @return {[type]} [description]
		 */
		self.init = function() {
            $rootScope.$on('$locationChangeStart', function () {
                self.clearData();
            });
        }

        /**
         * Sets the data to be trasported in the rootScope
         * @param {Object} data                    Object of data to bridge accross pages
         * @param {[type]} keepAfterLocationChange Set to true if the data is required even after location change(not page refresh/browser-redirect)
         */
		self.setData = function(data, keepAfterLocationChange){
			$rootScope.bridge = {
				'data': data,
				'keepAfterLocationChange': keepAfterLocationChange
			}
		}

		/**
		 * Receive the data after bridging action happens(location change in most cases)
		 * @return {Object} Data sent
		 */
		self.getData = function(){
			var bridge = $rootScope.bridge;
			if (bridge) {
				return bridge.data;
			}
		}

		/**
		 * Clear brigde data from rootscope
		 * @return {[type]} [description]
		 */
		self.clearData = function(){
			var bridge = $rootScope.bridge;
			if (bridge) {
				if (!bridge.keepAfterLocationChange) {
                    delete $rootScope.bridge;
                } else {
                    // only keep for a single location change
                    bridge.keepAfterLocationChange = false;
                }
			}
		}
	}
})();