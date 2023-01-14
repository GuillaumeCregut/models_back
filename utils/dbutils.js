const connection=require('../dbconfig');
const db=connection.promise();

const dbquery = (action,sql,params)=>{
    console.log(params,sql)
    return db.query(sql,params)
        .then(([result])=>{
            switch(action){
                case 'add' : return result.insertId;
                        break;
                case "update" : console.log('update')
                        break;
                case "get" : return result;
                        break;
                case "delete":  console.log('delete')
                        break;
                default :

            }
    }) 
    .catch((err)=>{
        console.error(err);
        return 0;
    })
}

const dbAdd=(sql,params)=>{

}


module.exports={
    dbquery
}