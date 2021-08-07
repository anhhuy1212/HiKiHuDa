jQuery(document).ready(function($){
	jQuery.ajax({
        type: "GET",
        //url: "https://bhdver3.fos.vn/wp-json/bhdstart/v1/phim", // <-- Here
        url: "https://www.bhdstar.vn/wp-json/bhdstart/v1/phim", // <-- Here
        dataType: "json",
        success: function(data) {
            $('header').append(data);
            $('.search-mvtr').click(function() {
				$('.search-mvtp').removeClass('acitve-click');
				$(this).toggleClass('acitve-click');
				if($(this).hasClass('acitve-click')){
					$('.header-seach-v3, .close_header, .main-search').slideDown	();
				}else {
					$('.header-seach-v3, .close_header, .main-search').slideUp();
				}
                
                $('.tab-search-phim').addClass('hidden');
                $('.tab-search-rap').removeClass('hidden');
            });
            $('.close_header').click(function() {
                $('.header-seach-v3, .close_header, .main-search').slideUp();
            });
            $('.search-mvtp').click(function() {
				$('.search-mvtr').removeClass('acitve-click');
				$(this).toggleClass('acitve-click');
                if($(this).hasClass('acitve-click')){
					$('.header-seach-v3, .close_header, .main-search').slideDown();
				}else {
					$('.header-seach-v3, .close_header, .main-search').slideUp();
				}
                $('.tab-search-phim').removeClass('hidden');
                $('.tab-search-rap').addClass('hidden');
            });
            $('.title-soon').click(function() {
                $('.container-search-header-now').addClass('hidden');
                $('.container-search-header-soon').removeClass('hidden');
                $('.title-search').removeClass('active');
                $(this).addClass('active');
            });
            $('.title-now').click(function() {
                $('.container-search-header-now').removeClass('hidden');
                $('.container-search-header-soon').addClass('hidden');
                $('.title-search').removeClass('active');
                $(this).addClass('active');
            });
        }
    });

	jQuery('#confirmForm #next').click(function(){
		if(jQuery('#name').val() != '' && jQuery('#email').val() != '' && jQuery('#terms-conditions-agree').prop("checked") ) {
			if(jQuery('#is-loyalty-member').prop("checked")){
				if(jQuery('#loyalty-card-number').val() != '') {
					alert('Bạn có 5 phút để tiến hành đặt vé.');
				}
			}else {
				alert('Bạn có 5 phút để tiến hành đặt vé.');
			}
		}
		
	});
	
	jQuery(".js__dropdown").on("click",function(){
		jQuery(this).toggleClass("js__active");
		jQuery(jQuery(this).data("target")).stop().slideToggle(400);
	});

	jQuery("body").on("click",function(event){
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
	var transaction_id = getCookie('transaction_id');
	if(!transaction_id || ($('#transaction_id').length > 0 && $('#transaction_id').val() != '')) {
		transaction_id = $('#transaction_id').val();
		console.log(transaction_id);
		setCookie('transaction_id', transaction_id, 2);
	}
	
	
	function displayMessage (evt) {
		
		if(evt.data.includes('-bhdemail')){
			$('#UserName').val(evt.data.replace('-bhdemail', ''));
		}
		
		if(evt.data.includes('-bhdpass')){
			$('#Password').val(evt.data.replace('-bhdpass',''));
		}
		
		if(evt.data == 'submit_login'){
			$('.page-action.submit').click();
		}
		
		if(evt.data == 'logout'){
			$('.loyalty-login .button').click();
		}
	}

	if (window.addEventListener) {
		// For standards-compliant web browsers
		window.addEventListener("message", displayMessage, false);
	}
	else {
		window.attachEvent("onmessage", displayMessage);
	}
});

function close_bg_popup_sub_film(){
    jQuery("#bg_popup_sub_film").remove();
}
function get_sub_film(_elem){
    var _this = jQuery(_elem);
    var data = {
        action: "v3_get_sub_film",
        name: _this.data("id")
    };
    //jQuery.get("https://bhdver3.fos.vn/wp-json/bhdstart/v1/subfilm/" + data['name'] ,{}, function(html){
    jQuery.get("https://www.bhdstar.vn/wp-json/bhdstart/v1/subfilm/" + data['name'] ,{}, function(html){
        jQuery("body").append(html);
    });
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";domain=booking.bhdstar.vn;path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}