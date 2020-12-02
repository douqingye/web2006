<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
    >
      <el-menu-item index="/" exact
        ><i class="el-icon-menu"></i>{{ $t("message.project") }}</el-menu-item
      >
      <el-menu-item index="/params"
        ><i class="el-icon-menu"></i>{{ $t("message.params") }}</el-menu-item
      >
      <el-menu-item index="/content"
        ><i class="el-icon-menu"></i>{{ $t("message.content") }}</el-menu-item
      >
      <div class="user">
        <router-link to="/Ucenter" tag="span" class="user-name">{{
          user.username
        }}</router-link>
        <el-button class="logout" @click="logoutHandle">退出</el-button>
      </div>
      <el-menu-item class="set-lang">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            语言环境
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown"> 
             <el-dropdown-item command="zh">中文</el-dropdown-item>
                    <el-dropdown-item command="en">英文</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Nav",
  data() {
    return {
      activeIndex2: "/", //高亮效果
    };
  },
  computed: {
    ...mapState("loginModule", {
      user: (state) => state.user,
    }),
  },
  methods: {
    ...mapMutations("loginModule", ["clearUser"]),
    handleSelect() {},
    logoutHandle() {
      this.clearUser();
      localStorage.removeItem("ego"); //退出的时候清空本地存储
      this.$router.push("./login");
    },
    handleCommand(command) {
      //打印出来的是对应的语言切换，然后变更语言环境，通过command修改i18n里的locale字段
      console.log(command);
      this.$i18n.locale=command
      //修改完之后要做存储操作，用户刷新页面语言仍保持原先的语言,操作完之后还需要在mail文件里获取
      localStorage.setItem('lang',command)
    },
  },
};
</script>

<style scoped lang='less'>
.user {
  float: right;
  margin-right: 20px;
  line-height: 60px;
  .user-name {
    color: #fff;
    margin-right: 10px;
    font-size: 15px;
    border: 1px solid #fff;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: inline-block;
    line-height: 40px;
  }
}
.set-lang {
  float: right !important;
}

.el-dropdown-link {
  color: #fff;
}
</style>