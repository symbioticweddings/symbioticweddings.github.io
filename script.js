/* SYMBIOTIC PHOTOGRAPHY — LIGHTBOX */

document.addEventListener("DOMContentLoaded", () => {
	const gallery = document.querySelector(".wedding-gallery");

	if (!gallery) return;

	const images = [...gallery.querySelectorAll("img")];
	if (!images.length) return;

	let currentIndex = 0;

	const lightbox = document.createElement("div");
	lightbox.className = "symbiotic-lightbox";

	lightbox.innerHTML = `
		<button class="lightbox-close" aria-label="Close">×</button>
		<span class="lightbox-counter"></span>
		<button class="lightbox-prev" aria-label="Previous">‹</button>
		<img class="lightbox-image" alt="Wedding photograph">
		<button class="lightbox-next" aria-label="Next">›</button>
	`;

	document.body.appendChild(lightbox);

	const fullImage = lightbox.querySelector(".lightbox-image");
	const counter = lightbox.querySelector(".lightbox-counter");

	function showImage(index) {
		currentIndex = (index + images.length) % images.length;
		fullImage.src = images[currentIndex].src;
		fullImage.alt = images[currentIndex].alt;
		counter.textContent = `${currentIndex + 1} / ${images.length}`;
	}

	function openLightbox(index) {
		showImage(index);
		lightbox.classList.add("active");
		document.body.style.overflow = "hidden";
	}

	function closeLightbox() {
		lightbox.classList.remove("active");
		document.body.style.overflow = "";
	}

	images.forEach((img, index) => {
		img.addEventListener("click", () => openLightbox(index));
	});

	lightbox.querySelector(".lightbox-close").onclick = closeLightbox;
	lightbox.querySelector(".lightbox-prev").onclick = () => showImage(currentIndex - 1);
	lightbox.querySelector(".lightbox-next").onclick = () => showImage(currentIndex + 1);

	lightbox.addEventListener("click", (event) => {
		if (event.target === lightbox) closeLightbox();
	});

	document.addEventListener("keydown", (event) => {
		if (!lightbox.classList.contains("active")) return;

		if (event.key === "Escape") closeLightbox();
		if (event.key === "ArrowRight") showImage(currentIndex + 1);
		if (event.key === "ArrowLeft") showImage(currentIndex - 1);
	});
});

/* STEP 10 — SCROLL REVEAL */

document.addEventListener("DOMContentLoaded", () => {

  const elements = document.querySelectorAll(
    ".portfolio-card, .wedding-gallery img"
  );

  if (window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches) return;

  if (!("IntersectionObserver" in window)) return;

  elements.forEach((element) => {
    element.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });

});

/* STEP 11 — MOBILE NAVIGATION */

document.addEventListener("DOMContentLoaded", () => {

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#main-nav");

  if (!menuToggle || !nav) return;

  function closeMenu() {
    nav.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

});

/* STEP 12 — WHATSAPP BOOKING */

document.addEventListener("DOMContentLoaded", () => {

  const whatsappButton =
    document.querySelector("#whatsapp-booking");

  if (!whatsappButton) return;

  // Replace with your business WhatsApp number.
  // Format: 60123456789 (without +, spaces or dashes).
  const phoneNumber = "60198697789";

  const message =
    "Hi Symbiotic Photography! I'm interested " +
    "in your wedding photography / videography " +
    "services. May I know more about your packages?";

  if (!phoneNumber) {
    whatsappButton.addEventListener("click", (event) => {
      event.preventDefault();
      alert("WhatsApp booking number has not been configured yet.");
    });
    return;
  }

  const whatsappURL =
    "https://wa.me/" +
    phoneNumber +
    "?text=" +
    encodeURIComponent(message);

  whatsappButton.href = whatsappURL;
  whatsappButton.target = "_blank";
  whatsappButton.rel = "noopener noreferrer";

});
