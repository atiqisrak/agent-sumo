package main

import (
	"log"
	"os"

	"sumo-core/internal/handlers"
	"sumo-core/internal/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	// Set Gin mode
	gin.SetMode(gin.ReleaseMode)

	// Create Gin router
	router := gin.Default()

	// Initialize handlers
	purchaseOrderHandler := handlers.NewPurchaseOrderHandler()
	inventoryItemHandler := handlers.NewInventoryItemHandler()
	requisitionHandler := handlers.NewRequisitionHandler()

	// Setup routes
	routes.SetupRoutes(router, purchaseOrderHandler, inventoryItemHandler, requisitionHandler)

	// Get port from environment or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "3002"
	}

	// Start server
	log.Printf("Starting sumo-core server on port %s", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
