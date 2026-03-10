document.addEventListener("DOMContentLoaded", function () {
    console.log("THIS IS THE WIDTH ", window.innerWidth);
    console.log("THIS IS THE CLIENT WIDTH ", document.documentElement.clientWidth);
    console.log("THIS IS THE HEIGHT ", window.innerHeight);
    console.log("THIS IS DOCUMENT HEIGHT ", document.documentElement.scrollHeight);
    
    // Check all containers that might affect height
    const containers = document.querySelectorAll('.container-fluid, .row, [class*="col-"]');
    containers.forEach((el, index) => {
        console.log(`Element ${index}:`, el.className, 'Height:', el.offsetHeight);
    });
    // Safari height fix
    function fixSafariHeight() {
        // Force recalculation of heights
        document.documentElement.style.height = window.innerHeight + 'px';
        document.body.style.height = window.innerHeight + 'px';
        
        setTimeout(function() {
            document.documentElement.style.height = '';
            document.body.style.height = '';
        }, 100);
    }

    // Call on load and resize
    fixSafariHeight();
    window.addEventListener('resize', fixSafariHeight);

    fetch("navbar.html")
        .then((response) => response.text())
        .then((data) => {
            const header = document.getElementById("header");

            if (header) {
                header.innerHTML = data;
                setActiveLink();

                // Recalculate layout
                window.dispatchEvent(new Event("resize"));
                // Safari specific: force repaint
                setTimeout(() => {
                    window.dispatchEvent(new Event("resize"));
                }, 200);
            }
        });

    // Rest of your carousel code...
    const carouselElement = document.getElementById("successStoriesCarousel");
    if (carouselElement) {
        const carousel = new bootstrap.Carousel(carouselElement, {
            interval: false,
            ride: false
        });

        let autoScroll;

        function startCarousel() {
            autoScroll = setInterval(() => {
                carousel.next();
            }, 3000);
        }

        function stopCarousel() {
            clearInterval(autoScroll);
        }

        startCarousel();

        const videos = carouselElement.querySelectorAll("video");

        videos.forEach(video => {
            video.addEventListener("play", () => {
                stopCarousel();
            });

            video.addEventListener("pause", () => {
                startCarousel();
            });

            video.addEventListener("ended", () => {
                startCarousel();
            });
        });

        carouselElement.addEventListener("slide.bs.carousel", () => {
            videos.forEach(video => video.pause());
        });
    }
});

// Your existing functions remain the same...
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

// ANIMATION OBSERVERS
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

// Audio carousel data
const data = [
    {
        image: "./images/homepageBgimage1.jpg",
        podccastDescription: " my description ",
        audio: "./audios/audio",
        podcastName: "mypodcast"
    },
    {
        image: "./images/homepageBgimage2.jpg",
        podccastDescription: " my description ",
        audio: "./audios/audio",
        podcastName: "mypodcast"
    },
    {
        image: "./images/homepageBgimage3.jpg",
        podccastDescription: " my description ",
        audio: "./audios/audio",
        podcastName: "mypodcast"
    },
    {
        image: "./images/homepageBgimage4.jpg",
        podccastDescription: " my description ",
        audio: "./audios/audio",
        podcastName: "mypodcast"
    },
];

const carouselInner = document.getElementById("audioCarouselInner");
if (carouselInner) {
    carouselInner.innerHTML = data
        .map(
            (item, index) => `
            <div class="h-100 carousel-item ${index === 0 ? "active" : ""}">
                <div class="row g-0 p-3 bg-white h-50">
                    <div class="video-wrapper position-relative w-100">
                        <video controls="true" class="w-100" style="height: 100%; object-fit: cover;">
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
        .join('');
}