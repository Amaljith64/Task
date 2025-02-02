FROM node:18-alpine

# Add build argument for environment
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build only if production
# RUN if [ "$ENVIRONMENT" = "production" ]; then npm run build; fi/
RUN npm run build

CMD ["npm", "start"]