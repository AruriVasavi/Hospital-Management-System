<template>
  <div class="hello">
    <HeaderBar />

     <div class="row" style="text-align: left;">
        <div class="col-md-4" style="margin-top:200px;margin-left:5px;" >
            <div>
              Satish Nursing Home providing a quality of services from the past 20 years.
            </div>
            <div>
              <p style="margin:10px;">Services offered</p>
              <ul class="list-group list-group-flush" >
                <li class="list-group-item">  Laparoscopic Surgery </li>
                <li class="list-group-item"> Consultant Laproscopy </li>
                <li class="list-group-item" >Minimally Invasive Spine Surgery </li>
                <li class="list-group-item"> Laparoscopic Kidney Surgery </li>
              </ul>
            </div>
        </div>
        <div class="col-md-7" style="margin-left:5px;">
          <div class="row" style="margin:10px;">
            <div class="card" style="width: 18rem;margin-left:100px;margin-top:150px;">
                <img src="../assets/doc2.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
              </div>
              <div class="card" style="width: 18rem;margin-left:50px;margin-top:150px;">
                <img src="../assets/doc2.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
              </div>
              <div class="card" style="width: 18rem;margin-left:50px;margin-top:150px;">
                <img src="../assets/doc2.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
              </div>
          </div>
      </div>
     </div>
     <FooterBar />
  </div>
</template>

<script>
import HeaderBar from './UIComponents/HeaderBar.vue';
import FooterBar from './UIComponents/Footer.vue';

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    HeaderBar,
    FooterBar
    // SideBar
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
