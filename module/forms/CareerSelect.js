import { ShadowfallActor } from "../actors/ShadowfallActor.js";
import { SHADOWFALL } from "../config.js";

export class CareerSelect {
    constructor(element, actor) {
        this.element = element;
        this.actor = new ShadowfallActor(actor);
        this.path = element.dataset.path;
        
        this._initializeListeners();
    }

    _initializeListeners() {
        this.element.addEventListener('change', (e) => this._onChange(e));
    }

    _onChange(event) {
        this.actor.updateValue(this.path, event.target.value);
    }

    static get defaultOptions() {
        return {
            careers: SHADOWFALL.careers
        };
    }
}
