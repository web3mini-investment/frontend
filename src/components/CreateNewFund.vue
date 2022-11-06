<template>
    <h1>Input Form</h1>
    <div class="content">Target Token Address: </div><input v-model="underlyingAsset_">
    <div class="content">Offering Closing Time: </div><input class="date" type="date" v-model="offerClosingTime_">
    <div class="content">Order Expiration: </div><input class="date" type="date" v-model="orderExpiration_">
    <div class="content">Fund Maturity: </div><input class="date" type="date" v-model="maturity_">
    <button v-on:click="createNewFund">Create New Fund</button>
    <div class="content">{{ result }}</div>
</template>
  
<script>
  import createNewFund from './smart-contracts/CreateNewFund'

  export default {
      name: 'Input',
      data () {
          return {
              underlyingAsset_: 'Please input the target adress...',
              offerClosingTime_: new Date().toISOString().slice(0,10),
              orderExpiration_: new Date().toISOString().slice(0,10),
              maturity_: new Date().toISOString().slice(0,10) ,
              result: 'Initial Value'
          }
      },

      methods: {
          createNewFund () {
              const result = createNewFund({
                  underlyingAsset: this.underlyingAsset_,
                  offerClosingTime: this.offerClosingTime_,
                  orderExpiration: this.orderExpiration_,
                  maturity: this.maturity_
              })
            
              this.result = result
          }

          
      }
  }
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  div.output {
    text-align: center;
  }
  
  div.content {
    background-color: #eee;
    display: inline-block;
    margin: 10px;
    width: 40%;
    font-size: large;
    text-align: right;
  }

  input {
    margin: 10px;
    width: 50%;
    font-size: medium;
    text-align: left;
  }

  input.date {
    margin: 10px;
    width: 50%;
    font-size: large;
    text-align: right;
  }
  
  h1 {
    font-weight: 300;
    font-size: 2.0rem;
    top: 10px;
    bottom: 20px;
    text-align: left;
    text-decoration: underline;
  }

  h3 {
    color: white;
  }
  
  p {
    width: 90%;
    display: inline-block;
    text-align: left;
  }
  
  button {
    background: #eee;
    border-radius: 10px;
    position: relative;
    top: 10px;
    bottom: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto;
    max-width: 280px;
    padding: 10px 25px;
    color: #313131;
    transition: 0.3s ease-in-out;
    font-weight: 800;
  }

  button:hover {
    background: #313131;
    color: #FFF;
  }

  button:after {
    content: '';
    width: 5px;
    height: 5px;
    border-top: 3px solid #313131;
    border-right: 3px solid #313131;
    transform: rotate(45deg) translateY(-50%);
    position: absolute;
    top: 50%;
    right: 20px;
    border-radius: 1px;
    transition: 0.3s ease-in-out;
  }

  button:hover:after {
    border-color: #FFF;
  }
</style>