
const grammarInputGroup = document.querySelector("#grammar.input-group");

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
  if(fileList.length > 1) {
    let file = fileList[0];
    let reader = new FileReader();
    reader.onload = (_ => {
      let contents = this.result;
      console.log(contents);
      console.log(reader.result)
    });
    reader.readAsText(file);
  }
}, false);

const submitButton = grammarInputGroup.querySelector("#submit.control-button")
submitButton.addEventListener("click", () => { 
  let tool = new Module.GrammarTool(grammarInput.value);
  console.log("Terminals")
        let retVector = tool.getTerminals()
        for (var i = 0; i < retVector.size(); i++) {
          console.log("Vector Value: ", retVector.get(i));
        }
}, false);