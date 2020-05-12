import Welcome from '@/pages/Layout/Welcome';
import Login from '@/pages/Layout/Login';
import Registro from '@/pages/Layout/Register'
import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";
import Error from "@/pages/Layout/Error.vue"


import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import Admin from "@/pages/Admin.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import Usuarios from "@/pages/Users.vue";
import UserEdit from "@/pages/userEdit.vue";

const routes = [
  
  {
    path: "/login",
    component: Login,
    name:"Login",
    meta:{
      requiresVisitor : true
    }
  },
  {
    path: "/registro",
    name: "Registro",
    component : Registro,
    meta:{
      requiresVisitor : true
    }
  },
  {
    path: "/app",
    component: DashboardLayout,
    name: "App",
    meta:{
      userLoged : true //userLoged debe ser true para poder acceder a caulquiera de sus hijos
    },
    children: [
      {
        path: "maps",
        name: "Mapa",
        meta: {
          //hideFooter: true
        },
        component: Maps
      },
      {
        path: "dashboard",
        name: "Reportes",
        component: Dashboard,
        meta:{
          //admin : true 
        }
      },
      {
        path: "usuarios",
        name: "Usuarios",
        component: Usuarios,
        meta:{
          //admin : true 
        }
      },
      { 
        path: '/user/:userId', 
        name: 'user',
        component: UserEdit 
      },
      {
        path: "crear",
        name: "Crear Fotomulta - Estación",
        component: UserProfile
      },
      {
        path: "admin",
        name: "Administración",
        component: Admin,
        meta:{
          //admin : true, 
        }
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      }
    ]
  },
  {
    path: "*",
    name: "Error",
    component: Error
  }
];

export default routes;
