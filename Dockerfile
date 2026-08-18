# Multi-stage build for Myanmar Health Application

# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Build Go Backend
FROM golang:1.22-alpine AS backend-builder
WORKDIR /app
COPY backend/go.mod ./
RUN go mod download
COPY backend/ ./
RUN CGO_ENABLED=0 GOOS=linux go build -o server main.go

# Stage 3: Final Runner
FROM alpine:3.19 AS runner
WORKDIR /app

# Install runtime dependencies (Node & CAs)
RUN apk add --no-cache nodejs npm ca-certificates tzdata

ENV NODE_ENV=production
ENV PORT=3000
ENV GO_BACKEND_URL=http://localhost:8080

# Copy Frontend Build & Server
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=frontend-builder /app/dist ./dist
COPY --from=frontend-builder /app/public ./public
COPY --from=frontend-builder /app/server.ts ./
COPY --from=frontend-builder /app/vite.config.ts ./
COPY --from=frontend-builder /app/src ./src

# Copy Backend Binary
COPY --from=backend-builder /app/server ./backend-server
RUN mkdir -p /app/data

COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

EXPOSE 3000 8080
CMD ["/app/start.sh"]
