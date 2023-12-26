(function ($) {
  $(function () {

    var slidePosition = 1;
    const events = [
      { id:"event-1", name: 'Bucharest', title:"Bucharest", date: "June", photo: "images/Bucharest.jpg", text: "Here, I got to know you 😊" },
      { id:"event-2", name: 'Corfu', title:"Corfu", date: "August", photo: "images/Corfu.jpg", text: "And here, I understood you 😇" },
      { id:"event-3", name: 'Crete', title:"Crete", date: "August", photo: "images/Crete.jpg", text: "Well here, I enjoyed every moment with you 😁" },
      { id:"event-4", name: 'Patras', title:"Patras", date: "October", photo: "images/Patra.jpg", text: "Let\'s not talk about this one 😅" },
      { id:"event-5", name: 'Bratislava', title:"Bratislava", date: "October", photo: "images/Bratislava.jpg", text: "Here, I loved you ❤️" },
      { id:"event-6", name: 'Paris', title:"Paris", date: "December", photo: "", text: "Loading..." },
      { id:"event-7", name: 'Strasbourg', title:"Strasbourg", date: "February", photo: "", text: "Loading..." },
      { id:"event-8", name: 'Budapest', title:"Budapest", date: "March", photo: "", text: "Loading..." },
      { id:"event-9", name: 'Barcelona / Sevilla', title:"Barcelona / Sevilla", date: "May", photo: "", text: "Loading..." },
      
      // Add more skills as needed
    ];

    const slidesCarousel = new Map([
      ["event-1", [{title: "", imageSrc: "images/Bucharest1.jpg", caption: ""},
                  {title: "", imageSrc: "images/Bucharest2.jpg", caption: ""},
                  {title: "", imageSrc: "images/Bucharest3.jpg", caption: ""},
                  {title: "", imageSrc: "images/Bucharest4.jpg", caption: ""},
                  {title: "", imageSrc: "images/Bucharest5.jpg", caption: ""}]],
      ["event-2", [{title: "", imageSrc: "images/Corfu1.jpg", caption: ""},
                  {title: "", imageSrc: "images/Corfu2.jpg", caption: ""},
                  {title: "", imageSrc: "images/Corfu3.jpg", caption: ""},
                  {title: "", imageSrc: "images/Corfu4.jpg", caption: ""},
                  {title: "", imageSrc: "images/Corfu5.jpg", caption: ""},
                  {title: "", imageSrc: "images/Corfu6.jpg", caption: ""}]],
      ["event-3", [{title: "", imageSrc: "images/Crete1.jpg", caption: ""},
                  {title: "", imageSrc: "images/Crete2.jpg", caption: ""},
                  {title: "", imageSrc: "images/Crete3.jpg", caption: ""},
                  {title: "", imageSrc: "images/Crete4.jpg", caption: ""},
                  {title: "", imageSrc: "images/Crete5.jpg", caption: ""}]],
      ["event-4", [{title: "", imageSrc: "images/Patra1.jpg", caption: ""},
                  {title: "", imageSrc: "images/Patra2.jpg", caption: ""},
                  {title: "", imageSrc: "images/Patra3.jpg", caption: ""},
                  {title: "", imageSrc: "images/Patra4.jpg", caption: ""},
                  {title: "", imageSrc: "images/Patra5.jpg", caption: ""}]],
      ["event-5", [{title: "", imageSrc: "images/Bratislava1.jpg", caption: ""},
                  {title: "", imageSrc: "images/Bratislava2.jpg", caption: ""},
                  {title: "", imageSrc: "images/Bratislava3.jpg", caption: ""},
                  {title: "", imageSrc: "images/Bratislava4.jpg", caption: ""},
                  {title: "", imageSrc: "images/Bratislava5.jpg", caption: ""},
                  {title: "", imageSrc: "images/Bratislava6.jpg", caption: ""},
                  {title: "", imageSrc: "images/Bratislava7.jpg", caption: ""},
                  {title: "", imageSrc: "images/Bratislava8.jpg", caption: ""},
                  {title: "", imageSrc: "images/Bratislava9.jpg", caption: ""},
                  {title: "", imageSrc: "images/Bratislava10.jpg", caption: ""}]],
    ]);

    createEvents();
    createDots();

    function createDots(){
      const dotSpinners = document.getElementsByClassName('dot-spinner');
      for (element of dotSpinners) {
        const numberOfDots = 12;
        for (let i = 0; i < numberOfDots; i++) {
          const dot = document.createElement('div');
          dot.style.animationDelay = `-${i / numberOfDots}s`;
          dot.style.top = `${Math.sin((i / numberOfDots) * Math.PI * 2) * 40 + 50}%`;
          dot.style.left = `${Math.cos((i / numberOfDots) * Math.PI * 2) * 40 + 50}%`;
          element.appendChild(dot);
        }
      }
      
    }
    
    function createEvents() {
      let timeline = document.getElementById('content-events-id');
      let counter = 1;
      events.forEach(event => {
        var timelineItem = document.createElement('div');
        timelineItem.className = 'js-timeline_item ag-timeline_item';

        var cardBox = document.createElement('div');
        cardBox.className = 'ag-timeline-card_box';

        var pointBox = document.createElement('div');
        pointBox.className = 'js-timeline-card_point-box ag-timeline-card_point-box';

        var point = document.createElement('div');
        point.className = 'ag-timeline-card_point';
        point.textContent = event.date;

        var metaBox = document.createElement('div');
        metaBox.className = 'ag-timeline-card_meta-box';

        var meta = document.createElement('div');
        meta.className = 'ag-timeline-card_meta';
        meta.textContent = event.name;

        var cardItem = document.createElement('div');
        cardItem.className = 'ag-timeline-card_item';

        var cardInner = document.createElement('div');
        cardInner.className = 'ag-timeline-card_inner';

        var imgBox = document.createElement('div');
        imgBox.className = 'ag-timeline-card_img-box';
        imgBox.id = event.id;
        imgBox.onclick = function() { 
          parentPhotoElement = document.getElementById(event.id);
          createCarousel(parentPhotoElement.id);
          SlideShow(slidePosition);
        };

        var img = document.createElement('img');
        img.src = event.photo;
        img.className = 'ag-timeline-card_img';
        img.width = '640';
        img.height = '360';

        var imgEmptyDiv = document.createElement('div');
        imgEmptyDiv.className = 'dot-spinner';
        imgEmptyDiv.id = 'dotSpinner';
        
        var info = document.createElement('div');
        info.className = 'ag-timeline-card_info';

        var cardTitle = document.createElement('div');
        cardTitle.className = 'ag-timeline-card_title';
        cardTitle.textContent = event.title;

        var cardDesc = document.createElement('div');
        cardDesc.className = 'ag-timeline-card_desc';
        cardDesc.textContent = event.text;

        var arrow = document.createElement('div');
        arrow.className = 'ag-timeline-card_arrow';

        // Append elements to the DOM
        pointBox.appendChild(point);
        metaBox.appendChild(meta);
        if (counter%2==1){
          cardBox.appendChild(pointBox);
          cardBox.appendChild(metaBox);
        } else {
          cardBox.appendChild(metaBox);
          cardBox.appendChild(pointBox);
        }

        if (event.photo != null && event.photo != ''){
          imgBox.appendChild(img);
        } else {
          imgBox.appendChild(imgEmptyDiv);
        }
        info.appendChild(cardTitle);
        info.appendChild(cardDesc);

        cardInner.appendChild(imgBox);
        cardInner.appendChild(info);

        cardItem.appendChild(cardInner);
        cardItem.appendChild(arrow);

        timelineItem.appendChild(cardBox);
        timelineItem.appendChild(cardItem);
        timeline.appendChild(timelineItem);
        counter++;
      });
    }

    $(window).on('scroll', function () {
      fnOnScroll();
    });

    $(window).on('resize', function () {
      fnOnResize();
    });

    var agTimeline = $('.js-timeline'),
      agTimelineLine = $('.js-timeline_line'),
      agTimelineLineProgress = $('.js-timeline_line-progress'),
      agTimelinePoint = $('.js-timeline-card_point-box'),
      agTimelineItem = $('.js-timeline_item'),
      agOuterHeight = $(window).outerHeight(),
      agHeight = $(window).height(),
      f = -1,
      agFlag = false;
 

    function fnOnScroll() {
      agPosY = $(window).scrollTop();

      fnUpdateFrame();
    }

    function fnOnResize() {
      agPosY = $(window).scrollTop();
      agHeight = $(window).height();

      fnUpdateFrame();
    }

    function fnUpdateWindow() {
      agFlag = false;

      agTimelineLine.css({
        top: agTimelineItem.first().find(agTimelinePoint).offset().top - agTimelineItem.first().offset().top,
        bottom: agTimeline.offset().top + agTimeline.outerHeight() - agTimelineItem.last().find(agTimelinePoint).offset().top
      });

      f !== agPosY && (f = agPosY, agHeight, fnUpdateProgress());
    }

    function fnUpdateProgress() {
      var agTop = agTimelineItem.last().find(agTimelinePoint).offset().top;

      i = agTop + agPosY - $(window).scrollTop();
      a = agTimelineLineProgress.offset().top + agPosY - $(window).scrollTop();
      n = agPosY - a + agOuterHeight / 2;
      i <= agPosY + agOuterHeight / 2 && (n = i - a);
      agTimelineLineProgress.css({height: n + "px"});

      agTimelineItem.each(function () {
        var agTop = $(this).find(agTimelinePoint).offset().top;

        (agTop + agPosY - $(window).scrollTop()) < agPosY + .5 * agOuterHeight ? $(this).addClass('js-ag-active') : $(this).removeClass('js-ag-active');
      })
    }

    function fnUpdateFrame() {
      agFlag || requestAnimationFrame(fnUpdateWindow);
      agFlag = true;
    }

    function navigateTo(tabId, buttonId) {
      const tabs = document.getElementsByClassName('tab');
      const buttons = document.getElementsByClassName('nav-item');
      for (currentButtons of buttons) {
        currentButtons.style.display = 'none';
        if (currentButtons.id == buttonId){
          currentButtons.style.display = 'block';
        }
      }
      for (currentTab of tabs) {
        currentTab.style.display = 'none';
        if (currentTab.id == tabId){
           if (currentTab.id == 'birthday-id') currentTab.style.display = 'flex';
           else currentTab.style.display = 'block';
        }
      }
    }
  
    $('#back-id-button').on('click', function () {
      navigateTo('timeline-id', 'birthday-id-li');
    });

    $('#birthday-id-button').on('click', function () {
      navigateTo('birthday-id', 'back-id-li'); 
    });
    
    function togglePasswordVisibility() {
      const passwordInput = document.getElementById('password');
      const showPasswordBtn = document.getElementById('show-password-button-id');
      const enteredPassword = passwordInput.value;
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        showPasswordBtn.textContent = '🙉';
      } else {
        passwordInput.type = 'password';
        showPasswordBtn.textContent = '🙈';
      }
    }

    $('#check-password-button-id').on('click', function(){
      const passwordInput = document.getElementById('password');
      const showPasswordBtn = document.getElementById('show-password-button-id');
      const enteredPassword = passwordInput.value;
      var now = new Date().getTime();
      var distance = endDate - now;
      let cleanedEnteredPassword = enteredPassword.replaceAll(' ','');

      if (distance < 0 && (cleanedEnteredPassword.toLowerCase() == 'loveyou3000' || cleanedEnteredPassword.toLowerCase() == 'iloveyou3000')){
        navigateTo('map-id', 'back-id-li'); 
        passwordInput.value = '';
      } else {
        passwordInput.classList.add('shake');
        showPasswordBtn.classList.add('shake');
        setTimeout(() => {
          passwordInput.classList.remove('shake');
          showPasswordBtn.classList.remove('shake');
        }, 500);
      }
    });

    $('#show-password-button-id').on('click', function () {
      togglePasswordVisibility();
    });

    function SlideShow(n) {
      var i;
      var slides = document.getElementsByClassName("Containers");
      var circles = document.getElementsByClassName("dots");
      if (n > slides.length) {slidePosition = 1}
      if (n < 1) {slidePosition = slides.length}
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
      }
      for (i = 0; i < circles.length; i++) {
          circles[i].className = circles[i].className.replace(" enable", "");
      }
      slides[slidePosition-1].style.display = "block";
      circles[slidePosition-1].className += " enable";
    } 

    function createCarousel(parentPhotoId){
      slidePosition = 1;
      const modalDiv = document.createElement('div');
      modalDiv.id = 'carousel-modal-id';
      modalDiv.classList.add('carousel-modal');

      // Create the modal content div
      const modalContentDiv = document.createElement('div');
      modalContentDiv.classList.add('carousel-modal-content');

      var slideshowContainer = document.createElement("div");
      slideshowContainer.className = "slideshow-container fade";

      var dotsDiv = document.createElement("div");
      dotsDiv.className = "dots-div";

      // Define slide data
      let slides = slidesCarousel.get(parentPhotoId);

      // Create slides dynamically
      slides.forEach(function (slide, index) {
        var container = document.createElement("div");
        container.className = "Containers fade";

        var title = document.createElement("div");
        title.className = "info";
        title.textContent = slide.title;

        var image = document.createElement("img");
        image.src = slide.imageSrc;
        image.style.width = "100%";

        var caption = document.createElement("div");
        caption.className = "caption-info";
        caption.textContent = slide.caption;

        container.appendChild(title);
        container.appendChild(image);
        container.appendChild(caption);

        slideshowContainer.appendChild(container);

        // Create dot dynamically
        var dot = document.createElement("span");
        dot.className = "dots";
        dot.id = "currentSlide" + (index + 1);
        dot.onclick = function() { 
          SlideShow(slidePosition = index + 1);
        };

        // Append dot to the dots container
        dotsDiv.appendChild(dot);
      });

      // Create Prev and Next buttons
      var backButton = document.createElement("a");
      backButton.className = "Back";
      backButton.id = "backSlide";
      backButton.innerHTML = "&#10094;";
      backButton.onclick = function() { 
        SlideShow(slidePosition += -1);
      };

      var forwardButton = document.createElement("a");
      forwardButton.className = "forward";
      forwardButton.id = "frontSlide";
      forwardButton.innerHTML = "&#10095;";
      forwardButton.onclick = function() { 
        SlideShow(slidePosition += 1);
      };

      slideshowContainer.appendChild(backButton);
      slideshowContainer.appendChild(forwardButton);

      modalContentDiv.appendChild(slideshowContainer);
      modalContentDiv.appendChild(dotsDiv);
      modalDiv.appendChild(modalContentDiv);

      // Append the slideshow container to the body
      document.body.appendChild(modalDiv);
    }

    document.addEventListener('keydown', function(event) {
      let carouselElement = document.getElementById("carousel-modal-id");
      if (carouselElement){
        switch (event.keyCode) {
          case 37:
              SlideShow(slidePosition += -1);
              break;
          case 39:
              SlideShow(slidePosition += +1);
              break;
        }
      }
    });
    
  });

  

  
  window.onclick = function(event) {
    var carouselModal = document.getElementById("carousel-modal-id");
    if (event.target == carouselModal) {
      carouselModal.remove();
      //carouselModal.style.display = "none";
    }
  } 
  
  function createConfetti(duration) {
    const confettiContainer = document.querySelector('#confetti-container');
    let confettiInterval;  // Declare a variable to store the interval ID
  
    const showConfetti = () => {
      const confetti = document.createElement('div');
      confetti.textContent = '🎉';
      confetti.classList.add('confetti');
      confetti.style.left = Math.random() * innerWidth + 'px';
      confettiContainer.appendChild(confetti);
  
      setTimeout(() => {
        confetti.remove();
      }, 5000);
    };
  
    // Start the interval and store its ID in confettiInterval
    confettiInterval = setInterval(() => {
      showConfetti();
    }, 400);
  
    // Stop the interval after the specified duration
    setTimeout(() => {
      clearInterval(confettiInterval);
    }, duration);
  }

  // Set the date we're counting down to
  var endDate = new Date("Feb 6, 2024 00:00:00").getTime();
  // var endDate = new Date("Feb 6, 2023 00:00:00").getTime();
  
  var x = setInterval(function() {
      var now = new Date().getTime();
      var distance = endDate - now;
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      document.getElementById("days-id").innerHTML = days == 1 ? "DAY" : "DAYS";
      document.getElementById("daysNum").innerHTML = ("0" + days).slice(-2);  
      document.getElementById("hoursNum").innerHTML = ("0" + hours).slice(-2);
      document.getElementById("minsNum").innerHTML = ("0" + minutes).slice(-2);
      document.getElementById("secsNum").innerHTML = ("0" + seconds).slice(-2);
      if (distance < 0) {
          clearInterval(x);
          document.getElementById("daysNum").innerHTML = "00";  
          document.getElementById("hoursNum").innerHTML = "00";  
          document.getElementById("minsNum").innerHTML = "00";  
          document.getElementById("secsNum").innerHTML = "00";
          createConfetti(20000);
      }
  }, 1000);


  
})(jQuery);
