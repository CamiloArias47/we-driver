import Vue from 'vue';
import Vuex from 'vuex';
import GoogleMapsLoader from "google-maps";
import axios from 'axios';
import {Loader} from "google-maps";
import apiKey from './apiKey';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        //user:{},
       //Token de acceso
        token : null || localStorage.getItem('token'),
        routeAPI : "http://we-drive-api.herokuapp.com/",
        registerUser : 'api/registerUser',
        notifications:[
            "Estación de gasolina aprovada",
            "Actualización precio gasolina",
            "Foto multa cerca"
        ],
        //ClientID de la API
        googleSignInParams: {
          client_id: '651720234663-eufvea4ejf7g733h7us44f6naaomkp7q.apps.googleusercontent.com'
        },
        // usuarios de wedrive
        usuarios: [],
        //dashboard data
        totalUsers: 623230,
        totalCameras: 45,
        totalGasStation: 78,
        avgGas: 8400,
        usersRegisterdata: {
            data: {
              labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
              series: [[12, 17, 7, 17, 23, 18, 38]]
            },
            options: {
              lineSmooth: {},
              low: 0,
              high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
              chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
              }
            }
        },
        stationsChart: {
            data: {
              labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto"],
              series: [[230, 750, 450, 300, 280, 240, 200, 190]]
            },
    
            options: {
              lineSmooth: {},
              low: 0,
              high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
              chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
              }
            }
        },
        camerasChart: {
            data: {
              labels: [
                "En",
                "Fe",
                "Ma",
                "Ab",
                "Ma",
                "Jun",
                "Jul",
                "Ag",
                "Se",
                "Oc",
                "No",
                "Di"
              ],
              series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
            },
            options: {
              axisX: {
                showGrid: false
              },
              low: 0,
              high: 1000,
              chartPadding: {
                top: 0,
                right: 5,
                bottom: 0,
                left: 0
              }
            },
            responsiveOptions: [
              [
                "screen and (max-width: 640px)",
                {
                  seriesBarDistance: 5,
                  axisX: {
                    labelInterpolationFnc: function(value) {
                      return value[0];
                    }
                  }
                }
              ]
            ]
        },

        //camaras (de aca se toman las camaras por aprobar y aprobadas con los geeters)
        cameras:[],
        //estaciones (de aca se toman las aprobadas y las nuevas por revisar, se usan getters)
        stations:[],

        //Settings Google maps
        googleMapSetting:{
          zoom: 15,
          center: {},
          scrollwheel: false, // deshabilitar scroll
          styles: [
            {
              featureType: "water",
              stylers: [
                { saturation: 43 },
                { lightness: -11 },
                { hue: "#0088ff" }
              ]
            },
            {
              featureType: "road",
              elementType: "geometry.fill",
              stylers: [
                { hue: "#ff0000" },
                { saturation: -100 },
                { lightness: 99 }
              ]
            },
            {
              featureType: "road",
              elementType: "geometry.stroke",
              stylers: [{ color: "#808080" }, { lightness: 54 }]
            },
            {
              featureType: "landscape.man_made",
              elementType: "geometry.fill",
              stylers: [{ color: "#ece2d9" }]
            },
            {
              featureType: "poi.park",
              elementType: "geometry.fill",
              stylers: [{ color: "#ccdca1" }]
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#767676" }]
            },
            {
              featureType: "road",
              elementType: "labels.text.stroke",
              stylers: [{ color: "#ffffff" }]
            },
            { featureType: "poi", stylers: [{ visibility: "off" }] },
            {
              featureType: "landscape.natural",
              elementType: "geometry.fill",
              stylers: [{ visibility: "on" }, { color: "#b8cb93" }]
            },
            { featureType: "poi.park", stylers: [{ visibility: "on" }] },
            {
              featureType: "poi.sports_complex",
              stylers: [{ visibility: "on" }]
            },
            { featureType: "poi.medical", stylers: [{ visibility: "on" }] },
            {
              featureType: "poi.business",
              stylers: [{ visibility: "simplified" }]
            }
          ]
        },
        loader: new Loader(apiKey.apiKey, {version: '3.40'}),

        //formulario crear
        velMax:0,
        picture:null,
        comment:"",
    },
    getters:{
        getUsuarios(state){
            return state.usuarios;
        },
        getRouteAPI(state){
            return state.routeAPI;
        },
        getRegisterUser(state){
            return state.registerUser;
        },
        totalNotifications (state) {
            return state.notifications.length
        },
        loggedIn(state){
          return state.token != null;
        },
        getGoogleSignInParams(state){
          return state.googleSignInParams;
        },
        getCamerasAproved(state){
          return state.cameras.filter(cam =>  cam.item_aprobado );
        },
        getCamerasNoAproved(state){
          return state.cameras.filter(cam =>  !cam.item_aprobado );
        },
        getStationsAproved(state){
          return state.stations.filter(station => station.item_aprobado)
        },
        getStationsNoAproved(state){
          return state.stations.filter(station => !station.item_aprobado)
        }
    },
    mutations:{
        //info del usuario en sesion
        setUserData(state, user){
          console.log("[DEUG] setUserData: ", user)
          state.user = user;
        },
        setUsuarios(state,usuarios){
          state.usuarios = usuarios;
        },
        
        updateUsuario(state,usuario){
          state.usuarios = state.usuarios.filter(u => u.id !== usuario.id)
          state.usuarios.push(usuario.data)
        }, 
        //Graficos
        setUserLineSmooth(state, lineSm){
            state.usersRegisterdata.options.lineSmooth = lineSm
        },
        setStationsLineSmooth(state, lineSm){
            state.stationsChart.options.lineSmooth = lineSm
        },
        //Maps
        setCenterMap(state, center){
          state.googleMapSetting.center = center;
        },
        // Login
        retrieveToken(state,token){
          state.token = token;
        },
        setZoomMap(state, zoom){
          state.googleMapSetting.zoom = zoom;
        },
        //logout
        destroyToken(state){
          state.token = null;
        },
        setCameras(state,cameras){
          state.cameras = cameras;
        },
        addCamera(state, camera){
          state.cameras.push(camera);
        },
        updateCamera(state,newCamera){
          state.cameras = state.cameras.filter(cam => cam.id !== newCamera.id)
          state.cameras.push(newCamera.newCamera);
        },
        setStations(state,newStation){
          state.stations = newStation;
        },
        addStation(state, newStation){
          state.stations.push(newStation)
        },
        updateStation(state,newStation){
          state.stations = state.stations.filter(station => station.id !== newStation.id)
          state.cameras.push(newStation.newStation);
        },
    },
    actions:{
        async setUsuarios(context){
          let usuarios = await axios.get("https://we-drive-api.herokuapp.com/api/listUsers")
          console.log("pidiendo Usuarios...")
          context.commit('setUsuarios',usuarios.data)
        },
        async updateUsuario(context,updateData){
          let updateUser = await axios.put("http://we-drive-api.herokuapp.com/api/updateUser/" + updateData.id, updateData.data);
          console.log(updateUser.data);
          context.commit('updateUsuario',updateUser.data)
        },
       
        async getCameras(context){
          let cameras = await axios.get("https://we-drive-api.herokuapp.com/api/v1.0/camara")
          console.log("Pidiendo camaras")
          context.commit('setCameras', cameras.data)
        },

        async saveCamera(context, formData){
          let response = await axios.post("https://we-drive-api.herokuapp.com/api/v1.0/camara/",formData)
          console.log("Guardando camara")
          context.commit('addCamera', response.data)
        },

        async updateCamera(context,updateData){
          console.log("UpdateCamera datos",updateData.id)
          let response = await axios.put("https://we-drive-api.herokuapp.com/api/v1.0/camara/"+updateData.id+"/",updateData.data)
          console.log("Actualizando camara")
          context.commit('updateCamera', {
            id:updateData.id, 
            newCamera:response.data
          })
        },

        async getStations(context){
          let stations = await axios.get("https://we-drive-api.herokuapp.com/api/v1.0/estacion/")
          console.log("Pidiendo estaciones")
          context.commit('setStations', stations.data)
        },

        async saveStation(context, formData){
          let response = await axios.post("https://we-drive-api.herokuapp.com/api/v1.0/estacion/",formData)
          console.log("Guardando estacion")
          context.commit('addStation', response.data)
        },

        async updateStation(context,updateData){
          console.log("Updatetation datos",updateData)
          let response = await axios.put("https://we-drive-api.herokuapp.com/api/v1.0/estacion/"+updateData.id+"/",updateData.data)
          console.log("Actualizando estacion")
          context.commit('updateStation', {
            id:updateData.id, 
            newStation:response.data
          })
        },
        
        retrieveToken(context, credentials){
          return new Promise(function(resolve,reject) {
            axios.post('http://we-drive-api.herokuapp.com/api/login',{
            username: credentials.username, 
            password: credentials.password
          })
          .then(response => {
            console.log("[Debug] la respuest adel login:", response.data.user)
            context.commit('setUserData',response.data.user)
            const token = response.data.token
            localStorage.setItem('token',token)
            resolve(response)
          }).catch(error => {
            if (error.response.status == 400) {
              alert("Credenciales incorrectas, intenta de nuevo");
              console.log(error.response);
             } else if(error.response){
              alert("Problemas internos")
             }
             reject(error)
          })
        })  
          
        },

        destroyToken(context){
          if(context.getters.loggedIn){
            localStorage.removeItem('token')
            context.commit('destroyToken') 
          }
        } 
        
    }
})