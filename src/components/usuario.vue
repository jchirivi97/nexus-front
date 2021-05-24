<template>
   <div class="col-12 row justify-content-center">
       <h3 class="text-center col-12">Registrar Usuario</h3>
       <form class="col-8 row justify-content-center">
           <div class="mb-3 col-6">
              <label for="nombre" class="form-label">Nombre</label>
              <input
                type="text"
                class="form-control"
                id="nombre"
                v-model="nombre"
              />
            </div>
            <div class="mb-3 col-6">
              <label for="fecha" class="form-label">Fecha ingreso</label>
              <input
                type="date"
                class="form-control"
                id="fecha"
                v-model="fecha"
              />
            </div>
            <div class="mb-3 col-6">
              <label for="edad" class="form-label">Edad</label>
              <input
                type="number"
                class="form-control"
                id="edad"
                v-model="edad"
              />
            </div>
            <div class="mb-3 col-6">
                <label class="form-label">Cargo</label>
                <select
                    id="cargo"
                    class="form-select"
                    v-model="cargo"
                    aria-label="Default select example"
                >
                    <option selected>Seleccione</option>
                    <option v-for="carg in cargos" :key="carg.idcargo" :value="carg">
                        {{ carg.nombre }}
                    </option>
                </select>
            </div>
            <button type="button" @click="saveEmpleado" class="btn btn-primary">Crear</button>
       </form>
   </div> 
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
    name:"Usuario",
    components:{

    },
    data(){
        return{
            nombre:null,
            fecha: null,
            edad: null,
            cargos:[],
            cargo: null

        }
    },
    mounted(){
        this.getAllCargos()
    },
    methods:{
        getAllCargos(){
            axios.get("http://localhost:8080/cargo/all").then((response)=>(
                this.cargos = response.data
            ))
        },
        saveEmpleado(){
            let data={
                cargo: this.cargo.idcargo,
                edad: this.edad,
                fechaIngreso: this.fecha,
                nombre: this.nombre
            }
            axios.post("http://localhost:8080/user/new",data).then(function(resp){
                if(resp.data.id != null){
                    Swal.fire({
                        icon:"success",
                        text:"empleado creado",
                        timer: 2000
                    })
                    setTimeout(function(){
                        location.reload()
                    },2000)
                }
            })
        }
    }
}
</script>