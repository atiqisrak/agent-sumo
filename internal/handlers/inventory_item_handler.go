package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"sumo-core/internal/models"

	"github.com/gin-gonic/gin"
)

type InventoryItemHandler struct{}

func NewInventoryItemHandler() *InventoryItemHandler {
	return &InventoryItemHandler{}
}

// CreateInventoryItem handles POST /inventory-items
func (h *InventoryItemHandler) CreateInventoryItem(c *gin.Context) {
	var requestBody map[string]interface{}
	
	// Read and log the request body
	if err := c.ShouldBindJSON(&requestBody); err != nil {
		log.Printf("Error binding JSON: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}

	// Log the request body
	requestJSON, _ := json.MarshalIndent(requestBody, "", "  ")
	log.Printf("Inventory Item Request Body:\n%s", string(requestJSON))

	// Extract data from request
	name, _ := requestBody["name"].(string)
	category, _ := requestBody["category"].(string)
	unitPrice, _ := requestBody["unit_price"].(float64)
	
	var description *string
	if descVal, exists := requestBody["description"]; exists {
		if desc, ok := descVal.(string); ok {
			description = &desc
		}
	}
	
	var supplier *string
	if supplierVal, exists := requestBody["supplier"]; exists {
		if supp, ok := supplierVal.(string); ok {
			supplier = &supp
		}
	}

	// Create mock inventory item
	inventoryItem := models.InventoryItem{
		ID:          models.GenerateID(),
		Name:        name,
		Category:    category,
		Description: description,
		UnitPrice:   unitPrice,
		Supplier:    supplier,
		Status:      "active",
		CreatedAt:   time.Now(),
	}

	// Create response
	response := models.APIResponse{
		Status: "success",
		ID:     inventoryItem.ID,
		Data:   inventoryItem,
	}

	log.Printf("Inventory Item Created: %s", inventoryItem.ID)
	c.JSON(http.StatusCreated, response)
}
