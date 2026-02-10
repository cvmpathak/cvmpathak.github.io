const questions = [
  "What is one promise you want to make today?",
  "When things get difficult, what will you promise to remember?",
  "What does ‘forever’ mean to you?",
];

const acknowledgments = [
  "That’s a promise worth holding close 🤍",
  "A beautiful truth to carry forward...",
  "Forever is built on moments like this ✨",
];

let currentStep = 0;
let currentQuestionIndex = 0;
const userResponses = [];

// Background Transition Helper
function changeBackground(className) {
  const layers = document.querySelectorAll(".bg-layer");
  layers.forEach((layer) => {
    layer.classList.remove("active");
    if (layer.classList.contains(className)) {
      layer.classList.add("active");
    }
  });
}

function nextStep() {
  const music = document.getElementById("bg-music");
  if (music && music.paused) {
    music.play().catch((err) => console.log("Music play blocked", err));
  }

  fadeOut(`step-${currentStep}`, () => {
    currentStep++;
    if (currentStep === 1) {
      changeBackground("bg-questions");
      showQuestion();
    }
  });
}

function showQuestion() {
  const qText = document.getElementById("question");
  const input = document.getElementById("user-input");
  qText.textContent = questions[currentQuestionIndex];
  input.value = "";
  fadeIn("step-q");
}

function submitAnswer() {
  const input = document.getElementById("user-input");
  const answer = input.value.trim();

  if (!answer) {
    input.style.borderColor = "rgba(255, 117, 143, 0.5)";
    setTimeout(
      () => (input.style.borderColor = "rgba(255, 255, 255, 0.2)"),
      500,
    );
    return;
  }

  userResponses.push({
    question: questions[currentQuestionIndex],
    answer: answer,
    time: new Date().toLocaleString(),
  });

  fadeOut("step-q", () => {
    showAcknowledgment();
  });
}

function showAcknowledgment() {
  const ackText = document.getElementById("ack-msg");
  ackText.textContent = acknowledgments[currentQuestionIndex];

  fadeIn("step-ack");

  setTimeout(() => {
    fadeOut("step-ack", () => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion();
      } else {
        changeBackground("bg-final");
        showFinal();
      }
    });
  }, 2500);
}

function showFinal() {
  fadeIn("step-final");
}

function openGift() {
  // Save to localStorage
  localStorage.setItem("promiseDayMemories", JSON.stringify(userResponses));

  // Background save via Formspree (for static hosting like GitHub Pages)
  // IMPORTANT: Replace 'YOUR_FORM_ID' with your actual Formspree ID
  const formEndpoint = "https://formspree.io/f/xgoloayd";
  const formData = new FormData();
  userResponses.forEach((resp, i) => {
    formData.append(`Promise_${i + 1}_Question`, resp.question);
    formData.append(`Promise_${i + 1}_Answer`, resp.answer);
  });

  fetch(formEndpoint, {
    method: "POST",
    body: formData,
    headers: { Accept: "application/json" },
  })
    .then(() => console.log("Memory captured!"))
    .catch((err) => console.warn("Background save failed:", err));

  fadeOut("step-final", () => {
    fadeIn("step-gift");
  });
}

// Fade Helpers
function fadeOut(id, callback) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.opacity = "0";
  el.style.transform = "translateY(-10px)";
  setTimeout(() => {
    el.classList.remove("active");
    if (callback) callback();
  }, 800);
}

function fadeIn(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add("active");
  setTimeout(() => {
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  }, 50);
}
