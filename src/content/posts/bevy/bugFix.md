---
title: "[Vibe项目-杂谈]Bevy与Rust的约会-BUG修复"
published: 2026-08-02
description: "记Rust扩展学习[2]"
image: "https://cdn.nlark.com/yuque/0/2026/png/1295434/1786553933087-667fd900-8d3d-407f-8f02-a2d9361a3f19.png"
tags: [Rust, Bevy, 游戏开发]
category: Bevy
draft: false
pinned: false
comment: true
---

2025.1.24：

目前实现了只渲染可见面的效果，被方块挡住的面就跳过渲染。

代码条件第一次还写反了，判断front面如果接触空气，则添加一个back面。。

<img src="https://cdn.nlark.com/yuque/0/2025/png/1295434/1737719490186-12926080-4d9c-49f0-9296-bc7b5823b41a.png" width="1039" title="" crop="0,0,1,1" id="ua2f1a966" class="ne-image">

就导致了这种样子。。

<img src="https://cdn.nlark.com/yuque/0/2025/png/1295434/1737719503934-a020cc41-afdb-47ab-9238-3207282d2913.png" width="1920" title="" crop="0,0,1,1" id="u80597a59" class="ne-image">

修好后看起来就正常些了

<img src="https://cdn.nlark.com/yuque/0/2025/png/1295434/1737719533798-25e7e819-b6b5-4b11-bc91-f9d099c2ce58.png" width="1920" title="" crop="0,0,1,1" id="u36e96e13" class="ne-image">

。。

但是还有个问题，不知道怎么处理，我用chunk把一个个mesh拼起来之后，从下面看是这样。。每个mesh边缘这四面不知道咋剔除了：

<img src="https://cdn.nlark.com/yuque/0/2025/png/1295434/1737719584941-0eb6f311-b104-4fee-8019-7b498ed1f699.png" width="1920" title="" crop="0,0,1,1" id="udcbc8677" class="ne-image">

目前打算先研究一下是不是剔除逻辑需要修改一下。。

以及限制自然地形生成高度的Y轴如果设置过高的话，会有些奇怪的空隙，例如下图中的各个洞：Y = 320

这种情况在Y轴越高的时候，越明显，如果设置为20480，就只剩下一条一条的方块，看不出地形了。

<img src="https://cdn.nlark.com/yuque/0/2025/png/1295434/1737719845871-6f94d53b-3371-4275-8ff1-f98b9999008d.png" width="1920" title="" crop="0,0,1,1" id="u2736ff05" class="ne-image">

修好后就可以试着放上草方块的贴图，看看只有草方块的我的世界了。。

另外还需要实现破坏和放置功能，以上都实现后再打算加入联机功能。
