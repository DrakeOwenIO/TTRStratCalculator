console.log("JS Loaded");

import GAGDATA from '/src/JSON/gags.json' assert {type: 'json'};

console.log(GAGDATA);

function CreateGagList(GAGDATA) {
    const allgags = [];

    // Iterate over each gag class and its associated gags
    for (const gagType in GAGDATA) {
        if (GAGDATA.hasOwnProperty(gagType)) {

            // Exclude Lure and Toonup
            if (gagType.toLowerCase() === "toonup" || gagType.toLowerCase() === "lure") {
                continue;
            }
            const gags = GAGDATA[gagType];

            for (const gagName in gags) {
                if (gags.hasOwnProperty(gagName)) {
                    const gagDetails = gags[gagName];
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
    return allgags;
}

const GAGLIST = CreateGagList(GAGDATA);

console.log(GAGLIST);