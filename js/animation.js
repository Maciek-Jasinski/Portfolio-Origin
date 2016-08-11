$(document).ready(function(){


   var showText = function (target, message, index, interval) {   
  		if (index < message.length) {
    		$(target).append(message[index++]);
    		setTimeout(function () { showText(target, message, index, interval); }, interval);
  		}
	}
	$(function () {
 		showText(".home__border-1", "frontend", 0, 200);
    	showText(".home__border-2", "frontend", 0, 200);   
   		showText(".home__border-3", "developer", 0, 180);   
 		showText(".home__border-4", "developer", 0, 180);      
	});
	var $nrBar = 0;
	$('.skills__icons__list__item').on('click', function(){
		$nrBar = $(this).index();
		$('.skills__icons__list__item').removeClass('icon-hover');
		$(this).addClass('icon-hover');
		$('.skills__description__bars__item').animate({
			width: '0%'
		}).fadeOut(200);
		$('.skills__description__bars__item__value').fadeOut(200);
		$('.skills__description__bars__item[data-nrBar='+$nrBar+']').fadeIn().animate({
			width: '50%'
		});
		$('.skills__description__bars__item__value[data-nrValue='+$nrBar+']').delay(1000).fadeIn(100);
		console.log($nrBar);
	});
	var supportTouch = $.support.touch,
            scrollEvent = "touchmove scroll",
            touchStartEvent = supportTouch ? "touchstart" : "mousedown",
            touchStopEvent = supportTouch ? "touchend" : "mouseup",
            touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
    $.event.special.swipeupdown = {
        setup: function() {
            var thisObject = this;
            var $this = $(thisObject);
            $this.bind(touchStartEvent, function(event) {
                var data = event.originalEvent.touches ?
                        event.originalEvent.touches[ 0 ] :
                        event,
                        start = {
                            time: (new Date).getTime(),
                            coords: [ data.pageX, data.pageY ],
                            origin: $(event.target)
                        },
                        stop;

                function moveHandler(event) {
                    if (!start) {
                        return;
                    }
                    var data = event.originalEvent.touches ?
                            event.originalEvent.touches[ 0 ] :
                            event;
                    stop = {
                        time: (new Date).getTime(),
                        coords: [ data.pageX, data.pageY ]
                    };

                    // prevent scrolling
                    if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                        event.preventDefault();
                    }
                }
                $this
                        .bind(touchMoveEvent, moveHandler)
                        .one(touchStopEvent, function(event) {
                    $this.unbind(touchMoveEvent, moveHandler);
                    if (start && stop) {
                        if (stop.time - start.time < 1000 &&
                                Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                                Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                            start.origin
                                    .trigger("swipeupdown")
                                    .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                        }
                    }
                    start = stop = undefined;
                });
            });
        }
    };
    $.each({
        swipedown: "swipeupdown",
        swipeup: "swipeupdown"
    }, function(event, sourceEvent){
        $.event.special[event] = {
            setup: function(){
                $(this).bind(sourceEvent, $.noop);
            }
        };
    });
    var div = 0;
    var running = false;
	var slide;
	var dir;
	var handler = function (e) {
		if (running) {
			return;
		}
		divs = $('.home, .about, .skills, .projects-prelude, .project-1, .project-2, .project-3, .project-4, .contact');
		running = true;
		if (e.type == 'swipeup') {
			dir = 'down';
		}

		else if (e.type == 'swipedown') {
			dir = 'up';
		}
		else if (e.type == 'keydown') {
			if (e.keyCode == 40) {
				dir = 'down';
			}
			else if (e.keyCode == 38) {
				dir = 'up';
			}
			else {
				running = false;
				return;
			}
		}
		else if(e.type == 'DOMMouseScroll' || e.type =='mousewheel'){		
			if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
				dir = 'down';
			}
			else {
				dir = 'up';
			}
		}
		else if (e.type == 'click') {
			divs.fadeOut(100);
		}
		console.log(e.type);
		if (dir == 'up' && div == 0) {
			running = false;
			return;
		}
		if (dir == 'up' && div > 0) {
		
			div--;
			slide = div + 1;
			console.log(div);

		}

		if (dir == 'down' && div < divs.length) {
			//if (div == 3) {
			//	div++;
				
			//	}
			//else {
				div++;
				slide = div - 1;
			//}
			console.log(div);

		}
		if (dir == 'down' && div == divs.length) {
			div--;
			console.log(div);
			running = false;
			return;
		}
		//if (div == 3) {
		//	$('.navigation__button__item').css("background-color", "white");
		//	$('.navigation__button__item:nth-child(2)').css("background-color", 'transparent');
		//	//$('.navigation__button').on('click', function(){
		//	//	if ($('.navigation__button').hasClass('active-nav')) {
		//	//		$('.navigation__button').removeClass('active-nav');
		//	//	}
		//	//	else {
		//	//		$('.navigation__button').addClass('active-nav');
		//	//	}
		//	//});
		//}
		//else {
		//	$('.navigation__button__item').css("background-color", "#37b30e");
		//}
	//	$('.navigation__list__item__link[data-nrNav='+div+']').addClass('active-nav-link');
		if (div == 3 && dir == 'up') {
			div--;
			slide = div + 2;
		}
		//else {
		divs.eq(slide).fadeOut(200, function(){
			divs.eq(div).fadeIn(200, function() {

				if (div == 3 && dir == 'down'){
					div++;
					slide = div - 1;

					(function(){
						running = true;
						divs.eq(slide).delay(600).fadeOut(200, function(){
							divs.eq(div).fadeIn(200, function() {
								console.log('dzialam');
								running = false;
							});
						});
					})();
				}
			else {
					running = false;
				}
			});
		});
		//}
		if (div == 1 || div == 4) {
			$('.container').fadeIn(100);
		}
		$('.container').addClass('active');
		setTimeout(function(){
			$('.container').removeClass('active').fadeOut(0);
				if (div != 0 && div != 3) {
					$('.container').fadeIn(200);
				}
		},200);
		return false;
	};


	$('.navigation__button').on('click', function(){
		if ($('body').width() <= 900) {
			if ($('.navigation__button').hasClass('active-nav')) {
				$('.navigation__button').removeClass('active-nav');
				$('.navigation__list').animate({
					'right':'-100vw'
				});
			}
			else {
				$('.navigation__button').addClass('active-nav');
				$('.navigation__list').animate({
					'right':'0'
				}, 600);
			}
		} 
		else {
			if ($('.navigation__button').hasClass('active-nav')) {
				$('.navigation__button').removeClass('active-nav');
				$('.navigation__list').animate({
					'right':'-100vw'
				});
			}
			else {
				$('.navigation__button').addClass('active-nav');
				$('.navigation__list').animate({
					'right':'0'
				}, 600);
			}
		}
	});
	$('.navigation__list__item').on('click', function(e){
		$nrSection = $(this).index();
		if ($('body').width() <= 900) {
			$('.navigation__button').removeClass('active-nav');
			$('.navigation__list').animate({
				'right':'-100vw'
			});
		}
		else {
			$('.navigation__button').removeClass('active-nav');
			$('.navigation__list').animate({
				'right':'-50vw'
			});
			$('.navigation__shadow').animate({
				'margin-left':'-50vw'
			});
		}
		if ($nrSection < 4){
			div = $nrSection - 1;	
		}
		else {
			div = $nrSection + 3;
		}
		handler(e);
	});
	var nrSection=0;
	$(document.body).on('DOMMouseScroll mousewheel keydown swipeup swipedown', handler );
	


});
	//$(window).resize(function(){     
	//   if ($('body').width() <= 900 ){
	//   	$('.navigation__button').on('click', function(){
	//		if ($('.navigation__button').hasClass('active-nav')) {
	//			$('.navigation__button').removeClass('active-nav');
	//			$('.navigation__list').animate({
	//				'right':'-50vw'
	//			});
	//		}
	//		else {
	//			$('.navigation__button').addClass('active-nav');
	//			$('.navigation__list').animate({
	//				'right':'50vw'
	//			}, 600);
	//		}
	//	});
	//	$('.navigation__list__item').on('click', function(e){
	//		$nrSection = $(this).index();
	//		$('.navigation__button').removeClass('active-nav');
	//		$('.navigation__list').animate({
	//			'right':'50vw'
	//		});
	//	});
    //  	}
	//});
