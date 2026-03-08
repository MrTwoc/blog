---
title: Linux系统加固
published: 2023-04-07
description: "Linux系统加固 笔记"
# image: "./cover.webp"
tags: ["网络安全","护网", "靶场"]
category: 网络安全
draft: false
---

<a name="peyRd"></a>
### 系统命令
超级用户<br />UID=0、用户名=root；可管理系统内所有资源<br />系统用户<br />不能用于登录，UID=1~999；比如系统中http进程就是使用用户apache运行<br />普通用户<br />UID=1000~65535，可以使用大部分资源，一些特殊权限会受到控制，用户只对自己的目录有写权限。

sudo命令：普通用户暂时借用root权限执行命令，需输入密码校验，并被记录所有操作<br />/etc/password——用户账号文件<br />用户名：密码：用户ID：主组ID：用户全称：主目录：登录shell<br />/etc/shadow——用户密码文件<br />密码：上次修改密码的时间：两次修改密码间隔最短天数：最长天数：提前几天警告密码过期：过期几天后禁用用户：过期时间：保留字段<br />/etc/group——用户组文件<br />组名：密码：组ID和用户列表<br />/etc/gshadow 保存系统中所有组的密码<br />/etc/skel 每创建一个新账户，系统会自动把/etc/skel目录下所有内容(包括目录、文件)复制到新用户的主目录“/home/<用户名>”下

<a name="aTMZ2"></a>
### 用户管理
useradd test 创建用户 test<br />passwd test 修改用户 test的密码<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1686917111746-5db23795-ac77-4976-8138-7a0eeef3c996.png#averageHue=%23f8f8f8&clientId=ua29a5985-d6aa-4&from=paste&height=531&id=uf2080787&originHeight=531&originWidth=1069&originalType=binary&ratio=1&rotation=0&showTitle=false&size=133187&status=done&style=none&taskId=u845cae58-d33a-481a-bf78-d845aefffb0&title=&width=1069)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1686917125676-8b64b38d-9908-454e-8138-c3fd1010fafa.png#averageHue=%23fafafa&clientId=ua29a5985-d6aa-4&from=paste&height=549&id=u16bc1f1e&originHeight=549&originWidth=1117&originalType=binary&ratio=1&rotation=0&showTitle=false&size=119283&status=done&style=none&taskId=ud4580994-8fe4-476f-b0d0-aacf5a0edae&title=&width=1117)

<a name="t7XDp"></a>
### 用户组管理
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1686917166806-7519f2e9-743d-4f43-920b-7c2f82a4b69d.png#averageHue=%23f8f8f8&clientId=ua29a5985-d6aa-4&from=paste&height=497&id=ua4b602ff&originHeight=497&originWidth=1094&originalType=binary&ratio=1&rotation=0&showTitle=false&size=134537&status=done&style=none&taskId=u38c00cb6-3c5c-4f25-b2a2-9404afce494&title=&width=1094)

<a name="fbP48"></a>
### 用户账户管理
1.检查<br />#cat /etc/passwd	#cat /etc/shadow<br />#awk -F: '$3==0 {print $1}' /etc/passwd		查询UID=0的用户<br />2.清除多余账号<br />#userdel -r 用户名<br />3.锁定账号<br />#passwd -l 用户名	#passwd -u 用户名(解锁账号)

<a name="dBUIx"></a>
### 用户口令管理
在/etc/shadow 查看用户是否为空口令：密码字段为感叹号<br />#awk -F:'length($2)==0 {print $1}' /etc/shadow<br />#awk -F ":"'($2==""){print $1}' /etc/shadow<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1686917983124-16e6c37a-7a68-4149-b0b5-375d6582fb7e.png#averageHue=%23f2f2f2&clientId=ua29a5985-d6aa-4&from=paste&height=143&id=u408e9c77&originHeight=143&originWidth=278&originalType=binary&ratio=1&rotation=0&showTitle=false&size=15137&status=done&style=none&taskId=u4faee148-ea97-44bb-947a-b057b928f30&title=&width=278)

<a name="Rcd5f"></a>
### 防止弱口令
修改文件：<br />vi /etc/pam.d/system-auth<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1686917995094-6ec62783-4452-472d-b16a-90ecbe3b06a8.png#averageHue=%23f7f7f7&clientId=ua29a5985-d6aa-4&from=paste&height=525&id=u140556f6&originHeight=525&originWidth=1031&originalType=binary&ratio=1&rotation=0&showTitle=false&size=148148&status=done&style=none&taskId=u3cc8e812-a7d6-46f4-80c4-2e6443dfcc8&title=&width=1031)

口令生存期：<br />vi /etc/login.defs<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1686918072852-c9d903a6-6295-47dd-93b0-9e3d93f7e9ca.png#averageHue=%23eeeeee&clientId=ua29a5985-d6aa-4&from=paste&height=120&id=u5686f71c&originHeight=120&originWidth=661&originalType=binary&ratio=1&rotation=0&showTitle=false&size=43853&status=done&style=none&taskId=u4936a5b8-c042-4b22-8309-cf37eb0f7da&title=&width=661)

<a name="I7kYg"></a>
### 禁止root远程登录
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1686918091868-5d92db8b-b02c-4aae-b745-07363a689072.png#averageHue=%23f7f7f7&clientId=ua29a5985-d6aa-4&from=paste&height=133&id=u0bbbc9a1&originHeight=133&originWidth=724&originalType=binary&ratio=1&rotation=0&showTitle=false&size=26357&status=done&style=none&taskId=u2e300ecf-aa8c-4b1c-ad96-d4755a39817&title=&width=724)

<a name="A6uj1"></a>
### 禁止su到root
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1686918122436-470cf2af-17e0-487e-b076-65f3589b2349.png#averageHue=%23f8f8f8&clientId=ua29a5985-d6aa-4&from=paste&height=378&id=u03b8430f&originHeight=378&originWidth=919&originalType=binary&ratio=1&rotation=0&showTitle=false&size=81612&status=done&style=none&taskId=ucfc00085-2a29-45e5-b37e-203e71571ee&title=&width=919)

<a name="lQ7n8"></a>
### 用户管理总结
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1686918141816-7e77a025-a783-4d17-8b8e-da3694bb4d31.png#averageHue=%23f7f7f7&clientId=ua29a5985-d6aa-4&from=paste&height=414&id=uc71e1de3&originHeight=414&originWidth=599&originalType=binary&ratio=1&rotation=0&showTitle=false&size=72267&status=done&style=none&taskId=u4d51a6c9-2910-47db-b76a-3b7f7dcc655&title=&width=599)

<a name="EXICO"></a>
### Linux文件系统简介
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1686918172983-172f53aa-17bd-4fa6-8a8a-0b796d09b4b1.png#averageHue=%23dadfe7&clientId=ua29a5985-d6aa-4&from=paste&height=558&id=u474b9fa1&originHeight=558&originWidth=963&originalType=binary&ratio=1&rotation=0&showTitle=false&size=413537&status=done&style=none&taskId=u7ec0f58a-916d-41cb-a25d-44a60cb1a14&title=&width=963)
<a name="I91lu"></a>
### 文件系统属性
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1686918218001-2c50df79-e695-4c6a-aaac-c1cf78b48f6f.png#averageHue=%239b8b76&clientId=ua29a5985-d6aa-4&from=paste&height=568&id=u6d94ea46&originHeight=568&originWidth=1063&originalType=binary&ratio=1&rotation=0&showTitle=false&size=270072&status=done&style=none&taskId=u99a8d05d-c287-4836-b919-cc34d0601c9&title=&width=1063)

修改文件和目录所有者<br />chown<br />#chown -R root: users /test

修改文件访问权限<br />chmod<br />两种方式：1.字符方式:u、g、o		2.数字方式：4/2/1<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1686918369147-302aa748-e8c2-44b8-946f-26ab6b5ec184.png#averageHue=%23f2f4f4&clientId=ua29a5985-d6aa-4&from=paste&height=448&id=u05ee6b07&originHeight=448&originWidth=927&originalType=binary&ratio=1&rotation=0&showTitle=false&size=269252&status=done&style=none&taskId=ucc80d47a-fda0-4b9b-9883-f81de9be3fe&title=&width=927)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1686918386318-e9728df8-4aa1-4280-8887-41017074da2c.png#averageHue=%232d2f2d&clientId=ua29a5985-d6aa-4&from=paste&height=575&id=u5ad6a2ab&originHeight=575&originWidth=998&originalType=binary&ratio=1&rotation=0&showTitle=false&size=249749&status=done&style=none&taskId=u2486e516-c504-443d-8d45-ba0e00a6afb&title=&width=998)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1686918402497-8ba069cf-f24f-4266-bdf6-0b43b586303f.png#averageHue=%2348aba0&clientId=ua29a5985-d6aa-4&from=paste&height=448&id=ucec95903&originHeight=448&originWidth=718&originalType=binary&ratio=1&rotation=0&showTitle=false&size=204302&status=done&style=none&taskId=u3887cac5-8613-4199-8ffa-693e712278d&title=&width=718)

<a name="X0euP"></a>
### 权限管理
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1686918432324-1a03d824-9992-4d22-9227-8f722e2af6e6.png#averageHue=%23f6f6f6&clientId=ua29a5985-d6aa-4&from=paste&height=548&id=ub3fe312d&originHeight=548&originWidth=1021&originalType=binary&ratio=1&rotation=0&showTitle=false&size=185727&status=done&style=none&taskId=u1ab0f914-3e2b-4651-9b35-3961286f0f5&title=&width=1021)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1686918445970-fbd984af-1fe6-489a-9557-fd6cec612fe3.png#averageHue=%23f6f6f6&clientId=ua29a5985-d6aa-4&from=paste&height=333&id=u590c8f78&originHeight=333&originWidth=473&originalType=binary&ratio=1&rotation=0&showTitle=false&size=48593&status=done&style=none&taskId=ud7e8c667-0b64-408f-abbc-a9215a2c55a&title=&width=473)

<a name="SrMzC"></a>
### 日志安全
<a name="BvwxH"></a>
#### 日志分类
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1686918535367-878152d5-5b09-44e9-898a-224242ac6fbb.png#averageHue=%23ecf1f4&clientId=ua29a5985-d6aa-4&from=paste&height=494&id=u0c11644f&originHeight=494&originWidth=1012&originalType=binary&ratio=1&rotation=0&showTitle=false&size=339010&status=done&style=none&taskId=u1431e140-185f-4923-a8f7-d19853a5d45&title=&width=1012)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1686918571015-f6922008-9d3a-42c4-aeb3-e585b0e2a44e.png#averageHue=%23f6f6f6&clientId=ua29a5985-d6aa-4&from=paste&height=424&id=uf58529e5&originHeight=424&originWidth=985&originalType=binary&ratio=1&rotation=0&showTitle=false&size=134785&status=done&style=none&taskId=u1325c361-f440-40ee-8ff2-a96517faca2&title=&width=985)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1686918586625-624d01f0-d596-4004-a242-5c728afffbe9.png#averageHue=%23f7f7f7&clientId=ua29a5985-d6aa-4&from=paste&height=583&id=uf62f49fd&originHeight=583&originWidth=1091&originalType=binary&ratio=1&rotation=0&showTitle=false&size=153497&status=done&style=none&taskId=u85ba6b3f-ae56-42e2-b593-cb7fc89eece&title=&width=1091)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1686918608439-ed4a1ed1-aa3a-48a3-b679-fc08879e857f.png#averageHue=%23f6f6f6&clientId=ua29a5985-d6aa-4&from=paste&height=319&id=ud6477741&originHeight=319&originWidth=986&originalType=binary&ratio=1&rotation=0&showTitle=false&size=106252&status=done&style=none&taskId=ud6ebc047-548e-49ff-97b4-a719c55349e&title=&width=986)<br />/var/log/messages 服务器的系统日志<br />/var/log/secure	记录了系统的登录行为<br />var/log/wtmp、	/var/log/lastlog 记录了系统登录和注销信息
