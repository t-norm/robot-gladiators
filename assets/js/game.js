var fightOrSkip = function() {
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this round? Enter "FIGHT" or "SKIP" to choose.');
  
    if (promptFight === "" || promptFight === null) {
      window.alert("I didn't understand you. Try again.");
      return fightOrSkip();
    }
  
    promptFight = promptFight.toLowerCase();
  
    if (promptFight === "skip") {
      var confirmSkip = window.confirm("Are you sure you want to skip this round? You will lose 10 gold.");
  
        if (confirmSkip) {
            window.alert("The crowd boos ferociously. "  + playerInfo.name + " has decided to skip this fight.");
            playerInfo.gold = Math.max(0, playerInfo.gold - 10);
            return true;
        }
    }
    return false;
};
  
var fight = function(enemy) {

    var isPlayerTurn = true;
  
    if (Math.random() > 0.5) {
      isPlayerTurn = false;
    }
  
    while (playerInfo.health > 0 && enemy.health > 0) {

        if (isPlayerTurn) {

            if (fightOrSkip()) {
                break;
            }
  
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);
        
            if (enemy.health <= 0) {
                window.alert("Encore! " + enemy.name + " was slain!");
                playerInfo.gold = playerInfo.gold + 20;
                break;
            }else {
                window.alert(enemy.name + " has " + enemy.health + " health.");
            }

        }else {
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - damage);

            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                break;
            }else {
                window.alert(playerInfo.name + " has " + playerInfo.health + " health.");
            }
        }
        isPlayerTurn = !isPlayerTurn;
    }
};

var startGame = function() {
    playerInfo.reset();

    if (playerInfo.name === "" || playerInfo.name === null) {
        window.alert("I didn't understand you, so I'll just assume you typed 'DumBot'.")
        playerInfo.name = "DumBot"
    }

    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));
            var pickedEnemyObj = enemyInfo[i];
            pickedEnemyObj.health = randomNumber(40, 60);
            fight(pickedEnemyObj);

            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                var storeConfirm = window.confirm("The fight is over, do you want to visit the store before the next round?");
            
                if (storeConfirm) {
                    shop();
                }
            }
        }
    }

    endGame();
}

var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");
  
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
      highScore = 0;
    }

    if (playerInfo.gold > highScore) {
      localStorage.setItem("highscore", playerInfo.gold);
      localStorage.setItem("name", playerInfo.name);
  
      alert(playerInfo.name + " has a high score of " + playerInfo.gold + "!");
    } 
    else {
      alert(playerInfo.name + " did not beat the high score of " + highScore + ".");
    }
  
    var playAgainConfirm = window.confirm("Play again?");
  
    if (playAgainConfirm) {
      startGame();
    } 
    else {
      window.alert("Thanks for playing!");
    }
};

var shop = function () {
    var shopOptionPrompt =window.prompt(
        "Would you like to REFILL your health (+20 for 7 gold), UPGRADE your attack power (+6 for 7 gold), or LEAVE the store? Please type '1' for REFILL, '2' UPGRADE, or '3' to LEAVE. " + playerInfo.name + "'s Stats: Health: " + playerInfo.health + " | Attack Power: " + playerInfo.attack + " | Gold: " + playerInfo.gold + "."
    );

    shopOptionPrompt = parseInt(shopOptionPrompt);

    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            shop();
            break;

        case 2:
            playerInfo.upgradeAttack();
            shop();
            break;

        case 3:
            window.alert("Fight well and die hard, " + playerInfo.name + ".");
            break;

        default:
            window.alert("What was that? I didn't understand you. Try again.");
            shop();
            break;
    }
};

var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
};

var getPlayerName = function() {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }
    
    console.log("Your robot's name is " + name);
    return name;
};

var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    gold: 10,
    reset: function() {
        this.health = 100;
        this.gold = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.gold >= 7) {
            window.alert("Refilling " + playerInfo.name + "'s health by 20 for 7 gold.");
            this.health += 20;
            this.gold -= 7;
        }else {
            window.alert("You don't have enough gold!");
            shop();
        }
    },
    upgradeAttack: function() {
        if (this.gold >= 7) {
            window.alert("Upgrading " + playerInfo.name + "'s attack by 6 for 7 gold.");
            this.attack += 6;
            this.gold -= 7;
        }else {
            window.alert("You don't have enough gold!");
            shop();
        }
    }
};

var enemyInfo = [
    {
      name: "Roborto",
      attack: randomNumber(10, 14)
    },
    {
      name: "Amy Android",
      attack: randomNumber(10, 14)
    },
    {
      name: "Robo Trumble",
      attack: randomNumber(10, 14)
    }
];

startGame();