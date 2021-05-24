import Vue from 'vue'
import Router from 'vue-router'
import Principal from './components/Principal.vue'
import Producto from "./components/producto.vue";
import Cargo from "./components/cargo.vue";
import Usuario from "./components/usuario.vue";


Vue.use(Router)

const router = new Router({
    mode:'history',
    routes:[
        
        {
            path:'/producto',
            name:'producto',
            component: Producto
        },
        {
            path:'/cargo',
            name:'cargo',
            component: Cargo
        },
        {
            path:'/user',
            name:'usuario',
            component: Usuario
        }
    ]
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(Principal),
}).$mount('#app')
