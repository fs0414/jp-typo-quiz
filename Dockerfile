FROM denoland/deno:latest

# Create working directory
WORKDIR /app

# Copy package files first (if they exist)
COPY deno.json* ./
COPY deno.lock* ./

# Copy source
COPY . .

# Cache dependencies
RUN deno cache main.ts

# Expose port
EXPOSE 8000

# Run the application
CMD ["deno", "task", "start"]
