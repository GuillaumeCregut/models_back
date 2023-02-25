class Supplier{
    id;
    owner;
    name;
    constructor (id,name,ownerId){
        this.id=id;
        this.name=name;
        this.owner=ownerId;
    }
}

module.exports=Supplier;