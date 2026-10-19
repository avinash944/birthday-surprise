const startBtn = document.getElementById("startBtn");
const loader = document.getElementById("loader");
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
const surpriseBtn = document.getElementById("surprise");
const finalMessage = document.getElementById("finalMessage");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

function updateMusicButton() {
  musicBtn.textContent = bgMusic.paused ? "♫ Music: Off" : "♫ Music: On";
}

startBtn.addEventListener("click", async () => {
  loader.classList.add("hide");
  try {
    await bgMusic.play(); // Browsers allow audio after a user click.
  } catch (error) {
    // If music is missing or blocked, the website still works.
    console.info("Music could not start. Check the audio file path.", error);
  }
  updateMusicButton();
  document.getElementById("mainContent").scrollIntoView({ behavior: "smooth" });
});

musicBtn.addEventListener("click", async () => {
  if (bgMusic.paused) {
    try { await bgMusic.play(); } catch (error) {
      alert("Please check that assets/music/your-song.mp3 exists and is a supported audio file.");
    }
  } else {
    bgMusic.pause();
  }
  updateMusicButton();
});

surpriseBtn.addEventListener("click", () => {
  finalMessage.hidden = false;
  surpriseBtn.textContent = "A little love, just for you ❤️";
  surpriseBtn.disabled = true;
  finalMessage.scrollIntoView({ behavior: "smooth", block: "center" });
  burstHearts();
});

document.querySelectorAll(".clickable-photo").forEach((photo) => {
  photo.addEventListener("click", () => {
    lightboxImage.src = photo.src;
    lightboxImage.alt = photo.alt || "Memory photograph";
    lightbox.hidden = false;
  });
});

function closePhoto() {
  lightbox.hidden = true;
  lightboxImage.src = "";
}
closeLightbox.addEventListener("click", closePhoto);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closePhoto();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePhoto();
});

function burstHearts() {
  const container = document.querySelector(".hearts");
  for (let i = 0; i < 22; i++) {
    const heart = document.createElement("span");
    heart.className = "heart";
    heart.textContent = ["♥", "♡", "✦"][Math.floor(Math.random() * 3)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${14 + Math.random() * 22}px`;
    heart.style.animationDuration = `${3 + Math.random() * 4}s`;
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 7500);
  }
}

function makeStars() {
  const container = document.querySelector(".stars");
  for (let i = 0; i < 45; i++) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    container.appendChild(star);
  }
}
makeStars();
updateMusicButton();

/* =================================
   30 THINGS I LOVE ABOUT YOU
================================= */

const birthdayLoveReasons = [
    "Your beautiful smile can make my day better.",
    "You make ordinary moments feel special.",
    "I love how being around you feels comforting.",
    "You bring so much warmth into my life.",
    "I love the way you laugh.",
    "You make me look forward to the little things.",
    "I love how I can be myself around you.",
    "You make even simple conversations memorable.",
    "I love the little things you do without realising.",
    "You bring happiness into my everyday life.",
    "I love hearing about your day.",
    "You make me smile when I least expect it.",
    "I love discovering new things about you.",
    "You make memories worth holding on to.",
    "I love the way you see the world.",
    "You make time together feel precious.",
    "I love our little conversations and shared moments.",
    "You give me reasons to be grateful.",
    "I love how one memory can make me smile all over again.",
    "You make the simplest plans feel exciting.",
    "I love the thought of making more memories with you.",
    "You have a special place in my heart.",
    "I love the little details that make you, you.",
    "You make happiness feel wonderfully simple.",
    "I love having someone like you in my life.",
    "You remind me that the little things matter.",
    "I love the memories we've already created.",
    "You make me excited for the moments still to come.",
    "I love getting to know you a little more every day.",
    "If I had to choose again, I'd still choose you."
];

const loveReasonsContainer = document.getElementById("loveReasons");
const loveCountDisplay = document.getElementById("loveCount");

if (loveReasonsContainer && loveCountDisplay) {
    const discoveredReasons = new Set();

    birthdayLoveReasons.forEach((reason, index) => {
        const card = document.createElement("button");

        card.type = "button";
        card.className = "love-card";
        card.setAttribute("aria-expanded", "false");
        card.setAttribute(
            "aria-label",
            `Reason ${index + 1}: tap to reveal`
        );

        card.innerHTML = `
            <span class="reason-number">
                REASON ${String(index + 1).padStart(2, "0")}
            </span>

            <span class="reason-heart" aria-hidden="true">♡</span>

            <span class="reason-prompt">Tap to reveal</span>

            <span class="reason-text"></span>
        `;

        // Add the reason as text, not as HTML.
        card.querySelector(".reason-text").textContent = reason;

        card.addEventListener("click", () => {
            const isOpen = card.classList.toggle("is-open");

            card.setAttribute("aria-expanded", String(isOpen));

            card.setAttribute(
                "aria-label",
                isOpen
                    ? `Reason ${index + 1}: ${reason}`
                    : `Reason ${index + 1}: tap to reveal`
            );

            // Count each reason only once, even if closed and reopened.
            discoveredReasons.add(index);

            loveCountDisplay.textContent = discoveredReasons.size;
        });

        loveReasonsContainer.appendChild(card);
    });
}
