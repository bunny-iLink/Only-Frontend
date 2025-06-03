document.addEventListener("DOMContentLoaded", function () {
  const whyJoinCards = document.querySelectorAll(".why-join-card"); // For "Why Join Us" section
  const aboutSections = document.querySelectorAll(".about-section");
  const jobCards = document.querySelectorAll(".job-card"); // For Job Listings
  const cultureCards = document.querySelectorAll(".culture-card"); // For Culture Section
  const benefitCards = document.querySelectorAll(".benefit-card"); // For Benefits Section

  function showElementsSequentially(elements) {
    let index = 0;

    function showNext() {
      if (index < elements.length) {
        elements[index].classList.add("show");
        index++;
        setTimeout(showNext, 300); // Smooth staggered effect
      }
    }

    showNext();
  }

  function createObserver(elements) {
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            showElementsSequentially(elements);
            observer.disconnect(); // Stop observing after activation
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(elements[0]); // Observe the first element
  }

  // Apply animations to different sections
  createObserver(aboutSections);
  createObserver(whyJoinCards);
  createObserver(jobCards);
  createObserver(cultureCards);
  createObserver(benefitCards);
});
