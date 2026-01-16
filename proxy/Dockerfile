FROM nginx:alpine

COPY proxy.conf /etc/proxy/proxy.conf

RUN mkdir -p /var/log/proxy

RUN nginx -t

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
