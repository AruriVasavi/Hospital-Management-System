<template>
    <div>
        <HeaderBar />


        <!-- {{ totalAmount }} -->
        <div style="margin:10px;">
            <h1> Hello diagnosis!! </h1>
                <div style="background-color:red" v-for="item of listOfTests" :key="item">{{item}}</div>
                <div class="container" style="width:500px;height:100px;">
                    <form class="d-flex">
                    <input class="form-control me-2"  v-model= "patientId"  type="search" placeholder="Enter phonenumber to search..." aria-label="Search">
                    <button class="btn" @click="searchPatient()" style="background-color:teal;color:white" type="button">Search</button>
                    </form>
                </div>
             <div class="container-fluid">
                  <table class="table table-hover table-bordered">
                    <thead>
                        <tr>
                        <th>PID</th>
                        <th>Name</th>
                        <th>Age </th>
                        <th>Phone number </th>
                        <th> Address </th>
                        <th> Sex </th>
                        <th> Diagnosis doctor </th>
                        <th> Last payment date </th>
                        <th> Valid upto </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="user.pid == ''">
                            <td  colspan="8" style="text-align:center">
                            {{message}}
                            </td>
                        </tr>
                        <tr v-else>
                            <td>{{user.pid}} </td>
                            <td>{{user.name}} </td>
                            <td>{{user.age }}</td>
                            <td>{{user.phonenumber }}</td>
                            <td>{{user.address}} </td>
                            <td>{{user.sex}} </td>
                            <td>{{user.diagnosisdoctor}} </td>
                            <td>{{user.lastPaymentDate}} </td>
                            <td>{{user.validupto}} </td>
                        </tr>
                    </tbody>
                  </table>
             </div>
             <div v-if="shouldShow">
               <div class="accordion" id="accordionPanelsStayOpenExample">
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
               </div>
             </div>

            <button  type="button" class="btn mt-3" style="background-color:teal;color:white" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="totalSum">
                 Check Price
            </button>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Confirm Price</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p> Total Amount: {{totalPrice}} </p>
                        Are you sure you want to proceed?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>


        </div>
    </div>
</template>
<script>
import HeaderBar from '../UIComponents/HeaderBar.vue';
import axios from "axios";
export default{
  name: 'DiagnosisDt',
  components: {
    HeaderBar
  },

  mounted() {
    let vm = this;
     vm.refinedTest = {
      info:[
        {
          category:'blood',
          dgid:"dgid1",
          testname: 'test1',
          price:10
        },
        {
          category:'blood',
          dgid:"dgid2",
          testname: 'test2',
          price:20
        },
         {
          category:'blood',
          dgid:"dgid456",
          testname: 'test1a',
          price:30
        },
        {
          category:'blood',
          dgid:"dgid324",
          testname: 'test2a',
          price:40
        },
         {
          category:'blood',
          dgid:"dgid45",
          testname: 'test1b',
          price:50
        },
        {
          category:'blood',
          dgid:"dgid65",
          testname: 'test2b',
          price:60
        },
         {
          category:'blood',
          dgid:"dgid11324",
          testname: 'test2a',
          price:70
        },
         {
          category:'blood',
          dgid:"dgid1145",
          testname: 'test1b',
          price:80
        },
        {
          category:'blood',
          dgid:"dgid2265",
          testname: 'test2b',
          price:90
        },
        {
          category:'misc',
          dgid:"dgid3",
          testname: 'test11',
          price:100
        },
        {
          category:'misc',
          dgid:"dgid4",
          testname: 'test22',
          price:110
        },
        {
          category:'scan',
          dgid:"dgid5",
          testname: 'test111',
          price:120
        },
        {
          category:'scan',
          dgid:"dgid6",
          testname: 'test222',
          price:130
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
  computed: {
    // totalAmount() {
    //     let vm = this;
    //     console.log(vm.refinedTest.info.length);
    //     for (let i = 0; i< vm.refinedTest.info.length; i++)
    //     {
    //         for (let j = 0; j < vm.checkedProducts.length; j++) {
    //             if (vm.checkedProducts[j] == vm.refinedTest.info[i].dgid) {
    //                 vm.totalPrice = vm.totalPrice + vm.refinedTest.info[i].price;
    //             }
    //         }
    //      }

    //     return vm.totalPrice;
    // }
  },
  data(){
    return{
        message:'Click search for existing user and click register for new user',
        patientId:'',
        listOfTests:[],
        shouldShow:true,
        refinedTest:[],
        bloodCategories:[],
        miscCategories:[],
        scanCategories:[],
        checkedProducts:[],
        totalPrice:0,
        user: {
            name: '',
            age:1,
            phonenumber:'',
            address:'',
            sex:'Select Sex',
            diagnosisdoctor:'Select Doctor',
            pid: '',
            daysFromLastPayment: 0,
            visitsAfterLastPayment: 1,
            daysFromLastVisit: 0,
            lastPaymentDate:'',
            validupto:'',
        },
        shouldGetDiagnosisInfo:false,
        testInfo:[],
    }
  },
  methods:{
     async searchPatient()
      {
        let vm = this;
        let api = 'http://localhost/WebApplication1/api/PatientRegistration/?uniqID=' + this.patientId;
          await axios.get(api)
          .then(response => {
            if (response != null && response.data != null)
            {
              vm.user.pid = response.data.pid;
              vm.user.name = response.data.name;
              vm.user.age = response.data.age;
              vm.user.phonenumber = response.data.phonenum;
              vm.user.address = response.data.Address;
              vm.user.sex = response.data.sex;
              vm.user.diagnosisdoctor = response.data.DiagnosisDoctor;
              vm.user.daysFromLastPayment = response.data.DaysFromLastPayment;
              vm.user.visitsAfterLastPayment = response.data.VisitsAfterLastPayment;
              vm.user.daysFromLastVisit = response.data.DaysFromLastVisit;

              var test = response.data.LastPaymentDate;
              //vm.user.lastPaymentDate = response.data.LastPaymentDate
              var result1 = new Date(test);
              let getMonth1 = result1.getMonth() + 1;
              vm.user.lastPaymentDate = result1.getFullYear() + '-' + getMonth1 + '-' + result1.getDate();

              var result = new Date(test);
              result.setDate(result.getDate() + 14);
              let getMonth = result.getMonth() + 1;
              vm.user.validupto = result.getFullYear() + '-' + getMonth + '-' + result.getDate();

              vm.shouldGetDiagnosisInfo = true;
            }
            else
            {
              vm.message = 'User details not found';
              vm.onGetPatientReset();
            }
          }).catch(error => {
            console.log(error.response);
            vm.onGetPatientReset();
          });

        if(vm.shouldGetDiagnosisInfo){
        vm.listofTests = [];
        vm.testInfo = [];
        let a = {};
          let api = 'http://localhost/WebApplication1/api/Diagnosis';
          await axios.get(api)
          .then(response => {
            if (response != null && response.data != null)
            {
                //console.log(response.data);
                for (var key in response.data) {
                   // console.log(key);
                    vm.listofTests.push(key);
                    //console.log(vm.listofTests.length);
                    for(var i = 0;i < vm.listofTests.length;i++){
                       console.log(vm.listofTests[i].dgid);
                        console.log(vm.listofTests[i].testname);
                        console.log(vm.listofTests[i].price);

                        a =     {
                                    cat: key,
                                    dgid: vm.listofTests[i].dgid,
                                    testname: vm.listofTests[i].testname,
                                    price: vm.listofTests[i].price
                                }
                        vm.testInfo.push(a);
                    }

                }
                vm.shouldShow = true;
                vm.testInfo.forEach(a => console.log(a));
            }

           // console.log('outside');
            //console.log(vm.listofTests);

         })
        }
        vm.patientId = '';
      },
    onGetPatientReset() {
        let vm = this;
        vm.user.pid = '';
        vm.user.name = '';
        vm.user.age = '';
        vm.user.phonenumber = '';
        vm.user.address = '';
        vm.user.sex = 'Select Sex';
        vm.user.diagnosisdoctor = 'Select Doctor';
      },
      totalSum() {
        let vm = this;
        vm.totalPrice = 0;
        for (let i = 0; i< vm.refinedTest.info.length; i++){
        for (let j = 0; j < vm.checkedProducts.length; j++) {
            if (vm.checkedProducts[j] == vm.refinedTest.info[i].dgid) {
                vm.totalPrice = vm.totalPrice + vm.refinedTest.info[i].price;
                console.log(vm.totalPrice);
            }
        }
        }
      }
  }
}
</script>