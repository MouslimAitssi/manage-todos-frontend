FROM nginx:alpine

COPY /dist/manage-todos-frontend /usr/share/nginx/html

EXPOSE 80
