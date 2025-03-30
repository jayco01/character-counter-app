const textArea = document.getElementById("text-input")
const characterCounter = document.getElementById("char-count");
const wordCounter = document.getElementById("word-count");
const sentenceCounter = document.getElementById("sentence-count");
const characterLimitInput = document.getElementById("char-limit")
const characterLimitCheckbox = document.getElementById("set-char-limit")

const warningWrapper = document.getElementById("warning-wrapper");
const limitValue = document.getElementById("limit-value");

const readingTime = document.getElementById("reading-time")

const body = document.querySelector(".body")
const toggleButton = document.querySelector(".theme-toggle")
const toggleIcon = document.querySelector(".toggle-icon")
const headerTitle = document.querySelector(".header__title")
const logo = document.querySelector(".logo")




function hideCharacterLimit() {
  if (characterLimitCheckbox.checked) {
  characterLimitInput.classList.remove("hidden");
}else {
  characterLimitInput.classList.add("hidden");
}}
characterLimitCheckbox.addEventListener("input", hideCharacterLimit)


function changeTheme() {
  body.classList.toggle("light-mode");

  if (body.classList.contains("light-mode")) {
    logo.setAttribute("src", "./assets/images/logo-light-theme.svg");
    toggleIcon.setAttribute("src", "./assets/images/icon-moon.svg");
    headerTitle.style.color = "#12131A";
    toggleButton.style.backgroundColor = "#E4E4EF";
    textArea.style.backgroundColor = "#E4E4EF";
    textArea.style.color = "#12131A";
    body.style.color = "#12131A";
    characterLimitInput.style.color = "#12131A";
 
  } else {
    logo.setAttribute("src", "./assets/images/logo-dark-theme.svg");
    toggleIcon.setAttribute("src", "./assets/images/icon-sun.svg");
    headerTitle.style.color = "#FFFFFF";
    toggleButton.style.background = "#2A2B37";
    textArea.style.backgroundColor = "#21222C";
    textArea.style.color = "#E4E4EF";
    body.style.color = "#E4E4EF";
    characterLimitInput.style.color = "#F2F2F7";
  }
}
toggleButton.addEventListener("click", changeTheme)


function countCharacters() {
  characterCounter.textContent = textArea.value.length;
// if exculeSpaces
}

textArea.addEventListener("keyup", countCharacters)


function countWords() {
  let text = textArea.value;
  let trimmed = text.trim();

  if (trimmed === "" || text.length === 0) return wordCounter.textContent = 0;

  let words = trimmed.split(/\s+/);

  wordCounter.textContent = words.length
}
textArea.addEventListener("keyup", countWords)


function countSentences() {
  let text = textArea.value;
  let trimmed = text.trim();

  if (trimmed === "") return sentenceCounter.textContent = 0;

  let sentences = trimmed.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);

  sentenceCounter.textContent = sentences.length
}
textArea.addEventListener("keyup", countSentences)



function updateCharLimitWarning() {
  let text = textArea.value;
  let charLimitNumber = Number(characterLimitInput.value);

  limitValue.textContent = charLimitNumber;

  if (
    characterLimitCheckbox.checked &&
    charLimitNumber > 0 &&
    text.length > charLimitNumber
  ) {
    warningWrapper.classList.remove("hidden");
  } else {
    warningWrapper.classList.add("hidden");
  }
}
textArea.addEventListener("keyup", updateCharLimitWarning);
characterLimitInput.addEventListener("input", updateCharLimitWarning);


function estimateReadingTime(text) {
  let charactersPerMinute = 1000; //
  let characterCount = text.length;

  let minutes =  characterCount / charactersPerMinute;

  if (minutes < 1){
    minutes =  "<1";
  } else {
    minutes = Math.ceil(minutes);
  }
  return minutes
}
textArea.addEventListener("keyup", function() {
  readingTime.textContent = estimateReadingTime(textArea.value)
});