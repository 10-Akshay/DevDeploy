FROM node:20-alpine

# Install docker CLI + git + kubectl inside backend container
RUN apk add --no-cache git curl docker-cli

# Install kubectl
RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl" \
    && install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY src/ ./src/

EXPOSE 4000
CMD ["node", "src/app.js"]
