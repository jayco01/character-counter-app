const textArea = document.getElementById("text-input")
const characterCount = document.getElementById("char-count");

function CountCharacters() {
  characterCount.textContent = textArea.value.length;
// if exculeSpaces
}

textArea.addEventListener("keyup", CountCharacters)

