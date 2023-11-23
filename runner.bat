set root=c:\xampp\

start cmd /k "cd ./starter-kit && yarn run dev"
start cmd /k "cd ./api && yarn run start:dev"

%root%mysql\bin\mysqld.exe
%root%apache\bin\httpd.exe
