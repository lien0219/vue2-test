<template>
  <div>
    <el-page-header @back="goBack" content="语音转文字" />
    <div class="bank"></div>
    <el-card header="语音转文字">
      <el-card>
        <el-input :readonly="true" id="word" v-model="word"></el-input>
      </el-card>
      <el-card>
        <el-button type="primary" @click="audioCHangeWord"
          ><span v-if="isListening">语音识别中...</span
          ><span v-else>语音识别</span></el-button
        >
      </el-card>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "AudioToWord",
  data() {
    return {
      word: "",
      isListening: false, // 判断是否在语音监听中
    };
  },
  methods: {
    audioCHangeWord() {
      var that = this;
      that.word = "";
      // 创建SpeechRecognition对象
      // eslint-disable-next-line no-undef
      var recognition = new webkitSpeechRecognition();
      console.log("recognition1", recognition);
      if (!recognition) {
        // eslint-disable-next-line no-undef
        recognition = new SpeechRecognition();
      }
      console.log("recognition2", recognition);
      console.log(11);
      // 设置语言
      recognition.lang = "zh-CN";
      console.log(22);
      // 开始语音识别
      recognition.start();
      that.isListening = true;
      console.log(33);
      // 监听识别结果
      recognition.onresult = function (event) {
        var result = event.results[0][0].transcript;
        console.log("监听结果:", result);
        that.word = result;
      };

      // 监听错误事件
      recognition.onerror = function (event) {
        that.isListening = false;
        that.$message("监听语音失败:" + event.error);
        console.error(event.error);
      };
      // 监听结束事件（包括识别成功、识别错误和用户停止）
      recognition.onend = function () {
        that.isListening = false;
        console.log("语音识别停止");
      };
    },
    goBack() {
      this.$router.push({ path: "/textToVoice" });
    },
  },
};
</script>

<style></style>
