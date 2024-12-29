export class ShadowfallActor{

    constructor(actor){
        this.__validateActor(actor);
        this.actor = actor;
    }

    getName(){
        return this.actor.name;
    }

    getImage(){
        return this.actor.img;
    }

    async updateValue(path, value) {
        await this.actor.update({ "system": {[path]: value} });
    }

    getValueByPath(type, key) {
        const path = this.getPathForValue(type, key);
        if (!path) return null;
        return path.split('.').reduce((obj, key) => obj?.[key], this.actor.system);
    }

    getPathForValue(type, key) {
        const paths = {
            'health': 'general.health',
            'primary': `attributes.primary.${key}`,
            'secondary': `attributes.secondary.${key}`,
            'skill': `skills.${key}`,
            'general': `general.${key}`
        };
        return paths[type] ? paths[type] + '.value' : null;
    }

    getPrimaries(){
        return this.actor.system.attributes.primary;
    }

    getSecondaries(){
        return this.actor.system.attributes.secondary;
    }

    getSkills(){
        return this.actor.system.skills;
    }

    getCareer(){
        return this.actor.system.general.career;
    }


    __validateActor(actor){
        if(!actor || actor.type !== "character"){
            throw new Error("Invalid actor data");
        }
    }
}