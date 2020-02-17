FROM nginx:alpine
ENV TZ Europe/Rome
COPY nginx.conf /etc/nginx/nginx.conf

COPY dist /usr/share/nginx/html

# docker build -t registry:5000/mip-port .
