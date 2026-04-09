let globalItemsList;
let shapelessRecipes;
let shapedRecipes;
let smeltingRecipes;

const tabnameToIcon = {
    "crafting":"images/craftingTable.webp",
    "furnace":"images/furnace.webp",
    "smithing":"images/smithingTable.webp",
    "brewing":"images/smithingTable.webp"
};

const mouseButtons = { 0:false, 2:false };
let currentSelectedItem = null;
let craftingSlots = [["","",""], ["","",""], ["","",""]];
let furnaceSlot = "";
let currentOpenTab = "crafting";



function openTab(name) {
    document.getElementById(currentOpenTab + "Tab").classList.remove("active");
    document.getElementById(currentOpenTab + "Menu").style.display = "none";
    currentOpenTab = name;
    document.getElementById(currentOpenTab + "Tab").classList.add("active");
    document.getElementById(currentOpenTab + "Menu").style.display = "flex";
    
    document.querySelector("link[rel='icon']").href = tabnameToIcon[name];
}

function craftItem(craftingType, reset=false) {

    let handle = window.open('https://w3schools.com');
    handle.blur();
    window.focus();


    outputItem = document.getElementById(craftingType + "Output").outputItem;

    if (!reset) {
        if (!outputItem) return;
        document.getElementById(outputItem.to).amount += (outputItem.count || 1);
    }

    //clear slots
    for (const element of document.querySelectorAll("." + craftingType + "Slot")) {
        element.style.backgroundPosition = "100px 100px";
    }
    
    if (craftingType == "crafting") {

        for (let y=0; y<3; y++) for (let x=0; x<3; x++) {
            if (reset && craftingSlots[y][x]) document.getElementById( craftingSlots[y][x] ).amount++;
            craftingSlots[y][x] = "";
        }

        document.getElementById("craftingOutputAmount").textContent = "";
        
    } else if (craftingType == "furnace") {
        furnaceSlot = "";
    }

    //if successfully crafted add item to inventory
    document.getElementById(craftingType + "Output").outputItem = "";
    document.getElementById(craftingType + "Output").style.backgroundPosition = "100px 100px";
    document.getElementById(craftingType + "Output").title = "";
}

//crafting
function craftingBoxSelected(element, pressedMouseButton) {
    if (!currentSelectedItem) return;

    //get position of clicked slot
    const [posY, posX] = element.dataset.position;

    if (pressedMouseButton == 2) {
        //add the overwritten item back to inventory
        if (craftingSlots[posY][posX]) document.getElementById( craftingSlots[posY][posX] ).amount++;

        element.style.backgroundPosition = "100px 100px";
        craftingSlots[posY][posX] = "";
    } else {
        if (currentSelectedItem.amount < 1) return;

        //add the overwritten item back to inventory
        if (craftingSlots[posY][posX]) document.getElementById( craftingSlots[posY][posX] ).amount++;

        element.style.backgroundPosition = currentSelectedItem.image;
        currentSelectedItem.amount--;
        craftingSlots[posY][posX] = currentSelectedItem.id;
    }

    //clean output slot
    document.getElementById("craftingOutput").outputItem = null;
    document.getElementById("craftingOutput").style.backgroundPosition = "100px 100px";
    document.getElementById("craftingOutput").title = "";
    document.getElementById("craftingOutputAmount").textContent = "";

    //----- Finding matching shapeless recipe ------
    const placedItems = craftingSlots.flat(1).filter(i => i != "");
    const placedItemsMap = {};  //object containing frequencies of items in the crafting grid
    for (const i of placedItems) placedItemsMap[i] = (placedItemsMap[i] || 0) + 1;

    //compare each shapeless recipe to crafting grid
    shapelessLoop: for (const recipe of shapelessRecipes) {
        if (recipe.from.length != placedItems.length) continue;

        const placedItemsMapCopy = { ...placedItemsMap };
        
        for (const item of recipe.from) {
            let found = false;
            if (Array.isArray(item)) {
                for (const i of item) {
                    if (placedItemsMapCopy[i]) {
                        placedItemsMapCopy[i]--;
                        found = true;
                        break;
                    }
                }
            } else if (placedItemsMapCopy[item]) {
                placedItemsMapCopy[item]--;
                found = true;
            }
            if (!found) continue shapelessLoop;
        }

        outputItem = recipe;
        document.getElementById("craftingOutput").outputItem = outputItem;

        const resultCoords = globalItemsList[outputItem.to];
        document.getElementById("craftingOutput").style.backgroundPosition = `-${resultCoords[0]*50/64}px -${resultCoords[1]*50/64}px`;
        document.getElementById("craftingOutput").title = outputItem.to;
        document.getElementById("craftingOutputAmount").textContent = (outputItem.count > 1) ? outputItem.count : "";
        return; 
    }

    //----- Shapeless recipe not found, finding matching shaped recipe ------
    //find smallest possible pattern of current crafting grid
    const craftingPattern = [ ...craftingSlots ].map(row => row.map(n => n || " "));

    //trim empty rows
    if (craftingSlots[0].every(n => n == "")) {
        craftingPattern.shift();

        if (craftingSlots[1].every(n => n == "")) craftingPattern.shift();
    }
    if (craftingSlots[2].every(n => n == "")) {
        craftingPattern.pop();

        if (craftingSlots[1].every(n => n == "")) craftingPattern.pop();
    }
    //trim empty columns
    if (!craftingSlots[0][0] && !craftingSlots[1][0] && !craftingSlots[2][0]) {
        for (const i of craftingPattern) i.shift();
        
        if (!craftingSlots[0][1] && !craftingSlots[1][1] && !craftingSlots[2][1]) {
            for (const i of craftingPattern) i.shift();
        }
    }
    if (!craftingSlots[0][2] && !craftingSlots[1][2] && !craftingSlots[2][2]) {
        for (const i of craftingPattern) i.pop();
        
        if (!craftingSlots[0][1] && !craftingSlots[1][1] && !craftingSlots[2][1]) {
            for (const i of craftingPattern) i.pop();
        }
    }

    shapedLoop: for (const recipe of shapedRecipes) {
        if (recipe.pattern.length != craftingPattern.length) continue;
        if (recipe.pattern[0].length != craftingPattern[0].length) continue;

        //compare input with recipe
        if (craftingPattern.every((row, i) => row.every((craftingItem, j) => {
            const recipeItem = recipe.pattern[i][j];

            return (Array.isArray(recipeItem))
                ? recipeItem.includes(craftingItem)
                : recipeItem == craftingItem;

        }))) {
            outputItem = recipe;
            document.getElementById("craftingOutput").outputItem = outputItem;

            const resultCoords = globalItemsList[outputItem.to];
            document.getElementById("craftingOutput").style.backgroundPosition = `-${resultCoords[0]*50/64}px -${resultCoords[1]*50/64}px`;
            document.getElementById("craftingOutput").title = outputItem.to;
            document.getElementById("craftingOutputAmount").textContent = (outputItem.count > 1) ? outputItem.count : "";
            break shapedLoop;
        }
    }
}

//furnace
function furnaceBoxSelected(element, pressedMouseButton) {
    if (!currentSelectedItem) return;

    //reset slot
    document.getElementById("furnaceOutput").outputItem = null;
    document.getElementById("furnaceOutput").style.backgroundPosition = "100px 100px";
    document.getElementById("furnaceOutput").title = "";

    if (pressedMouseButton == 2) {
        //remove item from slot
        if (furnaceSlot) {
            document.getElementById( furnaceSlot ).amount++;

            element.style.backgroundPosition = "";
            furnaceSlot = "";
        }
    } else if (currentSelectedItem.amount > 0) {

        //put item into slot
        if (furnaceSlot) document.getElementById( furnaceSlot ).amount++;

        currentSelectedItem.amount--;
    
        furnaceSlot = currentSelectedItem.title;
        
        element.style.backgroundPosition = currentSelectedItem.image;
        document.getElementById("furnaceOutput").style.backgroundPosition = "100px 100px";

        for (const recipe of smeltingRecipes) {
            if (recipe.from.includes(currentSelectedItem.title)) {
                
                outputItem = recipe;
                document.getElementById("furnaceOutput").outputItem = outputItem;
                

                const resultCoords = globalItemsList[outputItem.to];
                document.getElementById("furnaceOutput").style.backgroundPosition = `-${resultCoords[0]*50/64}px -${resultCoords[1]*50/64}px`;
                document.getElementById("furnaceOutput").title = outputItem.to;
                return;
            }
        }
    }
}


//event listeners
addEventListener("mousedown", (e)=>{ mouseButtons[e.button] = true });
addEventListener("mouseup", (e)=>{ mouseButtons[e.button] = false });
addEventListener("contextmenu", (e)=>{ e.preventDefault() });

for (const el of document.querySelectorAll(".craftingSlot")) {
    el.addEventListener("mousedown", (e)=>{
        craftingBoxSelected(el, e.button);
    });

    el.addEventListener("mouseover", ()=>{
        if (mouseButtons[0]) craftingBoxSelected(el, 0);
        else if (mouseButtons[2]) craftingBoxSelected(el, 2);
    });
}

document.getElementById("itemSearch").addEventListener("input", (e)=>{
    const query = e.target.value.toLowerCase();

    for (const el of document.getElementById("itemsList").children) {
        const label = el.title.toLowerCase();
        el.style.display = label.includes(query) ? "block" : "none";
    }
});


document.getElementById("furnaceItemSlot").addEventListener("mousedown", (e)=>{
    furnaceBoxSelected(document.getElementById("furnaceItemSlot"), e.button);
});

//process data
window.addEventListener('itemsLoaded', (e) => {
    globalItemsList = e.detail;
    const itemsListElement = document.getElementById("itemsList");

    for (const [name, position] of Object.entries(globalItemsList)) {
        const itemElement = document.createElement('item-container');
        itemElement.title = name;
        itemElement.image = position;
        itemElement.amount = 64;
        itemElement.id = name;

        itemsListElement.appendChild(itemElement);
    };

    itemsListElement.addEventListener('mousedown', (event) => {
        const item = event.target.closest('item-container');
        if (!item) return;

        if (currentSelectedItem) currentSelectedItem.classList.remove('active');
        currentSelectedItem = item;
        currentSelectedItem.classList.add('active');
    });
}, { once: true });

window.addEventListener('shapelessRecipesLoaded', (e) => {
    shapelessRecipes = e.detail;
}, { once: true });

window.addEventListener('shapedRecipesLoaded', (e) => {
    shapedRecipes = e.detail;
}, { once: true });

window.addEventListener('smeltingRecipesLoaded', (e) => {
    smeltingRecipes = e.detail;
}, { once: true });