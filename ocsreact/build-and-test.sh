#!/bin/bash

# ClassicModels React App - Build and Test Script
# This script builds the Docker image and tests the API connectivity

set -e  # Exit on any error

echo "🚀 ClassicModels React App - Build & Test"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
IMAGE_NAME="my-react-app"
TAG="latest"
CONTAINER_NAME="classicmodels-react"
PORT="3000"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Step 1: Check if we're in the right directory
print_status "Checking current directory..."
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the React project root."
    exit 1
fi

# Check for API file (could be .js or .jsx)
API_FILE=""
if [ -f "src/services/api.js" ]; then
    API_FILE="src/services/api.js"
elif [ -f "src/services/api.jsx" ]; then
    API_FILE="src/services/api.jsx"
elif [ -f "src/api.js" ]; then
    API_FILE="src/api.js"
elif [ -f "src/api.jsx" ]; then
    API_FILE="src/api.jsx"
else
    print_error "API file not found. Looking for:"
    print_error "  - src/services/api.js"
    print_error "  - src/services/api.jsx" 
    print_error "  - src/api.js"
    print_error "  - src/api.jsx"
    echo ""
    print_status "Current src/ directory contents:"
    ls -la src/ 2>/dev/null || echo "src/ directory not found"
    exit 1
fi

print_success "Found API file: $API_FILE"

print_success "Found React project files"

# Step 2: Stop and remove existing container if running
print_status "Stopping existing container..."
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

# Step 3: Build the Docker image
print_status "Building Docker image: $IMAGE_NAME:$TAG"
docker build -t $IMAGE_NAME:$TAG . || {
    print_error "Docker build failed"
    exit 1
}

print_success "Docker image built successfully"

# Step 4: Run the container
print_status "Starting container: $CONTAINER_NAME"
docker run -d \
    --name $CONTAINER_NAME \
    -p $PORT:$PORT \
    $IMAGE_NAME:$TAG || {
    print_error "Failed to start container"
    exit 1
}

print_success "Container started successfully"

# Step 5: Wait for container to be ready
print_status "Waiting for application to start..."
sleep 5

# Step 6: Test if the application is responding
print_status "Testing application health..."
if curl -f -s http://localhost:$PORT > /dev/null; then
    print_success "Application is responding on http://localhost:$PORT"
else
    print_warning "Application may not be ready yet"
    print_status "Container logs:"
    docker logs $CONTAINER_NAME --tail 10
fi

# Step 7: Test API endpoints (if backend is running)
print_status "Testing API endpoints..."

if curl -f -s http://localhost:8080/api/productlines > /dev/null 2>&1; then
    print_success "Backend API is accessible at http://localhost:8080"
    
    # Test the proxy through React app
    if curl -f -s http://localhost:$PORT/api/productlines > /dev/null 2>&1; then
        print_success "Proxy is working - React app can access backend API"
    else
        print_warning "Proxy may not be working - check Vite configuration"
    fi
else
    print_warning "Backend API not accessible at http://localhost:8080"
    print_warning "Make sure your Spring Boot container is running"
fi

# Step 8: Show useful information
echo ""
print_success "Build and deployment complete!"
echo "----------------------------------------"
echo "📱 React App:      http://localhost:$PORT"
echo "🔧 Backend API:    http://localhost:8080"
echo "🐳 Container:      $CONTAINER_NAME"
echo "📊 Image:          $IMAGE_NAME:$TAG"
echo ""
echo "Useful commands:"
echo "  View logs:       docker logs $CONTAINER_NAME -f"
echo "  Stop container:  docker stop $CONTAINER_NAME"
echo "  Remove container: docker rm $CONTAINER_NAME"
echo "  Shell access:    docker exec -it $CONTAINER_NAME sh"
echo ""
print_status "Open your browser to http://localhost:$PORT to test the application"