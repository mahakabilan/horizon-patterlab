$(document).ready(function(){
	/*Disable submit button if form is valid*/
	$(".formregistration button").click(function(){
		if($(".formregistration").valid()){
		    $(".formregistration button").prop("disabled", true);
		    $(".formregistration button").css("cursor", "not-allowed");
		    $(".formregistration").submit();
		}
		else{
		  $(".formregistration button").prop("disabled", false);
		  $(".formregistration button").css("cursor", "pointer");
		}
	});	
});

