# 基础镜像
FROM node:16-alpine
# 设置工作目录
WORKDIR /app
# 复制 package.json 和 package-lock.json 到工作目录
COPY package*.json ./
# 安装依赖
RUN npm config set registry https://registry.npm.taobao.org/ --global
RUN npm install
# 复制项目文件到工作目录
COPY . .
# 构建项目
RUN npm run build
# 配置 Nginx
FROM nginx:stable-alpine
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
