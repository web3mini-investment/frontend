<template>
    <div>
      <ol>
        <li v-for="(item, index) in items" :key=index>
           <router-link v-bind:to=item.path>
              {{ item.title }}
           </router-link>
        </li>
      </ol>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TabMenu',
    data () {
      return {
        items: [
          { title: 'Top', path: '/' },
          { title: 'Create Fund', path: '/create' },
          { title: 'Help', path: '/help' }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  
  ol {
    margin-left: auto;
    width: 540px;
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
  
  </style>