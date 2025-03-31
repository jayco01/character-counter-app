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
const toggleDensityButton = document.getElementById("toggle-density");

function hiddeDensityEmpty() {
if (textArea.value.length != "") {
  densityEmpty.classList.add("hidden")
} else {
  densityEmpty.classList.remove("hidden")
}
}
textArea.addEventListener("keyup",hiddeDensityEmpty)


let isExpanded = false; // Tracks if the "See More" button is toggled

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

  // Determine how many items to display
  const visibleCount = isExpanded ? sortedDensity.length : 5;

  sortedDensity.slice(0, visibleCount).forEach(function(letterData) {
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
    barContainer.style.width = "100%";  
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
    countLabel.style.display = "flex";
    countLabel.style.width = "7rem"
    countLabel.style.justifyContent = "flex-end"
    countLabel.style.flexDirection = "row";
    countLabel.textContent = count + " (" + percentage + "%)";
    countLabel.style.marginLeft = "0.5rem";
    countLabel.style.color = "var(--clr-neutral0)";

    barContainer.appendChild(progressBar);
    item.appendChild(letterLabel);
    item.appendChild(barContainer);
    item.appendChild(countLabel);

    densityOutput.appendChild(item);
  });

  // Show/Hide the "See More" button based on available items
  if (sortedDensity.length > 5) {
    toggleDensityButton.classList.remove("hidden");
    toggleDensityButton.textContent = isExpanded ? "See Less" : "See More";
  } else {
    toggleDensityButton.classList.add("hidden");
  }
}

toggleDensityButton.addEventListener("click", function() {
  isExpanded = !isExpanded;
  displayLetterDensity();
});



function hideCharacterLimit() {
  if (characterLimitCheckbox.checked) {
  characterLimitInput.classList.remove("hidden");
}else {
  characterLimitInput.classList.add("hidden");
}}
characterLimitCheckbox.addEventListener("input", hideCharacterLimit)


function changeDensityLetterColor() {
  const densityItem = document.querySelectorAll(".density-item span");
  let textColor;

  if (body.classList.contains("light-mode")) {
    textColor = "#12131A";
  } else {
    textColor = "#E4E4EF";
  }
  densityItem.forEach(function(item) {
    item.style.color = textColor; // Apply the color to each element
  });
}

function changeTheme() {
  body.classList.toggle("light-mode");

  if (body.classList.contains("light-mode")) {
    logo.setAttribute("src", "./assets/images/logo-light-theme.svg");
    toggleIcon.setAttribute("src", "./assets/images/icon-moon.svg");
    headerTitle.style.color = "var(--clr-neutral900)";
    toggleButton.style.backgroundColor = "var(--clr-neutral200)";
    textArea.style.backgroundColor = "var(--clr-neutral200)";
    textArea.style.color = "var(--clr-neutral900)";
    body.style.color = "var(--clr-neutral900)";
    characterLimitInput.style.color = "var(--clr-neutral900)";
    toggleDensityButton.style.color = "var(--clr-neutral900)"
 
  } else {
    logo.setAttribute("src", "./assets/images/logo-dark-theme.svg");
    toggleIcon.setAttribute("src", "./assets/images/icon-sun.svg");
    headerTitle.style.color = "var(--clr-neutral0)";
    toggleButton.style.background = "var(--clr-neutral700)";
    textArea.style.backgroundColor = "var(--clr-neutral800)";
    textArea.style.color = "var(--clr-neutral200)";
    body.style.color = "var(--clr-neutral200)";
    characterLimitInput.style.color = "var(--clr-neutral100)";
    toggleDensityButton.style.color = "var(--clr-neutral200)"
  }
}
textArea.addEventListener("keyup", function() {
  displayLetterDensity(); 
  changeDensityLetterColor(); 
});

toggleButton.addEventListener("click", function() {
  changeTheme(); 
  changeDensityLetterColor();
});


function countCharacters() {
 let text = textArea.value
  if (excludeSpacesCheckbox.checked) {
    text = text.replace(/\s/g, "");
    }
  characterCounter.textContent = text.length;
}
textArea.addEventListener("keyup", countCharacters)
excludeSpacesCheckbox.addEventListener("change", countCharacters)


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
  let charactersPerMinute = 1000; 
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

