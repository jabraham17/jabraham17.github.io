
const grammarInputGroup = document.querySelector("#grammar");

const grammarInput = grammarInputGroup.querySelector(".input-area");

//default text to show, this is the grammar for this
grammarInput.value = 
`rule_list -> rule rule_list | rule;
id_list -> ID id_list | ID;
rule -> ID ARROW rhs_list SEMICOLON;
rhs_list -> rhs | rhs PIPE rhs_list;
rhs -> id_list | EPSILON;`;


const pasteButton = grammarInputGroup.querySelector("#paste.control-button")
pasteButton.addEventListener("click", () => {
  if(typeof navigator.clipboard === "undefined") {
    grammarInput.focus();
    document.execCommand("paste");
  }
  else {
    navigator.clipboard.readText().then(text => grammarInput.value = text);
  }
}, false);

const copyButton = grammarInputGroup.querySelector("#copy.control-button")
copyButton.addEventListener("click", () => { 
  if(typeof navigator.clipboard === "undefined") {
    grammarInput.select();
    document.execCommand("copy");
  }
  else {
    navigator.clipboard.writeText(grammarInput.value);
  }
}, false);

const clearButton = grammarInputGroup.querySelector("#clear.control-button")
clearButton.addEventListener("click", () => { 
  grammarInput.value = "";
}, false);

const fileButton = grammarInputGroup.querySelector("#file.control-button")
fileButton.addEventListener("change", (event) => { 
  let fileList = event.target.files;
  if(fileList.length >= 1) {
    let file = fileList[0];
    let reader = new FileReader();
    reader.onload = function() {
      let contents = this.result;
      grammarInput.value = contents;
    };
    reader.readAsText(file);
  }
}, false);

const submitButton = grammarInputGroup.querySelector("#submit.control-button")
submitButton.addEventListener("click", calculateGrammar, false);




const outputTable = {
  "table": document.querySelector("#output #output-table"),
  "error": document.querySelector("#output-table #error"),
  "elements-block": document.querySelector("#output-table #elements-block"),
  "elements": {
    "terminal": document.querySelector("#output-table #symbols #terminal"),
    "nonterminal": document.querySelector("#output-table #symbols #nonterminal"),
    "useful": document.querySelector("#output-table #useful #usefulRules"),
    "first": document.querySelector("#output-table #first td"),
    "follow": document.querySelector("#output-table #follow td"),
    "predict": document.querySelector("#output-table #predict"),
    "parser": document.querySelector("#output-table #parser")
  }
}

const loader = document.querySelector(".app .working-indicator");

function clearOutput() {
  loader.style.display = "block";
  outputTable["table"].style.display = "none";

}

function setOutput(results) {

  if(results["error"]) {
    outputTable["error"].style.backgroundColor = "red";
    outputTable["error"].innerHTML = results["error"];
    outputTable["error"].style.display = "block";

    outputTable["elements-block"].style.display = "none";
  }
  else {
    outputTable["error"].style.backgroundColor = "";
    outputTable["error"].innerHTML = "";
    outputTable["error"].style.display = "none";

    outputTable["elements-block"].style.display = "block";
  }

  //apply results to output
  for(let key in outputTable["elements"]) {
    if(key !== "parser") outputTable["elements"][key].innerHTML = results[key];
    else outputTable["elements"][key].appendChild(results[key])
  }

  outputTable["table"].style.display = "block";
  loader.style.display = "none";
}

function calculateGrammar() {
  if(Module == null) {
    setTimeout(() => {
      calculateGrammar();
    }, 2000);
  }
  else {
    clearOutput();

    let results = {
      "error": null,
      "terminal": "",
      "nonterminal": "",
      "useful": "",
      "first": "",
      "follow": "",
      "predict": "",
      "parser": ""
    }

    let tool = new Module.GrammarTool(grammarInput.value);

    //valid
    if(tool.hasSyntaxError()) results["error"] = tool.getSyntaxError();
    else {
      //symbols
      let terminal = tool.getTerminals();
      for (let i = 0; i < terminal.size(); i++) {
        results["terminal"] += `${terminal.get(i)}<br>`
      }
      terminal.delete();
      let nonterminal = tool.getNonTerminals();
      for (let i = 0; i < nonterminal.size(); i++) {
        results["nonterminal"] += `${nonterminal.get(i)}<br>`
      }
      nonterminal.delete();

      //useful rules
      let usefulRules = tool.getUsefulRules();
      for (let i = 0; i < usefulRules.size(); i++) {
        results["useful"] += `${usefulRules.get(i)}<br>`
      }
      usefulRules.delete();

      //first and follow
      let first = tool.getFirstSets();
      for (let i = 0; i < first.size(); i++) {
        results["first"] += `${first.get(i)}<br>`
      }
      first.delete();

      let follow = tool.getFollowSets();
      for (let i = 0; i < follow.size(); i++) {
        results["follow"] += `${follow.get(i)}<br>`
      }
      follow.delete();

      let hasPredict = tool.hasPredictiveParser();
      if(hasPredict) results["predict"] = "A predictive parser exists for this grammar";
      else results["predict"] = "A predictive parser does not exist for this grammar";

      let parserText = tool.buildSimpleParser();
      let info = document.createElement("p");
      let download = saveData(parserText, 'parser.h');
      download.text = "Download simple parser (experimental)";
      info.appendChild(download)
      results["parser"] = info;

    }

    tool.delete();

    setOutput(results);
  }
}


function saveData(content, filename) {

  //create link for the file
  let link = document.createElement("a");
  link.style = "color: blue;";
  link.text = `${filename}`;
  link.download = `${filename}`;
  link.href = URL.createObjectURL(new Blob([content], { type: "text/plain" }));

  return link;
}