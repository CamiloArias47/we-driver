<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>

    <side-bar>
      <MobileMenu slot="content"></MobileMenu>

      <sidebar-link to="/app/maps">
        <md-icon>location_on</md-icon>
        <p>Mapa</p>
      </sidebar-link>

      <sidebar-link  to="/app/dashboard">
        <md-icon>dashboard</md-icon>
        <p>Reportes</p>
      </sidebar-link>

      <sidebar-link to="/app/usuarios">
        <md-icon>group</md-icon>
        <p>Usuarios</p>
      </sidebar-link>

      <sidebar-link to="/app/crear">
        <md-icon>add_a_photo</md-icon>
        <p>Agregar</p>
      </sidebar-link>

      <sidebar-link  to="/app/admin">
        <md-icon>settings</md-icon>
        <p>Administración</p>
      </sidebar-link>

      <sidebar-link to="/login" >
        <md-icon >library_books</md-icon>
        <p @click="logout">Cerrar sesión</p>
      </sidebar-link>
    
    </side-bar>

    <div class="main-panel">
      <TopNavbar></TopNavbar>

      <DashboardContent> </DashboardContent>

      <ContentFooter v-if="!$route.meta.hideFooter"></ContentFooter>
    </div>
  </div>
</template>


<style lang="scss"></style>


<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "@/pages/Layout/MobileMenu.vue";

export default {
  data(){
    return{
     
    }
  },
  components: {
    TopNavbar,
    DashboardContent,
    ContentFooter,
    MobileMenu
  },
  methods:{
    logout(){
      this.$store.dispatch('destroyToken')
      .then(response => 
      this.$router.go('/login'))
    },
    setUsers(){
      this.$store.dispatch('setUsuarios')
      .then((response) => {
          console.log(this.$store.getters.getUsuarios);
      })
    }
  }
};
</script>
