var fight = function(enemy) {
    while (playerInfo.health > 0 && enemy.health > 0) {
        var promptFight = window.prompt('Will you FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

        if (promptFight === "skip" || promptFight === "SKIP" || promptFight === "Skip") {
            var confirmSkip = window.confirm("If you skip this fight, you'll lose 10 gold. Are you sure?");
        
            if (confirmSkip) {
                window.alert("The crowd boos ferociously. " + playerInfo.name + ' has decided to skip the round.');
                playerInfo.gold = Math.max(0, playerInfo.gold - 10)
                console.log("playerInfo.gold", playerInfo.gold);
                break;
            }
        }

        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        enemy.health = Math.max(0, enemy.health - damage);

        console.log(
            playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' has ' + enemy.health + ' health.'
        );

        if (enemy.health <= 0) {
            window.alert("Encore! " + enemy.name + ' was slain!');
            playerInfo.gold = playerInfo.gold + 20;
            break;
        } else {
            window.alert(enemy.name + ' has ' + enemy.health + ' health.');
        }

        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        playerInfo.health = Math.max(0, playerInfo.health - damage);

        console.log(
            enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' has ' + playerInfo.health + ' health.'
        );

        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + ' has died!');
            break;
        } else {
        window.alert(playerInfo.name + ' has ' + playerInfo.health + ' health.');
        }
    }
};

var startGame = function() {
    playerInfo.reset();

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

var endGame = function () {
    if (playerInfo.health > 0) {
        window.alert("Well fought! You survived the arena with " + playerInfo.gold + " gold.");
    }else {
        window.alert("Game over! The crowd was not pleased...");
    }

    var playAgainConfirm = window.confirm("Play again?");

    if (playAgainConfirm) {
        startGame();
    }else {
        window.alert("Thanks for playing!");
    }
}

var shop = function () {
    var shopOptionPrompt =window.prompt(
        "Would you like to REFILL your health (+20 for 7 gold), UPGRADE your attack power (+6 for 7 gold), or LEAVE the store? Please type: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice. " + playerInfo.name + "'s Stats: Health: " + playerInfo.health + " | Attack Power: " + playerInfo.attack + " | Gold: " + playerInfo.gold + "."
    );

    switch (shopOptionPrompt) {
        case "REFILL":
        case "Refill":
        case "refill":
            playerInfo.refillHealth();
            shop();
            break;

        case "UPGRADE":
        case "Upgrade":
        case "upgrade":
            playerInfo.upgradeAttack();
            shop();
          break;

        case "LEAVE":
        case "Leave":
        case "leave":
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
        }
    },
    upgradeAttack: function() {
        if (this.gold >= 7) {
            window.alert("Upgrading " + playerInfo.name + "'s attack by 6 for 7 gold.");
            this.attack += 6;
            this.gold -= 7;
        }else {
            window.alert("You don't have enough gold!");
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