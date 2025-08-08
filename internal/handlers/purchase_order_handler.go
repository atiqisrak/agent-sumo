package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"sumo-core/internal/models"

	"github.com/gin-gonic/gin"
)

type PurchaseOrderHandler struct{}

func NewPurchaseOrderHandler() *PurchaseOrderHandler {
	return &PurchaseOrderHandler{}
}

// CreatePurchaseOrder handles POST /purchase-orders
func (h *PurchaseOrderHandler) CreatePurchaseOrder(c *gin.Context) {
	var requestBody map[string]interface{}
	
	// Read and log the request body
	if err := c.ShouldBindJSON(&requestBody); err != nil {
		log.Printf("Error binding JSON: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}

	// Log the request body
	requestJSON, _ := json.MarshalIndent(requestBody, "", "  ")
	log.Printf("Purchase Order Request Body:\n%s", string(requestJSON))

	// Extract data from request
	itemName, _ := requestBody["item_name"].(string)
	quantity, _ := requestBody["quantity"].(float64)
	unit, _ := requestBody["unit"].(string)
	vendorName, _ := requestBody["vendor_name"].(string)
	deliveryDate, _ := requestBody["delivery_date"].(string)
	
	var totalAmount *float64
	if totalAmountVal, exists := requestBody["total_amount"]; exists {
		if val, ok := totalAmountVal.(float64); ok {
			totalAmount = &val
		}
	}

	// Create mock purchase order
	purchaseOrder := models.PurchaseOrder{
		ID:           models.GenerateID(),
		ItemName:     itemName,
		Quantity:     quantity,
		Unit:         unit,
		VendorName:   vendorName,
		DeliveryDate: deliveryDate,
		TotalAmount:  totalAmount,
		Status:       "created",
		CreatedAt:    time.Now(),
	}

	// Create response
	response := models.APIResponse{
		Status: "success",
		ID:     purchaseOrder.ID,
		Data:   purchaseOrder,
	}

	log.Printf("Purchase Order Created: %s", purchaseOrder.ID)
	c.JSON(http.StatusCreated, response)
}
