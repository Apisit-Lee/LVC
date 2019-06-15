<template>
  <div class="tree-wrapper">
    <tree-branch v-for="branch in source" :key="`branch-${branch.key}`" :data-source="branch"
                 :default-fold="!defaultOpen" @check="onBranchCheck"/>
    <button @click="test">get tree checked keys</button>
  </div>
</template>

<script>
  import TreeBranch from "./components/TreeBranch";
  import {updateTree, getData} from "./utils";

  export default {
    name: 'tree',
    components: {TreeBranch},
    props: {
      dataSource: {
        type: Array,
        default() {
          return [];
        }
      },
      checkedList: {
        type: Array,
        default() {
          return [];
        }
      },
      defaultOpen: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        source: this.dataSource,
        res: []
      };
    },
    watch: {
      dataSource(newVal) {
        this.source = newVal;
      },
      checkedList(newVal) {
        const iterator = (tree, checkedList) => {
          tree.map(branch => {
            branch.checked = !!checkedList.includes(branch.key);
            branch.children && branch.children.length && iterator(branch.children, checkedList);
          });
        };
        let source = this.dataSource;
        iterator(source, newVal);
        this.source = [];
        this.$nextTick(() => {
          this.source = source;
        });
      }
    },
    methods: {
      onBranchCheck(branch) {
        updateTree(this.source, branch);
      },
      getCheckedList() {
        return getData(this.source);
      },
      test() {
        const res = this.getCheckedList();
        console.log(`Get checked key list:`, res);
      }
    }
  };
</script>
