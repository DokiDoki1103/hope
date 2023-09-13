# 如何5分钟内部署成功elasticsearch
## 通过脚本一键按照es
大致脚本会给出一些提示，例如是否删除已经存在的es目录，是否删除已经存在的安装包等等，根据自己的需求选择即可。
最后会自动配置系统环境，例如最大文件打开数，并且还会按照ik分词插件
```bash
cd /tmp
if [ -e "/es/" ];then
	read -p "es安装目录/es已经存在，是否删除重新安装？y/n": del
	case $del in
		y)
		rm -rf /es
		;;
		n)
		echo "正在退出脚本"
		exit
		;;
	esac
else
	echo "开始安装"
fi
mkdir /es
echo 正在卸载已有的java版本
rpm -qa | grep java | xargs rpm -e --nodeps
echo 正在安装jdk1.8
yum update -y & yum -y install java-1.8.0-openjdk.x86_64 java-1.8.0-openjdk-devel.x86_64

if [ -e "./elasticsearch-6.3.0.tar.gz" ];then
	read -p "es安装包已经存在，是否要删除重新下载？y/n": download
	case $download in
		y)
		rm ./elasticsearch-6.3.0.tar.gz
		echo 正在从镜像站下载es6.3.0
		wget http://cdn.lyck6.cn/es/elasticsearch-6.3.0.tar.gz
		;;
		n)
		echo "将使用已经存在的安装包进行安装"
		;;
	esac
else
	echo 正在从镜像站下载es6.3.0
	wget http://cdn.lyck6.cn/es/elasticsearch-6.3.0.tar.gz
fi
tar -xzvf elasticsearch-6.3.0.tar.gz -C /es
adduser es
chown -R es:es /es
cd /es/elasticsearch-6.3.0
echo 正在安装ik分词插件
bash ./bin/elasticsearch-plugin install http://cdn.lyck6.cn/es/elasticsearch-analysis-ik-6.3.0.zip
echo "正在配置系统环境"
echo "vm.max_map_count=262144" > /etc/sysctl.conf
echo "es soft nofile 65536" >> /etc/security/limits.conf
echo "es hard nofile 65536" >> /etc/security/limits.conf
sysctl -p

#防火墙不建议开放，而是建议通过一些其他方式例如nginx反代等办法实现外网访问。
echo "es安装完成"
```
将上述脚本上传到服务器后执行，通常3分钟内就为您安装好了es

