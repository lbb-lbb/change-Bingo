## 关于博客
从初学前端开始，便一直希望能够拥有一个博客网站。其实在去年便已经搭建过一个网站，但是工作半年后回顾发现可拓展性太差，以及实现出来的功能实在太过于拉跨，索性一不做二不休直接重新搭建，也算是验证自己工作半年来学习到的成果~
前后花了差不多一个半月的时间，2022年1月1日上线v1.0版本
[博客前端源代码](https://github.com/lbb-lbb/change-Bingo)
[博客后端源代码](https://github.com/lbb-lbb/koaApp)
该博客目前具备的功能有：
- [x] 文章的编写，发布
- [x] 评论新增、审核、回复，楼中楼任意回复
- [x] 友链的展示与管理
- [x] 作品的展示与管理
- [x] 用户的登录、修改个人信息、修改密码、头像、以及qq和微信的二维码图片实时修改
## 搭建博客使用到的技术栈
### 前端技术
- vue框架
- element ui框架
- 使用webpack5进行打包
- 网络请求使用axios库
- 其他第三方库
- 打包后的前端包托管于腾讯云服务器的nginx
### 后端技术
- 基于node.js的koa2框架
- 数据库使用mysql
- 后台程序使用pm2托管于腾讯云服务器
- crypto-js、koa-jwt等第三方库实现登录密码的加密、token的生成
##  其他
- 博客里面的所有图片均上传到自己的腾讯云服务器，返回路径访问
- 博客使用媒体查询加流式布局兼容移动端以及pc端访问
## 博客待TODO的功能
- [ ] 用户评论可使用github登录获取用户信息作为评论信息
- [ ] 个人用户可使用qq、微信、github快速登录
- [ ] 网站所有评论自动发邮件给自己提醒以及发邮件给评论用户留下的邮箱号发提醒
- [ ] 主题色自定义配置，主要黑夜模式于白天模式
- [ ] 深入node.js，重构一下后端代码，优化逻辑
- [ ] 增加时间轴，将自己工作经历，项目代入
- [ ] 引入部署工具自动化部署前后端（例如Jenkins...）
```shell
user  nginx;                        # 运行用户，默认即是nginx，可以不进行设置
worker_processes  1;                # Nginx 进程数，一般设置为和 CPU 核数一样
error_log  /var/log/nginx/error.log warn;   # Nginx 的错误日志存放目录
pid        /var/run/nginx.pid;      # Nginx 服务启动时的 pid 存放位置

events {
    use epoll;     # 使用epoll的I/O模型(如果你不知道Nginx该使用哪种轮询方法，会自动选择一个最适合你操作系统的)
    worker_connections 1024;   # 每个进程允许最大并发数
}

http {   # 配置使用最频繁的部分，代理、缓存、日志定义等绝大多数功能和第三方模块的配置都在这里设置
    # 设置日志模式
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;   # Nginx访问日志存放位置

    sendfile            on;   # 开启高效传输模式
    tcp_nopush          on;   # 减少网络报文段的数量
    tcp_nodelay         on;
    keepalive_timeout   65;   # 保持连接的时间，也叫超时时间，单位秒
    types_hash_max_size 2048;

    include             /etc/nginx/mime.types;      # 文件扩展名与类型映射表
    default_type        application/octet-stream;   # 默认文件类型

    include /etc/nginx/conf.d/*.conf;   # 加载子配置项
    
    gzip on;    # 开启gzip资源资源
    gzip_min_length 1k;    # 大于多少就压缩
    gzip_comp_level 2;    #压缩的等级,数字选择范围是1-9,数字越小压缩的速度越快,消耗cpu就越大
    gzip_types image/jpeg image/gif image/png; # 指定需要压缩的资源
    gzip_disable "MSIE [1-6]\."; #配置禁用gzip条件，支持正则。此处表示ie6及以下不启用gzip（因为ie低版本不支持）
    
    server {
    	listen       80;       # 配置监听的端口
    	server_name  localhost;    # 配置的域名
    	
    	location / {
    		root   /usr/share/nginx/html;  # 网站根目录
    		index  index.html index.htm;   # 默认首页文件
    		deny 172.168.22.11;   # 禁止访问的ip地址，可以为all
    		allow 172.168.33.44； # 允许访问的ip地址，可以为all
    	}
    	
    	error_page 500 502 503 504 /50x.html;  # 默认50x对应的访问页面
    	error_page 400 404 error.html;   # 同上
    }
    
    # HTTPS server

    server {
        listen       443 ssl;
        server_name  localhost;
  
        ssl_certificate      cert.pem;    # ssl证书 证书文件在服务器的路径
        ssl_certificate_key  cert.key;    # 证书密钥 密钥文件在服务器的路径
   
        ssl_session_cache    shared:SSL:1m;    # 设置ssl会话缓存的类型和大小
        ssl_session_timeout  5m;    # ssl会话超时时间
   
        sl_ciphers  HIGH:!aNULL:!MD5;   # 选择加密套件
        ssl_prefer_server_ciphers  on;    # 设置协商加密算法
   
        location / {
           root   html;
           index  index.html index.htm;
        }
   }
}
```
