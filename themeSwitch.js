const init = () => {
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  prefersDarkScheme.matches ? activateDarkMode() : null;

  let btn = document.getElementById("switch-theme");
  btn.addEventListener("click", switchTheme, false);
};

const switchTheme = () => {
  const body = document.getElementsByTagName("body")[0];
  if (body.hasAttribute("dark")) {
    disableDarkMode();
  } else {
    activateDarkMode();
  }
};

const activateDarkMode = () => {
  const body = document.getElementsByTagName("body")[0];
  body.setAttribute("dark", "true");
};

const disableDarkMode = () => {
  const body = document.getElementsByTagName("body")[0];
  body.removeAttribute("dark");
};

init();
