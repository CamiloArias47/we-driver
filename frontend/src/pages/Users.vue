<template>
    <div>
        <div  class="md-layout-item md-medium-size-100 md-xsmall-size-100">
            <md-card>
                <md-card-header data-background-color="red">
                    <h4 class="title">Usuarios</h4>
                    <p class="category"></p>
                </md-card-header>
                <md-card-content>
                    <ordered-table table-header-color="red" :usersProps="users"></ordered-table>
                </md-card-content>
            </md-card>
        </div>
    </div>
</template>

<script>
import {OrderedTable} from "@/components";

export default {
    computed:{
        users(){
            return this.$store.state.usuarios
        }
    },
    components:{
        OrderedTable
    },
    methods: {
    },
    mounted(){
       if(this.$store.state.usuarios.length == 0){
           this.$store.dispatch('setUsuarios')
       }
    }
}
</script>