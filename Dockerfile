FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY build /usr/share/nginx/html

#build
# docker build -t registry:5000/mip-port .

# run per produzione
#docker rm -f mip-port ; docker run  -p 8087:80 --name mip-port --dns 172.21.30.133 -d registry:5000/mip-port && docker logs -f mip-port

#con mount della cartella client
#docker rm -f mip-port ; docker run -p 8087:80 -v /data/mip-port/client:/usr/share/nginx/html --name mip-port --dns 172.21.30.133 -d registry:5000/mip-port && docker logs -f mip-port
