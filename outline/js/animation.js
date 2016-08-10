$(document).ready(function() {

	//sliders

	autoChangeSlide();
	var $nrSlide=0;
	$(".testimonies__users__switcher__item").on('click', function(){ 
		$nrSlide = $(this).index(); changeSlide();
	});
	function autoChangeSlide(){
		$(".testimonies__users__switcher__item[data-nrSlide = "+$nrSlide+"]").css({"background-color": "#ccc"});
		if ($nrSlide>2){
			$nrSlide=0;
		}	
		$(".testimonies__users__list").animate({right: $nrSlide + "00%"},800,"swing");
		$(".testimonies__users__switcher__item").css({"background-color": "#ccc"});
		$(".testimonies__users__switcher__item[data-nrSlide = "+$nrSlide+"]").css({"background-color": "#fff"});
		$nrSlide++;
			setTimeout(function(){autoChangeSlide();}, 4000);
		return;
	}
	function changeSlide(){
		$(".testimonies__users__list").animate({right: $nrSlide + "00%"},800,"swing");
		$(".testimonies__users__switcher__item").css({"background-color": "#ccc"});
		$(".testimonies__users__switcher__item[data-nrSlide = "+$nrSlide+"]").css({"background-color": "#fff"});
	}
	var slide=[];
	var scroll="";
	$.each($('.home, .clients, .features, .design, .testimonies__users, .testimonies__numbers, .products, .benefits, .app-spot, .pricing, .faqs, .sing-up'), function(i,element){
		slide[i]=$(element).offset().top - 60;
	});

	$(window).on('scroll resize', function(){
		$.each($('.home, .clients, .features, .design, .testimonies__users, .testimonies__numbers, .products, .benefits, .app-spot, .pricing, .faqs, .sing-up'), function(i,element){
		slide[i]=$(element).offset().top - 60;
		});
	});
		$(".navigation__list__item__link").click(function(){
		if($(this).attr('href')=="#1"){scroll=slide[0];}
		else if($(this).attr('href')=="#2"){scroll=slide[2];}
		else if($(this).attr('href')=="#3"){scroll=slide[3];}
		else if($(this).attr('href')=='#4'){scroll=slide[4];}
		else if($(this).attr('href')=='#5'){scroll=slide[6];}
		else if($(this).attr('href')=='#6'){scroll=slide[7];}
		else if($(this).attr('href')=='#7'){scroll=slide[9];}
		else if($(this).attr('href')=='#8'){scroll=slide[10];}
		$("html, body").stop().animate( { scrollTop: scroll }, 1000);
	});

	$('li.faqs__list__item__answer').filter(':nth-child(n+3)').addClass('hide');

	$('ul').on('click','li.faqs__list__item__title',function(){
		$(this).next().slideDown(500).siblings('li.faqs__list__item__answer').slideUp(500);
	});


	$('.nav-icon__hamburger').click(function(){
		if($('header').hasClass('page_translate')){
			$('header, main, footer, .navigation').removeClass('page_translate');
		
			}
		else if(($(window).trigger("scroll"))&&($('header').hasClass('page_translate'))){
			$('header, main, footer, .navigation').removeClass('page_translate');
			
		}
		else{
			$('header, main, footer, .navigation').addClass('page_translate');
			
		}
	});

	$(window).scroll(function(){
		if($('header').hasClass('page_translate')){
				$('header, main, footer, .navigation').removeClass('page_translate');
		}
	});


	//$(window).scroll(function(){
	//	var move=$(window).scrollTop();
	//	var height_window=$(window).height();
//
	//	if((move>(slide[1]-height_window))&&(move<(slide[2]-height_window/4))){
	//		$('.clients__list__item').css({"animation-play-state":"running"});}
//
	//	if((move>(slide[2]-height_window))&&(move<(slide[3]-height_window/4))){
	//		$('.features__title, .features__description, .features__list a, .features__button').css({"animation-play-state":"running"});}
	//	
	//	if((move>(slide[3]-height_window))&&(move<(slide[4]-height_window/4))){
	//		$('.design__title, .design__description, .design__list__item, .design__list2__item, .design__items').css({"animation-play-state":"running"});}
//
	//	if((move>(slide[4]-height_window))&&(move<(slide[5]-height_window/4))){
	//		$('.testimonies__users__list__item').css({"animation-play-state":"running"});}
//
	//	if((move>(slide[5]-height_window))&&(move<(slide[6]-height_window/4))){
	//		$('.testimonies__numbers__list__item').css({"animation-play-state":"running"});}
//
	//	if((move>(slide[6]-height_window))&&(move<(slide[7]-height_window/4))){
	//		$('.products__title, .products__desc, .products__list__item, .products__button').css({"animation-play-state":"running"});}
//
	//	if((move>(slide[7]-height_window))&&(move<(slide[8]-height_window/4))){
	//		$('.benefits__title, .benefits__description, .benefits__list__item').css({"animation-play-state":"running"});}
//
	//	if((move>(slide[8]-height_window))&&(move<(slide[9]-height_window/4))){
	//		$('.app-spot__title, .app-spot__description, .app-spot__button').css({"animation-play-state":"running"});}
//
	//	if((move>(slide[9]-height_window))&&(move<(slide[10]-height_window/4))){
	//		$('.pricing__title, .pricing__description, .pricing__list__item').css({"animation-play-state":"running"});}
//
	//		if((move>(slide[9]-height_window))&&(move<(slide[10]-height_window/4))){
	//		$('.faqs__title, .faqs__description, .faqs__list__item').css({"animation-play-state":"running"});}
	//});

var $animation_elements = $('section, footer');
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
	$(window).scroll(function(){
	var scroll = $(window).scrollTop();
	var height = $('.testimonies__users').offset().top;
	var running = true;
	if ((scroll>=height)&&(running === true)){
		$('.count').each(function () {
		  var $this = $(this);
		  jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
		    duration: 1000,
		    easing: 'swing',
		    step: function (now) {
		      $this.text(Math.ceil(this.Counter));
		    }

		  });
		});
		running = false;

	}
	});
	//Fixed navigation
	$(window).on('scroll resize', function(){
		var scroll = $(window).scrollTop() + 60;
		var height = $('.clients').offset().top;
		if (scroll>=height){
			$('.site-header').addClass('site-header--fixed');
		}
		else{
			$('.site-header').removeClass('site-header--fixed');
		}
	});
	
});


