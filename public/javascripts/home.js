window.onload = function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > $('#aboutSection').offset().top - 200) {
      animateAboutSection();
    }
    for (let i = 0; i < projects.length; i++) {
      if ($(this).scrollTop() > $(projects[i]).offset().top - 700) {
        fadeIntoView(projects[i]);
      }
    }
    if ($(this).scrollTop() > $('#contactSection').offset().top - 100) {
      animateContactSection();
    }
  });

  function fadeIntoView(element) {
    TweenLite.to(element, .3, {
      autoAlpha: 1,
      top: 0,
      ease: Power1.easeIn
    });
  }

  function animateAboutSection() {
    animateHeaders();
    animateTechs();
  }

  function animateHeaders() {
    for (var i = 0; i < aboutHeaders.length; i++) {
      TweenLite.to(aboutHeaders[i], .3, {
        scale: 1,
        autoAlpha: 1,
        delay: i / 8,
        ease: Power0.easeIn
      });
    }
  }

  function animateTechs() {
    for (var i = 0; i < techs.length; i++) {
      TweenLite.to(techs[i], 1, {
        scale: 1,
        autoAlpha: 1,
        rotationX: 360,
        delay: i / 10,
        ease: Power0.ease
      });
    }
  }
  
  function animateContactSection() {
    TweenLite.to(sideContent, .5, {boxShadow: '15px 15px 40px 0px grey'});
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
    shuffleArray(randomArray, function (array) {
      for (var i = 0; i < element.children.length; i++) {
        TweenLite.set(element.children[array[i]], {
          z: 600,
          visibility: 'visible'
        });
        TweenLite.to(element.children[array[i]], .3, {
          z: 0,
          delay: (i / 100),
          ease: Power0.easeIn
        });
      }
    });
  }

  function prepareAnimations() {
    for (let i = 0; i < aboutHeaders.length; i++) {
      TweenLite.set(aboutHeaders[i], {
        scale: .8,
        autoAlpha: 0
      });
    }
    for (let i = 0; i < projects.length; i++) {
      TweenLite.set(projects[i], {
        autoAlpha: 0,
        top: 20
      });
    }
    TweenLite.set(errorMessage, {autoAlpha: 0});
  }

  function showErrorMessage(message) {
    errorMessage.innerHTML = message;
    TweenLite.to(errorMessage, .5, {autoAlpha: 1});
  }

  function hideErrorMessage() {
    TweenLite.to(errorMessage, .5, {autoAlpha: 0});
  }

  function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }

  function clearForm() {
    $('#nameInput').val('');
    $('#emailInput').val('');
    $('#message').val('');
  }

  function showSuccessMessage() {

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
  var contactButton = document.getElementById('contactButton');
  // Projects section
  var projects = document.getElementsByClassName('project');
  // Contact section
  var inputs = document.getElementsByClassName('input-field');
  var textarea = document.getElementById('message');
  var submitButton = document.getElementById('submitButton');
  var errorMessage = document.getElementById('errorMessage');
  var sideContent = document.getElementById('sideContent');
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('blur', function (e) {
      if (e.target.value.trim() === '') {
        e.target.classList.remove('input-filled');
      } else e.target.classList.add('input-filled');
    });
  }
  textarea.addEventListener('blur', function(e) {
    if (e.target.value.trim() === '') {
      e.target.classList.remove('textarea-filled');
    } else e.target.classList.add('textarea-filled');
  });
  /** Click event for the down arrow in the landing section */
  $landingDownArrow.on('click', function (e) {
    scrollTo($('#aboutSection'));
  });

  contactButton.addEventListener('click', function(e) {
    scrollTo($('#contactSection'));
  }, false);

  submitButton.addEventListener('click', function(e) {
    e.preventDefault();
    hideErrorMessage();
    if ($('#nameInput').val().trim() === '') {
      showErrorMessage('Please enter your name!');
    }
    else if (!validateEmail($('#emailInput').val().trim()) || $('#emailInput').val().trim() === '')  {
      showErrorMessage('Please enter valid email address!');
    }
    else if ($('#message').val().trim() === '') {
      showErrorMessage('Please enter a message!');
    }
    // Send email
    if ($('#nameInput').val().trim() !== '' &&
        validateEmail($('#emailInput').val().trim()) &&
        $('#message').val().trim() !== '') {
          $.ajax({
            method: 'POST',
            url: './send-message',
            data: {
              senderName: $('#nameInput').val().trim(),
              senderEmail: $('#emailInput').val().trim(),
              message: $('#message').val().trim()
            }
          }).done(function() {
            clearForm();
            showSuccessMessage();
          }, false);
        }
  });


  var tl = new TimelineLite({});

  tl.to(initialsLogo, .8, {
      rotationY: 1080,
      ease: Power0.easeIn
    }, 0)
    .to(initialsLogo, 2, {
      z: 0,
      ease: Bounce.easeOut
    }, 0)
    .to(initialsLogo, .6, {
      rotationY: 680,
      ease: Power0.easeIn
    }, .8)
    .to(initialsLogo, .4, {
      rotationY: 740,
      ease: Power0.easeIn
    }, 1.4)
    .to(initialsLogo, .05, {
      rotationY: 720,
      ease: Power0.easeIn
    }, 1.8)
    .to(initialsLogo, .8, {
      yPercent: 70
    }, 2)
    .to(landingBottom, 1.2, {
      bottom: 0
    }, 2)
    .to(landingWrapper, 1.5, {
      rotationX: 0,
      ease: Power2.easeOut
    }, 2);

  splitText(landingDescription);
  splitText(document.getElementById('landingBottom').children[0]);
  prepareAnimations();
}