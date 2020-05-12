<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Editar perfil</h4>
        <p class="category">Completa el perfil</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Nombre</label>
              <md-input v-model="first_name" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Apellido</label>
              <md-input v-model="last_name" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Email</label>
              <md-input v-model="email" type="email"></md-input>
            </md-field>
          </div>
           <div class="md-layout-item md-small-size-100 md-size-50">
              <label>Crear items sin verificación</label>
              <br>
              <md-input type="checkbox" v-model="is_staff" >Activar</md-input>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
              <label>Administrador</label>
              <br>
              <md-input type="checkbox" v-model="is_superuser">Activar</md-input>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
              <label>Estado</label>
              <br>
              <md-input type="checkbox" v-model="is_active">Activo</md-input>
          </div>
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" data-background-color="blue" @click="sendForm"> Actualizar Perfil</md-button>
          </div>
        </div>
      </md-card-content>
    </md-card>
  </form>
</template>
<script>
export default {
  name: "edit-profile-form",
  props: {
    user:{type:Object},
    dataBackgroundColor: {
      type: String,
      default: "",
    }
  },
  data() {
    return {
      email: "",
      last_name: "",
      first_name: "",
      is_staff: false,
      is_active: true,
      is_superuser: false
    };
  },
  watch: {
      user(newVal) {
          this.id           =newVal.id;
          this.email        = newVal.email;
          this.last_name    = newVal.last_name;
          this.first_name   = newVal.first_name;
          this.is_staff     = newVal.is_staff;
          this.is_active    = newVal.is_active;
          this.is_superuser = newVal.is_superuser;
      }
  },
  methods:{
    sendForm(){
      console.log("Actualizando usuario...");
      this.$router.push('/app/usuarios');
      console.log(
        this.id,
        this.email,
        this.last_name,
        this.first_name,
        this.is_staff,
        this.is_active,
        this.is_superuser
      );
      
    }
  }
};
</script>
<style></style>
