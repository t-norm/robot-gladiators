// player naming and initial stats
var playerName = window.prompt("Name your gladiator robot:");
var playerHealth = 100;
var playerAttack = 10;
var playerGold = 10;

console.log(playerName, playerAttack, playerHealth);

// enemy stats
var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;

var fight = function() {
    window.alert("Welcome to Robot Gladiators!");

    var promptFight = window.prompt('Will you FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose:');

    if (promptFight === "fight" || promptFight === "FIGHT" || promptFight === "Fight") {
        //player attacks enemy
        enemyHealth = enemyHealth - playerAttack;
        console.log(
            playerName + " attacked " + enemyName + ". " + enemyName + " has " + enemyHealth + " health."
        );

        // check enemy health
        if (enemyHealth <= 0) {
            window.alert("Encore! " + enemyName + " was slain!");
        } else {
            window.alert(enemyName + " has " + enemyHealth + " health.");
        }

        // enemy attacks player
        playerHealth = playerHealth - enemyAttack;
        console.log(
            enemyName + " attacked " + playerName + ". " + playerName + " has " + playerHealth + " health."
        );

        // check player health
        if (playerHealth <= 0) {
            window.alert("Game over! " + playerName + " has died!");
        } else {
            window.alert(playerName + " has " + playerHealth + " health.");
        }

    } else if (promptFight === "skip" || promptFight === "SKIP" || promptFight === "Skip") {
        var confirmSkip = window.confirm("If you skip this fight, you'll lose 2 gold. Are you sure you?");

        if (confirmSkip) {
            window.alert(playerName + " has decided to skip this fight.");
            playerMoney = playerMoney - 2;
        }else {
            fight();
        }

    } else {
        window.alert("Please type a valid option. Try again.");
    }
};

fight();