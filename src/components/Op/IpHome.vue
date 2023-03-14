<template>
    <div>
        <HeaderBar />
        <h2> Welcome to IP </h2>

        <div style="margin:10px;">
            <button class="btn btn-success"  @click="showInPatient=true;showOutPatient=false;">In Patient</button>
            <button class="btn btn-danger" style="margin-left:7px;" @click="onOutPatient1()">Out Patient1</button>
        </div>

        <!-- In Patient -->
        <div v-if="showInPatient">
            <div class="container" style="width:1000px;height:40px;display: flex;justify-content: center;">
                <form class="d-flex">
                    <input class="form-control me-2" style="width:400px;"  v-model= "patientId"  type="search" placeholder="Enter phonenumber to search..." aria-label="Search">
                    <button class="btn" :disabled="!patientId"  @click="searchPatient()" style="background-color:teal;color:white" type="button">Search</button>
                    <button class="btn btn-primary"  @click="gotoOp()" style="margin-left:7px;" type="button">OP</button>
                </form>
            </div>
            <div class="container-fluid" style="margin-top:50px;">
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
                    <th> Actions </th>
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
                        <td>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#admitModal">
                                Admit
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>

        <!-- Out patient -->
        <div v-if="showOutPatient">
            <div class="container-fluid">

                <table class="table table-hover table-bordered mt-5"  id="myTable1">
                    <thead>
                        <tr>
                            <th>PID</th>
                            <th>PName</th>
                            <th>Admitted Date</th>
                            <th>Amount Paid</th>
                            <th>Due amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                </table>
            </div>
        </div>

        <!-- Admit modal -->
       <div class="modal fade" id="admitModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Admit </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group row mb-3 ">
                            <label for="roomnumber" class="col-sm-4 col-form-label">Room</label>
                            <div class="col-sm-8">
                                <select v-model = "roomnumber" class="form-select form-select mb-3" aria-label=".form-select-sm example">

                                    <option v-for="room in availableRooms" :key="room" :value="room">{{room}}</option>

                                </select>
                            </div>
                        </div>
                        <div class="form-group row mb-3 ">
                            <div v-if="shouldDisplayCollectPaymentError" style="color:red"> Please select valid payment mode </div>
                            <label for="modeofpayment" class="col-sm-4 col-form-label">Mode of payment</label>
                            <div class="col-sm-8">
                                <select v-model = "modeofpayment" class="form-select form-select mb-3" aria-label=".form-select-sm example">
                                    <option selected>Select Mode of Payment</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Upi">Upi</option>
                                    <option value="CrditDebitCard">Credit/Debit card</option>
                                    <option value="None">None</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row mb-3">
                            <label for="Amount" class="col-sm-4 col-form-label">Amount</label>
                            <div class="col-sm-8">
                            <input v-model = "amount" type="number" class="form-control" placeholder="Amount">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="admit()">Admit</button>
                    </div>
                </div>
            </div>
       </div>

       <!-- Discharge modal -->

        <div class="modal fade" id="dischargeModal" tabindex="-1" aria-labelledby="dischargeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="dischargeModalLabel">Discharge {{dPatientName}} {{dPid}}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">

                    <div class="form-group row mb-3">
                            <label for="Amount" class="col-sm-4 col-form-label">Due Amount</label>
                            <div class="col-sm-8">
                                 <input v-model = "dDueAmount" type="number" class="form-control" placeholder="Due Amount">
                            </div>
                    </div>
                    <div class="form-group row mb-3 ">

                            <label for="dModeofPayment" class="col-sm-4 col-form-label">Mode of payment</label>
                            <div class="col-sm-8">
                                <select v-model = "dModeofPayment" class="form-select form-select mb-3" aria-label=".form-select-sm example">
                                    <option selected>Select Mode of Payment</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Upi">Upi</option>
                                    <option value="CrditDebitCard">Credit/Debit card</option>
                                    <option value="None">None</option>
                                </select>
                            </div>
                        </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="dischargePatient()">Discharge Patient</button>
                </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
 // eslint-disable-next-line no-unused-vars
// var dtest;
import HeaderBar from '../UIComponents/HeaderBar.vue';
import axios from "axios";
import $ from 'jquery';
export default{
    name: 'IpHome',
    components: {
    HeaderBar
    },
    data() {
        return {
            test1:'',
            dPid:'',
            dModeofPayment:'Select Mode of Payment',
            dDueAmount:0,
            dPatientName:'',
            message:'Click search for existing user or click register for new user',
            roomnumber:0,
            patientId : '',
            shouldDisplayCollectPaymentError:false,
            showInPatient:false,
            showOutPatient:false,
            availableRooms:[100,101,102,200,201,202],
            modeofpayment:'Select Mode of Payment',
            amount:300,
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

            dischargeInfo:{
                "dinfo":
                    [
                        {
                            "pid":"PID50",
                            "pname":"cbc",
                            "admitteddate": "2023-01-14",
                            "amountpaid": 800,
                            "dueamount":900
                        },
                        {
                            "pid":"PID51",
                            "pname":"cbc1",
                            "admitteddate":"2023-01-14",
                            "amountpaid": 800,
                            "dueamount":900
                        },
                        {
                            "pid":"PID52",
                            "pname":"cbc2",
                            "admitteddate":"2023-01-14",
                            "amountpaid": 8100,
                            "dueamount":9100
                        },
                        {"pid":"PID53",
                            "pname":"cbc3",
                            "admitteddate":"2023-01-14",
                            "amountpaid": 3800,
                            "dueamount":9400
                        },
                        {
                            "pid":"PID54",
                            "pname":"cbc4",
                            "admitteddate":"2023-01-14",
                            "amountpaid": 8600,
                            "dueamount":9400
                        },
                        {
                            "pid":"PID55",
                            "pname":"cbc5",
                            "admitteddate":"2023-01-14",
                            "amountpaid": 4800,
                            "dueamount":9070
                        },
                        {
                            "pid":"PID56",
                            "pname":"cbc56",
                            "admitteddate":"2023-01-14",
                            "amountpaid": 7800,
                            "dueamount":9400
                        },
                        {
                            "pid":"PID57",
                            "pname":"cbc68",
                            "admitteddate":"2023-01-14",
                            "amountpaid": 4800,
                            "dueamount":9050
                        },
                        {
                        "pid":"PID58",
                            "pname":"cbc6",
                            "admitteddate":"2023-01-14",
                            "amountpaid": 8500,
                            "dueamount":9500
                        }
                    ]
            }

        }
    },
    methods:{
        onOutPatient()
        {
            this.showInPatient=false;
            this.showOutPatient=true;
            this.getUsers();
        },
        onOutPatient1()
        {
            this.showInPatient=false;
            this.showOutPatient=true;
            this.getUsers1();
        },
        getUsers1()
        {
            let vm = this;
            var table = $("#myTable1").DataTable({
                // dom: 'Bfrip',
                // buttons:['colvis', 'excel', 'print', 'csv'],
                data: vm.dischargeInfo.dinfo,
                columns:
                [
                    {data: 'pid' },
                    {data: 'pname' },
                    {data: 'admitteddate' },
                    {data: 'amountpaid' },
                    {data: 'dueamount' },
                    {
                            targets: -1,
                            data: null,
                            defaultContent: "<button class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#dischargeModal'>Discharge</button>",
                    },
                ],
            })

            $('#myTable1 tbody').on('click', 'button', function () {
                        var data = table.row($(this).parents('tr')).data();
                        //alert(data.pid + "'s due amount is: " + data.dueamount);
                        // this.dPid = data.pid;
                        // console.log(this.dPid+ ' is the id');
                        //dtest = data.pid;
                        vm.dPid = data.pid;
                        vm.dPatientName = data.pname,
                        vm.dDueAmount = data.dueamount
                        $('#dischargeModal').on('shown.bs.modal', function () {
                         //$('#myInput').trigger('focus')
                         // this.dPid = data.pid;
                        })
            });
        },
        dischargePatient() {
            console.log('from dischargePatient');
            console.log(this.dPid);
            console.log(this.dPatientName);
            console.log(this.dDueAmount);
            console.log(this.dModeofPayment);
           // console.log(dtest);
        },
        gotoOp()
        {
            const routeData = this.$router.resolve({name: 'ophome'});
            window.open(routeData.href, '_blank');
        },
        async searchPatient()
        {
            let vm = this;
            vm.shouldDisablePrint = true;

            if (this.patientId.trim())
            {
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
                        vm.shouldDisablePrint = false;
                    }
                    else
                    {
                        vm.message = 'User details not found';
                        vm.onGetPatientReset();
                    }
                    }).catch(error => {
                        console.log("error from ophome seach");
                        console.log(error.response);
                        vm.onGetPatientReset();
                    });
            }
            vm.patientId = '';
        },
        admit() {
            console.log("in admin");
            console.log(this.roomnumber);
            console.log(this.user.pid);
            console.log(this.modeofpayment);
            console.log(this.amount);
        },
        onGetPatientReset()
        {
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
