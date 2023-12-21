<template>
  <div class="turn-table-box">
    <div
      class="top"
      :style="'background-image: url(' + config.nineCellsTopBg + ')'"
    >
      剩余抽奖次数{{ remainingCount }}
    </div>
    <div
      class="nine-cell-box"
      :style="'background-image: url(' + config.nineCellsBg + ')'"
      v-if="config.prizes && config.prizes.length"
    >
      <div
        v-for="(item, index) in config.prizes"
        :key="index"
        :class="['cell', 'cell' + (index + 1)]"
      >
        <img class="prize-image" :src="item.image" />
        <div :class="currentIndex == index + 1 ? 'mask mask-move' : ''"></div>
      </div>
      <div class="draw-btn">
        <img
          v-if="remainingCount > 0"
          class="img"
          :src="config.drawBtn"
          @click="startDraw"
        />
        <img v-else class="img" :src="config.viewElseBtn" @click="goMore" />
      </div>
    </div>
    <!-- <div class="test">123</div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      marqueeLeft: 0, // 大奖跑马灯的位置
      isStart: false, // 是否开始抽奖动画
      currentIndex: 1, // 灯停留的索引
      positionIndex: 1, // 接口返回的指定的中奖位置
      prizeInfo: {}, // 中奖的奖品信息
      count: 0, // 当前第几圈
      totalCount: 2, // 跑马灯总共跑几圈
      speed: 80, // 速度初始值
      lightTimer: null, // 跑马灯
      remainingCount: 3, //剩余抽奖次数
      config: {
        nineCellsBg:
          "https://xiaojinhe-cdn.iyoudui.cn/haixing/test/other/1644913672597-nine-bg.webp",
        nineCellsTopBg:
          "https://xiaojinhe-cdn.iyoudui.cn/haixing/test/other/1644913701084-nine-topbg.png",
        drawBtn:
          "https://xiaojinhe-cdn.iyoudui.cn/haixing/test/other/1644913579473-btn1.png",
        viewElseBtn:
          "https://xiaojinhe-cdn.iyoudui.cn/haixing/test/other/1644913603451-btn2.png",
        prizes: [
          {
            type: "0",
            image:
              "https://xiaojinhe-cdn.iyoudui.cn/haixing/test/other/1644914292243-p1.png",
          },
          {
            type: "1",
            image:
              "https://xiaojinhe-cdn.iyoudui.cn/haixing/test/other/1644914292243-p1.png",
          },
          {
            type: "2",
            image:
              "https://xiaojinhe-cdn.iyoudui.cn/haixing/test/other/1644914292243-p1.png",
          },
          {
            type: "3",
            image:
              "https://xiaojinhe-cdn.iyoudui.cn/haixing/test/other/1644914292243-p1.png",
          },
          {
            type: "4",
            image:
              "https://xiaojinhe-cdn.iyoudui.cn/haixing/test/other/1644914292243-p1.png",
          },
          {
            type: "5",
            image:
              "https://xiaojinhe-cdn.iyoudui.cn/haixing/test/other/1644914292243-p1.png",
          },
          {
            type: "6",
            image:
              "https://xiaojinhe-cdn.iyoudui.cn/haixing/test/other/1644914292243-p1.png",
          },
          {
            type: "7",
            image:
              "https://xiaojinhe-cdn.iyoudui.cn/haixing/test/other/1644914292243-p1.png",
          },
        ],
      },
    };
  },
  mounted() {
    console.log("mounted");
  },
  methods: {
    // 开始抽奖 跑马灯
    async startDraw() {
      if (this.lightTimer) {
        console.log(111);
        return;
      }
      // const res=await this.startDrawApi()
      let res = {
        code: 200,
        position: 1,
      };
      console.log("抽奖返回数据", res);
      if (res.code == 200) {
        this.positionIndex = res.position;
        this.prizeInfo = res;

        // 跑马灯相关参数初始化
        this.currentIndex = 1;
        this.count = 0;
        this.totalCount = 3;
        this.speed = 80;

        // 执行跑马灯动画
        this.roll();
      } else {
        // code 为其他情况 "请稍后再试";
      }
    },
    roll() {
      this.isStart = true;
      this.currentIndex++; // 灯停留的索引
      this.speed -= 2; // 速度
      if (this.speed <= 10) {
        this.speed = 10;
      }
      // 计算转圈次数
      if (this.currentIndex >= 9) {
        this.currentIndex = 1;
        this.count++; // 当前第几圈
      }
      // 满足转圈数和指定位置就停止
      if (
        // positionIndex接口返回的指定的中奖位置
        this.count >= this.totalCount &&
        this.currentIndex == this.positionIndex
      ) {
        clearTimeout(this.lightTimer);
        this.lightTimer = null;
        setTimeout(() => {
          this.isStart = false;
          this.currentIndex = 0;
          console.log(" 抽奖完毕,展示奖品", this.prizeInfo);
        }, 500);
      } else {
        this.lightTimer = setTimeout(this.roll, this.speed); // 不满足条件时调用定时器
        // 最后一圈减速
        if (this.count >= this.totalCount - 1 || this.speed <= 10) {
          this.speed += 50;
        }
      }
    },
    goMore() {
      console.log("goMore");
    },
  },
  beforeDestroy() {
    clearInterval(this.lightTimer);
    this.lightTimer = null;
  },
};
</script>

<style scoped>
.test {
  width: 100px;
  height: 100px;
  background-color: pink;
}
.turn-table-box {
  width: 642px;
  height: 695px;
  margin: 0 auto;
  background-size: 560px 648px;
  background-repeat: no-repeat;
  background-position: top center;
  position: relative;
}
.top {
  width: 100%;
  height: 67px;
  background: no-repeat center;
  background-size: 486px 67px;
  text-align: center;
  font-size: 28px;
  color: #e5814e;
  padding-top: 26px;
  box-sizing: border-box;
  font-weight: bold;
}
.bubble {
  width: 159px;
  height: 52px;
  background-size: 100%;
  position: absolute;
  top: -13px;
  right: 30px;
}
.draw-btn .img {
  position: absolute;
  width: 189px;
  left: 227px;
  top: 217px;
}
.nine-cell-box {
  width: 642px;
  height: 61px;
  background-size: 100%;
  position: relative;
}
.cell {
  width: 189px;
  height: 179px;
  background-size: 100% 100%;
  position: absolute;
}
.prize-image {
  width: 189px;
  height: 179px;
}
.mask {
  width: 189px;
  height: 179px;
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 20px;
}
.point {
  height: 104px;
  position: absolute;
  top: 228px;
  left: 0;
  right: 0;
  text-align: center;
  pointer-events: none;
}
.turn-table {
  width: 474px;
  height: 474px;
  display: block;
  position: absolute;
  top: 43px;
  left: 43px;
}
.point img {
  width: 80px;
  height: 104px;
}
.cell1 {
  opacity: 1;
}
.cell1,
.cell2,
.cell3 {
  top: 25px;
}
.cell8,
.cell4 {
  top: 217px;
}
.cell7,
.cell5,
.cell6 {
  top: 410px;
}
.cell1,
.cell7,
.cell8 {
  left: 26px;
}
.cell2,
.cell6 {
  left: 227px;
}
.cell3,
.cell4,
.cell5 {
  left: 427px;
}
</style>
