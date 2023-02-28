 var darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
  , getCurrentTheme = ()=>localStorage.getItem("theme")
  , saveThemeInLocalStorage = e=>localStorage.setItem("theme", e)
  , isThemeDark = ()=>"dark" === getCurrentTheme()
  , isThemeLight = ()=>"light" === getCurrentTheme();

function setLightMode() {
    document.querySelector("html").classList.add("theme-default"),
    document.querySelector("html").classList.remove("theme-blackout"),
    saveThemeInLocalStorage("light"),
    console.info("Light mode activated.")
}
function setDarkMode() {
    document.querySelector("html").classList.add("theme-blackout"),
    document.querySelector("html").classList.remove("theme-default"),
    saveThemeInLocalStorage("dark"),
    console.info("Dark mode activated.")
}
function setInitialTheme() {
    "dark" === getCurrentTheme() || !getCurrentTheme() && darkModeMediaQuery.matches ? setDarkMode() : setLightMode()
}
function toggleThemeMode() {
    var e = getCurrentTheme();
    "dark" === e || !e && darkModeMediaQuery.matches ? setLightMode() : setDarkMode()
}
function createSVGWrapper() {
    var e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    return e.setAttribute("viewBox", "0 0 24 24"),
    e.setAttribute("fill", "currentColor"),
    e
}
function createDarkModeIcon() {
    var e = createSVGWrapper()
      , t = document.createElementNS("http://www.w3.org/2000/svg", "path");
    return t.setAttribute("d", "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"),
    e.appendChild(t),
    e
}
function createLightModeIcon() {
    var e = createSVGWrapper()
      , t = document.createElementNS("http://www.w3.org/2000/svg", "path");
    return circle = document.createElementNS("http://www.w3.org/2000/svg", "circle"),
    t.setAttribute("d", "M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"),
    e.setAttribute("fill", "none"),
    e.setAttribute("stroke", "#fff"),
    e.setAttribute("stroke-width", "2"),
    e.setAttribute("stroke-linecap", "round"),
    e.setAttribute("stroke-linejoin", "round"),
    circle.setAttribute("cx", "12"),
    circle.setAttribute("r", "5"),
    circle.setAttribute("cy", "12"),
    e.appendChild(t),
    e.appendChild(circle),
    e
}
function createToggleSwitch() {
    var e = document.createElement("div");
    e.classList.add("toggle-switch");
    var t = document.createElement("div");
    t.classList.add("dark-mode-icon");
    var r = document.createElement("div");
    return r.classList.add("light-mode-icon"),
    e.appendChild(t),
    e.appendChild(r),
    t.appendChild(createDarkModeIcon()),
    r.appendChild(createLightModeIcon()),
    e
}
function addToggleSwitcher() {
    var e = createToggleSwitch()
      , t = document.querySelector(".super-navbar");
    t ? t.querySelector(".toggle-switch") ? console.info("The theme switcher was already added.") : (t.append(e),
    e.addEventListener("click", toggleThemeMode)) : console.info("You need to add a navbar to the page.")
}


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