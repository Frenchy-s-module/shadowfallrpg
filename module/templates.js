/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
	// Define template paths to load
	const templatePaths = [
		// Actor Sheet Partials
		'systems/shadowfallrpg/templates/actors/partials/header.html',
		'systems/shadowfallrpg/templates/actors/partials/navigation.html',
		'systems/shadowfallrpg/templates/actors/partials/attributes.html',
		'systems/shadowfallrpg/templates/actors/partials/inventory.html',
		'systems/shadowfallrpg/templates/actors/partials/background.html',

		'systems/shadowfallrpg/templates/actors/partials/attribute-line.html',
		'systems/shadowfallrpg/templates/actors/partials/inventory-weapon-line.html',
		'systems/shadowfallrpg/templates/actors/partials/inventory-object-line.html',


		'systems/shadowfallrpg/templates/forms/partials/countable-input.html',
	];

	// Load the template parts
	return loadTemplates(templatePaths);
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

    // Helper pour formater le label des compétences
    Handlebars.registerHelper('formatSkillLabel', function(label, ability) {
        return `${label} (${ability})`;
    });
};