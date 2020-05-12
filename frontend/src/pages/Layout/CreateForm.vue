<template>
  <form>
    <md-card>
      <md-card-header :data-background-color="dataBackgroundColor">
        <h4 class="title">Registro</h4>
        <p class="category">Registra una cámara de fotomulta o una estación de combustible</p>
      </md-card-header>

      <md-card-content>
        <div class="md-layout">
          <div class="md-layout-item md-small-size-100 md-size-100">
              <md-radio v-model="tipo" value="camara">Cámara</md-radio>
              <md-radio v-model="tipo" value="estacion">Estación</md-radio>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-50">
            <div id="map"></div>
          </div>

          <div class="md-layout-item md-small-size-100 md-size-50">
      
            <div v-if="tipo == 'camara'">
                <md-field>
                    <label>Velocidad maxima</label>
                    <md-input v-model="velMax" type="text"></md-input>
                </md-field>

                <md-field>
                    <label>Foto</label>
                    <md-file @change="getImage" accept="image/*" />
                </md-field>

                <md-field maxlength="5">
                    <label>Comentario</label>
                    <md-textarea v-model="comment"></md-textarea>
                </md-field>
            </div>

            <div v-if="tipo == 'estacion'">

                <md-field>
                    <label>Foto</label>
                    <md-file  @change="getImage" accept="image/*" />
                </md-field>

                <div class="md-layout">  
                    <div class="md-layout-item md-xsmall-size-50"> 
                      <b>Gasolina Corriente</b>
                    </div>
                    <div class="md-layout-item md-xsmall-size-50">  
                      <md-field>
                          <label>Precio</label>
                          <md-input v-model="corrientePrice" type="text"></md-input>
                      </md-field>
                    </div>
                </div>

                <div class="md-layout">  
                    <div class="md-layout-item md-xsmall-size-50">
                        <b>Gasolina Extra</b>
                    </div>
                    <div class="md-layout-item md-xsmall-size-50">  
                      <md-field>
                          <label>Precio</label>
                          <md-input v-model="extraPrice" type="text"></md-input>
                      </md-field>
                    </div>
                </div>

                <div class="md-layout">  
                    <div class="md-layout-item md-xsmall-size-50"> 
                        <b>ACPM</b>
                    </div>
                    <div class="md-layout-item md-xsmall-size-50">  
                      <md-field>
                          <label>Precio</label>
                          <md-input v-model="acpmPrice" type="text"></md-input>
                      </md-field>
                    </div>
                </div>

                <div class="md-layout">  
                    <div class="md-layout-item md-xsmall-size-50">
                        <b>Gas</b>
                    </div>
                    <div class="md-layout-item md-xsmall-size-50">  
                      <md-field>
                          <label>Precio</label>
                          <md-input v-model="gasPrice" type="text"></md-input>
                      </md-field>
                    </div>
                </div>
                

                <md-field maxlength="5">
                    <label>Comentario</label>
                    <md-textarea v-model="comment"></md-textarea>
                </md-field>
            </div>
          </div>

          <div class="md-layout-item md-size-100 text-right">
            <md-button class="md-raised md-success" v-on:click="save()">Guardar</md-button>
          </div>
        </div>
      </md-card-content>

      <md-dialog-alert
      :md-active.sync="success"
      md-title="¡Creado!" />

      <md-dialog-alert
      :md-active.sync="fail"
      md-title="Verifica la informaciòn primero" />

    </md-card>
  </form>
</template>


<script>
import {Loader} from "google-maps";
import { mapState } from 'vuex'
import apiKey from '../../apiKey';

export default {
  name: "create-form",
  props: {
    dataBackgroundColor: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      tipo: "camara",
      velMax: null,
      picture:null,
      nameStation:"",
      corrientePrice:"",
      extraPrice:"",
      acpmPrice:"",
      gasPrice:"",
      comment:"",
      addFields:0,
      coordinates:{},
      success:false,
      fail:false
    };
  },
  computed:{
      ...mapState({
          myLatlng: state => state.googleMapSetting.center,
      })
  },
  methods: {
    initMap(google) {
      var mapOptions = this.$store.state.googleMapSetting,
          map = new google.maps.Map(document.getElementById("map"), mapOptions);

      var marker = new google.maps.Marker({
        position: this.myLatlng,
        map:map,
        draggable:true,
        title: "Establece la posición"
      });

      google.maps.event.addListener(marker, 'dragend',  evt => {
        console.log("[Debug] moviendo...")
        console.info(evt.latLng.lat() )
        console.info(evt.latLng.lng() )
        this.coordinates = {lat: evt.latLng.lat(), lng:evt.latLng.lng()}
      });

      // Poner el marcador en el mapa, setMap();
      //marker.setMap(map);
    },
    canIuseGeolocation(){
        return (navigator.geolocation) ? true : false;
    },
    addRow(){
      this.addFields += 1
      this.nameGas.push({index:this.addFields, name:"", price:""})
    },
    deleteRow(index){
      let _this = this;
      var getIndex =  position => {
        return  (_this.nameGas[position].index == index) ? position : getIndex(position+1) 
      }
      let dell = getIndex(0)
      this.nameGas.splice( dell, 1 );
    },
    getImage(event){
        //Asignamos la imagen a  nuestra data
        this.picture = event.target.files[0];
    },
    save(){
      var data = new  FormData(); 
          data.append('picture', this.picture);
          data.append('comentario', this.comment);
          data.append('lat', this.coordinates.lat);
          data.append('lng', this.coordinates.lng);

      if(this.tipo == "camara"){
        data.append('velocidad_maxima', this.velMax); 
        this.$store.dispatch('saveCamera',data)
          .then(d => {
            this.picture = null;
            this.velMax = null;
            this.comment = "";
            this.success = true;
          })
          .catch(err =>{
            this.fail = true
          })
      }
      else{
        data.append('precio_galon_corriente',this.corrientePrice);
        data.append('precio_galon_extra',this.extraPrice);
        data.append('precio_galon_acpm',this.acpmPrice);
        data.append('precio_metro_cubico_gas',this.gasPrice);
        this.$store.dispatch('saveStation',data)
        .then(d => {
            this.picture = null;
            this.comment = "";
            this.corrientePrice = null;
            this.extraPrice = null;
            this.acpmPrice = null;
            this.gasPrice = null;
            this.success = true;
          })
        .catch(err =>{
          this.fail = true
        })
      }
    },
  },
  mounted() {
    var _this = this;
    
    this.$store.state.loader.load().then( google => {
        navigator.geolocation.getCurrentPosition(position => {
            var startLocation = {
                lat: position.coords.latitude, 
                long: position.coords.longitude
            } 
            _this.$store.commit('setCenterMap',new google.maps.LatLng(startLocation.lat, startLocation.long) )
            _this.initMap(google);
        })
    });
  }
};
</script>
<style>
</style>
