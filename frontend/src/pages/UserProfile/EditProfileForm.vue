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
              <md-input v-model="firstname" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-50">
            <md-field>
              <label>Apellido</label>
              <md-input v-model="lastname" type="text"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
            <md-field>
              <label>Email</label>
              <md-input v-model="emailadress" type="email"></md-input>
            </md-field>
          </div>
          <div class="md-layout-item md-small-size-100 md-size-100">
              <md-field>
               <label>Foto</label>
               <md-file v-model="picture" accept="image/*"></md-file>
            </md-field>
          </div>
      
          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success">Actualizar Perfil</md-button>
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
      emailadress: "",
      lastname: "",
      firstname: "",
    };
  },
  watch: {
      user(newVal) {
          this.emailadress = newVal.mail;
          this.lastname = newVal.lastname;
          this.firstname = newVal.name;
      }
  }
};
</script>
<style></style>
