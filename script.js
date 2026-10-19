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
