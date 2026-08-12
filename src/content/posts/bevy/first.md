---
title: "[Vibe项目-杂谈]Bevy与Rust的约会"
published: 2026-08-01
description: "记Rust扩展学习[1]"
image: "https://cdn.nlark.com/yuque/0/2026/png/1295434/1786553933087-667fd900-8d3d-407f-8f02-a2d9361a3f19.png"
tags: [Rust, Bevy, 游戏开发]
category: Bevy
draft: false
pinned: false
comment: true
---

时间记录：2024-11-30
当前Bevy版本：0.14

实现了将内部不可见方块剔除的功能。

项目地址：

[https://github.com/MrTwoc/bevy-Demo-Spirit-Realm](https://github.com/MrTwoc/bevy-Demo-Spirit-Realm)

## 个人感想
完成这阶段同时，将项目名称改成了：

bevy-Demo-Spirit-Realm(灵境)

这里借用了钱老的关于VR的见解以及对VR的名字，我也觉得这个名字非常有感觉(好像就应该叫这个名字一样)，同时也想在游戏中，融入虚拟现实技术。

个人觉得，虚拟现实技术并不只是在虚拟环境中模拟现实的技术，而是应该尝试虚拟与现实相结合，相辅相成的。

## 阶段代码说明
方块剔除：

创建一个hashmap(chunk_blocks)，遍历xyz轴并将所有方块存进hashmap中，再由另一个循环遍历chunk_blocks，并直接用if判断当前立方体六个面是否贴着方块，然后取反，生成方块

```rust
if !(
            chunk_blocks.contains_key(&[pos[0], pos[1] + 1, pos[2]]) &&
            chunk_blocks.contains_key(&[pos[0], pos[1] - 1, pos[2]]) &&
            chunk_blocks.contains_key(&[pos[0] + 1, pos[1], pos[2]]) &&
            chunk_blocks.contains_key(&[pos[0] - 1, pos[1], pos[2]]) &&
            chunk_blocks.contains_key(&[pos[0], pos[1], pos[2] + 1]) &&
            chunk_blocks.contains_key(&[pos[0], pos[1], pos[2] - 1])
        ){
            add_cube_to_mesh(&mut positions, &mut normals, &mut uvs, &mut indices, [pos[0] as f32, pos[1] as f32, pos[2] as f32]);
        }
```

目前这段代码还需要至少两次优化迭代，一个是需要根据方块类型进行判断，比如方块的面贴着水方块，则不需要剔除，目前方块只有两个类型，1：实体方块、0：空气，以后会有更多的方块类型，就像水方块。(目前由于方便优化的原因，只设置了显示一条条的线组成的三角形)

另一个是暴露在空气中的方块没有优化彻底，一个方块在任意角度只能看见三个面，另外三个面是看不到的，这也需要剔除掉。

图中是x*y*z = 32*64*32个方块组成的立方体

<img src="https://cdn.nlark.com/yuque/0/2024/png/1295434/1732972912772-d1605980-c6c7-42fe-a55e-f5023dac6cf2.png" width="1920" title="" crop="0,0,1,1" id="u4a5d1073" class="ne-image">



## 下一阶段计划
1. 将另外三个不可见的面剔除掉
2. 实现区块化管理，模拟玩家的可视化半径，随着玩家移动，带动区块的加载和卸载
3. 实现一个超平坦世界，类似我的世界中的(超平坦世界)
