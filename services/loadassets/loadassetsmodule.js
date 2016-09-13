(function(){
	'use script';

	angular
		.module('LoadassestModule',[])
		.service('loadassetsService', [loadassetsService]);

	function loadassetsService(){
		var self = this;

		/**
		 * Load a js file in the current page
		 * @param  {String} file     path of file
		 * @param  {String} position position on the page(head/body)
		 * @return {[type]}          [description]
		 */
		self.loadJs = function(file, position){
			position = (typeof position !== 'undefined') ? position : 'body';
			var fileref=document.createElement('script')
		        fileref.setAttribute("type","text/javascript")
		        fileref.setAttribute("src", file);

		    if (typeof fileref!="undefined"){
		        if(position == 'head') 
		        	document.getElementsByTagName("head")[0].appendChild(fileref);
		        else if(position == 'body') 
		        	document.getElementsByTagName("body")[0].appendChild(fileref);		  
		    }
		    
		}

		/**
		 * Loads css file in the current page
		 * @param  {String} file path of file
		 * @return {[type]}      [description]
		 */
		self.loadJs = function(file){
			var fileref=document.createElement("link")
		        fileref.setAttribute("rel", "stylesheet")
		        fileref.setAttribute("type", "text/css")
		        fileref.setAttribute("href", file);

		    if (typeof fileref!="undefined"){
			    document.getElementsByTagName("head")[0].appendChild(fileref);
			}
		}
	}
})()