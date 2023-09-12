import{_ as e,W as a,X as s,a2 as n}from"./framework-3c1374b9.js";const o={},i=n(`<h1 id="linux-home分区合并到root下" tabindex="-1"><a class="header-anchor" href="#linux-home分区合并到root下" aria-hidden="true">#</a> linux /home分区合并到root下</h1><p>有时候我们装完系统之后，明明是一块磁盘，但是有两块分区，想要合并他怎么办呢？</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">umount</span> /home
lvremove /dev/centos/home <span class="token parameter variable">-y</span>
lvextend <span class="token parameter variable">-l</span> +100%FREE /dev/centos/root
xfs_growfs /dev/centos/root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编辑/etc/fstab，取消开机挂载/home分区，否则开启会挂载/home失败可能无法进入系统</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">vi</span> /etc/fstab

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div>`,5),t=[i];function r(d,l){return a(),s("div",null,t)}const m=e(o,[["render",r],["__file","home2root.html.vue"]]);export{m as default};
