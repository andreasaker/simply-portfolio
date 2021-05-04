const scrollButton = () => {
  const btn = document.getElementById("up-button");
  btn.addEventListener("click", scrollUp, false);
};

const scrollUp = () => {
  setTimeout(window.scrollTo(0, 1), 100);
};

scrollButton();
