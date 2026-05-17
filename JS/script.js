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

// ─── Auto-select product dropdown from URL param ───────────────────
// When user clicks "Enquire Now" on product page, the link includes
// ?product=12mm (etc). This reads that param on contact.html and
// auto-selects the matching <option> in the requirement dropdown.
(function autoSelectProduct() {
  var params = new URLSearchParams(window.location.search);
  var product = params.get("product");
  if (!product) return;

  var dropdown = document.getElementById("requirement");
  if (!dropdown) return;

  // Try to match the value (e.g. "12mm")
  for (var i = 0; i < dropdown.options.length; i++) {
    if (dropdown.options[i].value === product) {
      dropdown.selectedIndex = i;
      break;
    }
  }

  // Scroll the form into view smoothly
  var formPanel = document.querySelector(".contact-form-panel");
  if (formPanel) {
    setTimeout(function () {
      formPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 400);
  }
})();

// ─── Contact Form → Web3Forms ──────────────────────────────────────
// HOW TO SET UP (takes 1 minute):
// 1. Go to https://web3forms.com
// 2. Enter your email: amee.extrusion@gmail.com
// 3. Check your inbox for the Access Key
// 4. Paste the key below ↓
// ─────────────────────────────────────────────────────────────────────

const WEB3FORMS_ACCESS_KEY = "5467d4f1-9a09-42f5-bbc7-7cd7e0d40cbe"; // ← paste your key here

(function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return; // only runs on contact.html

  // Toast helper
  function showToast(message, type) {
    const toast = document.getElementById("formToast");
    if (!toast) return;
    toast.textContent = message;
    toast.className = "form-toast " + type + " show";
    setTimeout(() => {
      toast.classList.remove("show");
    }, 5000);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Gather values
    const fullName = document.getElementById("fullName").value.trim();
    const companyName = document.getElementById("companyName").value.trim();
    const email = document.getElementById("emailAddress").value.trim();
    const phone = document.getElementById("phoneNumber").value.trim();
    const requirement = document.getElementById("requirement").value;
    const message = document.getElementById("messageText").value.trim();

    // Basic validation
    if (!fullName || !email || !message) {
      showToast("Please fill in your name, email, and project details.", "error");
      return;
    }

    // Check if key is configured
    if (WEB3FORMS_ACCESS_KEY === "YOUR_ACCESS_KEY_HERE") {
      showToast("Email service is not configured yet. Please contact us directly at amee.extrusion@gmail.com", "error");
      return;
    }

    // Disable button while sending
    const btn = document.getElementById("submitBtn");
    const originalText = btn.textContent;
    btn.disabled = true;
    btn.textContent = "Sending...";

    // Build form data
    const formData = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: "New Inquiry from " + fullName + " — Amee Extrusion Website",
      from_name: "Amee Extrusion Website",
      name: fullName,
      company: companyName || "N/A",
      email: email,
      phone: phone || "N/A",
      requirement: requirement || "Not specified",
      message: message
    };

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          showToast("Thank you! Your inquiry has been sent successfully. We'll respond within 24 hours.", "success");
          form.reset();
        } else {
          showToast("Something went wrong. Please try again or email us directly at amee.extrusion@gmail.com", "error");
        }
      })
      .catch(function (err) {
        console.error("Web3Forms error:", err);
        showToast("Something went wrong. Please try again or email us directly at amee.extrusion@gmail.com", "error");
      })
      .finally(function () {
        btn.disabled = false;
        btn.textContent = originalText;
      });
  });
})();
