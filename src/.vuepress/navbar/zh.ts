import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  { text: "案例", icon: "discover", link: "/zh/demo/" },
  {
    text: "面试",
    // icon: "creative",
    prefix: "/interview",
    children: [
      {
        text: "Java面试",
        prefix: "/java",
        children: [
          { text: "Java 基础 - 知识体系", icon: "more", link: "/java-basic-normal" },
          { text: "Java 基础 - 面向对象", icon: "more", link: "/java-basic-oop" },
          { text: "Java 基础 - 异常机制", icon: "more", link: "/java-basic-exception" },
          { text: "Java 基础 - 集合框架", icon: "more", link: "/java-basic" },
          { text: "Java 进阶 - 并发框架", icon: "more", link: "/java-basic" },
          { text: "Java 进阶 - 设计模式", icon: "more", link: "/java-design" }
        ],
      },
      {
        text: "数据库面试",
        prefix: "/mysql",
        children: [
          { text: "Mysql 基础 - 知识体系", icon: "more", link: "/mysql-basic" }
        ],
      }
    ],
  },
  {
    text: "实战",
    prefix: "/experience",
    children: [
      {
        text: "网络相关",
        prefix: "/internet",
        children: [
          { text: "Https 协议", icon: "more", link: "/certificate" }
        ],
      },
      {
        text: "Linux 相关",
        prefix: "/linux",
        children: [
          { text: "home分区合并到root下", icon: "more", link: "/home2root" },
          { text: "物理机动态IP转为静态IP", icon: "more", link: "/dhcp2static" },
          { text: "elasticsearch入门", icon: "more", link: "/elasticsearch" },
          { text: "被植入木马Syst3md挖矿", icon: "more", link: "/syst3md" }
        ],
      }
    ]
  },
  {
    text: "V2 文档",
    icon: "note",
    link: "https://theme-hope.vuejs.press/zh/",
  },
]);
