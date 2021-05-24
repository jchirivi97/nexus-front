<template>
   <div class="col-12 row justify-content-center">
       <h3 class="text-center col-12 m-2">Registrar Cargos</h3>
       <form class="col-8 row justify-content-center">
           <div class="mb-3 col-6">
              <label for="cargo" class="form-label">Cargo</label>
              <input
                type="text"
                class="form-control"
                id="cargo"
                v-model="cargo"
              />
            </div>
            <button type="button" @click="saveCargo" class="btn btn-sm btn-primary">Crear</button>
       </form>
   </div> 
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
    name:"Cargo",
    components:{

    },
    data(){
        return{
            cargo: null
        }
    },
    methods:{
        saveCargo(){
            let data={
                nombre: this.cargo
            }
            axios.post("http://localhost:8080/cargo/new",data).then(function(resp){
                if(resp.data.idcargo != null){
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