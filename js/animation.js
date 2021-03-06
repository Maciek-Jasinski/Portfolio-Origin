$(document).ready(function(){

	// Text in logo
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

	//page slider on mobile devices
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
    //page slider
    var angle = 0;
    var div = 0;
    var running = false;
	var slide;
	var handler = function (e) {
		var dir = 'down'
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
		if (dir == 'up' && div == 0) {
			running = false;
			return;
		}
		if (dir == 'up' && div > 0) {
		
			div--;
			slide = div + 1;
		}
		if (dir == 'down' && div < divs.length) {
				div++;
				slide = div - 1;

		}
		if (dir == 'down' && div == divs.length) {
			div--;
			running = false;
			return;
		}
		if (div == 3 && dir == 'up') {
			div--;
			slide = div + 2;
		}
		if (e.type == 'click') {
			divs.fadeOut(100);
		}
		angle = (div * 90) % 810;
		divs.eq(slide).fadeOut(350);
			divs.eq(div).fadeIn(200, function() {

				if (div == 3 && dir == 'down'){
					div++;
					slide = div - 1;

					(function(){
						running = true;
						setTimeout(function(){
							divs.eq(slide).fadeOut(350);
							divs.eq(div).fadeIn(450);
								$('.container').fadeIn(200);
								$('.logo-letter').fadeIn(500);
								$('.container').css({ transition: "transform 0.5s cubic-bezier(.14,.71,.31,1.19)",
									transform: "rotate("+angle+"deg)"
								 });
								running = false;
							
						}, 2000);
					})();
				}
				else {
						running = false;
					}
				});
		if (div == 0 || div == 3) {
			$('.container').fadeOut(100);
			$('.logo-letter').fadeOut(100);
		}
		$('.container').css({ transition: "transform 0.5s cubic-bezier(.14,.71,.31,1.19)",
									transform: "rotate("+angle+"deg)"
								 });
				if (div != 0 && div != 3) {
					$('.container').fadeIn(200);
					$('.logo-letter').fadeIn(0);
				}
		//Navigation hamburger color
		if ($('body').width() <= 900) {
			if (div == 5) {
				$('.navigation__button').addClass('white-button');
			}
			else {
				$('.navigation__button').removeClass('white-button');
	
			}
		}
		else {
			$('.navigation__button').removeClass('white-button');
		}
		return false;
	};
	//Navigation animations
	$('.navigation__button').on('click', function(){
		if ($('body').width() <= 900) {
			if ($('.navigation__button').hasClass('active-nav')) {
				$('.navigation__button').removeClass('active-nav');
				$('.navigation__list').animate({
					'right':'-100vw'
				});
				$('.navigation__shadow').animate({
					'margin-left':'-50vw'
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
					'right':'-50vw'
				});
				$('.navigation__shadow').animate({
					'margin-left':'-50vw'
				});
			}
			else {
				$('.navigation__button').addClass('active-nav');
				$('.navigation__list').animate({
					'right':'0'
				}, 600);
				$('.navigation__shadow').animate({
					'margin-left':'0'
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
			$('.navigation__shadow').animate({
					'margin-left':'-50vw'
			});
			if ($nrSection < 4){
			div = $nrSection - 1;	
			}
			else {
				div = $nrSection + 3;
			}
		handler(e);
		}
		else {
			$('.navigation__button').removeClass('active-nav');
			$('.navigation__list').animate({
				'right':'-50vw'
			});
			$('.navigation__shadow').animate({
				'margin-left':'-50vw'
			});
		if ($nrSection < 4){
			div = $nrSection - 1;	
		}
		else {
			div = $nrSection + 3;
		}
		handler(e);
		}
	});
	var nrSection=0;
	$(document.body).on('DOMMouseScroll mousewheel keydown swipeup swipedown', handler );
	
	$(window).resize(function(){     
	   if (($('body').width() <= 900) && (!($('.navigation__button')).hasClass('active-nav'))) {
	      $('.navigation__list').css({'right':'-100vw'})
		}
	   else if (($('body').width() > 900) && (!($('.navigation__button')).hasClass('active-nav'))){
	      $('.navigation__list').css({'right':'-50vw'})   
	   }
      	
	});


});
