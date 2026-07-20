//jquery-click-scroll
//Rewritten to read actual target IDs from each link's href,
//and to offset scroll position by the real, current navbar height
//(instead of a hardcoded guess), so content never ends up hidden behind the top bar.

function getNavOffset() {
    var $nav = $('.navbar');
    return ($nav.outerHeight() || 75) + 15;
}

$(document).ready(function(){

    var $links = $('.click-scroll');

    $links.each(function(){
        var targetSelector = $(this).attr('href');

        $(this).click(function(e){
            var $target = $(targetSelector);
            if ($target.length) {
                e.preventDefault();
                var offsetClick = $target.offset().top - getNavOffset();
                $('html, body').animate({
                    'scrollTop': offsetClick
                }, 300);
            }
        });
    });

    $(document).scroll(function(){
        var docScroll1 = $(document).scrollTop() + 1;

        $links.each(function(index){
            var targetSelector = $(this).attr('href');
            var $target = $(targetSelector);

            if ($target.length) {
                var offsetSection = $target.offset().top - getNavOffset();

                if (docScroll1 >= offsetSection) {
                    $('.navbar-nav .nav-item .nav-link').removeClass('active');
                    $('.navbar-nav .nav-item .nav-link:link').addClass('inactive');
                    $('.navbar-nav .nav-item .nav-link').eq(index).addClass('active');
                    $('.navbar-nav .nav-item .nav-link').eq(index).removeClass('inactive');
                }
            }
        });
    });

    $('.navbar-nav .nav-item .nav-link:link').addClass('inactive');
    $('.navbar-nav .nav-item .nav-link').eq(0).addClass('active');
    $('.navbar-nav .nav-item .nav-link:link').eq(0).removeClass('inactive');
});
