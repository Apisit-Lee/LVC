<template>
  <div id="app">
    <button @click="previewImages">Preview Images</button>
    <image-previewer :visible="visible" :pics="pics" @close="closeImagePreviewer"/>

    <tree :data-source="treeData" :checked-list="treeCheckedList"/>
    <button @click="setTreeData">set tree data</button>
    <button @click="setTreeChecked">set tree checked</button>
  </div>
</template>

<script>
  import ImagePreviewer from "@/components/ImagePreviewer/ImagePreviewer";
  import Tree from "@/components/Tree/Tree";

  export default {
    name: 'App',
    components: {Tree, ImagePreviewer},
    data() {
      return {
        visible: false,
        pics: [
          {src: 'http://gjassisthz-1256733306.cos.ap-shanghai.myqcloud.com/feedbackimages/5dce89d8619846fbb3e811ea306bf881_Screenshot_20190612_100630_com.tencent.mm.jpg?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDqVw8DBRGQL3Wjmip2zlKht22nLejQEdt%26q-sign-time%3D1560338598%3B1875698598%26q-key-time%3D1560338598%3B1875698598%26q-header-list%3D%26q-url-param-list%3D%26q-signature%3D4cbd542c4ac97f9eb454b58506156037f1b55bfd'},
          {src: 'http://gjassisthz-1256733306.cos.ap-shanghai.myqcloud.com/feedbackimages/61e527b89d9e4ca08e3c4409258dccf2_1560338622158.jpg?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDqVw8DBRGQL3Wjmip2zlKht22nLejQEdt%26q-sign-time%3D1560338649%3B1875698649%26q-key-time%3D1560338649%3B1875698649%26q-header-list%3D%26q-url-param-list%3D%26q-signature%3D21070f9d9c71ba80e6802020a7166b7f5ec8a74b'}
        ],
        treeData: [],
        tree: [
          {key: 'a', label: 'A', checked: true},
          {
            key: 'b', label: 'B', children: [
              {
                key: 'b-1', label: 'B-1', children: [
                  {key: 'b-1-1', label: 'B-1-1'},
                  {key: 'b-1-2', label: 'B-1-2', checked: true}
                ]
              },
              {key: 'b-2', label: 'B-2'}
            ]
          },
          {key: 'c', label: 'C'}
        ],
        treeCheckedList: []
      };
    },
    methods: {
      previewImages() {
        this.visible = true;
      },
      closeImagePreviewer() {
        this.visible = false;
      },
      setTreeData() {
        setTimeout(() => {
          this.treeData = this.tree;
        }, 1000);
      },
      setTreeChecked() {
        this.treeCheckedList = ['a', 'b', 'c', 'b-1-1'];
      }
    }
  };
</script>

<style scoped>

</style>
