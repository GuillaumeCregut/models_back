class Orders{
    id;
    provider_id;
    provider_name;
    owner_id;
    reference;
    models;
    constructor(id,provider,owner,reference){
        this.id=id;
        this.reference=reference;
        this.owner_id=owner;
        this.provider_id=provider;
    }

    setProviderName (name){
         this.provider_name=name;
    }

    addModels(model){
        this.models.push(model);
    }

    removeModel(id){
        this.models=this.models.filter((item)=>item.id!==id);
    }

    updateModel(id,model){
        this.models=this.models.map((item)=>{
            if(item.id===id)
                return model;
            else
                return item;
        })
    }

}

module.exports=Orders;