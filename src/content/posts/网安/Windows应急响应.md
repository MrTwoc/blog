---
title: Windows应急响应
published: 2023-04-21
description: "Windows应急响应 笔记"
# image: "./cover.webp"
tags: ["网络安全","护网", "靶场"]
category: 网络安全
draft: false
---

<a name="awERC"></a>
### 应急响应概述
当企业发生黑客入侵、系统崩溃或其它影响业务正常运行的安全事件时，急需第一时间进行处理，使企业的网络信息系统在最短时间内恢复正常工作，进一步查找入侵来源，还原入侵事故过程，同时给出解决方案与防范措施，为企业挽回或减少经济损失。<br />常见的应急响应事件分类:<br />web入侵:网页挂马、主页篡改、Webshell<br />系统入侵:病毒木马、勒索软件、远控后门<br />网络攻击:DDOS攻击、DNS劫持、ARP欺骗

<a name="ZTA0j"></a>
### 基础信息获取
这部分基础信息获取都是使用Windows自身命令或者工具即可实现。这部分包括系统信息获取、网络信息获取、进程信息获取、用户信息获取、历史流量获取。
<a name="rgZd9"></a>
#### 系统信息获取
这里有两种方式，可以获取系统的相关信息。第一种，低版本操作系统，例如可以通过winmsd来获取相关信息，具体操作信息如下:<br />开始->运行->winmsd<br />点击软件环境->系统驱动程序，可查看当前加载的驱动程序<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687327177668-e9e30811-420f-45bb-bee8-65deb8af7c5f.png#averageHue=%23e6e5e4&clientId=u27556ba3-c3aa-4&from=paste&height=354&id=u09f00ce5&originHeight=354&originWidth=548&originalType=binary&ratio=1&rotation=0&showTitle=false&size=162995&status=done&style=none&taskId=u167bea2b-aff3-4170-b1e5-4a74d42b5f9&title=&width=548)<br />点击软件环境->正在运行任务，可查看当前运行的进程<br />点击软件环境->加载的模块，可查看程序加载的 dll 文件

但是这部分功能在高版本操作系统中，已经被移除了，例如 Windows Server 2008,所以下面介绍第二种方法。<br />第二种办法就是命令行输出，我们可以在 cmd命令行中输入 systeminfo，我们可以看到下图中标红框的地方有系统打过的补丁信息。这里我们可以了解到系统可能存在的一些漏洞信息。<br />但是很明显，这里和第一种的差别，就是没有列出加载的进程， dll文件，驱动等信息，但是这些信息可以通过其他工具去获取到，在 Windows server 2008以及windows7之后，Windows 引入了资源控制器。两种方式打开<br />1．运行->resmon<br />2.任务管理器->性能->资源监视器<br />这部分可根据相关exe搜索加载的dl等文件。
<a name="iS5Tv"></a>
#### 网络信息获取
Windows下的 cmd命令行输入 ipconfig，先确认当前网卡的 ip 地址分配情况。<br />然后可以进一步确认网络连接情况，通过 cmd命令行输入netstat - ano，获取网络进程连接的状态，检查是否存在可疑进程网络连接信息。
<a name="obqcf"></a>
##### netstat 的几种状态
CLOSED<br />初始（无连接）状态。-9-<br />LISTEN<br />侦听状态，等待远程机器的连接请求。<br />SYN_SEND<br />在TCP三次握手期间，主动连接端发送了SYN包后，进入SYN_SEND状态，等待对方的 ACK包。<br />SYN_RECV<br />在TCP三次握手期间，主动连接端收到SYN包后，进入SYN_RECV状态。<br />ESTABLISHED<br />完成TCP三次握手后，主动连接端进入ESTABLISHED状态。此时，TCP连接已经建立，可以进行通信。<br />FIN_WAIT_1<br />在TCP四次挥手时，主动关闭端发送FIN包后，进入FIN_WAIT_1状态。<br />FIN_WAIT_2<br />在TCP四次挥手时，主动关闭端收到ACK包后，进入FIN_WAIT_2状态。<br />TIME_WAIT<br />在TCP四次挥手时，主动关闭端发送了ACK包之后，进入TIME_WAIT状态，等待最多MSL 时间，让被动关闭端收到ACK包。<br />CLOSING<br />在TCP四次挥手期间，主动关闭端发送了FIN包后，没有收到对应的ACK包，却收到对方的 FIN 包，此时，进入CLOSING状态。<br />CLOSE_WAIT<br />在TCP四次挥手期间，被动关闭端收到FIN包后，进入CLOSE_WAIT状态。<br />LAST_ACK<br />在TCP 四次挥手时，被动关闭端发送 FIN包后，进入LAST_ACK状态，等待对方的ACK包。
<a name="JCXcS"></a>
##### 小总结
主连接端可能的状态有:CLOSED、 YN_SEND、ESTABLISHED<br />主动关闭端可能的状态有:FIN_WAIT_1、FIN_WAIT_2、TIME_WAIT。被动连接端可能的状态有:ISTEN、YN_RECV、ESTABLISHED。<br />被动关闭端可能的状态有:CLOSE_WAIT、AST_ACK 、 LOSED
<a name="x7XwR"></a>
#### 用户信息获取
Windows下的 cmd命令行输入net user，确认当前操作系统的用户信息，确认是否存在可疑账户。<br />当然可以继续下一步输入net user xx，确认该xx用于所属的 windows组信息。<br />Windows自带资源监视器，可以筛选当前进程的相关信息，这步主要在挖矿，或者被抓肉鸡向外 DOS攻击的情况下特别好用。<br />无法在Windows Server 2003上使用。
<a name="PmkyW"></a>
### 详细信息获取
<a name="CwFBF"></a>
#### 启动信息收集
这里涉及到一个工具，叫做Autoruns，由于大多数的恶意软件本身不存在相关描述信息，所以通过检查 Publisher 和 Description 两条项目可排除一些较简单的后门程序或恶意代码:<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687327888453-8b0f7c8d-d157-42b2-a9b6-90079d9d8e25.png#averageHue=%23d1d3c5&clientId=u27556ba3-c3aa-4&from=paste&height=535&id=u7f1fbd48&originHeight=535&originWidth=887&originalType=binary&ratio=1&rotation=0&showTitle=false&size=362823&status=done&style=none&taskId=u42e33666-2939-4158-8106-f1179207b6d&title=&width=887)<br />通过选择Options菜单中的 Hide Microsoft and Windows Entries可由 Autoruns自动筛选部分安全的启动项:<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687327917263-abde5d40-b4c3-4b43-9577-63c0aaad4b13.png#averageHue=%23dad5ca&clientId=u27556ba3-c3aa-4&from=paste&height=519&id=ua89d1ac9&originHeight=519&originWidth=1177&originalType=binary&ratio=1&rotation=0&showTitle=false&size=430213&status=done&style=none&taskId=u2c9625b3-1996-47f4-98ba-abe4629b5f9&title=&width=1177)
<a name="n3uR0"></a>
#### 行为信息收集
在一些病毒中，常常会寻求访问一些敏感文件、注册表，创建模块等一些异常行为，所以我们可以通过上辅助监控软件，来检查恶意程序的行为。<br />Procmon会实时展现进程对文件的行为以及结果，如下图所示:<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687328113291-15431018-3cd7-4818-9009-1c9acb8ff1a1.png#averageHue=%23e9e7e4&clientId=u27556ba3-c3aa-4&from=paste&height=515&id=u97993a23&originHeight=515&originWidth=665&originalType=binary&ratio=1&rotation=0&showTitle=false&size=393169&status=done&style=none&taskId=u2c2509af-2571-4504-8e80-ae9bc7c6af8&title=&width=665)

该工具会清楚展示，该进程对某些文件做了什么操作，如果需要对特定的进程进行监视或过滤，可输入快捷键ctrl+L，填写指定的进程名来进行结果过滤:<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687328139512-b6ed4a9d-a760-4bbc-a5f4-a3be7c76b2f5.png#averageHue=%23eeedeb&clientId=u27556ba3-c3aa-4&from=paste&height=543&id=ub409a8fd&originHeight=543&originWidth=782&originalType=binary&ratio=1&rotation=0&showTitle=false&size=363118&status=done&style=none&taskId=u43c86036-ffa4-497b-a91b-1b929153ed3&title=&width=782)
<a name="NDZuz"></a>
#### 进程信息收集
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687328318554-182e04d6-1378-419b-a8de-acb4dae954b2.png#averageHue=%23eeedeb&clientId=u27556ba3-c3aa-4&from=paste&height=543&id=u5125b8b6&originHeight=543&originWidth=782&originalType=binary&ratio=1&rotation=0&showTitle=false&size=363118&status=done&style=none&taskId=uc390f33e-47d5-4327-96a7-f1441e708e1&title=&width=782)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687328336591-9277d392-82a6-4e84-9a94-064fefee7888.png#averageHue=%23ebe8d5&clientId=u27556ba3-c3aa-4&from=paste&height=560&id=u3ee9364f&originHeight=560&originWidth=748&originalType=binary&ratio=1&rotation=0&showTitle=false&size=335723&status=done&style=none&taskId=u067eed64-16c4-4ac4-92d3-236ae8c8b75&title=&width=748)
<a name="sqHHZ"></a>
##### 网络行为收集
TcpView可动态展示当前的网络连接状况，但该工具有个不好的地方，就是没办法刷出UDP的流量
<a name="vffBf"></a>
#### 用户信息收集
开始菜单一运行一输入compmgmt. msc，选择“系统工具”-“本地用户和组”，即可查看<br />所有本地用户和组的信息(包括用户名以 `---
title: Windows应急响应
published: 2023-04-21
description: "Windows应急响应 笔记"
# image: "./cover.webp"
tags: ["网络安全","Hack The Box", "靶场"]
category: 网络安全
draft: false
---

<a name="awERC"></a>
### 应急响应概述
当企业发生黑客入侵、系统崩溃或其它影响业务正常运行的安全事件时，急需第一时间进行处理，使企业的网络信息系统在最短时间内恢复正常工作，进一步查找入侵来源，还原入侵事故过程，同时给出解决方案与防范措施，为企业挽回或减少经济损失。<br />常见的应急响应事件分类:<br />web入侵:网页挂马、主页篡改、Webshell<br />系统入侵:病毒木马、勒索软件、远控后门<br />网络攻击:DDOS攻击、DNS劫持、ARP欺骗

<a name="ZTA0j"></a>
### 基础信息获取
这部分基础信息获取都是使用Windows自身命令或者工具即可实现。这部分包括系统信息获取、网络信息获取、进程信息获取、用户信息获取、历史流量获取。
<a name="rgZd9"></a>
#### 系统信息获取
这里有两种方式，可以获取系统的相关信息。第一种，低版本操作系统，例如可以通过winmsd来获取相关信息，具体操作信息如下:<br />开始->运行->winmsd<br />点击软件环境->系统驱动程序，可查看当前加载的驱动程序<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687327177668-e9e30811-420f-45bb-bee8-65deb8af7c5f.png#averageHue=%23e6e5e4&clientId=u27556ba3-c3aa-4&from=paste&height=354&id=u09f00ce5&originHeight=354&originWidth=548&originalType=binary&ratio=1&rotation=0&showTitle=false&size=162995&status=done&style=none&taskId=u167bea2b-aff3-4170-b1e5-4a74d42b5f9&title=&width=548)<br />点击软件环境->正在运行任务，可查看当前运行的进程<br />点击软件环境->加载的模块，可查看程序加载的 dll 文件

但是这部分功能在高版本操作系统中，已经被移除了，例如 Windows Server 2008,所以下面介绍第二种方法。<br />第二种办法就是命令行输出，我们可以在 cmd命令行中输入 systeminfo，我们可以看到下图中标红框的地方有系统打过的补丁信息。这里我们可以了解到系统可能存在的一些漏洞信息。<br />但是很明显，这里和第一种的差别，就是没有列出加载的进程， dll文件，驱动等信息，但是这些信息可以通过其他工具去获取到，在 Windows server 2008以及windows7之后，Windows 引入了资源控制器。两种方式打开<br />1．运行->resmon<br />2.任务管理器->性能->资源监视器<br />这部分可根据相关exe搜索加载的dl等文件。
<a name="iS5Tv"></a>
#### 网络信息获取
Windows下的 cmd命令行输入 ipconfig，先确认当前网卡的 ip 地址分配情况。<br />然后可以进一步确认网络连接情况，通过 cmd命令行输入netstat - ano，获取网络进程连接的状态，检查是否存在可疑进程网络连接信息。
<a name="obqcf"></a>
##### netstat 的几种状态
CLOSED<br />初始（无连接）状态。-9-<br />LISTEN<br />侦听状态，等待远程机器的连接请求。<br />SYN_SEND<br />在TCP三次握手期间，主动连接端发送了SYN包后，进入SYN_SEND状态，等待对方的 ACK包。<br />SYN_RECV<br />在TCP三次握手期间，主动连接端收到SYN包后，进入SYN_RECV状态。<br />ESTABLISHED<br />完成TCP三次握手后，主动连接端进入ESTABLISHED状态。此时，TCP连接已经建立，可以进行通信。<br />FIN_WAIT_1<br />在TCP四次挥手时，主动关闭端发送FIN包后，进入FIN_WAIT_1状态。<br />FIN_WAIT_2<br />在TCP四次挥手时，主动关闭端收到ACK包后，进入FIN_WAIT_2状态。<br />TIME_WAIT<br />在TCP四次挥手时，主动关闭端发送了ACK包之后，进入TIME_WAIT状态，等待最多MSL 时间，让被动关闭端收到ACK包。<br />CLOSING<br />在TCP四次挥手期间，主动关闭端发送了FIN包后，没有收到对应的ACK包，却收到对方的 FIN 包，此时，进入CLOSING状态。<br />CLOSE_WAIT<br />在TCP四次挥手期间，被动关闭端收到FIN包后，进入CLOSE_WAIT状态。<br />LAST_ACK<br />在TCP 四次挥手时，被动关闭端发送 FIN包后，进入LAST_ACK状态，等待对方的ACK包。
<a name="JCXcS"></a>
##### 小总结
主连接端可能的状态有:CLOSED、 YN_SEND、ESTABLISHED<br />主动关闭端可能的状态有:FIN_WAIT_1、FIN_WAIT_2、TIME_WAIT。被动连接端可能的状态有:ISTEN、YN_RECV、ESTABLISHED。<br />被动关闭端可能的状态有:CLOSE_WAIT、AST_ACK 、 LOSED
<a name="x7XwR"></a>
#### 用户信息获取
Windows下的 cmd命令行输入net user，确认当前操作系统的用户信息，确认是否存在可疑账户。<br />当然可以继续下一步输入net user xx，确认该xx用于所属的 windows组信息。<br />Windows自带资源监视器，可以筛选当前进程的相关信息，这步主要在挖矿，或者被抓肉鸡向外 DOS攻击的情况下特别好用。<br />无法在Windows Server 2003上使用。
<a name="PmkyW"></a>
### 详细信息获取
<a name="CwFBF"></a>
#### 启动信息收集
这里涉及到一个工具，叫做Autoruns，由于大多数的恶意软件本身不存在相关描述信息，所以通过检查 Publisher 和 Description 两条项目可排除一些较简单的后门程序或恶意代码:<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687327888453-8b0f7c8d-d157-42b2-a9b6-90079d9d8e25.png#averageHue=%23d1d3c5&clientId=u27556ba3-c3aa-4&from=paste&height=535&id=u7f1fbd48&originHeight=535&originWidth=887&originalType=binary&ratio=1&rotation=0&showTitle=false&size=362823&status=done&style=none&taskId=u42e33666-2939-4158-8106-f1179207b6d&title=&width=887)<br />通过选择Options菜单中的 Hide Microsoft and Windows Entries可由 Autoruns自动筛选部分安全的启动项:<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687327917263-abde5d40-b4c3-4b43-9577-63c0aaad4b13.png#averageHue=%23dad5ca&clientId=u27556ba3-c3aa-4&from=paste&height=519&id=ua89d1ac9&originHeight=519&originWidth=1177&originalType=binary&ratio=1&rotation=0&showTitle=false&size=430213&status=done&style=none&taskId=u2c9625b3-1996-47f4-98ba-abe4629b5f9&title=&width=1177)
<a name="n3uR0"></a>
#### 行为信息收集
在一些病毒中，常常会寻求访问一些敏感文件、注册表，创建模块等一些异常行为，所以我们可以通过上辅助监控软件，来检查恶意程序的行为。<br />Procmon会实时展现进程对文件的行为以及结果，如下图所示:<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687328113291-15431018-3cd7-4818-9009-1c9acb8ff1a1.png#averageHue=%23e9e7e4&clientId=u27556ba3-c3aa-4&from=paste&height=515&id=u97993a23&originHeight=515&originWidth=665&originalType=binary&ratio=1&rotation=0&showTitle=false&size=393169&status=done&style=none&taskId=u2c2509af-2571-4504-8e80-ae9bc7c6af8&title=&width=665)

该工具会清楚展示，该进程对某些文件做了什么操作，如果需要对特定的进程进行监视或过滤，可输入快捷键ctrl+L，填写指定的进程名来进行结果过滤:<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687328139512-b6ed4a9d-a760-4bbc-a5f4-a3be7c76b2f5.png#averageHue=%23eeedeb&clientId=u27556ba3-c3aa-4&from=paste&height=543&id=ub409a8fd&originHeight=543&originWidth=782&originalType=binary&ratio=1&rotation=0&showTitle=false&size=363118&status=done&style=none&taskId=u43c86036-ffa4-497b-a91b-1b929153ed3&title=&width=782)
<a name="NDZuz"></a>
#### 进程信息收集
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687328318554-182e04d6-1378-419b-a8de-acb4dae954b2.png#averageHue=%23eeedeb&clientId=u27556ba3-c3aa-4&from=paste&height=543&id=u5125b8b6&originHeight=543&originWidth=782&originalType=binary&ratio=1&rotation=0&showTitle=false&size=363118&status=done&style=none&taskId=uc390f33e-47d5-4327-96a7-f1441e708e1&title=&width=782)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687328336591-9277d392-82a6-4e84-9a94-064fefee7888.png#averageHue=%23ebe8d5&clientId=u27556ba3-c3aa-4&from=paste&height=560&id=u3ee9364f&originHeight=560&originWidth=748&originalType=binary&ratio=1&rotation=0&showTitle=false&size=335723&status=done&style=none&taskId=u067eed64-16c4-4ac4-92d3-236ae8c8b75&title=&width=748)
<a name="sqHHZ"></a>
##### 网络行为收集
TcpView可动态展示当前的网络连接状况，但该工具有个不好的地方，就是没办法刷出UDP的流量
<a name="vffBf"></a>
#### 用户信息收集
开始菜单一运行一输入compmgmt. msc，选择“系统工具”-“本地用户和组”，即可查看<br /> 结尾的隐藏用户，如: `admin---
title: Windows应急响应
published: 2023-04-21
description: "Windows应急响应 笔记"
# image: "./cover.webp"
tags: ["网络安全","Hack The Box", "靶场"]
category: 网络安全
draft: false
---

<a name="awERC"></a>
### 应急响应概述
当企业发生黑客入侵、系统崩溃或其它影响业务正常运行的安全事件时，急需第一时间进行处理，使企业的网络信息系统在最短时间内恢复正常工作，进一步查找入侵来源，还原入侵事故过程，同时给出解决方案与防范措施，为企业挽回或减少经济损失。<br />常见的应急响应事件分类:<br />web入侵:网页挂马、主页篡改、Webshell<br />系统入侵:病毒木马、勒索软件、远控后门<br />网络攻击:DDOS攻击、DNS劫持、ARP欺骗

<a name="ZTA0j"></a>
### 基础信息获取
这部分基础信息获取都是使用Windows自身命令或者工具即可实现。这部分包括系统信息获取、网络信息获取、进程信息获取、用户信息获取、历史流量获取。
<a name="rgZd9"></a>
#### 系统信息获取
这里有两种方式，可以获取系统的相关信息。第一种，低版本操作系统，例如可以通过winmsd来获取相关信息，具体操作信息如下:<br />开始->运行->winmsd<br />点击软件环境->系统驱动程序，可查看当前加载的驱动程序<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687327177668-e9e30811-420f-45bb-bee8-65deb8af7c5f.png#averageHue=%23e6e5e4&clientId=u27556ba3-c3aa-4&from=paste&height=354&id=u09f00ce5&originHeight=354&originWidth=548&originalType=binary&ratio=1&rotation=0&showTitle=false&size=162995&status=done&style=none&taskId=u167bea2b-aff3-4170-b1e5-4a74d42b5f9&title=&width=548)<br />点击软件环境->正在运行任务，可查看当前运行的进程<br />点击软件环境->加载的模块，可查看程序加载的 dll 文件

但是这部分功能在高版本操作系统中，已经被移除了，例如 Windows Server 2008,所以下面介绍第二种方法。<br />第二种办法就是命令行输出，我们可以在 cmd命令行中输入 systeminfo，我们可以看到下图中标红框的地方有系统打过的补丁信息。这里我们可以了解到系统可能存在的一些漏洞信息。<br />但是很明显，这里和第一种的差别，就是没有列出加载的进程， dll文件，驱动等信息，但是这些信息可以通过其他工具去获取到，在 Windows server 2008以及windows7之后，Windows 引入了资源控制器。两种方式打开<br />1．运行->resmon<br />2.任务管理器->性能->资源监视器<br />这部分可根据相关exe搜索加载的dl等文件。
<a name="iS5Tv"></a>
#### 网络信息获取
Windows下的 cmd命令行输入 ipconfig，先确认当前网卡的 ip 地址分配情况。<br />然后可以进一步确认网络连接情况，通过 cmd命令行输入netstat - ano，获取网络进程连接的状态，检查是否存在可疑进程网络连接信息。
<a name="obqcf"></a>
##### netstat 的几种状态
CLOSED<br />初始（无连接）状态。-9-<br />LISTEN<br />侦听状态，等待远程机器的连接请求。<br />SYN_SEND<br />在TCP三次握手期间，主动连接端发送了SYN包后，进入SYN_SEND状态，等待对方的 ACK包。<br />SYN_RECV<br />在TCP三次握手期间，主动连接端收到SYN包后，进入SYN_RECV状态。<br />ESTABLISHED<br />完成TCP三次握手后，主动连接端进入ESTABLISHED状态。此时，TCP连接已经建立，可以进行通信。<br />FIN_WAIT_1<br />在TCP四次挥手时，主动关闭端发送FIN包后，进入FIN_WAIT_1状态。<br />FIN_WAIT_2<br />在TCP四次挥手时，主动关闭端收到ACK包后，进入FIN_WAIT_2状态。<br />TIME_WAIT<br />在TCP四次挥手时，主动关闭端发送了ACK包之后，进入TIME_WAIT状态，等待最多MSL 时间，让被动关闭端收到ACK包。<br />CLOSING<br />在TCP四次挥手期间，主动关闭端发送了FIN包后，没有收到对应的ACK包，却收到对方的 FIN 包，此时，进入CLOSING状态。<br />CLOSE_WAIT<br />在TCP四次挥手期间，被动关闭端收到FIN包后，进入CLOSE_WAIT状态。<br />LAST_ACK<br />在TCP 四次挥手时，被动关闭端发送 FIN包后，进入LAST_ACK状态，等待对方的ACK包。
<a name="JCXcS"></a>
##### 小总结
主连接端可能的状态有:CLOSED、 YN_SEND、ESTABLISHED<br />主动关闭端可能的状态有:FIN_WAIT_1、FIN_WAIT_2、TIME_WAIT。被动连接端可能的状态有:ISTEN、YN_RECV、ESTABLISHED。<br />被动关闭端可能的状态有:CLOSE_WAIT、AST_ACK 、 LOSED
<a name="x7XwR"></a>
#### 用户信息获取
Windows下的 cmd命令行输入net user，确认当前操作系统的用户信息，确认是否存在可疑账户。<br />当然可以继续下一步输入net user xx，确认该xx用于所属的 windows组信息。<br />Windows自带资源监视器，可以筛选当前进程的相关信息，这步主要在挖矿，或者被抓肉鸡向外 DOS攻击的情况下特别好用。<br />无法在Windows Server 2003上使用。
<a name="PmkyW"></a>
### 详细信息获取
<a name="CwFBF"></a>
#### 启动信息收集
这里涉及到一个工具，叫做Autoruns，由于大多数的恶意软件本身不存在相关描述信息，所以通过检查 Publisher 和 Description 两条项目可排除一些较简单的后门程序或恶意代码:<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687327888453-8b0f7c8d-d157-42b2-a9b6-90079d9d8e25.png#averageHue=%23d1d3c5&clientId=u27556ba3-c3aa-4&from=paste&height=535&id=u7f1fbd48&originHeight=535&originWidth=887&originalType=binary&ratio=1&rotation=0&showTitle=false&size=362823&status=done&style=none&taskId=u42e33666-2939-4158-8106-f1179207b6d&title=&width=887)<br />通过选择Options菜单中的 Hide Microsoft and Windows Entries可由 Autoruns自动筛选部分安全的启动项:<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687327917263-abde5d40-b4c3-4b43-9577-63c0aaad4b13.png#averageHue=%23dad5ca&clientId=u27556ba3-c3aa-4&from=paste&height=519&id=ua89d1ac9&originHeight=519&originWidth=1177&originalType=binary&ratio=1&rotation=0&showTitle=false&size=430213&status=done&style=none&taskId=u2c9625b3-1996-47f4-98ba-abe4629b5f9&title=&width=1177)
<a name="n3uR0"></a>
#### 行为信息收集
在一些病毒中，常常会寻求访问一些敏感文件、注册表，创建模块等一些异常行为，所以我们可以通过上辅助监控软件，来检查恶意程序的行为。<br />Procmon会实时展现进程对文件的行为以及结果，如下图所示:<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687328113291-15431018-3cd7-4818-9009-1c9acb8ff1a1.png#averageHue=%23e9e7e4&clientId=u27556ba3-c3aa-4&from=paste&height=515&id=u97993a23&originHeight=515&originWidth=665&originalType=binary&ratio=1&rotation=0&showTitle=false&size=393169&status=done&style=none&taskId=u2c2509af-2571-4504-8e80-ae9bc7c6af8&title=&width=665)

该工具会清楚展示，该进程对某些文件做了什么操作，如果需要对特定的进程进行监视或过滤，可输入快捷键ctrl+L，填写指定的进程名来进行结果过滤:<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687328139512-b6ed4a9d-a760-4bbc-a5f4-a3be7c76b2f5.png#averageHue=%23eeedeb&clientId=u27556ba3-c3aa-4&from=paste&height=543&id=ub409a8fd&originHeight=543&originWidth=782&originalType=binary&ratio=1&rotation=0&showTitle=false&size=363118&status=done&style=none&taskId=u43c86036-ffa4-497b-a91b-1b929153ed3&title=&width=782)
<a name="NDZuz"></a>
#### 进程信息收集
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687328318554-182e04d6-1378-419b-a8de-acb4dae954b2.png#averageHue=%23eeedeb&clientId=u27556ba3-c3aa-4&from=paste&height=543&id=u5125b8b6&originHeight=543&originWidth=782&originalType=binary&ratio=1&rotation=0&showTitle=false&size=363118&status=done&style=none&taskId=uc390f33e-47d5-4327-96a7-f1441e708e1&title=&width=782)<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687328336591-9277d392-82a6-4e84-9a94-064fefee7888.png#averageHue=%23ebe8d5&clientId=u27556ba3-c3aa-4&from=paste&height=560&id=u3ee9364f&originHeight=560&originWidth=748&originalType=binary&ratio=1&rotation=0&showTitle=false&size=335723&status=done&style=none&taskId=u067eed64-16c4-4ac4-92d3-236ae8c8b75&title=&width=748)
<a name="sqHHZ"></a>
##### 网络行为收集
TcpView可动态展示当前的网络连接状况，但该工具有个不好的地方，就是没办法刷出UDP的流量
<a name="vffBf"></a>
#### 用户信息收集
开始菜单一运行一输入compmgmt. msc，选择“系统工具”-“本地用户和组”，即可查看<br />)<br />或者使用LP_Check检查影子账户。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687328478651-b584166f-e51b-456e-b912-ef802dede4d4.png#averageHue=%23d7d3ce&clientId=u27556ba3-c3aa-4&from=paste&height=718&id=uac7d399b&originHeight=718&originWidth=595&originalType=binary&ratio=1&rotation=0&showTitle=false&size=193226&status=done&style=none&taskId=u27b4a83e-f9cc-475b-b702-31ff831fe77&title=&width=595)<br />一般情况下，若创建了系统帐号并使用该帐号进行了操作的话，那么，即使使用计算机管理或net命令删除该帐号，系统中仍会残留部分帐号信息，这些信息可用于分析帐号的相关行为。<br />若用户帐号仅是通过net命令或用户管理程序删除的，那么，系统中会仍残留有该用户的目录，目录中的一些文件会记录用户的某些特定行为，便于追查，这些文件是:<br />(以系统安装在C盘、恶意用户名为cracker为例)<br />C: \Documents and Settings \cracker\桌面<br />用户的桌面，可能放有一些临时文件或下载的文件<br />C: \Documents and Settings \cracker \Cookies<br />用户的网络访问情况，cookie文件中可能会记录一些敏感信息<br />C: \Documents and Settings \cracker \Recent<br />用户最近访问过哪些文件或文件夹<br />C: \Documents and Settings \cracker\Local Settings \History<br />用户上网的历史记录<br />C : \Documents and Settings\cracker \Local Settings \Temp<br />一些程序安装、解压缩等操作可能会在该目录产生临时文件<br />C: \Documents and Settings \cracker\Local Settings \Temporary<br />Internet Files<br />上网时产生的临时文件，不但会存储网页页面内容，还可能以临时文件的方式存储一些下载的文件。<br />若用户本身启用了安全日志审计，如果账号被删除，但是在审计日志中有关该账号的操作会留下一串帐号的SID值。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687328602881-7c5b5426-a8c3-400b-9cba-d06f908b13e0.png#averageHue=%23ebeae9&clientId=u27556ba3-c3aa-4&from=paste&height=538&id=u7401895f&originHeight=538&originWidth=797&originalType=binary&ratio=1&rotation=0&showTitle=false&size=187887&status=done&style=none&taskId=ue9e5c6a5-8beb-4adb-81ee-ba53faf4b96&title=&width=797)

<a name="Q1SfP"></a>
### Windows日志分析
Windows日志文件三大块，分别是:<br />应用程序日志<br />安全日志系统日志<br />setup日志 (server 2003之后加入)<br />这些日志以在 server 2003以前，包括server 2003 以evt 文件形式存储在%systemroot%\system32\config目录下（%SystemRoot%为系统环境变量，默认值为C: \WINDOWS)。但是在server 2003以后存储的位置是在<br />%systemroot%\System32\winevt\Logs目录下<br />点击“开始→设置→控制面板→管理工具→事件查看器”，在事件查看器窗口左栏中列出本机包含的日志类型，如应用程序、安全、系统等。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687328694250-0a43711c-5c03-4381-a0d9-88fa9f7d3f9b.png#averageHue=%23c6b091&clientId=u27556ba3-c3aa-4&from=paste&height=664&id=ue06fe670&originHeight=664&originWidth=790&originalType=binary&ratio=1&rotation=0&showTitle=false&size=283862&status=done&style=none&taskId=u26496fff-7786-48dd-ada9-504f5a570f1&title=&width=790)<br />注意事项:<br />系统内置的三个核心日志文件<br />(System，Security 和 Application）默认大小均为2048OKB (20MB），记录事件数据超过20MB时，默认系统将优先覆盖过期的日志记录。<br />其它应用程序及服务日志默认最大为1024KB，超过最大限制也优先覆盖过期的日志记录。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687328921951-e939abbe-fd56-440f-9d9a-8157b1828d20.png#averageHue=%23f9f8f7&clientId=u27556ba3-c3aa-4&from=paste&height=664&id=ue5d6eb7d&originHeight=664&originWidth=833&originalType=binary&ratio=1&rotation=0&showTitle=false&size=191363&status=done&style=none&taskId=u55668ade-54da-4c40-8d4b-b5df547aacb&title=&width=833)<br />Windows事件日志中共有五种事件类型，所有的事件必须拥有五种事件类型中的一种，且只可以有一种。五种事件类型分为:<br />1.信息(Information)<br />信息事件指应用程序、驱动程序或服务的成功操作的事件。<br />2．警告(Warning）<br />警告事件指不是直接的、主要的，但是会导致将来问题发生的问题。例如，当磁盘空间不足或未找到打印机时，都会记录一个“警告”事件。<br />3．错误(Error)<br />错误事件指用户应该知道的重要的问题。错误事件通常指功能和数据的丢失。例如,如果一个服务不能作为系统引导被加载，那么它会产生一个错误事件。<br />4．成功审核(Success audit)<br />成功的审核安全访问尝试，主要是指安全性日志，这里记录着用户登录/注销、对象访问、特权使用、账户管理、策略更改、详细跟踪、目录服务访问、账户登录等事件，例如所有的成功登录系统都会被记录为“成功审核”事件。<br />5.失败审核(Failure audit)<br />失败的审核安全登录尝试，例如用户试图访问网络驱动器失败，则该尝试会被作为失败审核事件记录下来。
<a name="p2usW"></a>
##### 应用程序日志
应用程序日志包含操作系统安装的应用程序软件相关的事件。事件包括了错误、警告及任何应用程序需要报告的信息，应用程序开发人员可以决定记录哪些信息。然后开发人员可以利用这些日志可判断哪些程序运行错误以及错误内容:<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687329007595-5df6e539-4632-47e4-a506-8d8cadf7a7c9.png#averageHue=%23f2f2f1&clientId=u27556ba3-c3aa-4&from=paste&height=520&id=u33c16d06&originHeight=520&originWidth=804&originalType=binary&ratio=1&rotation=0&showTitle=false&size=157340&status=done&style=none&taskId=u0f254f0c-d88b-4e47-a407-0ecb2348296&title=&width=804)

如使用MSI包安装软件时，若MSI 错误，则会引发 MsiInstaller 的应用程序日志:<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687329030483-41ab0c0d-8234-48a2-9377-d37fb30017be.png#averageHue=%23c7c2bc&clientId=u27556ba3-c3aa-4&from=paste&height=596&id=uade18645&originHeight=596&originWidth=855&originalType=binary&ratio=1&rotation=0&showTitle=false&size=358190&status=done&style=none&taskId=u59c2d3ca-a2d8-4c9e-a968-965fd0e7280&title=&width=855)
<a name="FL9er"></a>
##### 安全日志
安全日志包含安全性相关的事件，如用户权限变更，登录及注销，文件及文件夹访问，打印等信息，下图为相关事件对照表。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687329061674-85868871-80c1-48a3-8a30-eb38e1e6422e.png#averageHue=%23f2f2f1&clientId=u27556ba3-c3aa-4&from=paste&height=409&id=u8c846328&originHeight=409&originWidth=1501&originalType=binary&ratio=1&rotation=0&showTitle=false&size=157050&status=done&style=none&taskId=u4dd6b6b0-12e2-40e2-b122-da7dd8975a2&title=&width=1501)

![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687329070201-6b64cf16-b329-4658-b53a-c1569cb320b9.png#averageHue=%23f3f2f2&clientId=u27556ba3-c3aa-4&from=paste&height=560&id=u0299906a&originHeight=560&originWidth=821&originalType=binary&ratio=1&rotation=0&showTitle=false&size=124036&status=done&style=none&taskId=u4eeb9d6a-a0dd-46a8-862d-1aa3244de03&title=&width=821)

从日志中可以看到登陆的详细信息:登陆时间、用户、源网络地址等。如果出现大规模的登陆失败，且登录类型为3的登录尝试，则很可能意味着有用户在远程尝试口令破解，应特别小心。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687329570697-ee7c322e-fe1f-45cb-aae0-6f3b07ba8373.png#averageHue=%23c6c3bd&clientId=u27556ba3-c3aa-4&from=paste&height=527&id=u335aca76&originHeight=527&originWidth=619&originalType=binary&ratio=1&rotation=0&showTitle=false&size=190980&status=done&style=none&taskId=u72e9e88b-a8a3-45ff-ab7b-3618a3fae73&title=&width=619)<br />另外Windows默认情况下没有额外的系统启动日志或相关记录程序，因此，需依靠一些服务来判断系统的系统，而其中 event log 服务是最好的参考标志,event log 服务的启动和停止就意味着Windows系统的启动和停止。<br />系统日志包含系统进程，设备磁盘活动等。事件记录了设备驱动无法正常启动或停止，硬件失败，重复IP地址，系统进程的启动，停止及暂停等行为。<br />若系统中突然出现大量IP地址冲突的日志，则可判断网络中存在 ARP 欺骗攻击。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687329651856-b6fe07e9-e728-4e5f-bdb2-816961d8d15d.png#averageHue=%23c3bfb8&clientId=u27556ba3-c3aa-4&from=paste&height=478&id=u4deaf3e3&originHeight=478&originWidth=826&originalType=binary&ratio=1&rotation=0&showTitle=false&size=153432&status=done&style=none&taskId=uc8a4f52c-ddaa-4956-8e74-93bc2dfc68b&title=&width=826)
<a name="axXhs"></a>
##### 系统日志
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687329662558-7112f55e-fcde-41fe-90cf-d2d86e4ea8a6.png#averageHue=%23f0efef&clientId=u27556ba3-c3aa-4&from=paste&height=663&id=u80c43f22&originHeight=663&originWidth=1079&originalType=binary&ratio=1&rotation=0&showTitle=false&size=291061&status=done&style=none&taskId=u18db5100-0944-4a51-9e5f-33b3338676c&title=&width=1079)
<a name="NHQFW"></a>
##### setup日志
该日志记录一些补丁安装日志。部分恶意用户利用漏洞入侵后，很可能会使用Windows Update对系统进行补丁安装。<br />以防止其他用户入侵，这样，在系统中就会残留有相关的日志:<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687329804165-84b2f05a-e468-4f19-b5bc-6f3fe9af0551.png#averageHue=%23f0edec&clientId=u27556ba3-c3aa-4&from=paste&height=609&id=uf01a45fd&originHeight=609&originWidth=827&originalType=binary&ratio=1&rotation=0&showTitle=false&size=194478&status=done&style=none&taskId=u10778c50-ac54-4fc4-95d6-cf1c8380c7c&title=&width=827)

<a name="qL32t"></a>
### 常用工具
<a name="PvYZY"></a>
##### 火绒剑
火绒剑还是很好用的，之前的内容里面提及到的一些要点，该工具基本涵盖了，以下列举一些简单的功能:<br />1.系统进程监控<br />2.启动项<br />3.网络监控
<a name="mpl9I"></a>
##### PcHunter
Pchunter和火绒剑差不多，但是UI就差很多了:<br />该工具特点，疑似异常的东西会给你标记为红色，而且该工具针对内核钩子，和应用层钩子这类型的东西，支持比较好，属于是各有长处。
<a name="ITGFq"></a>
##### PowerTool
有些病毒可能会检查火绒剑和PC hunter，所以这里推荐一个 powertool，该工具是从内核开始检查，功能与火绒剑、PC hunter差不多。<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687330068467-2bcfd5bf-28fe-402f-aa21-cced0cabf36c.png#averageHue=%23c5eaca&clientId=u27556ba3-c3aa-4&from=paste&height=460&id=uf886334c&originHeight=460&originWidth=895&originalType=binary&ratio=1&rotation=0&showTitle=false&size=197483&status=done&style=none&taskId=u8c87ea0e-24ef-4ada-8c85-2c3a4b7b406&title=&width=895)

<a name="gMw6m"></a>
##### 病毒分析
PCHunter: [http://www.xuetr.com](http://www.xuetr.com)<br />火绒剑:[https://www.huorong.cn](https://www.huorong.cn)<br />Process Explorer: https://docs.microsoft.com/zh-cn/sysinternals/downloads/process-explorer<br />processhacker: [https://processhacker.sourceforge.io/downloads.php](https://processhacker.sourceforge.io/downloads.php)<br />autoruns: [https://docs.microsoft.com/en-us/sysinternals/downloadslautoruns](https://docs.microsoft.com/en-us/sysinternals/downloadslautorunsOTL:)(失效链接)<br />[https://learn.microsoft.com/en-us/sysinternals/downloads/autoruns](https://learn.microsoft.com/en-us/sysinternals/downloads/autoruns)<br />OTL： [https://www.bleepingcomputer.com/download/otl/](https://www.bleepingcomputer.com/download/otl/) (失效链接)<br />卡巴斯基: http://devbuilds.kaspersky-labs.com/devbuilds/KVRT/latest/fullKVRT.exe<br />(推荐理由:绿色版、最新病毒库)<br />大蜘蛛: http:llfree.drweb.ru/download+cureit+free<br />(推荐理由:扫描快、一次下载只能用1周，更新病毒库)<br />火绒安全软件: [https://www.huorong.cn](https://www.huorong.cn)<br />360杀毒: http://sd.360.cn/download_center.html
<a name="CPZ7b"></a>
##### 病毒动态
CVERC-国家计算机病毒应急处理中心: [http://www.cverc.org.cn](http://www.cverc.org.cn)<br />微步在线威胁情报社区: https:llx.threatbook.cn<br />火绒安全论坛: [http://bbs.huorong.cn/forum-59-1.html](http://bbs.huorong.cn/forum-59-1.html)<br />爱毒霸社区: [http://bbs.duba.net](http://bbs.duba.net)
<a name="qMnBr"></a>
##### webshell查杀
D盾_Web查杀: [http://www.d99net.net/index.asp](http://www.d99net.net/index.asp)<br />河马webshell查杀: [http://www.shellpub.com](http://www.shellpub.com)<br />深信服Webshell网站后门检测工具: http://edr.sangfor.com.cn/backdoor_detection.html<br />Safe3: [http://www.uusec.com/webshell.zip](http://www.uusec.com/webshell.zip)(失效链接)<br />[https://sourceforge.net/projects/safe3wvs/](https://sourceforge.net/projects/safe3wvs/)