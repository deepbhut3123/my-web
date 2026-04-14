document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".split-fade");
  const revealElements = document.querySelectorAll(".reveal-up");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent.trim();

        el.innerHTML = "";

        // Split into words and keep exactly one space between words
        const words = text.split(/\s+/).filter(Boolean);
        words.forEach((word, wordIndex) => {
          const wordWrap = document.createElement("span");
          wordWrap.classList.add("split-word");

          // Split word into letters
          word.split("").forEach((letter, letterIndex) => {
            const span = document.createElement("span");
            span.textContent = letter;
            span.classList.add("split-letter");

            wordWrap.appendChild(span);

            // Animate with delay
            setTimeout(() => {
              span.classList.add("show");
            }, (wordIndex * 200) + (letterIndex * 40));
          });

          el.appendChild(wordWrap);

          if (wordIndex < words.length - 1) {
            el.appendChild(document.createTextNode(" "));
          }
        });
      }
    });
  }, { threshold: 0.4 });

  elements.forEach((el) => observer.observe(el));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });

  revealElements.forEach((el) => revealObserver.observe(el));
});

// header sidebar toggle(open, close)
const toggleIcon = document.querySelector(".toggle-icon");
const sidebar = document.querySelector(".side-bar");
const openIcon = document.querySelector(".toggle-icon .open");
const closeIcon = document.querySelector(".toggle-icon .close");

if (toggleIcon && sidebar && openIcon && closeIcon) {
  toggleIcon.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    openIcon.classList.toggle("active");
    closeIcon.classList.toggle("active");
  });
}

// banner slider
if (typeof Swiper !== "undefined") {
  document.querySelectorAll(".bannerSwiper").forEach((swiperEl) => {
    new Swiper(swiperEl, {
      slidesPerView: 1,
      loop: true, // autoplay works best with loop
      autoplay: {
        delay: 3000, // 3 seconds
        disableOnInteraction: false, // keep autoplay after click/drag
        pauseOnMouseEnter: true, // optional but nice UX
      },
      navigation: {
        nextEl: swiperEl.querySelector(".swiper-button-next"),
        prevEl: swiperEl.querySelector(".swiper-button-prev"),
      },
      pagination: false,
    });
  });
}

// underline current page in desktop + mobile header navigation
const currentPage = window.location.pathname.split("/").pop() || "index.html";
document.querySelectorAll("header a[href]").forEach((link) => {
  const href = link.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return;
  }
  const linkPage = href.split("/").pop() || "index.html";
  if (linkPage === currentPage) {
    link.classList.add("current-page");
    link.setAttribute("aria-current", "page");
  }
});

// shrink sticky header only after page starts scrolling
const siteHeader = document.querySelector("header");
if (siteHeader) {
  const handleHeaderScroll = () => {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 10);
  };
  handleHeaderScroll();
  window.addEventListener("scroll", handleHeaderScroll, { passive: true });
}

function changeImage(src) {
  document.getElementById("mainImage").src = src;
  openPopup(src);
}

function openPopup(src) {
  document.getElementById("popupImage").src = src;
  document.getElementById("imagePopup").style.display = "flex";
}

function closePopup(e) {
  if (!e || e.target.id === "imagePopup") {
    document.getElementById("imagePopup").style.display = "none";
  }
}

if (typeof AOS !== "undefined") {
  AOS.init();
}
