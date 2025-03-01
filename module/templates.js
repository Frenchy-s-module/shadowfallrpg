/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
    // Définir le chemin de base des templates
    const templatePath = "systems/shadowfallrpg/templates";
    
    try {
        // Récupérer la liste des dossiers
        const rootSearch = await FilePicker.browse("data", templatePath);
        let allTemplates = [];
        
        // Extensions supportées
        const validExtensions = ['.html', '.hbs'];
        const isTemplateFile = (file) => validExtensions.some(ext => file.endsWith(ext));
        
        // Parcourir chaque dossier trouvé
        for (const dir of rootSearch.dirs) {
            const dirFiles = await FilePicker.browse("data", dir);
            
            // Ajouter les fichiers template trouvés
            allTemplates = allTemplates.concat(
                dirFiles.files.filter(isTemplateFile)
            );
            
            // Chercher dans les sous-dossiers (partials)
            if (dirFiles.dirs.length > 0) {
                for (const subDir of dirFiles.dirs) {
                    const subDirFiles = await FilePicker.browse("data", subDir);
                    allTemplates = allTemplates.concat(
                        subDirFiles.files.filter(isTemplateFile)
                    );
                }
            }
        }
        
        return loadTemplates(allTemplates);
    } catch (error) {
        console.error("Error loading templates:", error);
        throw error;
    }
};


export const registerHelpers = (config) => {
    // Register Handlebars helpers
    Handlebars.registerHelper('loadAsset', function(name) {
        return `${config.assetPath}${name}`;
    });

    Handlebars.registerHelper('default', function(value, defaultValue) {
        return value != null ? value : defaultValue;
    });

    // Helper simple pour appeler des méthodes et retourner leur valeur
    Handlebars.registerHelper('shadowfallCall', function(object, methodName, ...args) {
        if (object && typeof object[methodName] === 'function') {
            return object[methodName].apply(object, args);
        }
        return '';
    });

    // Helper block pour itérer sur les résultats d'une méthode
    Handlebars.registerHelper('shadowfallEach', function(object, methodName, ...args) {
        if (object && typeof object[methodName] === 'function') {
            const result = object[methodName].apply(object, args);
            const options = args[args.length - 1];
            return options.fn(result);
        }
        return '';
    });

    // Helper pour obtenir le chemin d'une valeur
    Handlebars.registerHelper('shadowfallPath', function(actor, type, key) {
        if (!actor) return '';
        return actor.getPathForValue(type, key);
    });

    // Helper pour formater le label des compétences
    Handlebars.registerHelper('formatSkillLabel', function(label, ability) {
        return `${label} (${ability})`;
    });

    // Helper pour la comparaison dans les templates
    Handlebars.registerHelper('eq', function(a, b) {
        return a === b;
    });
};