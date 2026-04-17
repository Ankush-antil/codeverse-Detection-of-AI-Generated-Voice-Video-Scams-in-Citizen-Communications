// Production: Render deployed backend
const BASE_URL = 'https://ai-rakshak-server.onrender.com';

interface RegisterData {
  name: string;
  mobile: string;
  language?: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    mobile: string;
    language: string;
    registeredAt: string;
  };
}

export async function registerUserAPI(data: RegisterData): Promise<RegisterResponse> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    const response = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      signal: controller.signal as any,
    });
    
    clearTimeout(timeoutId);
    const result: RegisterResponse = await response.json();
    return result;
  } catch (error) {
    console.warn('API Error fallback (Server unreachable or timed out):', error);
    return {
      success: false,
      message: 'Could not connect to server. Data saved locally.',
    };
  }
}
