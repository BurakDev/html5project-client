/// <reference types="pixi.js" />

import url from "url";
import * as furniture from "../furniture";

export default function furnitureParser(resource: PIXI.loaders.Resource, next) {
    if (resource.data == null
        || resource.type != PIXI.loaders.Resource.TYPE.JSON
        || resource.data.type == null
        || resource.data.type != "furniture") {
        next();

        return;
    }

    let furnitureData = resource.data as furniture.FurnitureData.IData;

    let loadOptions = getLoadOptions(resource);
    let spritesheetUrl = getSpritesheetUrl(resource.url, furnitureData.spritesheet);;

    this.add(spritesheetUrl, spritesheetUrl, loadOptions, (res) => {
        let furni = new furniture.Furniture(furnitureData);

        furniture.addToCache(furnitureData.name, furni);

        next();
    });
}

export function getLoadOptions(resource: PIXI.loaders.Resource): PIXI.loaders.ILoaderOptions {
    return {
        crossOrigin: resource.crossOrigin,
        loadType: PIXI.loaders.Resource.LOAD_TYPE.XHR,
        metaData: resource.metadata,
        parentResource: resource
    };
}

export function getSpritesheetUrl(resourceUrl: string, spritesheetFilename: string): string {
    let lastDashPosition = resourceUrl.lastIndexOf("/");
    let spritesheetUrl = resourceUrl.substring(0, lastDashPosition + 1) + spritesheetFilename;

    return spritesheetUrl;
}