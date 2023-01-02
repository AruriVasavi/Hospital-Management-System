<template>
    <div>
       <HeaderBar />
      <div class="mt-3">
        <h1> Welcome Doctor </h1>
        <div style = "display:flex;justify-content:center;">
        <div class="card" style="text-align:center;margin-right:10px;">
          <div class="card-body">

             <p class="card-text"> No of days from the last payment</p>
                  <button type="button" class="btn btn-danger">
                    Collect Payment
                  </button>
          </div>
        </div>
        <div class="card">
            <div class="card-body">
              <p class="card-text"> No of days from the last payment</p>
                  <button type="button" class="btn btn-danger">
                    Collect Payment
                  </button>
          </div>
        </div>
      </div>
      </div>
    </div>
</template>

<script>
import HeaderBar from '../UIComponents/HeaderBar.vue';

// import SideBar from '../UIComponents/SideBar.vue';

export default {
  name: 'DoctorHome',
  mounted() {

  },
  components: {
    HeaderBar,
    // SideBar
  },
  methods:{

  }
}
</script>
