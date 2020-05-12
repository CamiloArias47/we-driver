<template>
  <div class="content">
      <div class="md-layout">
        <div class="md-layout-item md-medium-size-100 md-size-100" id="controls"> 
        <md-checkbox v-model="stations">Estaciones</md-checkbox>
        <md-checkbox v-model="cameras">Camaras</md-checkbox>
      </div>
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <div id="map"></div>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data(){
    return{
      act: 'cambar',
      stations:true,
      cameras:true,
    }
  },
  computed:{
      ...mapState({
          myLatlng: state => state.googleMapSetting.center,
          setZoomMap: 'setZoomMap'
      })
  },
  methods: {
    initMap(google) {
      var mapOptions = this.$store.state.googleMapSetting,
          map = new google.maps.Map(document.getElementById("map"), mapOptions),
          cameras = [],
          stations = [],
          _this = this;

      //aceptar camaras
      google.aceptButt = id =>{
        var data = new  FormData(); 
            data.append('item_aprobado', true);
            data.append('comentario', this.$store.getters.getCamerasNoAproved.find(cam => cam.id == id).comentario);
        console.log("aceptButt formData",data)
        this.$store.dispatch('updateCamera',{id:id,data:data})
          .then(data => {
            console.log("Las camaras", cameras)
            return cameras.filter( cam => cam.id == id)[0]
          })
          .then(mark => {
            console.log("Las elegida", mark)
            console.log("Las elegida arcador", mark.marker)
            mark.marker.setMap(null)
            cameras = cameras.filter( cam => cam.id !== id)
          })
      }

      //eliminar camara
      google.declineMark = id =>{
        alert("Eliminalo: "+id)
      }

      //aceptar estaciones
      google.aceptButtStation = id =>{
        var data = new  FormData(); 
            data.append('item_aprobado', true);
            data.append('comentario', this.$store.getters.getStationsNoAproved.find(station => station.id == id).comentario);
        this.$store.dispatch('updateStation',{id:id,data:data})
          .then(data => {
            console.log("Las estaciones", stations)
            return stations.filter( station => station.id == id)[0]
          })
          .then(mark => {
            console.log("Las elegida", mark)
            console.log("Las elegida arcador", mark.marker)
            mark.marker.setMap(null)
            stations = stations.filter( sta => sta.id !== id)
          })
      }

      //eliminar estacion
      google.declineMarkStation = id => {
        
      }

      this.$store.getters.getCamerasNoAproved.forEach(cam => {
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng( cam.lat, cam.lng),
          title: "posicion camaras",
        });

        var infowindow = new google.maps.InfoWindow({
          content: '<div>'+
                      '<ul>'+
                        '<li><b>ID:</b> '+cam.id+'</li>'+
                        '<li><b>Velocidad:</b> '+cam.velocidad_maxima+'</li>'+
                        '<li><b>Comentario:</b> '+cam.comentario+'</li>'+
                        '<li><img src="'+cam.picture+'" width="200px" /></li>'+
                     ' </ul>'+
                     '<div class="contButtons">'+
                       '<button onclick="google.aceptButt('+cam.id+')" class="buttonAceptar">'+
                            'Aceptar'+
                       '</button>'+
                       '<button onclick="google.declineMark('+cam.id+')" class="buttonCancelar">Cancelar</button>'+
                     '</div>'+
                   '</div>'
        });

        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });

        cameras.push({id:cam.id, marker:marker});
      });

      this.$store.getters.getStationsNoAproved.forEach(station => {
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng( station.lat, station.lng),
          title: "posicion estaciòn",
        });

        var infowindow = new google.maps.InfoWindow({
          content: '<div>'+
                      '<ul>'+
                        '<li><b>ID:</b> '+station.id+'</li>'+
                        '<li><b>Comentario:</b> '+station.comentario+'</li>'+
                        '<li><b>Corriente:</b> '+station.precio_galon_corriente+'</li>'+
                        '<li><b>Extra:</b> '+station.precio_galon_extra+'</li>'+
                        '<li><b>ACPM:</b> '+station.precio_galon_acpm+'</li>'+
                        '<li><b>Gas:</b> '+station.precio_metro_cubico_gas+'</li>'+
                        '<li><img src="'+station.picture+'" /></li>'+
                     ' </ul>'+
                     '<div class="contButtons">'+
                       '<button onclick="google.aceptButtStation('+station.id+')" class="buttonAceptar">'+
                            'Aceptar'+
                       '</button>'+
                       '<button onclick="google.declineMarkStation('+station.id+')" class="buttonCancelar">Cancelar</button>'+
                     '</div>'+
                   '</div>'
        });

        marker.addListener('click', function() {
          infowindow.open(map, marker);
        });

        stations.push({id:station.id, marker:marker});
      });

      // Poner camaras en el mapa, setMap();
      google.showCamerasAdmin = ()=>{
        cameras.forEach(cam =>{
          cam.marker.setMap(map)
        })  
      }

      google.hideCamereasAdmin = ()=>{
        cameras.forEach(cam =>{
          cam.marker.setMap(null)
        })   
      }

      // Poner estaciones en el mapa, setMap();
      google.shoStationsAdmin = ()=>{
        stations.forEach(station =>{
          station.marker.setMap(map)
        })  
      }

      google.hideStationsAdmin = ()=>{
        stations.forEach(station =>{
          station.marker.setMap(null)
        })   
      }

      google.showCamerasAdmin()
      google.shoStationsAdmin()
    }
  },
  watch: {
    cameras(newCamera, oldCamera) {
      if(newCamera){
        google.showCamerasAdmin()
      }
      else{
        google.hideCamereasAdmin()
      }
    },
    stations(newStation, oldStation) {
      if(newStation){
        google.shoStationsAdmin()
      }
      else{
        google.hideStationsAdmin()
      }
    }
  },
   mounted() {
    var _this = this;
    function loadGMS(){
      _this.$store.state.loader.load().then( google => {
        _this.$store.commit('setCenterMap',new google.maps.LatLng(3.42158, -76.5225000) )
        _this.$store.commit('setZoomMap',13)
        _this.initMap(google);
      });
    }

    //verificar si almenos hay una camara o estacion, s no hacer la peticion a la api
    if(this.$store.getters.getCamerasNoAproved.length == 0 || this.$store.getters.getStationsNoAproved.length == 0){
      this.$store.dispatch('getCameras')
        .then(cameras => this.$store.dispatch('getStations') )
        .then(stations => { loadGMS() })
    }
    else { 
      loadGMS() 
    }
  }
};
</script>

<style>
  .contButtons{
    display: flex;
    flex-flow: row wrap;
  }
</style>