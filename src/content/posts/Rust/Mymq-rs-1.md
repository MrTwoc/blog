---
title: "Mymq-rs[消息队列]"
published: 2026-09-06
description: "自习 · Rust语言从零实现消息队列"
image: "https://cdn.nlark.com/yuque/0/2026/png/1295434/1788695121516-3f2c10c3-447f-4761-bef8-d8b1abe21ca7.png"
tags: [Rust、消息队列、tokio、quinn、protobuf、HTTP API]
category: Rust
draft: false
pinned: false
comment: true
---

<!-- <img src="https://cdn.nlark.com/yuque/0/2026/png/1295434/1788695121516-3f2c10c3-447f-4761-bef8-d8b1abe21ca7.png" width="1920" title="" crop="0,0,1,1" id="ubb72a2a9" class="ne-image"> -->

> 本项目计划从零实现一个消息队列，支持消息的生产者-消费者模型。

**项目地址：** <https://github.com/MrTwoc/Mymq-rs>

## 技术栈预计包括：

- Rust 2024
- tokio（Mutex / Notify / spawn）
- `Arc<Mutex<Broker>>` 并发共享
- quinn（QUIC + TLS 1.3）
- rcgen 自签名证书
- protobuf + prost 序列化
- build.rs 代码生成

## 要实现的功能：

- 消息模型与全局 ID
- 广播订阅：一条消息复制给每个订阅者
- 每订阅者独立的 pending / inflight 状态
- dequeue / ack / nack 三操作
- 超时重投巡检
- protobuf 命令协议（Subscribe / Publish / Dequeue / Ack / Nack）
- QUIC 服务端与客户端
- 持久化、topic 路由、HTTP 管理接口

---

> 分五个阶段推进，每阶段独立可运行。当前阶段 1 已完成，阶段 2 进行中。
