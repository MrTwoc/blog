---
title: Linux应急响应
published: 2023-04-09
description: "Linux应急响应 笔记"
# image: "./cover.webp"
tags: ["网络安全","护网", "靶场"]
category: 网络安全
draft: false
---

<a name="RxJGz"></a>
### 应急响应概述
当企业发生黑客入侵、系统崩溃或其它影响业务正常运行的安全事件时，急需第一时间进行处理，使企业的网络信息系统在最短时间内恢复正常工作，进一步查找入侵来源，还原入侵事故过程，同时给出解决方案与防范措施，为企业挽回或减少经济损失。<br />常见的应急响应事件分类:<br />web入侵:网页挂马、主页篡改、Webshell<br />系统入侵:病毒木马、勒索软件、远控后门<br />网络攻击:DDOS攻击、DNS劫持、ARP欺骗。
<a name="qvJ2G"></a>
### 基础信息获取
这部分基础信息获取都是使用linux自身命令或者工具即可实现。这部分包括系统信息获取、网络信息获取、进程信息获取、用户信息获取、服务信息获取、文件信息获取、文件权限信息获取、SUID信息获取、当前用户登录信息获取、系统命令信息获取。

<a name="PRjKE"></a>
#### 系统信息获取
uname -a 	获得当前系统内核版本<br />ifconfig		获取相关网络信息<br />netstat -napt	查看当前端口开放情况<br />lsof -i		显示进程和端口的对应关系(Linux)<br />netstat -an |[grep](https://so.csdn.net/so/search?q=grep&spm=1001.2101.3001.7020) tcp	查看所有tcp链接包括Listen状态<br />netstat -an |[grep](https://so.csdn.net/so/search?q=grep&spm=1001.2101.3001.7020) syn	查看所有tcp链接包括Listen状态<br />top -c		快速查看进程命令<br />ps -aux 		查看进程的关联<br />a：显示终端机下的所有程序，包括其他用户的程序<br />u：以用户为主的格式来显示程序状况。<br />x：显示所有程序，不以终端机来区分<br />pstree		直观展现子进程与父进程之间的关系<br />cat /proc/进程id/maps		可查看该进程下关联的一些相关文件如so 等<br />lsof -p 21269(PID)			查看进程占用信息
<a name="CTdrY"></a>
#### 用户信息获取
cat /etc/passwd 			检查是否存在异常用户<br />`awk -F : '$3==0{print}' /etc/passwd`		查看uid为0的用户<br />`more /etc/sudoers | grep -v "^#\|^$" | grep "ALL=(ALL)"`	查看拥有sudo权限的账号<br />`awk '/\$1|\$6/{print $1}' /etc/shadow`		查看可以远程登录的账号信息<br />通过命令行在root 权限下检查 home文件夹下东西，一般新建用户会在 home文件夹下创建一个与用户名相同的文件夹名字。
<a name="afdqo"></a>
#### 服务信息获取
Linux系统下各服务的启动脚本存放在/etc/init.d/和/etc/xinetd.d目录，可以检查一下这些目录下的脚本是否存在异常。<br />另外还需要检查一下定时任务，crontab -1可检测当前用户的定时任务，crontab-u用户名-1 可检查对应用户名的定时任务。
<a name="yGj7g"></a>
#### 文件信息获取
根据文件名特征查找文件：grep -rni "www" *<br />按文件大小查找：find / -size 114k(文件大小)<br />按创建时间查找：find ./ -mtime 0 #查找一天内修改的文件

简单介绍一下参数:<br />-ctime -n		查找距现在n*24H内修改过的文件<br />-ctime n		查找距现在 n*24H前， (n+1)*24H内修改过的文件<br />-ctime +n	查找距现在 (n+1)*24H前修改过的文件<br />[alclm]min [最后访问|最后状态修改|最后内容修改]min<br />[alc|m]time [最后访问|最后状态修改|最后内容修改]time

简单介绍一下参数:<br />Linux文件的几种时间(以find为例):<br />atime最后一次访问时间，如 ls， more 等，但chmod,chown，ls，stat等不会修改些时间，使用ls -utl可以按此时间顺序查看;<br />ctime最后一次状态修改时间，如 chmod,chown等状态时间改变但修改时间不会改变,使用stat file 可以查看;<br />mtime最后一次内容修改时间，如 vi保存后等，修改时间发生改变的话, atime和ctime 也相应跟着发生改变.
<a name="vxiFB"></a>
#### 文件权限信息获取
/etc/passwd 默认权限为644，其最小权限为444，首先应对该文件权限进行检查，以确认配置是否正确:<br />ls -l /etc/passwd<br />shadow 默认权限为600，最小权限为400，检查权限配置是否正确:<br />ls -l /etc/shadow

<a name="XPP46"></a>
#### 当前用户登录信息获取
![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687234018319-0b39e3dc-1f4d-43f8-a651-822d0e03f573.png#averageHue=%23939393&clientId=u9c12183c-2f73-4&from=paste&height=219&id=u29b6e0c5&originHeight=219&originWidth=1009&originalType=binary&ratio=1&rotation=0&showTitle=false&size=66910&status=done&style=none&taskId=ue6f3be99-a197-47bc-a65a-cf529cc7c54&title=&width=1009)<br />简单普及一下这几个字段的意思:<br />1.USER字段显示当前登录系统的用户名<br />2.TTY字段显示分配给用户会话的终端。ttyX表示在控制台登录，pts/X和ttypX表示网络连接<br />3.FROM字段显示远程登录主机的IP地址<br />4. LOGIN@字段显示登录用户的本地起始时间<br />5. IDLE字段显示最近一个进程运行开始算起的时间长度<br />6. JCPU字段显示在该控制台或网络连接的全部进程所用的时间<br />7. PCPU字段显示WHAT栏中当前进程所使用的处理器时间<br />8. WHAT 字段显示用户正在运行的进程
<a name="t79ke"></a>
#### 系统命令信息获取
有些情况下系统命令是否正确。病毒木马可能会伪装成系统命令，因此这里需要确认一下原先的<br />ls -alt /usr/bin/ | head -n 10<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687234202907-b9bf5707-8cb2-43af-9cd1-1e4846574889.png#averageHue=%231a1a1a&clientId=u9c12183c-2f73-4&from=paste&height=225&id=u0d008cad&originHeight=225&originWidth=956&originalType=binary&ratio=1&rotation=0&showTitle=false&size=134852&status=done&style=none&taskId=u657570c2-cbdf-4e37-a3f7-f04d246a503&title=&width=956)<br />通过. bash_history查看帐号执行过的系统命令<br />1、root的历史命令<br />history<br />2、打开/home各帐号目录下的.bash_history，查看普通帐号的历史命令为历史的命令增加登录的IP地址、执行命令时间等信息:<br />1）保存1万条命令<br />sed -i 's/^HISTSIZE=1000/HISTSIZE=10000/g' /etc/profile

<a name="RH6WH"></a>
### Linux日志分析
重要文件<br />/var/log/wtmp<br />/var/log/utmp<br />/var/log/lastlog——日志子系统的关键文件，记录了用户登录的情况，都包含时间戳<br />/var/run/wtmp	永久记录了每个用户登录、注销、及系统启动<br />var/run/utmp		记录有关当前登录的每个用户信息。会随着用户登录和注销系统而变化<br />var/log/lastlog	记录最近成功登录的事件和最后一次不成功的登录事件由log生成，为二进制文件，需要用lastlog命令查看。如果某用户从来没有登录过，就显示为”。**Neverloggedin**”系统账户诸如 bin、 daemon、adm、uucp、 mail 等决不应该登录，如果发现这些账户已经登录，就说明系统可能已经被入侵了。

以下是一些常用的日志messages日志<br />RedHat 的 messages日志位置为/var/log/messages， messages中记录有运行信息和认证信息，对于追查恶意用户的登录行为有很大帮助，例如，下面即为一条su日志:<br />Mar 22 11:11:34 abc PAM_pwdb[999]:authentication failure;cross(uid=500)->root for su service<br />cron日志<br />RedHat 的 cron日志默认记录在/var/log/cron中，主要用来记录 crontab 的日志记录。<br />secure日志<br />Linux的 ssh 登录日志会存储于/var/log/secure中，若日志中出现连续大量的登录错误信息，则可能意味着远程主机在尝试破解ssh登录口令<br />Last日志<br />last命令用于查看最近的用户登录情况， last命令读取 wtmp 内容。在 Linux还中还存在lastlog命令，用于查看系统内所有帐户最后一次登录信息，该命令读取/var/log/lastlog内容。<br />shell 日志<br />Bash日志存储于用户目录的.bash_history文件中，有些攻击者 SSH登陆进来之后可能会执行命令，所以该日志可能会记录下执行的命令。该日志存储条目数量与shell变量 `$HISTSIZE`

常用工具<br />chkrookit:<br />chkrootkit是一款用于UNIX/Linux的本地rootkit检查工具。<br />chkrootkit官方站点:http: / /www.chkrootkit.org/<br />一般操作指南:<br />编译:<br />tar xvzf chkrootkit.tar. gz<br />cd chkrootkit一xx<br />make sense<br />检测rootkit:	./chkrootkit - q<br />若使用Live CD启动主机，将原主机硬盘（被入侵）挂接在/mnt下，我们可以使用-r参数指定被入侵主机的根目录，进行离线检查，chkrootkit最终仅输出可疑的项目:<br />./chkrootkit -q -r /mnt

rkhunter :<br />Rootkit Hunter结果比 chkrootkit 更为详细和精准，若有条件，建议使用Rootkit Hunter对系统进行二次复查。<br />Rootkit Hunter下载访问: http:// sourceforge.net/projects/rkhunter/<br />一般操作指南:<br />安装 Rootkit Hunter:<br />tar xvzf rkhunter-xx.tar. gz<br />cd rkhunter-xx<br />./install.sh --layout default --install<br />(若自定义安装路径，需执行:./install --layout custom /custom_path --install)<br />使用 Rootkit Hunter: rkhunter - check（若自定义安装目录，需写全路径）

lynis :<br />这里我比较推荐这个，上面两个已经没有维护了，而且该工具除了可以检查rootkit，还可以审计一些Linux的安全基线方面的东西。建议在 root下运行，效果会很好。<br />项目地址: [https://github.com/CISofy/lynis](https://github.com/CISofy/lynis)<br />一般操作指南:<br />cd lynis<br />./lynis audit system<br />![image.png](https://cdn.nlark.com/yuque/0/2023/png/1295434/1687235644091-a98663d0-10f2-4d0f-9e76-8ec2b28addf7.png#averageHue=%231d1c1f&clientId=u9c12183c-2f73-4&from=paste&height=282&id=u65c41e87&originHeight=282&originWidth=680&originalType=binary&ratio=1&rotation=0&showTitle=false&size=248876&status=done&style=none&taskId=uae1689de-0db6-4318-a907-d0b807d0d79&title=&width=680)