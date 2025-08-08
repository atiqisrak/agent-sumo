package handlers

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"sumo-core/internal/models"

	"github.com/gin-gonic/gin"
)

type RequisitionHandler struct{}

func NewRequisitionHandler() *RequisitionHandler {
	return &RequisitionHandler{}
}

// CreateRequisition handles POST /requisitions
func (h *RequisitionHandler) CreateRequisition(c *gin.Context) {
	var requestBody map[string]interface{}
	
	// Read and log the request body
	if err := c.ShouldBindJSON(&requestBody); err != nil {
		log.Printf("Error binding JSON: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid JSON"})
		return
	}

	// Log the request body
	requestJSON, _ := json.MarshalIndent(requestBody, "", "  ")
	log.Printf("Requisition Request Body:\n%s", string(requestJSON))

	// Extract data from request
	itemName, _ := requestBody["item_name"].(string)
	quantity, _ := requestBody["quantity"].(float64)
	unit, _ := requestBody["unit"].(string)
	requestedBy, _ := requestBody["requested_by"].(string)
	department, _ := requestBody["department"].(string)
	priority, _ := requestBody["priority"].(string)

	// Create mock requisition
	requisition := models.Requisition{
		ID:          models.GenerateID(),
		ItemName:    itemName,
		Quantity:    quantity,
		Unit:        unit,
		RequestedBy: requestedBy,
		Department:  department,
		Priority:    priority,
		Status:      "pending",
		CreatedAt:   time.Now(),
	}

	// Create response
	response := models.APIResponse{
		Status: "success",
		ID:     requisition.ID,
		Data:   requisition,
	}

	log.Printf("Requisition Created: %s", requisition.ID)
	c.JSON(http.StatusCreated, response)
}
