<template>
  <div class="tree-branch-wrapper">
    <div class="tree-branch-label">
      <div class="folder">
        <img class="folder-img" src="../assets/angle-right.png" alt="" v-if="children && fold" @click="toggleFold">
        <img class="folder-img" src="../assets/angle-down.png" alt="" v-if="children && !fold" @click="toggleFold">
      </div>
      <div :class="checkboxClass" @click="checkLabel"></div>
      <span @dblclick="toggleFold">{{key}}</span>
    </div>
    <tree-branch class="tree-branch-child" v-show="!fold" v-if="children" v-for="branch in children"
                 :default-fold="defaultFold" :key="`branch-${key}-${branch.key}`" :data-source="branch"
                 @check="onBranchCheck"/>
  </div>
</template>

<script>
  /**
   * MODE
   * @description parent & children selection inherit relation mode.
   * INDEPENDENT: parent & children are independent.
   *    Selecting actions effect only target label itself, its parent or children excluded.
   * INHERIT: Selecting action effect relatively the whole branch.
   *    If parent label is selected, all children however deep should thus be selected.
   *    If all **direct children**[note1] are selected, the parent should thus be selected.
   *    If some of the children are selected, the parent should thus be half-selected.
   * [note1]: actually if a child is selected, the child's child is thus selected, so as to the-great-grandsons, etc.
   * */
  const MODE = {
    INDEPENDENT: 'independent',
    INHERIT: 'inherit'
  };
  export default {
    name: 'treeBranch',
    props: {
      dataSource: {
        type: Object,
        default: {}
      },
      mode: {
        type: String,
        default: MODE.INDEPENDENT
      },
      defaultFold: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        fold: this.defaultFold,
        checked: this.labelChecked
      };
    },
    computed: {
      key() {
        const {key = null} = this.dataSource;
        return key;
      },
      label() {
        const {label = null} = this.dataSource;
        return label;
      },
      children() {
        const {children = null} = this.dataSource;
        return children;
      },
      labelChecked() {
        const {checked = false} = this.dataSource;
        return checked;
      },
      checkboxClass() {
        return {
          'tree-checkbox': this.mode === MODE.INHERIT,
          'tree-checkbox-radio': this.mode === MODE.INDEPENDENT,
          'tree-checkbox-checked': this.mode === MODE.INHERIT && this.checked,
          'tree-checkbox-radio-checked': this.mode === MODE.INDEPENDENT && this.checked,
          'tree-checkbox-half': this.mode === MODE.INHERIT && false,
          'tree-checkbox-radio-half': this.mode === MODE.INDEPENDENT && false
        };
      }
    },
    mounted() {
      this.fold = this.defaultFold;
      this.checked = this.labelChecked;
    },
    methods: {
      toggleFold() {
        this.fold = !this.fold;
      },
      checkLabel() {
        this.checked = !this.checked;
        this.$emit('check', {
          key: this.key,
          label: this.label,
          children: this.children,
          checked: this.checked
        });
      },
      onBranchCheck(branch) {
        this.$emit('check', branch);
      }
    }
  };
</script>

<style scoped>
  .tree-branch-wrapper {
    -webkit-user-select: none;
  }

  .tree-branch-child {
    margin-left: 1em;
    height: auto;
    overflow: hidden;
  }

  .tree-branch-label {
    display: flex;
    flex-direction: row;
    align-items: center;
    line-height: 1.5em;
  }

  .folder {
    width: 1em;
    height: 1em;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
  }

  .folder-img {
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: .8;
  }

  .folder-img:hover {
    opacity: 1;
  }

  .tree-checkbox,
  .tree-checkbox-radio {
    width: 1em;
    height: 1em;
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
    display: inline-block;
    margin-right: 10px;
    cursor: pointer;
  }

  .tree-checkbox {
    background-image: url("../assets/checkbox.png");
  }

  .tree-checkbox-radio {
    background-image: url("../assets/checkbox-radio.png");
  }

  .tree-checkbox-checked {
    background-image: url("../assets/checkbox-checked.png");
  }

  .tree-checkbox-radio-checked {
    background-image: url("../assets/checkbox-radio-checked.png");
  }

  .tree-checkbox-half {
    background-image: url("../assets/checkbox-half.png");
  }
</style>
