import {buildNavBar} from "/resources/header/nav.js";


export function buildHeader(headerText) {
  let header = document.createElement("header");
  header.className = "page_header";

  let icon = document.createElement("img");
  icon.src = "/resources/icons/favicon.png";
  icon.className = "header_icon"

  let text = document.createElement("h1");
  text.innerHTML = headerText;
  text.className = "header_text";

  let navBar = document.createElement("nav");
  buildNavBar(navBar);

  header.appendChild(icon);
  header.appendChild(text);
  header.appendChild(navBar);

  document.body.insertBefore(header, document.body.firstChild)
}