<template>
  <div class="sheetinfo" v-if="Object.keys(sheetInfo) !== 0">
    <div class="imgbox">
      <img :src="sheetInfo.coverImg" alt="" />
    </div>
    <div class="info">
      <h2 class="title">{{ sheetInfo.title }}</h2>
      <div class="creator">
        <div class="cavatar"><img :src="sheetInfo.cavatar" alt="" /></div>
        <div class="cname">{{ sheetInfo.cname }}</div>
        <div class="ctime">{{ sheetInfo.ctime | filterformatDate }}</div>
      </div>
      <div class="tagbox" v-if="sheetInfo.tag && sheetInfo.tag.length !== 0">
        <div class="tag">标签:</div>
        <div class="tags" v-for="(item, index) in sheetInfo.tag" :key="index">
          {{ item }}
        </div>
      </div>
      <div class="desc" v-if="sheetInfo.desc && sheetInfo.desc.length !== 0">
        {{ sheetInfo.desc }}
      </div>
      <a
        href="javascript:;"
        class="showdesc"
        v-if="isShowDesc"
        @click="showClick"
        >全部 ></a
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    sheetInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    isShowDesc() {
      if (this.sheetInfo.desc) {
        return this.sheetInfo.desc.length > 90 ? true : false;
      }
    },
  },
  methods: {
    showClick() {
      this.$alert(this.sheetInfo.desc, this.sheetInfo.title, {
        showConfirmButton: false,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.sheetinfo {
  display: flex;
  .imgbox {
    position: relative;
    margin-right: 30px;
    flex: 25%;
    img {
      border-radius: 8px;
      width: 104%;
    }
  }
  .imgbox::after {
    content: "";
    position: absolute;
    top: 10px;
    left: 19px;
    width: 97%;
    height: 96%;
    background-color: rgba(2, 2, 80, 0.4);
    opacity: 0.5;
    z-index: -1;
    border-radius: 8px;
  }
  .info {
    flex: 75%;
    .title {
      margin-top: 20px;
      color: #4a4a4a;
      font-size: 24px;
    }
    .creator {
      margin-top: 15px;
      display: flex;
      line-height: 30px;
      .cavatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        border: 0.5px solid #ccc;
        margin-right: 15px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .cname {
        margin-right: 25px;
      }
    }
    .tagbox {
      margin-top: 15px;
      display: flex;
      .tag {
        color: #4a4a4a;
        margin-right: 10px;
        line-height: 24px;
      }
      .tags {
        cursor: pointer;
        padding: 4px 12px;
        border-radius: 15px;
        color: #fff;
        background-color: #fa2800;
        margin-right: 10px;
        font-size: 12px;
      }
    }
    .desc {
      margin-top: 15px;
      color: #4a4a4a;
      line-height: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      white-space: pre-wrap;
    }
    .showdesc {
      display: block;
      margin-top: 5px;
      color: #fa2800;
    }
  }
}
</style>