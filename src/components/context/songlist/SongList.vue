<template>
  <div class="songlist" v-if="songs.length > 0">
    <table class="songsbox">
      <thead class="itembox thead">
        <tr class="songitem">
          <th class="num head">序号</th>
          <th class="song head">歌曲</th>
          <th class="artists head">歌手</th>
          <th class="alumn head">专辑</th>
          <th class="time head">时长</th>
        </tr>
      </thead>
      <tbody class="itembox">
        <tr v-for="(item, index) in songs" :key="index" class="songitem">
          <td class="num">
            <div class="numbox">{{ (index + 1) | formatNum }}</div>
            <PlayBtn class="playbtn" :item="item" :playList="songs" />
            <PlayAnimate class="playanimate" :item="item" />
          </td>
          <td class="song">
            <div class="img"><img v-lazy="item.al.picUrl" alt="" /></div>
            <div class="name">{{ item.name }}</div>
          </td>
          <td class="artists">
            <span class="artist" v-for="(ar, indey) in item.ar" :key="indey">
              {{ ar.name | complex(indey, item.ar.length) }}
            </span>
          </td>
          <td class="alumn">{{ item.al.name }}</td>
          <td class="time">{{ item.dt | formatTime }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import PlayBtn from "components/context/playbtn/PlayBtn.vue";
import PlayAnimate from "components/context/playanimate/PlayAnimate.vue";
export default {
  components: {
    PlayBtn,
    PlayAnimate,
  },
  props: {
    songs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  filters: {},
};
</script>

<style scoped lang="less">
.songlist {
  .songsbox {
    width: 100%;
    .itembox {
      .songitem {
        color: #4a4a4a;
        width: 100%;
        display: flex;
        height: 50px;
        align-items: center;
        transition: all 0.2s;
        .head {
          color: #999999;
          font-weight: 400;
        }
        .num.head::before {
          content: "";
        }
        .num {
          position: relative;
          flex: 10%;
          text-align: center;
          .playanimate {
            display: none;
            transform: rotate(180deg) translate(20px, 10px);
          }
        }
        .song {
          flex: 40%;
          text-align: left;
          display: flex;
          align-items: center;
          .img {
            width: 35px;
            height: 35px;
            margin-right: 5px;
            flex-shrink: 0;
            img {
              width: 100%;
              height: 100%;
              border-radius: 5px;
            }
          }
          .name {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        }
        .artists {
          flex: 25%;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .alumn {
          flex: 15%;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        .time {
          flex: 10%;
          text-align: center;
        }
      }
      .songitem:nth-child(2n) {
        background-color: #f7f7f7;
      }
      .songitem:hover {
        background-color: #e8e9ed;
      }
      .songitem:hover .numbox {
        display: none;
      }
      .songitem:hover .playbtn {
        display: block;
      }
    }
    .thead {
      background-color: #f7f7f7;
    }
  }
}
</style>