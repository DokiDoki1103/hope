const e=JSON.parse('{"key":"v-54e33666","path":"/interview/mysql/mysql-index.html","title":"Mysql 进阶 - 索引","lang":"zh-CN","frontmatter":{"description":"为什么要建立索引 在非常大的表中进行查询，如果数据库进行全表遍历的话那么速度是会非常慢的，而我们的索引则可以建立一个b+树的结构，可以自上而下的去进行查询（有点像二分查找），可以在一定程度避免走全表查询，这样查询的速度是非常快的； 一般情况下扫描索引的速度是远远大于扫描全表的速度的；; 索引是天然有序的，具备B+树的快速检索（类似二分查找）; 索引天然...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/hope/interview/mysql/mysql-index.html"}],["meta",{"property":"og:site_name","content":"文档演示"}],["meta",{"property":"og:title","content":"Mysql 进阶 - 索引"}],["meta",{"property":"og:description","content":"为什么要建立索引 在非常大的表中进行查询，如果数据库进行全表遍历的话那么速度是会非常慢的，而我们的索引则可以建立一个b+树的结构，可以自上而下的去进行查询（有点像二分查找），可以在一定程度避免走全表查询，这样查询的速度是非常快的； 一般情况下扫描索引的速度是远远大于扫描全表的速度的；; 索引是天然有序的，具备B+树的快速检索（类似二分查找）; 索引天然..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-09-10T15:49:54.000Z"}],["meta",{"property":"article:author","content":"DokiDoki"}],["meta",{"property":"article:modified_time","content":"2023-09-10T15:49:54.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Mysql 进阶 - 索引\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-09-10T15:49:54.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"DokiDoki\\",\\"url\\":\\"https://lengyue-ck.github.io/hope\\"}]}"]]},"headers":[{"level":2,"title":"为什么要建立索引","slug":"为什么要建立索引","link":"#为什么要建立索引","children":[]},{"level":2,"title":"MySQL有哪几种索引类型","slug":"mysql有哪几种索引类型","link":"#mysql有哪几种索引类型","children":[]},{"level":2,"title":"哪些情况适合建立索引","slug":"哪些情况适合建立索引","link":"#哪些情况适合建立索引","children":[]},{"level":2,"title":"哪些情况下不适合建索引","slug":"哪些情况下不适合建索引","link":"#哪些情况下不适合建索引","children":[]},{"level":2,"title":"说一说索引的底层实现","slug":"说一说索引的底层实现","link":"#说一说索引的底层实现","children":[]},{"level":2,"title":"为什么索引是使用B+树？","slug":"为什么索引是使用b-树","link":"#为什么索引是使用b-树","children":[]},{"level":2,"title":"mysql索引失效的情况","slug":"mysql索引失效的情况","link":"#mysql索引失效的情况","children":[{"level":3,"title":"1：like通配符可能导致索引失效","slug":"_1-like通配符可能导致索引失效","link":"#_1-like通配符可能导致索引失效","children":[]},{"level":3,"title":"2：or语句前后没有同时使用索引。","slug":"_2-or语句前后没有同时使用索引。","link":"#_2-or语句前后没有同时使用索引。","children":[]},{"level":3,"title":"3：is null,is not null可能会导致索引失效","slug":"_3-is-null-is-not-null可能会导致索引失效","link":"#_3-is-null-is-not-null可能会导致索引失效","children":[]},{"level":3,"title":"4：索引列上有计算,函数","slug":"_4-索引列上有计算-函数","link":"#_4-索引列上有计算-函数","children":[]},{"level":3,"title":"5：隐式类型转换导致索引失效","slug":"_5-隐式类型转换导致索引失效","link":"#_5-隐式类型转换导致索引失效","children":[]},{"level":3,"title":"6：不等于(!=,<>)，not in可能造成索引失效","slug":"_6-不等于-not-in可能造成索引失效","link":"#_6-不等于-not-in可能造成索引失效","children":[]},{"level":3,"title":"7：联合索引不满足最左匹配原则","slug":"_7-联合索引不满足最左匹配原则","link":"#_7-联合索引不满足最左匹配原则","children":[]},{"level":3,"title":"8：查询数据量过大","slug":"_8-查询数据量过大","link":"#_8-查询数据量过大","children":[]},{"level":3,"title":"9：字符集不统一","slug":"_9-字符集不统一","link":"#_9-字符集不统一","children":[]},{"level":3,"title":"10：范围索引列没有放到最后","slug":"_10-范围索引列没有放到最后","link":"#_10-范围索引列没有放到最后","children":[]}]},{"level":2,"title":"Mysql索引调优","slug":"mysql索引调优","link":"#mysql索引调优","children":[]},{"level":2,"title":"explain的type类型的理解","slug":"explain的type类型的理解","link":"#explain的type类型的理解","children":[]}],"git":{"createdTime":1694360994000,"updatedTime":1694360994000,"contributors":[{"name":"逆流而上","email":"1666888816@qq.com","commits":1}]},"readingTime":{"minutes":13.48,"words":4043},"filePathRelative":"interview/mysql/mysql-index.md","localizedDate":"2023年9月10日","autoDesc":true}');export{e as data};
