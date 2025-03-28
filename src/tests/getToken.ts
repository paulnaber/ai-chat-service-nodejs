const url =
  'http://localhost:8080/realms/my-test-realm/protocol/openid-connect/token';

const body = new URLSearchParams({
  grant_type: 'password',
  username: 'admin',
  password: 'admin',
  client_id: 'my-test-client',
  scope: 'openid profile microprofile-jwt email',
});

export async function getAccessToken() {
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: body,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const data = await response.json();
    const accessToken = data.access_token;

    if (!accessToken) {
      throw new Error('Failed to retrieve access token');
    }

    return accessToken;
  } catch (error) {
    console.error('Error fetching access token:', error);
    return null;
  }
}
