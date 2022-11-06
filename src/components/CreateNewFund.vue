<template>
    <div class="content">Target NFT: </div><input v-model="target">
    <div class="content">Number Of Token: </div><input v-model="numberOfToken">
    <div class="content">Fund Maturity: </div><input v-model="fund_maturity">
    <div class="content">Deadline Date: </div><input v-model="deadlineDate">
    <button v-on:click="createNewFund">Create New Fund</button>
   
    <!-- <div id="sample">
        <input type="number" v-model="x"> + <input type="number" v-model="y"> = {{result}}
        <button v-on:click="calc">計算</button>
    </div> -->
</template>
  
<script>

    export default {
        name: 'Input',
        data () {
            return {
                target: 'NFT',
                numberOfToken: 0,
                fund_maturity: '20251106',
                deadlineDate: '20221125'
            }
        },

        methods: {
            createNewFund () {
                const {} = doCalc({
                    target: this.target,
                    numberOfToken: this.numberOfToken,
                    fund_maturity: this.fund_maturity,
                    deadlineDate: this.deadlineDate
                })
            }
        }
    }

//    import doCalc from "./smart-contracts/sample.js"

//    export default {
//         name: 'sample',
//         data () {
//             return {
//                 x: 0,
//                 y: 0,
//                 result: 0
//             }
//         },

//         methods: {
//             calc () {
//                 const {result} = doCalc({
//                     x: this.x,
//                     y: this.y
//                 })

//                 this.result = result
//             }
//         }
//    }
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
    width: 30%;
    font-size: large;
    text-align: right;
  }

  input {
    margin: 10px;
    width: 30%;
    font-size: large;
    text-align: left;
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
    border-radius: 3px;
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto;
    max-width: 280px;
    padding: 10px 25px;
    color: #313131;
    transition: 0.3s ease-in-out;
    font-weight: 500;
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