var $ = jQuery.noConflict();
$(function(){
	$("button.contact").click(function(){
		$(this).addClass("active").removeClass("inactive");
		$(this).siblings("button").addClass("inactive").removeClass("active");
		
		$(".map.wrapper").addClass("contact"); //ADD CONTACT GATED SWITCH
		if($(".map.wrapper").hasClass("contact")){
			$("#picker ol").slideUp();	//IF NOT CONTACT SLIDE DOWN RESET
		}
		
		$("section.contact.wrapper").load("/acronamy/sites/all/modules/building_map/maps.html #satalite");
		$("#zoom").fadeOut();
		$("section.contact.wrapper iframe").parent().fadeIn();
		
		$("section.contact.wrapper").css({
			"background":"url(/acronamy/sites/all/modules/building_map/img/loader.gif)",
			"background-size":"5%",
			"background-repeat":"no-repeat",
			"background-position":"center",
			"background-color":"rgba(0,0,0,0.2)"
		});
		
		$("#about-floor").slideUp();
		
		//DYNAMIC TEXT
		var building = $(".map.wrapper").attr("value");
		$("dt.building").text(building);
		$(".map.wrapper h1.dynamic").text(building +" Contact Details");
	});
	
	$("button.internal").click(function(){
		$(this).addClass("active").removeClass("inactive");
		$(this).siblings("button").addClass("inactive").removeClass("active");	
	
		$(".map.wrapper").toggleClass("contact"); //REMOVE CONTACT GATED SWITCH
		
		if($(".map.wrapper").not("contact")){ //IF NOT CONTACT SLIDE DOWN RESET
			$("#picker ol").slideDown();
		}
		
		$("#zoom").fadeIn();
		
		$("section.contact.wrapper iframe").parent().fadeOut(function(){
			$(this).siblings("iframe").remove();
			$(".map.wrapper").removeClass("contact");
		});
		
		$("#about-floor").slideDown();
		
		//DYNAMIC TEXT
		var building = $(".map.wrapper").attr("value");
		$("dt.building").text(building);
		$(".map.wrapper h1.dynamic").text("about floor ...");
	});
	
	//Switch maps
	$(".neo").children(!".travel").not("li.default, .travel").click(function(){ //not travel maps
		$('#satalite').attr("src", "https://www.google.com/maps/embed/v1/place?key=AIzaSyCUJKEp3xoJEZzWtpKj3rk20CiC7mLOpt8&q="+ $(this).text() +",Bath&maptype=satellite&zoom=18");
	
	
	});
	//is travel maps
	$(".neo").children().not("li.default").click(function(){ //not travel maps
		var selectByBuilding = $("dt.building").text();
		var selectByText = $(this).text();
		
		if(selectByText == "Bus Station"){
			var correctByText = "First, 1 Dorchester St";
			$('#satalite').attr("src", "https://www.google.com/maps/embed/v1/directions?key=AIzaSyCUJKEp3xoJEZzWtpKj3rk20CiC7mLOpt8&origin="+ selectByBuilding +",Bath&destination="+ correctByText +",Bath&avoid=highways");
		}
		else if(selectByText == "Taxi Rank"){ var correctByText = "Orange Grove";
	$('#satalite').attr("src", "https://www.google.com/maps/embed/v1/directions?key=AIzaSyCUJKEp3xoJEZzWtpKj3rk20CiC7mLOpt8&origin="+ selectByBuilding +",Bath&destination="+ correctByText +",Bath&avoid=highways");
		}
		 else if(selectByText == "Bike in Bath"){ var correctByText = "Seymour St";
			$('#satalite').attr("src", "https://www.google.com/maps/embed/v1/directions?key=AIzaSyCUJKEp3xoJEZzWtpKj3rk20CiC7mLOpt8&origin="+ selectByBuilding +",Bath&destination="+ correctByText +",Bath&avoid=highways");
		}
		else{
			$('#satalite').attr("src", "https://www.google.com/maps/embed/v1/directions?key=AIzaSyCUJKEp3xoJEZzWtpKj3rk20CiC7mLOpt8&origin="+ selectByBuilding +",Bath&destination="+ selectByText +",Bath&avoid=highways");	
		}
	});
});