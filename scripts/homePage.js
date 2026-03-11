document.addEventListener("DOMContentLoaded", function () {
    console.log("THIS IS THE WIDTH ", window.innerWidth);
    console.log("THIS IS THE CLIENT WIDTH ", document.documentElement.clientWidth);
    console.log("THIS IS THE HEIGHT ", window.innerHeight);
    console.log("THIS IS DOCUMENT HEIGHT ", document.documentElement.scrollHeight);

    // Load navbar with better error handling
    loadNavbar();

    // Run animation observers
    runAnimationObservers();
});

function loadNavbar() {
    const header = document.getElementById("header");
    
    if (!header) {
        // console.error("Header element not found!");
        return;
    }
    fetch("navbar.html")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then((data) => {
            header.innerHTML = data;
            
            // Set active link
            setActiveLink();

        })
        .catch((error) => {
            // console.error("Error loading navbar:", error);
            header.innerHTML = '<nav class="navbar mckNavbar"><div class="container-fluid"><div class="text-danger text-center w-100 p-3">Error loading navigation. Please refresh.</div></div></nav>';
        });
}

// function initializeBootstrapComponents() {
//     // Check if bootstrap is available
//     if (typeof bootstrap === 'undefined') {
//         console.error("Bootstrap not loaded!");
//         return;
//     }

//     // Initialize all dropdowns
//     try {
//         const dropdownElements = document.querySelectorAll('.dropdown-toggle');
//         dropdownElements.forEach(element => {
//             // Check if already initialized
//             if (!element.classList.contains('dropdown-initialized')) {
//                 new bootstrap.Dropdown(element);
//                 element.classList.add('dropdown-initialized');
//             }
//         });
//         console.log(`Initialized ${dropdownElements.length} dropdowns`);
//     } catch (error) {
//         console.error("Error initializing dropdowns:", error);
//     }

//     // Initialize offcanvas if present
//     try {
//         const offcanvasElement = document.getElementById('offcanvasTop');
//         if (offcanvasElement) {
//             const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
            
//             // Add click handlers for offcanvas triggers
//             document.querySelectorAll('[data-bs-toggle="offcanvas"][data-bs-target="#offcanvasTop"]').forEach(trigger => {
//                 trigger.addEventListener('click', (e) => {
//                     e.preventDefault();
//                     offcanvas.show();
//                 });
//             });
//             console.log("Offcanvas initialized");
//         }
//     } catch (error) {
//         console.error("Error initializing offcanvas:", error);
//     }

//     // Initialize collapse toggles
//     try {
//         const collapseElements = document.querySelectorAll('[data-bs-toggle="collapse"]');
//         collapseElements.forEach(element => {
//             if (!element.classList.contains('collapse-initialized')) {
//                 new bootstrap.Collapse(element, { toggle: false });
//                 element.classList.add('collapse-initialized');
//             }
//         });
//     } catch (error) {
//         console.error("Error initializing collapses:", error);
//     }

//     // Initialize any tooltips
//     try {
//         const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
//         if (tooltips.length > 0) {
//             tooltips.forEach(element => new bootstrap.Tooltip(element));
//         }
//     } catch (error) {
//         console.error("Error initializing tooltips:", error);
//     }
// }

function setActiveLink() {
    let currentPage = window.location.pathname.split("/").pop();
    
    if (currentPage === "" || currentPage.endsWith("/")) {
        currentPage = "index.html";
    }

    // console.log("Setting active link for page:", currentPage);

    const links = document.querySelectorAll(".navDropdownText, .nav-link");
    let activeFound = false;

    links.forEach(link => {
        // Remove existing active classes
        link.classList.remove("active");
        if (link.parentElement) {
            link.parentElement.classList.remove("active");
        }

        const href = link.getAttribute("href");
        if (href && (href === currentPage || 
            (currentPage === "index.html" && (href === "/" || href === "")))) {
            link.classList.add("active");
            if (link.parentElement) {
                link.parentElement.classList.add("active");
            }
            activeFound = true;
        }
    });

    // console.log(activeFound ? "Active link set" : "No matching link found");
}

function initializeSuccessStoriesCarousel() {
    const carouselElement = document.getElementById("successStoriesCarousel");
    if (!carouselElement) {
        // console.log("Success stories carousel not found");
        return;
    }

    try {
        // Check if bootstrap is available
        if (typeof bootstrap === 'undefined') {
            // console.error("Bootstrap not available for carousel");
            return;
        }

        const carousel = new bootstrap.Carousel(carouselElement, {
            interval: false,
            ride: false,
            wrap: true
        });

        let autoScroll;
        let isPaused = false;

        function startCarousel() {
            if (isPaused) return;
            if (autoScroll) clearInterval(autoScroll);
            autoScroll = setInterval(() => {
                try {
                    carousel.next();
                } catch (e) {
                    console.error("Carousel next error:", e);
                }
            }, 3000);
            // console.log("Carousel auto-scroll started");
        }

        function stopCarousel() {
            if (autoScroll) {
                clearInterval(autoScroll);
                autoScroll = null;
                // console.log("Carousel auto-scroll stopped");
            }
        }

        // Start carousel initially
        startCarousel();

        const videos = carouselElement.querySelectorAll("video");

        videos.forEach(video => {
            video.addEventListener("play", () => {
                isPaused = true;
                stopCarousel();
            });

            video.addEventListener("pause", () => {
                isPaused = false;
                startCarousel();
            });

            video.addEventListener("ended", () => {
                isPaused = false;
                startCarousel();
            });
        });

        carouselElement.addEventListener("slide.bs.carousel", () => {
            videos.forEach(video => {
                if (!video.paused) {
                    video.pause();
                }
            });
        });

        // Clean up on page unload
        window.addEventListener('beforeunload', () => {
            stopCarousel();
        });

        console.log("Success stories carousel initialized");
    } catch (error) {
        console.error("Error initializing carousel:", error);
    }
}

function runAnimationObservers() {
    // Fade up animation
    const fadeUpElements = document.querySelectorAll(".fade-up");
    if (fadeUpElements.length > 0) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                        // Optional: unobserve after showing
                        // observer.unobserve(entry.target);
                    }
                });
            },
            { 
                threshold: 0.1,
                rootMargin: "50px"
            }
        );
        fadeUpElements.forEach((el) => observer.observe(el));
        console.log(`Observing ${fadeUpElements.length} fade-up elements`);
    }

    // Fade down animation
    const fadeDownElements = document.querySelectorAll(".fade-down");
    if (fadeDownElements.length > 0) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                    }
                });
            },
            { 
                threshold: 0.1,
                rootMargin: "50px"
            }
        );
        fadeDownElements.forEach((el) => observer.observe(el));
        console.log(`Observing ${fadeDownElements.length} fade-down elements`);
    }
}