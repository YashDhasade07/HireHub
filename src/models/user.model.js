

export default class UserModel{
    constructor(id,name,email,password){
        this.id = id,
        this.name = name,
        this.email = email,
        this.password = password
    }

    static get(){
        return users;
    }

    static addUser(user){
        let newUser = new UserModel(users.length+1,user.name,user.email,user.password);
        // console.log(newUser);
        users.push(newUser);
    }

    static checkUser(user){
      const result =  users.find((u)=>u.email==user.email && u.password ==user.password);
      return result;
    }
}

let users=[];
