class Model{
    id;
    name;
    category;
    period;
    reference;
    scale;
    builder;
    brand;
    //Optionnals values
    picture;
    link;
    //correlated values
    categoryName;
    periodName;
    scaleName;
    builderName;
    brandName;

    constructor (id,name,brand,builder,category,period,reference,scale){
        this.id=id;
        this.name=name;
        this.brand=brand;
        this.builder=builder;
        this.category=category;
        this.period=period;
        this.reference=reference;
        this.scale=scale;
    }
    setPicture(link){
        this.picture=link;
    }
    setLink(link){
        this.link=link;
    }
    setCategoryName(name){
        this.categoryName=name;
    }
    setPeriodName(name){
        this.periodName=name;
    }
    setScalName(name){
        this.scaleName=name;
    }
    setBuilderName(name){
        this.builderName=name;
    }
    setBrandName(name){
        this.brandName=name;
    }
}