import { Platform } from 'react-native';

// Android emulator uses 10.0.2.2 to reach host machine's localhost
// iOS simulator uses localhost directly
// For physical device, use your computer's local IP address
const BASE_URL = Platform.select({
  android: 'http://10.146.29.237:5000',
  ios: 'http://10.146.29.237:5000',
  default: 'http://10.146.29.237:5000',
});

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
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

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
    // Return a failed response that local slice can handle gracefully
    return {
      success: false,
      message: 'Could not connect to server. Data saved locally.',
    };
  }
}
