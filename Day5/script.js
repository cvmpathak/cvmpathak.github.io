let hugCount = 0;
const hugQuotes = [
  "Sending you a warm hug 🤍",
  "This teddy misses you!",
  "One hug = infinite love",
  "You are so huggable! ❤️",
  "Warmth level: Maximum 🧸",
  "A cozy hug just for you ✨",
  "You're my favorite cuddle partner",
];

// Theme Toggle
function toggleTheme() {
  document.body.classList.toggle("night-mode");
  const toggle = document.querySelector(".theme-toggle");
  toggle.textContent = document.body.classList.contains("night-mode")
    ? "🌙"
    : "🧸";
}

// Music Toggle with better error handling
function toggleMusic() {
  const audio = document.getElementById("bg-music");
  const toggle = document.querySelector(".music-toggle");
  if (audio.paused) {
    audio
      .play()
      .then(() => {
        toggle.textContent = "⏸️";
        toggle.classList.add("playing");
      })
      .catch((e) => {
        console.warn(
          "Audio play blocked by browser. Please interact with the page first.",
        );
        alert("Please click anywhere on the page first to enable music! 🎵");
      });
  } else {
    audio.pause();
    toggle.textContent = "🎵";
    toggle.classList.remove("playing");
  }
}

// Interactive Hug
function giveHug() {
  hugCount++;
  document.getElementById("hug-count").textContent = `Hugs given: ${hugCount}`;

  // Change quote
  const quote = hugQuotes[Math.floor(Math.random() * hugQuotes.length)];
  document.getElementById("hug-quote").textContent = `“${quote}”`;

  // Animation effect on teddy
  const teddy = document.getElementById("hug-teddy");
  teddy.style.transform = "scale(1.1) rotate(5deg)";
  setTimeout(() => {
    teddy.style.transform = "scale(1) rotate(0deg)";
  }, 300);

  createParticles(event.clientX, event.clientY, true);
}

// Letter/Note Reveal
function openNote(element) {
  element.classList.toggle("open");
}

// Surprise Trigger
function triggerSurprise() {
  const btn = document.getElementById("surprise-btn");
  const reveal = document.getElementById("surprise-reveal");

  btn.style.opacity = "0";
  setTimeout(() => {
    btn.style.display = "none";
    reveal.classList.remove("hidden");
    reveal.style.animation = "fadeUp 1.2s ease-out forwards";
  }, 400);

  // Massive premium confetti
  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      createParticles(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight,
        false,
      );
    }, i * 40);
  }
}

// Premium Particles
function createParticles(x, y, isBurst) {
  const container = document.getElementById("particles-container");
  const shapes = ["❤️", "💖", "✨", "🌸", "💕", "🧸", "⭐"];
  const count = isBurst ? 12 : 6;

  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.textContent = shapes[Math.floor(Math.random() * shapes.length)];
    p.style.left = x + "px";
    p.style.top = y + "px";

    const size = Math.random() * (isBurst ? 25 : 15) + 10;
    p.style.fontSize = size + "px";

    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * (isBurst ? 12 : 6) + 3;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    const rotation = Math.random() * 360;
    const rotationSpeed = (Math.random() - 0.5) * 10;

    container.appendChild(p);

    let opacity = 1;
    let curX = x;
    let curY = y;
    let curRot = rotation;

    const anim = setInterval(() => {
      curX += vx;
      curY += vy + 0.5; // Slight gravity
      curRot += rotationSpeed;
      opacity -= 0.015;

      p.style.transform = `translate(${curX - x}px, ${curY - y}px) rotate(${curRot}deg)`;
      p.style.opacity = opacity;

      if (opacity <= 0) {
        clearInterval(anim);
        p.remove();
      }
    }, 16);
  }
}

// Scroll Reveal Observer
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.15 },
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

// Click feedback
document.addEventListener("click", (e) => {
  if (
    e.target.tagName !== "BUTTON" &&
    !e.target.closest(".teddy-hug-box") &&
    !e.target.closest(".envelope")
  ) {
    createParticles(e.clientX, e.clientY, false);
  }
});
