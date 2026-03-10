document.addEventListener("DOMContentLoaded", function () {
  console.log("THIS IS THE WIDTH ",window.innerWidth);
    console.log("THIS IS THE CLIENT WIDTH ",document.documentElement.clientWidth);

  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;
      setActiveLink();
    });

  // const carouselElement = document.getElementById("successStoriesCarousel");

  //   const carousel = new bootstrap.Carousel(carouselElement, {
  //       interval: false,
  //       ride: false
  //   });

  //   let autoScroll;

  //   function startCarousel() {
  //       autoScroll = setInterval(() => {
  //           carousel.next();
  //       }, 3000);
  //   }

  //   function stopCarousel() {
  //       clearInterval(autoScroll);
  //   }

  //   startCarousel();

  //   const videos = carouselElement.querySelectorAll("video");

  //   videos.forEach(video => {

  //       video.addEventListener("play", () => {
  //           stopCarousel();   // stop when video plays
  //       });

  //       video.addEventListener("pause", () => {
  //           startCarousel();  // resume when paused
  //       });

  //       video.addEventListener("ended", () => {
  //           startCarousel();  // resume when ended
  //       });

  //   });

  //   carouselElement.addEventListener("slide.bs.carousel", () => {
  //       videos.forEach(video => video.pause());
  //   });

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
    <div class="row g-0 p-3 bg-white h-50 flex-column justify-content-top">
      <p>podcast - ${item.podcastName}</p> 
      <p>podcast - ${item.podccastDescription}</p>
    </div>
  </div>
`,
  )
  .join("");

