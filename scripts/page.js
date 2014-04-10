// @koala-prepend "jquery.js"
// @koala-prepend "libs.js"
// @koala-prepend "git.js"

app = {}
app.options = {
	development: true
}
// Development specific functions
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
		setTimeout(function(){
			$('#git_date').html(date);
			$('#git_time').html('('+time+')').parent().addClass('ready');
		},500);

	});
	
}
app.sections = function(action){
	
	var section = $('.section')
	
	// Update
	function update_heights() {
		section.height($(window).height()-60)
		$('.content.centered').height(section.height()).addClass('ready')		 
	}
	
	if ( action === 'adjust' ) {
		update_heights();
	}	
}
// END Development specific functions

app.waypoints = function(){

	$('.section.home').waypoint({
		handler : function(direction) {
			if (direction === 'down') {
				$('#header').addClass('fixed')
			} else {
				$('#header').removeClass('fixed')
			}
		},
		offset : -$('.section.home').height()
	});

}

app.init = function(){
	var scope = this;
	if ( app.options.development ) {
		scope.github();
		scope.sections('adjust');
		$(window).resize(function(){
			app.sections('adjust');
		})		
	} else {
		app.waypoints();
	}
	
	if ( $('#blog_post').length ) {
		$('#header').addClass('fixed')
	}
}



$(document).ready(function(){
	// Document ready
	app.init();
})



