<template>
  <div class="col-12 row">
    <div class="col-12 text-center mt-3">
      <button class="btn btn-primary" @click="showModal()">Crear</button>
    </div>
    <form class="col-12 m-4">
      <label class="form-label">Empleado</label>
      <select
        id="empleado"
        class="form-select"
        v-model="empleado"
        aria-label="Default select example"
      >
        <option selected>Seleccione</option>
        <option v-for="emp in empleados" :key="emp.id" :value="emp">
          {{ emp.nombre }}
        </option>
      </select>
    </form>
    <div class="col-12 m-4">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">PRODUCTO</th>
            <th scope="col">CANTIDAD</th>
            <th scope="col">FECHA</th>
            <th scope="col">ACCIÓN</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in productos" :key="producto.idproducto">
            <td>
              {{ producto.idproducto }}
            </td>
            <td>
              {{ producto.nombre }}
            </td>
            <td>
              {{ producto.cantidad }}
            </td>
            <td>
              {{ producto.fecha }}
            </td>
            <td>
              <button
                type="button"
                class="btn btn-sm btn-warning"
                @click="showModalEdit(producto)"
              >
                Editar
              </button>
              <button
                type="button"
                class="btn btn-sm btn-danger"
                @click="empleadoCreate(producto)"
              >
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="modal" tabindex="-1" id="modalProduct">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Acción Producto</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="nombre" class="form-label">Nombre</label>
              <input
                type="text"
                class="form-control"
                id="nombre"
                v-model="nombre"
                style="text-transform: uppercase"
                @blur="verifyName"
              />
            </div>
            <div class="mb-3">
              <label for="cantidad" class="form-label">Cantidad</label>
              <input
                type="number"
                class="form-control"
                id="cantidad"
                v-model="cantidad"
                @blur="verifyCantidad"
              />
            </div>
            <div class="mb-3">
              <label for="fecha" class="form-label">Fecha</label>
              <input
                type="date"
                class="form-control"
                id="fecha"
                v-model="fecha"
                @blur="verifyFecha"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="closeModal"
            >
              Cerrar
            </button>
            <button type="button" class="btn btn-primary" @click="saveProducto">
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" tabindex="-1" id="modalProductEdit">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Acción Producto</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="nombreE" class="form-label">Nombre</label>
              <input
                type="text"
                class="form-control"
                id="nombreE"
                v-model="nombre"
                style="text-transform: uppercase"
                @blur="verifyNameEdit"
              />
            </div>
            <div class="mb-3">
              <label for="cantidadE" class="form-label">Cantidad</label>
              <input
                type="number"
                class="form-control"
                id="cantidadE"
                v-model="cantidad"
                @blur="verifyCantidad"
              />
            </div>
            <div class="mb-3">
              <label for="fechaE" class="form-label">Fecha</label>
              <input
                type="date"
                class="form-control"
                id="fechaE"
                v-model="fecha"
                @blur="verifyFecha"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="closeModal"
            >
              Cerrar
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="saveProductoEdit"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import $ from "jquery";
import Swal from "sweetalert2";
export default {
  name: "Producto",
  components: {},
  data() {
    return {
      empleados: [],
      productos: [],
      empleado: null,
      nombre: null,
      cantidad: 0,
      fecha: null,
      id: null,
      fechaActual: null,
      productEmp: true,
    };
  },
  mounted() {
    this.getAllProducts(), this.getAllUsers(), this.getFechaActual();
  },
  methods: {
    getFechaActual() {
      var fechaA = new Date();
      let dia =
        fechaA.getDate() < 10 ? "0" + fechaA.getDate() : fechaA.getDate();
      let month =
        fechaA.getMonth() < 10
          ? "0" + (fechaA.getMonth() + 1)
          : fechaA.getMonth() + 1;
      this.fechaActual = fechaA.getFullYear() + "-" + month + "-" + dia;
    },
    getAllProducts() {
      axios
        .get("http://localhost:8080/product/all")
        .then((response) => (this.productos = response.data));
    },
    getAllUsers() {
      axios
        .get("http://localhost:8080/user/all")
        .then((response) => (this.empleados = response.data));
    },
    clearData() {
      this.nombre = null;
      this.cantidad = 0;
      this.fecha = null;
    },
    showModal() {
      this.clearData();
      $("#modalProduct").show();
    },
    showModalEdit(producto) {
      this.clearData();
      this.id = producto.idproducto;
      this.nombre = producto.nombre;
      this.cantidad = parseInt(producto.cantidad);
      this.fecha = producto.fecha;
      $("#modalProductEdit").show();
    },
    verifyFecha() {
      if (this.fecha > this.fechaActual) {
        Swal.fire({
          icon: "error",
          text: "La fecha debe ser menor o igual a la fecha actual",
          timer: 2500,
        });
        this.fecha = null;
      }
    },
    verifyNameEdit() {
      var cont = 0;
      for (var i = 0; i < this.productos.length; i++) {
        if (this.productos[i].nombre == this.nombre.toUpperCase()) {
          cont += 1;
        }
      }
      if (cont > 1) {
        Swal.fire({
          icon: "error",
          text: "El producto ya ha sido registrado",
          timer: 2000,
        });
        this.nombre = null;
      }
    },
    verifyName() {
      var cont = 0;
      for (var i = 0; i < this.productos.length; i++) {
        if (this.productos[i].nombre == this.nombre.toUpperCase()) {
          cont += 1;
        }
      }
      if (cont > 0) {
        Swal.fire({
          icon: "error",
          text: "El producto ya ha sido registrado",
          timer: 2000,
        });
        this.nombre = null;
      }
    },
    verifyCantidad() {
      if (this.cantidad <= 0) {
        Swal.fire({
          icon: "error",
          text: "La cantidad debe ser mayor a cero",
          timer: 2000,
        });
      }
    },
    saveProducto() {
      if (this.empleado != null) {
        let data = {
          nombre: this.nombre.toUpperCase(),
          cantidad: parseInt(this.cantidad),
          fecha: this.fecha,
        };
        axios
          .post("http://localhost:8080/product/new", data)
          .then((response) => {
            console.log("dfdsfsdfsdf " + JSON.stringify(response));

            if (response.data.idproducto != null) {
              let traza = {
                fecha: new Date(),
                usuario: this.empleado.id,
                producto: response.data.idproducto,
                tipo: "CREAR",
              };
              axios
                .post("http://localhost:8080/traza/new", traza)
                .then((resp) => {
                  if (resp.data.id != null) {
                    Swal.fire({
                      icon: "success",
                      text: "Producto creado",
                      timer: 2000,
                    });
                    setTimeout(function () {
                      location.reload();
                    }, 2000);
                  }
                });
            } else {
              Swal.fire({
                icon: "error",
                text: "Producto no creado",
                timer: 2000,
              });
            }
          });
      } else {
        Swal.fire({
          icon: "error",
          text: "Debe seleccionar un empleado",
          timer: 2000,
        });
      }
    },
    saveProductoEdit() {
      if (this.empleado != null) {
        let data = {
          idproducto: this.id,
          nombre: this.nombre.toUpperCase(),
          cantidad: parseInt(this.cantidad),
          fecha: this.fecha,
        };
        axios
          .put("http://localhost:8080/product/update", data)
          .then((response) => {
            if (response.data.idproducto != null) {
              let traza = {
                fecha: new Date(),
                usuario: this.empleado.id,
                producto: response.data.idproducto,
                tipo: "ACTUALIZAR",
              };
              axios
                .post("http://localhost:8080/traza/new", traza)
                .then((resp) => {
                  if (resp.data.id != null) {
                    Swal.fire({
                      icon: "success",
                      text: "Producto Actualizado",
                      timer: 2000,
                    });
                    setTimeout(function () {
                      location.reload();
                    }, 2000);
                  }
                });
            } else {
              Swal.fire({
                icon: "error",
                text: "Producto no creado",
                timer: 2000,
              });
            }
          });
      } else {
        Swal.fire({
          icon: "error",
          text: "Debe seleccionar un empleado",
          timer: 2000,
        });
      }
    },
    closeModal() {
      $("#modalProductEdit").hide();
      $("#modalProduct").hide();
    },
    deleteProducto(producto) {
      let data = {
        idproducto: producto.idproducto,
        nombre: producto.nombre.toUpperCase(),
        cantidad: parseInt(producto.cantidad),
        fecha: producto.fecha,
      }
      axios
        .post("http://localhost:8080/product/delete", data)
        .then((response) => {
          if (response.data.idproducto != null) {
            Swal.fire({
              icon: "success",
              text: "Producto Eliminado",
              timer: 2000,
            });
          } else {
            Swal.fire({
              icon: "error",
              text: "Producto no eliminado",
              timer: 2000,
            });
          }
        });
    },
    empleadoCreate(producto) {
      if (this.empleado != null) {
        axios
          .get("http://localhost:8080/product/user/" + this.empleado.id)
          .then(resp => {
            for (var i = 0; i < resp.data.length; i++) {
              if (resp.data[i].idproducto == producto.idproducto) {
                this.productEmp = true;
                break;
              }
            }
            this.deleteProducto(producto);
          });
      } else {
        Swal.fire({
          icon: "error",
          text: "Debe seleccionar un empleado",
          timer: 2000,
        });
      }
    },
  },
};
</script>