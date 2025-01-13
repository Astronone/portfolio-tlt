jQuery(function($){
	"use strict";

	var $window = $(window);
	var $header = $('.header');

	$window.scroll(onScroll);

	function onScroll() {
	  if ($window.scrollTop()) {
		$header.addClass('is-active');
	  } else {
		$header.removeClass('is-active');
	  }
	}

	$('.slider_f').each(function(){
		var $slide = $('.sld_f', this);
		var $prev = $('.arrow_l', this);
		var $next = $('.arrow_r', this);


		window.intervalId = setInterval(function () {
			moveNext();
		}, 6000);

		$slide.eq(0).addClass('active');

		function clearI() {
			clearInterval(intervalId)
			intervalId = setInterval(function () {
				moveNext();
			}, 6000);
		}

		function movePrev() {
			clearI();
			var index = $slide.filter('.active').index();
			if(index == 0){
				index = $slide.length
			}
			$slide.eq(index-1).addClass('active').siblings().removeClass('active');
		}

		function moveNext() {
			clearI();
			var index = $slide.filter('.active').index();
			if(index == $slide.length-1){
				index = -1;
			}
			$slide.eq(index+1).addClass('active').siblings().removeClass('active');
		}

		$prev.on("click", function() {
			movePrev();
		});

		$next.on("click", function() {
			moveNext();
		});
	})

	// 	init scrollmagic
	// var controller = new ScrollMagic.Controller();

	// 	loop through slides
	// $(".slider_f").each( function () {

	// 	var bg = $(this).find(".slider");

	// 	// Add tweenmax for backgroundParallax
	// 	var parallax = TweenMax
	// 	.from( bg, 1, {
	// 		y: '-40%',
	// 		ease: Power0.easeNone,
  	// 		// scale: 1.2
	// 	});

	// 	// Create scrollmagic scene
	// 	var parallaxScene = new ScrollMagic.Scene({
	// 		triggerElement: this, // <-- Use this to select current element
	// 		triggerHook: 1,
	// 		duration: '200%',
	// 	})
	// 	.setTween( parallax )
	// 	.addTo(controller);

	// });
	/**
	* TILT
	*/
	$(document).ready(function() {
		VanillaTilt.init(document.querySelector(".tilt"), {
			max: 2,
		});
		VanillaTilt.init(document.querySelector(".tilt_gallery"), {
			max: 2,
			scale: 1.2,
			speed: 500,
			glare: true,
		});
	});

	$('.cocoen').cocoen();

	$(document).ready(function() {
		$(window).breakpoints();
	});
	/**
	* More Menu
	*/
	function calcWidth() {
		var navwidth = 0;
		var morewidth = $('#primary-menu .more').outerWidth(true);
		var availablespace = $('#primary-menu').outerWidth(true) - morewidth;

		// Get width of all list elements except for 'more'.
		$('#primary-menu > ul > li:not(.more)').each(function() {
		navwidth += $(this).outerWidth(true);
		});

		if (navwidth > availablespace) {
		var lastItem = $('#primary-menu > ul > li:not(.more)').last();
		lastItem.attr('data-width', lastItem.outerWidth(true));
		// If there's no ".more" element, make it.
		if( !$( 'li.more' ).length ){
					$( '#primary-menu > ul' ).append( '<li class="more page_item_has_children"><a><span class="fa fa-ellipsis-h"></span></a><ul class="children"></ul></li>' );
				}
		lastItem.prependTo($('#primary-menu .more > ul'));
		if( lastItem.hasClass( 'page_item_has_children' )) {
			var subMenu = lastItem.find( '.children' );
			subMenu.appendTo( lastItem );
		}
		// Recalculate after every stow operation.
		calcWidth();
		} else {
			var firstMoreElement = $('#primary-menu > ul li.more li').first();
			if (navwidth + firstMoreElement.data('width') < availablespace) {
			firstMoreElement.insertBefore($('#primary-menu .more'));
			}
		}
		if ($('.more li').length > 0) {
			$('.more').css('display', 'inline-block');
			$( '.more' ).css( 'cursor', 'pointer');
		} else {
			$('.more').css('display', 'none');
		}
	}
	$(window).on('resize load', function() {
		$(window).breakpoints('greaterEqualTo', 'lg', function() {
			calcWidth();
		})
	});
	var height_left_menu = $('.quadmenu-navbar-nav').width();
	var height_main_left_menu = $('.container-dynamic').height();
	var top_left_menu = $('.quadmenu-navbar-nav').css("top");


	function left_menu_hide_items() {
		let timerId = setInterval(function() {
			var h_left_menu = $('.quadmenu-navbar-nav').width();
			var top_left_menu = $('.quadmenu-navbar-nav').css("top");
			var last_el_left_menu  = $('.left_menu .quadmenu-navbar-nav li').last();
			var h_main_left_menu = $('.container-dynamic').height();
			if(h_main_left_menu <= 980 && h_main_left_menu >= 770) {
				if(h_left_menu >= 530) {
					$(last_el_left_menu).prependTo('.other-nav');
				} else {
					clearInterval(timerId);
				}
			}
			if(h_main_left_menu <= 770 && h_main_left_menu >= 640) {
				if((h_left_menu + parseInt(top_left_menu, 10)) >= 680) {
					$(last_el_left_menu).prependTo('.other-nav');
				} else {
					clearInterval(timerId);
				}
			}
			if(h_main_left_menu <= 640) {
				if((h_left_menu + parseInt(top_left_menu, 10)) >= 570) {
					$(last_el_left_menu).prependTo('.other-nav');
				} else {
					clearInterval(timerId);
				}
			}
		}, 0);
	}
	if($('.navbar').hasClass('left_menu')) {
		$(window).on('greaterEqualTo-md', function() {
			if($('body').hasClass('astroon_hide_other_nav')) {
				$(".other-nav").siblings().append('<div class="other-nav-button"><i class="fas fa-ellipsis-h"></i></div>');
				$(".other-nav").hide().addClass('other-nav-min');
				$('.other-nav-button').on('click', function() {
					$(".other-nav").toggle( "slow" );
				});
			}
			if(((height_left_menu + parseInt(top_left_menu, 10)) >= 750 && height_main_left_menu <= 950) || ((height_left_menu + parseInt(top_left_menu, 10)) >= 630 && height_main_left_menu <= 920)) {
				left_menu_hide_items();
				$(".other-nav").siblings().append('<div class="other-nav-button"><i class="fas fa-ellipsis-h"></i></div>');
				$(".other-nav").hide().addClass('other-nav-min');
				$('.other-nav-button').on('click', function() {
					$(".other-nav").toggle( "slow" );
				});
			}
			if(height_main_left_menu <= 800 && $(".other-nav .socials > *, .other-nav > li > .icon_search").length > 1) {
				$(".other-nav").siblings().append('<div class="other-nav-button"><i class="fas fa-ellipsis-h"></i></div>');
				$(".other-nav").hide().addClass('other-nav-min');
				$('.other-nav-button').on('click', function() {
					$(".other-nav").toggle( "slow" );
				});
			}
		});
	}
	// hamburger_menu
	$('.navbar-toggler').on('click', function(){
		let nav = $(this).closest('.hamburger_menu')
		if(nav.hasClass('hamburger_menu_open')) {
			nav.removeClass('hamburger_menu_open')
		} else {
			nav.addClass('hamburger_menu_open')
		}
	})
	// Quantity
	$('.astroon-quantity__button').on('click', function (e) {
		e.preventDefault();
		let input = $(this).siblings('[type="number"]');
		if($(this).hasClass('plus')) {
			input.val(parseInt(input.val()) + 1);
		} else if($(this).hasClass('minus')) {
			if(input.val() >= 2) {
				input.val(parseInt(input.val()) - 1);
			}
		}
		$( "button[name*='update_cart']" ).removeAttr('disabled').data('aria-disabled','false');
	})
})



