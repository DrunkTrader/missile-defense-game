// script.js
const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
let score = 0;

// Create turret
const turret = document.getElementById("turret");

// Move turret with mouse
gameArea.addEventListener("mousemove", (e) => {
  turret.style.left = `${e.clientX - turret.offsetWidth / 2}px`;
});

// Fire bullet on click
gameArea.addEventListener("click", fireBullet);

// Function to fire a bullet
function fireBullet() {
  const bullet = document.createElement("div");
  bullet.classList.add("bullet");
  bullet.style.left = `${turret.offsetLeft + turret.offsetWidth / 2 - 2.5}px`;
  gameArea.appendChild(bullet);

  // Move bullet upwards
  const bulletInterval = setInterval(() => {
    const bulletBottom = parseInt(bullet.style.bottom) || 50;
    bullet.style.bottom = `${bulletBottom + 5}px`;

    // Check for collision with missiles
    const missiles = document.querySelectorAll(".missile");
    missiles.forEach((missile) => {
      if (checkCollision(bullet, missile)) {
        missile.remove();
        bullet.remove();
        clearInterval(bulletInterval);
        score++;
        scoreDisplay.textContent = score;
      }
    });

    // Remove bullet if it goes off-screen
    if (bulletBottom > gameArea.offsetHeight) {
      bullet.remove();
      clearInterval(bulletInterval);
    }
  }, 20);
}

// Function to create missiles
function createMissile() {
  const missile = document.createElement("div");
  missile.classList.add("missile");
  missile.style.left = `${Math.random() * (gameArea.offsetWidth - 10)}px`;
  gameArea.appendChild(missile);

  // Move missile downwards
  const missileInterval = setInterval(() => {
    const missileTop = parseInt(missile.style.top) || 0;
    missile.style.top = `${missileTop + 5}px`;

    // Check if missile reaches the ground
    if (missileTop > gameArea.offsetHeight) {
      missile.remove();
      clearInterval(missileInterval);
      alert(`Game Over! Your score: ${score}`);
      location.reload(); // Restart the game
    }
  }, 50);
}

// Function to check collision between two elements
function checkCollision(element1, element2) {
  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();
  return !(
    rect1.bottom < rect2.top ||
    rect1.top > rect2.bottom ||
    rect1.right < rect2.left ||
    rect1.left > rect2.right
  );
}

// Create missiles at regular intervals
setInterval(createMissile, 1000);