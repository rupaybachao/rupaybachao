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

    // Load navbar with better error handling
    loadNavbar();

    // Initialize carousel after a short delay to ensure DOM is ready
    setTimeout(() => {
        initializeSuccessStoriesCarousel();
    }, 500);
    
    // Initialize audio carousel
    initializeAudioCarousel();
    
    // Run animation observers
    runAnimationObservers();
});

function loadNavbar() {
    const header = document.getElementById("header");
    
    if (!header) {
        console.error("Header element not found!");
        return;
    }

    // Show loading state
    header.innerHTML = '<nav class="navbar mckNavbar"><div class="container-fluid"><div class="text-center w-100 p-3">Loading navigation...</div></div></nav>';

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
            
            // Initialize Bootstrap components
            initializeBootstrapComponents();
            
            // Recalculate layout
            setTimeout(() => {
                window.dispatchEvent(new Event("resize"));
                
                // Force repaint for Safari
                document.body.style.display = 'none';
                document.body.offsetHeight; // Force reflow
                document.body.style.display = '';
                
                console.log("Navbar loaded and initialized");
            }, 100);
        })
        .catch((error) => {
            console.error("Error loading navbar:", error);
            header.innerHTML = '<nav class="navbar mckNavbar"><div class="container-fluid"><div class="text-danger text-center w-100 p-3">Error loading navigation. Please refresh.</div></div></nav>';
        });
}

function initializeBootstrapComponents() {
    // Check if bootstrap is available
    if (typeof bootstrap === 'undefined') {
        console.error("Bootstrap not loaded!");
        return;
    }

    // Initialize all dropdowns
    try {
        const dropdownElements = document.querySelectorAll('.dropdown-toggle');
        dropdownElements.forEach(element => {
            // Check if already initialized
            if (!element.classList.contains('dropdown-initialized')) {
                new bootstrap.Dropdown(element);
                element.classList.add('dropdown-initialized');
            }
        });
        console.log(`Initialized ${dropdownElements.length} dropdowns`);
    } catch (error) {
        console.error("Error initializing dropdowns:", error);
    }

    // Initialize offcanvas if present
    try {
        const offcanvasElement = document.getElementById('offcanvasTop');
        if (offcanvasElement) {
            const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
            
            // Add click handlers for offcanvas triggers
            document.querySelectorAll('[data-bs-toggle="offcanvas"][data-bs-target="#offcanvasTop"]').forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    offcanvas.show();
                });
            });
            console.log("Offcanvas initialized");
        }
    } catch (error) {
        console.error("Error initializing offcanvas:", error);
    }

    // Initialize collapse toggles
    try {
        const collapseElements = document.querySelectorAll('[data-bs-toggle="collapse"]');
        collapseElements.forEach(element => {
            if (!element.classList.contains('collapse-initialized')) {
                new bootstrap.Collapse(element, { toggle: false });
                element.classList.add('collapse-initialized');
            }
        });
    } catch (error) {
        console.error("Error initializing collapses:", error);
    }

    // Initialize any tooltips
    try {
        const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        if (tooltips.length > 0) {
            tooltips.forEach(element => new bootstrap.Tooltip(element));
        }
    } catch (error) {
        console.error("Error initializing tooltips:", error);
    }
}

function setActiveLink() {
    let currentPage = window.location.pathname.split("/").pop();
    
    if (currentPage === "" || currentPage.endsWith("/")) {
        currentPage = "index.html";
    }

    console.log("Setting active link for page:", currentPage);

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

    console.log(activeFound ? "Active link set" : "No matching link found");
}

function initializeSuccessStoriesCarousel() {
    const carouselElement = document.getElementById("successStoriesCarousel");
    if (!carouselElement) {
        console.log("Success stories carousel not found");
        return;
    }

    try {
        // Check if bootstrap is available
        if (typeof bootstrap === 'undefined') {
            console.error("Bootstrap not available for carousel");
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
            console.log("Carousel auto-scroll started");
        }

        function stopCarousel() {
            if (autoScroll) {
                clearInterval(autoScroll);
                autoScroll = null;
                console.log("Carousel auto-scroll stopped");
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

function initializeAudioCarousel() {
    const carouselInner = document.getElementById("audioCarouselInner");
    if (!carouselInner) {
        console.log("Audio carousel inner not found");
        return;
    }

    const audioData = [
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

    carouselInner.innerHTML = audioData
        .map((item, index) => `
            <div class="h-100 carousel-item ${index === 0 ? "active" : ""}">
                <div class="row g-0 p-3 bg-white" style="height: 50%;">
                    <div class="video-wrapper position-relative w-100 h-100">
                        <img src="${item.image}" class="w-100 h-100" style="object-fit: cover;" alt="${item.name}">
                        <div class="position-absolute bottom-0 start-0 p-3 w-100 bg-dark bg-opacity-50">
                            
                        </div>
                    </div>
                </div>
                <div class="row g-0 p-3 bg-white flex-column justify-content-center" style="height: 50%;">
                    <h5 class="mb-2 fw-bold">${item.name}</h5>
                    <p class="text-muted">${item.description}</p>
                </div>
            </div>
        `).join('');

    // Initialize the audio carousel
    const audioCarousel = document.getElementById("audioCarousel");
    if (audioCarousel && typeof bootstrap !== 'undefined') {
        try {
            new bootstrap.Carousel(audioCarousel, {
                interval: false,
                ride: false,
                wrap: true
            });
            console.log("Audio carousel initialized");
        } catch (error) {
            console.error("Error initializing audio carousel:", error);
        }
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

// Handle window resize events efficiently
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        console.log("Window resized:", window.innerWidth, "x", window.innerHeight);
        
        // Force recalculation of any dynamic heights
        document.querySelectorAll('[class*="h-"]').forEach(el => {
            if (el.offsetHeight === 0) {
                el.style.height = 'auto';
            }
        });
        
        // Redispatch for any dependent components
        window.dispatchEvent(new Event('resize-end'));
    }, 150);
});

// Export for debugging
window.debug = {
    reloadNavbar: loadNavbar,
    initBootstrap: initializeBootstrapComponents,
    setActiveLink: setActiveLink,
    // fixSafariHeight: fixSafariHeight
};

// Also run after navbar loads (in case DOMContentLoaded already fired)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        // Already handled above
    });
} else {
    // DOM is already loaded, run initialization
    console.log("DOM already loaded, initializing...");
    setTimeout(() => {
        loadNavbar();
        initializeSuccessStoriesCarousel();
        initializeAudioCarousel();
        runAnimationObservers();
    }, 100);
}