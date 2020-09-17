jQuery(document).ready(function ($) {
    "use strict";

    /* window */
    var window_width, window_height, scroll_top;

    /* admin bar */
    var adminbar = $('#wpadminbar');
    var adminbar_height = 0;

    /* header menu */
    var header = $('#header-navigation');
    var header_top = 0;

    /* scroll status */
    var scroll_status = '';

    var iScrollPos = 0;
    var iScrollPo = 0;

    /**
     * window load event.
     *
     * Bind an event handler to the "load" JavaScript event.
     * @author Fox
     */
    $(window).on('load', function () {
        /** current scroll */
        scroll_top = $(window).scrollTop();

        /** current window width */
        window_width = $(window).width();

        /** current window height */
        window_height = $(window).height();

        /* get admin bar height */
        adminbar_height = adminbar.length > 0 ? adminbar.outerHeight(true) : 0;

        /* get top header menu */
        header_top = header.length > 0 ? header.offset().top - adminbar_height : 0;

        /* check sticky menu. */
        cms_stiky_menu();

        /*page loading*/
        book_junky_page_loading();

        book_junky_back_to_top();
        book_junky_padding_width();
        book_junky_align_mage_menu();
    });

    /**
     * reload event.
     *
     * Bind an event handler to the "navigate".
     */
    window.onbeforeunload = function () {
        book_junky_page_loading(1);
    }

    /**
     * resize event.
     *
     * Bind an event handler to the "resize" JavaScript event, or trigger that event on an element.
     * @author Fox
     */
    $(window).on('resize', function (event, ui) {
        /** current window width */
        window_width = $(event.target).width();

        /** current window height */
        window_height = $(window).height();

        /** current scroll */
        scroll_top = $(window).scrollTop();

        /* check sticky menu. */
        cms_stiky_menu();

        book_junky_back_to_top();
        book_junky_padding_width();
        book_junky_align_mage_menu();
    });

    /**
     * scroll event.
     *
     * Bind an event handler to the "scroll" JavaScript event, or trigger that event on an element.
     * @author Fox
     */
    $(window).on('scroll', function () {

        /** current scroll */
        scroll_top = $(window).scrollTop();

        /* check sticky menu. */
        cms_stiky_menu();

        if (header.hasClass('header-fixed') && window_width > 991) {

            if (scroll_top < (header_top + 150)) {
                if (header.hasClass('scroll-down')) {

                    header.removeClass('scroll-down');
                }

                if (header.hasClass('scroll-up')) {

                    header.removeClass('scroll-up');
                }
            }

            else {

                var iCurScrollPos = scroll_top;

                if (iCurScrollPos < iScrollPos) {

                    header.addClass('scroll-up');

                    if (header.hasClass('scroll-down')) {

                        header.removeClass('scroll-down');
                    }
                }

                else {

                    header.addClass('scroll-down');

                    if (header.hasClass('scroll-up')) {

                        header.removeClass('scroll-up');
                    }
                }

                iScrollPos = iCurScrollPos;
            }
        }

        else {

            header.removeClass('scroll-up');
            header.removeClass('scroll-down');
        }

        if ($('.book-junky-back-to-top').hasClass('on')) {

            var iCurScrollPo = scroll_top;

            if (iCurScrollPo > iScrollPo) {
                $('.book-junky-back-to-top').addClass('scroll-down');

                if ($('.book-junky-back-to-top').hasClass('scroll-up')) {

                    $('.book-junky-back-to-top').removeClass('scroll-up');
                }
            }

            else {

                $('.book-junky-back-to-top').addClass('scroll-up');

                if ($('.book-junky-back-to-top').hasClass('scroll-down')) {

                    $('.book-junky-back-to-top').removeClass('scroll-down');
                }
            }

            iScrollPo = iCurScrollPo;
        }

        else {
            $('.book-junky-back-to-top').removeClass('scroll-up');
            $('.book-junky-back-to-top').removeClass('scroll-down');
        }


        book_junky_back_to_top();
    });

    function book_junky_padding_width() {

        var check = $('.width-fill').attr('data-vc-stretch-content');
        var padding_row = $('.width-fill-right').attr('data-vc-stretch-content');
        var padding_row_2 = $('.width-fill-left').attr('data-vc-stretch-content');
        var padding = 0;
        var row_width = $(window).width();

        if ((check == 'true') && (row_width > 1280)) {

            padding = (row_width - 1230) / 2;
            var padding_shortcode = padding - 30;

            $('.width-fill .column-left').css('padding-left', padding);

            $('.width-fill .column-right').css('padding-right', padding);

            $('.width-fill .column-sc-left #menu-shortcode-menu .menu-item').css('padding-left', padding_shortcode);

            $('.width-fill .column-sc-right #menu-shortcode-menu .menu-item').css('padding-right', padding_shortcode);
        } else {

            $('.width-fill .column-left').css('padding-left', 0);

            $('.width-fill .column-right').css('padding-right', 0);
        }

        if ((check == 'true') && (row_width > 1520)) {

            var padding_shortcode_ct = (row_width - 1520) / 2 - 40;

            $('.width-fill .column-ct-left .cms-grid-wraper').css('padding-left', padding_shortcode_ct);

            $('.width-fill .column-ct-right .cms-grid-wraper').css('padding-right', padding_shortcode_ct);
        }

        if ((check == 'true') && (row_width > 1650)) {

            $('.width-fill').css('padding-left', 25);

            $('.width-fill').css('padding-right', 25);
        }

        else {

            $('.width-fill').css('padding-left', 0);

            $('.width-fill').css('padding-right', 0);
        }

        if ((check == 'true') && (row_width > 1600)) {

            var padding_home_ct = (row_width - 1520) / 2 - 40;

            $('.width-fill .column-wg-left').css('padding-left', padding_home_ct);

            $('.width-fill .column-cont-left').css('padding-left', padding_home_ct);

            $('.width-fill .column-wg-right').css('padding-right', padding_home_ct);

            $('.width-fill .column-cont-right').css('padding-right', padding_home_ct);
        }

        if ((check == 'true') && (row_width > 1720)) {
            var margin_extend = (row_width - 1520) / 2;

            $('.width-fill .extend-right .owl-stage-outer').css('margin-right', -(margin_extend));

            $('.width-fill .extend-left .owl-stage-outer').css('margin-left', -(margin_extend));
        }


        if (( padding_row == 'true' || padding_row_2 == 'true' ) && (row_width > 1720)) {
            var row_padding = (row_width - 1230) / 2;
            var row_padding_new = row_padding - 25;

            $('.width-fill-left .wpb_wrapper').css('padding-left', row_padding_new);
            $('.width-fill-left .wpb_wrapper').css('padding-right', 25);

            $('.width-fill-right .wpb_wrapper').css('padding-right', row_padding_new);
            $('.width-fill-right .wpb_wrapper').css('padding-left', 25);
        }

        var account = $('.woocommerce-account');

        if (($(document).find(account).length != 0) && (row_width > 1250)) {

            var padding_account = (row_width - 1230) / 2;

            $('.account-nav .wrap-user').css('padding-left', padding_account - 40);

            $('.width-fill .account-content').css('padding-right', padding_account - 40);

            $('.account-nav .woocommerce-MyAccount-navigation-link').css('padding-left', padding_account - 40);
        }
    }


    /**
     * Stiky menu
     *
     * Show or hide sticky menu.
     * @author Fox
     * @since 1.0.0
     */
    function cms_stiky_menu() {


        if (header.hasClass('sticky-desktop') && window_width > 991) {

            if (header_top < scroll_top - 80) {
                header.addClass('header-fixed');
                $('body').addClass('hd-fixed');

                if ($('.sticky_logo').length > 0) {
                    $('.sticky_logo').removeClass('hide');
                    $('.main_logo').addClass('hide');
                }
            }

            else {
                header.removeClass('header-fixed');
                $('body').removeClass('hd-fixed');

                if ($('.sticky_logo').length > 0) {
                    $('.sticky_logo').addClass('hide');
                    $('.main_logo').removeClass('hide');
                }
            }
        }
    }

    function book_junky_align_mage_menu() {
        var check = $(".has-mega-menu");
        var width = $(window).width();

        if ((width > 991) && (check.length > 0 )) {
            var offset = check.offset().left;
            var left = ( width - 925 ) / 2;
            var pos_left = offset - left;
            $('.has-mega-menu .multicolumn').css('left', -pos_left);
        }
    }

    /**
     * Page Loading.
     */
    function book_junky_page_loading($load) {
        switch ($load) {
            case 1:
                $('#book-junky-loadding').addClass('show')
                break;
            default:
                $('#book-junky-loadding').removeClass('show')
                break;
        }
    }

    /**
     * Mobile menu
     *
     * Show or hide mobile menu.
     */

    /**
     * Open Menu
     */

    $('.header-1 .menu').on('click', function (e) {

        e.preventDefault();
        var navigation = $(this).parent().parent().find('#header-navigation');
        var header_open = $(document).find('.header-1');


        if (!header_open.hasClass('menu-open') && window_width > 991) {

            header_open.addClass('menu-open');
        } else {

            header_open.removeClass('menu-open');
        }

        if (!navigation.hasClass('open') && window_width > 991) {

            navigation.addClass('open');
        } else {

            navigation.removeClass('open');
        }

        if (!navigation.hasClass('menu-open-mobile') && window_width < 992) {

            navigation.addClass('menu-open-mobile');
        } else {

            navigation.removeClass('menu-open-mobile');
        }
    });

    /**
     * Open Menu
     */

    $('.header-3 .menu').on('click', function (e) {

        e.preventDefault();
        var navigation = $(this).parent().parent().parent().parent().parent().find('#header-navigation');

        if (!navigation.hasClass('menu-open-mobile') && window_width < 992) {

            navigation.addClass('menu-open-mobile');
        } else {

            navigation.removeClass('menu-open-mobile');
        }
    });

    /**
     * Open Menu
     */

    $('.header-2 .menu').on('click', function (e) {

        e.preventDefault();
        var navigation = $(this).parent().find('#header-navigation');

        if (!navigation.hasClass('menu-open-mobile') && window_width < 992) {

            navigation.addClass('menu-open-mobile');
        } else {

            navigation.removeClass('menu-open-mobile');
        }
    });


    /**
     * Back to top
     */
    function book_junky_back_to_top() {
        if (scroll_top > window_height) {

            $('.book-junky-back-to-top').addClass('on');
        } else {

            $('.book-junky-back-to-top').removeClass('on');
        }

        var footer = $('#footer-bottom').height();
        var doc_h = $(document).height() - footer - $(window).height();

        if (scroll_top > doc_h) {

            $('.book-junky-back-to-top').addClass('scroll-up');

            if ($('.book-junky-back-to-top').hasClass('scroll-down')) {

                $('.book-junky-back-to-top').removeClass('scroll-down');
            }
        }
    }

    $('.book-junky-back-to-top').on('click', function () {
        $('body, html').animate({scrollTop: 0}, '2000');
    })

    /**
     * One page
     *
     * @author Fox
     */
    if (typeof(one_page_options) != "undefined") {
        one_page_options.speed = parseInt(one_page_options.speed);
        $('#site-navigation').singlePageNav(one_page_options);
    }
});
