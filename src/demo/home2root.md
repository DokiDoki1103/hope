# linux /home分区合并到root下
有时候我们装完系统之后，明明是一块磁盘，但是有两块分区，想要合并他怎么办呢？

```bash
umount /home
lvremove /dev/centos/home -y
lvextend -l +100%FREE /dev/centos/root
xfs_growfs /dev/centos/root
```
编辑/etc/fstab，取消开机挂载/home分区，否则开启会挂载/home失败可能无法进入系统
```bash
vi /etc/fstab

```
