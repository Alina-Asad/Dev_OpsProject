# -------- Stage 1: Build React App --------
    FROM node:18-alpine as build

    WORKDIR /app
    
    # Copy package.json and install dependencies
    COPY package*.json ./
    RUN npm install
    
    # Copy source code and build the React app
    COPY . .
    RUN npm run build
    
    # -------- Stage 2: Nginx Serve --------
    FROM nginx:alpine
    
    # Remove the default nginx static files
    RUN rm -rf /usr/share/nginx/html/*
    
    # Copy built files from previous stage to nginx directory
    COPY --from=build /app/dist /usr/share/nginx/html
    
    # (Optional) Custom Nginx config can be added here
    # COPY nginx.conf /etc/nginx/nginx.conf
    
    # Expose port 80
    EXPOSE 80
    
    # Start nginx
    CMD ["nginx", "-g", "daemon off;"]
    