console.clear();

// 헤더 메뉴바 스크롤시 변화
function NotScrollTop0__init() {
    var scrollTop = $(window).scrollTop();

    if (scrollTop > 0) {
        $('.header').addClass('header-scroll');
    } else {
        $('.header').removeClass('header-scroll');
    }
}

$(window).scroll(NotScrollTop0__init);
NotScrollTop0__init();

// 슬라이더
$('.slider-1 > .owl-carousel').owlCarousel({
    autoplay: true, // 오토 플레이
    autoplayTimeout: 6000, // 오토 플레이 시에 다음 슬라이드로 넘어가는 주기
    loop: true,
    margin: 0,
    nav: true,
    dots: false,
    animateOut: 'fadeOut',
    navText: ['<img src="./img/btn_prev2.png">', '<img src="./img/btn_next2.png">'],
    responsive: {
        0: {
            items: 1
        }
    }
});

// 상단 메뉴 팝업창
// 켜기
$('.header > .sub-menu-bg > .top-bar > .global-nav > .menu-ico').click(function () {
    $(this).closest('.header').siblings('.popup-wrap').addClass('active');
});

// 끄기
$('.popup-wrap > .popup > .popup-close-btn').click(function () {
    $(this).parent().parent().removeClass('active');
});

// 언어 선택 active
$('.global-nav > ul > li > a, .m-global-nav > ul > li > a').click(function () {
    $(this).parent().siblings().find('a.active').removeClass('active');
    $(this).addClass('active');
});

// 모바일 토글 메뉴바
$('.m-header > .m-top-bar > .m-global-nav >.m-menu-ico').click(function () {
    var nowAnimating = $('.m-menu-wrap').attr('menu-now-animating');

    if (nowAnimating == "Y") {
        return;
        /* 함수를 리턴하여 다시 안눌리게 한다 */
    }

    $('.m-menu-wrap').attr('menu-now-animating', 'Y');
    $(this).closest('.m-header').siblings('.m-menu-wrap').toggleClass('active');

    setTimeout(function () {
        $('.m-menu-wrap').attr('menu-now-animating', 'N');
    }, 500);
});

// 스크롤리파이
$(function () {
    $.scrollify({
        section: ".panel",
        scrollbars: false,
        before: function (i, panels) {
            var ref = panels[i].attr("data-section-name");

            //html 에 해당 패널의 i 의 요소를 넣어줌
            $('html').attr('data-scrollify-page-index', i);
            $(".pagination .active").removeClass("active");
            $(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
        },
        afterRender: function () {
            var pagination = "<ul class=\"pagination\">";
            var activeClass = "";
            $(".panel").each(function (i) {
                activeClass = "";
                if (i === 0) {
                    activeClass = "active";
                }
                pagination += "<li><a class=\"" + activeClass + "\" href=\"#" + $(this).attr("data-section-name") + "\"><span class=\"hover-text\">" + $(this).attr("data-section-name").charAt(0).toUpperCase() + $(this).attr("data-section-name").slice(1) + "</span></a></li>";
            });

            pagination += "</ul>";

            $(".home").append(pagination);

            $(".pagination a").on("click", $.scrollify.move);

        }
    });

    // 마우스 버튼 클릭시 비즈니스 섹션으로
    $('.slider-1 > .scroll').click(function () {
        $.scrollify.move("#BUSINESS");
    });

    // TOP 버튼 클릭시 메인 섹션으로
    $('.footer-area > .footer > .top-btn ').click(function () {
        $.scrollify.move("#MAIN");
    });

});

// 화면 크기에 따른 스크롤리파이 해제
$(window).resize(function () {
    var width = $(window).width();
    var height = $(window).height();

    if (width < 1050 || height < 800) {
        $.scrollify.disable();
    } else {
        $.scrollify.enable();
    }
});

// 지정되지 않은 a 링크 return false
$('a').click(function(e) {
    if ( $(this).attr('href') == '#' ) {
        //return false;
        e.preventDefault();
    }
});