// Custom Scripts
// All your custom javascript for this theme
//

// Navigation
function navigation() {
  const toggleButton = document.querySelector("#mobile-toggle");
  const siteNavigation = document.querySelector("#site-navigation");
  toggleButton.addEventListener("click", function() {
    siteNavigation.classList.toggle('is-open');
    toggleButton.classList.toggle('is-open');
  });
};

window.addEventListener('DOMContentLoaded', function() {
  navigation()
});
