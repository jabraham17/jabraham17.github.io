
//define link data structure
let links = [
  {'name': 'Home', 'link': '/'},
  {'name': 'About', 'link': '/about'},
  {'name': 'Apps', 'link': '/apps', 'sub': [
    {'name': 'Sonorous', 'link': '/about/sonorous'},
    {'name': 'Tasker', 'link': '/about/tasker'},
    {'name': 'Lambda Calculus', 'link': '/about/lambda_calculus'}
  ]},
  {'name': 'Contact', 'link': '/contact'}
];

//build an indiviual link and return it
function buildLink(link) {
  let linkelm = document.createElement('li');
  let address = document.createElement('a');
  linkelm.appendChild(address)
  address.href = link['link'];
  address.text = link['name'];
  return linkelm
}

//take the full data structure and form a link structure with them
function buildLinks(links, topElm) {
  for(let element of links) {
    //of there is a sub, create the top link, then recursively build the sub links
    if(element.hasOwnProperty('sub')) {
      let topLink = buildLink(element);
      let subList = document.createElement('ul');
      topLink.appendChild(subList);
      buildLinks(element['sub'], subList);
      topElm.appendChild(topLink);
    }
    //build a plain old link
    else {
      let linkelm = buildLink(element);
      topElm.appendChild(linkelm);
    }
  };
}

//create a nav bar and the list inside it
let navBar = document.createElement('nav');
document.body.appendChild(navBar);
let topList = document.createElement('ul');
navBar.appendChild(topList);

//build the links
buildLinks(links, topList);