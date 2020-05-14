<template>
    <div v-if="!loggedIn" class="divlogin">
    <div class="container">
      <div class="contenido">
        <figure id="logotipo">
          <img class="img" :src="LoginLogo" width="200">
        </figure>
        <h2>Registrarse</h2>
        <form @submit.prevent="sendForm">
          <input 
            type="text" 
            placeholder="Nombre"
            v-model="form.firstName"
          />
          <input 
            type="text" 
            placeholder="Apellido"
            v-model="form.lastName"
          />
          <input
            type="email"
            :class="{ error: validaEmail }"
            placeholder="Email"
            v-model="form.email"
          />
          <p class="mensaje">{{ mensaje1 }}</p>
          <input
            type="password"
            :class="{ error: validaPassword }"
            placeholder="Contraseña"
            v-model="form.password"
          />
          <p class="mensaje">{{ mensaje2 }}</p>
          <input
            type="password"
            :class="{ error: verificaPaswordIguales }"
            placeholder="Confirmar contraseña"
            v-model="form.password2"
          />
          <button>Aceptar</button>
          <p style="font-size: 12px; color: #333;">
            Acepto <span>Terminos & Condiciones</span>
          </p> 
        </form>

        <router-link to="../login" class="link">Cancelar</router-link>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';

export default {
    props: {
        LoginLogo: {
        type: String,
        default: require("@/assets/img/weDrive.png")
        }
    },

  data: function() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        password2: ""
      },
      mensaje1: "",
      mensaje2: ""
    };
  },
  methods: {
    sendForm() {
      if (this.validaType()) {
        axios.post(this.$store.getters.getRouteAPI + this.$store.getters.getRegisterUser,{
                first_name :  this.form.firstName,
	        last_name:    this.form.lastName,
	        username :    this.form.email,
	        email :       this.form.email,
	        password :    this.form.password2,
		is_staff : false,
		is_active: true
        })
        .then(response => {
          console.log(response);
          alert("Registro Exitoso");
          this.$router.push("/login");
          
        })
        .catch(error => {
          if (error.response.status == 400) {
              alert(error.response.data);
              console.log(error.response);
             } else if(error.response){
              alert("Problemas internos")
             }
        })
      }else {
        if(this.validaPassword) {
         this.mensaje1 = "la contraseña debe tener mínimo una mayúscula, una minúscula y un numero"
        }else {
          this.mensaje1 = ""
        }
        if(this.verificaPaswordIguales) {
          this.mensaje2 = "las contraseñas no coinciden"
        }else {
          this.mensaje2 = ""
        }
      }
    },
    validaType() {
      if (
        !this.validaEmail &&
        !this.validaPassword &&
        !this.verificaPaswordIguales
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  computed: {
    loggedIn(){
      return this.$store.getters.loggedIn;
    },
    validaEmail() {
      var exp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      if (exp.test(this.form.email)) {
        return false;
      } else {
        return true;
      }
    },
    validaPassword() {
      var exp = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
      if (exp.test(this.form.password)) {
        return false;
      } else {
        return true;
      }
    },
    verificaPaswordIguales() {
      if (this.form.password == this.form.password2) {
        return false;
      } else {
        return true;
      }
    }
  }
}
</script>

<style scoped>
.divlogin {
  background: url('../../assets/img/fondo_transparente.jpg');
  background-color: rgba(0, 0, 0, 0.5);
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100vh;
  display: flex;
  align-content: center;
  align-items: center;
}
.divlogin .container {
  text-align: center;
  margin: auto;
}
.divlogin .container .contenido {
  width: 100%;
  max-width: 300px;
  max-height: 700px;
  background: rgba(255, 255, 255, .9);
  padding: 0 20px 20px 20px;
  display: inline-block;
  margin-left: auto;
  font-weight: bold;
  border-radius: 20px;
}
.divlogin .container .contenido h2 {
  margin: 5px;
  color: black;
  font-size: 2em;
  font-weight: bold;
}
.divlogin .container .contenido input {
  height: 35px;
  margin: 8px 0px;
  border: 1px solid rgba(0, 0, 0, .5);
  border-radius: 5px;
  padding: 10px;
  width: 70%;
  background:rgba(255, 255, 255, 0.6);
}
.divlogin .container .contenido input:hover {
   background:rgba(255, 255, 255, 1);
}
.divlogin .container .contenido input.error {
  border-bottom: 3px solid red;
}
.divlogin .container .contenido button {
  height: 40px;
  margin: 10px 0px;
  border: 0px;
  width: 75%;
  background: rgb(85, 85, 85, .8);
  color: #ffffff;
  font-size: 15px;
  font-weight: inherit;
  border-radius: 5px;
}
.divlogin .container .contenido button:hover {
  background: red;
}
.divlogin .container .contenido p {
  margin: 10px 0px;
  font-size: 13px;
  color: #333333;
  text-decoration: none;
  display: block;
}
.divlogin .container .contenido .link {
  margin: 0px;
  color: black;
  font-size: 18px;
  text-decoration: none;
  display: block;
}
.divlogin .container .contenido .link:hover {
  color: black;
  font-size: 20px;
} 
.divlogin .container .contenido .mensaje {
  margin: 0px;
  color: red;
  font-weight: lighter;
}
#logotipo {
  margin: 0px;
}

</style>
