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
        return this.actor.system.attributes.primary[key]?.value;
    }

    getSecondaryByLabel(key){
        return this.actor.system.attributes.secondary[key]?.value;
    }

    getSkillByLabel(key){
        return this.actor.system.skills[key]?.value;
    }

    getDataByLabel(key){
        return this.actor.system.general[key]?.value;
    }

    async updateValue(path, value) {
        const updateData = {};
        updateData[path] = value;
        return await this.actor.update({ "system": updateData });
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