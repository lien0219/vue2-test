<template>
  <div class="w_editor">
    <div id="w_view"></div>
  </div>
</template>
<script>
import WE from "wangeditor";
import { Message } from "element-ui";
import OSS from "ali-oss";
export default {
  //   name: "Editor-Name",
  props: {
    // 默认值
    defaultText: {
      type: String,
      default: "",
    },
    // 富文本更新值
    richText: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      editor: null,
      // 富文本菜单选项配置
      menuItem: [
        "head",
        "bold",
        "fontSize",
        "fontName",
        "italic",
        "underline",
        "indent",
        "lineHeight",
        "foreColor",
        "backColor",
        "link",
        "list",
        "justify",
        "image",
        "video",
      ],
    };
  },
  watch: {
    defaultText(nv, ov) {
      if (nv != "") {
        this.editor.txt.html(nv);
        this.$emit("update:rich-text", nv);
      }
    },
  },
  mounted() {
    this.initEditor();
  },
  methods: {
    async $oss(file, name) {
      // 创建 OSS 客户端实例
      /*
      将 'your-region'、'your-access-key-id'、'your-access-key-secret' 和 'your-bucket-name' 替换为你自己的阿里云 OSS 配置信息。
      */
      const client = new OSS({
        region: "your-region",
        accessKeyId: "your-access-key-id",
        accessKeySecret: "your-access-key-secret",
        bucket: "your-bucket-name",
      });

      try {
        // 上传图片到 OSS
        const result = await client.put(name, file);

        // 返回上传成功后的图片 URL 地址
        return result.url;
      } catch (error) {
        // 处理上传失败的情况
        console.error("上传图片失败:", error);
        return null;
      }
    },
    initEditor() {
      const editor = new WE("#w_view");
      // 配置编辑器
      editor.config.showLinkImg = false; /* 隐藏插入网络图片的功能 */
      editor.config.onchangeTimeout = 400; /* 配置触发 onchange 的时间频率，默认为 200ms */
      editor.config.uploadImgMaxLength = 1; /* 限制一次最多能传几张图片 */
      // editor.config.showFullScreen = false; /* 配置全屏功能按钮是否展示 */
      editor.config.menus = [...this.menuItem]; /* 自定义系统菜单 */
      // editor.config.uploadImgMaxSize = 5 * 1024 * 1024 /* 限制图片大小 */;
      editor.config.customAlert = (err) => {
        Message.error(err);
      };
      //   同步数据
      editor.config.onchange = (newHtml) => {
        // 异步更新组件
        this.$emit("update:rich-text", newHtml);
      };
      // 自定义上传图片
      //   editor.config.customUploadImg = (resultFiles, insertImgFn) => {
      //     /**
      //      * resultFiles：图片上传文件流
      //      * insertImgFn：插入图片到富文本
      //      * 返回结果为生成的图片URL地址
      //      *  */
      //     // 封装改写阿里云图片OSS直传插件。
      //     this.$oss(resultFiles[0], resultFiles[0]["name"]).then((url) => {
      //       !!url && insertImgFn(url); /* oss图片上传，将图片插入到编辑器中 */
      //     });
      //   };
      editor.config.customUploadImg = async (resultFiles, insertImgFn) => {
        try {
          const url = await this.$oss(resultFiles[0], resultFiles[0].name);
          if (url) {
            insertImgFn(url);
          }
        } catch (error) {
          console.error("上传图片失败:", error);
        }
      };
      // 创建编辑器
      editor.create();
      this.editor = editor;
    },
  },
  beforeDestroy() {
    // 销毁编辑器
    this.editor.destroy();
    this.editor = null;
  },
};
</script>
<style scoped></style>
