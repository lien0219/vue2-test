<template>
  <div>
    <el-card>
      <div class="video">
        <div class="father">
          <video
            ref="reference"
            id="video"
            controls="controls"
            autoplay="autoplay"
            style="width: 100%"
            src=""
          ></video>
          <div v-if="!isPlaying" id="poster" class="yourDiv" @click="play()">
            <svg
              t="1704816146494"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="2207"
              width="64"
              height="64"
              style="opacity: 0.4; margin: auto"
            >
              <path
                d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
                p-id="2208"
              ></path>
              <path
                d="M731.136 485.376L435.2 315.392c-20.48-11.264-46.08 3.072-46.08 26.624v340.992c0 23.552 25.6 37.888 46.08 26.624l295.936-171.008c19.456-12.288 19.456-40.96 0-53.248z"
                fill="#FFFFFF"
                p-id="2209"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isPlaying: false,
    };
  },
  methods: {
    play() {
      const video = this.$refs.reference;
      const poster = document.getElementById("poster");
      if (video.paused) {
        video.play();
        // poster.style.display = "none";
        this.isPlaying = true;
      } else {
        video.pause();
        // poster.style.display = "block";
        this.isPlaying = false;
      }
    },
  },
};
</script>
<style scoped>
.video {
  width: 500px;
}
.father {
  width: 100%;
  height: 100%;
  position: relative;
}
.yourDiv {
  width: 100%;
  height: 100%;
  background-image: url(../../../static/videopic.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0px;
  left: 0px;
}
</style>
