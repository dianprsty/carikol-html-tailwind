document.addEventListener("DOMContentLoaded", function () {
  // Load Footer
  loadComponent("footer", "../component/footer.html");

  function loadComponent(containerId, file, callback) {
    fetch(file)
      .then(response => {
        if (!response.ok) throw new Error("HTTP error " + response.status);
        return response.text();
      })
      .then(data => {
        const container = document.getElementById(containerId);
        if (container) {
          container.innerHTML = data;
          if (callback) callback();
        } else {
          console.error("Element with id '" + containerId + "' not found in the document.");
        }
      })
      .catch(error => {
        console.error("Error loading " + file + ":", error);
      });
  }

  // Close all <details> elements when clicking outside
  document.addEventListener("click", function (event) {
    const detailsElements = document.querySelectorAll("details");
    detailsElements.forEach(function (details) {
      if (!details.contains(event.target)) {
        details.removeAttribute("open");
      }
    });
  });

  // Scroll animation for elements
  function revealElements() {
    const elements = document.querySelectorAll(
      ".animate-slide-left, .animate-slide-right, .animate-fade-up, .animate-fade-in"
    );
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      const revealPoint = 150;

      if (elementTop < windowHeight - revealPoint) {
        element.classList.add("in-view");
      }
    });
  }

  window.addEventListener("scroll", revealElements);
  window.addEventListener("load", revealElements);
});

// Alpine.js Accordion Logic
document.addEventListener("alpine:init", () => {
  Alpine.store("accordion", {
    tab: 0,
  });

  Alpine.data("accordion", (idx) => ({
    init() {
      this.idx = idx;
    },
    idx: -1,
    handleClick() {
      this.$store.accordion.tab =
        this.$store.accordion.tab === this.idx ? 0 : this.idx;
    },
    handleRotate() {
      return this.$store.accordion.tab === this.idx ? "-rotate-180" : "";
    },
    handleToggle() {
      return this.$store.accordion.tab === this.idx
        ? `max-height: ${this.$refs.tab.scrollHeight}px`
        : "";
    },
  }));
});

// Optional manual accordion (if not using Alpine for this part)
function accordion(id) {
  return {
    active: id,
    handleClick() {
      this.active = this.active === id ? null : id;
    },
    handleToggle() {
      return this.active === id
        ? `max-height: ${this.$refs.tab.scrollHeight}px`
        : "max-height: 0";
    },
    handleRotate() {
      return this.active === id ? "rotate-180" : "";
    },
  };
}
