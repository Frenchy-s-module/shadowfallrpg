let configuration = null;
const moduleId = 'shadowfallrpg'

export function getModuleConfigration(){

    // retrive from cache data
    if(configuration){ return configuration;}
    const templatePath =  `/systems/${moduleId}/templates/`;
    const assetPath    =  `/systems/${moduleId}/assets/images/`;

    configuration = {
        moduleId: moduleId,
        templatePath: templatePath,
        assetPath: assetPath,
    };
    return configuration;
}
