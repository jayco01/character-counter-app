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

const excludeSpacesCheckbox = document.getElementById("exclude-spaces")

const densityOutput = document.querySelector(".density-output")
const densityEmpty = document.querySelector(".density-empty")

function hiddeDensityEmpty() {
if (textArea.value.length != "") {
  densityEmpty.classList.add("hidden")
} else {
  densityEmpty.classList.remove("hidden")
}
}
textArea.addEventListener("keyup",hiddeDensityEmpty)


function calculateLetterDensity(text) {
  const letterCount = {};
  const totalLetters = text.length;

  for (let char of text) {
    char = char.toLowerCase();
    if (char.match(/[a-z]/)) {
      if (letterCount[char] === undefined) {
        letterCount[char] = 1; // Initialize count to 1 if not found in the textarea
      } else {
        letterCount[char] += 1; // Increment the count if already exists
      }
    }
  }

  // Convert the letter count object to a list for sorting
  const sortedDensity = [];
  for (let char in letterCount) {
    sortedDensity.push([char, letterCount[char]]);
  }

  // Sort the array by the count in descending order
  sortedDensity.sort(function(a, b) {
    return b[1] - a[1];
  });

  return sortedDensity;
}

function displayLetterDensity() {
  const text = textArea.value.toLowerCase();
  const letterCount = {};
  const totalLetters = text.replace(/[^a-z]/g, "").length;

  // Count occurrences of each letter
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (/[a-z]/.test(char)) {
      if (letterCount[char] === undefined) {
        letterCount[char] = 1;
      } else {
        letterCount[char] += 1;
      }
    }
  }

  const densityOutput = document.getElementById("letter-density-output");
  densityOutput.innerHTML = ""; // Clear previous output

  const sortedDensity = [];
  for (let char in letterCount) {
    sortedDensity.push([char, letterCount[char]]);
  }

  sortedDensity.sort(function(a, b) {
    return b[1] - a[1];
  });

  sortedDensity.forEach(function(letterData) {
    const letter = letterData[0];
    const count = letterData[1];
    const percentage = ((count / totalLetters) * 100).toFixed(2);

   
    const item = document.createElement("div");
    item.classList.add("density-item");
    item.style.display = "flex";
    item.style.alignItems = "center";
    item.style.justifyContent = "space-between";
    item.style.marginBottom = "0.5rem";

    
    const letterLabel = document.createElement("span");
    letterLabel.classList.add("density-letter");
    letterLabel.textContent = letter.toUpperCase();
    letterLabel.style.marginRight = "1rem";

   
    const barContainer = document.createElement("div");
    barContainer.classList.add("density-bar");
    barContainer.style.width = "75%";  
    barContainer.style.height = "10px";
    barContainer.style.backgroundColor = "var(--clr-neutral100)";
    barContainer.style.borderRadius = "0.75rem";
    barContainer.style.overflow = "hidden";
    barContainer.style.position = "relative";
    barContainer.style.marginRight = "1rem";
    barContainer.style.display = "flex";
    barContainer.style.alignItems = "center";

    const progressBar = document.createElement("div");
    progressBar.classList.add("density-bar-fill");

    const maxPercentage = Math.min(percentage, 90); 
    progressBar.style.width = maxPercentage + "%";
    progressBar.style.height = "100%";
    progressBar.style.backgroundColor = "var(--clr-blue500)";
    progressBar.style.transition = "width 0.2s ease";


    const countLabel = document.createElement("span");
    countLabel.classList.add("density-count");
    countLabel.textContent = count + " (" + percentage + "%)";
    countLabel.style.marginLeft = "0.5rem";
    countLabel.style.color = "var(--clr-neutral0)";

    barContainer.appendChild(progressBar);
    item.appendChild(letterLabel);
    item.appendChild(barContainer);
    item.appendChild(countLabel);

    densityOutput.appendChild(item);
  });
}

textArea.addEventListener("keyup", displayLetterDensity);


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
 let text = textArea.value
  if (excludeSpacesCheckbox.checked) {
    text = text.replace(/\s/g, "");
    }
  characterCounter.textContent = text.length;
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

