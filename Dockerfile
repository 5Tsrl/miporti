FROM nginx:alpine
ENV TZ Europe/Rome
COPY nginx.conf /etc/nginx/nginx.conf

COPY dist /usr/share/nginx/html

# build
# npm run build

# TEST
# docker build -t registry:5000/mip-port:test . && docker push registry:5000/mip-port:test

# PRODUZIONE
# docker build -t registry:5000/mip-port . && docker push registry:5000/mip-port
