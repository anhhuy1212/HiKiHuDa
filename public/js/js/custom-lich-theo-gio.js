jQuery(document).ready(function($){
	var newDate = new Date();
    jQuery('input.timepicker').timepicker({
    	'scrollDefault': 'now',
    	'timeFormat': 'H:i',
        'step': 15
    });
    jQuery('#date').datepicker({
    	minDate: 0,
        dateFormat : "dd-mm-yy"
    });

    add_transation_id_to_link();

    $('.js__tab_time_control ').click(function() {
        $('.tab--control').removeClass('js__active');
        var time = $(this).attr('data-time');
        $(this).addClass('js__active');
        $('.hide-date').hide();
        $('.date_' + time).show();
    });


    var iframeWin = document.getElementById("booking-iframe");
    $('.logout-wp').click(function(event) {
        // event.preventDefault();
        var url = $(this).attr('href');
        iframeWin.src = 'https://booking.bhdstar.vn/Browsing/Loyalty/SignOut?enableHelp=False';
        // setTimeout(function(){ window.location.href= url }, 500);
    });

    jQuery('#showtime-tab-0').click();

});

function add_transation_id_to_link() {
    jQuery('.list--times a, .list--showtimes-cinema a').hover(function(e){
        if(jQuery(this).hasClass('bhd-trailer')) {
            return ;
        }
        var href = jQuery(this).attr('href');
        var n = href.includes("?");
        if(jQuery(this).hasClass('added-transaction-id')){
            return;
        }
        if(n) {
            href += '&transaction_id=' + lich_gio.transaction_id;
        }else {
            href += '?transaction_id=' + lich_gio.transaction_id;
        }
        jQuery(this).attr('href', href);
        jQuery(this).addClass('added-transaction-id');
    });
}