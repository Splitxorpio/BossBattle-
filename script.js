const currentVersion = "v0.8";
const bossHealth = document.getElementById("monster-health");
const playerHealth = document.getElementById("player-health");
const playerMana = document.getElementById("player-mana");
const attackBtn = document.getElementById("attack-btn");
const healBtn = document.getElementById("heal-btn");
const resetBtn = document.getElementById("reset-btn");
const bossMaxHealth = 1000;
const playerMaxHealth = 100;
const playerMaxMana = 100;
const critStrikeMultiplier = 3;
const defaultPlayerDamage = Math.floor(Math.random() * (35 - 25) + 25);
const defaultMonsterDamage = Math.floor(Math.random() * (5 - 2) + 2);
const healPlayerAmount = Math.floor(Math.random() * (30 - 20) + 20);
const healManaCost = 10;
let playerAttackDamage = defaultPlayerDamage;
let monsterAttackDamage = defaultMonsterDamage;
let bossEnrageDmgMultiplier = false;
let gameOver = false;

console.log("Boss Battler " + currentVersion);
console.log("Battle Start:");

function damageMonster(playerAttackDamage) {
  if (gameOver == true) {
    return;
  }
  let critChance = Math.floor(Math.random() * 100);
  if (critChance > 80) {
    playerAttackDamage = playerAttackDamage * critStrikeMultiplier;
    console.log("You hit for: " + playerAttackDamage + " Critical strike!");
    bossHealth.value = +bossHealth.value - playerAttackDamage;
    return (playerAttackDamage = defaultPlayerDamage);
  } else {
    const checkNormalAtk = Math.floor(Math.random() * 10 + playerAttackDamage);
    console.log("You hit for: " + checkNormalAtk);
    bossHealth.value = +bossHealth.value - checkNormalAtk;
  }
  if (bossHealth.value <= 0) {
    //BOSS DEFEATED
    document.getElementById('dog').src = "bossdefeat.png";
    document.getElementById('dragon').src = "dog.png";
    console.log("Game Over! YOU WIN.");
    alert("Game Over! YOU WIN.");
    gameOver = true;
    setTimeout(function(){
      window.location.replace("https://ending-for-canine-quest.lilyd2.repl.co/")
    },2000)
  }
}

function damagePlayer(monsterAttackDamage) {
  if (gameOver) {
    return;
  }
  let critChance = Math.floor(Math.random() * 100);
  if (critChance > 80) {
    bossEnraged();
    monsterAttackDamage = monsterAttackDamage * critStrikeMultiplier;
    console.log(
      "Boss hits you for: " + monsterAttackDamage + " Critical strike!"
    );
    playerHealth.value = +playerHealth.value - monsterAttackDamage;
    monsterAttackDamage = defaultMonsterDamage;
  } else {
    bossEnraged();
    const checkNormalAtk = Math.floor(Math.random() * 10 + monsterAttackDamage);
    console.log("Boss hits you for: " + checkNormalAtk);
    playerHealth.value = +playerHealth.value - checkNormalAtk;
  }
  if (playerHealth.value <= 0) {
    console.log("Game Over! YOU LOST.");
    alert("Game Over! YOU LOST.");
    gameOver = true;
  }
}

function bossEnraged() {
  if (bossHealth.value <= bossMaxHealth * 0.25 && !bossEnrageDmgMultiplier) {
    console.log("BOSS ENRAGED");
    monsterAttackDamage = monsterAttackDamage * 1.5;
    bossEnrageDmgMultiplier = true;
  } else {
    return;
  }
}

function healPlayer() {
  playerMana.value = +playerMana.value - healManaCost;
}

attackBtn.addEventListener("click", () => {
  damageMonster(playerAttackDamage);
  damagePlayer(monsterAttackDamage);
  myMove();
});

healBtn.addEventListener("click", () => {
  if (gameOver == false && playerMana.value >= 10) {
    playerHealth.value = +playerHealth.value + healPlayerAmount;
    healPlayer(healPlayerAmount);
    damagePlayer(monsterAttackDamage);
    console.log("You heal for: " + healPlayerAmount);
  } else {
    if (gameOver) {
      return;
    } else {
      console.log("Not Enough Mana!");
      alert("Not Enough Mana!");
    }
  }
});

function resetGame() {
  console.log("| - - - Resetting Game. - - - |");
  bossHealth.value = bossMaxHealth;
  playerHealth.value = playerMaxHealth;
  playerMana.value = playerMaxMana;
  gameOver = false;
}

resetBtn.addEventListener("click", () => resetGame());

var id = null;
function myMove() {
  var elem = document.getElementById("myAnimation");
  var pos = 0;
  clearInterval(id);
  id = setInterval(frame, 10);
  function frame() {
    if (pos == 600) {
      clearInterval(id);
    } else {
      pos = 500;
      elem.style.bottom = pos + "px";
      if (pos == 377){
        pos == 300;
      }
    }
  }
}