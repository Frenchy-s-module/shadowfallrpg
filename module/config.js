let configuration = null;
const moduleId = 'shadowfallrpg'

export const SHADOWFALL = {};

async function loadCareerData() {
    try {
        const response = await fetch(`/systems/${moduleId}/data/careers.json`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error loading career data:", error);
        return { careers: {} };
    }
}

export async function initializeConfig() {
    const careerData = await loadCareerData();
    SHADOWFALL.careers = careerData.careers;
}

export function getModuleConfigration() {
    if (configuration) { return configuration; }
    
    const templatePath = `/systems/${moduleId}/templates/`;
    const assetPath = `/systems/${moduleId}/assets/images/`;

    configuration = {
        moduleId: moduleId,
        templatePath: templatePath,
        assetPath: assetPath,
        SHADOWFALL: SHADOWFALL
    };
    
    return configuration;
}
