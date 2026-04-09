const fs = require('fs')
const recipes = fs.readdirSync('./recipes');
const itemTags = require('./tags.json');

const shapelessCraftingRecipes = [];
const shapedCraftingRecipes = [];
const smeltingRecipes = [];

const typeMap = new Set();

function convertName(text) {
    if (!text.startsWith('minecraft:')) return text;
    return text.replace("minecraft:", "").split("_").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
}

//process recipes
for (const recipe of recipes) {
    const recipeData = require('./recipes/' + recipe);

    typeMap.add(recipeData.type);

    switch (recipeData.type) {
        case "minecraft:crafting_shapeless":
            delete recipeData.type;
            delete recipeData.category;
            delete recipeData.group;
            
            for (let i=0; i < recipeData.ingredients.length; i++) {
                const item = recipeData.ingredients[i];

                if (Array.isArray(item)) {
                    for (let j=0; j < item.length; j++) item[j] = convertName(item[j]);
                } else {
                    recipeData.ingredients[i] = (item[0]=="#")
                        ? itemTags[item]
                        : convertName(item)
                }
            }

            recipeData.from = recipeData.ingredients
            delete recipeData.ingredients;
            recipeData.to = convertName(recipeData.result.id);
            recipeData.count = recipeData.result.count;
            delete recipeData.result;
            
            shapelessCraftingRecipes.push(recipeData);
            break;

        case "minecraft:crafting_shaped":
            delete recipeData.type;
            delete recipeData.category;
            delete recipeData.group;
            delete recipeData.show_notification;

            for (const [char, item] of Object.entries(recipeData.key)) {
                if (Array.isArray(item)) {
                    for (let j=0; j < item.length; j++) item[j] = convertName(item[j]);
                } else {
                    recipeData.key[char] = (item[0]=="#")
                        ? itemTags[item]
                        : convertName(item)
                }
            }

            const newPattern = recipeData.pattern.map(row => [...row]);

            for (const row of newPattern) {
                for (let i = 0; i < row.length; i++) {
                    row[i] = recipeData.key[row[i]] || " "; 
                }
            }

            recipeData.pattern = newPattern;
            delete recipeData.key;
            recipeData.to = convertName(recipeData.result.id);
            recipeData.count = recipeData.result.count;
            delete recipeData.result;

            shapedCraftingRecipes.push(recipeData);
            break;
            
        case "minecraft:smelting":
            delete recipeData.type;
            delete recipeData.category;
            delete recipeData.group;
            delete recipeData.cookingtime;
            delete recipeData.experience;
            
            let ing = recipeData.ingredient;
            if (Array.isArray(ing)) {
                ing.forEach( (v, i) => {
                    ing[i] = (v[0]=="#")
                        ? itemTags[v]
                        : convertName(v);
                });
                recipeData.from = ing;

            } else {
                recipeData.from = (ing[0]=="#")
                    ? itemTags[ing]
                    : [convertName(ing)]
            }

            delete recipeData.ingredient;
            recipeData.to = convertName(recipeData.result.id);
            delete recipeData.result;

            smeltingRecipes.push(recipeData);
            break;

        }
};
fs.writeFileSync('craftingShapeless.json', JSON.stringify(shapelessCraftingRecipes, null, 0));
fs.writeFileSync('craftingShaped.json', JSON.stringify(shapedCraftingRecipes, null, 0));
fs.writeFileSync('smelting.json', JSON.stringify(smeltingRecipes, null, 0));

console.log(typeMap);