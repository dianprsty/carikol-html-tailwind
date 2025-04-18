$(document).ready(function () {  
  $("#head-link").load("./Components/headLink/link.html", function () {
      $("#app-root").load("./Components/Pages/home.html", function () {
       // Faq
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
        //  end faq

  });
  $("#nav").load("./Components/navbar.html", function () {

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', () => {
        const expanded = mobileMenuButton.getAttribute('aria-expanded') === 'true' || false;
        mobileMenuButton.setAttribute('aria-expanded', !expanded);
        mobileMenu.style.display = expanded ? 'none' : 'block';
    });
  });
  });


});

