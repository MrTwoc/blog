---
title: Windows系统加固
published: 2023-04-19
description: "Windows系统加固 笔记"
# image: "./cover.webp"
tags: ["网络安全","护网", "靶场"]
category: 网络安全
draft: false
---

<a name="TXy8Q"></a>
### 用户分类
本地用户<br />域用户<br />用户组：多个用户组成的群体，对某个资源有相同的权限

用户组账户<br />描述
<a name="FOFP6"></a>
### 本地用户组
Administrators——<br />该组用户具有对服务器的完全控制权限，并且可以根据需要向用户指派用户权限。<br />Backup Operators——<br />可以备份和还原服务器上的文件，无需考虑文件的权限，并且不能更改安全设置。<br />guests——<br />该组成员拥有一个在登录时创建的临时配置文件，在注销时，该配置文件也被删除。<br />Enent log readers——<br />可以从本地计算机中读取事件日志<br />Power users——<br />该组成员可以创建、修改和删除账户。可以创建本地组，然后在他们已创建的本地用户组中添加或删除用户，也可以在power users、users和guests组中添加删除用户。可以创建共享资源并管理所创建的共享资源，不能取得文件的所有权、备份和还原目录、加载或卸载设备驱动程序、或者管理安全性以及日志<br />该组的成员可以执行一些常见任务，如运行应用程序、使用本地和网络打印机及锁定服务器,用户不能共享目录或创建本地打印机。默认情况下，domain users、Authenticated users.inteeractive是该组的成员，所以在域中创建的任何用户账户都成为该组的成员<br />Remote desktop users——<br />可以远程登录服务器

<a name="iHIsi"></a>
### 系统常用指令
net user——显示目前存在的用户<br />dir		查看当前目录下文件<br />cd		切换目录<br />net user testaa /add		在user组添加一个用户<br />net user 用户名		查看一个用户的详细信息<br />net localgroup administrators testadd /add		将一个用户加入到管理员组<br />net user testaa /del		删除一个用户


<a name="fthdh"></a>
### 应注意点
账户空口令/弱口令

<a name="N3Y3O"></a>
### 系统策略
用户安全策略/本地安全策略<br />secpol.msc<br />组安全策略<br />gpedit.msc<br />如账户锁定策略、口令策略<br />审核策略<br />审核策略是windows本地安全策略的一部分，当用户执行某项操作时，审核日志都会逐一记录，通过配置审核策略，系统可以自动记录所有登录到本地计算机的事件，通过记录的事件日志，就能迅速判断系统被外来者入侵或是试图入侵。

<a name="xaR4i"></a>
#### 策略开启建议

1. 审核登录事件
2. 审核对象访问
3. 审核过程跟踪
4. 审核目录访问
5. 特权使用
6. 系统事件
7. 账号登录事件
8. 账户管理

<a name="inAqb"></a>
#### 注意点
为避免权限管理混乱，应尽量将用户权利指派到组，将需要获得此权限的用户添加到该组中。<br />“开始”“管理工具”-“本地安全策路”中打开“本地安全策略窗口”，双击要分配给组的用户权限

<a name="sUsyL"></a>
### NTFS权限
NTFS是计算机上使用最多的文件系统，其主要特点是安全性高，便于对文件安全的统一管理,允许管理员为文件配置详细的访问控制权限。<br />权限是指与计算机的文件或文件夹对象关联的访问规则，用于确定用户是否可以访问对象，可以执行哪些操作。使用NTFS文件系统，用户可以实现对文件或文件夹的授权访问，从而保证计算器存储的安全。<br />默认情况下，只有授权的用户才可以访问<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687078113609-8c9718c2-6d55-476f-a89f-48106f9f7798.png#averageHue=%23bbc7d9&clientId=ue33e79f0-35a8-4&from=paste&height=414&id=uc7cacdc1&originHeight=414&originWidth=840&originalType=binary&ratio=1&rotation=0&showTitle=false&size=296825&status=done&style=none&taskId=u03062f01-617f-4b4d-8a48-3ddb797995b&title=&width=840)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687078128576-b3d0243a-ee42-4e39-888c-62d434ac7bb4.png#averageHue=%23c0c9d7&clientId=ue33e79f0-35a8-4&from=paste&height=445&id=ud7c9379a&originHeight=445&originWidth=921&originalType=binary&ratio=1&rotation=0&showTitle=false&size=361186&status=done&style=none&taskId=u76856351-30a7-4a2d-a6ac-b486ad12611&title=&width=921)

<a name="K9lkD"></a>
#### 权限积累
用户对文件的最终权限是用户指定全部NTFS权限和所属组指定全部NTFS权限的总和。<br />如用户账户隶属于B组，并且该用户本身C文件夹具有读取权限，而其所在的用户组B对C文件夹拥有写入权限，所以最终用户A对C文件夹的的有效权限就是“读取+写入”

文件权限优先于文件夹权限<br />用户只要拥有一个文件的权限，即便没有访问文件所在文件夹的权限,也可以访问该文件<br />如C文件夹下包含Files1和Files2两个文件，C的文件夹权限允许用户A写入，但File2的NTFS权限只允许用户A读取，则此时用户A的有效权限就是对C文件夹(包括File1）的写入权限和对File2的读取权限

拒绝权限优先于其它权限<br />在Windows系统的所有NTFS权限中，拒绝权限优先于其他任何权限。即使用户作为一个组的成员有权访问文件或文件夹，一旦该用户被设置了拒绝访问权限，则最终将剥夺该用户可能拥有的任何其他权限。在实际使用中，应当尽量避免使用拒绝权限，因为允许用户和组进行某种访问，要比设置拒绝权限更容易做到。

权限继承<br />文件和子文件夹从其父文件夹继承权限，即管理员为父文件夹指定的任何权限，同时也适用于在该父文件夹中所包含的子文件夹和文件。如当允许权限继承时，为Folder1设置的访问权限，将自动被传递给File1、Folder2和File2.子文件夹Folder2和文件File2将自动取得为父文件夹Folder1设置的访问权限<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687078577032-e515134e-76a8-4909-ba42-1de0c906bb6d.png#averageHue=%2397af56&clientId=ue33e79f0-35a8-4&from=paste&height=410&id=ue727b5aa&originHeight=410&originWidth=645&originalType=binary&ratio=1&rotation=0&showTitle=false&size=163618&status=done&style=none&taskId=u58913ab1-2825-463d-8a92-d9691dcaa03&title=&width=645)

<a name="qKFce"></a>
### NTFS权限相关
复制和移动对文件夹权限的影响<br />在NTFS分区内和NTFS分区之间复制或者移动文件、文件夹时，Windows系统会将其作为新文件或文件夹，因此，会对源文件或文件夹的NTFS权限产生影响。在复制文件和文件夹时，必须拥有源文件夹的读取权限，并且对目标文件夹具有“写入”权限。在移动文件或文件夹时，必须对目标文件夹拥有写入”权限，并且对源文件夹拥有“修改”权限。<br />当从一个文件夹向另一个文件夹复制文件或文件夹时，或者从一个磁盘分区向另一个磁盘分区复制文件或文件夹时，复制文件或文件夹会对NTFS权限产生下述影响:<br />·当在单个NTFS分区内复制文件夹或文件时，文件夹或文件的复制将继承目的文件夹的权限。·当在NTFS分区之间复制文件夹或文件时，文件夹或者文件的复件将继承目的文件夹的权限。·当将文件或文件夹复制到非NTFS分区（如FAT32分区或FAT分区）时，因为非NTFS分区不支持NTFS权限，所以，这些文件夹或文件将丢失NTFS权限。

移动对NTFS权限的影响如下<br />当在单个NTFS分区内移动文件夹或文件时，该文件夹或者文件保留其原来的权限。<br />当在NTFS分区之间移动文件夹或文件时，该文件夹或文件将继承目的文件夹权限。当在NTFS分区之间移动文件夹或文件时，实际是将文件夹或文件复制到新位置，然后，将其从原来的位置删除。<br />当将文件或文件夹移动到非NTFS分区时，因为非NTFS分区不支持NTFS权限，所以，这些文件夹或文件将丢失其NTFS权限。

文件权限审核<br />审核功能可以跟踪用户对指定对象的详细操作，并生成可供管理员查阅的事件日志，提供查看日志中安全事件的方法。这对于监视非法用户入侵以及危及系统数据安全性的尝试是非常必要的。<br />通常情况下，应该被审核的最普通的事件类型包括:<br />访问对象，例如文件和文件夹<br />用户和组账户的管理员<br />用户登录以及从系统注销<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687079028963-01f45446-07dc-4b28-aeb8-0e832daf7b6b.png#averageHue=%23bec7d5&clientId=ue33e79f0-35a8-4&from=paste&height=475&id=u092bd62c&originHeight=475&originWidth=986&originalType=binary&ratio=1&rotation=0&showTitle=false&size=480635&status=done&style=none&taskId=ud63d4eaf-09b6-42ed-a0ee-44b047c52e3&title=&width=986)

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687079142835-d526d2b7-5864-4708-98f4-5bec3a47ee2e.png#averageHue=%23f5f5f5&clientId=ue33e79f0-35a8-4&from=paste&height=450&id=u59924208&originHeight=450&originWidth=1066&originalType=binary&ratio=1&rotation=0&showTitle=false&size=161618&status=done&style=none&taskId=u408f0d7d-09d7-44a5-80ff-251faff464d&title=&width=1066)

使用cacls命令更改文件或文件夹权限<br />1.查看目录和ACL<br />cacls文件夹<br />2.修改目录和ACL<br />完全控制权cacls test /t/e/c/g user : f<br />只读权限cacls test/t/e/c/p user:r<br />撤销权限cacls test/t/e/c/r user: f<br />拒绝用户访问cacls test/t/e/c/d user : f<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687079765751-a7b47341-9663-44af-95a5-7a4a77d60fcb.png#averageHue=%23181818&clientId=ue33e79f0-35a8-4&from=paste&height=403&id=ue56191c2&originHeight=403&originWidth=581&originalType=binary&ratio=1&rotation=0&showTitle=false&size=103696&status=done&style=none&taskId=u5e9cd73d-1f99-4ae6-ad10-757da435bfd&title=&width=581)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687079774865-6633fb12-1a74-4c83-a7e4-d47ff89fe745.png#averageHue=%23646464&clientId=ue33e79f0-35a8-4&from=paste&height=513&id=u72a6da86&originHeight=513&originWidth=701&originalType=binary&ratio=1&rotation=0&showTitle=false&size=121231&status=done&style=none&taskId=ub57b0959-a303-4e63-af63-130b4b42a94&title=&width=701)

<a name="sXfUQ"></a>
### windows日志分类

1. Windows系统日志（包括应用程序、安全、安装程序、系统和转发的事件)
2. 服务器角色日志
3. 应用程序日志.
4. 服务日志

事件日志基本信息<br />日志主要记录行为当前的日期、时间、用户、计算机、信息来源、事件、类型、分类等信息

<a name="w6r8q"></a>
#### 安全性日志
通过日志审核功能，可以快速检测黑客的渗透和攻击，防止非法用户的再次入侵。主要是通过以下事件策略审核:<br />1.对策略的审核<br />2.对登录成功或失败的审核<br />3.对访问对象的审核<br />4.对进程跟踪的审核<br />5.对账户管理的审核<br />6.对特权使用的审核<br />7.对目录服务访问的审核

访问这些日志我们需要在开始栏搜索“计算机管理”并打开，或者我的电脑右键→管理→系统工具<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687080246676-ef725d92-4e5a-4e9f-b17a-9e9840915910.png#averageHue=%23dcd3b6&clientId=ue33e79f0-35a8-4&from=paste&height=463&id=u9b8c4ce1&originHeight=463&originWidth=681&originalType=binary&ratio=1&rotation=0&showTitle=false&size=241926&status=done&style=none&taskId=ud30768c3-e835-43e1-8d08-f58db0ba41a&title=&width=681)

<a name="vQEHU"></a>
### 安全防护
启动和关闭防火墙<br />可以在控制面板中找到，通过图形化页面去操作<br />命令：<br />启动和关闭防火墙<br />也可以再命令行中通过命令开启或者关闭防火墙<br />启动防火墙<br />netsh advfirewall set allprofiles state on<br />关闭防火墙<br />netsh advfirewall set allprofiles state off

启动Windows安全中心


