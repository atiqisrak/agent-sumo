#!/bin/bash

# Agent Sumo - Service Status Script
# This script checks the status of all microservices

set -e

echo "📊 Agent Sumo Service Status"

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

# Function to check service status
check_service() {
    local service_name=$1
    local port=$2
    local pid_file="pids/${service_name}.pid"
    
    echo "----------------------------------------"
    echo "Service: $service_name"
    echo "Port: $port"
    
    # Check if PID file exists
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        
        if kill -0 $pid 2>/dev/null; then
            print_success "✅ Running (PID: $pid)"
            
            # Check if port is listening
            if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
                print_success "✅ Port $port is listening"
                
                # Try to make a health check request
                if [ "$service_name" = "sumo-core" ]; then
                    if curl -s http://localhost:$port/health >/dev/null 2>&1; then
                        print_success "✅ Health check passed"
                    else
                        print_warning "⚠️  Health check failed"
                    fi
                elif [ "$service_name" = "agent-api" ]; then
                    if curl -s http://localhost:$port/health >/dev/null 2>&1; then
                        print_success "✅ Health check passed"
                    else
                        print_warning "⚠️  Health check failed"
                    fi
                elif [ "$service_name" = "frontend" ]; then
                    if curl -s http://localhost:$port >/dev/null 2>&1; then
                        print_success "✅ Frontend accessible"
                    else
                        print_warning "⚠️  Frontend not accessible"
                    fi
                fi
            else
                print_error "❌ Port $port is not listening"
            fi
        else
            print_error "❌ Process not running (stale PID file)"
            rm -f "$pid_file"
        fi
    else
        print_error "❌ Not running (no PID file)"
    fi
    
    # Show last few lines of log
    if [ -f "logs/${service_name}.log" ]; then
        echo "📋 Recent logs:"
        tail -n 3 "logs/${service_name}.log" | sed 's/^/   /'
    fi
    
    echo ""
}

# Check all services
check_all_services() {
    echo "=========================================="
    echo "   Agent Sumo - Service Status"
    echo "=========================================="
    echo ""
    
    check_service "sumo-core" "3002"
    check_service "agent-api" "8000"
    check_service "frontend" "3000"
    
    echo "=========================================="
    echo "Service URLs:"
    echo "  Frontend: http://localhost:3000"
    echo "  Agent API: http://localhost:8000"
    echo "  Sumo Core: http://localhost:3002"
    echo "=========================================="
}

# Main execution
main() {
    check_all_services
}

# Run main function
main "$@"
