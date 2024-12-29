import { ShadowfallActor } from "../actors/ShadowfallActor.js";

export class EditableInput {
    constructor(element, actor) {
        this.element   = element;
        this.actor   = new ShadowfallActor(actor);
        this.path    = element.dataset.path;

        this.keystrokeSound = new Audio("/systems/shadowfallrpg/assets/sounds/keypress.mp3");
        this.keystrokeSound.volume = 0.2;

        this._initializeListeners();
    }

    _initializeListeners() {
        this.element.addEventListener('focusout', () => this.setValue());
        this.element.addEventListener('keydown', (e) => this._onKeyPress(e));
    }

    getValue() {
        return this.element.value ?? this.element?.textContent;
    }

    setValue() { 
        this.actor.updateValue(this.path, this.getValue());
    }

    _onKeyPress(event) {
        if (event.key.length === 1 || event.key === 'Backspace' || event.key === 'Delete') {
            this.keystrokeSound.cloneNode().play();
        }
    }

}