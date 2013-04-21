//show.js

$(document).ready(function(){
	setinterval(update_shown, 5000);

	function update_shown(){
		$('#shown').load("homes/new");
	}
});