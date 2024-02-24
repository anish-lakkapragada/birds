what to remember (02/23/2024): 

- basically, keep in google domains the record with birds to be with 13.52.106.117
- to renew certificates, just use certbot renew
- in NGINX, keep it listening on port 80 (this corresponds to 13.52.106.117)

- basically the way a request is sent is 
(1) req sent to https://birds.lakkapragada.com 
(2) req passed onto IP address (13....)
(3) nginx is listening for requests on port 80, which come thru HTTP. 
(4) nginx forwards request to local 8000 port 

# useful commands: 
(i) sudo systemctl status nginx
(i) sudo systemctl restart nginx
(i) uvicorn main:app --port 8000 --host 0.0.0.0


# do NOT be dealing with any www. records 


NGINX FILE....

# For more information on configuration, see:
#   * Official English Documentation: http://nginx.org/en/docs/
#   * Official Russian Documentation: http://nginx.org/ru/docs/

user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log notice;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    keepalive_timeout   65;
    types_hash_max_size 4096;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    include /etc/nginx/conf.d/*.conf;

    server {
        #listen       80;
        #listen       [::]:80;
        server_name  birds.lakkapragada.com;    
        location / {
                proxy_pass http://127.0.0.1:8000;
        }

        listen 80; 
        listen 443 ssl;
        #listen 443; 

        #listen [::]:443 ssl ipv6only=on; # managed by Certbot
        #listen 443 ssl; # managed by Certbot
        #/etc/letsencrypt/live/birds.lakkapragada.com/fullchain.pem
        ssl_certificate /etc/letsencrypt/live/birds.lakkapragada.com/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/birds.lakkapragada.com/privkey.pem; # managed by Certbot
     
    }

# Settings for a TLS enabled server.
#
#    server {
#        listen       443 ssl http2;
#        listen       [::]:443 ssl http2;
#        server_name  _;
#        root         /usr/share/nginx/html;
#
#        ssl_certificate "/etc/pki/nginx/server.crt";
#        ssl_certificate_key "/etc/pki/nginx/private/server.key";
#        ssl_session_cache shared:SSL:1m;
#        ssl_session_timeout  10m;
#        ssl_ciphers PROFILE=SYSTEM;
#        ssl_prefer_server_ciphers on;
#
#        # Load configuration files for the default server block.
#        include /etc/nginx/default.d/*.conf;
#
#        error_page 404 /404.html;
#        location = /404.html {
#        }
#
#        error_page 500 502 503 504 /50x.html;
#        location = /50x.html {
#        }
#    }

}