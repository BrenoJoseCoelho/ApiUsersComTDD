<template >
    <div class="container">
        <div id="botaonovo"> <router-link :to="{name: 'CreateUser'}"><button class="button is-info">Novo</button></router-link></div>
        
        
                
        <div id="tabela">
            <br>
            <h1 id="tituloLista">Lista de Usuarios:</h1><br>
            <table class="table" id="tabelaUser">
            <thead>
                <tr>
                <th style="text-align: center;">Nome</th>
                <th style="text-align: center;">E-mail</th>
                <th style="text-align: center;">Idade</th>
                <th style="text-align: center;"> Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.name">
                    <td>{{user.name}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.age }}</td> 
                    <td> 
                        <router-link :to="{name: 'UserEdit', params:{name: user.name}}"><button class="button is-success">Editar</button></router-link> | 
                        <button class="button is-danger" @click="showModalUser(user.name)">Deletar</button></td>
                </tr>
            </tbody>
            </table>

            <div :class="{modal: true, 'is-active': showModal}">
                <div class="modal-background"></div>
                <div class="modal-content">
                    
                    <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                        Você quer realmente deletar este usuário?
                        </p>
                    </header>
                    <footer class="card-footer">
                        <a href="#" class="card-footer-item" @click="hideModal()">Cancelar</a>
                        <a href="#" class="card-footer-item" @click="deleteUser()">Sim</a>
                    </footer>
                    </div>

                </div>
                <button class="modal-close is-large" aria-label="close" @click="hideModal()"></button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    created(){

        axios.get("http://localhost:4000/users").then(res => {
            console.log(res);
            this.users = res.data;
        }).catch(err => {
            console.log(err);
        })
        console.log("OLÁ");
    },
    data()
    {
        return {
            users: [],
            showModal: false,
            name: ""
        }
    },
    methods: {
        hideModal(){
            this.showModal = false;
        },
        showModalUser(name){
            this.deleteUserName = name;
            this.showModal = true;
        },
        deleteUser(){

            axios.delete("http://localhost:4000/users/"+this.deleteUserName).then(res => {
                console.log(res);
                this.showModal = false;
                this.users = this.users.filter(u => u.name != this.deleteUserName);
            }).catch(err => {
                console.log(err);
                this.showModal = false;
            });
        }
    }
}
</script>

<style scoped>
    #tabelaUser{
        position: fixed;
       width: 850px;
       background-color: #c0c0c0;
       right: 250px;
    }
    #botaonovo{
        position: fixed;
        top: 40px;
        
    }
    #tituloLista{
        color: black;
        font-size: 40px;
    }
</style>