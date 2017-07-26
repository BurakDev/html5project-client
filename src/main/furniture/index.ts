import * as FurnitureData from "./furnitureData";
import { default as Furniture } from "./Furniture";
import { default as FurnitureSprite } from "./FurnitureSprite";

export {
    FurnitureData,
    Furniture,
    FurnitureSprite
};

let furnitureCache: { [key: string]: Furniture } = { };

export function addToCache(key: string, furniture: Furniture) {
    if (furnitureCache[key] == null) {
        furnitureCache[key] = furniture;
    }
    else {
        throw "Furniture already in cache!";
    }
}

export function fromCache(key: string): Furniture {
    if (furnitureCache[key] != null) {
        return furnitureCache[key];
    }
    else {
        throw "Furniture not in cache!";
    }
}

export function createSprite(key: string): FurnitureSprite {
    let furniture = fromCache(key);

    return new FurnitureSprite(furniture);
}

export function clearCache() {
    furnitureCache = {};
}