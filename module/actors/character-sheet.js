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

    getData(){
        const data = super.getData();
        return data;
    }

    /**
     * Génération de l'interactivité 
     */
    activateListeners(html) {
        super.activateListeners(html);

        const tabs = html.find('#shf-actor-tabs').get(0);
        tabs && this._tabsListeners(tabs);
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