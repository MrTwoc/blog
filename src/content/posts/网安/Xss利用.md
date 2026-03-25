---
title: Xss利用
published: 2023-04-23
description: "Xss利用 笔记"
# image: "./cover.webp"
tags: ["网络安全","护网", "靶场"]
category: 网络安全
draft: false
---

DVWA<br />原理：<br />恶意攻击者往 Web 页面里插入恶意可执行网页脚本代码，当用户浏览该页之时，嵌入其中 Web 里面的脚本代码会被执行，从而可以达到攻击者盗取用户信息或其他侵犯用户安全隐私的目的。<br />Stored-中等难度<br />类型：<br />反射型<br />存储型<br />DOM型，其中为存储型危害等级最高<br />利用：<br />easy：<script>alert("1")</script><br />medium：<img src="1" onerror=alert("123")><br />high: <img src="1" onerror=alert("123")>
