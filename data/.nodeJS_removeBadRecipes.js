const fs = require('fs')
const recipes = fs.readdirSync('./recipes');


const types = [
    'minecraft:stonecutting',
    'minecraft:campfire_cooking',
    'minecraft:smoking',
    'minecraft:blasting'
];

const filesToRemove = [];

//process recipes
for (const recipe of recipes) {
    const recipeData = require('./recipes/' + recipe);

    if (types.includes(recipeData.type)) {
        filesToRemove.push(recipe);
    }
};

for (const file of filesToRemove) {
    console.log(file);
    fs.unlinkSync('./recipes/' + file);
}

