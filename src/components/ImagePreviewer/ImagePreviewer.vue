<template>
  <div id="dom" class="image-previewer-wrapper" v-show="viewerVisible">
    <header class="image-previewer-header">
      <span class="image-previewer-close-btn" @click="close">
        <img src="./assets/close.png" alt="close">
      </span>
    </header>
    <section class="image-previewer-body">
      <img :src="pics[index].src" alt="" v-if="pics.length" :style="{zoom: zoom}">
      <span v-else>暂无图片</span>
    </section>
    <footer class="image-previewer-footer">
      <span class="image-previewer-navigator" v-if="pics.length">{{index+1}}&nbsp;/&nbsp;{{total}}</span>
    </footer>
    <section class="image-previewer-prev">
      <span :class="{'disabled': disablePrev}" @click="prev">
        <img src="./assets/prev.png" alt="">
      </span>
    </section>
    <section class="image-previewer-next">
      <span :class="{'disabled': disableNext}" @click="next">
        <img src="./assets/next.png" alt="">
      </span>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'ImagePreviewer',
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      pics: {
        type: Array,
        default: []
      },
      defaultIndex: {
        type: Number,
        default: 0
      },
      loop: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        viewerVisible: false,
        index: this.defaultIndex,
        zoom: 1,
        zoomStep: 0.25
      };
    },
    computed: {
      total() {
        return this.pics.length;
      },
      isFirst() {
        return this.index === 0;
      },
      isLast() {
        return this.index === this.total - 1;
      },
      disablePrev() {
        return this.pics.length === 0 || !this.loop && this.isFirst;
      },
      disableNext() {
        return this.pics.length === 0 || !this.loop && this.isLast;
      }
    },
    watch: {
      visible(newVal) {
        this[newVal ? 'show' : 'hide']();
      },
      viewerVisible(newVal) {
        if (!newVal) {
          // garbage collect & reset
          this.index = this.defaultIndex;
          // unbind keyboard & mouse listeners
          document.removeEventListener('keyup', this.keyboardEventHandler, false);
        } else {
          // bind keyboard & mouse listeners
          document.addEventListener('keyup', this.keyboardEventHandler, false);
        }
      },
      defaultIndex(newVal) {
        this.index = newVal;
      },
      index(newVal) {
        this.$emit('change', newVal);
      }
    },
    methods: {
      show() {
        this.viewerVisible = true;
      },
      hide() {
        this.viewerVisible = false;
      },
      prev() {
        this.index = this.loop && this.isFirst ? this.total - 1 : Math.max(this.index - 1, 0);
      },
      next() {
        this.index = this.loop && this.isLast ? 0 : Math.min(this.index + 1, this.total - 1);
      },
      close() {
        this.$emit('close');
      },
      zoomIn() {
        console.log('zoom in');
        this.zoom += this.zoomStep;
      },
      zoomOut() {
        console.log('zoom out');
        this.zoom -= this.zoomStep;
      },
      zoomReset() {
        this.zoom = 1;
      },
      keyboardEventHandler(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        const eventMap = {
          'ArrowUp': {fn: 'zoomIn'},
          'ArrowDown': {fn: 'zoomOut'},
          'ArrowLeft': {fn: 'prev'},
          'ArrowRight': {fn: 'next'},
          'Escape': {fn: 'close'},
          'Minus': {fn: 'zoomOut', with: 'ctrlKey'},
          'Digit0': {fn: 'zoomReset', with: 'ctrlKey'},
          'Equal': {fn: 'zoomIn', with: 'ctrlKey'}
        };
        if (ev.code in eventMap) {
          const item = eventMap[ev.code];
          if ('with' in item) {
            ev[item.with] && this[item.fn]();
          } else {
            this[item.fn]();
          }
        }
      }
    }
  };
</script>


<style scoped>
  .image-previewer-wrapper {
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .68);
    position: fixed;
    top: 0;
    left: 0;
    color: #ffffff;
    z-index: 999999999;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .image-previewer-header {
    width: 100vw;
    height: 50px;
    line-height: 50px;
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
  }

  .image-previewer-close-btn {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    cursor: pointer;
  }

  .image-previewer-close-btn img {
    width: 40%;
    height: 40%;
    margin: 30%;
    opacity: .7;
  }

  .image-previewer-close-btn:hover img {
    opacity: .9;
  }

  .image-previewer-body {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #ccc;
  }

  .image-previewer-body img {
    width: auto;
    height: auto;
    max-width: 100vw;
    max-height: 100vh;
  }

  .image-previewer-footer {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 12px;
    position: fixed;
    bottom: 0;
    left: 0;
  }

  .image-previewer-navigator {
    font-size: 11px;
    text-shadow: 0 0 5px #000;
  }

  .image-previewer-prev {
    width: 50px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 0;
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .image-previewer-prev span {
    display: inline-block;
    width: 50px;
    height: 150px;
    line-height: 150px;
    cursor: pointer;
  }

  .image-previewer-prev span img {
    width: 60%;
    opacity: .7;
  }

  .image-previewer-prev span:hover img {
    opacity: .9;
  }

  .image-previewer-next {
    width: 50px;
    height: 100vh;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 0;
    text-align: center;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .image-previewer-next span {
    display: inline-block;
    width: 50px;
    height: 150px;
    line-height: 150px;
    cursor: pointer;
  }

  .image-previewer-next span img {
    width: 60%;
    opacity: .7;
  }

  .image-previewer-next span:hover img {
    opacity: .9;
  }

  .disabled {
    display: none !important;
  }
</style>
