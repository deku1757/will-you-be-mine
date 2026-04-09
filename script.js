const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const popup = document.getElementById("popup");
const resultMessage = document.getElementById("resultMessage");
const buttonArea = document.getElementById("buttons");
const floatLayer = document.getElementById("floatLayer");
const catExpression = document.getElementById("catExpression");

const floatSymbols = ["💖", "💕", "🐾", "😻", "❤", "✨"];
let excitedTimer;
let sadMoodIndex = 0;

const sadMoodStates = [
  {
    frame: { row: 0, col: 0 },
    popups: [
      "This tiny kitty is sad... choose yes?",
      "Nooo? My whiskers just dropped.",
      "Give this cutie one sweet chance.",
    ],
  },
  {
    frame: { row: 1, col: 0 },
    popups: [
      "I am doing tiny sad meows right now.",
      "Please don't make this kitten cry.",
      "One yes from you = my whole world.",
    ],
  },
  {
    frame: { row: 1, col: 3 },
    popups: [
      "Look at this face... still no?",
      "Paws shaking... heart waiting for yes.",
      "Be kind to this little love cat.",
    ],
  },
  {
    frame: { row: 2, col: 1 },
    popups: [
      "Aww, dramatic sad mode activated.",
      "My heart goes boop when you click yes.",
      "Please rescue this kitten with a yes.",
    ],
  },
  {
    frame: { row: 3, col: 1 },
    popups: [
      "This is my final sad puppy-cat eyes.",
      "I only want one thing: your yes.",
      "You + me + cats = perfect love story.",
    ],
  },
];
const happiestMoodFrame = { row: 3, col: 2 };
const yesPopups = [
  "Best answer ever, Seleucia. Sending you 1000 kitty kisses!",
  "Yesss! My heart is dancing with happy meows!",
  "You said yes! This kitty is in love mode forever.",
  "A million hearts for you, my lady kitten!",
];

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function setMoodFrame(frame) {
  if (!catExpression) {
    return;
  }

  const x = (frame.col / 3) * 100;
  const y = (frame.row / 3) * 100;
  catExpression.style.backgroundPosition = `${x}% ${y}%`;
}

function randomPositionWithinArea() {
  const areaRect = buttonArea.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = Math.max(0, areaRect.width - btnRect.width);
  const maxY = Math.max(0, areaRect.height - btnRect.height);

  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

function showPopupMessage(message) {
  popup.textContent = message;
  popup.classList.remove("hidden");

  clearTimeout(showPopupMessage.timer);
  showPopupMessage.timer = setTimeout(() => {
    popup.classList.add("hidden");
  }, 1800);
}

function cycleCatExpression() {
  if (!catExpression) {
    return;
  }
  sadMoodIndex = (sadMoodIndex + 1) % sadMoodStates.length;
  setMoodFrame(sadMoodStates[sadMoodIndex].frame);
}

function triggerCatExcitedMotion() {
  if (!catExpression) {
    return;
  }

  catExpression.classList.add("excited");
  clearTimeout(excitedTimer);
  excitedTimer = setTimeout(() => {
    catExpression.classList.remove("excited");
  }, 650);
}

// Initial placement so the no button starts in the visible area.
randomPositionWithinArea();
setMoodFrame(sadMoodStates[0].frame);

noBtn.addEventListener("mouseenter", () => {
  randomPositionWithinArea();
  cycleCatExpression();
  showPopupMessage(pickRandom(sadMoodStates[sadMoodIndex].popups));
  triggerCatExcitedMotion();
});

noBtn.addEventListener("touchstart", (event) => {
  event.preventDefault();
  randomPositionWithinArea();
  cycleCatExpression();
  showPopupMessage(pickRandom(sadMoodStates[sadMoodIndex].popups));
  triggerCatExcitedMotion();
});

yesBtn.addEventListener("click", () => {
  resultMessage.textContent = "Yay Seleucia! I love you so much! 💘🐾";
  showPopupMessage(pickRandom(yesPopups));
  if (catExpression) {
    setMoodFrame(happiestMoodFrame);
    catExpression.classList.add("excited");
    clearTimeout(excitedTimer);
    excitedTimer = setTimeout(() => {
      catExpression.classList.remove("excited");
    }, 700);
  }
});

function spawnFloatItem() {
  const item = document.createElement("span");
  item.className = "float-item";
  item.textContent = floatSymbols[Math.floor(Math.random() * floatSymbols.length)];
  item.style.left = `${Math.random() * 100}%`;
  item.style.animationDuration = `${6 + Math.random() * 5}s`;
  item.style.fontSize = `${0.9 + Math.random() * 1.1}rem`;
  item.style.filter = `drop-shadow(0 4px 6px rgba(217, 4, 41, 0.28))`;

  floatLayer.appendChild(item);
  setTimeout(() => {
    item.remove();
  }, 12000);
}

setInterval(spawnFloatItem, 520);
