window.onload = function() {
    $(window).scroll(function(){
        if ($(this).scrollTop() > $('#aboutSection').offset().top - 200) {
            animateAboutSection();
        }
    });

    function animateAboutSection() {
        animateHeaders();
        animateTechs();
    }

    function animateHeaders() {
        for (var i = 0; i < aboutHeaders.length; i++) {
            TweenLite.to(aboutHeaders[i], .3, {scale: 1, autoAlpha: 1, delay: i / 8, ease: Power0.easeIn});
        }
    }

    function animateTechs() {
        for (var i = 0; i < techs.length; i++) {
            TweenLite.to(techs[i], 1, {scale: 1, autoAlpha: 1, rotationX: 360, delay: i / 10, ease: Power0.ease});
        }
    }

    function scrollTo(section) {
        $('html, body').animate({
            scrollTop: section.offset().top
        }, 800);
    }

    function splitText(element) {
        var text = element.innerHTML;
        element.innerHTML = '';
        for (var i = 0; i < text.length; i++) {
            var newDiv = document.createElement('div');
            if (text[i] === ' ') newDiv.innerHTML = '&nbsp';
            else newDiv.innerHTML = text[i];
            newDiv.className = 'letter';
            element.appendChild(newDiv);
        }
        animateLetters(element);
    }

    /**
     * Randomize array element order in-place.
     * Using Durstenfeld shuffle algorithm.
     */
    function shuffleArray(array, cb) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        cb(array);
    }

    function animateLetters(element) {
        var randomArray = [];
        for (var i = 0; i < element.children.length; i++) {
            randomArray.push(i);
        }
        shuffleArray(randomArray, function(array) {
            for (var i = 0; i < element.children.length; i++) {
                TweenLite.set(element.children[array[i]], {z: 600});
                TweenLite.to(element.children[array[i]], .3, {z: 0, delay: (i / 100), ease:Power0.easeIn});
            }
        });
    }

    function prepareAnimations() {
        for (var i = 0; i < aboutHeaders.length; i++) {
            TweenLite.set(aboutHeaders[i], {scale: .8, autoAlpha: 0});
        }
    }
    /** The down arrow in the landing section */
    var $landingDownArrow = $('#landingDownArrow');
    var initialsLogo = document.getElementById('initialsLogo');
    var landing = document.getElementById('landing');
    var landingWrapper = document.getElementById('landingWrapper');
    var landingBottom = document.getElementById('landingBottom');
    var landingDescription = document.getElementById('landingDescription');
    // About section
    var aboutHeaders = document.getElementsByClassName('casscade');
    var techs = document.getElementsByClassName('techListItem');
    /** Click event for the down arrow in the landing section */
    $landingDownArrow.on('click', function(e) {
        scrollTo($('#aboutSection'));
    });
    
    var tl = new TimelineLite({});

    TweenLite.set(initialsLogo, {z: 600});
    tl.to(initialsLogo, .8, {rotationY: 1080, ease:Power0.easeIn}, 0)
        .to(initialsLogo, 2, {z:0, ease: Bounce.easeOut}, 0)
        .to(initialsLogo, .6, {rotationY: 680, ease: Power0.easeIn}, .8)
        .to(initialsLogo, .4, {rotationY: 740, ease: Power0.easeIn}, 1.4)
        .to(initialsLogo, .05, {rotationY: 720, ease: Power0.easeIn}, 1.8)
        .to(initialsLogo, .8, {yPercent: 70}, 2)
        .to(landingBottom, 1.2, {bottom: 0}, 2)
        .to(landingWrapper, 1.5, {rotationX: 0, ease: Power2.easeOut}, 2);

    splitText(landingDescription);
    splitText(document.getElementById('landingBottom').children[0]);
    prepareAnimations();
}