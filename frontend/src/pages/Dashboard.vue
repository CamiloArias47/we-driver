<template>  
  <div class="content">
    <div class="md-layout">      
      <div  class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50">
        <chart-card
          :chart-data="usersRegisterdata.data"
          :chart-options="usersRegisterdata.options"
          :chart-type="'Line'"
          data-background-color="blue"
        >
          <template slot="content">
            <h4 class="title">Registro usuarios</h4>
          </template>

        </chart-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50">
        <chart-card
          :chart-data="camerasChart.data"
          :chart-options="camerasChart.options"
          :chart-responsive-options="camerasChart.responsiveOptions"
          :chart-type="'Bar'"
          data-background-color="orange"
        >
          <template slot="content">
            <h4 class="title">Registro de camaras</h4>
          </template>

        </chart-card>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-50">
        <chart-card
          :chart-data="stationsChart.data"
          :chart-options="stationsChart.options"
          :chart-type="'Line'"
          data-background-color="red"
        >
          <template slot="content">
            <h4 class="title">Registro de estaciones</h4>
          </template>
        </chart-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="blue">
          <template slot="header">
            <md-icon>supervised_user_circle</md-icon>
          </template>

          <template slot="content">
            <p class="category">Usuarios</p>
            <h3 class="title">{{ totalUsers }}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>account_circle</md-icon>
              total de usuarios registrados
            </div>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="orange">
          <template slot="header">
            <md-icon>linked_camera</md-icon>
          </template>

          <template slot="content">
            <p class="category">Fotomultas</p>
            <h3 class="title">
              {{ totalCameras }}
            </h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon class="text-danger">videocam</md-icon>
              total de fotomultas reistradas
            </div>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="red">
          <template slot="header">
            <md-icon>local_gas_station</md-icon>
          </template>

          <template slot="content">
            <p class="category">Estaciones</p>
            <h3 class="title">{{ totalGasStation }}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>ev_station</md-icon>
              Total estaciones de gasolina registradas
            </div>
          </template>
        </stats-card>
      </div>
      <div
        class="md-layout-item md-medium-size-50 md-xsmall-size-100 md-size-25"
      >
        <stats-card data-background-color="grey">
          <template slot="header">
            <md-icon>drive_eta</md-icon>
          </template>

          <template slot="content">
            <p class="category">Gasolina</p>
            <h3 class="title">{{ avgGas }}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>local_gas_station</md-icon>
              Promedio precio galón de gasolina
            </div>
          </template>
        </stats-card>
      </div>
     
    </div>
  </div>
</template>

<script>
import {
  StatsCard,
  ChartCard
} from "@/components";

import { mapState } from 'vuex'

export default {
  components: {
    StatsCard,
    ChartCard
  },
  computed:{
    ...mapState({
      totalCameras : 'totalCameras',
      totalUsers : 'totalUsers',
      totalGasStation : 'totalGasStation',
      avgGas : 'avgGas',
      usersRegisterdata : 'usersRegisterdata',
      stationsChart: 'stationsChart',
      camerasChart:'camerasChart'
    })
  },
  data() {
    return {
      
    };
  },
  mounted(){
    let conf = this.$Chartist.Interpolation.cardinal({tension: 0})
    
    this.$store.commit('setUserLineSmooth',conf);
    this.$store.commit('setStationsLineSmooth',conf);
  }
};
</script>
