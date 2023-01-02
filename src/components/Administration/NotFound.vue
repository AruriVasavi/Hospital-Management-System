<template>
<div>
    <HeaderBar />
    <h1>
        Not found
    </h1>
   <!-- <div class="accordion" id="accordionPanelsStayOpenExample">
      <div class="accordion-item">
          <h2 class="accordion-header" id="panelsStayOpen-headingOne">
          <button class="accordion-button" style="background-color:#b3e0dc;color:teal" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
              Blood
          </button>
          </h2>
          <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
              <div class="accordion-body">
                <div class="row">
                    <div v-for="(item, ind) in bloodCategories" :key="ind" class="col-md-3" >
                      <div class="col-md-3">
                          <input type="checkbox" class="form-check-input" :id="item.dgid" :name="item.dgid" :value="item.dgid" v-model="checkedProducts"> {{item.testname}}
                      </div>
                    </div>
                </div>
              </div>
          </div>
      </div>
    <div class="accordion-item">
        <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
        <button class="accordion-button" style="background-color:#b3e0dc;color:teal"  type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
            Scan
        </button>
        </h2>
        <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingTwo">
            <div class="accordion-body">
                <div class="row">
                   <div v-for="(item, ind) in scanCategories" :key="ind" class="col-md-3" >
                      <div class="col-md-3">
                        <input type="checkbox" class="form-check-input" :id="item.dgid" :name="item.dgid" :value="item.dgid" v-model="checkedProducts"> {{item.testname}}
                      </div>
                  </div>
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                <button class="accordion-button" style="background-color:#b3e0dc;color:teal" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                   Misc
                </button>
            </h2>
            <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingThree">
            <div class="accordion-body">
                <div class="row">
                    <div v-for="(item, ind) in miscCategories" :key="ind" class="col-md-3" >
                      <div class="col-md-3">
                        <input type="checkbox" class="form-check-input" :id="item.dgid" :name="item.dgid" :value="item.dgid" v-model="checkedProducts"> {{item.testname}}
                      </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
    </div> -->



  <!-- <button type="button" class="btn btn-primary" @click="onSubmit()"> Submit </button> -->
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
      refinedTest:[],
      bloodCategories:[],
      miscCategories:[],
      scanCategories:[],
      checkedProducts:[]
    }
  },

  mounted() {
    let vm=this;

    vm.refinedTest = {
      info:[
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
          category:'blood',
          dgid:"dgid11324",
          testname: 'test2a',
          price:'test2'
        },
         {
          category:'blood',
          dgid:"dgid1145",
          testname: 'test1b',
          price:'test2'
        },
        {
          category:'blood',
          dgid:"dgid2265",
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

   for(let i = 0; i< vm.refinedTest.info.length; i++) {
      if (vm.refinedTest.info[i].category == "scan") {
        vm.scanCategories.push(vm.refinedTest.info[i]);
      }
      if (vm.refinedTest.info[i].category == "misc") {
        vm.miscCategories.push(vm.refinedTest.info[i]);
      }
      if (vm.refinedTest.info[i].category == "blood") {
         vm.bloodCategories.push(vm.refinedTest.info[i]);
      }
    }
  },
   // console.log(vm.test.another[0].dgid);


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
  max-width:500px;
}
.child {
  display: inline-block;
  border: 1px solid red;
  padding: 1rem 1rem;
  vertical-align: middle;
}
</style>