# Agent Sumo - Microservices Setup Guide

This guide explains how to set up and run all 3 microservices in the Agent Sumo project.

## 🏗️ Architecture Overview

The Agent Sumo project consists of 3 microservices:

1. **Frontend (Next.js)** - Port 3000

   - React-based web interface
   - API routes for inventory items and requisitions
   - Chat widget interface

2. **Agent API (Python/FastAPI)** - Port 8000

   - OpenAI integration for AI chat functionality
   - Function calling for business operations
   - External API communication

3. **Sumo Core (Go/Gin)** - Port 3002
   - Core business logic
   - Purchase order, inventory, and requisition handlers
   - Data persistence and management

## 📋 Prerequisites

Before running the services, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **Python 3** (v3.8 or higher)
- **Go** (v1.21 or higher)
- **Git**

### Installation Commands

**macOS (using Homebrew):**

```bash
# Install Node.js
brew install node

# Install Python 3
brew install python

# Install Go
brew install go
```

**Ubuntu/Debian:**

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Python 3
sudo apt-get install python3 python3-pip python3-venv

# Install Go
sudo apt-get install golang-go
```

## 🚀 Quick Start

### 1. Clone and Setup

```bash
# Clone the repository (if not already done)
git clone <repository-url>
cd agent-sumo

# Make scripts executable
chmod +x setup-services.sh stop-services.sh status-services.sh
```

### 2. Configure Environment

```bash
# Copy environment template
cp env.example .env

# Edit .env file with your OpenAI API key
nano .env
```

**Required Environment Variables:**

```env
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# External Service Configuration
EXTERNAL_SERVICE_URL=http://localhost:3002

# Server Configuration (optional)
HOST=0.0.0.0
PORT=8000
```

### 3. Run All Services

```bash
# Start all services
./setup-services.sh
```

This script will:

- Check system requirements
- Install all dependencies
- Create virtual environments
- Start all 3 services in the background
- Display service URLs and status

## 📊 Service Management

### Check Service Status

```bash
# Check status of all services
./status-services.sh
```

### Stop All Services

```bash
# Stop all running services
./stop-services.sh
```

### Manual Service Management

If you prefer to run services manually:

#### Frontend (Next.js)

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

#### Agent API (Python)

```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start server
python main.py
```

#### Sumo Core (Go)

```bash
# Install dependencies
go mod tidy

# Start server
go run main.go
```

## 🌐 Service Endpoints

### Frontend (Next.js) - http://localhost:3000

- **Main App:** `http://localhost:3000`
- **Inventory Items API:** `http://localhost:3000/api/inventory-items`
- **Requisitions API:** `http://localhost:3000/api/requisitions`
- **Chat API:** `http://localhost:3000/api/chat`

### Agent API (Python) - http://localhost:8000

- **Health Check:** `http://localhost:8000/health`
- **Chat Endpoint:** `http://localhost:8000/chat`
- **API Documentation:** `http://localhost:8000/docs`

### Sumo Core (Go) - http://localhost:3002

- **Health Check:** `http://localhost:3002/health`
- **Purchase Orders:** `http://localhost:3002/api/purchase-orders`
- **Inventory Items:** `http://localhost:3002/api/inventory-items`
- **Requisitions:** `http://localhost:3002/api/requisitions`

## 🔧 Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Check what's using a port
lsof -i :3000  # Replace with your port

# Kill process using the port
kill -9 <PID>
```

#### Service Won't Start

```bash
# Check logs
tail -f logs/frontend.log
tail -f logs/agent-api.log
tail -f logs/sumo-core.log
```

#### Dependencies Issues

```bash
# Clean and reinstall Node.js dependencies
rm -rf node_modules package-lock.json
npm install

# Clean and reinstall Python dependencies
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Clean and reinstall Go dependencies
go mod tidy
go mod download
```

### Environment Issues

#### Missing OpenAI API Key

```bash
# Set your OpenAI API key
export OPENAI_API_KEY="your-api-key-here"
```

#### Virtual Environment Issues

```bash
# Recreate Python virtual environment
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## 📁 Project Structure

```
agent-sumo/
├── app/                    # Next.js frontend
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # React components
├── internal/               # Go backend
│   ├── handlers/          # Business logic handlers
│   ├── models/            # Data models
│   └── routes/            # API routes
├── main.go                # Go server entry point
├── main.py                # Python server entry point
├── requirements.txt        # Python dependencies
├── go.mod                 # Go dependencies
├── package.json           # Node.js dependencies
├── setup-services.sh      # Service setup script
├── stop-services.sh       # Service stop script
├── status-services.sh     # Service status script
└── .env                   # Environment variables
```

## 🔄 Development Workflow

### 1. Start Development Environment

```bash
./setup-services.sh
```

### 2. Make Changes

- Edit frontend code in `app/` directory
- Edit Go backend in `internal/` directory
- Edit Python backend in `main.py`

### 3. Test Changes

```bash
# Check service status
./status-services.sh

# View logs
tail -f logs/frontend.log
```

### 4. Stop Services

```bash
./stop-services.sh
```

## 🧪 Testing

### Test Individual Services

#### Frontend

```bash
# Run frontend tests
npm test
```

#### Python API

```bash
# Activate virtual environment
source venv/bin/activate

# Run tests
python -m pytest test_main.py
```

#### Go API

```bash
# Run Go tests
go test ./...
```

## 📈 Monitoring

### Log Files

- `logs/frontend.log` - Next.js application logs
- `logs/agent-api.log` - Python API logs
- `logs/sumo-core.log` - Go API logs

### Health Checks

```bash
# Check all service health
curl http://localhost:3000/api/health
curl http://localhost:8000/health
curl http://localhost:3002/health
```

## 🚀 Production Deployment

For production deployment, consider:

1. **Environment Variables:** Use proper environment management
2. **Process Management:** Use PM2, systemd, or Docker
3. **Load Balancing:** Use nginx or similar
4. **Monitoring:** Implement proper logging and monitoring
5. **Security:** Use HTTPS and proper authentication

## 📞 Support

If you encounter issues:

1. Check the logs in the `logs/` directory
2. Verify all prerequisites are installed
3. Ensure environment variables are set correctly
4. Check that ports are not already in use

For additional help, refer to the individual service documentation or create an issue in the repository.
