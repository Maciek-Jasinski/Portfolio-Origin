$(document).ready(function(){
		//sliders
		autoChangeSlide();
		var $nrSlide=0;
		$(".testimonies__switcher__item").on('click', function(){ 
			$nrSlide = $(this).index(); changeSlide();
		});
	function autoChangeSlide(){
		$(".testimonies__switcher__item[data-nrSlide = "+$nrSlide+"]").css({"background-color": "transparent"});
		if ($nrSlide>2){
			$nrSlide=0;
		}	
		$(".testimonies__slider").animate({right: $nrSlide + "00%"},800,"swing");
		$(".testimonies__switcher__item").css({"background-color": "transparent"});
		$(".testimonies__switcher__item[data-nrSlide = "+$nrSlide+"]").css({"background-color": "#e84c3d"});
		$nrSlide++;
			setTimeout(function(){autoChangeSlide();}, 4000);
		return;
	}
	function changeSlide(){
		$(".testimonies__slider").animate({right: $nrSlide + "00%"},800,"swing");
		$(".testimonies__switcher__item").css({"background-color": "transparent"});
		$(".testimonies__switcher__item[data-nrSlide = "+$nrSlide+"]").css({"background-color": "#e84c3d"});
	}

	//Fixed navigation
	$(window).on('scroll resize', function(){
		var scroll = $(window).scrollTop() + 60;
		var height = $('.about').offset().top;
		if (scroll>=height){
			$('.site-header').addClass('site-header--fixed');
		}
		else{
			$('.site-header').removeClass('site-header--fixed');
		}
	});
		//Menu open
	$('.navigation__hamburger').on('click', function(){
		$('.navigation__list').slideToggle();
	});
	var width = $(window).width();
	$(window).resize(function(){
	 	width = $(window).width();
	})
	$(window).scroll(function(){
		if (width<1000){
			$('.navigation__list:visible').slideUp();
		}
	});
	$(window).resize(function(){
		if (width<1000){
			$('.navigation__list:visible').slideUp();
		}
		else if (width>=1000){
		$('.navigation__list:hidden').slideDown();
		$('.navigation__list').css({"display":"inline-block"});
	}
	});
	//Animation scroll and navigation scroll
	var slide=[];
	$.each($('.home, .about, .ideas, .service, .team, .contact, .site-footer'), function(i,element){
			slide[i]=$(element).offset().top;
		});
	$(window).on('scroll resize', function(){
		$.each($('.home, .about, .ideas, .service, .team, .contact, .site-footer'), function(i,element){
			slide[i]=$(element).offset().top;
		});
	});
	var nrSection=0;
	$(".navigation__list__item").on('click', function(){
	    var scroll="";
		$nrSection = $(this).index();
		if ($nrSection>1){
			scroll = slide[$nrSection + 1];
		}
		else {
			scroll = slide[$nrSection];
		}
		$("html, body").stop().animate( { scrollTop: scroll }, 1000);
		console.log($(this).index())
	});

	//animation scroll
	var $animation_elements = $('section');
	$(window).on('scroll resize', function(){
		var window_height = $(window).height();
  		var window_top_position = $(window).scrollTop();
  		var window_bottom_position = (window_top_position + window_height);
  		$.each($animation_elements, function(){
  			var $element = $(this);
    		var element_height = $element.outerHeight();
    		var element_top_position = $element.offset().top;
    		var element_bottom_position = (element_top_position + element_height);
    		 if ((element_bottom_position >= window_top_position) &&
       			(element_top_position <= window_bottom_position)) {
    		 	$(this).find('*').css({"animation-play-state":"running"});}
  		});
	});
});