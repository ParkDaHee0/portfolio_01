$(".depth2").hide();

$(".gnb>li").mouseenter(function () {
  $(this).find(".depth2").stop().show();
});

$(".gnb>li").mouseleave(function () {
  $(this).find(".depth2").stop().hide();
});

$(".depth3").hide();

$(".depth2 > li").mouseenter(function () {
  $(this).find(".depth3").stop().show();
});

$(".depth2 > li").mouseleave(function () {
  $(this).find(".depth3").stop().hide();
});

//비즈니스 밑줄
$("#buisness .b_list li:nth-of-type(1)").addClass("active");

//비즈니스 이미지 클릭 시 변경
$("#buisness .b_img li").click(function () {
  $(this).addClass("active").siblings().removeClass("active");
  let idx1 = $(this).index();
  $("#buisness .b_list li").eq(idx1).addClass("active").siblings().removeClass("active");
  $("#buisness .b_subtxt").eq(idx1).addClass("on").siblings().removeClass("on");
});

$("#buisness .b_list li").click(function () {
  $(this).addClass("active").siblings().removeClass("active");
  let idx1 = $(this).index();
  $("#buisness .b_img li").eq(idx1).addClass("active").siblings().removeClass("active");
  $("#buisness .b_subtxt").eq(idx1).addClass("on").siblings().removeClass("on");
});


//숫자 애니메이션
// number count for stats, using jQuery animate
$(function () {
  // 클래스가 "counter"인 모든 요소를 선택합니다.
  const $counters = $(".counter");

  // 노출 비율(%)과 애니메이션 속도(ms)을 설정합니다.
  const exposurePercentage = 100; // ex) 스크롤 했을 때 $counters 컨텐츠가 화면에 100% 노출되면 숫자가 올라갑니다.
  const duration = 1500; // ex) 1000 = 1초

  // 숫자에 쉼표를 추가할지 여부를 설정합니다.
  const addCommas = true; // ex) true = 1,000 / false = 1000

  // 숫자를 업데이트하고 애니메이션하는 함수 정의
  function updateCounter($el, start, end) {
    let startTime;
    function animateCounter(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;
      const current = Math.round(start + progress * (end - start)) / 10.0;
      const formattedNumber = addCommas ? current.toLocaleString() : current;
      $el.text(formattedNumber);

      if (progress < 1) {
        requestAnimationFrame(animateCounter);
      } else {
        $el.text(addCommas ? end.toLocaleString() : end);
      }
    }
    requestAnimationFrame(animateCounter);
  }

  // 윈도우의 스크롤 이벤트를 모니터링합니다.
  $(window).on('scroll', function () {
    // 각 "counter" 요소에 대해 반복합니다.
    $counters.each(function () {
      const $el = $(this);
      // 요소가 아직 스크롤되지 않았다면 처리합니다.
      if (!$el.data('scrolled')) {
        // 요소의 위치 정보를 가져옵니다.
        const rect = $el[0].getBoundingClientRect();
        const winHeight = window.innerHeight;
        const contentHeight = rect.bottom - rect.top;

        // 요소가 화면에 특정 비율만큼 노출될 때 처리합니다.
        if (rect.top <= winHeight - (contentHeight * exposurePercentage / 100) && rect.bottom >= (contentHeight * exposurePercentage / 100)) {
          const start = parseInt($el.data("start"));
          const end = parseInt($el.data("end"));
          // 숫자를 업데이트하고 애니메이션을 시작합니다.
          updateCounter($el, start, end);
          $el.data('scrolled', true);
        }
      }
    });
  }).scroll();
});

//뉴스 이미지 클릭시 첫 번째 이미지 사라지게 하기
$(".news_img li img").click(function () {
  $(this).siblings.hide();
});

const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
var swiper = new Swiper(".news_img", {
  autoplay: {
    delay: 4000, // 슬라이드 대기 시간 2500=2.5초 / 3.5~5초 사이가 적당
    disableOnInteraction: false, //세부옵션 -> 스와이퍼가 자동으로 재생되고 터치했을 때 다시 슬라이드가 넘어가게 할 것 인가에 대한 기본값
  },
  speed: 1000, // 슬라이드가 넘어갈 때 속도 ms 2000=2초 / 1초나 0.8초가 적당
  navigation: { //방향버튼 - 태그를 추가
    nextEl: ".swiper-button-next", //다음
    prevEl: ".swiper-button-prev", //이전
  },
  pagination: { // 슬라이드 갯수(하단 불릿기호) - 태그 추가
    el: ".swiper-pagination",
    type: "fraction", // "bullets-동그라미", "fraction-숫자", "progressbar-바"
  },
  loop: true, // 슬라이드 반복여부
  slidesPerView: 1, // 모바일 먼저 보이게 하기
  spaceBetween: 24,
  breakpoints: {
    768: {
      slidesPerView: 2.2,
      spaceBetween: 24,
    },
    1220: {
      slidesPerView: 2.5,
      spaceBetween: 24,
    }
  },
  on: {
    autoplayTimeLeft(s, time, progress) {
      progressCircle.style.setProperty("--progress", 1 - progress);
    }
  }
});
