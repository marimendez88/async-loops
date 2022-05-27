<template>
<div class="container">
  <input v-model="searchTerm" type="text" placeholder="Search...">
  <button class="search" @click="searchOnApi">Search</button>
</div>
<section class="loops">
  <section class="for-loop">
    <h2>For Loop: {{forItems.length}}</h2>
    <h4>Items processed: <b class="red">{{forItemsProcessed}}</b> vs Items Resolved:  <b class="red">{{forItemsResolved}}</b></h4>
    <h5>Execution Time : {{forTimer}} milliseconds</h5>
    <h5>How many times United States appears : {{forTotalAppears}}</h5>
    <button class="btn-primary" @click="forCountCountry">Calculate</button>
    <table id="results">
        <tr>
            <th>Processed</th>
     <th>City</th>
      <th>State</th>
    <th>Country</th>
    <th>Time</th>
  </tr>
   <tr  v-for="item in forItems">
    <td class="red">{{item.ready}}</td>
    <td>{{item.city}}</td>
    <td>{{item.state}}</td>
    <td>{{item.country}}</td>
    <td class="red">{{item.valueAdded}}</td>
  </tr>
    </table>
  </section>
  <section class="forEach-loop">
    <h2>ForEach Loop {{forEachItems.length}}</h2>
       <h4>Items processed: <b class="green">{{forEachItemsProcessed}}</b> vs Items Resolved:  <b class="green">{{forEachItemsResolved}}</b></h4>
     <h5>Execution Time : {{forEachTimer}} milliseconds</h5>
    <h5>How many times United States appears : {{forEachTotalAppears}}</h5>
    <button class="btn-primary" @click="forEachCountCountry">Calculate</button>
      <table id="results">
        <tr>
            <th>Processed</th>
     <th>City</th>
      <th>State</th>
    <th>Country</th>
      <th>Time</th>
  </tr>
   <tr  v-for="item in forEachItems">
    <td class="green">{{item.ready}}</td>
    <td>{{item.city}}</td>
    <td>{{item.state}}</td>
    <td>{{item.country}}</td>
    <td class="green">{{item.valueAdded}}</td>
  </tr>
    </table>
  </section>
  <section class="map-loop">
    <h2>Map Loop {{mapItems.length}}</h2>
    <h4>Items processed: <b class="blue">{{mapItemsProcessed}}</b> vs Items Resolved:  <b class="blue">{{mapItemsResolved}}</b></h4>
     <h5>Execution Time : {{mapTimer}} milliseconds</h5>
    <h5>How many times United States appears : {{mapTotalAppears}}</h5>
    <button class="btn-primary" @click="mapCountCountry">Calculate</button>
      <table id="results">
        <tr>
            <th>Processed</th>
     <th>City</th>
      <th>State</th>
    <th>Country</th>
      <th>Time</th>
  </tr>
   <tr  v-for="item in mapItems">
    <td class="blue">{{item.ready}}</td>
    <td>{{item.city}}</td>
    <td>{{item.state}}</td>
    <td>{{item.country}}</td>
    <td class="blue">{{item.valueAdded}}</td>
  </tr>
    </table>
  </section>
</section>

</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { AxiosService } from '../services/axios.service';

export default defineComponent({
  name: 'Home',
  components: {},
  setup() {

    type Item = {
      city: string;
      state: string;
      country: string;
      valueAdded: string;
      ready: string
    };
    let searchTerm = ref('paris');

 const _axios = new AxiosService();
    _axios.getAxiosCall(searchTerm.value).then(res => {
       forItems.value = res.data
    });
    _axios.getAxiosCall(searchTerm.value).then(res => {
       mapItems.value = res.data
    });
    _axios.getAxiosCall(searchTerm.value).then(res => {
       forEachItems.value = res.data
    });
    const searchOnApi = () => {
        resetValues();
        _axios.getAxiosCall(searchTerm.value).then(res => {
       forItems.value = res.data
    });
    _axios.getAxiosCall(searchTerm.value).then(res => {
       mapItems.value = res.data
    });
    _axios.getAxiosCall(searchTerm.value).then(res => {
       forEachItems.value = res.data
    });
    }
    const resetValues = () => {
      forTimer.value = 0;
      forEachTimer.value = 0;
      mapTimer.value = 0;
      forTotalAppears.value = 0;
      forEachTotalAppears.value = 0;
      mapTotalAppears.value = 0;
    }

    // * For variables
    let forItems: Ref<Item[]> = ref([])
    let forTimer: Ref<number> = ref(0);
    let forTotalAppears: Ref<number> = ref(0);
    let forItemsProcessed: Ref<number> = ref(0);
    let forItemsResolved: Ref<number> = ref(0);
    const forCountCountry = async () => {
       forTotalAppears.value = 0;
       forItemsProcessed.value = 0;
       forItemsResolved.value = 0;
      const initialTime = performance.now();
      const logger = getLogger("For Loop");
      for (let item of forItems.value) {
        forItemsProcessed.value++;
        const start = Date.now();
        await waitFor(1,item);
        if (item.country === 'United States') {
          forTotalAppears.value++;
        }
        const later = Date.now();
        const total = later - start;
        item.valueAdded = (Math.round(total/1000)).toString();
        logger(item.city, total);
        forItemsResolved.value++;
      }
      const finalTime = performance.now();
      forTimer.value = finalTime - initialTime;
    }


    // * ForEach variables
    let forEachItems: Ref<Item[]> = ref([])
    let forEachTimer: Ref<number> = ref(0);
    let forEachTotalAppears: Ref<number> = ref(0);
    let forEachItemsProcessed: Ref<number> = ref(0);
    let forEachItemsResolved: Ref<number> = ref(0);
     const forEachCountCountry = async () => {
       forEachTotalAppears.value = 0;
       forEachItemsProcessed.value = 0;
        forEachItemsResolved.value = 0;
      const initialTime = performance.now();
        const logger = getLogger("ForEach Loop");
        forEachItems.value.forEach(async item => {
         const start = Date.now();
        forEachItemsProcessed.value++;
        await waitFor(1, item);
        if (item.country === 'United States') {
          forEachTotalAppears.value++;
        }
        const later = Date.now();
        const total = later - start;
         item.valueAdded = (Math.round(total/1000)).toString();
        logger(item.city + item.state, total);
        forEachItemsResolved.value++;
      });
      const finalTime = performance.now();
      forEachTimer.value = finalTime - initialTime;
    }
        // * Map variables
    let mapItems: Ref<Item[]> = ref([])
    let mapTimer: Ref<number> = ref(0);
    let mapTotalAppears: Ref<number> = ref(0);
    let mapItemsProcessed: Ref<number> = ref(0);
    let mapItemsResolved: Ref<number> = ref(0);

     const mapCountCountry = async () => {
        mapTotalAppears.value = 0;
        mapItemsProcessed.value = 0;
        mapItemsResolved.value = 0;
        const initialTime = performance.now();
        const logger = getLogger("Map Loop");
        mapItems.value.map(async item => {
        const start = Date.now();
        mapItemsProcessed.value++;
        await waitFor(1, item);
        if (item.country === 'United States') {
          mapTotalAppears.value++;
        }
        const later = Date.now();
        const total = later - start;
         item.valueAdded = (Math.round(total/1000)).toString();
        logger(item.city + item.state, total);
        mapItemsResolved.value++;
      });
      const finalTime = performance.now();
      mapTimer.value = finalTime - initialTime;
    }



    const  waitFor = (seconds: number, item: Item)  => {
      // the fake asynchronous task
      return new Promise<void>(resolve => {
        item.ready = 'Yes';
        setTimeout(() => {
          resolve();
        }, seconds * 1000);
      });
    }

     // creates a logger function to print logs with function name
      const  getLogger = (fnName: string)  => {
        return function logger (value: string, diffInMS: number) {
          return console.log(
            `${fnName}: Item ${value} finished waiting ${Math.round(
              diffInMS / 1000
            )} seconds later.`
          );
        };
      }



    return {
      searchTerm,
      forItems,
      forTimer,
      forTotalAppears,
      forItemsProcessed,
      forItemsResolved,
      forCountCountry,
      mapItems,
      mapTimer,
      mapTotalAppears,
      mapItemsProcessed,
      mapItemsResolved,
      mapCountCountry,
      forEachItems,
      forEachTimer,
      forEachTotalAppears,
      forEachItemsProcessed,
      forEachItemsResolved,
      forEachCountCountry,
      searchOnApi,
    }
  },
});
</script>

<style scoped lang="scss">
.container {
  position: relative;
  margin: auto;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .search {
    width: 70px;
    height: 70px;
    background: rgb(10, 6, 7);
    border-radius: 50%;
    color: white;
  }
  input {
    font-family: 'Inconsolata', monospace;
    width: 180px;
    height: 50px;
    outline: none;
    border: none;
    background: rgb(251, 186, 199);
    color: white;
    text-shadow: 0 0 10px rgb(183, 132, 142);
    padding: 0 80px 0 20px;
    border-radius: 30px;

  }
}
  .loops{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
    .btn-primary {
      width: 150px;
      height: 50px;
      background: rgb(45, 36, 39);
      border-radius:10px;
      color: white;
      font-weight: 700;
    }
  }
  .red {
    color:red;
  }
  .green {
    color:green;
  }
  .blue {
    color:blue;
  }
  #results {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#results td, #results th {
  border: 1px solid #ddd;
  padding: 8px;
}

#results tr:nth-child(even){background-color: #f2f2f2;}

#results tr:hover {background-color: #ddd;}

#results th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color:rgb(104, 30, 44);
  color: white;
}
</style>
