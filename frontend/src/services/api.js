
const API_BASE_URL = 'http://127.0.0.1:8000';

export async function getCreditAssessment(formData) {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ formData }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.detail || 'Unable to generate the credit assessment.'
    );
  }

  return result;
}
