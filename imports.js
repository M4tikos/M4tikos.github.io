import items from './data/items_atlas.json' with { type: 'json' };
window.dispatchEvent(new CustomEvent('itemsLoaded', { detail: items }));

import shaped from './data/craftingShaped.json' with { type: 'json' };
window.dispatchEvent(new CustomEvent('shapedRecipesLoaded', { detail: shaped }));

import shapeless from './data/craftingShapeless.json' with { type: 'json' };
window.dispatchEvent(new CustomEvent('shapelessRecipesLoaded', { detail: shapeless }));

import smelting from './data/smelting.json' with { type: 'json' };
window.dispatchEvent(new CustomEvent('smeltingRecipesLoaded', { detail: smelting }));