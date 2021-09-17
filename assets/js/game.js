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

for (var i = 0; i < enemyNames.length; i++) {
    if (playerHealth > 0) {
        window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));
        var pickedEnemyName = enemyNames[i];
        enemyHealth = 50;
        fight(pickedEnemyName);
    }
}