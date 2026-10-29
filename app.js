/**
 * ROYAL CUTS — JavaScript Functionality
 */

// Global Variables & Testimonials Data
const testimonials = [
    {
        name: "Tanvir Ahmed",
        role: "Regular Client",
        rating: 5,
        text: "The precision haircut and beard sculpting at Royal Cuts is unmatched in Chattogram. Exceptional attention to detail and atmosphere!"
    },
    {
        name: "Sajid Hasan",
        role: "Business Executive",
        rating: 5,
        text: "Top-class facial treatment and scalp massage. The appointment system is effortless and saves me valuable time during weekends."
    },
    {
        name: "Mahmudul Hoque",
        role: "Software Engineer",
        rating: 5,
        text: "Master Stylist Rahul knows exactly what fade suits my head shape. Pure perfection every single visit!"
    }
];

let currentTestimonial = 0;
let statsAnimated = false;

// DOM Content Loaded Handler
document.addEventListener("DOMContentLoaded", () => {
    // Dynamic copyright year
    document.getElementById("current-year").textContent = new Date().getFullYear();

    // Prevent past dates in appointment booking input
    const dateInput = document.getElementById("cust-date");
    if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.setAttribute("min", today);
    }

    // Initialize Mobile Menu
    const menuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });

    document.querySelectorAll(".mobile-nav-link").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.add("hidden");
        });
    });

    // Gallery Filtering
    setupGalleryFilters();

    // Testimonials Carousel
    renderTestimonial();

    // Scroll Effects: Navbar, Stats Counter, Back to Top, Active Link Highlight
    window.addEventListener("scroll", handleScroll);
});

/* Gallery Filtering Logic */
function setupGalleryFilters() {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => {
                b.classList.remove("bg-amber-500", "text-black");
                b.classList.add("text-gray-300");
            });

            btn.classList.add("bg-amber-500", "text-black");
            btn.classList.remove("text-gray-300");

            const filter = btn.getAttribute("data-filter");

            galleryItems.forEach(item => {
                if (filter === "all" || item.classList.contains(filter)) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });
}

/* Scroll Event Handler */
function handleScroll() {
    const navbar = document.getElementById("navbar");
    const backToTopBtn = document.getElementById("back-to-top");

    // Navbar scroll effect
    if (window.scrollY > 50) {
        navbar.classList.add("shadow-lg", "bg-dark-900");
    } else {
        navbar.classList.remove("shadow-lg");
    }

    // Back-to-top button visibility
    if (window.scrollY > 400) {
        backToTopBtn.classList.remove("hidden");
        backToTopBtn.classList.add("flex");
    } else {
        backToTopBtn.classList.add("hidden");
        backToTopBtn.classList.remove("flex");
    }

    // Trigger Stat Counter Animation when scrolled into view
    const statsSection = document.getElementById("about");
    if (statsSection && !statsAnimated) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.75) {
            animateStats();
            statsAnimated = true;
        }
    }

    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 120) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("text-amber-400");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("text-amber-400");
        }
    });
}

/* Scroll To Top Function */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* Service Pre-selection & Smooth Scroll */
function selectServiceAndScroll(serviceName) {
    const select = document.getElementById("cust-service");
    if (select) {
        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].value.toLowerCase().includes(serviceName.toLowerCase())) {
                select.selectedIndex = i;
                break;
            }
        }
    }
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: "smooth" });
    }
}

/* Lightbox Functions */
function openLightbox(imgSrc, caption) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");

    lightboxImg.src = imgSrc;
    lightboxCaption.textContent = caption;
    lightbox.classList.remove("hidden");
}

function closeLightbox() {
    document.getElementById("lightbox").classList.add("hidden");
}

/* Animated Statistics Counter */
function animateStats() {
    const statNumbers = document.querySelectorAll(".stat-number");
    statNumbers.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const increment = Math.ceil(target / 40);

        const updateCount = () => {
            count += increment;
            if (count < target) {
                counter.innerText = count;
                setTimeout(updateCount, 40);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
}

/* Testimonial Carousel Functions */
function renderTestimonial() {
    const container = document.getElementById("testimonial-container");
    const dotsContainer = document.getElementById("testimonial-dots");
    const item = testimonials[currentTestimonial];

    let stars = "";
    for (let i = 0; i < item.rating; i++) {
        stars += '<i class="fa-solid fa-star text-amber-400 text-sm"></i> ';
    }

    container.innerHTML = `
        <div class="text-center max-w-2xl animate-fade-in">
            <div class="mb-4">${stars}</div>
            <p class="text-lg sm:text-xl text-gray-200 font-serif italic mb-6">"${item.text}"</p>
            <h4 class="text-amber-400 font-bold text-sm uppercase tracking-wider">${item.name}</h4>
            <span class="text-xs text-gray-400">${item.role}</span>
        </div>
    `;

    dotsContainer.innerHTML = testimonials.map((_, idx) => `
        <button onclick="goToTestimonial(${idx})" class="w-2.5 h-2.5 rounded-full ${idx === currentTestimonial ? 'bg-amber-400' : 'bg-dark-600'} transition"></button>
    `).join("");
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    renderTestimonial();
}

function prevTestimonial() {
    currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
    renderTestimonial();
}

function goToTestimonial(idx) {
    currentTestimonial = idx;
    renderTestimonial();
}

/* Booking Form Handlers */
function handleFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById("cust-name").value;
    const phone = document.getElementById("cust-phone").value;
    const service = document.getElementById("cust-service").value;
    const stylist = document.getElementById("cust-stylist").value;
    const date = document.getElementById("cust-date").value;
    const time = document.getElementById("cust-time").value;
    const msg = document.getElementById("cust-message").value || "None";

    const summaryHtml = `
        <p><strong>Client:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Stylist:</strong> ${stylist}</p>
        <p><strong>Date & Time:</strong> ${date} at ${time}</p>
        <p><strong>Notes:</strong> ${msg}</p>
    `;

    document.getElementById("modal-summary").innerHTML = summaryHtml;
    document.getElementById("booking-modal").classList.remove("hidden");
}

function closeBookingModal() {
    document.getElementById("booking-modal").classList.add("hidden");
    document.getElementById("appointment-form").reset();
}

/* WhatsApp Direct Booking Integration */
function bookViaWhatsApp() {
    const name = document.getElementById("cust-name").value || "Valued Client";
    const phone = document.getElementById("cust-phone").value || "N/A";
    const service = document.getElementById("cust-service").value || "Haircut";
    const date = document.getElementById("cust-date").value || "Earliest Slot";
    const time = document.getElementById("cust-time").value || "Flexible";

    const text = `Hello Royal Cuts! I would like to book an appointment:%0A%0A- *Name:* ${encodeURIComponent(name)}%0A- *Phone:* ${encodeURIComponent(phone)}%0A- *Service:* ${encodeURIComponent(service)}%0A- *Preferred Date:* ${encodeURIComponent(date)}%0A- *Preferred Time:* ${encodeURIComponent(time)}`;
    
    window.open(`https://wa.me/8801800000000?text=${text}`, "_blank");
}