function onPageLoad() {
  const header = document.querySelector(".notion-header");
  const cover = document.querySelector(".notion-header__cover");
  const footerCover = document.querySelector(".footer-cover");
  const dropdownOptions = document.querySelectorAll(".notion-dropdown__option");
  const dropdownButtonTitle = document.querySelector(".notion-dropdown__button-title");

  const cloneHeaderCover = () => {
    if (footerCover) {
      footerCover.remove();
    }
    const clonedCover = cover.cloneNode(true);
    clonedCover.classList.add("footer-cover");
    clonedCover.classList.remove("notion-header__cover", "has-cover");
    document.querySelector(".super-content").appendChild(clonedCover);
  }
}