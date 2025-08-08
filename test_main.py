import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, MagicMock
import json
from main import app

client = TestClient(app)

@pytest.fixture
def mock_openai_response():
    """Mock OpenAI response for function calling"""
    return MagicMock(
        choices=[
            MagicMock(
                message=MagicMock(
                    function_call=MagicMock(
                        name="create_purchase_order",
                        arguments='{"item_name": "chicken", "quantity": 10, "unit": "kg", "vendor_name": "Vendor A", "delivery_date": "2024-01-16"}'
                    )
                )
            )
        ]
    )

@pytest.fixture
def mock_openai_natural_response():
    """Mock OpenAI response for natural language generation"""
    return MagicMock(
        choices=[
            MagicMock(
                message=MagicMock(
                    content="I've successfully created a purchase order for 10kg of chicken from Vendor A, scheduled for delivery tomorrow."
                )
            )
        ]
    )

def test_health_endpoint():
    """Test health check endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy", "service": "agent-sumo"}

@patch('main.client.chat.completions.create')
@patch('httpx.AsyncClient.post')
def test_chat_endpoint_with_function_call(mock_http_post, mock_openai_create, mock_openai_response, mock_openai_natural_response):
    """Test chat endpoint with function calling"""
    # Mock OpenAI calls
    mock_openai_create.side_effect = [mock_openai_response, mock_openai_natural_response]
    
    # Mock external service response
    mock_http_response = MagicMock()
    mock_http_response.json.return_value = {"order_id": "PO-2024-001", "status": "created"}
    mock_http_response.raise_for_status.return_value = None
    mock_http_post.return_value = mock_http_response
    
    # Test request
    response = client.post(
        "/chat",
        json={"message": "Create a purchase order for 10kg chicken from Vendor A for tomorrow"}
    )
    
    assert response.status_code == 200
    data = response.json()
    assert "response" in data
    assert data["function_called"] == "create_purchase_order"
    assert data["parameters"]["item_name"] == "chicken"
    assert data["parameters"]["quantity"] == 10

@patch('main.client.chat.completions.create')
def test_chat_endpoint_without_function_call(mock_openai_create):
    """Test chat endpoint without function calling"""
    # Mock OpenAI response without function call
    mock_response = MagicMock(
        choices=[
            MagicMock(
                message=MagicMock(
                    content="I understand you want to create a purchase order. Please provide more details about the item, quantity, vendor, and delivery date."
                )
            )
        ]
    )
    mock_openai_create.return_value = mock_response
    
    response = client.post(
        "/chat",
        json={"message": "Hello, how are you?"}
    )
    
    assert response.status_code == 200
    data = response.json()
    assert "response" in data
    assert data["function_called"] is None
    assert data["parameters"] is None

def test_chat_endpoint_invalid_request():
    """Test chat endpoint with invalid request"""
    response = client.post(
        "/chat",
        json={"invalid_field": "test"}
    )
    
    assert response.status_code == 422

@patch('main.client.chat.completions.create')
def test_chat_endpoint_openai_error(mock_openai_create):
    """Test chat endpoint with OpenAI API error"""
    mock_openai_create.side_effect = Exception("OpenAI API error")
    
    response = client.post(
        "/chat",
        json={"message": "Create a purchase order"}
    )
    
    assert response.status_code == 500
    assert "Error processing request" in response.json()["detail"]

if __name__ == "__main__":
    pytest.main([__file__])
