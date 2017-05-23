FROM centos:7
RUN yum -y install epel-release
RUN yum -y update
RUN yum -y install nginx
ADD index.html /usr/share/nginx/html/index.html
ADD edgelist.csv /usr/share/nginx/html/edgelist.csv
ADD nodelist.csv /usr/share/nginx/html/nodelist.csv
EXPOSE 80/tcp
CMD ["nginx", "-g daemon off;"]
