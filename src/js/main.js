console.log("JS Loaded");

import GAGDATA from '/src/JSON/gags.json' assert {type: 'json'};

console.log(GAGDATA);

function CreateGagList(GAGDATA) {
    const allgags = [];

    // Iterate over each gag class and its associated gags
    for (const gagType in GAGDATA) {
        if (GAGDATA.hasOwnProperty(gagType)) {

            // Exclude Lure and Toonup
            if (gagType.toLowerCase() === "toonup" || gagType.toLowerCase() === "lure" || gagType === "trap") {
                continue;
            }
            const gags = GAGDATA[gagType];

            for (const gagName in gags) {
                if (gags.hasOwnProperty(gagName)) {
                    const gagDetails = gags[gagName];
                    if (gagDetails[1] <= 17 || gagDetails[1] > 90) {
                        allgags.push({
                            gagType: gagType,
                            gagName: gagName,
                            minDamage: gagDetails[0],
                            maxDamage: gagDetails[1],
                            orgDamage: gagDetails[2],
                            accuracy: gagDetails[3]
                        });
                    }

                }
            }
        }
    }
    return allgags;
}

const GAGLIST = CreateGagList(GAGDATA);
const enemyHealth = 200;

function generateAttackCombinations(attacks, combinationLength) {
    const combinations = [];

    function generateCombinationsHelper(currentCombination, index) {
        if (currentCombination.length === combinationLength) {
            // Calculate the total maxDamage of the current combination
            const totalMaxDamage = currentCombination.reduce((sum, attack) => sum + attack.maxDamage, 0);

            // Check if the total maxDamage equals enemyHealth
            if (totalMaxDamage === enemyHealth) {
                combinations.push([...currentCombination]);
            }
            return;
        }

        for (let i = index; i < attacks.length; i++) {
            currentCombination.push(attacks[i]);
            generateCombinationsHelper(currentCombination, i + 1);
            currentCombination.pop();
        }
    }

    generateCombinationsHelper([], 0);
    return combinations;
}

// Generate attack combinations where the total maxDamage equals enemyHealth
const combinations = generateAttackCombinations(GAGLIST, 4);

// Display attack combinations (for demonstration purposes)
console.log(combinations);