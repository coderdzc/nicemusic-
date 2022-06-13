<template>
  <div class="singertop">
    <div class="mask">
      <div class="w">
        <div class="coverImg">
          <img :src="singerInfo.img1v1Url" alt="" />
        </div>
        <div class="name">{{ singerInfo.name }}</div>
        <div class="like">+ 关注TA</div>
        <div class="desc">{{ singerInfo.briefDesc }}</div>
        <div class="num">
          <div class="numbox">
            <h3>{{ singerInfo.musicSize }}</h3>
            <h4>单曲数</h4>
          </div>
          <div class="numbox">
            <h3>{{ singerInfo.albumSize }}</h3>
            <h4>专辑数</h4>
          </div>
          <div class="numbox">
            <h3>{{ singerInfo.mvSize }}</h3>
            <h4>MV数</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    singerInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style lang="less">
.mask {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
}
.singertop {
  position: relative;
  width: 100%;
  height: 580px;
  background-image: url("~assets/img/top-bg.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  .w {
    text-align: center;
    padding-top: 80px;
    color: #ffffff99;
    .coverImg {
      margin: 20px auto;
      width: 120px;
      height: 120px;
      border: 3px solid #fff;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .name {
      font-size: 24px;
      font-weight: 700;
      color: #fff;
      margin-bottom: 25px;
    }
    .like {
      font-size: 12px;
      color: #fff;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      width: 90px;
      background-color: rgba(0, 0, 0, 0.6);
      border: 1px solid #fff;
      border-radius: 20px;
      padding: 10px 15px;
      margin-bottom: 30px;
    }
    .desc {
      width: 740px;
      margin: 0 auto 30px;
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      line-height: 25px;
    }
    .num {
      display: flex;
      justify-content: center;
      .numbox {
        margin-right: 100px;
        h3 {
          color: #fff;
          font-size: 24px;
          font-weight: 400;
          margin-bottom: 5px;
        }
        h4 {
          font-weight: 400;
        }
      }
      .numbox:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>