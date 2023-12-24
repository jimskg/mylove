(function ($) {
  $(function () {

    const events = [
      { name: 'Bucharest', title:"Bucharest", date: "June", photo: "images/Romania.jpg", text: "Here, I get to know you 😊" },
      { name: 'Corfu', title:"Corfu", date: "August", photo: "images/Corfu.jpg", text: "And here, I understood you 😇" },
      { name: 'Crete', title:"Crete", date: "August", photo: "images/Crete.jpg", text: "Well here, I enjoyed every moment with you 😁" },
      { name: 'Patras', title:"Patras", date: "October", photo: "images/Patra.jpg", text: "Let\'s not talk about this one 😅" },
      { name: 'Bratislava', title:"Bratislava", date: "October", photo: "images/Slovakia.jpg", text: "Here, I loved you ❤️" },
      { name: 'Paris', title:"Paris", date: "December", photo: "", text: "Loading..." },
      { name: 'Strasbourg', title:"Strasbourg", date: "February", photo: "", text: "Loading..." },
      { name: 'Budapest', title:"Budapest", date: "March", photo: "", text: "Loading..." },
      { name: 'Barcelona / Sevilla', title:"Barcelona / Sevilla", date: "May", photo: "", text: "Loading..." },
      
      // Add more skills as needed
    ];
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

  });
  
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
