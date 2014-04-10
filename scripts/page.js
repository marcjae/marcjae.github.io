// @koala-prepend "jquery.js"
// @koala-prepend "libs.js"
// @koala-prepend "git.js"

app = {}
app.github = function() {
	
	var github = new Github({
		token: "1626cc9940dd8afa00ea89bfde1f7ef37e88150a",
	    auth: "oauth"
	});	
	
	var repo = github.getRepo('marcjae', 'marcjae.github.io');
	repo.show(function(err, repo) {
		var lastupdate = repo.updated_at;
		var date = lastupdate.split('T')[0];
		var time = lastupdate.split('T')[1];
		time = time.split('Z')[0];
		$('#git_date').html(date);
		$('#git_time').html('('+time+')');
	});
	
}
app.sections = function(action){
	
	var section = $('.section')
	
	// Update
	function update_heights() {
		
		//if ( $(window).height() > section.height() ) {
			section.height($(window).height()-20)
			$('.content.centered').height(section.height()).addClass('ready')
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
	this.sections('adjust');
	this.github();
}



$(document).ready(function(){
	// Document ready
	app.init();
	
})


$(window).resize(function(){
	app.sections('adjust')
})
