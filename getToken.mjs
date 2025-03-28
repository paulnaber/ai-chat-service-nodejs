import { execSync } from 'child_process';
import fetch from 'node-fetch';
import readline from 'readline';

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

    console.log('Access Token:', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Error fetching access token:', error);
    return null;
  }
}

async function main() {
  const accessToken = await getAccessToken();
  if (!accessToken) return;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(
    'Do you want to copy the token to the clipboard? (y/N) ',
    (answer) => {
      if (answer.toLowerCase() === 'y') {
        try {
          execSync(`echo "${accessToken}" | pbcopy`); // macOS
          // execSync(`echo "${accessToken}" | clip`); // Windows
          // execSync(`echo "${accessToken}" | xclip -selection clipboard`); // Linux
          console.log('Token copied to clipboard!');
        } catch (error) {
          console.error('Failed to copy to clipboard:', error);
        }
      }
      rl.close();
    }
  );
}

if (import.meta.url === new URL(import.meta.url, import.meta.url).href) {
  main();
}
