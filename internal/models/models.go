package models

import (
	"time"

	"github.com/google/uuid"
)

// PurchaseOrder represents a purchase order
type PurchaseOrder struct {
	ID           string    `json:"id"`
	ItemName     string    `json:"item_name"`
	Quantity     float64   `json:"quantity"`
	Unit         string    `json:"unit"`
	VendorName   string    `json:"vendor_name"`
	DeliveryDate string    `json:"delivery_date"`
	TotalAmount  *float64  `json:"total_amount,omitempty"`
	Status       string    `json:"status"`
	CreatedAt    time.Time `json:"created_at"`
}

// InventoryItem represents an inventory item
type InventoryItem struct {
	ID          string    `json:"id"`
	Name        string    `json:"name"`
	Category    string    `json:"category"`
	Description *string   `json:"description,omitempty"`
	UnitPrice   float64   `json:"unit_price"`
	Supplier    *string   `json:"supplier,omitempty"`
	Status      string    `json:"status"`
	CreatedAt   time.Time `json:"created_at"`
}

// Requisition represents a requisition
type Requisition struct {
	ID          string    `json:"id"`
	ItemName    string    `json:"item_name"`
	Quantity    float64   `json:"quantity"`
	Unit        string    `json:"unit"`
	RequestedBy string    `json:"requested_by"`
	Department  string    `json:"department"`
	Priority    string    `json:"priority"`
	Status      string    `json:"status"`
	CreatedAt   time.Time `json:"created_at"`
}

// APIResponse represents a standard API response
type APIResponse struct {
	Status  string      `json:"status"`
	ID      string      `json:"id"`
	Message string      `json:"message,omitempty"`
	Data    interface{} `json:"data,omitempty"`
}

// GenerateID generates a unique ID for entities
func GenerateID() string {
	return uuid.New().String()[:8]
}
