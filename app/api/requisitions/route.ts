import { NextRequest, NextResponse } from 'next/server'
import { makeApiRequest, buildQueryParams } from '@/app/lib/api-utils'

const REQUISITIONS_API_BASE_URL = 'https://sumo.ethertech.ltd/api/requisitions'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const result = await makeApiRequest(REQUISITIONS_API_BASE_URL, {
      method: 'POST',
      body: JSON.stringify(body),
    })

    if (!result.success) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Failed to create requisition',
          details: result.details
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Requisition created successfully',
      data: result.data,
    })
  } catch (error) {
    console.error('Error creating requisition:', error)
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to create requisition',
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
      source_location_id: searchParams.get('source_location_id') || '',
      date_from: searchParams.get('date_from') || '',
      date_to: searchParams.get('date_to') || '',
      sortBy: searchParams.get('sortBy') || 'created_at',
      sortOrder: searchParams.get('sortOrder') || 'desc',
    })

    const url = `${REQUISITIONS_API_BASE_URL}?${queryParams}`

    const result = await makeApiRequest(url, {
      method: 'GET',
    })

    if (!result.success) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Failed to fetch requisitions',
          details: result.details
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Requisitions retrieved successfully',
      data: result.data,
    })
  } catch (error) {
    console.error('Error fetching requisitions:', error)
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch requisitions',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
