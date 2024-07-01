<template>
  <div>
    <el-page-header @back="goBack" content="文字转语音" />
    <div class="bank"></div>
    <el-card header="文字转语音">
      <el-input
        id="word"
        type="textarea"
        placeholder="请输入文本"
        v-model="word"
        maxlength="300"
        rows="4"
        show-word-limit
      >
      </el-input>
      <div class="bank"></div>
      <el-card>
        <el-button @click="changeToAudio" type="primary">转为语音</el-button>
      </el-card>
      <div class="bank"></div>
      <el-card>
        <el-button @click="pause" type="warning">暂停</el-button>
        <el-button @click="resume" type="success">继续</el-button>
        <el-button @click="cancel" type="info">取消</el-button>
      </el-card>
      <div class="bank"></div>
      <el-card>
        <el-button @click="getvoice" type="primary"
          >获取语音合成数据(F12)</el-button
        >
      </el-card>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "WordToAudio",
  data() {
    return {
      word: "",
      isPaused: false, // 判断是否暂停
    };
  },
  methods: {
    // 选
    changeToAudio() {
      if (!this.word) {
        this.$message("请输入文本");
        return;
      }

      if (this.isPaused) {
        this.$message("当前语音已暂停,请点击继续!");
        return;
      } else if (window.speechSynthesis.speaking) {
        this.$message("当前已有正在播放的语音!");
        return;
      }
      // 为了防止在暂停状态下转语音，调用前设置继续播放
      window.speechSynthesis.resume();
      // 设置播放
      var textArea = document.getElementById("word");
      var range = document.createRange();
      range.selectNodeContents(textArea);
      var speech = new SpeechSynthesisUtterance();
      speech.text = this.word; // 内容
      speech.lang = "zh-cn"; // 语言
      speech.voiceURI = "Microsoft Huihui - Chinese (Simplified, PRC)"; // 声音和服务
      // eslint-disable-next-line no-irregular-whitespace
      speech.volume = 0.7; // 声音的音量区间范围是​​0​​​到​​1默认是​​1​​
      // eslint-disable-next-line no-irregular-whitespace
      speech.rate = 1; // 语速，数值，默认值是​​1​​​，范围是​​0.1​​​到​​10​​​，表示语速的倍数，例如​​2​​表示正常语速的两倍
      // eslint-disable-next-line no-irregular-whitespace
      speech.pitch = 1; // 表示说话的音高，数值，范围从​​0​​​（最小）到​​2​​​（最大）。默认值为​​1​​。
      window.speechSynthesis.speak(speech);
      var highlight = document.createElement("span");
      highlight.style.backgroundColor = "red";
      range.surroundContents(highlight);
    },
    // 暂停
    pause() {
      this.isPaused = true;
      window.speechSynthesis.pause();
    },
    // 继续
    resume() {
      this.isPaused = false;
      window.speechSynthesis.resume();
    },
    // 取消
    cancel() {
      window.speechSynthesis.cancel();
    },
    getvoice() {
      console.log(window.speechSynthesis.getVoices());
    },
    goBack() {
      this.$router.push({ path: "/textToVoice" });
    },
  },
};
</script>

<style>
.bank {
  padding: 10px;
}
</style>
