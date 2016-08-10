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
	//var supportTouch = $.support.touch,
    //        scrollEvent = "touchmove scroll",
    //        touchStartEvent = supportTouch ? "touchstart" : "mousedown",
    //        touchStopEvent = supportTouch ? "touchend" : "mouseup",
    //        touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
    //$.event.special.swipeupdown = {
    //    setup: function() {
    //        var thisObject = this;
    //        var $this = $(thisObject);
    //        $this.bind(touchStartEvent, function(event) {
    //            var data = event.originalEvent.touches ?
    //                    event.originalEvent.touches[ 0 ] :
    //                    event,
    //                    start = {
    //                        time: (new Date).getTime(),
    //                        coords: [ data.pageX, data.pageY ],
    //                        origin: $(event.target)
    //                    },
    //                    stop;
//
    //            function moveHandler(event) {
    //                if (!start) {
    //                    return;
    //                }
    //                var data = event.originalEvent.touches ?
    //                        event.originalEvent.touches[ 0 ] :
    //                        event;
    //                stop = {
    //                    time: (new Date).getTime(),
    //                    coords: [ data.pageX, data.pageY ]
    //                };
//
    //                // prevent scrolling
    //                if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
    //                    event.preventDefault();
    //                }
    //            }
    //            $this
    //                    .bind(touchMoveEvent, moveHandler)
    //                    .one(touchStopEvent, function(event) {
    //                $this.unbind(touchMoveEvent, moveHandler);
    //                if (start && stop) {
    //                    if (stop.time - start.time < 1000 &&
    //                            Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
    //                            Math.abs(start.coords[0] - stop.coords[0]) < 75) {
    //                        start.origin
    //                                .trigger("swipeupdown")
    //                                .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
    //                    }
    //                }
    //                start = stop = undefined;
    //            });
    //        });
    //    }
    //};
    //$.each({
    //    swipedown: "swipeupdown",
    //    swipeup: "swipeupdown"
    //}, function(event, sourceEvent){
    //    $.event.special[event] = {
    //        setup: function(){
    //            $(this).bind(sourceEvent, $.noop);
    //        }
    //    };
    //});
    var div = 0;
    var running = false;
	var handler = function (e) {
		if (running) {
			return;
		}
		running = true;
		console.log(e.type);
		//if (e.type == 'swpieup') {
		//	dir = 'down';
		//}
		//else if (e.type == 'swipedown') {
		//	dir = 'up';
		//}
		//if(e.type == 'DOMMouseScroll' || e.type =='mousewheel'){		
			if (e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0) {
				dir = 'down';
			}
			else {
				dir = 'up';
			}
		//}
		if (e.type == 'keydown') {
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
		var slide;
		divs = $('.home, .about, .skills, .projects-prelude, .project-1, .project-2, .project-3, .project-4, .contact');
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
			div++;
			slide = div - 1;
			console.log(div);

		}
		if (dir == 'down' && div == divs.length) {
			div--;
			console.log(div);
			running = false;
			return;
		}
	//	 $nrNav = $('.navigation__list__item__link').attr('data-nrNav');
	//	if (div == $nrNav) {
			//$('.navigation__list__item__link').removeClass('active-nav-link');
	//	}
	//	else if (div != $nrNav) {
	//	}
		if (e.type == 'click') {
			divs.fadeOut(100);
		}
	//	$('.navigation__list__item__link[data-nrNav='+div+']').addClass('active-nav-link');
		divs.eq(slide).fadeOut(200, function(){
			divs.eq(div).fadeIn(200, function() {
				running = false;
				console.log(running);
				console.log(slide);
				console.log(div);
			});
		});
		if (div == 1 || div == 4) {
			$('.container').fadeIn(100);
		}
		$('.container').addClass('active');
		setTimeout(function(){
		$('.container').removeClass('active').fadeOut(0);
			if (div != 0 && div != 3) {
				$('.container').fadeIn(200);
				//console.log('dupa');
			}
				console.log(running);
	},200);
		return false;
	};


	$('.navigation__button').on('click', function(){
		if ($('.navigation__button').hasClass('active-nav')) {
			$('.navigation__button').removeClass('active-nav');
			$('.navigation__list').animate({
				'margin-right':'-50vw'
			});
			$('.navigation__shadow').animate({
				'margin-left':'-50vw'
			});
		}
		else {
			$('.navigation__button').addClass('active-nav');
			$('.navigation__list').animate({
				'margin-right':'0'
			}, 600);
			$('.navigation__shadow').animate({
				'margin-left':'0'
			},600);
		}
	});
	$('.navigation__list__item').on('click', function(e){
		$nrSection = $(this).index();
		$('.navigation__button').removeClass('active-nav');
		$('.navigation__list').animate({
			'margin-right':'-50vw'
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
	});
	//var nrSection=0;
	$(document.body).on('DOMMouseScroll mousewheel keydown swipedown swipeup', handler );
	$(document).on('swipedown',function(){
		console.log('ok');
	})
});
