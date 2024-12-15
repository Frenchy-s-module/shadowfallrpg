import { ShadowfallActorSheet } from "./actors/character-sheet.js";
import { getModuleConfigration } from "./config.js";

const config = getModuleConfigration();

Hooks.once("init", () => {
    console.warn("[SHADOWFALL] - Initialisation du système");

    Actors.unregisterSheet('core', ActorSheet); // Register Character Sheet
    Actors.registerSheet(config.moduleId, ShadowfallActorSheet, {
		types: ['character'],
		makeDefault: true,
	});
});

// TODO deplacer dans un handler
Handlebars.registerHelper( 'loadAsset', function(name) {
   return `${config.assetPath}${name}`;
});