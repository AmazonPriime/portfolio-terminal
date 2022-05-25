function surroundBreaks(element) {
  element.prepend(document.createElement("br"));
  element.append(document.createElement("br"));
  return element;
}

function getInputElement() {
  const div = document.createElement("div");
  div.className = "terminal-line";
  div.innerHTML = "$";
  const input = document.createElement("span");
  input.id = "input";
  input.className = "input"
  input.setAttribute('contenteditable', true);
  input.setAttribute('autofocus', true);
  input.setAttribute('role', 'textbox');
  div.appendChild(input);
  return div;
}

function invalidCommand(cmd) {
  const div = document.createElement("div");
  div.innerHTML = `Command '<b>${cmd}</b>' not found`
  div.innerHTML += `, use command '<b>help</b>' to see available commands.`;
  return div;
}

function submitCommand(e) {
  if (e.code == "Enter") {
    e.preventDefault();
    var curInput = document.getElementById('input');
    if (curInput) {
      // disable current input
      curInput.id = "old-input";
      curInput.setAttribute('contenteditable', false);
      curInput.setAttribute('autofocus', false);
      // run command and print output
      const args = curInput.textContent.toLowerCase().split(' ');
      if (Object.keys(COMMANDS).includes(args[0])) {
        const output = COMMANDS[args[0]].fn(args.slice(1));
        if (output) {
          document.getElementById('main').appendChild(surroundBreaks(output));
        }
      } else {
        document.getElementById('main').appendChild(invalidCommand(args[0]));
      }
      // add new command input
      document.getElementById('main').appendChild(getInputElement());
      document.getElementById('input').focus();
    }
  }
}

document.addEventListener('keydown', submitCommand);
document.addEventListener('click', () => {
  document.getElementById('input').focus();
})
