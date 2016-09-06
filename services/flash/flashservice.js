(function () {
    "use strict";

    angular
        .module('FlashModule', [])
        .service('flashService', ['$rootScope', '$timeout', flashService])

    function flashService($rootScope, $timeout) {
        var self = this;

        /**
         * Init flash service(once) better do it in the application run block
         * @return {[type]} [description]
         */
        self.init = function() {
            $rootScope.$on('$locationChangeStart', function () {
                self.clear();
            });
        }

        /**
         * Clear flash data from rootscope
         * @return {[type]} [description]
         */
        self.clear = function() {
            var flash = $rootScope.flash;
            if (flash) {
                if (!flash.keepAfterLocationChange) {
                    delete $rootScope.flash;
                } else {
                    // only keep for a single location change
                    flash.keepAfterLocationChange = false;
                }
            }
        }

        /**
         * Set flash data in root scope to show success flash massge
         * @param  {String, Object} response                Can either be a string or an object
         * @param  {Boolean} showErrorList           if set true flash will include errors list
         * @param  {Boolean} keepAfterLocationChange if set true flash message will appear even after location change(not browser-redirect/refresh)
         * @return {[type]}                         [description]
         */
        self.success = function(response, showErrorList, keepAfterLocationChange) {
            var parse = (typeof response === 'string') ? {'message': response} : response;
            $rootScope.flash = {
                message: parse.message,
                list: (typeof showErrorList !== 'undefined') ? parse.errors : false,
                type: 'success', 
                keepAfterLocationChange: keepAfterLocationChange
            };
            $timeout(function(){
                delete $rootScope['flash']; 
            },7000);
        }

        /**
         * Set flash data in root scope to show error flash massge
         * @param  {String, Object} response                Can either be a string or an object
         * @param  {Boolean} showErrorList           if set true flash will include errors list
         * @param  {Boolean} keepAfterLocationChange if set true flash message will appear even after location change(not browser-redirect/refresh)
         * @return {[type]}                         [description]
         */
        self.error = function(response, showErrorList, keepAfterLocationChange) {
            var parse = (typeof response === 'string') ? {'message': response} : response;
            $rootScope.flash = {
                message: parse.message,
                list: (typeof showErrorList !== 'undefined') ? parse.errors : false,
                type: 'error',
                keepAfterLocationChange: keepAfterLocationChange
            };
            $timeout(function(){
                delete $rootScope['flash']; 
            },7000);
        }
    }
})();