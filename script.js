// Sound Effects (Optional - placeholders)
const sounds = {
  click: new Audio("assets/click.mp3"),
  unwrap: new Audio("assets/unwrap.mp3"),
};

// State
let currentSection = "welcome";

// Background Animation: Floating Particles
function createParticles() {
  const container = document.querySelector(".floating-elements");
  const particleCount = 20;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Random properties
    const size = Math.random() * 10 + 5;
    const posX = Math.random() * 100;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 5;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;

    // Random shape (circle or heart)
    if (Math.random() > 0.5) {
      particle.innerHTML = "❤️";
      particle.style.fontSize = `${size}px`;
      particle.style.background = "transparent";
    } else {
      particle.style.background = "rgba(255, 255, 255, 0.1)";
      particle.style.borderRadius = "50%";
    }

    particle.style.position = "absolute";
    particle.style.bottom = "-20px";
    particle.style.animationName = "floatUpParticle";
    particle.style.animationTimingFunction = "linear";
    particle.style.animationIterationCount = "infinite";

    container.appendChild(particle);
  }
}

// Add particle CSS dynamically
const particleStyle = document.createElement("style");
particleStyle.innerHTML = `
    @keyframes floatUpParticle {
        0% { transform: translateY(0) rotate(0deg); opacity: 0; }
        10% { opacity: 0.5; }
        90% { opacity: 0.5; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particles
createParticles();

// Navigation
function nextSection(sectionId) {
  const current = document.querySelector(".screen.active");
  const next = document.getElementById(sectionId);

  if (current && next) {
    current.style.opacity = "0";
    current.style.transform = "scale(0.9)";

    setTimeout(() => {
      current.classList.remove("active");
      current.classList.add("hidden");

      next.classList.remove("hidden");
      // Small delay to allow display:block to apply before adding opacity
      setTimeout(() => {
        next.classList.add("active");
        next.style.opacity = "1";
        next.style.transform = "scale(1)";
      }, 50);

      // Trigger specific section logic
      if (sectionId === "quiz") loadQuiz();
      if (sectionId === "letter") typeWriter();
    }, 600);
  }
}

// Page 1: Open Box
function openBox() {
  const boxContainer = document.querySelector(".box-container");
  const boxImg = document.getElementById("chocolate-box");
  const fallbackBox = document.getElementById("fallback-box");

  // Animate the container
  boxContainer.style.animation = "shake 0.5s ease-in-out";

  // Add shake keyframes if not present
  if (!document.getElementById("shake-anim")) {
    const style = document.createElement("style");
    style.id = "shake-anim";
    style.innerHTML = `
            @keyframes shake {
                0%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(-5deg); }
                75% { transform: rotate(5deg); }
            }
        `;
    document.head.appendChild(style);
  }

  setTimeout(() => {
    // Transition to next section
    nextSection("mood");
  }, 600);
}

// Page 2: Mood Selector
const moodMessages = {
  dark: "Ooh, bold & intense! Just like my love for you. 😉🍫",
  strawberry: "Sweet, bubbly, and absolutely adorable! 🍓💖",
  milk: "Soft, warm, and comforting... the best feeling. 🍯✨",
  nutty: "A little crazy, a lot of fun! That's why I love you! 🌰🤪",
};

function selectMood(mood) {
  const response = document.getElementById("mood-response");
  const nextBtn = document.getElementById("next-mood-btn");

  // Reset all buttons
  document.querySelectorAll(".mood-btn").forEach((btn) => {
    btn.classList.remove("selected");
    btn.style.borderColor = "rgba(255,255,255,0.1)";
    btn.style.transform = "scale(1)";
  });

  // Highlight selected
  const selectedBtn = event.currentTarget;
  selectedBtn.classList.add("selected");
  selectedBtn.style.transform = "scale(1.05)";

  // Show message
  response.textContent = moodMessages[mood];
  response.style.opacity = 0;
  response.style.transform = "translateY(10px)";
  response.style.transition = "all 0.5s ease";

  setTimeout(() => {
    response.style.opacity = 1;
    response.style.transform = "translateY(0)";
  }, 100);

  // Show next button
  nextBtn.classList.remove("hidden");
  nextBtn.style.animation = "pulse 2s infinite ease-in-out";
}

// Page 3: Quiz
const quizQuestions = [
  {
    q: "If I were a chocolate, what would I be?",
    options: [
      "Dark & Mysterious",
      "Sweet & Clingy",
      "Nutty & Crazy",
      "Hot Chocolate ☕",
    ],
    reactions: [
      "Mysterious? Maybe... 😉",
      "Clingy? Only for you! ❤️",
      "Crazy about you! 🤪",
      "Hot? Oh stop it! 🤭",
    ],
  },
  {
    q: "Best way to eat chocolate?",
    options: [
      "Share with me 😌",
      "Hide & eat alone 😈",
      "Melted over everything",
      "With coffee ☕",
    ],
    reactions: [
      "Correct answer! Always share with me. 😘",
      "Hey! No secrets! 😤",
      "Yum! 😋",
      "Classy choice! ☕",
    ],
  },
  {
    q: "One chocolate you'll never share?",
    options: [
      "The last piece",
      "Your favorite kind",
      "Me! (I'm the chocolate)",
      "None, I share everything",
    ],
    reactions: [
      "Fight me for it! 🥊",
      "I'll buy you more! 🍫",
      "Aww! You're mine! 🥰",
      "You're the sweetest! 💖",
    ],
  },
];

let currentQuestion = 0;

function loadQuiz() {
  if (currentQuestion >= quizQuestions.length) {
    nextSection("memories");
    return;
  }

  const q = quizQuestions[currentQuestion];
  const qElem = document.getElementById("quiz-question");
  qElem.textContent = q.q;

  const optionsContainer = document.getElementById("quiz-options");
  optionsContainer.innerHTML = "";

  document.getElementById("quiz-feedback").textContent = "";
  document.getElementById("next-quiz-btn").classList.add("hidden");

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.className = "quiz-btn";
    btn.textContent = opt;
    btn.onclick = () => {
      // Disable all buttons
      document
        .querySelectorAll(".quiz-btn")
        .forEach((b) => (b.style.pointerEvents = "none"));
      btn.style.background = "var(--accent-pink)";
      btn.style.color = "white";

      document.getElementById("quiz-feedback").textContent = q.reactions[index];
      document.getElementById("next-quiz-btn").classList.remove("hidden");
    };
    optionsContainer.appendChild(btn);
  });
}

function nextQuestion() {
  currentQuestion++;
  const quizSection = document.getElementById("quiz");

  // Simple fade out/in effect for smoother question transition
  quizSection.style.opacity = 0;

  setTimeout(() => {
    if (currentQuestion < quizQuestions.length) {
      loadQuiz();
      quizSection.style.opacity = 1;
    } else {
      nextSection("memories");
    }
  }, 400);
}

// Page 4: Memories
function revealMemory(card, text) {
  if (card.classList.contains("flipped")) return; // Prevent re-triggering immediately

  card.classList.add("flipped");
  const memoryText = card.querySelector(".memory-text");
  memoryText.textContent = text;

  // Floating hearts effect
  createFloatingHeart(card.getBoundingClientRect());
}

function createFloatingHeart(rect) {
  const heart = document.createElement("div");
  heart.textContent = "❤️";
  heart.style.position = "absolute";
  heart.style.left = rect.left + rect.width / 2 + "px";
  heart.style.top = rect.top + "px";
  heart.style.fontSize = "24px";
  heart.style.pointerEvents = "none";
  heart.style.zIndex = "100";
  heart.style.animation = "floatUpHeart 1.5s ease-out forwards";
  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 1500);
}

// Add keyframes for floatUpHeart
const styleSheetHeart = document.createElement("style");
styleSheetHeart.innerText = `
@keyframes floatUpHeart {
    0% { transform: translateY(0) scale(1); opacity: 1; }
    100% { transform: translateY(-80px) scale(1.5); opacity: 0; }
}`;
document.head.appendChild(styleSheetHeart);

// Page 5: Gift
function selectGift(giftName, promise) {
  const msg = document.getElementById("gift-message");
  msg.innerHTML = `<strong>${giftName}</strong><br><br>${promise}`;
  const modal = document.getElementById("gift-reveal");
  modal.classList.remove("hidden");
  modal.classList.add("glass"); // Ensure glass effect
  modal.style.display = "flex";
  modal.style.flexDirection = "column";
  modal.style.gap = "20px";

  setTimeout(() => modal.classList.add("active"), 10);
}

// Page 6: Letter
const letterText = `Just like chocolate,
you make my ordinary days sweeter,
my bad days softer,
and my best days unforgettable.

Happy Chocolate Day, my favorite addiction 🍫❤️`;

function typeWriter() {
  const container = document.getElementById("letter-content");
  container.innerHTML = "";
  let i = 0;
  const speed = 50;

  function type() {
    if (i < letterText.length) {
      if (letterText.charAt(i) === "\n") {
        container.innerHTML += "<br>";
      } else {
        container.innerHTML += letterText.charAt(i);
      }
      i++;
      setTimeout(type, speed);
    } else {
      const btn = document.getElementById("final-btn");
      btn.classList.remove("hidden");
      btn.style.animation = "pulse 2s infinite ease-in-out";
    }
  }
  type();
}
