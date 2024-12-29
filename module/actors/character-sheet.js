import { CountableInput } from "../forms/CountableInput.js";
import { EditableInput } from "../forms/EditableInput.js";
import { CareerSelect } from "../forms/CareerSelect.js";
import { ShadowfallActor } from "./ShadowfallActor.js";
import { SHADOWFALL } from "../config.js";

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class ShadowfallActorSheet extends ActorSheet {
    constructor(...args) {
		super(...args);
	}

    static get defaultOptions() {
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: ["shadowfall", "sheet", "actor"],
            width: 800,
            height: 800, // Set the minimum height here
            resizable: false
        });
    }

    get template() {
		const path = 'systems/shadowfallrpg/templates/actors/';
		return `${path}${this.actor.type}-sheet.html`;
	}

    async getData(){
        const context = await super.getData();
        
        // Créer l'acteur Shadowfall
        const shadowfallActor = new ShadowfallActor(this.actor);
        
        // Ajouter les données au contexte
        context.shadowfallActor = shadowfallActor;
        context.careers = SHADOWFALL.careers || {};
        return context;
    }

    /**
     * Génération de l'interactivité 
     */
    activateListeners(html) {
        super.activateListeners(html);

        const tabs = html.find('#shf-actor-tabs').get(0);
        tabs && this._tabsListeners(tabs);

        // Ajouter les listeners pour les éléments countable
        html.find('.shf-countable').each((i, el) => { 
            new CountableInput(el, this.actor);
        });

        html.find('.shf-editable-input').each((i, el) => {
            new EditableInput(el, this.actor);
        });

        html.find('.shf-select').each((i, el) => {
            new CareerSelect(el, this.actor);
        });
    }

    /** ------------------------------------- ShadowFall RPG Functions ----------------------------  */
    _tabsListeners(tabs){
        tabs.querySelectorAll('.skf-tab-link').forEach((el) => {
            el.addEventListener('click', () => {
                tabs.querySelector('.skf-tab-link.active')?.classList.remove('active');
                el.classList.add('active');
                document.querySelector('.shf-tab-content.active')?.classList.remove('active');
                document.querySelector(`#${el.dataset.target}`)?.classList.add('active');
            });
        });
    }
}