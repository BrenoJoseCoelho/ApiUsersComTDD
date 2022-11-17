const { StatusCodes } = require('http-status-codes');
const { User } = require('../models/User_model');

exports.getUsers = async (ctx) => {

    const users = await User.getAll();

    ctx.response.body = users;
    ctx.response.status = StatusCodes.OK;
};

exports.createUser = async (ctx) => {

    
    const dataUser = {name, email, age} = ctx.request.body;

   var user = new User(dataUser.name, dataUser.email, dataUser.age);

    if(dataUser.age < 18){
        ctx.response.status = StatusCodes.BAD_REQUEST;
        ctx.response.message = "Age under 18!";
    }else{
        await user.create();
        ctx.response.message = "User created!";
        ctx.response.status = StatusCodes.CREATED;       
    }

};

exports.editaUser = async (ctx) => {

    const nameUser = ctx.params.nameid;
    const {name,email,age} = ctx.request.body;


    if(age < 18){
        ctx.response.status = StatusCodes.BAD_REQUEST; 
        ctx.response.message = 'Age under 18';
    }else{
        const user = await User.edit(nameUser, name, email, age);
        if (user != "User not found") {
            ctx.response.status = StatusCodes.OK;
            ctx.response.message = 'User changed successfully';
        
        } else {
            ctx.response.status = StatusCodes.NOT_FOUND;
            ctx.response.message = 'User not found';
        }
    }

};

exports.deleteUser = async (ctx) => {
    const name = ctx.params.name;

    const user = await User.deleteUser(name);

    if(!user){
        ctx.response.status = StatusCodes.BAD_REQUEST;
        ctx.response.messafe = "User not found"; 
    }else{
        ctx.response.status = StatusCodes.OK;
        ctx.response.message = "User deleted";
    }
};

exports.getByName = async (ctx) => {

    const { name } = ctx.request.params;

    const user = await User.getByName(name);

    if(user.length === 0){
        ctx.response.status = StatusCodes.NOT_FOUND;
        ctx.response.message = "User not found";
    }else{
        ctx.response.status = StatusCodes.OK;
        ctx.response.body = user;
    }

};
