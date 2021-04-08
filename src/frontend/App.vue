<template>
  <div id="app" style="display: flex">
    <div style="flex: 3; height: 100vh; border-right: solid 2px">
      <div>
        <input
          type="text"
          v-model="url"
          placeholder="enter URL to be scraped"
          style="
            font-size: larger;
            width: -webkit-fill-available;
            margin: 0 10px;
          "
        />
      </div>
      <p>Select the DomSelector from the tree below and click</p>
      <div style="overflow: scroll">
        <dir-tree :dir-info="dirInfo" v-model="selectDomSelector" />
      </div>
    </div>
    <div style="flex: 7; height: 100vh; overflow-y: scroll">
      <vue-friendly-iframe :src="htmlUrl"></vue-friendly-iframe>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import DirTree from "./DirTree.vue";

export default {
  components: { DirTree },
  data() {
    return {
      dirInfo: {},
      selectDomSelector: {},
      url: "",
      html: "",
    };
  },
  async mounted() {
    const { data: dirInfo } = await axios.get("/api/directory");
    this.$set(this, "dirInfo", dirInfo);
  },
  computed: {
    htmlUrl() {
      return `/api/html?url=${this.url}&filePath=${this.selectDomSelector.path}&domSelectorName=${this.selectDomSelector.name}`;
    },
  },
};
</script>

<style>
.vue-friendly-iframe {
  height: 100%;
}

iframe {
  height: 100%;
  width: 100%;
}
</style>
