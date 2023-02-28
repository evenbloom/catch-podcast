 const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
const isThemeDark = () => localStorage.getItem("theme") === "dark";

function setTheme(theme) {
  const html = document.querySelector("html");
  html.classList.toggle("theme-default", theme === "light");
  html.classList.toggle("theme-blackout", theme === "dark");
  localStorage.setItem("theme", theme);
  console.info(`${theme} mode activated.`);
}

function toggleThemeMode() {
  setTheme(isThemeDark() ? "light" : "dark");
}

function createSVGWrapper() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "currentColor");
  return svg;
}

function createIcon(pathData, circle) {
  const svg = createSVGWrapper();
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", pathData);
  if (circle) {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "12");
    circle.setAttribute("cy", "12");
    circle.setAttribute("r", "5");
    svg.appendChild(circle);
  }
  svg.appendChild(path);
  return svg;
}

function createToggleSwitch() {
  const toggleSwitch = document.createElement("div");
  toggleSwitch.classList.add("toggle-switch");
  toggleSwitch.innerHTML = `
    <div class="dark-mode-icon">
      ${createIcon("M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z")}
    </div>
    <div class="light-mode-icon">
      ${createIcon("M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42", true)}
    </div>
  `;
  toggleSwitch.addEventListener("click", toggleThemeMode);
  return toggleSwitch;
}

function addToggleSwitcher() {
  const navbar = document.querySelector(".super-navbar");
  if (navbar) {
    const toggleSwitch = createToggleSwitch();
    navbar.append(toggleSwitch);
    console.info("The theme switcher was added.");
  } else {
    console.info("You need to add a navbar to the page.");
  }
}

function onPageLoad() {
  const notionHeader = document.querySelector(".notion-header");
  if (!notionHeader) return;
  
  const removeFooterCover = () => {
    const footerCover = document.querySelector(".footer-cover");
    if (footerCover) footerCover.remove();
  };
  
  removeFooterCover();
  
  new MutationObserver(function (mutations) {
    for (const mutation of mutations) {
      if (mutation.type === "characterData") {
        removeFooterCover();
      }
    }
  }).observe(notionHeader, {subtree: true, characterData: true});
}

function setInitialTheme() {
  setTheme(isThemeDark() || (!localStorage.getItem("theme") && darkModeMediaQuery.matches) ? "dark" : "light");
}

setInitialTheme();
window.addEventListener("load", addToggleSwitcher);