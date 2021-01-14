
//define link data structure
let links = [
  {'name': 'Home', 'link': '/'},
  {'name': 'About', 'link': '/about'},
  {'name': 'Apps', 'link': '/apps', 'sub': [
    {'name': 'Mobile Apps', 'link': 'https://mjaapps.weebly.com/'},
    //{'name': 'Lambda Calculus', 'link': '/apps/lambda_calculus'},
    {'name': 'Grammar Tool', 'link': '/apps/grammartool'},
    {'name': 'WebAssembly Reference', 'link': '/apps/wasmref'},
    //{'name': 'Sunhacks 2019', 'link': '/apps/sunhacks2019'},
    //{'name': 'OpenClass', 'link': '/apps/openclass'},
    //{'name': 'LayoutToCode', 'link': '/apps/layouttocode'},
    //{'name': 'Mixer', 'link': '/apps/mixer'}
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

export function buildNavBar(navBar) {
  //add the list to the nav bar
  let topList = document.createElement('ul');
  navBar.appendChild(topList);

  //build the links
  buildLinks(links, topList);
}

export default {buildNavBar};