<template>
<div>
    <HeaderBar />
    <h1>
        Not found
    </h1>
 <div class='parent'>
    <div class='child'><input type="checkbox" > Test 1</div>
    <div class='child'> <input type="checkbox"> Test 1child 2</div>
    <div class='child'><input type="checkbox" > Test 1</div>
</div>
  <!-- <div v-for="(item,ind) in test.another" :key="ind"> {{item.category}} {{item.dgid}}</div> -->
  <div v-for="(item,ind) in test.categories" :key="ind" >
    <p style="font-weight:bold"> {{item}} </p>
    <div v-for="(a,ind) in test.another" :key="ind" class="row" >
        <span v-if="a.category == item" class="col-md-2" >
          <input  type="checkbox" :id="a.dgid" :name="a.dgid" :value="a.dgid" v-model="checkedProducts"> {{a.testname}}
       </span>
     </div>
  </div>


  <!-- <div class="accordion" id="accordionPanelsStayOpenExample">
    <div v-for="(item,ind) in test.categories" :key="ind" class="accordion-item">
    <h2 class="accordion-header" :id="key" >
      <button class="accordion-button" style="background-color:#b3e0dc;color:teal" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
        {{item}}
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" :aria-labelledby="key">
      <div class="accordion-body">
        <p>  Do not consider this span</p>
        <span v-if="a.category == item" class="form-check form-check-inline" >
          <input type="checkbox" class="form-check-input" id="check1" :name="a.dgid" :value="a.dgid" v-model="checkedProducts"> {{a.testname}}
        </span>

        <div class="row" v-for="(a,ind) in test.another" :key="ind">
        <div class="col-md-4"  style="background-color:yellow;margin:0px;" v-if="a.category == item">
          <input  type="checkbox" :id="a.dgid" :name="a.dgid" :value="a.dgid" v-model="checkedProducts"> {{a.testname}}!!
        </div>
        </div>
      </div>
    </div>
  </div>
  </div> -->

  <button type="button" class="btn btn-primary" @click="onSubmit()"> Submit </button>
</div>
</template>

<script>
import HeaderBar from '../UIComponents/HeaderBar.vue';

export default{
  name: 'NotFound',
   components: {
    HeaderBar
  },
  data() {
    return {
      test:[],
      checkedProducts:[]
    }
  },

  mounted() {
    let vm=this;
    vm.test = {
      categories: ['blood', 'misc', 'scan'],
      another:[
          {
          category:'blood',
          dgid:"dgid1",
          testname: 'test1',
          price:'test2'
        },
        {
          category:'blood',
          dgid:"dgid2",
          testname: 'test2',
          price:'test2'
        },
         {
          category:'blood',
          dgid:"dgid456",
          testname: 'test1a',
          price:'test2'
        },
        {
          category:'blood',
          dgid:"dgid324",
          testname: 'test2a',
          price:'test2'
        },
         {
          category:'blood',
          dgid:"dgid45",
          testname: 'test1b',
          price:'test2'
        },
        {
          category:'blood',
          dgid:"dgid65",
          testname: 'test2b',
          price:'test2'
        },
        {
          category:'misc',
          dgid:"dgid3",
          testname: 'test11',
          price:'test2'
        },
        {
          category:'misc',
          dgid:"dgid4",
          testname: 'test22',
          price:'test2'
        },
        {
          category:'scan',
          dgid:"dgid5",
          testname: 'test111',
          price:'test2'
        },
        {
          category:'scan',
          dgid:"dgid6",
          testname: 'test222',
          price:'test2'
        },
      ],

    }
    console.log(vm.test.another[0].dgid);
  },
  methods:{
    onSubmit(){

      console.log("on Submit clicked");
      this.checkedProducts.forEach((a ) =>  console.log(a))
    }
  }

}
</script>

<style scoped>
.parent {
  border: 1px solid black;
  margin: 1rem;
  padding: 2rem 2rem;
  text-align: center;
  display:flex;
  align-content: center;
}
.child {
  display: inline-block;
  border: 1px solid red;
  padding: 1rem 1rem;
  vertical-align: middle;
}
</style>