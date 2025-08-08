export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  error?: string
  details?: string
}

export async function makeApiRequest<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(`API responded with status: ${response.status} - ${JSON.stringify(errorData)}`)
    }

    const data = await response.json()
    return {
      success: true,
      data,
    }
  } catch (error) {
    console.error(`Error making API request to ${url}:`, error)
    return {
      success: false,
      error: 'Failed to make API request',
      details: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

export function buildQueryParams(params: Record<string, string | number | undefined>): string {
  const queryParams = new URLSearchParams()
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, String(value))
    }
  })
  
  return queryParams.toString()
}
