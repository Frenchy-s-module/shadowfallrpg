import { ShadowfallActorSheet } from "./actors/character-sheet.js";
import { getModuleConfigration } from "./config.js";
import { preloadHandlebarsTemplates, registerHelpers } from "./templates.js";

const config = getModuleConfigration();

Hooks.once("init", () => {
    console.warn("[SHADOWFALL] - Initialisation du système");

    preloadHandlebarsTemplates();
    registerHelpers(config);

    Actors.unregisterSheet('core', ActorSheet); // Register Character Sheet
    Actors.registerSheet(config.moduleId, ShadowfallActorSheet, {
		types: ['character'],
		makeDefault: true,
	});

    
});