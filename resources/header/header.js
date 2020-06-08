import {buildNavBar} from "/resources/header/nav.js";


export function buildHeader(headerText = document.title) {
  let header = document.createElement("header");
  header.className = "page_header";

  let headerContent = document.createElement("div");
  headerContent.className = "header_content";

  let icon = document.createElement("img");
  icon.src = "/resources/icons/favicon.png";
  icon.className = "header_icon"

  let rightBar = document.createElement("div");
  rightBar.className = "header_right_bar"

  let text = document.createElement("h1");
  text.innerHTML = headerText;
  text.className = "header_text";

  let navBar = document.createElement("nav");
  buildNavBar(navBar);

  rightBar.appendChild(text);
  rightBar.appendChild(navBar);

  headerContent.appendChild(icon);
  headerContent.appendChild(rightBar);

  header.appendChild(headerContent)

  document.body.insertBefore(header, document.body.firstChild)
}