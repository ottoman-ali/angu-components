(function(){
	'use strict';

	angular
		.module('site')
		.factory('responseFactory', [responseFactory]);

	function responseFactory(){
		var factory = parse;

		function parse(resp){
			this.code = resp.fishout(['data','status','code']);
            this.message = resp.fishout(['data','status','message']);
            this.data = resp.fishout(['data','output','data']);
            this.errors = resp.fishout(['data','output','errors']);
            this.records = resp.fishout(['data','output','data','records']);
            this.navigation = resp.fishout(['data','output','navigation']);
            
            this._errors = errors;
            this._navigation = navigation;
		}

        /**
         * extract errors from server response
         * @param  {Array} err Errors array
         * @return {Object}     errors object to be used in forms
         */
		function errors(err){
			var object = {
                'has': {},
                'message': {}
            };
            if(typeof errors !== 'undefined'){
                angular.forEach(err, function(value, key){
                    object.has[value.field] = true;
                    object.message[value.field] = value.message;
                });
            }
            return object;
		}

        /**
         * Extract navigation from server response
         * @param  {Object} nav Server nav object
         * @return {Object}     Client nav object
         */
		function navigation(nav){
			var object = {};
            if(typeof nav !== 'undefined'){
                object = {
                    'total_record': nav.total_record,
                    'page': nav.page,
                    'max_pages': nav.max_pages,
                    'per_page': nav.per_page
                };
            }
            return object;
		}

		return factory;
	}
})();