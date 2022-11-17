<template>
    <div>
         <div class="columns">
            <div class="column  is-two-fifth" ><router-link :to="{name: 'UsersList'}"><button class="button is-warning" id="voltar" >Voltar</button></router-link></div>
            <div class="column is-four-fifths"> <h1 class="title is-1">Edição de Usuário:</h1></div>    
            <div class="column"></div>
        </div> 
        <hr>

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
                <label class="label">Age:</label>
                <input type="number" placeholder="00" class="input" v-model="age">
                <hr>
                <button class="button is-success" id="editar" @click="update">Editar</button>
            </div>
        </div>
    </div>    
</template>

<script>
import axios from 'axios';
export default {
    created(){

        axios.get("http://localhost:4000/users/" + this.$route.params.name).then(res => {
            console.log(res.data[0].name);

            this.name = res.data[0].name;
            this.email = res.data[0].email;
            this.age = res.data[0].age;

        }).catch(err => {
            console.log(err.response);
             this.$router.push({name: 'Users'});
        })

    },
    data(){
        return {
            name: '',
            email: '',
            age: '',
            error: undefined
        }
    },
    methods: {
        update(){
            
            
            axios.put("http://localhost:4000/users/"  + this.$route.params.name,{
                name: this.name,
                email: this.email,
                age: this.age
                
            }).then(res => {
                
                console.log(res.data[0]);
                //if(res.data[0])
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

<style scoped>
#editar
{ 
    width: 370px;
}
</style>