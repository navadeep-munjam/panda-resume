
# ---------------------
# Build stage with Bun (includes dev dependencies)
# ---------------------
    FROM oven/bun:1.2.9-alpine AS builder

    WORKDIR /app
    
    # Install system dependencies needed for build
    RUN apk add --no-cache git python3 make g++
    
    # Install all dependencies (including devDependencies)
    COPY package.json bun.lock ./
    RUN bun install --frozen-lockfile
    
    # Copy source files
    COPY . .
    
    # Build the application
    ENV NEXT_TELEMETRY_DISABLED=1
    RUN bun run build
    
    # ---------------------
    # Production stage with Node.js
    # ---------------------
    FROM node:current-alpine 
    
    WORKDIR /app
    
    # Create non-root user
    RUN addgroup -g 1001 -S nodejs && \
        adduser -S -u 1001 -G nodejs nodejs
    
    # Copy built assets from builder
    COPY --from=builder --chown=nodejs:nodejs /app/.next/standalone ./
    COPY --from=builder --chown=nodejs:nodejs /app/.next/static ./.next/static
    COPY --from=builder --chown=nodejs:nodejs /app/public ./public
    COPY --from=builder --chown=nodejs:nodejs /app/next.config.js ./
    
    # Environment variables
    ENV NODE_ENV=production
    ENV PORT=3000
    ENV HOSTNAME=0.0.0.0
    
    # Expose and run
    EXPOSE 3000
    USER nodejs
    CMD ["node", "server.js"]
