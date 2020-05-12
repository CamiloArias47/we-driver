<template>
  <div class="content">
    <div class="md-layout"  v-if="found">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <edit-profile-form data-background-color="blue" v-bind:user="user"> </edit-profile-form>
      </div>
    </div>
    <div class="notFound" v-if="!found">
      <h1>404 Not found</h1>
      <h3>El Usuario con id {{ this.$route.params.userId }} no ha suido encontrado</h3>
    </div>
  </div>
</template>

<script>
import { EditProfileForm} from "@/pages";

export default {
  data(){
    return{
      found:true,
      user:{},
      
    }
  },
  components: {
    EditProfileForm,
  },
  computed:{
    joinName(){
      return this.user.name+" "+this.user.lastname 
    }
  },
  mounted(){
    var userParam = parseInt(this.$route.params.userId)
    var editUser = this.$store.state.usuarios.find(usuario => usuario.id === userParam );
    
    if(editUser != undefined){
      this.user = editUser
    }
    else{
      this.found = false
    }
  }
};
</script>

<style scoped>
.notFound{
  text-align: center;
}
</style>