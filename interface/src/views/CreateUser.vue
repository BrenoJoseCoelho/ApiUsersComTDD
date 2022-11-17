<template>
    <div>
        <div class="columns">
            <div class="column  is-two-fifth" ><router-link :to="{name: 'UsersList'}"><button class="button is-warning" id="voltar" >Voltar</button></router-link></div>
            <div class="column is-four-fifths"> <h1 class="title is-1">Cadastro de Usuário:</h1></div>    
            <div class="column"></div>
        </div>
        <hr>
    <div class="box">
        <div class="columns is-centered">
            <div class="column is-half">
                <div v-if="error != undefined">
                    <div class="notification is-danger">
                        {{error}}
                    </div>
                </div>
                    <label class="label">Nome:</label>
                        <input type="text" placeholder="Nome do usuário" class="input" v-model="name">
                    <label class="label">E-mail:</label>
                        <input type="email" placeholder="email@email.com" class="input" v-model="email">
                    <label class="label">Idade:</label>
                        <input type="number" placeholder="00" class="input" v-model="age">
                    <hr>
                    <button class="button is-info" id="cadastrar" @click="register">Cadastrar</button>
            </div>
        </div>
    </div>    
     </div>  
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            name: '',
            password: '',
            email: '',
            error: undefined,
        }
    },
    methods: {
        register(){
            axios.post("http://localhost:4000/users",{
                name: this.name,
                email: this.email,
                age: this.age
            }).then(res => {
                console.log(res);
                this.$router.push({name: 'UsersList'});
            }).catch(err => {
                alert(err.response.data);
                var msgErro = err.response.data.err;
                this.error = msgErro;
            })
        }
    }
}
</script>

<style>
#cadastrar
{ 
    width: 370px;
}
</style>