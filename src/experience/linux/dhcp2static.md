# 如何将物理服务器动态IP转为静态IP
自己的服务器在家里，每次开机都会分配一个新的IP，这样就很不方便，所以想将动态IP转为静态IP，这样就可以通过固定IP来访问了。

## 先确定网卡名称

```bash
ifconfig
```
如果命令不可用可以使用命令```ip addr```如果还不行就先安装包
```bash
yum install -y net-tools
```
![ifconfig](https://cdn.jsdelivr.net/gh/0xAiKang/CDN/blog/images/2021/20210909162200.png)

根据你上方的命令查看网卡名称，
```bash
cat /etc/sysconfig/network-scripts/ifcfg-em1
```
现在我的动态IP是192.168.50.238，所以我是em1
```bash
em1: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.50.238  netmask 255.255.255.0  broadcast 192.168.50.255
        inet6 fe80::81e:8807:f229:bb59  prefixlen 64  scopeid 0x20<link>
        ether ec:f4:bb:ec:ea:88  txqueuelen 1000  (Ethernet)
        RX packets 35058  bytes 32959726 (31.4 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 9761  bytes 676024 (660.1 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

em2: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500
        ether ec:f4:bb:ec:ea:8a  txqueuelen 1000  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

## 查看网卡默认配置
以下是我的默认配置
```bash
TYPE="Ethernet"
PROXY_METHOD="none"
BROWSER_ONLY="no"
BOOTPROTO="dhcp" #dhcp改为static
IPADDR=192.168.50.106 #改为你想要的真实静态IP
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="em1"
UUID="aad591b3-181d-4506-ba9c-3bb3fc32f45f"
DEVICE="em1"
ONBOOT="yes" #开机自动启用本配置

# 以下四项不设置可能无法正常联网，一定要设置
GATEWAY=192.168.50.1 #网关 根据自己需要配置
NETMASK=255.255.254.0 #子网掩码 根据自己需要配置
DNS1=114.114.114.114 #重要
DNS2=8.8.8.8 #重要
```
然后执行命令
```bash
vi /etc/sysconfig/network-scripts/ifcfg-em1
```
按照上述要求更改，最后保存
 
## 检查最后配置是否生效
```bash

service network restart #CentOS6 使用命令重启网络服务

systemctl restart network #CentOS7 使用命令重启网络服务

ifconfig #查看是否生效
```
看到网卡信息变了，证明正确更改
```bash
em1: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.50.106  netmask 255.255.255.0  broadcast 192.168.50.255
        inet6 fe80::81e:8807:f229:bb59  prefixlen 64  scopeid 0x20<link>
        ether ec:f4:bb:ec:ea:88  txqueuelen 1000  (Ethernet)
        RX packets 41165  bytes 33362155 (31.8 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 10271  bytes 743889 (726.4 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```
