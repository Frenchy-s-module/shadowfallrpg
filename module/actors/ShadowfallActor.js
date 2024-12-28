export class ShadowfallActor{

    constructor(actor){
        this.__validateActor(actor);
        this.actor = actor;
    }

    getName(){
        return this.actor.name;
    }

    getLife(){
        return this.actor.system.header.health.value ?? 0;
    }

    getImage(){
        return this.actor.img;
    }

    getPrimaryByLabel(key){
        console.warn(this.actor.system.attributes.primary)
        console.warn(this.actor.system.attributes.primary[key])
        return this.actor.system.attributes.primary[key]?.value;
    }

    getSecondaryByLabel(key){
        return this.actor.system.attributes.secondary[key];
    }

    getSkillByLabel(key){
        return this.actor.system.skills[key];
    }

    getDataByLabel(key){
        return this.actor.system.general[key]?.value;
    }

    __validateActor(actor){
        if(!actor || actor.type !== "character"){
            throw new Error("Invalid actor data");
        }
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
}