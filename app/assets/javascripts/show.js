//show.js

$(document).ready(function(){
	
	
	var tid = setInterval(update_shown, 5000);

	function update_shown(){
		$('#shown').load("homes/new");
	}
});