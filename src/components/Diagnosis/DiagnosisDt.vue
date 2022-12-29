<template>
    <div>
        <HeaderBar />
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
            <!-- <form>
                <div class="accordion" id="accordionPanelsStayOpenExample">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                        <button class="accordion-button" style="background-color:#b3e0dc;color:teal" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            Accordion Item #1
                        </button>
                        </h2>
                        <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                            <div class="accordion-body">
                                <div class="row">
                                    <div class="col-md-3">
                                        <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something"> Option 1
                                    </div>
                                    <div class="col-md-3">
                                        <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something" checked> Option 1
                                    </div>
                                    <div class="col-md-3">
                                        <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something"> Option 1
                                    </div>
                                    <div class="col-md-3">
                                        <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something"> Option 1
                                    </div>
                                </div>
                                 <div class="row">
                                    <div class="col-md-3">
                                        <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something" checked> Option 1
                                    </div>
                                    <div class="col-md-3">
                                        <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something"> Option 1
                                    </div>
                                    <div class="col-md-3">
                                        <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something"> Option 1
                                    </div>
                                    <div class="col-md-3">
                                        <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something"> Option 1
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                        <button class="accordion-button" style="background-color:#b3e0dc;color:teal"  type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                            Accordion Item #2
                        </button>
                        </h2>
                        <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingTwo">
                            <div class="accordion-body">
                                <div class="row">
                                    <div class="col-md-3">
                                        <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something"> Option 1
                                    </div>
                                    <div class="col-md-3">
                                        <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something" checked> Option 1
                                    </div>
                                    <div class="col-md-3">
                                        <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something"> Option 1
                                    </div>
                                    <div class="col-md-3">
                                        <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something"> Option 1
                                    </div>
                                </div>
                                 <div class="row">
                                    <div class="col-md-3">
                                        <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something" checked> Option 1
                                    </div>
                                    <div class="col-md-3">
                                        <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something"> Option 1
                                    </div>
                                    <div class="col-md-3">
                                        <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something"> Option 1
                                    </div>
                                    <div class="col-md-3">
                                        <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something"> Option 1
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                                <button class="accordion-button" style="background-color:#b3e0dc;color:teal" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                                    Accordion Item #3
                                </button>
                            </h2>
                            <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingThree">
                            <div class="accordion-body">
                                <div class="row">
                                    <div class="col-md-3">
                                        <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something"> Option 1
                                    </div>
                                    <div class="col-md-3">
                                        <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something" checked> Option 1
                                    </div>
                                    <div class="col-md-3">
                                        <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something"> Option 1
                                    </div>
                                    <div class="col-md-3">
                                        <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something"> Option 1
                                    </div>
                                </div>
                                 <div class="row">
                                    <div class="col-md-3">
                                        <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something" checked> Option 1
                                    </div>
                                    <div class="col-md-3">
                                        <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something"> Option 1
                                    </div>
                                    <div class="col-md-3">
                                        <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something"> Option 1
                                    </div>
                                    <div class="col-md-3">
                                        <input type="checkbox" class="form-check-input" id="check1" name="option1" value="something"> Option 1
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>



            </form> -->

            <div class="accordion" id="accordionPanelsStayOpenExample"  v-if="shouldShow">
                <div class="accordion-item" v-for="(item,index) in listofTests" :key="index">
                    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                    <button style="background-color:#b3e0dc;color:teal" class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                        {{item}}
                    </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                    <div class="accordion-body">
                        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            <!-- <div v-for="(z,x) in "> </div> -->
                    </div>
                    </div>
                </div>
            </div>
             <div v-if="shouldShow">
                    <!-- <div v-for="(item,index) in listofTests" :key="index" style="background-color:red;"> {{item}} </div> -->
                    <div v-for="(item,index) in listofTests" :key="index" style="background-color:red;"> {{item}} </div>

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
  data(){
    return{
        message:'Click search for existing user and click register for new user',
        patientId:'',
        listOfTests:[],
        shouldShow:false,
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
  }
}
</script>