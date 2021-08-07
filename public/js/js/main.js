var html_popup;
jQuery('document').ready(function(){
	jQuery(".js__heapbox").select2({
		 minimumResultsForSearch: Infinity
	});

	jQuery(".js__heapbox").on("select2:open",function(){
		jQuery(".select2-results").mCustomScrollbar({
			scrollInertia: 200
		});
	});

	jQuery(".js__dropdown").on("click",function(){
		jQuery(this).toggleClass("js__active");
		jQuery(jQuery(this).data("target")).stop().slideToggle(400);
	});

	jQuery("#wrapper").on("click",function(event){
		if (jQuery(".js__dropdown.js__active").length){
			var selector = jQuery(event.target);
			if (selector.hasClass("js__dropdown") || selector.parents(".js__dropdown").length || selector.hasClass("js__dropdown_target") || selector.parents(".js__dropdown_target").length){
				//do nothing
			}else{
				jQuery(".js__dropdown.js__active").removeClass("js__active");
				jQuery(".js__dropdown_target").stop().slideUp(400);
			}
		}
	});

	jQuery(".js__main_slider").flexslider({
		directionNav: true,
		animation: "slide",
		minItems: 1,
		maxItems: 1,
	});

	film_slider();

	jQuery(".js__tab").on("click",function(){
		jQuery(".js__tab.js__active,.js__tab_content.js__active").removeClass("js__active")
		jQuery(this).addClass("js__active");
		jQuery(jQuery(this).data("target")).addClass("js__active");
	});

	jQuery(".js__promotion_tab").on("click",function(){
		jQuery(".js__promotion_tab.js__active,.js__promotion_tab_content.js__active").removeClass("js__active")
		jQuery(this).addClass("js__active");
		jQuery(jQuery(this).data("target")).addClass("js__active");
	});

	jQuery("#toTop").on("click",function(){
		jQuery(window).scrollTo("0px",400)
	});

	jQuery(".js__popup").on("click",function(event){
		event.preventDefault();
		if (html_popup){
			html_popup.appendTo("body");
			html_popup = null;
		}
		jQuery(jQuery(this).data("target")).addClass("js__active");
		jQuery("body").addClass("js__popup_active");
	});

	jQuery(".js__popup_close").on("click",function(event){
		event.preventDefault();
		jQuery(this).parents(".js__popup_modal").removeClass("js__active");
		jQuery("body").removeClass("js__popup_active");
		html_popup = jQuery(this).parents(".js__popup_modal").detach();
	});
});

jQuery(window).on("resize",function(){
	film_slider();
});

jQuery(window).on("scroll",function(){
	if (jQuery(window).scrollTop() > 1000){
	   jQuery(".main_header").addClass("fixed");
		jQuery("#toTop").show();
	}else{
	   jQuery(".main_header").removeClass("fixed");
		jQuery("#toTop").hide();
	}
});

jQuery(window).bind("load",function(){
	jQuery('.js__flexslider').flexslider({
		animation: "slide",
		slideshowSpeed: 3000,
		pauseOnHover: true,
		controlNav: false,
		directionNav: false,
		direction: "vertical"
	});

	jQuery(".js__flexslider_promotion").flexslider({
		animation: "slide",
		controlNav: true,
		directionNav: false,
		itemWidth: 430,
		itemMargin: 24,
		move: 1
	});

	jQuery(".js__flexslider_member").flexslider({
		animation: "slide",
		controlNav: false,
		directionNav: false,
		itemWidth: 250,
		itemMargin: 65,
		move: 1
	});


	jQuery(".js__flexslider_promotion_film_detail").flexslider({
		animation: "slide",
		controlNav: false,
		directionNav: true,
		itemWidth: 680,
		itemMargin: 30,
		move: 1,
		item: 1,
	});

	jQuery(".js__film_slider").each(function(){
		jQuery(this).flexslider({
			animation: "slide",
			controlNav: false,
			directionNav: true,
			itemWidth: 200,
			itemMargin: 23,
			move: 1
		});
	})
	jQuery(".js__list_film_slider").each(function(){
		jQuery(this).flexslider({
			animation: "slide",
			controlNav: true,
			directionNav: false,
			itemWidth: 200,
			itemMargin: 23,
			move: 1
		});
	})
	if(jQuery(".js__isotope").length){
		jQuery(".js__isotope").each(function(){
			var selector = jQuery(this);
			setTimeout(function(){
				selector.isotope({
					itemSelector: ".js__isotope_item"
				})
			},100);
		});
	}
});

function film_slider(){
	if (jQuery(".js__film").length){
		var window_width = jQuery(window).width() - 90;
		jQuery(".js__film").each(function(){
			var number_view = Math.floor(window_width / 223);
			if (number_view == 0) number_view = 1;
			if (number_view < jQuery(this).find("li").length){
				jQuery(this).css({
					"width" : number_view * 223 - 23
				});
				jQuery(this).removeClass("hide--arrow")
			}else{
				jQuery(this).css({
					"width" : jQuery(this).find("li").length * 223 - 23
				});
				jQuery(this).addClass("hide--arrow")
			}
		});
	}
}