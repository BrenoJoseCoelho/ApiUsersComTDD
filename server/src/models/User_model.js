const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017",{useNewUrlParser: true, useUnifiedTopology: true});

const UserSchema = new mongoose.Schema({

    name: {type: String, Required: true},
    email: {type: String, Required: true},
    age: {type: Number,  minimum: 18, Required: true}

});

const UserModel = mongoose.model("User", UserSchema);

class User{

    name;
    email;
    age;

    constructor(name, email, age){

        this.name = name;
        this.email = email;
        this.age = age;

    }

    async create() {
        await UserModel.create(this);
    }

    static async getAll(){
        return await UserModel.find();
    }

    static async deleteUser(name){
        return await UserModel.findOneAndDelete({ name: name });
    }

    static async getByName(name){
        return await UserModel.find({ name: name });
    }

    static async edit(nameUser,name, email, age) {
        const procuraUser = await UserModel.find({ name: nameUser });
        
        if(procuraUser == ''){
            let doc='User not found';
            return doc;
        }else{
            const filter = {name: nameUser};
            const infoUser = {name: name, email:email, age:age,};
            const opts = { new: true, upsert: true };
                
            await UserModel.deleteMany(filter);

            opts.new = false;
            return await UserModel.findOneAndUpdate(filter, infoUser, opts);
        }
    }

}

module.exports = { User };