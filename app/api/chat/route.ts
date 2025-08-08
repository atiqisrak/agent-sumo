import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message } = body

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Forward the message to the Python agent API
    const response = await fetch('http://localhost:8000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })

    if (!response.ok) {
      throw new Error(`Agent API responded with status: ${response.status}`)
    }

    const agentResponse = await response.json()

    return NextResponse.json({
      response: agentResponse.response,
      function_called: agentResponse.function_called,
      parameters: agentResponse.parameters,
    })
  } catch (error) {
    console.error('Error in chat API:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to process message',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
