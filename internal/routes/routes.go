package routes

import (
	"sumo-core/internal/handlers"

	"github.com/gin-gonic/gin"
)

// SetupRoutes configures all API routes
func SetupRoutes(
	router *gin.Engine,
	purchaseOrderHandler *handlers.PurchaseOrderHandler,
	inventoryItemHandler *handlers.InventoryItemHandler,
	requisitionHandler *handlers.RequisitionHandler,
) {
	// Health check endpoint
	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "healthy",
			"service": "sumo-core",
		})
	})

	// API v1 routes
	v1 := router.Group("/v1")
	{
		// Purchase Orders
		v1.POST("/purchase-orders", purchaseOrderHandler.CreatePurchaseOrder)
		
		// Inventory Items
		v1.POST("/inventory-items", inventoryItemHandler.CreateInventoryItem)
		
		// Requisitions
		v1.POST("/requisitions", requisitionHandler.CreateRequisition)
	}

	// Root endpoint for backward compatibility
	router.POST("/purchase-orders", purchaseOrderHandler.CreatePurchaseOrder)
	router.POST("/inventory-items", inventoryItemHandler.CreateInventoryItem)
	router.POST("/requisitions", requisitionHandler.CreateRequisition)
}
