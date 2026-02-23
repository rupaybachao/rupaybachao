document.addEventListener("DOMContentLoaded", function () {
  fetch("./navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;
    });
});

document.addEventListener("DOMContentLoaded", function () {

  fetch("./navbar.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;
      setActiveLink();
    });

});


function setActiveLink() {

  let currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "") {
    currentPage = "index.html";
  }

  const links = document.querySelectorAll(".navDropdownText");

  links.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
      link.parentElement.classList.add("active");
    }
  });

}

// THIS IS THE ANIMATION THAT TOOKS SOME TIME TO SHOW ANOTHE FADE UP ANIMATION
const elements = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 },
);

elements.forEach((el) => observer.observe(el));

// THIS IS THE ANIMATION THAT TOOKS SOME TIME TO SHOW ANOTHE FADE UP ANIMATION
const fadeDownElements = document.querySelectorAll(".fade-down");

const observer1 = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 },
);

fadeDownElements.forEach((el) => observer1.observe(el));

/* ===========================
   HORIZONTAL MUSIC CAROUSEL FIX
=========================== */

const horizontalCarousel = document.querySelector(".carousel");

if (horizontalCarousel) {
  horizontalCarousel.addEventListener("slide.bs.carousel", function () {
    const allAudios = horizontalCarousel.querySelectorAll("audio");
    allAudios.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });

    const allButtons = horizontalCarousel.querySelectorAll("#playPauseButton");
    allButtons.forEach((btn) => {
      btn.src = "./images/play-white.png";
    });

    const allWaves = horizontalCarousel.querySelectorAll("#wave");
    allWaves.forEach((wave) => {
      wave.classList.remove("active");
      wave.style.display = "none";
    });
  });
  horizontalCarousel.addEventListener("click", function (e) {
    if (e.target.id === "playPauseButton") {
      const currentSlide = e.target.closest(".carousel-item");

      const audio = currentSlide.querySelector("audio");
      const wave = currentSlide.querySelector("#wave");
      const button = e.target;

      if (audio.paused) {
        const allAudios = horizontalCarousel.querySelectorAll("audio");
        allAudios.forEach((a) => {
          a.pause();
          a.currentTime = 0;
        });

        const allButtons =
          horizontalCarousel.querySelectorAll("#playPauseButton");
        allButtons.forEach((btn) => {
          btn.src = "./images/play-white.png";
        });

        audio.play();
        button.src = "./images/pause-white.png";

        wave.style.display = "flex";
        wave.classList.add("active");
      } else {
        audio.pause();
        button.src = "./images/play-white.png";

        wave.classList.remove("active");
      }
    }
  });
}

const data = [
  {
    image: "./images/homepageBgimage1.jpg",
    podccastDescription: " my description ",
    audio: "./audios/audio",
    podcastName: "mypodcast",
    ituneLink: "",
    spotifyLink: "",
    ytLink: "",
  },
  {
    image: "./images/homepageBgimage2.jpg",
    podccastDescription: " my description ",
    audio: "./audios/audio",
    podcastName: "mypodcast",
    ituneLink: "",
    spotifyLink: "",
    ytLink: "",
  },
  {
    image: "./images/homepageBgimage3.jpg",
    podccastDescription: " my description ",
    audio: "./audios/audio",
    podcastName: "mypodcast",
    ituneLink: "",
    spotifyLink: "",
    ytLink: "",
  },
  {
    image: "./images/homepageBgimage4.jpg",
    podccastDescription: " my description ",
    audio: "./audios/audio",
    podcastName: "mypodcast",
    ituneLink: "",
    spotifyLink: "",
    ytLink: "",
  },
];

const carouselInner = document.getElementById("audioCarouselInner");

carouselInner.innerHTML = data
  .map(
    (item, index) => `
  <div class="h-100 carousel-item ${index === 0 ? "active" : ""}">
    
    <div class="row g-0 p-3 bg-white h-50">
    <div class="video-wrapper position-relative">
        <video id="myVideo" controls="true">
          <source src="./videos/rupaybachaoVid.mp4" type="video/mp4">
          </video>
        </div>
    </div>
    <div class="row g-0 p-3 bg-white h-50">
      <p>podcast - ${item.podcastName}</p> 
      <p>podcast - ${item.podccastDescription}</p>
      <div class="h-50px row g-0 d-flex align-items-end">
        <div class="musicApps center-elements p-1 me-3">
          <svg fill="white" width="800px" height="800px" viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg">
                <path
                d="M 10.048828 5 C 7.2548281 5 5 7.2548281 5 10.048828 L 5 21.951172 C 5 24.745172 7.2548281 27 10.048828 27 L 21.951172 27 C 24.750172 27 27 24.745172 27 21.951172 L 27 10.048828 C 27 7.2548281 24.745172 5 21.951172 5 L 10.048828 5 z M 15.980469 7 C 20.950469 7 24.980469 11.03 24.980469 16 C 24.980469 20.97 20.950469 25 15.980469 25 C 11.010469 25 6.9804688 20.97 6.9804688 16 C 6.9804688 11.03 11.010469 7 15.980469 7 z M 15.980469 8.0253906 C 11.568469 8.0253906 8 11.602766 8 16.009766 C 8 20.416766 11.568469 24 15.980469 24 C 20.392469 24 23.964844 20.423625 23.964844 16.015625 C 23.964844 11.603625 20.388469 8.0253906 15.980469 8.0253906 z M 19.316406 11 C 19.578406 10.982 19.730469 11.138391 19.730469 11.400391 C 19.726469 19.236391 19.748594 18.522641 19.683594 18.806641 C 19.536594 19.431641 19.063688 19.781391 18.429688 19.900391 C 17.873687 20.001391 17.409844 20.028922 16.964844 19.669922 C 16.422844 19.210922 16.413391 18.457469 16.900391 17.980469 C 17.286391 17.613469 17.833484 17.539578 18.646484 17.392578 C 18.784484 17.369578 18.903 17.337656 19 17.222656 C 19.147 17.057656 19.101562 17.421734 19.101562 13.802734 C 19.101562 13.545734 18.976844 13.475484 18.714844 13.521484 C 18.530844 13.553484 14.494141 14.306641 14.494141 14.306641 C 14.264141 14.357641 14.185547 14.4255 14.185547 14.6875 C 14.185547 20.0195 14.208859 19.486844 14.130859 19.839844 C 14.034859 20.252844 13.782266 20.564281 13.447266 20.738281 C 13.066266 20.949281 12.372859 21.042516 12.005859 20.978516 C 11.022859 20.794516 10.67775 19.659812 11.34375 19.007812 C 11.72975 18.640812 12.276844 18.566922 13.089844 18.419922 C 13.227844 18.396922 13.346359 18.365 13.443359 18.25 C 13.673359 17.988 13.4845 12.707391 13.5625 12.400391 C 13.5805 12.281391 13.630656 12.181422 13.722656 12.107422 C 13.818656 12.029422 13.98925 11.982422 14.03125 11.982422 C 18.67025 11.109422 19.234406 11 19.316406 11 z" />
          </svg>
        </div>
        <div class="musicApps center-elements p-2 me-3">
          <svg width="800px" height="800px" viewBox="0 0 512 512" version="1.1"
            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>youtube-filled</title>
                <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                  <g id="icon" fill="white" transform="translate(42.666738, 106.667236)">
                    <path
                        d="M214.304705,0.000543068834 C226.424729,0.0216871426 348.414862,0.444568619 380.010595,8.90219814 C398.378595,13.7775234 412.821262,28.1915286 417.749262,46.6329765 C426.309902,78.5811951 426.652328,143.739282 426.666025,148.900811 L426.666025,149.553735 C426.652328,154.730893 426.309902,220.084332 417.749262,252.032551 C412.821262,270.473998 398.378595,284.888004 380.010595,289.763329 C347.417102,298.488042 218.629945,298.662536 213.491496,298.666026 L213.175003,298.666026 C208.035726,298.662536 79.2276622,298.488042 46.6132622,289.763329 C28.2665955,284.888004 13.8025955,270.473998 8.89592883,252.032551 C0.355768832,220.084332 0.014162432,154.730893 0.000498176,149.553735 L0.000498176,148.900811 C0.014162432,143.739282 0.355768832,78.5811951 8.89592883,46.6329765 C13.8025955,28.1915286 28.2665955,13.7775234 46.6132622,8.90219814 C78.2292622,0.444568619 200.239662,0.0216871426 212.361662,0.000543068834 Z M169.685262,86.2714908 L169.685262,212.394036 L281.215929,149.226778 L169.685262,86.2714908 Z"
                          id="Shape">
                    </path>
                  </g>
                </g>
          </svg>
        </div>
        <div class="musicApps center-elements p-2">
            <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.9954 0C5.38111 0 0 5.38151 0 11.9963C0 18.6152 5.38111 24 11.9954 24C18.6147 24 24 18.6152 24 11.9963C24 5.38151 18.6147 0 11.9954 0ZM5.90793 16.4042C7.29868 15.9809 8.72459 15.7662 10.1459 15.7662C12.5597 15.7662 14.9427 16.3779 17.0383 17.5359C17.163 17.6038 17.2763 17.8284 17.3271 18.108C17.378 18.3875 17.3577 18.6749 17.2761 18.8244C17.1731 19.0163 16.9641 19.1403 16.7436 19.1403C16.6343 19.1403 16.5382 19.1157 16.4421 19.0638C14.5183 18.0064 12.3412 17.4474 10.1459 17.4474C8.81957 17.4474 7.51751 17.6437 6.27698 18.0304C6.21655 18.0487 6.15439 18.0581 6.09222 18.0581C5.82059 18.0582 5.58484 17.8851 5.50576 17.6284C5.39898 17.2773 5.61986 16.4984 5.90793 16.4042ZM5.38466 11.9845C6.93474 11.5631 8.53668 11.3494 10.1459 11.3494C13.0389 11.3494 15.9117 12.0494 18.4555 13.3748C18.6338 13.4653 18.7652 13.6187 18.8254 13.8068C18.8865 13.9973 18.8681 14.2021 18.7728 14.3849C18.5458 14.8292 18.2804 15.1277 18.1124 15.1277C17.9932 15.1277 17.8783 15.0991 17.7638 15.0419C15.4016 13.8119 12.8387 13.1882 10.1459 13.1882C8.64803 13.1882 7.17852 13.3852 5.77951 13.7732C5.71444 13.7909 5.64763 13.7998 5.58114 13.7998C5.24459 13.7998 4.94801 13.5725 4.8602 13.2479C4.74775 12.8258 5.00467 12.0878 5.38466 11.9845ZM5.25065 9.09687C5.17959 9.11441 5.10696 9.12323 5.03473 9.12323C4.62799 9.12331 4.27554 8.84845 4.17765 8.4554C4.05498 7.95785 4.36627 7.37988 4.81708 7.26633C6.57033 6.83567 8.36317 6.61731 10.1459 6.61731C13.5968 6.61731 16.9018 7.39318 19.9702 8.92383C20.1833 9.02896 20.3422 9.21041 20.4177 9.43475C20.4932 9.65933 20.4766 9.90106 20.3711 10.1146C20.2274 10.4022 19.9169 10.7119 19.5747 10.7119C19.4428 10.7119 19.3073 10.6809 19.1873 10.6246C16.3687 9.21443 13.3268 8.49938 10.1459 8.49938C8.51127 8.49946 6.86431 8.70043 5.25065 9.09687Z"
                  fill="white" />
            </svg>
        </div>
      </div>
    </div>
  </div>
`,
  )
  .join("");

const verticalCarouselInner = document.getElementById(
  "audioVerticalCarouselInner",
);

verticalCarouselInner.innerHTML = data
  .map(
    (item, index) => `
   <div class="h-100 carousel-item ${index === 0 ? "active" : ""}">
        <div class="row g-0 p-0 m-0 h-550px mx-5 d-none d-sm-flex">
            <div class="col bg-white p-5 d-flex flex-column justify-content-between">
                <div>
                    <p>Podcast - The McKinsey Podcast</p>
                    <h1>How the best CEOs are meeting the AI moment</h1>
                    <p>January 22, 2026 - CEOs are confronting a make-or-break test of their
                        leadership.
                        Here’s
                        what
                        successful leaders are doing to get AI right.</p>
                </div>
                <div class="h-50px row g-0 d-flex align-items-end">
                    <div class="musicApps center-elements p-1 me-3">
                        <svg fill="white" width="800px" height="800px" viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M 10.048828 5 C 7.2548281 5 5 7.2548281 5 10.048828 L 5 21.951172 C 5 24.745172 7.2548281 27 10.048828 27 L 21.951172 27 C 24.750172 27 27 24.745172 27 21.951172 L 27 10.048828 C 27 7.2548281 24.745172 5 21.951172 5 L 10.048828 5 z M 15.980469 7 C 20.950469 7 24.980469 11.03 24.980469 16 C 24.980469 20.97 20.950469 25 15.980469 25 C 11.010469 25 6.9804688 20.97 6.9804688 16 C 6.9804688 11.03 11.010469 7 15.980469 7 z M 15.980469 8.0253906 C 11.568469 8.0253906 8 11.602766 8 16.009766 C 8 20.416766 11.568469 24 15.980469 24 C 20.392469 24 23.964844 20.423625 23.964844 16.015625 C 23.964844 11.603625 20.388469 8.0253906 15.980469 8.0253906 z M 19.316406 11 C 19.578406 10.982 19.730469 11.138391 19.730469 11.400391 C 19.726469 19.236391 19.748594 18.522641 19.683594 18.806641 C 19.536594 19.431641 19.063688 19.781391 18.429688 19.900391 C 17.873687 20.001391 17.409844 20.028922 16.964844 19.669922 C 16.422844 19.210922 16.413391 18.457469 16.900391 17.980469 C 17.286391 17.613469 17.833484 17.539578 18.646484 17.392578 C 18.784484 17.369578 18.903 17.337656 19 17.222656 C 19.147 17.057656 19.101562 17.421734 19.101562 13.802734 C 19.101562 13.545734 18.976844 13.475484 18.714844 13.521484 C 18.530844 13.553484 14.494141 14.306641 14.494141 14.306641 C 14.264141 14.357641 14.185547 14.4255 14.185547 14.6875 C 14.185547 20.0195 14.208859 19.486844 14.130859 19.839844 C 14.034859 20.252844 13.782266 20.564281 13.447266 20.738281 C 13.066266 20.949281 12.372859 21.042516 12.005859 20.978516 C 11.022859 20.794516 10.67775 19.659812 11.34375 19.007812 C 11.72975 18.640812 12.276844 18.566922 13.089844 18.419922 C 13.227844 18.396922 13.346359 18.365 13.443359 18.25 C 13.673359 17.988 13.4845 12.707391 13.5625 12.400391 C 13.5805 12.281391 13.630656 12.181422 13.722656 12.107422 C 13.818656 12.029422 13.98925 11.982422 14.03125 11.982422 C 18.67025 11.109422 19.234406 11 19.316406 11 z" />
                        </svg>
                    </div>
                    <div class="musicApps center-elements p-2 me-3">
                        <svg width="800px" height="800px" viewBox="0 0 512 512" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <title>youtube-filled</title>
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="icon" fill="white" transform="translate(42.666738, 106.667236)">
                                    <path
                                        d="M214.304705,0.000543068834 C226.424729,0.0216871426 348.414862,0.444568619 380.010595,8.90219814 C398.378595,13.7775234 412.821262,28.1915286 417.749262,46.6329765 C426.309902,78.5811951 426.652328,143.739282 426.666025,148.900811 L426.666025,149.553735 C426.652328,154.730893 426.309902,220.084332 417.749262,252.032551 C412.821262,270.473998 398.378595,284.888004 380.010595,289.763329 C347.417102,298.488042 218.629945,298.662536 213.491496,298.666026 L213.175003,298.666026 C208.035726,298.662536 79.2276622,298.488042 46.6132622,289.763329 C28.2665955,284.888004 13.8025955,270.473998 8.89592883,252.032551 C0.355768832,220.084332 0.014162432,154.730893 0.000498176,149.553735 L0.000498176,148.900811 C0.014162432,143.739282 0.355768832,78.5811951 8.89592883,46.6329765 C13.8025955,28.1915286 28.2665955,13.7775234 46.6132622,8.90219814 C78.2292622,0.444568619 200.239662,0.0216871426 212.361662,0.000543068834 Z M169.685262,86.2714908 L169.685262,212.394036 L281.215929,149.226778 L169.685262,86.2714908 Z"
                                        id="Shape">

                                    </path>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <div class="musicApps center-elements p-2">
                        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11.9954 0C5.38111 0 0 5.38151 0 11.9963C0 18.6152 5.38111 24 11.9954 24C18.6147 24 24 18.6152 24 11.9963C24 5.38151 18.6147 0 11.9954 0ZM5.90793 16.4042C7.29868 15.9809 8.72459 15.7662 10.1459 15.7662C12.5597 15.7662 14.9427 16.3779 17.0383 17.5359C17.163 17.6038 17.2763 17.8284 17.3271 18.108C17.378 18.3875 17.3577 18.6749 17.2761 18.8244C17.1731 19.0163 16.9641 19.1403 16.7436 19.1403C16.6343 19.1403 16.5382 19.1157 16.4421 19.0638C14.5183 18.0064 12.3412 17.4474 10.1459 17.4474C8.81957 17.4474 7.51751 17.6437 6.27698 18.0304C6.21655 18.0487 6.15439 18.0581 6.09222 18.0581C5.82059 18.0582 5.58484 17.8851 5.50576 17.6284C5.39898 17.2773 5.61986 16.4984 5.90793 16.4042ZM5.38466 11.9845C6.93474 11.5631 8.53668 11.3494 10.1459 11.3494C13.0389 11.3494 15.9117 12.0494 18.4555 13.3748C18.6338 13.4653 18.7652 13.6187 18.8254 13.8068C18.8865 13.9973 18.8681 14.2021 18.7728 14.3849C18.5458 14.8292 18.2804 15.1277 18.1124 15.1277C17.9932 15.1277 17.8783 15.0991 17.7638 15.0419C15.4016 13.8119 12.8387 13.1882 10.1459 13.1882C8.64803 13.1882 7.17852 13.3852 5.77951 13.7732C5.71444 13.7909 5.64763 13.7998 5.58114 13.7998C5.24459 13.7998 4.94801 13.5725 4.8602 13.2479C4.74775 12.8258 5.00467 12.0878 5.38466 11.9845ZM5.25065 9.09687C5.17959 9.11441 5.10696 9.12323 5.03473 9.12323C4.62799 9.12331 4.27554 8.84845 4.17765 8.4554C4.05498 7.95785 4.36627 7.37988 4.81708 7.26633C6.57033 6.83567 8.36317 6.61731 10.1459 6.61731C13.5968 6.61731 16.9018 7.39318 19.9702 8.92383C20.1833 9.02896 20.3422 9.21041 20.4177 9.43475C20.4932 9.65933 20.4766 9.90106 20.3711 10.1146C20.2274 10.4022 19.9169 10.7119 19.5747 10.7119C19.4428 10.7119 19.3073 10.6809 19.1873 10.6246C16.3687 9.21443 13.3268 8.49938 10.1459 8.49938C8.51127 8.49946 6.86431 8.70043 5.25065 9.09687Z"
                                fill="white" />
                        </svg>
                    </div>
                </div>
            </div>
            <div class="col-6 center-elements bg-black">
                <div class="video-wrapper position-relative">
                    <video id="myVideo" controls="true">
                        <source src="./videos/rupaybachaoVid.mp4" type="video/mp4">
                    </video>
                </div>
            </div>
        </div>
    </div>
    `,
  )
  .join("");

const video = document.getElementById("myVideo");

function playVideo() {
  var pausePlayButton = document.getElementById("playPauseButton");
  if (video.paused) {
    video.play();
    playPauseButton.src = "./images/pause-white.png";
  } else {
    video.pause();
    playPauseButton.src = "./images/play-white.png";
  }
}

function forward() {
  video.currentTime += 5;
}

function backward() {
  video.currentTime -= 5;
}


const carouselElement = document.getElementById('carouselExample');
const carousel = new bootstrap.Carousel(carouselElement, {
  interval: 3000,
  ride: 'carousel'
});

const videos = carouselElement.querySelectorAll('video');

videos.forEach(video => {

  video.addEventListener('play', () => {
    carousel.pause();
  });

  video.addEventListener('pause', () => {
    carousel.cycle();
  });

  video.addEventListener('ended', () => {
    carousel.cycle();
  });

});


let myChart = null;

function calculateLoan() {

  let P = parseFloat(document.getElementById("loanAmount").value);
  let totalMonths = parseInt(document.getElementById("months").value);
  let annualRate = parseFloat(document.getElementById("interest").value);


  let r = annualRate / 12 / 100;
  let EMI;
  let totalInterest;
  let totalPayment;

  if (annualRate === 0) {
    EMI = P / totalMonths;
    totalInterest = 0;
    totalPayment = P;
  } else {
    let power = Math.pow(1 + r, totalMonths);
    EMI = (P * r * power) / (power - 1);
    totalPayment = EMI * totalMonths;
    totalInterest = totalPayment - P;
  }

  document.getElementById("emi").innerHTML =
    "<strong>Monthly EMI:</strong> " + EMI.toFixed(2);

  document.getElementById("totalInterest").innerHTML =
    "<strong>Total Interest:</strong> " + totalInterest.toFixed(2);

  const ctx = document.getElementById("loanChart").getContext("2d");

  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Principal Amount", "Total Interest"],
      datasets: [{
        data: [P, totalInterest],
        backgroundColor: ["#0d6efd", "#6c757d"],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom"
        },
        tooltip: {
          enabled: false
        },
        datalabels: {
          color: "#ffffff",
          font: {
            weight: "bold",
            size: 14
          },
          formatter: function (value) {
            if (totalPayment === 0) return "0%";
            let percentage = ((value / totalPayment) * 100).toFixed(1);
            return percentage + "%";
          }
        }
      }
    },
    plugins: [ChartDataLabels]
  });
}


function resetForm() {
  document.getElementById("loanAmount").value = "";
  document.getElementById("months").value = "";
  document.getElementById("interest").value = "";
  document.getElementById("emi").innerHTML = "";
  document.getElementById("totalInterest").innerHTML = "";

  if (myChart) {
    myChart.destroy();
    myChart = null;
  }
}