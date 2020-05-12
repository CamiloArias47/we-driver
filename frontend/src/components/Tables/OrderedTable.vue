<template>
  <div>
    <md-table v-model="usersProps" :table-header-color="tableHeaderColor" md-sort="id" md-sort-order="asc">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="Email" md-sort-by="id">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Nombre" md-sort-by="nombre">{{ item.first_name }}</md-table-cell>
        <md-table-cell md-label="Apellidos" md-sort-by="apellido">{{ item.last_name }}</md-table-cell>
        <md-table-cell md-label="Estado" md-sort-by="estado" v-if="item.is_active">Sí</md-table-cell>
        <md-table-cell md-label="Estado" md-sort-by="estado" v-else>No</md-table-cell>
        <md-table-cell md-label="Añadir sin autorización" md-sort-by="añadir" v-if="item.is_staff">Sí</md-table-cell>
        <md-table-cell md-label="Añadir sin autorización" md-sort-by="añadir" v-else >No</md-table-cell>
        <md-table-cell md-label="Administrador" md-sort-by="administrador" v-if="item.is_superuser">Sí</md-table-cell>
        <md-table-cell md-label="Administrador" md-sort-by="administrador" v-else>No</md-table-cell>
        <md-table-cell md-label="Acciones">
          <router-link :to="{ name: 'Usuario', params: { userId: item.id }}" class="md-just-icon md-simple md-primary">
            <md-icon>edit</md-icon>                     
            <md-tooltip md-direction="top">Actualizar</md-tooltip>
          </router-link>
          <md-button class="md-just-icon md-simple md-danger" v-on:click="confirmDelete(item)">
            <md-icon>close</md-icon>
            <md-tooltip md-direction="top">Eliminar</md-tooltip>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <md-dialog-confirm
      :md-active.sync="openComfirnDelete"
      md-content="Realmente deseas eliminar a <strong v-bind:user'userSelectedToDelete.name'> </strong>"
      md-confirm-text="Eliminar"
      md-cancel-text="Cancelar"
      @md-confirm="onConfirmDelete" />
  </div>
</template>

<script>
export default {
  name: "ordered-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    },
    usersProps:{
      Type:Object
    }
  },
  data() {
    return {
      selected: [],
      users: this.usersProps,
      openComfirnDelete: false,
      userSelectedToDelete:{}
    };
  },
  methods:{
    confirmDelete(user){
      this.openComfirnDelete = true 
      this.userSelectedToDelete = user
    },
    onConfirmDelete(){
      console.log("Eliminado: ",this.userSelectedToDelete.name)
      alert("eliminado: ",this.userSelectedToDelete.name)
    }
  }
};
</script>
