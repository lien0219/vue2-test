<template>
  <div>
    <el-card header="TTS中心">
      <el-card>
        <el-button type="success" @click="toAudio">文字转语音</el-button>
      </el-card>
      <el-card>
        <el-button type="success" @click="toWord">语音转文字</el-button>
      </el-card>
      <el-card>
        <el-button type="success" @click="toWordV2"
          >文字转语音(文本跟随朗读变色)</el-button
        >
      </el-card>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Entry",
  data() {
    return {};
  },
  methods: {
    toAudio() {
      this.$router.push({ path: "/textToVoice/wordToAudio" });
    },
    toWord() {
      this.$router.push({ path: "/textToVoice/audioToWord" });
    },
    toWordV2() {
      this.$router.push({ path: "/textToVoice/wordToAudioV2" });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
