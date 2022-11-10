<template>
    <h1>Input Form</h1>
    <div class="content">Fund Name: </div><input v-model="fundName_">
    <div class="content">Target Token Address: </div><input v-model="underlyingAsset_">
    <div class="content">Offering Closing Time: </div><input class="date" type="date" v-model="offerClosingTime_">
    <div class="content">Order Expiration: </div><input class="date" type="date" v-model="orderExpiration_">
    <div class="content">Fund Maturity: </div><input class="date" type="date" v-model="maturity_">
    <button id="create-button" v-on:click="createNewFund">Create New Fund</button>
</template>

<script>
  import { loadSigner } from './smart-contracts/loadFund';
  import Swal from 'sweetalert2';
  import {createNewFund, createNewFundByForms} from './smart-contracts/CreateNewFund'
  
  export default {
    name: 'Input',
    data () {
      var today = new Date();
      today.setMonth(today.getMonth() + 1);
      return {
        fundName_: 'MyFund',
        underlyingAsset_: 'Please input the target adress...',
        offerClosingTime_: today.toISOString().slice(0,10),
        orderExpiration_: today.toISOString().slice(0,10),
        maturity_: today.toISOString().slice(0,10),
      }
    },

    methods: {
      async createNewFund () {
        await createNewFundByForms();
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
  th.content2 {
    background-color: #eee;
    display: inline-block;
    margin: 10px;
    width: 40%;
    font-size: medium;
    text-align: right;
  }  
  div.result {
    background-color: #eee;
    display: inline-block;
    margin: 10px;
    width: 90%;
    font-size: medium;
    text-align: left;
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