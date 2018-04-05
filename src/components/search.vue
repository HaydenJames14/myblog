<template>
  <form class="form-inline searchForm" @click.prevent="search">
      <select class="form-control" id="searchOptions" v-model="searchType">
        <option value="threads">search threads</option>
        <option value="posts">search posts</option>
        <option value="member">search members</option>
      </select>
      <input class="form-control mr-sm-2" type="text" aria-label="Search"  id="searchBox" v-model="searchText" placeholder="search...">
      <button class="btn btn-success" id="searchBtn" type="submit">Search</button>
    </form>
</template>

<script>
export default {
  data() {
    return {
      searchText: '',
      searchType: ''
    }
  },
  methods: {
    search() {
      if(this.searchText) {
        // set search text and type
        this.$store.commit('setSearchText', this.searchText);
        this.$store.commit('setSearchType', this.searchType);
        // search list
        this.$store.commit('setFilteredData', { text: this.searchText, type: this.searchType });
        // Route to search results page
        this.$router.push('/filtered');
      } else {
        this.$router.push('/latestThreads');
      }
    }
  }
}
</script>

<style scoped>
  #searchOptions {
    margin-bottom:5px;
    height:35px;
    width:80%;
  }

  .searchForm {
    justify-content:center;
    align-content: center;
  }

  form > button {
    height:35px;
    width:80%;
    margin-bottom:2px;
  }

  #searchBox {
    height:35px;
    width:80%;
    margin-bottom:5px;
  }

  /***************************************************************/
  @media screen and (min-width: 768px) {

  #searchTerm {
    margin-bottom:10px;
  }

  form > button {
    height:33px;
    margin-left:10px;
    margin-top:-4px;
    width:80px;
    padding:5px;
  }

  .searchForm {
    margin-right:40px;

  }

  #searchOptions {
    width:200px;
    height:35px;
    margin-right:15px;
  }

  #searchBox {
    width:200px;
    height:35px;
  }


  }
</style>

