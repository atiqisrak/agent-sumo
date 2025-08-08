#!/bin/bash

# Agent Sumo - Start Services Script
# This script starts all services without setup (assumes dependencies are already installed)

set -e

echo "🚀 Starting Agent Sumo Microservices..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Function to start a service
start_service() {
    local service_name=$1
    local command=$2
    local port=$3
    
    print_status "Starting $service_name on port $port..."
    
    # Check if port is already in use
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        print_warning "Port $port is already in use. Skipping $service_name."
        return 1
    fi
    
    # Create logs directory if it doesn't exist
    mkdir -p logs
    mkdir -p pids
    
    # Start service in background
    eval "$command" > logs/${service_name}.log 2>&1 &
    local pid=$!
    echo $pid > pids/${service_name}.pid
    
    # Wait a moment for service to start
    sleep 2
    
    # Check if service started successfully
    if kill -0 $pid 2>/dev/null; then
        print_success "$service_name started successfully (PID: $pid)"
        return 0
    else
        print_error "$service_name failed to start"
        return 1
    fi
}

# Start all services
start_services() {
    print_status "Starting all services..."
    
    # Activate Python virtual environment if it exists
    if [ -d "venv" ]; then
        source venv/bin/activate
    else
        print_warning "Python virtual environment not found. Please run setup-services.sh first."
        exit 1
    fi
    
    # Start Go service (sumo-core)
    start_service "sumo-core" "go run main.go" "3002"
    
    # Start Python service (agent-api)
    start_service "agent-api" "python main.py" "8000"
    
    # Start Next.js service (frontend)
    start_service "frontend" "npm run dev" "3000"
    
    print_success "All services started!"
    echo ""
    echo "🌐 Services are running on:"
    echo "   Frontend (Next.js): http://localhost:3000"
    echo "   Agent API (Python): http://localhost:8000"
    echo "   Sumo Core (Go): http://localhost:3002"
    echo ""
    echo "📋 Logs are available in the 'logs' directory"
    echo "🛑 To stop all services, run: ./stop-services.sh"
}

# Main execution
main() {
    echo "=========================================="
    echo "   Agent Sumo - Start Services"
    echo "=========================================="
    echo ""
    
    start_services
    
    echo ""
    print_success "All services are running."
}

# Run main function
main "$@"
