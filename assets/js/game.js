var playerName = window.prompt("Name your robot:");
var playerHealth = 100;
var playerAttack = 10;
var playerGold = 10;

var enemyNames = ['Roborto', 'Amy Android', 'Robo Trumble'];
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function(enemyName) {
    while (playerHealth > 0 && enemyHealth > 0) {
        var promptFight = window.prompt('Will you FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

        if (promptFight === "skip" || promptFight === "SKIP" || promptFight === "Skip") {
            var confirmSkip = window.confirm("If you skip this fight, you'll lose 10 gold. Are you sure?");
        
            if (confirmSkip) {
                window.alert("The crowd boos ferociously. " + playerName + ' has decided to skip the round.');
                playerGold = playerGold - 10;
                console.log("playerGold", playerGold);
                break;
            }
        }

        enemyHealth = enemyHealth - playerAttack;
        console.log(
            playerName + ' attacked ' + enemyName + '. ' + enemyName + ' has ' + enemyHealth + ' health.'
        );

        if (enemyHealth <= 0) {
            window.alert("Encore! " + enemyName + ' was slain!');
            playerGold = playerGold + 20;
            break;
        } else {
            window.alert(enemyName + ' has ' + enemyHealth + ' health.');
        }

        playerHealth = playerHealth - enemyAttack;
        console.log(
            enemyName + ' attacked ' + playerName + '. ' + playerName + ' has ' + playerHealth + ' health.'
        );

        if (playerHealth <= 0) {
            window.alert(playerName + ' has died!');
            break;
        } else {
        window.alert(playerName + ' has ' + playerHealth + ' health.');
        }
    }
};

var startGame = function() {
    playerHealth = 100;
    playerAttack = 10;
    playerGold = 10;

    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {
            window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));
            var pickedEnemyName = enemyNames[i];
            enemyHealth = 50;
            fight(pickedEnemyName);

            if (playerHealth > 0 && i < enemyNames.length - 1) {
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
    if (playerHealth > 0) {
        window.alert("Well fought! You survived the arena with " + playerGold + " gold.");
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
        "Would you like to REFILL your health (+20 for 7 gold), UPGRADE your attack power (+6 for 7 gold), or LEAVE the store? Please type: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            if (playerGold >= 7) {
                window.alert("Refilling health by 20 points for 7 gold.");
                playerHealth = playerHealth + 20;
                playerGold = playerGold - 7;
            }else {
                window.alert("You don't have enough gold.");
            }
            break;

        case "UPGRADE":
        case "upgrade":
            if (playerGold >= 7) {
                window.alert("Upgrading attack power by 6 for 7 gold.");
                playerAttack = playerAttack + 6;
                playerGold = playerGold - 7;
            }else {
                window.alert("You don't have enough gold.");
            }
          break;

        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");
            break;

        default:
            window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
      }
};

startGame();