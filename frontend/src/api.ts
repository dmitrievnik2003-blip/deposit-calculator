import type { CalculateRequest, CalculateResponse } from './types';

const API_BASE_URL = 'http://localhost:8080';

export class ApiError extends Error {
  constructor(message: string, public fieldErrors?: Record<string, string>) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function calculateDeposit(
  request: CalculateRequest,
): Promise<CalculateResponse> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}/api/calculate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });
  } catch {
    throw new ApiError('Не удалось связаться с сервером. Проверьте, что backend запущен.');
  }

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    if (body && typeof body === 'object') {
      throw new ApiError('Проверьте введённые данные', body as Record<string, string>);
    }
    throw new ApiError('Сервер вернул ошибку. Попробуйте ещё раз.');
  }

  return response.json();
}
