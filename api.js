let xmlhttp = new XMLHttpRequest();
let data = {};
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    console.log("parisng");
    data = JSON.parse(this.responseText);
    populateSite(data);
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

    let image = document.createElement("img");
    image.setAttribute("src", "/assets/" + p.image_path);
    card.appendChild(image);

    card.appendChild(elementBuilder("h2", p.name));
    card.appendChild(elementBuilder("p", p.desc));
    if (p.link.length > 0) {
      let link = elementBuilder("a", "Github");
      link.setAttribute("href", p.link);
      card.appendChild(link);
    }
  });
};
