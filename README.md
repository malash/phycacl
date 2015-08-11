## 物理实验计算辅助工具PhyCacl

### 简介

**PhyCacl**是基于网页的物理学实验计算辅助工具，可以便捷快速的完成多种数据处理问题，如一元线性回归、逐差法等。目的是方便大学生完成大学物理实验的实验报告数据分析。

![Phycacl截图](http://malash.me/wp-content/uploads/2012/11/phycacl.png)

###项目链接

> [Phycacl项目主页](http://malash.me/project/phycacl "http://malash.me/project/phycacl")

### 技术细节

**PhyCacl**采用网页形式实现，属于Web应用。采用MVC框架，便于项目的维护和拓展。

前台使用Twitter的开源前端框架Bootstrap实现，风格简洁明了，美观大方，易于使用。属于MVC的视图（View）部分。

运算部分使用JavaScript语言，所有的数值计算均在用户的浏览器中执行，服务器仅提供静态文件下载，不会占用过多服务器CPU资源。正因如此，此项目可完全脱离服务器直接在本地运行（即直接在本地打开HTML文件就可运行）。项目中**phycacl.js**文件为项目的核心，实现了线性表、一元线性回归、逐差法的计算和误差分析，是最为重要的计算部分。属于MVC的模型（Model）部分。

PhyCacl的图表绘制和公式生成采用了Google Chart的公开API。

### 作者

> [Malash](https://malash.me/ "Malash") &lt;<i@malash.me>&gt;
> 
> [Karezi](http://karezi.info/ "Karezi") &lt;<karezi1992@gmail.com>&gt;
