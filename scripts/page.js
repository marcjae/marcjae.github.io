// @koala-prepend "jquery.js"
// @koala-prepend "libs.js"

app = {}
app.sections = function(action){
	
	var section = $('.section')
	
	// Update
	function update_heights() {
		
		//if ( $(window).height() > section.height() ) {
			section.height($(window).height()-20)
			$('.content.centered').height(section.height())
			$('.section.home').waypoint({
			  handler: function(direction) {
			  		if ( direction === 'down' ) {
			  			$('#header').addClass('fixed')
			  		} else {
			  			$('#header').removeClass('fixed')
			  		}
			  },
			  offset: -$('.section.home').height()
			});			 
		//}		
	}
	
	if ( action === 'adjust' ) {
		update_heights();
	}	
}
app.init = function(){
	this.sections('adjust')
}


$(document).ready(function(){
	// Document ready
	




	
	app.init();
	
})


$(window).resize(function(){
	app.sections('adjust')
})
