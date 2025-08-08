import os
import json
import httpx
from typing import Dict, Any, List, Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Agent Sumo", description="AI Agent with OpenAI Function Calling")

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# External service base URL
EXTERNAL_SERVICE_URL = os.getenv("EXTERNAL_SERVICE_URL", "http://localhost:3002")

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str
    function_called: Optional[str] = None
    parameters: Optional[Dict[str, Any]] = None

# Function definitions for OpenAI
FUNCTIONS = [
    {
        "type": "function",
        "function": {
            "name": "create_purchase_order",
            "description": "Create a new purchase order with specified items, quantity, vendor, and delivery date",
            "parameters": {
                "type": "object",
                "properties": {
                    "item_name": {
                        "type": "string",
                        "description": "Name of the item to purchase"
                    },
                    "quantity": {
                        "type": "number",
                        "description": "Quantity of the item to purchase"
                    },
                    "unit": {
                        "type": "string",
                        "description": "Unit of measurement (kg, pieces, etc.)"
                    },
                    "vendor_name": {
                        "type": "string",
                        "description": "Name of the vendor/supplier"
                    },
                    "delivery_date": {
                        "type": "string",
                        "description": "Expected delivery date (YYYY-MM-DD format)"
                    },
                    "total_amount": {
                        "type": "number",
                        "description": "Total amount for the purchase order"
                    }
                },
                "required": ["item_name", "quantity", "unit", "vendor_name", "delivery_date"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "create_inventory_item",
            "description": "Create a new inventory item with specifications",
            "parameters": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "description": "Name of the inventory item"
                    },
                    "category": {
                        "type": "string",
                        "description": "Category of the item (e.g., food, electronics, etc.)"
                    },
                    "description": {
                        "type": "string",
                        "description": "Description of the item"
                    },
                    "unit_price": {
                        "type": "number",
                        "description": "Price per unit"
                    },
                    "supplier": {
                        "type": "string",
                        "description": "Primary supplier for this item"
                    }
                },
                "required": ["name", "category", "unit_price"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "get_inventory_status",
            "description": "Get current inventory status for specific items",
            "parameters": {
                "type": "object",
                "properties": {
                    "item_names": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": "List of item names to check inventory for"
                    }
                },
                "required": ["item_names"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "create_sales_order",
            "description": "Create a new sales order",
            "parameters": {
                "type": "object",
                "properties": {
                    "customer_name": {
                        "type": "string",
                        "description": "Name of the customer"
                    },
                    "items": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "item_name": {"type": "string"},
                                "quantity": {"type": "number"},
                                "unit_price": {"type": "number"}
                            },
                            "required": ["item_name", "quantity", "unit_price"]
                        },
                        "description": "List of items in the sales order"
                    },
                    "delivery_date": {
                        "type": "string",
                        "description": "Expected delivery date (YYYY-MM-DD format)"
                    }
                },
                "required": ["customer_name", "items", "delivery_date"]
            }
        }
    }
]

async def call_external_service(endpoint: str, data: Dict[str, Any]) -> Dict[str, Any]:
    """Call external Go service endpoint"""
    async with httpx.AsyncClient() as http_client:
        try:
            response = await http_client.post(
                f"{EXTERNAL_SERVICE_URL}/{endpoint}",
                json=data,
                timeout=30.0
            )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=f"External service error: {e.response.text}")
        except httpx.RequestError as e:
            raise HTTPException(status_code=503, detail=f"External service unavailable: {str(e)}")

async def create_purchase_order(item_name: str, quantity: float, unit: str, vendor_name: str, delivery_date: str, total_amount: Optional[float] = None) -> Dict[str, Any]:
    """Create a purchase order via external service"""
    data = {
        "item_name": item_name,
        "quantity": quantity,
        "unit": unit,
        "vendor_name": vendor_name,
        "delivery_date": delivery_date
    }
    if total_amount:
        data["total_amount"] = total_amount
    
    return await call_external_service("purchase-orders", data)

async def create_inventory_item(name: str, category: str, unit_price: float, description: Optional[str] = None, supplier: Optional[str] = None) -> Dict[str, Any]:
    """Create an inventory item via external service"""
    data = {
        "name": name,
        "category": category,
        "unit_price": unit_price
    }
    if description:
        data["description"] = description
    if supplier:
        data["supplier"] = supplier
    
    return await call_external_service("inventory-items", data)

async def get_inventory_status(item_names: List[str]) -> Dict[str, Any]:
    """Get inventory status via external service"""
    data = {"item_names": item_names}
    return await call_external_service("inventory-status", data)

async def create_sales_order(customer_name: str, items: List[Dict[str, Any]], delivery_date: str) -> Dict[str, Any]:
    """Create a sales order via external service"""
    data = {
        "customer_name": customer_name,
        "items": items,
        "delivery_date": delivery_date
    }
    return await call_external_service("sales-orders", data)

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Main chat endpoint that processes user queries using OpenAI"""
    
    try:
        # Call OpenAI for a simple response
        response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {
                    "role": "system",
                    "content": "You are an AI assistant that helps with business operations. You can help with creating purchase orders, managing inventory, and processing requisitions. Be helpful and informative."
                },
                {
                    "role": "user",
                    "content": request.message
                }
            ]
        )
        
        message = response.choices[0].message
        
        return ChatResponse(response=message.content)
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "service": "agent-sumo"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
