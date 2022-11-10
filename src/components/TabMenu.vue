<template>
  <div>
    <ol>
      <li v-for="(item, index) in metaItems" :key=index>
        <button v-if="item.path === undefined" v-on:click="item.onClick">
          {{ item.title }}
        </button>
        <router-link v-bind:to=item.path v-else>
          {{ item.title }}
        </router-link>
      </li>
    </ol>
  </div>
  <div>&nbsp;</div>
  <div>
    <ol>
      <li v-for="(item, index) in items" :key=index>
        <button v-if="item.path === undefined" v-on:click="item.onClick">
          {{ item.title }}
        </button>
        <router-link v-bind:to=item.path v-else>
          {{ item.title }}
        </router-link>
      </li>
    </ol>
  </div>
</template>
  
<script>
  import {createNewFundByForms} from './smart-contracts/CreateNewFund';
  import {addDeposit} from './smart-contracts/AddDeposit';
  import {makeBuyOrder} from './smart-contracts/MakeBuyOrder';
  import {publishToken} from './smart-contracts/PublishToken';

  export default {
    name: 'TabMenu',
    data () {
      return {
        metaItems: [
          { title: 'Top', path: '/' },
          { title: 'Help', path: '/help' }
        ],
        items: [
          { title: 'Create Fund', onClick: createNewFundByForms },
          { title: 'Add Deposit', onClick: addDeposit },
          { title: 'Make Buy Order', onClick: makeBuyOrder },
          { title: 'Publish Token', onClick: publishToken },
        ]
      }
    },
    methods: {
      async createNewFund () {
        await createNewFundByForms();
      }
    }
  }
 </script>
  
<style scoped>
  
  ol {
    margin-left: auto;
    width: 600px;
    display:flex;
    justify-content: center;
    padding: 0;
    list-style: none;
  }
  
  li {
    width: 300px;
    height: 50px;
    margin-left:10px;
    margin-right:10px;
    font-size: 14px;
    color: white;
    background-color: rgb(10, 7, 56);
    border-radius: 8px;
    position: relative;
  }
  
  li:hover {
    opacity: 0.4;
  }
  
  /*  router-linkがaタグとして表示されてたのでスタイルをaタグに書いた*/
  a {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    color: white;
    text-decoration: none;
    line-height: 50px;
  }
  button {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    font-size: 14px;
    color: white;
    background-color: rgb(10, 7, 56);
    border-radius: 8px;
  }
  /* button::before {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    color: white;
    text-decoration: none;
    line-height: 50px;
  } */
</style>