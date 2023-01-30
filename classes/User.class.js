class User{
    id;
    firstname;
    lastname;
    login;
    password;
    rank;
    email;
    constructor(firstname,lastname,login, password,rank,email,id=0){
        this.firstname=firstname;
        this.lastname=lastname;
        this.email=email;
        this.rank=rank;
        this.password=password;
        this.login=login;
        this.id=id
    }
}

module.exports=User;