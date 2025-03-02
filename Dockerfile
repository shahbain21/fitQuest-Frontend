# Step 1: Build the Angular app
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile
COPY . .
RUN npm run build --configuration=production

# Step 2: Serve the app with Nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist/fit-quest-frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
