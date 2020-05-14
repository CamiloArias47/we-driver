<template>
  <div class="content">
    <div class="md-layout"  v-if="found">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <edit-profile-form data-background-color="blue" v-bind:user="user"> </edit-profile-form>
      </div>
     <!-- <div class="md-layout-item md-medium-size-100 md-size-33">
        <user-card :name="joinName" :cardUserImage="picture"></user-card>
      </div> -->
    </div>
    <div class="notFound" v-if="!found">
      <h1>404 Not found</h1>
      <h3>El Usuario con id {{ this.$route.params.userId }} no ha sido encontrado</h3>
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
    /*UserCard*/
  },
  computed:{
    joinName(){
      return this.user.name+" "+this.user.lastname 
    }
  },
  mounted(){
    var userParam = parseInt(this.$route.params.userId)
    
           this.$store.dispatch('setUsuarios')
              .then(data => {
                var editUser = this.$store.state.usuarios.find(user => user.id === userParam );
                console.log(editUser);
                
                if(editUser != undefined){
                  this.user = editUser
                  /*this.picture = require("@/assets/img/faces/"+editUser.picture) */
                }
                else{
                  this.found = false
                }
              })
    
  }
};
</script>

<style scoped>
.notFound{
  text-align: center;
}
</style>