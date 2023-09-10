import{_ as e,W as i,X as n,a2 as a}from"./framework-3c1374b9.js";const s={},r=a(`<h1 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx" aria-hidden="true">#</a> Nginx</h1><h2 id="负载均衡策略" tabindex="-1"><a class="header-anchor" href="#负载均衡策略" aria-hidden="true">#</a> 负载均衡策略</h2><h3 id="_1-轮询策略" tabindex="-1"><a class="header-anchor" href="#_1-轮询策略" aria-hidden="true">#</a> 1：轮询策略</h3><p>轮询策略其实是一个特殊的加权策略，不同的是，服务器组中的各个服务器的权重都是1</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>upstream {
  server 192.168.136.136 weight=1;
  server 192.168.136.136:81 weight=1;
  server 192.168.136.136:82 weight=1;
  server 192.168.136.136:83 weight=1;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-轮询加权策略" tabindex="-1"><a class="header-anchor" href="#_2-轮询加权策略" aria-hidden="true">#</a> 2：轮询加权策略</h3><p>通过加入 weight的值进行加权处理，权重值越大，服务器越容易被访问，因此，性能好的服务器应适当加大权重值</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>upstream backend {
server 192.168.136.136 weight=1;
server 192.168.136.136:81 weight=2;
server 192.168.136.136:82 weight=3;
server 192.168.136.136:83 weight=4;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-ip-哈希策略" tabindex="-1"><a class="header-anchor" href="#_3-ip-哈希策略" aria-hidden="true">#</a> 3：ip 哈希策略</h3><p>ip_hash 策略能够将某个客户端IP的请求固定到同一台服务器上，例如A用户访问服务器，通过固定算法后，被固定到 192.168.136.136 的web服务器上，那么，用户A下次访问时，依旧会到访问 192.168.136.136 服务器。因此，该策略解决了多台服务器Session不共享的问题【因为不同的客户端会被分到不同的服务器，且之后这种对应关系是不变的】</p><p>ip_hash 策略类似于url_hash ，一个采用Ip地址进行计算，一个采用URL地址进行计算。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>upstream backend {
ip_hash;
server 192.168.136.136 ;
server 192.168.136.136:81;
server 192.168.136.136:82 ;
server 192.168.136.136:83;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-least-conn-策略" tabindex="-1"><a class="header-anchor" href="#_4-least-conn-策略" aria-hidden="true">#</a> 4：least_conn 策略</h3><p>最少连接，把请求转发给连接数最少的服务器。</p><p>轮询算法/轮询加权算法会把请求按照一定比例分发请求到各服务器上，但是，有些请求占用时间长，如果把这些响应占用时间长的请求大比例发送到了某一台服务器，那么这台服务器随着时间的增加会负载比较高【因为响应较长的请求还没处理完，新的请求又来了】，在这种情况下，采用 least_conn 的方式是最适合的，它能达到更好的负载均衡</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>upstream backend {
least_conn;
server 192.168.136.136 ;
server 192.168.136.136:81;
server 192.168.136.136:82 ;
server 192.168.136.136:83;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_5-url-hash-策略" tabindex="-1"><a class="header-anchor" href="#_5-url-hash-策略" aria-hidden="true">#</a> 5：url_hash 策略</h3><p>url_hash 和 ip_hash 类似，不同的是，客户端ip可能变，但客户端发送的请求URL不同功能模块虽说不同，但同一个功能点的URL是固定不变的</p><p>该算法主要是解决 缓存命中率的问题【例如下载文件】</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>upstream backend {
hash $request_uri;
server 192.168.136.136 ;
server 192.168.136.136:81;
server 192.168.136.136:82 ;
server 192.168.136.136:83;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-智能的fair-策略【nginx默认不支持-需下载第三方模块】" tabindex="-1"><a class="header-anchor" href="#_6-智能的fair-策略【nginx默认不支持-需下载第三方模块】" aria-hidden="true">#</a> 6：智能的fair 策略【Nginx默认不支持，需下载第三方模块】</h3><p>fair 采用的不是固定的轮询算法进行负载均衡，而是智能的根据页面大小、加载时间长短进行负载计算</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>upstream backend {
fair;
server 192.168.136.136 ;
server 192.168.136.136:81;
server 192.168.136.136:82 ;
server 192.168.136.136:83;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,23),d=[r];function l(v,c){return i(),n("div",null,d)}const u=e(s,[["render",l],["__file","nginx.html.vue"]]);export{u as default};
