const app = document.querySelector("#app");

if (!app) {
  throw new Error("App root was not found.");
}

const menuOpenButton = document.querySelector("[data-menu-open]");
const menuCloseButton = document.querySelector("[data-menu-close]");
const menuOverlay = document.querySelector("[data-menu-overlay]");
const menuDrawer = document.querySelector("[data-menu-drawer]");
const menuLinks = document.querySelectorAll("#mobile-menu a");

const setMenuOpen = (isOpen) => {
  if (!menuOpenButton || !menuOverlay || !menuDrawer) {
    return;
  }

  menuOpenButton.setAttribute("aria-expanded", String(isOpen));
  menuDrawer.setAttribute("aria-hidden", String(!isOpen));
  menuOverlay.classList.toggle("hidden", !isOpen);
  menuDrawer.classList.toggle("translate-x-full", !isOpen);
  document.body.classList.toggle("overflow-hidden", isOpen);
};

menuOpenButton?.addEventListener("click", () => setMenuOpen(true));
menuCloseButton?.addEventListener("click", () => setMenuOpen(false));
menuOverlay?.addEventListener("click", () => setMenuOpen(false));
menuLinks.forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
  }
});
