/**
 * LUXE HAIR STUDIO - MAIN JAVASCRIPT
 * Static website interactions, navigation, booking modal, validation, and animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     WHATSAPP CONFIGURATION
     Salon WhatsApp phone number without the '+' character
     ========================================================================== */
  const salonWhatsAppNumber = "385911234567";

  /* ==========================================================================
     1. SELECTORS & CACHED DOM ELEMENTS
     ========================================================================== */
  const header = document.getElementById('header');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavBackdrop = document.getElementById('mobile-nav-backdrop');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const desktopNavLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('back-to-top');

  // Booking Modal Elements
  const bookingModalBackdrop = document.getElementById('booking-modal-backdrop');
  const closeBookingModalBtn = document.getElementById('close-booking-modal');
  const openBookingModalBtns = document.querySelectorAll('.open-booking-modal');
  const bookingForm = document.getElementById('booking-form');
  const bookingSuccess = document.getElementById('booking-success');
  const submitBookingBtn = document.getElementById('submit-booking-btn');
  const bookAnotherBtn = document.getElementById('book-another-btn');
  const successCloseBtn = document.getElementById('success-close-btn');
  const reopenWhatsAppLink = document.getElementById('reopen-whatsapp-link');

  // Booking Form Inputs
  const inputName = document.getElementById('booking-name');
  const inputEmail = document.getElementById('booking-email');
  const inputPhone = document.getElementById('booking-phone');
  const selectService = document.getElementById('booking-service');
  const inputDate = document.getElementById('booking-date');
  const selectTime = document.getElementById('booking-time');
  const inputMessage = document.getElementById('booking-message');

  // Booking Summary Display Elements
  const summaryName = document.getElementById('summary-name');
  const summaryPhone = document.getElementById('summary-phone');
  const summaryEmail = document.getElementById('summary-email');
  const summaryService = document.getElementById('summary-service');
  const summaryDateTime = document.getElementById('summary-datetime');
  const summaryMessage = document.getElementById('summary-message');
  const summaryRefId = document.getElementById('summary-ref-id');

  // Lightbox Elements
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxBackdrop = document.getElementById('gallery-lightbox-backdrop');
  const closeLightboxBtn = document.getElementById('close-lightbox-btn');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCategory = document.getElementById('lightbox-category');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxBookBtn = document.getElementById('lightbox-book-btn');

  // Privacy Modal Elements
  const privacyModalBackdrop = document.getElementById('privacy-modal-backdrop');
  const openPrivacyModalBtn = document.getElementById('open-privacy-modal');
  const closePrivacyModalBtn = document.getElementById('close-privacy-modal');
  const privacyAgreeBtn = document.getElementById('privacy-agree-btn');

  // Directions & Map Elements
  const getDirectionsBtn = document.getElementById('get-directions-btn');
  const mapOpenBtn = document.getElementById('map-open-btn');

  // Toast Notification
  const toast = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer = null;

  /* ==========================================================================
     2. STICKY NAVIGATION & SCROLL LISTENER
     ========================================================================== */
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Sticky header styling
    if (currentScrollY > 24) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Trigger initial check on load

  /* ==========================================================================
     3. MOBILE HAMBURGER MENU
     ========================================================================== */
  const openMobileMenu = () => {
    hamburgerBtn.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('open');
    mobileNavBackdrop.classList.add('open');
    document.body.classList.add('no-scroll');
  };

  const closeMobileMenu = () => {
    hamburgerBtn.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
    mobileNavBackdrop.classList.remove('open');
    document.body.classList.remove('no-scroll');
  };

  hamburgerBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMobileMenu);
  }

  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener('click', closeMobileMenu);
  }

  // Close mobile nav when clicking any link inside it
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  /* ==========================================================================
     4. ACTIVE NAVIGATION LINK ON SCROLL (INTERSECTION OBSERVER)
     ========================================================================== */
  const updateActiveNavLink = (activeId) => {
    // Desktop links
    desktopNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Mobile links
    mobileNavLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  if ('IntersectionObserver' in window) {
    const sectionObserverOptions = {
      root: null,
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            updateActiveNavLink(id);
          }
        }
      });
    }, sectionObserverOptions);

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }

  /* ==========================================================================
     5. SMOOTH SCROLLING FOR ALL INTERNAL LINKS
     ========================================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = header.offsetHeight || 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight + 5;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Back to Top button
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     6. BOOKING MODAL LOGIC & PRE-SELECTION
     ========================================================================== */
  // Configure min date to today's date
  const setMinDateToToday = () => {
    if (inputDate) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      inputDate.min = `${yyyy}-${mm}-${dd}`;
    }
  };
  setMinDateToToday();

  const openBookingModal = (preselectedService = null) => {
    // If a service name was passed from a card or button, preselect it
    if (preselectedService && selectService) {
      for (let i = 0; i < selectService.options.length; i++) {
        if (selectService.options[i].value.toLowerCase() === preselectedService.toLowerCase()) {
          selectService.selectedIndex = i;
          break;
        }
      }
    }

    bookingModalBackdrop.classList.add('open');
    bookingModalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');

    // Focus name input for convenience
    setTimeout(() => {
      if (inputName) inputName.focus();
    }, 100);
  };

  const closeBookingModal = () => {
    bookingModalBackdrop.classList.remove('open');
    bookingModalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  };

  // Wire all "Book Appointment" / "Book Now" buttons
  openBookingModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const service = btn.getAttribute('data-service');
      // Close mobile nav if opened from mobile drawer
      closeMobileMenu();
      openBookingModal(service);
    });
  });

  if (closeBookingModalBtn) {
    closeBookingModalBtn.addEventListener('click', closeBookingModal);
  }

  // Close when clicking outside dialog
  bookingModalBackdrop.addEventListener('click', (e) => {
    if (e.target === bookingModalBackdrop) {
      closeBookingModal();
    }
  });

  /* ==========================================================================
     7. WHATSAPP BOOKING LOGIC & FORM VALIDATION
     ========================================================================== */
  const validateField = (input, errorId, condition) => {
    const errorEl = document.getElementById(errorId);
    if (!condition) {
      if (input) input.classList.add('is-invalid');
      if (errorEl) errorEl.classList.add('visible');
      return false;
    } else {
      if (input) input.classList.remove('is-invalid');
      if (errorEl) errorEl.classList.remove('visible');
      return true;
    }
  };

  // Email format check (optional field)
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  // Phone validation (required field, minimum 5 digits)
  const isValidPhone = (phone) => {
    const cleaned = phone.replace(/[^0-9]/g, '');
    return cleaned.length >= 5;
  };

  // Clear validation styling when user inputs data
  [inputName, inputEmail, inputPhone, selectService, inputDate, selectTime].forEach(field => {
    if (!field) return;
    field.addEventListener('input', () => {
      field.classList.remove('is-invalid');
      const err = field.parentElement.querySelector('.form-error');
      if (err) err.classList.remove('visible');
    });
    field.addEventListener('change', () => {
      field.classList.remove('is-invalid');
      const err = field.parentElement.querySelector('.form-error');
      if (err) err.classList.remove('visible');
    });
  });

  /**
   * Main WhatsApp Booking Handler:
   * 1. Validates required fields (Full Name, Phone, Service, Date, Time).
   * 2. Collects input values (Email and Message are optional).
   * 3. Constructs the standardized salon booking message.
   * 4. Encodes message with encodeURIComponent() for Unicode/Croatian characters.
   * 5. Builds https://wa.me/385911234567?text=... URL.
   * 6. Opens WhatsApp in a new tab without automated sending.
   * 7. Displays "Booking request prepared" status with summary.
   */
  function sendBookingToWhatsApp() {
    // 1. Validate required fields
    const fullNameVal = inputName ? inputName.value.trim() : '';
    const phoneVal = inputPhone ? inputPhone.value.trim() : '';
    const emailVal = inputEmail ? inputEmail.value.trim() : '';
    const serviceVal = selectService ? selectService.value : '';
    const dateVal = inputDate ? inputDate.value : '';
    const timeVal = selectTime && selectTime.selectedIndex > 0 
      ? selectTime.options[selectTime.selectedIndex].text 
      : '';
    const messageVal = inputMessage ? inputMessage.value.trim() : '';

    const isNameValid = validateField(
      inputName,
      'name-error',
      fullNameVal.length >= 2
    );

    const isPhoneValid = validateField(
      inputPhone,
      'phone-error',
      isValidPhone(phoneVal)
    );

    // Email is optional: valid if empty, or if filled must be a valid email format
    const isEmailValid = emailVal === '' || isValidEmail(emailVal);
    validateField(inputEmail, 'email-error', isEmailValid);

    const isServiceValid = validateField(
      selectService,
      'service-error',
      serviceVal !== ''
    );

    const isDateValid = validateField(
      inputDate,
      'date-error',
      dateVal !== ''
    );

    const isTimeValid = validateField(
      selectTime,
      'time-error',
      timeVal !== ''
    );

    const formIsValid = isNameValid && isPhoneValid && isEmailValid && 
                        isServiceValid && isDateValid && isTimeValid;

    // If any required field is empty/invalid, do not open WhatsApp
    if (!formIsValid) {
      const firstInvalid = bookingForm.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.focus();
      return false;
    }

    // 2. Collect formatted values (handling optional fields)
    const emailFormatted = emailVal || "Not provided";
    const messageFormatted = messageVal || "None";

    // 3. Build WhatsApp message according to exact template
    const whatsappMessage = 
`Hello Luxe Hair Studio,

I would like to request an appointment.

Customer details:
Name: ${fullNameVal}
Phone: ${phoneVal}
Email: ${emailFormatted}

Appointment:
Service: ${serviceVal}
Date: ${dateVal}
Time: ${timeVal}

Additional message:
${messageFormatted}

Thank you!`;

    // 4. Encode message for URL (safe for Croatian characters Č, Ć, Ž, Š, Đ, etc.)
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // 5. Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${salonWhatsAppNumber}?text=${encodedMessage}`;

    // 6. Open WhatsApp (customer manually presses Send)
    window.open(whatsappUrl, "_blank");

    // 7. Update UI: show "Booking request prepared" status screen with summary
    if (summaryName) summaryName.textContent = fullNameVal;
    if (summaryPhone) summaryPhone.textContent = phoneVal;
    if (summaryEmail) summaryEmail.textContent = emailFormatted;
    if (summaryService) summaryService.textContent = serviceVal;
    if (summaryDateTime) {
      const dateObj = new Date(dateVal + 'T00:00:00');
      const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
      const formattedDate = dateObj.toLocaleDateString('en-US', options);
      summaryDateTime.textContent = `${formattedDate} at ${timeVal}`;
    }
    if (summaryMessage) summaryMessage.textContent = messageFormatted;
    if (reopenWhatsAppLink) reopenWhatsAppLink.href = whatsappUrl;

    // Transition from form to prepared screen
    if (bookingForm) bookingForm.style.display = 'none';
    if (bookingSuccess) bookingSuccess.style.display = 'block';

    showToast('WhatsApp opened! Please press Send to submit your request.');
    return true;
  }

  // Handle form submission
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sendBookingToWhatsApp();
    });
  }

  // Reset form to allow another booking request
  const resetBookingForm = () => {
    bookingForm.reset();
    setMinDateToToday();
    
    // Clear validation styling and error text
    bookingForm.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    bookingForm.querySelectorAll('.form-error').forEach(el => el.classList.remove('visible'));

    // Toggle view back to form
    bookingSuccess.style.display = 'none';
    bookingForm.style.display = 'block';
  };

  if (bookAnotherBtn) {
    bookAnotherBtn.addEventListener('click', resetBookingForm);
  }

  if (successCloseBtn) {
    successCloseBtn.addEventListener('click', () => {
      closeBookingModal();
      setTimeout(resetBookingForm, 400);
    });
  }

  /* ==========================================================================
     8. GALLERY LIGHTBOX MODAL
     ========================================================================== */
  let currentLightboxService = 'Balayage';

  const openLightbox = (imgSrc, title, category) => {
    if (!lightboxBackdrop) return;
    lightboxImg.src = imgSrc;
    lightboxImg.alt = title;
    lightboxTitle.textContent = title;
    lightboxCategory.textContent = category;
    currentLightboxService = category;

    lightboxBackdrop.classList.add('open');
    lightboxBackdrop.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  };

  const closeLightbox = () => {
    if (!lightboxBackdrop) return;
    lightboxBackdrop.classList.remove('open');
    lightboxBackdrop.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    lightboxImg.src = '';
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.getAttribute('data-img');
      const title = item.getAttribute('data-title');
      const category = item.getAttribute('data-category');
      openLightbox(imgSrc, title, category);
    });
  });

  if (closeLightboxBtn) {
    closeLightboxBtn.addEventListener('click', closeLightbox);
  }

  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener('click', (e) => {
      if (e.target === lightboxBackdrop) {
        closeLightbox();
      }
    });
  }

  // "Book This Style" inside Lightbox
  if (lightboxBookBtn) {
    lightboxBookBtn.addEventListener('click', () => {
      closeLightbox();
      setTimeout(() => {
        openBookingModal(currentLightboxService);
      }, 250);
    });
  }

  /* ==========================================================================
     9. PRIVACY POLICY MODAL
     ========================================================================== */
  const openPrivacyModal = () => {
    if (!privacyModalBackdrop) return;
    privacyModalBackdrop.classList.add('open');
    privacyModalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  };

  const closePrivacyModal = () => {
    if (!privacyModalBackdrop) return;
    privacyModalBackdrop.classList.remove('open');
    privacyModalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  };

  if (openPrivacyModalBtn) {
    openPrivacyModalBtn.addEventListener('click', openPrivacyModal);
  }

  if (closePrivacyModalBtn) {
    closePrivacyModalBtn.addEventListener('click', closePrivacyModal);
  }

  if (privacyAgreeBtn) {
    privacyAgreeBtn.addEventListener('click', closePrivacyModal);
  }

  if (privacyModalBackdrop) {
    privacyModalBackdrop.addEventListener('click', (e) => {
      if (e.target === privacyModalBackdrop) {
        closePrivacyModal();
      }
    });
  }

  /* ==========================================================================
     10. GLOBAL ESCAPE KEY HANDLER
     ========================================================================== */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (mobileNav && mobileNav.classList.contains('open')) {
        closeMobileMenu();
      }
      if (bookingModalBackdrop && bookingModalBackdrop.classList.contains('open')) {
        closeBookingModal();
      }
      if (lightboxBackdrop && lightboxBackdrop.classList.contains('open')) {
        closeLightbox();
      }
      if (privacyModalBackdrop && privacyModalBackdrop.classList.contains('open')) {
        closePrivacyModal();
      }
    }
  });

  /* ==========================================================================
     11. GET DIRECTIONS ACTION (GOOGLE MAPS)
     ========================================================================== */
  const salonAddressQuery = encodeURIComponent('Main Street 25, 10000 Zagreb, Croatia');
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${salonAddressQuery}`;

  const openGoogleMaps = () => {
    window.open(googleMapsUrl, '_blank', 'noopener,noreferrer');
    showToast('Opening Google Maps directions for Zagreb...');
  };

  if (getDirectionsBtn) {
    getDirectionsBtn.addEventListener('click', openGoogleMaps);
  }

  if (mapOpenBtn) {
    mapOpenBtn.addEventListener('click', openGoogleMaps);
  }

  /* ==========================================================================
     12. TOAST NOTIFICATION HELPER
     ========================================================================== */
  function showToast(msg) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = msg;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }

  /* ==========================================================================
     13. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Reveal only once for performance
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    // Graceful fallback for older browsers
    revealElements.forEach(el => el.classList.add('active'));
  }
});
