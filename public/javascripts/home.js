window.onload = function() {
    function scrollTo(section) {
        $('html, body').animate({
            scrollTop: section.offset().top
        }, 800);
    }
    
    var $landingDownArrow = $('#landingDownArrow');
    $landingDownArrow.on('click', function(e) {
        scrollTo($('#aboutSection'));
    });
}