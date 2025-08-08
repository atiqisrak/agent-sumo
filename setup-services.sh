#!/bin/bash

# Agent Sumo - Multi-Service Setup Script
# This script sets up and runs all 3 microservices

set -e

echo "🚀 Setting up Agent Sumo Microservices..."

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

# Check if required tools are installed
check_requirements() {
    print_status "Checking requirements..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    
    # Check Python
    if ! command -v python3 &> /dev/null; then
        print_error "Python 3 is not installed. Please install Python 3 first."
        exit 1
    fi
    
    # Check Go
    if ! command -v go &> /dev/null; then
        print_error "Go is not installed. Please install Go first."
        exit 1
    fi
    
    print_success "All requirements are met!"
}

# Setup environment variables
setup_env() {
    print_status "Setting up environment variables..."
    
    if [ ! -f .env ]; then
        cp env.example .env
        print_warning "Created .env file from template. Please update with your OpenAI API key."
    else
        print_status ".env file already exists."
    fi
}

# Install Node.js dependencies
setup_nodejs() {
    print_status "Setting up Node.js dependencies..."
    
    if [ ! -d "node_modules" ]; then
        npm install
        print_success "Node.js dependencies installed."
    else
        print_status "Node.js dependencies already installed."
    fi
}

# Install Python dependencies
setup_python() {
    print_status "Setting up Python dependencies..."
    
    if [ ! -d "venv" ]; then
        python3 -m venv venv
        print_success "Python virtual environment created."
    fi
    
    source venv/bin/activate
    pip install -r requirements.txt
    print_success "Python dependencies installed."
}

# Install Go dependencies
setup_go() {
    print_status "Setting up Go dependencies..."
    
    go mod tidy
    print_success "Go dependencies installed."
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

# Create necessary directories
create_directories() {
    print_status "Creating necessary directories..."
    
    mkdir -p logs
    mkdir -p pids
    print_success "Directories created."
}

# Start all services
start_services() {
    print_status "Starting all services..."
    
    # Activate Python virtual environment
    source venv/bin/activate
    
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
    echo "   Agent Sumo - Multi-Service Setup"
    echo "=========================================="
    echo ""
    
    check_requirements
    setup_env
    create_directories
    setup_nodejs
    setup_python
    setup_go
    start_services
    
    echo ""
    print_success "Setup complete! All services are running."
}

# Run main function
main "$@"
