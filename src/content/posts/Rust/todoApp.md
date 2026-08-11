---
title: "Vibe项目-任务管理app"
published: 2026-08-10
description: "基于web的纯Rust实现任务管理app"
image: "https://cdn.nlark.com/yuque/0/2026/png/1295434/1786428971576-bcca376b-f7e4-4445-b490-4a22f3243e2b.png"
tags: [Rust, VibeCoding, TodoApp]
category: Rust
draft: false
pinned: false
comment: true
---

<!-- <img src="https://cdn.nlark.com/yuque/0/2026/png/1295434/1786428971576-bcca376b-f7e4-4445-b490-4a22f3243e2b.png" width="1920" title="" crop="0,0,1,1" id="ub87c5ef6" class="ne-image"> -->

## 项目背景
本项目为熟练rust语言而开始，之前找了一些关于任务管理方面的app，比如trello 发现交互比较有意思，尤其是任务的拖拽实现，  
所以我打算自己实现一个类似的app，来熟悉rust语言的语法和库的使用。  
目前项目的技术栈包括：[ 后端 ]Savlo、[ 前端 ]Leptos、[ 数据库 ]postgresql 

以及所使用的库：

```plain
[workspace.dependencies]
futures-util = "0.3.32"
salvo = { version = "0.89.2", features = ["websocket","oapi","logging","test","cors"] }
serde = "1.0.228"
serde_json = "1.0.149"
tokio = "1.50.0"
tokio-stream = "0.1.18"
tracing = "0.1.44"
tracing-subscriber = { version = "0.3.22", features = ["env-filter"] }

# 前端依赖
console_error_panic_hook = "0.1.7"
leptos = { version = "0.8.17", features = ["csr"] }
leptos_router = "0.8.12"

# ferroid = "1.0.2"
sonyflake = "0.4.0"
# nulid = "0.10.1"
chrono = "0.4.44"

# 数据库
sqlx = "0.8.6"
# 密码加密
argon2 = "0.5.3"
# 错误处理库    
# thiserror = "2.0.18"
anyhow = "1.0.102"
# indexeddb
# idb = "0.6.5"

regex-lite = "0.1"
# 日志
tracing-appender = "0.2"
uuid = { version = "1", features = ["v4"] }
jsonwebtoken = { version = "10.3.0", default-features = false, features = ["rust_crypto"] }
```

项目主要利用Leptos框架生成的wasm文件，  
通过Savlo框架将wasm文件部署到web服务器上，通过postgresql数据库存储任务数据。  
目前实现了基本的任务管理功能，包括创建任务、编辑任务、删除任务等功能。但目前还未实现任务的拖拽排序功能。

<img src="https://cdn.nlark.com/yuque/0/2026/png/1295434/1786429086703-1b444b50-3feb-429c-b49c-639c4b6f964d.png" width="1919" title="" crop="0,0,1,1" id="ucf651233" class="ne-image">

<img src="https://cdn.nlark.com/yuque/0/2026/png/1295434/1786429111057-282b7f75-a457-48d2-98f2-5fbc5439ffdc.png" width="1916" title="" crop="0,0,1,1" id="u426d6997" class="ne-image">

<img src="https://cdn.nlark.com/yuque/0/2026/png/1295434/1786429126091-c44aaa1e-db85-4e24-9d1a-7ae97cda702b.png" width="1896" title="" crop="0,0,1,1" id="uee2f81ff" class="ne-image">

<img src="https://cdn.nlark.com/yuque/0/2026/png/1295434/1786429140849-6a7f42f2-7908-48d1-9cb6-c9e8b67f4d35.png" width="1735" title="" crop="0,0,1,1" id="u82be93af" class="ne-image">

<img src="https://cdn.nlark.com/yuque/0/2026/png/1295434/1786429158022-292a162a-5554-4e3c-87a4-a054069cca79.png" width="1884" title="" crop="0,0,1,1" id="u6c58e66a" class="ne-image">
