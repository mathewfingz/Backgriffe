export type AppError = {
  code: string
  message: string
  details?: unknown
}

export function errorResponse(code: string, message: string, details?: unknown){
  return Response.json({ code, message, details }, { status: code.startsWith('VAL_') ? 400 : 500 })
}

