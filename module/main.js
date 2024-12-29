import { ShadowfallActorSheet } from "./actors/character-sheet.js";
import { getModuleConfigration, initializeConfig } from "./config.js";
import { preloadHandlebarsTemplates, registerHelpers } from "./templates.js";

Hooks.once("init", async () => {
    console.warn("[SHADOWFALL] - Initialisation du système");

    await initializeConfig();
    const config = getModuleConfigration();
    
    preloadHandlebarsTemplates();
    registerHelpers(config);

    Actors.unregisterSheet('core', ActorSheet);
    Actors.registerSheet(config.moduleId, ShadowfallActorSheet, {
        types: ['character'],
        makeDefault: true,
    });
});