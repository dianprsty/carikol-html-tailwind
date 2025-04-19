const detailsElements = document.querySelectorAll("details");

document.addEventListener("click", function (event) {
  detailsElements.forEach(function (details) {
    if (!details.contains(event.target)) {
      details.removeAttribute("open");
    }
  });
});

document.addEventListener("alpine:init", () => {
  Alpine.store("accordion", {
    tab: 0
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
    }
  }));


});


function accordion(id) {
  return {
    active: id,
    handleClick() {
      this.active = this.active === id ? null : id;
    },
    handleToggle() {
      return this.active === id ? `max-height: ${this.$refs.tab.scrollHeight}px` : 'max-height: 0';
    },
    handleRotate() {
      return this.active === id ? 'rotate-180' : '';
    }
  }
}

function revealElements() {
  const elements = document.querySelectorAll('.animate-slide-left, .animate-slide-right, .animate-fade-up, .animate-fade-in');
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    const revealPoint = 150; // Adjust as needed

    if (elementTop < windowHeight - revealPoint) {
      element.classList.add('in-view');
    }
  });
}

window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements); // To reveal elements that are already in the viewport on load
