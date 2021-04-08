<template>
  <ul>
    <li>
      <span @click="open = !open">
        {{ dirInfo.name }}
        <span v-if="open" style="font-weight: bold">[-]</span>
        <span v-else style="font-weight: bold">[+]</span>
      </span>
      <template v-if="open">
        <dir-tree
          v-for="child in dirInfo.children"
          :key="child.path"
          :dir-info="child"
          :value="value"
          @input="(v) => $emit('input', v)"
        />
      </template>

      <ul v-if="open & (dirInfo.type == 'file')">
        <li
          v-for="domSelector in dirInfo.domSelectors"
          :key="domSelector.name"
          @click="
            $emit('input', { path: dirInfo.path, name: domSelector.name })
          "
          :class="{
            select:
              value.path == dirInfo.path && value.name == domSelector.name,
          }"
        >
          {{ domSelector.name }}
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  name: "dir-tree",
  props: ["dirInfo", "value"],
  data() {
    return {
      open: false,
    };
  },
};
</script>

<style scoped>
.select {
  background-color: green;
  color: white;
}
ul {
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 20px;
}

ul ul {
  list-style-type: circle;
  margin-block-start: 0px;
  margin-block-end: 0px;
}
</style>