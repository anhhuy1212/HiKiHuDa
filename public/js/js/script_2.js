jQuery(document).ready(function($) {
    jQuery('.list--times .flexslider,.flexslider_2').flexslider({
        animation: "slide",
        animationLoop: false,
        itemWidth: 70,
        itemMargin: 0
    });
    /*
     
     * v3
     
     */
    var tick_slider = 0;
    var $container = $('.tab-search-rap .container-search-header ul');
    // initialize isotope
    $container.isotope({
        // options...
        animationEngine: 'best-available',
        itemSelector: '.isotope_selector'
    });
    // filter items when filter link is clicked
    $('.tab-search-rap .search-title-container li a').on('click', function() {
        $(".tab-search-rap .search-title-container a").removeClass("active");
        $(this).addClass("active");
        var selector = $(this).data('filter');
        $container.isotope({
            filter: selector
        });
        return false;
    });
    $(".close_header").click(function(e) {
        $(".header-seach-v3").removeClass("active");
        $(".main-search").slideUp();
        return false;
    })
    $(".search-mvtr").click(function(e) {
        if ($('.main-search').css('display') == 'none') {
            $(".header-seach-v3").addClass("active");
        } else {
            $(".header-seach-v3").removeClass("active");
        }
        if (tick_slider == 2) {
            $(".main-search").slideToggle();
        } else {
            $(".main-search").slideDown();
            $(".header-seach-v3").addClass("active");
        }
        tick_slider = 2;
        $(".search-mvtp").removeClass("active");
        $(this).addClass("active");
        $(".tab-search-rap,.tab-search-rap .container-search-header").removeClass("hidden");
        $(".tab-search-phim").addClass("hidden");
        $container.isotope({
            // options...
            animationEngine: 'best-available',
            itemSelector: '.isotope_selector'
        });
        window.scrollTo(0, 0);
        return false;
    })
    $(".search-mvtp").click(function(e) {
        if ($('.main-search').css('display') == 'none') {
            $(".header-seach-v3").addClass("active");
        } else {
            $(".header-seach-v3").removeClass("active");
        }
        if (tick_slider == 1) {
            $(".main-search").slideToggle();
        } else {
            $(".main-search").slideDown();
            $(".header-seach-v3").addClass("active");
        }
        tick_slider = 1;
        $(".search-mvtr").removeClass("active");
        $(this).addClass("active");
        $(".tab-search-phim").removeClass("hidden");
        $(".tab-search-rap").addClass("hidden");
        window.scrollTo(0, 0);
        return false;
    });
    $(".tab-search-phim .search-title-container a.title-now").click(function(e) {
        $(".tab-search-phim .search-title-container a.title-search").removeClass("active");
        $(this).addClass("active");
        $(".container-search-header").addClass("hidden");
        $(".container-search-header-now").removeClass("hidden");
        return false;
    });
    $(".tab-search-phim .search-title-container a.title-soon").click(function(e) {
        $(".tab-search-phim .search-title-container a.title-search").removeClass("active");
        $(this).addClass("active");
        $(".container-search-header").addClass("hidden");
        $(".container-search-header-soon").removeClass("hidden");
        return false;
    });
    $(".tab-search-phim .search-title-container a.title-seeak_show").click(function(e) {
        $(".tab-search-phim .search-title-container a.title-search").removeClass("active");
        $(this).addClass("active");
        $(".container-search-header").addClass("hidden");
        $(".container-search-header-sneak_show").removeClass("hidden");
        return false;
    });

    if (data_object.id_rap != 0) {
        var cinema_id = data_object.id_rap;
        $(".bhd-notfound").addClass("hide");
        $(".bhd-lich-chieu-chon-rap li .info").removeClass("active");
        $("#rap-" + cinema_id).addClass("active");
        $(".list--times").removeClass("hide");
        $(".js__tab_time_control.js__active").removeClass("js__active");
        $(".tab--showtimes-controls li").first().find("a").addClass("js__active");
        $('body,html').animate({
            scrollTop: $('#hastag').offset().top - 70
        }, 1000);
        $(".loading-rap").removeClass("hide");
        jQuery.post(data_object.ajax_url, {
            "action": "bhd_lichchieu_chonrap",
            "cinema_id": cinema_id
        }, function(response) {
            $(".loading-rap").addClass("hide");
            $(".conatiner-phim").html(response);
        })
    }
    /*
     
     * And v3
     
     */
    if (data_object.popup == "ok") {
        if (data_object.popup_type == "iframe") {
            $.magnificPopup.open({
                items: {
                    src: data_object.popup_url
                },
                type: 'iframe'
                // You may add options here, they're exactly the same as for $.fn.magnificPopup call
                // Note that some settings that rely on click event (like disableOn or midClick) will not work here
            }, 0);
        } else {
            $("#home-popup-image").removeClass("hidden");
            $.magnificPopup.open({
                items: {
                    src: $('#home-popup-image')[0].outerHTML
                },
                type: 'inline'
                // You may add options here, they're exactly the same as for $.fn.magnificPopup call
                // Note that some settings that rely on click event (like disableOn or midClick) will not work here
            }, 0);
        }
    }
    $("body").click(function(e) {
        $("#home-popup-image").addClass("hidden");
    })
    $('select').select2();
    var dates1 = [];
    $(".bhd-chon-rap").change(function(e) {
        var cinema_id = $(this).val();
        var movie_id = $(".bhd-chon-phim").val();
        if (movie_id == 0) {
            $(".bhd-chon-date").html('<option value="0">' + data_object.text_chonngaychieu + '</option>');
            $(".bhd-chon-showtime").html('<option value="0">' + data_object.text_chonxuatchieu + '</option>');
        } else {
            $(".bhd-chon-showtime").html('<option value="0">' + data_object.text_loading + '</option>');
            $(".bhd-chon-date").html('<option value="0">' + data_object.text_loading + '</option>');
            jQuery.post(data_object.ajax_url, {
                "action": "bhd_search_movie",
                "movie_id": movie_id,
                "cinema_id": cinema_id
            }, function(response) {
                var lists = "";
                var dates = "";
                var i = 0;
                $.each(response, function(key, value) {
                    var data_date = []
                    var data_format = dataCustomFormat(key);
                    dates += '<option value="' + i + '">' + data_format + '</option>';
                    $.each(value, function(key1, value1) {
                        if (i == 0) {
                            lists += '<option value="' + key1.slice(1) + '">' + timeTo12HrFormat(value1) + '</option>';
                        }
                        data_date.push('<option value="' + key1.slice(1) + '">' + timeTo12HrFormat(value1) + '</option>')
                    })
                    dates1.push(data_date);
                    i++;
                });
                $(".bhd-chon-showtime").html(lists);
                $(".bhd-chon-date").html(dates);
            });
        }
    })
    $(".bhd-chon-phim").change(function(e) {
        var id = $(this).val();
        $(".bhd-chon-rap").html('<option value="0">' + data_object.text_loading + '</option>');
        $(".bhd-chon-showtime").html('<option value="0">' + data_object.text_chonxuatchieu + '</option>');
        $(".bhd-chon-date").html('<option value="0">' + data_object.text_chonngaychieu + '</option>');
        jQuery.post(data_object.ajax_url, {
            "action": "bhd_search_movies",
            "movies_id": id
        }, function(response) {
            if (response == "") {
                var lists = '<option value="">' + data_object.text_chuabanve + '</option>';
            } else {
                var lists = '<option value="">' + data_object.text_chonrap + '</option>' + response;
            }
            $(".bhd-chon-rap").html(lists);
        });
    })
    $(".bhd-chon-date").change(function(e) {
        var id = $(this).val();
        var string_option = '';
        $.each(dates1[id], function(key1, value1) {
            string_option += value1;
        })
        $(".bhd-chon-showtime").html(string_option);
    })
    $(".bhd-book-ve").click(function(e) {
        var cinema = $(".bhd-chon-rap").val();
        var session_id = $(".bhd-chon-showtime").val();
        if (cinema == 0 || session_id == 0 || session_id == "" || cinema == "") {
            alert(data_object.text_book_validate);
        } else {
            window.location.href = data_object.url_book + "?cinemacode=" + cinema + "&txtSessionId=" + session_id + "&lang=" + data_object.lang;
        }
        return false;
    })
    $(".bhd-lich-chieu-chon-rap .inside").click(function(e) {
        e.preventDefault();
        var cinema_id = $(this).data("id");
        $(".bhd-notfound").addClass("hide");
        $(".bhd-lich-chieu-chon-rap li .info").removeClass("active");
        $(this).parent().addClass("active");
        $(".list--times").removeClass("hide");
        $(".js__tab_time_control.js__active").removeClass("js__active");
        $(".tab--showtimes-controls li").first().find("a").addClass("js__active");
        $('body,html').animate({
            scrollTop: $('#hastag').offset().top - 70
        }, 1000);
        $(".loading-rap").removeClass("hide");
        jQuery.post(data_object.ajax_url, {
            "action": "bhd_lichchieu_chonrap",
            "cinema_id": cinema_id
        }, function(response) {
            $(".loading-rap").addClass("hide");
            $(".conatiner-phim").html(response);
            return false;
        })
    })
    $(".bhd-lich-chieu-chon-phim li a").click(function(e) {
        var movies_id = $(this).data("id");
        var post = $(this).data("post");
        $(".bhd-notfound").addClass("hide");
        $(".bhd-lich-chieu-chon-phim li a").removeClass("active");
        $(this).addClass("active");
        $(".js__tab_time_control.js__active").removeClass("js__active");
        $(".tab--showtimes-controls li").first().find("a").addClass("js__active");
        $(".list--times").removeClass("hide");
        $(".film--intro").addClass("hide");
        $(".phimdangchieu-" + post).removeClass("hide");
        $('body,html').animate({
            scrollTop: $('#hastag').offset().top - 70
        }, 1000);
        $(".loading-rap").removeClass("hide");
        var products = [{
            id: $(this).data("post"),
            categoryId: '',
            transactionId: '',
            price: "", //
            quantity: 1, //
            name: $(this).find(".movie--name").html(), // bắt buộc – tên phim
            brandName: "phim", //
            desc: $(this).data("des"),
            imageUrl: $(this).find("img").attr("src"),
            link: $(this).data("link")
        }];
        ematics("log", "product", "browse", products);
        jQuery.post(data_object.ajax_url, {
            "action": "bhd_lichchieu_chonphim",
            "movies_id": movies_id,
            "post_id": post
        }, function(response) {
            $(".loading-rap").addClass("hide");
            $(".conatiner-rap").html(response);
            add_transation_id_to_link();
            return false;
        })
    })
    $(".js__tab_time_control").click(function(e) {
        var id = "date_" + $(this).data("time");
        var numItems = $('.' + id).length;
        if (numItems == 0) {
            $(".bhd-notfound").removeClass("hide");
        } else {
            $(".bhd-notfound").addClass("hide");
        }
        jQuery(".js__tab_time_control.js__active").removeClass("js__active")
        jQuery(this).addClass("js__active");
        $(".hide-date").hide();
        $("." + id).show();
        return false;
    });
    $(".bhd-phone-thanhvien").focusout(function(e) {
        var phone = $(this).val();
        $(".bhd-email-thanhvien").attr("placeholder", data_object.text_loading);
        jQuery.post(data_object.ajax_url, {
            "action": "bhd_danky_thanhvien",
            "phone": phone
        }, function(response) {
            if (response.check == 1) {
                $(".bhd-email-thanhvien").val(response.text);
            } else {
                $(".bhd-email-thanhvien").attr("placeholder", response.text);
            }
            return false;
        })
    })
    $(".bhd-ul-tab-phim-home").click(function(e) {
        var id = $(this).data("id");
        jQuery.post(data_object.ajax_url, {
            "action": "bhd_load_data_phim",
            "id": id
        }, function(response) {
            return false;
        })
    })
    $(".showtimes-2 .list--location li").click(function() {
        var id = $(this).data("id");
        $(".bhd-lich-chieu-chon-rap .type-cinemas").addClass("hide");
        $(".bhd-lich-chieu-chon-rap ." + id).removeClass("hide");
        $(".showtimes-2 .list--location li").removeClass("active");
        var numItems = $(".bhd-lich-chieu-chon-rap ." + id).length;
        if (numItems == 0) {
            $(".bhd-notfound-rap").removeClass("hide");
        } else {
            $(".bhd-notfound-rap").addClass("hide");
        }
        $('.conatiner-phim').html('');
        $(this).addClass("active");
        return false;
    })
    $('.bhd-trailer').magnificPopup({
        // disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
        gallery: {
            enabled: true
        }
    });
    var load_more = 1;
    jQuery(window).scroll(function() {
        if (jQuery(".bhd-container-scroll").length) {
            if ($(".bhd-container-scroll").height() <= $(window).scrollTop() + $(window).height()) {
                if (load_more == 1) {
                    load_more = 2;
                    var paged = $("#bhd_paged").val();
                    var post_type = $("#bhd_post_type").val();
                    if (jQuery(".bhd-container-scroll").length) {
                        var cat = $("#bhd_cat").val();
                    } else {
                        var cat = 0;
                    }
                    $(".cssload-container").removeClass("hide");
                    jQuery.post(data_object.ajax_url, {
                        "action": "bhd_load_more",
                        "paged": paged,
                        "post_type": post_type,
                        "cat": cat
                    }, function(response) {
                        $(".cssload-container").addClass("hide");
                        if (response != "end") {
                            load_more = 1;
                            $("#bhd_paged").val(parseInt(paged) + 1);
                            $(".list--news").append(response);
                            $(".list--news").isotope('destroy');
                            $(".list--news").bind("load", function() {
                                $(".list--news").isotope({
                                    itemSelector: ".js__isotope_item"
                                })
                            })
                        }
                        return false;
                    })
                }
            }
        }
    });
    $(".bhd-icon-slider").click(function(e) {
        $('body,html').animate({
            scrollTop: $('.section--product-view').offset().top + 70
        }, 1000);
        return false;
    })
    /*$("#bhd-submit-dang-ky").submit(function(e){

        if($("#bhd-dieu-khoan").is(':checked')) {

            return true;

        }else{

            $(".bhd-dieu-khoan span").css("color","red");

           return fasle;

        }

    });*/
    $(".page--member .product--title h3").click(function(e) {
        var id = $(this).data("id");
        $(".page--member .product--title h3").removeClass("current");
        $(this).addClass("current");
        $(".bhd-page-user").addClass("hide");
        $(id).removeClass("hide");
        return false;
    })
    $("ul.tuyendung-inner-list li span").click(function(e) {
        $(this).parent().toggleClass("active");
        $(this).parent().find(".tuyendung-inner-list-inner").toggle();
    })
    /*
     
     * Upload avatar
     
     */
    $(".member--info .avatar").click(function(e) {
        $("#upload_avatar").click();
        return false;
    });
    $("#upload_avatar").on("change", function() {
        $("#upload_avatar_form").submit();
    });
    $("#upload_avatar_form").on('submit', (function(e) {
        e.preventDefault();
        var formData = new FormData(this);
        formData.append('action', 'upload_avatar');
        formData.append('user_id', $("#memberid").val());
        $.ajax({
            type: 'POST',
            url: data_object.ajax_url,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function(response) {
                var msg = response.msg;
                var message = "";
                for (var i = 0; i < msg.length; i++) {
                    message += '<li>' + msg[i] + '</li>';
                }
                jQuery('html, body').animate({
                    scrollTop: jQuery("body").offset().top
                }, 'slow');
                if (response.error) {
                    jQuery(".member--form-message").removeClass("success").addClass("error").html('<ul>' + message + '</ul>');
                } else {
                    jQuery(".member--form-message").removeClass("error").addClass("success").html('<ul>' + message + '</ul>');
                    $(".member--info .avatar img").attr("src", response.src);
                }
            },
            error: function(data) {
                toastr.error(data);
            }
        });
        return false;
    }))
})

function dataCustomFormat(data) {
    var data_array = data.split("-");
    return data_array[2] + "-" + data_array[1] + "-" + data_array[0];
}

function timeTo12HrFormat(time) { // Take a time in 24 hour format and format it in 12 hour format
    var time_part_array = time.split(":");
    var ampm = 'AM';
    if (time_part_array[0] >= 12) {
        ampm = 'PM';
    }
    if (time_part_array[0] > 12) {
        var so = time_part_array[0] - 12;
        if (so < 10) {
            so = "0" + so;
        }
        time_part_array[0] = so;
    }
    formatted_time = time_part_array[0] + ':' + time_part_array[1] + ' ' + ampm;
    return formatted_time;
}

function fbShare(url, title, descr, image, winWidth, winHeight) {
    var winTop = (screen.height / 2) - (winHeight / 2);
    var winLeft = (screen.width / 2) - (winWidth / 2);
    window.open('http://www.facebook.com/sharer.php?s=100&p[title]=' + title + '&p[summary]=' + descr + '&p[url]=' + url + '&p[images][0]=' + image, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
}