<template>
  <div>
    <form class="form-inline searchForm" @click.prevent="search">
      <input class="form-control" type="text" aria-label="Search"  id="searchBox" v-model="searchText" placeholder="search.. (case sensitive)">
      <select class="form-control" id="searchOptions" v-model="searchType">
        <option value="" selected disabled hidden>options..</option>
        <option value="threads">search threads</option>
        <option value="posts">search posts</option>
        <option value="member">search members</option>
      </select>
      <button class="btn btn-success" id="searchBtn" type="submit">Search</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: "",
      searchType: "",
      nothingFound: false
    };
  },
  methods: {
    search() {
      if (this.searchText) {
        // search list
        this.$store.commit("setFilteredData", {
          text: this.searchText,
          type: this.searchType
        });
        // store search text and type
        this.$store.commit("setSearchText", this.searchText);
        this.$store.commit("setSearchType", this.searchType);
      }
      if (this.$store.getters.getFilteredData) {
        // Route to search results page
        this.$router.push("/filtered");
      } else {
        this.$router.push("/latestThreads");
      }
    }
  }
};
</script>

<style scoped>
/****************Default Mobile*******************/
.searchForm {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
  justify-content: center;
  align-content: center;
}

form > button {
  height: 35px;
  width: 100%;
  margin: 5px auto;
  max-width: 400px;
}

#searchOptions {
  height: 35px;
  width: 100%;
  margin-bottom: 5px;
  max-width: 400px;
}

#searchBox {
  height: 35px;
  width: 100%;
  margin-bottom: 5px;
  max-width: 400px;
}

/***************MEDIUM VIEW********************************/
@media screen and (min-width: 768px) and (max-width: 991px) {
  /*   */
  .searchForm {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: baseline;
    width: 100%;
  }

  #searchBox {
    height: 40px;
    width: 30%;
    margin: auto;
    margin-right: 4px;
    max-width: 250px;
  }

  #searchOptions {
    height: 40px;
    width: 30%;
    margin-bottom: 0;
    margin-left: 4px;
    max-width: 250px;
  }

  form > button {
    height: 40px;
    width: 30%;
    max-width: 250px;
  }
}

/***************************************************************/

@media screen and (min-width: 991px) {
  .searchForm {
    flex-direction: row;
    align-items: baseline;
    justify-content: flex-end;
  }

  form > button {
    height: 40px;
    margin-left: 10px;
    width: 80px;
    padding: 5px;
  }

  .searchForm:hover {
    height: auto;
  }

  #searchOptions {
    width: 200px;
    height: 40px;
  }

  #searchBox {
    width: 200px;
    height: 40px;
    margin-left: auto;
    margin-right: 10px;
  }
}
</style>

