// $(document).ready(function () {
//     $('.carousel__inner').slick({
//         speed: 1200,
//         adaptiveHeight: true,
//         autoplay: true,
//         autoplaySpeed: 1000,      
//         infinite: true,
//         speed: 500,        
//         prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg"></button>',
//         nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg"></button>',
//         responsive: [
//             {
//                 breakpoint: 992,
//                 settings: {
//                     dots: true,
//                     arrows: false
//                 }
//             }
//         ]
//     });
// });


//tabs

$(document).ready(function () {

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  //flip card

  // $('.catalog-item__link').each(function (i) {
  //   $(this).on('click', function (e) {
  //     e.preventDefault();
  //     $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
  //     $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
  //   })
  // })

  //flip card back

  // $('.catalog-item__back').each(function (i) {
  //   $(this).on('click', function (e) {
  //     e.preventDefault();
  //     $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
  //     $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
  //   })
  // })

  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active')
      })
    })
  };

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back');

  //Modal

  $('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn('slow');
  });
  $('.modall__close').on('click', function () {
    $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
  });

  $('.button_mini').each(function (i) {
    $(this).on('click', function () {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    });
  });

  //validate Forms

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        },
      },
      messages: {
        name: {
          required: "Пожалуйста, введите ваше имя",
          minlength: jQuery.validator.format("Наиманьшее количестово - {0} символа")
        },
        phone: "Пожалуйста, введите ваш номер телефона.",
        email: {
          required: "Пожалуйста, введите свой email адресс",
          email: "email адресс должен быть в формате name@domain.com"
        }
      }
    });
  }

  validateForms('#consultation-form');
  validateForms('#consultation form');
  validateForms('#order form');


  //mask form

  $('input[name=phone]').mask("+ 48 (99) 999-99-99");


});


// tiny slider

const slider = tns({
  container: '.carousel__inner',
  items: 1,
  slideBy: 'page',
  autoplay: false,
  controls: false,
  navPosition: 'bottom',
  // nav: false
  //     controlsText: [
  // '<img src="icons/left.svg"  />',
  // '<img src="icons/right.svg" />'
  //     ]
});


document.querySelector('.prev').addEventListener('click', function () {
  slider.goTo('prev');
});
document.querySelector('.next').addEventListener('click', function () {
  slider.goTo('next');
});


$('form').submit(function (e) {
  e.preventDefault();

  if(!$(this).valid()){return ;}

  $.ajax({
    type: "POST",
    url: "mailer/smart.php",
    data: $(this).serialize()
  }).done(function () {
    $(this).find("input").val("");
    $('#consultation, #order').fadeOut();
    $('.overlay, #thanks').fadeIn('slow');
    $('form').trigger('reset');
  });
  return false;

})

console.log('php')
