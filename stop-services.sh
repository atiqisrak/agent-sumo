#!/bin/bash

# Agent Sumo - Stop Services Script
# This script stops all running microservices

set -e

echo "🛑 Stopping Agent Sumo Microservices..."

# stop ports 3000, 8000, 3002
lsof -ti:3000 | xargs kill -9
lsof -ti:8000 | xargs kill -9
lsof -ti:3002 | xargs kill -9

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

# Function to stop a service
stop_service() {
    local service_name=$1
    local pid_file="pids/${service_name}.pid"
    
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        
        if kill -0 $pid 2>/dev/null; then
            print_status "Stopping $service_name (PID: $pid)..."
            kill $pid
            
            # Wait for process to stop
            local count=0
            while kill -0 $pid 2>/dev/null && [ $count -lt 10 ]; do
                sleep 1
                count=$((count + 1))
            done
            
            if kill -0 $pid 2>/dev/null; then
                print_warning "Force killing $service_name..."
                kill -9 $pid
            fi
            
            rm -f "$pid_file"
            print_success "$service_name stopped."
        else
            print_warning "$service_name is not running."
            rm -f "$pid_file"
        fi
    else
        print_warning "No PID file found for $service_name."
    fi
}

# Stop all services
stop_all_services() {
    print_status "Stopping all services..."
    
    # Stop services in reverse order
    stop_service "frontend"
    stop_service "agent-api"
    stop_service "sumo-core"
    
    print_success "All services stopped!"
}

# Clean up temporary files
cleanup() {
    print_status "Cleaning up temporary files..."
    
    # Remove PID files
    rm -rf pids/
    
    # Keep logs for debugging
    print_status "Logs are preserved in the 'logs' directory"
    
    print_success "Cleanup complete!"
}

# Main execution
main() {
    echo "=========================================="
    echo "   Agent Sumo - Stop Services"
    echo "=========================================="
    echo ""
    
    stop_all_services
    cleanup
    
    echo ""
    print_success "All services have been stopped."
}

# Run main function
main "$@"
