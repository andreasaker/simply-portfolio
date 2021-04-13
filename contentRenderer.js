let xmlhttp = new XMLHttpRequest();
let data = {};
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    console.log("parisng");
    data = JSON.parse(this.responseText);
    populateSite(data);
    scanForButtons();
  }
};

xmlhttp.open("GET", "/data.text", true);
xmlhttp.send();
console.log("working");

const populateSite = (data) => {
  console.log(data);
  document.getElementById("header-text").innerHTML = data.headerText;
  document.getElementById("initials").innerHTML = data.initials;
  renderProjects(data.projects);
};

const createCard = (id) => {
  let projectCard = document.createElement("article");
  projectCard.setAttribute("id", `project-${id}`);
  projectCard.setAttribute("class", "project-card");
  return projectCard;
};

const elementBuilder = (type, text, className) => {
  let element = document.createElement(type);
  className ? element.setAttribute("class", className) : null;
  element.innerHTML = text;
  //element.appendChild(document.createTextNode(text));
  return element;
};

const renderProjects = (projects) => {
  projects.map((p, i) => {
    let card = createCard(i);
    document.getElementById("projects").appendChild(card);

    let imagebox = document.createElement("div");
    imagebox.setAttribute("class", "imagebox");

    let image = document.createElement("img");
    image.setAttribute("src", "/assets/" + p.image_paths[0]);

    imagebox.appendChild(image);
    card.appendChild(imagebox);

    card.appendChild(elementBuilder("h2", p.name));
    card.appendChild(elementBuilder("p", p.desc));
    if (p.gitlink.length > 0) {
      let link = elementBuilder("a", "Github");
      link.setAttribute("href", p.gitlink);
      card.appendChild(link);
    }
    if (p.link.length > 0) {
      let link = elementBuilder("a", "Live site");
      link.setAttribute("href", p.link);
      card.appendChild(link);
    }

    let button = elementBuilder("button", "Read more");
    button.setAttribute("class", "read-more");
    button.setAttribute("value", i);
    card.appendChild(button);
  });
};

const scanForButtons = () => {
  let buttons = document.getElementsByClassName("read-more");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", renderContent, false);
  }
  let closeContentButton = document.getElementById("close-content-button");
  closeContentButton.addEventListener("click", closeContent, false);
};

const renderContent = (event) => {
  window.scrollTo(0, 0);
  let id = event.target.getAttribute("value");
  document.getElementById("projects").style.display = "none";
  const project = data.projects[id];
  let content = document.getElementById("content");
  content.style.display = "grid";
  content.getElementsByTagName("h2")[0].innerHTML = project.name;
  content.getElementsByTagName("p")[0].innerHTML = project.desc;
  let content_links = document.getElementById("content_links");
  if (project.gitlink.length > 0) {
    let link = elementBuilder("a", "Github");
    link.setAttribute("href", project.gitlink);
    content_links.appendChild(link);
  }
  if (project.link.length > 0) {
    let link = elementBuilder("a", "Live site");
    link.setAttribute("href", project.link);
    content_links.appendChild(link);
  }
  let content_images = document.getElementById("content_images");
  for (let i = 0; i < project.image_paths.length; i++) {
    let image = document.createElement("img");
    image.setAttribute("src", "/assets/" + project.image_paths[i]);
    content_images.appendChild(image);
  }
};

const closeContent = () => {
  document.getElementById("projects").style.display = "grid";
  document.getElementById("content").style.display = "none";
  document.getElementById("content_links").innerHTML = "";
  document.getElementById("content_images").innerHTML = "";
};