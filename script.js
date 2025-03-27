const textArea = document.getElementById("text-input")
const characterCounter = document.getElementById("char-count");
const wordCounter = document.getElementById("word-count");


function CountCharacters() {
  characterCounter.textContent = textArea.value.length;
// if exculeSpaces
}

textArea.addEventListener("keyup", CountCharacters)


function CountWords() {
  let text = textArea.value;
  let trimmed = text.trim();

  if (trimmed === "") return 0;

  let words = trimmed.split(/\s+/);

  wordCounter.textContent = words.length
}

textArea.addEventListener("keyup", CountWords)


