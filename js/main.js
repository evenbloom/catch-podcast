const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
const html = document.querySelector("html");
const toggleSwitch = document.createElement("div");
toggleSwitch.classList.add("toggle-switch");

const createSVGWrapper = () => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "currentColor");
  return svg;
}

const createIcon = (path) => {
  const svg = createSVGWrapper();
  const icon = document.createElementNS("http://www.w3.org/2000/svg", "path");
  icon.setAttribute("d", path);
  svg.appendChild(icon);
  return svg;
}

const setTheme = (theme) => {
  html.classList.add(`theme-${theme}`);
  html.classList.remove(`theme-${theme === "dark" ? "default" : "blackout"}`);
  localStorage.setItem("theme", theme);
  console.info(`${theme === "dark" ? "Dark" : "Light"} mode activated.`);
}

const toggleThemeMode = () => {
  const currentTheme = localStorage.getItem("theme");
  const theme = currentTheme === "dark" || !currentTheme && darkModeMediaQuery.matches ? "light" : "dark";
  setTheme(theme);
}

const addToggleSwitcher = () => {
  const darkModeIcon = createIcon("M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z");
  const lightModeIcon = createIcon("M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42");
  toggleSwitch.appendChild(darkModeIcon);
  toggleSwitch.appendChild(lightModeIcon);
  toggleSwitch.addEventListener("click", toggleThemeMode);
  
  const navbar = document.querySelector(".super-navbar");
  if (navbar) {
    if (!navbar.querySelector(".toggle-switch")) {
      navbar.appendChild(toggleSwitch);
    }
    console.info("The theme switcher was already added.");
  } else {
    console.info("You need to add a navbar to the page.");
  }
}

const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  setTheme(currentTheme);
} else if (darkModeMediaQuery.matches) {
  setTheme("dark");
} else {
  setTheme("default");
}

addToggleSwitcher();

function onPageLoad() {
   const e = document.querySelector(".notion-header");

  const removeFooterCover = () => {
    const e = document.querySelector(".footer-cover");
    e && e.remove();
  };

  removeFooterCover();

  new MutationObserver(function (e, t) {
    for (const t of e)
      "characterData" === t.type && removeFooterCover();
  }).observe(e, {
    subtree: !0,
    characterData: !0,
  });
}

setInitialTheme();
window.onload = function () {
  addToggleSwitcher();
};

document.addEventListener("DOMContentLoaded", onPageLoad);