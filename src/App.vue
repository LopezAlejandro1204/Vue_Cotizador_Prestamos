<!-- // imporportar otro componentes entre otros -->
<script setup>
  import {ref, computed, watch} from 'vue'
  import Header from './components/Header.vue'
  import Button from './components/Button.vue'
  //importando la funcion del interes
  import {calcularTotalPagar} from './helpers/index.js'

  //definiendo state
  const cantidad = ref(10000) // Valor inicial state para cantidad
  const meses = ref(6) //State para los meses
  const total = ref(0) // State del total a pagar

  //valores de la barra - Las constantes son mayusculas
  //poner : para que sea dinamico dentro del template
  const MIN=0
  const MAX=20000
  const STEP=100

  //El computed estara al pendiente de cualquier cambio de nuestro state
  const formatearDinero = (valor) => { 
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }); //internacionalizacion

    return formatter.format(valor)
  };

  //pasamos como dep la cantidad, puede ser solo uno o tambien un arreglo
  watch([cantidad, meses], () =>{
    total.value = calcularTotalPagar(cantidad.value, meses.value)
  });

  const pagoMensual = computed (() => {
    return total.value/meses.value
  });

  //Un evento para el cambio de la barra
  // function handleChange(e){
  //   cantidad.value = Number(e.target.value) //escribimos en el state
  // }

  const handleChangeDecremento = () =>{
    const valor = cantidad.value-STEP;
    if(valor < MIN){
      alert('Cantidad no validad');
      return;
    }
    cantidad.value =valor;
  }
  const handleChangeIncremento = () =>{
    const valor = cantidad.value + STEP;
    if(valor > MAX){
      alert('Cantidad no validad');
      return;
    }
    cantidad.value =valor;
  }
</script>

<template>
  <div class="my-20 max-w-lg mx-auto bg-white shadow p-10">
    <Header/>
    
    <div class="flex justify-between mt-10">
      <Button
        :operador="'-'"
        @fn="handleChangeDecremento"
      />
      <Button
        :operador="'+'"
        @fn="handleChangeIncremento"
      />

    </div>

    <div class="my-5">
      <input 
        type="range"
        class="w-full bg-gray-200 accent-lime-500 hover:accent-lime-600"
        :min="MIN"
        :step="STEP"
        :max="MAX"

        v-model.Number="cantidad" 
      />

      <p class="text-center my-10 text-5xl font-extrabold text-indigo-600">
        {{ formatearDinero(cantidad) }}
      </p>

      <h2 class="text-2xl font-extrabold text-gray-500 text-center">
        Elige un <span class="text-indigo-600">Plazo </span>a pagar
      </h2>

      <select 
      class="w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl
        font-bold text-gray-500 mt-5"
        :value="meses"
        v-model.Number="meses"
      >
        <option value="6">6 meses</option>
        <option value="12">12 meses</option>
        <option value="24">24 meses</option>
      </select>
    </div>

    <div v-if="total>0" class="my-5 space-y-3 bg-gray-50 p-5">
        <h2 class="text-2xl font-extrabold text-gray-500 text-center">
          Resumen <span class="text-indigo-600">de pagos</span>
        </h2>
        <p class="text-xl text-gray-500 text-center text-bold">{{meses}} Meses</p>
        <p class="text-xl text-gray-500 text-center text-bold">Total a pagar: {{ formatearDinero(total) }} </p>
        <p class="text-xl text-gray-500 text-center text-bold">Mensuales {{ formatearDinero(pagoMensual) }} </p>
    </div>
    <p v-else class="text-center">Añade una cantidad y un plazo a pagar</p>


  </div>
</template>

