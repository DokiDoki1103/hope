import{_ as s,W as n,X as a,a2 as e}from"./framework-3c1374b9.js";const t={},i=e(`<h1 id="快速入门elasticsearch" tabindex="-1"><a class="header-anchor" href="#快速入门elasticsearch" aria-hidden="true">#</a> 快速入门elasticsearch</h1><h2 id="通过脚本一键按照es" tabindex="-1"><a class="header-anchor" href="#通过脚本一键按照es" aria-hidden="true">#</a> 通过脚本一键按照es</h2><p>大致脚本会给出一些提示，例如是否删除已经存在的es目录，是否删除已经存在的安装包等等，根据自己的需求选择即可。 最后会自动配置系统环境，例如最大文件打开数，并且还会按照ik分词插件</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token builtin class-name">cd</span> /tmp
<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;/es/&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
	<span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;es安装目录/es已经存在，是否删除重新安装？y/n&quot;</span><span class="token builtin class-name">:</span> del
	<span class="token keyword">case</span> <span class="token variable">$del</span> <span class="token keyword">in</span>
		y<span class="token punctuation">)</span>
		<span class="token function">rm</span> <span class="token parameter variable">-rf</span> /es
		<span class="token punctuation">;</span><span class="token punctuation">;</span>
		n<span class="token punctuation">)</span>
		<span class="token builtin class-name">echo</span> <span class="token string">&quot;正在退出脚本&quot;</span>
		<span class="token builtin class-name">exit</span>
		<span class="token punctuation">;</span><span class="token punctuation">;</span>
	<span class="token keyword">esac</span>
<span class="token keyword">else</span>
	<span class="token builtin class-name">echo</span> <span class="token string">&quot;开始安装&quot;</span>
<span class="token keyword">fi</span>
<span class="token function">mkdir</span> /es
<span class="token builtin class-name">echo</span> 正在卸载已有的java版本
<span class="token function">rpm</span> <span class="token parameter variable">-qa</span> <span class="token operator">|</span> <span class="token function">grep</span> <span class="token function">java</span> <span class="token operator">|</span> <span class="token function">xargs</span> <span class="token function">rpm</span> <span class="token parameter variable">-e</span> <span class="token parameter variable">--nodeps</span>
<span class="token builtin class-name">echo</span> 正在安装jdk1.8
yum update <span class="token parameter variable">-y</span> <span class="token operator">&amp;</span> yum <span class="token parameter variable">-y</span> <span class="token function">install</span> java-1.8.0-openjdk.x86_64 java-1.8.0-openjdk-devel.x86_64

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token parameter variable">-e</span> <span class="token string">&quot;./elasticsearch-6.3.0.tar.gz&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token keyword">then</span>
	<span class="token builtin class-name">read</span> <span class="token parameter variable">-p</span> <span class="token string">&quot;es安装包已经存在，是否要删除重新下载？y/n&quot;</span><span class="token builtin class-name">:</span> download
	<span class="token keyword">case</span> <span class="token variable">$download</span> <span class="token keyword">in</span>
		y<span class="token punctuation">)</span>
		<span class="token function">rm</span> ./elasticsearch-6.3.0.tar.gz
		<span class="token builtin class-name">echo</span> 正在从镜像站下载es6.3.0
		<span class="token function">wget</span> http://cdn.lyck6.cn/es/elasticsearch-6.3.0.tar.gz
		<span class="token punctuation">;</span><span class="token punctuation">;</span>
		n<span class="token punctuation">)</span>
		<span class="token builtin class-name">echo</span> <span class="token string">&quot;将使用已经存在的安装包进行安装&quot;</span>
		<span class="token punctuation">;</span><span class="token punctuation">;</span>
	<span class="token keyword">esac</span>
<span class="token keyword">else</span>
	<span class="token builtin class-name">echo</span> 正在从镜像站下载es6.3.0
	<span class="token function">wget</span> http://cdn.lyck6.cn/es/elasticsearch-6.3.0.tar.gz
<span class="token keyword">fi</span>
<span class="token function">tar</span> <span class="token parameter variable">-xzvf</span> elasticsearch-6.3.0.tar.gz <span class="token parameter variable">-C</span> /es
adduser es
<span class="token function">chown</span> <span class="token parameter variable">-R</span> es:es /es
<span class="token builtin class-name">cd</span> /es/elasticsearch-6.3.0
<span class="token builtin class-name">echo</span> 正在安装ik分词插件
<span class="token function">bash</span> ./bin/elasticsearch-plugin <span class="token function">install</span> http://cdn.lyck6.cn/es/elasticsearch-analysis-ik-6.3.0.zip
<span class="token builtin class-name">echo</span> <span class="token string">&quot;正在配置系统环境&quot;</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;vm.max_map_count=262144&quot;</span> <span class="token operator">&gt;</span> /etc/sysctl.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;es soft nofile 65536&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/security/limits.conf
<span class="token builtin class-name">echo</span> <span class="token string">&quot;es hard nofile 65536&quot;</span> <span class="token operator">&gt;&gt;</span> /etc/security/limits.conf
<span class="token function">sysctl</span> <span class="token parameter variable">-p</span>

<span class="token comment">#防火墙不建议开放，而是建议通过一些其他方式例如nginx反代等办法实现外网访问。</span>
<span class="token builtin class-name">echo</span> <span class="token string">&quot;es安装完成&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>将上述脚本上传到服务器后执行，通常3分钟内就为您安装好了es</p><h2 id="esasticsearch进阶" tabindex="-1"><a class="header-anchor" href="#esasticsearch进阶" aria-hidden="true">#</a> esasticsearch进阶</h2><h3 id="es组集群时负载不均衡" tabindex="-1"><a class="header-anchor" href="#es组集群时负载不均衡" aria-hidden="true">#</a> es组集群时负载不均衡</h3><p>如果es组建了集群，并且配置了负载均衡器，可以随机轮训路由到一个地址，但是，有的机器负载高，有的负载低。大概率是因为es主分片分配不均衡导致的。</p><p>这时候可以查看集群状态是否为 yellow ，如果是 yellow 那么查看是否有未分配的分片。 另外如果主分片都集中在某一台服务器，那么可以手动迁移分片，或者让es自动为我们迁移。</p><p>先删除副本分片，让es平均分配主分片</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>PUT /index/_settings
<span class="token punctuation">{</span>
  <span class="token string">&quot;settings&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
    <span class="token string">&quot;index.number_of_replicas&quot;</span><span class="token builtin class-name">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>等待分片迁移完毕之后，再将副本分片设置为您想要的副本数，一般1或者2即可，过多的分片会使写压力增加。</p><p>如果上述操作未果，仍然很慢，则查看是否正确配置了分词器可以通过以下命令查看，将下面的index替换成你的索引</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>POST /index/_analyze
<span class="token punctuation">{</span>
  <span class="token string">&quot;field&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;word&quot;</span>,
  <span class="token string">&quot;text&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;搜索的文本&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14),l=[i];function c(p,o){return n(),a("div",null,l)}const d=s(t,[["render",c],["__file","elasticsearch.html.vue"]]);export{d as default};
