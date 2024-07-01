<template>
  <div>
    <el-page-header @back="goBack" content="文字转语音（文本根随朗读变色）" />
    <div class="bank"></div>
    <el-card header="文字转语音">
      <el-input
        id="word"
        type="textarea"
        placeholder="请输入文本"
        v-model="word"
        maxlength="400"
        rows="4"
        ref="input"
        @input="inputWord"
        :readonly="inputReadonly"
        show-word-limit
      >
      </el-input>

      <div class="bank"></div>
      <el-card>
        <div v-if="word == ''">暂无文本</div>
        <div v-else>
          <div style="color: coral">{{ highlightedText }}</div>
          <div>{{ normalText }}</div>
        </div>
      </el-card>
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
  name: "WordToAudioV2",
  data() {
    return {
      word: "",
      isPaused: false, // 判断是否暂停
      speakIndex: 0, // 朗读了多少文本的下标
      totalText: "", // 全部文本
      highlightedText: "", // 需要变色的文本
      normalText: "", // 正常文本
      inputReadonly: false,
    };
  },
  watch: {
    speakIndex(newValue) {
      this.changeTextColorV2(newValue);
    },
  },
  methods: {
    inputWord() {
      this.cancel();
    },
    // 选
    changeToAudio() {
      if (!this.word) {
        this.$message("请输入文本");
      }
      if (this.isPaused) {
        if (window.speechSynthesis.speaking) {
          this.$message("当前语音已暂停,请点击继续!");
          return;
        } else {
          this.isPaused = false;
          this.cancel();
        }
      } else if (window.speechSynthesis.speaking) {
        this.$message("当前已有正在播放的语音!");
        return;
      }
      var that = this;
      // 初始化朗读下标
      that.speakIndex = 0;
      // 为了防止在暂停状态下转语音，调用前设置继续播放
      window.speechSynthesis.resume();
      // 设置播放
      var textArea = document.getElementById("word");
      var range = document.createRange();
      range.selectNodeContents(textArea);
      var speech = new SpeechSynthesisUtterance();
      console.log(speech, "spe");
      speech.text = this.word; // 内容
      speech.lang = "zh-cn"; // 语言
      speech.voiceURI = "Microsoft Huihui - Chinese (Simplified, PRC)"; // 声音和服务
      // eslint-disable-next-line no-irregular-whitespace
      speech.volume = 0.7; // 声音的音量区间范围是​​0​​​到​​1默认是​​1​​
      // eslint-disable-next-line no-irregular-whitespace
      speech.rate = 1; // 语速，数值，默认值是​​1​​​，范围是​​0.1​​​到​​10​​​，表示语速的倍数，例如​​2​​表示正常语速的两倍
      // eslint-disable-next-line no-irregular-whitespace
      speech.pitch = 1; // 表示说话的音高，数值，范围从​​0​​​（最小）到​​2​​​（最大）。默认值为​​1​​。
      // 设置不可输入input
      this.inputReadonly = true;
      window.speechSynthesis.speak(speech);
      var highlight = document.createElement("span");
      highlight.style.backgroundColor = "red";
      range.surroundContents(highlight);

      // 监听朗读边界事件
      speech.onboundary = function (event) {
        var charIndex = event.charIndex;
        var spokenText = speech.text.substring(0, charIndex);
        that.speakIndex = charIndex;
        // 处理已朗读的文本
        console.log("已朗读的文本：", spokenText);
      };
      // 判断是否朗读结束
      speech.onend = function (event) {
        console.log("结束:", event);
        that.inputReadonly = false;
        that.highlightedText = that.word;
        that.normalText = "";
      };
    },
    // 暂停
    pause() {
      this.isPaused = true;
      this.inputReadonly = false;
      window.speechSynthesis.pause();
    },
    // 继续
    resume() {
      this.isPaused = false;
      window.speechSynthesis.resume();
      if (window.speechSynthesis.speaking) {
        this.inputReadonly = true;
      } else {
        this.inputReadonly = false;
      }
    },
    // 取消
    cancel() {
      this.speakIndex = 0;
      this.inputReadonly = false;
      this.highlightedText = "";
      this.normalText = this.word;
      window.speechSynthesis.cancel();
    },
    getvoice() {
      console.log(window.speechSynthesis.getVoices());
    },
    goBack() {
      this.$router.push({ path: "/textToVoice" });
    },
    // 通过变更html方式变色（会变更组件）
    changeTextColor(index) {
      console.log("朗读下标:", index);
      console.log("1111", this.$refs.input.$el);
      // const inputElement = this.$refs.input.$el.querySelector('.el-input__inner');
      const inputElement = this.$refs.input.$el;
      console.log("input组件:", inputElement);
      if (!inputElement) return;
      const text = this.word;
      console.log("组件文本:", text);
      const highlightedText = text.slice(0, index + 1);
      console.log("需要变色文本:", highlightedText);
      const normalText = text.slice(index + 1);
      console.log("正常文本:", normalText);
      const html = `<span style="color: coral">${highlightedText}</span>${normalText}`;
      inputElement.innerHTML = html;
    },
    // 当前版本
    changeTextColorV2(index) {
      const text = this.word;
      const highlightedText = text.slice(0, index);
      const normalText = text.slice(index);
      this.highlightedText = highlightedText;
      this.normalText = normalText;
    },
  },
};
</script>

<style>
.bank {
  padding: 10px;
}
</style>
