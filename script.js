document.addEventListener("DOMContentLoaded", () => {
  /* --- Typewriter Effect --- */
  const textElement = document.getElementById("typewriter-text");
  const startBtn = document.getElementById("start-btn");
  const landingText =
    "Hey love...<br>Before I ask you something important,<br>I want you to take a little journey with me ❤️";

  let i = 0;
  const speed = 50;

  function typeWriter() {
    if (i < landingText.length) {
      // Check for HTML tags to skip typing them
      if (landingText.charAt(i) === "<") {
        const tagEnd = landingText.indexOf(">", i);
        textElement.innerHTML += landingText.substring(i, tagEnd + 1);
        i = tagEnd + 1;
      } else {
        textElement.innerHTML += landingText.charAt(i);
        i++;
      }
      setTimeout(typeWriter, speed);
    } else {
      // Show button after typing finishes
      startBtn.classList.remove("hidden");
      startBtn.classList.add("fade-in");
    }
  }

  // Start typing after a short delay
  setTimeout(typeWriter, 1000);

  /* --- Navigation --- */
  const startButton = document.getElementById("start-btn");
  startButton.addEventListener("click", () => {
    nextSection("memory-lane");
  });

  window.nextSection = function (sectionId) {
    const currentSection = document.querySelector(".screen.active");
    const nextSection = document.getElementById(sectionId);

    if (currentSection) {
      currentSection.classList.remove("active");
      setTimeout(() => {
        currentSection.classList.add("hidden");
      }, 500); // Wait for fade out
    }

    if (nextSection) {
      nextSection.classList.remove("hidden");
      // Small delay to allow display:block to apply before opacity transition
      setTimeout(() => {
        nextSection.classList.add("active");
      }, 100);
    }
  };

  /* --- Memory Lane --- */
  window.flipCard = function (card) {
    card.classList.toggle("flipped");
  };

  /* --- Feelings Interaction --- */
  window.showFeelingResponse = function (text) {
    const responseText = document.getElementById("feeling-response");
    const nextBtn = document.getElementById("next-feelings-btn");

    responseText.textContent = `That’s exactly how you make me feel every day. ${text}`;
    responseText.classList.remove("hidden");
    responseText.classList.add("fade-in");

    // Allow proceeding after selection
    nextBtn.classList.remove("hidden");
    nextBtn.classList.add("fade-in");
  };

  /* --- Countdown --- */
  window.startCountdown = function () {
    nextSection("countdown");

    const timerElement = document.getElementById("timer");
    let timeLeft = 5;

    const timerInterval = setInterval(() => {
      timeLeft--;
      timerElement.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        nextSection("proposal");
      }
    }, 1000);
  };

  /* --- Celebration --- */
  window.celebrate = function () {
    nextSection("celebration");
    startConfetti();
  };

  /* --- Confetti Animation --- */
  function startConfetti() {
    const canvas = document.getElementById("confetti-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const numberOfPieces = 100;
    const colors = ["#ff6b81", "#ff9a9e", "#a18cd1", "#f6d365", "#fda085"];

    function randomColor() {
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach((p) => {
        p.y += p.speed;
        p.rotation += p.rotationSpeed;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();

        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
      });
      requestAnimationFrame(update);
    }

    for (let i = 0; i < numberOfPieces; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 10 + 5,
        speed: Math.random() * 3 + 2,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 0.1 - 0.05,
        color: randomColor(),
      });
    }

    update();

    // Resize safety
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }

  // Initialize Particles (Simple Sparkles)
  function createStars() {
    const starsContainer = document.querySelector(".stars");
    for (let i = 0; i < 50; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDuration = `${Math.random() * 3 + 2}s`;
      star.style.animationDelay = `${Math.random() * 2}s`;
      starsContainer.appendChild(star);
    }
  }
  createStars();

  /* --- Floating Hearts --- */
  function createFloatingHearts() {
    const container = document.querySelector(".floating-hearts");
    const heartCount = 15;

    for (let i = 0; i < heartCount; i++) {
      const heart = document.createElement("div");
      heart.classList.add("floating-heart");
      heart.innerHTML = "❤️";
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.animationDuration = `${Math.random() * 5 + 5}s`;
      heart.style.fontSize = `${Math.random() * 20 + 10}px`;
      heart.style.animationDelay = `${Math.random() * 5}s`;
      container.appendChild(heart);
    }
  }
  createFloatingHearts();
});
