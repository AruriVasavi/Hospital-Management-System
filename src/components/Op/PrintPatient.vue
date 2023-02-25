<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col-sm-3">
                    <span> PatientId:   {{this.patientObj.pid}} </span>
                </div>
                <div class="col-sm-3">
                    <span> Name:   {{this.patientObj.name}} </span>
                </div>
                <div class="col-sm-3">
                     <span> Age:   {{this.patientObj.age}} </span>
                </div>
                 <div class="col-sm-3">
                     <span> Sex:   {{this.patientObj.sex}} </span>
                </div>
            </div>
            <div class="row" style="margin-top:10px">
                <div class="col-sm-3">
                    <span> Address:   {{this.patientObj.address}} </span>
                </div>
                <div class="col-sm-3">
                    <span> Diagnosis Doctor:   {{this.patientObj.diagnosisdoctor}} </span>
                </div>
                <div class="col-sm-3">
                     <span> Start date:   {{this.patientObj.lastPaymentDate}} </span>
                </div>
                 <div class="col-sm-3">
                     <span> Due date:    {{this.patientObj.validupto}} </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{

data() {
    return {
        patientObj:{},
    }
},
mounted() {

    let paitentInfo = localStorage.getItem("patient-info");
    let obj = {};
    if (paitentInfo != null) {
      obj = JSON.parse(paitentInfo);
      this.patientObj = obj;

      //console.log(this.patientObj.pid);
   }
  }
}
</script>
