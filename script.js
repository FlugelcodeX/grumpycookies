/* =========================================================
   GRUMPY COOKIES
   Main JavaScript
   =========================================================
   Handles:
   - Navbar
   - Mobile menu
   - Scroll reveal
   - Cake product modal
   - Smooth scrolling
   - Birthday request form
   - Birthday receipt animation
   - Copy receipt
   - Messenger unlock
   - Image fallbacks
   ========================================================= */

/* =========================================================
   NAVBAR
========================================================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (!navbar) return;

  if (window.scrollY > 40) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* =========================================================
   MOBILE MENU
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const active = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", active ? "true" : "false");
  });
}

/* Close mobile menu after clicking a link */

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (navLinks) {
      navLinks.classList.remove("active");
    }

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

/* =========================================================
   CAKE PRODUCT MODAL
========================================================= */

const foodCards = document.querySelectorAll(".food-card");

const foodModal = document.getElementById("foodModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");

const modalImage = document.getElementById("modalImage");
const modalName = document.getElementById("modalName");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const modalCategory = document.getElementById("modalCategory");

const modalFacebook = document.getElementById("modalFacebook");

/* Open cake modal */

function openFoodModal(card) {
  if (!card || !foodModal) return;

  const name = card.dataset.name || "Birthday Cake";

  const price = card.dataset.price || "";

  const image = card.dataset.image || "";

  const description =
    card.dataset.description ||
    "A freshly prepared cake made especially for your celebration.";

  const category = card.dataset.category || "CAKE";

  if (modalName) {
    modalName.textContent = name;
  }

  if (modalPrice) {
    modalPrice.textContent = price;
  }

  if (modalDescription) {
    modalDescription.textContent = description;
  }

  if (modalCategory) {
    modalCategory.textContent = category;
  }

  if (modalImage && image) {
    modalImage.src = image;
    modalImage.alt = name;
  }

  foodModal.classList.add("active");

  document.body.classList.add("modal-open");
}

/* Close cake modal */

function closeFoodModal() {
  if (!foodModal) return;

  foodModal.classList.remove("active");

  document.body.classList.remove("modal-open");
}

/* Cake card click */

foodCards.forEach((card) => {
  card.addEventListener("click", () => {
    openFoodModal(card);
  });
});

/* Modal close */

if (modalClose) {
  modalClose.addEventListener("click", closeFoodModal);
}

if (modalBackdrop) {
  modalBackdrop.addEventListener("click", closeFoodModal);
}

/* =========================================================
   MODAL → BIRTHDAY REQUEST
========================================================= */

if (modalFacebook) {
  modalFacebook.addEventListener("click", (event) => {
    event.preventDefault();

    closeFoodModal();

    const birthdaySection = document.getElementById("birthday");

    if (!birthdaySection) return;

    setTimeout(() => {
      const navbarHeight = navbar ? navbar.offsetHeight : 0;

      const targetPosition =
        birthdaySection.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }, 100);
  });
}

/* =========================================================
   SMOOTH ANCHOR SCROLLING
========================================================= */

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");

    if (!targetId || targetId === "#") {
      return;
    }

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    const navbarHeight = navbar ? navbar.offsetHeight : 0;

    const targetPosition =
      target.getBoundingClientRect().top + window.scrollY - navbarHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  });
});

/* =========================================================
   FACEBOOK BUTTON ANIMATION
========================================================= */

const facebookButtons = document.querySelectorAll(".facebook-btn");

facebookButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.classList.add("facebook-clicked");

    setTimeout(() => {
      button.classList.remove("facebook-clicked");
    }, 300);
  });
});

/* =========================================================
   BIRTHDAY RECEIPT
========================================================= */

const birthdayForm = document.getElementById("birthdayForm");

const receiptModal = document.getElementById("receiptModal");

const receiptBackdrop = document.getElementById("receiptBackdrop");

const receiptClose = document.getElementById("receiptClose");

const receiptDetails = document.getElementById("receiptDetails");

const receiptId = document.getElementById("receiptId");

const copyReceiptButton = document.getElementById("copyReceipt");

const messengerReceipt = document.getElementById("messengerReceipt");

const receiptStatus = document.getElementById("receiptStatus");

let currentReceiptText = "";

let receiptCopied = false;

/* =========================================================
   CREATE REQUEST ID
========================================================= */

function createRequestId() {
  const now = new Date();

  const year = now.getFullYear();

  const month = String(now.getMonth() + 1).padStart(2, "0");

  const day = String(now.getDate()).padStart(2, "0");

  const random = Math.floor(1000 + Math.random() * 9000);

  return `GC-${year}${month}${day}-${random}`;
}

/* =========================================================
   FORMAT DATE
========================================================= */

function formatBirthdayDate(value) {
  if (!value) {
    return "Not specified";
  }

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-PH", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/* =========================================================
   ESCAPE USER INPUT
========================================================= */

function escapeHTML(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* =========================================================
   BUILD RECEIPT TEXT
========================================================= */

function buildReceiptText(data) {
  return [
    "🍰 GRUMPY COOKIES",
    "BIRTHDAY CAKE REQUEST",
    "",
    `Request ID: ${data.id}`,
    "",
    `Customer: ${data.customerName}`,
    `Birthday Celebrant: ${data.celebrantName}`,
    `Birthday Date: ${formatBirthdayDate(data.birthdayDate)}`,
    `Cake Quantity: ${data.quantity}`,
    `Cake Flavor: ${data.cakeFlavor}`,
    `Preferred Contact: ${data.contactInfo}`,
    `Birthday Theme / Color: ${data.theme || "Not specified"}`,
    `Special Note: ${data.specialNote || "None"}`,
    "",
    "Please confirm availability, design, and final pricing for this birthday cake request.",
  ].join("\n");
}

/* =========================================================
   RENDER RECEIPT
========================================================= */

function renderReceipt(data) {
  if (!receiptDetails) return;

  receiptDetails.innerHTML = `

    <div class="receipt-row">
      <span>CUSTOMER</span>
      <strong>
        ${escapeHTML(data.customerName)}
      </strong>
    </div>

    <div class="receipt-row">
      <span>BIRTHDAY CELEBRANT</span>
      <strong>
        ${escapeHTML(data.celebrantName)}
      </strong>
    </div>

    <div class="receipt-row">
      <span>BIRTHDAY DATE</span>
      <strong>
        ${escapeHTML(formatBirthdayDate(data.birthdayDate))}
      </strong>
    </div>

    <div class="receipt-row">
      <span>CAKE QUANTITY</span>
      <strong>
        ${escapeHTML(data.quantity)}
      </strong>
    </div>

    <div class="receipt-row">
      <span>CAKE FLAVOR</span>
      <strong>
        ${escapeHTML(data.cakeFlavor)}
      </strong>
    </div>

    <div class="receipt-row">
      <span>CONTACT</span>
      <strong>
        ${escapeHTML(data.contactInfo)}
      </strong>
    </div>

    <div class="receipt-row">
      <span>THEME / COLOR</span>
      <strong>
        ${escapeHTML(data.theme || "Not specified")}
      </strong>
    </div>

    <div class="receipt-row receipt-row-note">
      <span>SPECIAL NOTE</span>
      <strong>
        ${escapeHTML(data.specialNote || "None")}
      </strong>
    </div>

  `;
}

/* =========================================================
   OPEN RECEIPT
========================================================= */

function openReceipt() {
  if (!receiptModal) return;

  receiptModal.classList.add("active");

  receiptModal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");

  receiptCopied = false;

  /* Reset COPY button */

  if (copyReceiptButton) {
    copyReceiptButton.innerHTML = "COPY RECEIPT <span>⧉</span>";

    copyReceiptButton.classList.remove("copied");
  }

  /* Lock Messenger */

  if (messengerReceipt) {
    messengerReceipt.classList.remove("unlocked");

    messengerReceipt.setAttribute("aria-disabled", "true");

    messengerReceipt.textContent = "COPY RECEIPT TO UNLOCK MESSENGER";

    const arrow = document.createElement("span");

    arrow.textContent = "↗";

    messengerReceipt.appendChild(arrow);
  }

  if (receiptStatus) {
    receiptStatus.textContent =
      "Please copy this receipt before opening Messenger.";
  }

  /* Small delay so the animation
     starts after the modal appears */

  requestAnimationFrame(() => {
    receiptModal.classList.add("receipt-animate");
  });
}

/* =========================================================
   CLOSE RECEIPT
========================================================= */

function closeReceipt() {
  if (!receiptModal) return;

  receiptModal.classList.remove("active", "receipt-animate");

  receiptModal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");
}

/* =========================================================
   BIRTHDAY FORM SUBMISSION
========================================================= */

if (birthdayForm) {
  birthdayForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const customerName =
      document.getElementById("customerName")?.value.trim() || "";

    const celebrantName =
      document.getElementById("celebrantName")?.value.trim() || "";

    const birthdayDate = document.getElementById("birthdayDate")?.value || "";

    const quantity = document.getElementById("quantity")?.value || "1";

    /*
     * Supports the new cakeFlavor
     * field and also falls back to
     * the old cookieFlavor ID.
     */

    const cakeFlavorElement =
      document.getElementById("cakeFlavor") ||
      document.getElementById("cookieFlavor");

    const cakeFlavor = cakeFlavorElement?.value || "Not specified";

    const contactInfo =
      document.getElementById("contactInfo")?.value.trim() || "";

    const theme = document.getElementById("theme")?.value.trim() || "";

    const specialNote =
      document.getElementById("specialNote")?.value.trim() || "";

    const data = {
      id: createRequestId(),

      customerName,

      celebrantName,

      birthdayDate,

      quantity,

      cakeFlavor,

      contactInfo,

      theme,

      specialNote,
    };

    /* Create text version */

    currentReceiptText = buildReceiptText(data);

    /* Show request ID */

    if (receiptId) {
      receiptId.textContent = `REQUEST #${data.id}`;
    }

    /* Render receipt */

    renderReceipt(data);

    /* Show receipt */

    openReceipt();
  });
}

/* =========================================================
   COPY RECEIPT
========================================================= */

async function copyReceipt() {
  if (!currentReceiptText) {
    return;
  }

  let copied = false;

  /* Modern Clipboard API */

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(currentReceiptText);

      copied = true;
    }
  } catch (error) {
    copied = false;
  }

  /* Fallback */

  if (!copied) {
    try {
      const textarea = document.createElement("textarea");

      textarea.value = currentReceiptText;

      textarea.style.position = "fixed";

      textarea.style.left = "-9999px";

      textarea.style.top = "0";

      textarea.style.opacity = "0";

      document.body.appendChild(textarea);

      textarea.focus();

      textarea.select();

      textarea.setSelectionRange(0, textarea.value.length);

      copied = document.execCommand("copy");

      textarea.remove();
    } catch (error) {
      copied = false;
    }
  }

  /* If copying failed */

  if (!copied) {
    if (receiptStatus) {
      receiptStatus.textContent =
        "Copy was blocked by your browser. Please select the receipt text manually.";
    }

    return;
  }

  /* =================================
     COPY SUCCESS
  ================================= */

  receiptCopied = true;

  if (copyReceiptButton) {
    copyReceiptButton.innerHTML = "COPIED ✓ <span>✦</span>";

    copyReceiptButton.classList.add("copied");
  }

  /* =================================
     UNLOCK MESSENGER
  ================================= */

  if (messengerReceipt) {
    messengerReceipt.classList.add("unlocked");

    messengerReceipt.setAttribute("aria-disabled", "false");

    messengerReceipt.textContent = "OPEN MESSENGER";

    const arrow = document.createElement("span");

    arrow.textContent = "↗";

    messengerReceipt.appendChild(arrow);
  }

  if (receiptStatus) {
    receiptStatus.textContent =
      "Receipt copied! Open Messenger and send it to Grumpy Cookies.";
  }
}

/* Copy button */

if (copyReceiptButton) {
  copyReceiptButton.addEventListener("click", copyReceipt);
}

/* =========================================================
   MESSENGER
========================================================= */

if (messengerReceipt) {
  messengerReceipt.addEventListener("click", (event) => {
    /*
     * Do not allow Messenger
     * before the receipt is copied.
     */

    if (!receiptCopied) {
      event.preventDefault();

      if (receiptStatus) {
        receiptStatus.textContent = "Please copy the receipt first.";
      }

      if (copyReceiptButton) {
        copyReceiptButton.focus();
      }

      return;
    }

    /*
     * If it is a normal anchor,
     * allow the href to work.
     */

    messengerReceipt.classList.add("messenger-opening");
  });
}

/* =========================================================
   RECEIPT CLOSE
========================================================= */

if (receiptClose) {
  receiptClose.addEventListener("click", closeReceipt);
}

if (receiptBackdrop) {
  receiptBackdrop.addEventListener("click", closeReceipt);
}

/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  closeFoodModal();

  closeReceipt();
});

/* =========================================================
   IMAGE ERROR HANDLING
========================================================= */

document.querySelectorAll("img").forEach((image) => {
  image.addEventListener("error", () => {
    image.classList.add("image-error");
  });
});

/* =========================================================
   PREVENT BODY SCROLL WHEN MODAL IS OPEN
========================================================= */

function updateModalState() {
  const foodIsOpen = foodModal?.classList.contains("active");

  const receiptIsOpen = receiptModal?.classList.contains("active");

  if (foodIsOpen || receiptIsOpen) {
    document.body.classList.add("modal-open");
  } else {
    document.body.classList.remove("modal-open");
  }
}

/* =========================================================
   PAGE READY
========================================================= */

document.body.classList.add("page-loaded");

/* Small initial state check */

setTimeout(() => {
  updateModalState();
}, 100);
