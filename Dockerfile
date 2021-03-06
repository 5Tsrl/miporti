FROM nginx:alpine
ENV TZ Europe/Rome
# COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf.template /etc/nginx/templates/

COPY dist /usr/share/nginx/html

# build
# nvm use 8; npm run build

# TEST
# docker build -t registry:5000/mip-port:test . && docker push registry:5000/mip-port:test

# PRODUZIONE
# docker build -t registry:5000/mip-port . && docker push registry:5000/mip-port
