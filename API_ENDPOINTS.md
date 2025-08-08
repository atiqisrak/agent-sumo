# API Endpoints Documentation

This document describes the API endpoints available in the agent-sumo application.

## Inventory Items API

### Base URL

`/api/inventory-items`

### Endpoints

#### POST /api/inventory-items

Creates a new inventory item by forwarding the request to the external inventory API.

**Request Body:**

```json
{
  "name": "filling",
  "supplier_id": 1,
  "type_id": 5,
  "category_id": 5,
  "location_id": 1,
  "description": "Mango pie filling used in cake and bakery items.",
  "unit": "kg",
  "image_urls": ["https://example.com/images/mango-pie-filling.jpg"],
  "stock_quantity": 100,
  "min_stock": 30,
  "max_stock": 200,
  "expiry_date": "2025-12-31T00:00:00.000Z",
  "cost_per_unit": 25,
  "last_restocked": "2025-06-01T12:00:00.000Z",
  "shelf_life": 12,
  "storage_conditions": "Cool and dry place",
  "temperature_range": "10-25°C",
  "humidity_range": "30-60%",
  "status": "active",
  "batch_tracking_enabled": true,
  "note": "Used in desserts or fillings",
  "tag_ids": [1, 2]
}
```

**Response:**

```json
{
  "success": true,
  "message": "Inventory item created successfully",
  "data": { ... }
}
```

#### GET /api/inventory-items

Retrieves inventory items with optional filtering and pagination.

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search term
- `status` (optional): Filter by status
- `category_id` (optional): Filter by category ID
- `supplier_id` (optional): Filter by supplier ID

**Response:**

```json
{
  "success": true,
  "message": "Inventory items retrieved successfully",
  "data": { ... }
}
```

## Requisitions API

### Base URL

`/api/requisitions`

### Endpoints

#### POST /api/requisitions

Creates a new requisition by forwarding the request to the external requisitions API.

**Request Body:**

```json
{
  "rq_number": "RQ-2025-001",
  "source_location_id": 1,
  "created_by": 1,
  "status": "pending",
  "requester_id": 1,
  "requested_date": "2025-01-01",
  "date_expected": "2025-01-05",
  "notes": "Urgent materials needed",
  "items": [
    {
      "product_id": 1,
      "requested_quantity": 10
    }
  ]
}
```

**Response:**

```json
{
  "success": true,
  "message": "Requisition created successfully",
  "data": { ... }
}
```

#### GET /api/requisitions

Retrieves requisitions with optional filtering, sorting, and pagination.

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search term
- `status` (optional): Filter by status
- `source_location_id` (optional): Filter by source location ID
- `date_from` (optional): Filter by start date
- `date_to` (optional): Filter by end date
- `sortBy` (optional): Sort field (default: created_at)
- `sortOrder` (optional): Sort order - asc/desc (default: desc)

**Response:**

```json
{
  "success": true,
  "message": "Requisitions retrieved successfully",
  "data": { ... }
}
```

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Error message",
  "details": "Detailed error information"
}
```

## External API Endpoints

### Inventory Items

- **Base URL:** `http://188.166.232.67:5000/api/v1/items`
- **Methods:** GET, POST

### Requisitions

- **Base URL:** `https://sumo.ethertech.ltd/api/requisitions`
- **Methods:** GET, POST

## Usage Examples

### Creating an Inventory Item

```javascript
const response = await fetch("/api/inventory-items", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "filling",
    supplier_id: 1,
    type_id: 5,
    category_id: 5,
    location_id: 1,
    description: "Mango pie filling used in cake and bakery items.",
    unit: "kg",
    stock_quantity: 100,
    min_stock: 30,
    max_stock: 200,
    expiry_date: "2025-12-31T00:00:00.000Z",
    cost_per_unit: 25,
    status: "active",
    // ... other fields
  }),
});

const result = await response.json();
```

### Creating a Requisition

```javascript
const response = await fetch("/api/requisitions", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    rq_number: "RQ-2025-001",
    source_location_id: 1,
    created_by: 1,
    status: "pending",
    requester_id: 1,
    requested_date: "2025-01-01",
    date_expected: "2025-01-05",
    notes: "Urgent materials needed",
    items: [
      {
        product_id: 1,
        requested_quantity: 10,
      },
    ],
  }),
});

const result = await response.json();
```
