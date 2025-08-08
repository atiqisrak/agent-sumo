import { NextRequest, NextResponse } from 'next/server'
import { makeApiRequest, buildQueryParams } from '@/app/lib/api-utils'

const INVENTORY_API_BASE_URL = 'http://188.166.232.67:5000/api/v1/items'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const result = await makeApiRequest(INVENTORY_API_BASE_URL, {
      method: 'POST',
      body: JSON.stringify(body),
    })

    if (!result.success) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Failed to create inventory item',
          details: result.details
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Inventory item created successfully',
      data: result.data,
    })
  } catch (error) {
    console.error('Error creating inventory item:', error)
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to create inventory item',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const queryParams = buildQueryParams({
      page: searchParams.get('page') || '1',
      limit: searchParams.get('limit') || '10',
      search: searchParams.get('search') || '',
      status: searchParams.get('status') || '',
      category_id: searchParams.get('category_id') || '',
      supplier_id: searchParams.get('supplier_id') || '',
    })

    const url = `${INVENTORY_API_BASE_URL}?${queryParams}`

    const result = await makeApiRequest(url, {
      method: 'GET',
    })

    if (!result.success) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Failed to fetch inventory items',
          details: result.details
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Inventory items retrieved successfully',
      data: result.data,
    })
  } catch (error) {
    console.error('Error fetching inventory items:', error)
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch inventory items',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
