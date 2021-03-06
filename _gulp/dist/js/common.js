'use strict';

// Document ready
$(document).on('ready', function(){

  var numFormat = wNumb({
    thousand: ' '
  });

  $('.j-donate-num').each(function () {
    $(this).html(numFormat.to(parseInt($(this).text())) + ' <i class="icon-rouble"></i>');
  });

  $('#donate-custom').on('input blur', function(){
    this.value = this.value.replace(/\D/g,'');
    if ($(this).val()) {
      $(this).val(numFormat.to(parseInt($(this).val())));
    }
  });

  // Magnific popup video
  $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
  });

  $('.open-popup-link').magnificPopup({
    type: 'inline',
    midClick: true,
    showCloseBtn: false,
    callbacks: {
      open: function() {
        var $slider1 = $('.carousel-one');
        var $slider2 = $('.carousel-two');

        if (!$slider1.hasClass('slick-initialized')) {
          $slider1.slick({
            mobileFirst: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: '.carousel-two',
            dots: false,
            centerMode: false,
            focusOnSelect: true,
            vertical: true,
            touchMove: false,
            arrows: false,
            centerPadding: '0px'
          });
        }
        if (!$slider2.hasClass('slick-initialized')) {
          $slider2.slick({
            mobileFirst: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            dots: true,
            cssEase: 'linear',
            asNavFor: '.carousel-one',
            responsive: [
              {
                breakpoint: 1300,
                settings: {
                  dots: false
                }
              }
            ]
          });
        }

        $slider1.slick('slickGoTo', +0);
        $slider2.slick('slickGoTo', +0);

        // var playButton = document.getElementById("play_button");
        // var video = document.getElementById('play_video');
        // // Event listener for the play/pause button
        // playButton.addEventListener("click", function() {
        //   if (video.paused == true) {
        //     // Play the video
        //     video.play();

        //     // Update the button text to 'Pause'
        //     playButton.innerHTML = "Pause";
        //   } else {
        //     // Pause the video
        //     video.pause();

        //     // Update the button text to 'Play'
        //     playButton.innerHTML = "Play";
        //   }
        // });
      },
    }
  });

  $('.family__carousel').slick({
    mobileFirst: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    prevArrow: '#family__btns-prev',
    nextArrow: '#family__btns-next'
  });

  $('.family__carousel').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
    var i = (currentSlide ? currentSlide : 0) + 1;
    var textBlock1 = $('[data-slick-index="'+ currentSlide +'"]').find('.family__about-div2').html();
    var textBlock2 = $('[data-slick-index="'+ currentSlide +'"]').find('.family__about-div1').html();
    if (i > 0 && i < 10) {
      $('.family__history-number .div1').text('0' + i);
    } else {
      $('.family__history-number .div1').text(i);
    }
    $('#family_div1').html(textBlock1);
    $('#family_div2').html(textBlock2);
  });

  $("form").each(function(){
    $(this).validate();
  });

  $('.svg-inline').each(function() {
    var $img = jQuery(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');
    jQuery.get(imgURL, function(data) {
      // Get the SVG tag, ignore the rest
      var $svg = jQuery(data).find('svg');
      // Add replaced image's ID to the new SVG
      if (typeof imgID !== 'undefined') {
        $svg = $svg.attr('id', imgID);
      }
      // Add replaced image's classes to the new SVG
      if (typeof imgClass !== 'undefined') {
        $svg = $svg.attr('class', imgClass + ' replaced-svg');
      }
      // Remove any invalid XML tags as per http://validator.w3.org
      $svg = $svg.removeAttr('xmlns:a');
      // Replace image with new SVG
      $img.replaceWith($svg);
    }, 'xml');
  });

  $('[data-fancybox]').fancybox({
    protect: true,
    backFocus: false
  });

  $("a[href*='#'].anchor").mPageScroll2id({
    offset: '.header'
  });

  $('ol li').each(function(){
    var count = $(this).index() + 1;
    $(this).prepend('<span class="span">' + count + '</span>');
  });

  $('.geography__carousel').slick({
    mobileFirst: true,
    fade: true
  });

  $("a[href*='#'].j-anchor").mPageScroll2id({
    offset: '.header'
  });

  $('.j-modal-test').on('click', function(){
    setTimeout(function(){
      $.magnificPopup.open({
        showCloseBtn: false,
        items: {
          src: '#modal'
        },
        type: 'inline'
      })
    }, 3000)
  });
  $('.j-modal-close').on('click', function(){
    $.magnificPopup.close();
  });
  $('[data-fancybox]').on('click', function(){
    $.magnificPopup.close();
  });

  phoneMask();
  mobileNav();
  inputFocus();
  headerScroll();
  oneCarousel();
  activeLang();
  donatePayment();

  // Chrome Smooth Scroll
  try {
    $.browserSelector();
    if($("html").hasClass("chrome")) {
      $.smoothScroll();
    }
  } catch(err) {

  };

  // simpleForm version 2015-09-23 14:30 GMT +2
  simpleForm('form.form-callback');
});

$(window).on('load', function() { });
$(window).on('scroll', function() {
  headerScroll();
});
$(window).on('resize', function() {
  var width = $(window).width();
  var btn = $('.j-btn-mobile');
  var body = $('body');
  var nav = $('.j-navigation');

  if (width >= 960) {
    btn.removeClass('is-active');
    body.removeClass('is-fixed');
    nav.removeClass('is-active');
  }
});

/*
version 2015-09-23 14:30 GMT +2
*/
function simpleForm(form, callback) {
  $(document).on('submit', form, function(e){
    e.preventDefault();
    var formData = {};
    var hasFile = false;
    if ($(this).find('[type=file]').length < 1) {
      formData = $(this).serialize();
    }
    else {
      formData = new FormData();
      $(this).find('[name]').each(function(){

        switch($(this).prop('type')) {

          case 'file':
            if ($(this)[0]['files'].length > 0) {
              formData.append($(this).prop('name'), $(this)[0]['files'][0]);
              hasFile = true;
            }
            break;

          case 'radio':
          case 'checkbox':
            if (!$(this).prop('checked')) {
              break;
            }
            formData.append($(this).prop('name'), $(this).val().toString());
            break;

          default:
            formData.append($(this).prop('name'), $(this).val().toString());
            break;
        }
      });
    }

    $.ajax({
      url: $(this).prop('action'),
      data: formData,
      type: 'POST',
      contentType : hasFile ? 'multipart/form-data' : 'application/x-www-form-urlencoded',
      cache       : false,
      processData : false,
      success: function(response) {
        $(form).removeClass('ajax-waiting');
        $(form).find("[type=submit]").prop("disabled", false);
        $(form).html($(response).find(form).html());

        if (typeof callback === 'function') {
          callback(response);
        }
      }
    });

    $(form).addClass('ajax-waiting');
    $(form).find("[type=submit]").prop("disabled", true);

    return false;
  });
}

function phoneMask() {
  var phone = $('.j-phone-mask');
  phone.each(function () {
    $(this).mask("+7 (999) 999-99-99");
  });
}

jQuery.extend(jQuery.validator.messages, {
  required: "???????????????????????? ????????",
  remote: "Please fix this field.",
  email: "?????????????? ???????????????????? e-mail.",
  url: "Please enter a valid URL.",
  date: "Please enter a valid date.",
  dateISO: "Please enter a valid date (ISO).",
  number: "Please enter a valid number.",
  digits: "Please enter only digits.",
  creditcard: "Please enter a valid credit card number.",
  equalTo: "???????????? ???? ??????????????????.",

  accept: "Please enter a value with a valid extension.",
  maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
  minlength: jQuery.validator.format("Please enter at least {0} characters."),
  rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
  range: jQuery.validator.format("Please enter a value between {0} and {1}."),
  max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
  min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});

function mobileNav() {
  var btn = $('.j-btn-mobile');
  var body = $('body');
  var nav = $('.j-navigation');
  var lang = $('.header__lang');

  btn.on('click', function(){
    var _this = $(this);
    if (_this.hasClass('is-active')) {
      btn.removeClass('is-active');
      body.removeClass('is-fixed');
      nav.removeClass('is-active');
    } else {
      btn.addClass('is-active');
      body.addClass('is-fixed');
      nav.addClass('is-active');
    }
  });

  nav.on('click', function(){
    btn.removeClass('is-active');
    body.removeClass('is-fixed');
    nav.removeClass('is-active');
    lang.removeClass('is-active');
  });
}

function activeLang() {
  var btn = $('.j-lang');
  
  btn.on('click', function(e){
    e.stopPropagation();
    $('.j-navigation').removeClass('is-active');
    var _this = $(this);
    var block = _this.parent();
    if (block.hasClass('is-active')) {
      block.removeClass('is-active');
    } else {
      block.addClass('is-active');
    }
  });

  $(document).on('click', function(){
    $('.header__lang').removeClass('is-active');
  });

  $('.header__lang-ul').on('click', function(e){
    e.stopPropagation();
  });
}

function inputFocus(){
  var jinput = $(".css-input");

  jinput.each(function(){
    var _this = $(this);
    var val = _this.val();
    var field = _this.parents('.j-field-text');

    if (val.length > 0 && _this.is('input') || val.length > 0 && _this.is('textarea')) {
      field.addClass("active-full");
    } else {
      field.removeClass("active-full");
    }

    // input on focus
    _this.focus(function () {
      field.addClass("active");
    }).blur(function () {
      field.removeClass("active");
    })

    _this.on('change', function () {
      var val = _this.val();

      if (val == '') {
        field.removeClass("active-full");
      } else {
        field.addClass("active-full");
      }
    });
  })
}

function headerScroll() {
  var header = $('.header');
  var width = $(window).width();

  if ($(window).scrollTop() > header.height()) {
    header.addClass('is-scroll');
  } else {
    header.removeClass('is-scroll');
  }
}

function oneCarousel() {
  var width = $(window).width();

  var $slickElementPagination = $('.one-apartment__carousel-pagination');
  var $slickElement = $('.j-one-apartment');

  if (width <= 767) {
    $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
      //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
      var i = (currentSlide ? currentSlide : 0) + 1;
      $slickElementPagination.text(i + ' / ' + slick.slideCount);
    });  
    $slickElement.not('.slick-initialized').slick({
      mobileFirst: true,
      arrows: false,
      infinite: true,
      dots: false
    });
  } else {
    if($slickElement.hasClass('slick-initialized')){
      $slickElement.slick('unslick');
    }
  }
}

function donatePayment() {
  var input = $('#donate-custom');
  var row = $('#form__donate');

  input.on('click', function(e){
    row.find('input[type="radio"]').prop("checked", false);
  });

  row.find('input[type="radio"]').on('click', function(){
    input.val('');
  });
}