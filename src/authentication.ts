import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes: string[]
): Promise<any> {
  if (securityName === 'BearerAuth') {
    const token =
      request.body.token ||
      request.query.token ||
      request.headers['authorization'];
    return new Promise((resolve, reject) => {
      verifyJwt(token)
        .then((verifiedData) => {
          // Resolve the new promise with the result of verifyJwt
          console.warn('token verified...', verifiedData);
          if (checkRoles(verifiedData as jwt.JwtPayload, scopes)) {
            console.warn('user has the required roles...');
            resolve(verifiedData);
          } else {
            reject(new Error('User does not have the required role'));
          }
        })
        .catch((error) => {
          // Reject the new promise with the error from verifyJwt
          reject(new Error(error.message));
        });
    });
  }
  return Promise.reject(new Error('Unsupported security name'));
}

// Initialize a JSON Web Key Set (JWKS) client with Keycloak's public key endpoint
// TODO make this call only once maybe?
const jwksUri = '.../auth/realms/master/protocol/openid-connect/certs';
const client = new jwksClient.JwksClient({
  jwksUri,
});

// Verify and decode the JWT token
const verifyJwt = async (token: string) => {
  if (!token) {
    throw new Error('No token provided');
  }

  const newToken = token.substring(7, token.length);
  // const newToken = "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJQQXVqcHNJaEwteHdmeVNqUGNMYVVJTjA2WVYwdXF1bXN2WXB5YkF5TnB3In0.eyJleHAiOjE2OTkxMDQ0MTIsImlhdCI6MTY5OTEwNDI5MiwiYXV0aF90aW1lIjoxNjk5MTA0MjkyLCJqdGkiOiI4YjhhYjRlNy04M2RjLTQ2YTEtODczZS1iMGI3MDY4YzljN2UiLCJpc3MiOiJodHRwczovL2F1dGgubTJtZ2F0ZS5kZXYvYXV0aC9yZWFsbXMvbWFzdGVyIiwiYXVkIjpbImJ1cmctcmVhbG0iLCJibHVtX3Rlc3QtcmVhbG0iLCJkZXZvcHNfbWV0cmljcyIsImludGVncmF0aW9uLXRlc3RzLXJlYWxtIiwiTTJNR2F0ZS1yZWFsbSIsIm1hc3Rlci1yZWFsbSIsImFjY291bnQiXSwic3ViIjoiNGViMTM4MjQtNDYyMC00YjMyLTk3ZTktZmM4Mjk0MTJjNGEzIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiZGFydHMtY2xpZW50Iiwibm9uY2UiOiJlRjl3WTNSZlZWSm9kSEpDWldkUU1HOWFhemQxVG1KMVdqSjZlVTlmZWtKeGZrOWpiMlZNYnpFeFJXeHYiLCJzZXNzaW9uX3N0YXRlIjoiYTM4NzQwMTItZGI3Ny00YjAxLWI1MTUtNmYxY2UzNzA2ZDljIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJjcmVhdGUtcmVhbG0iLCJkZWZhdWx0LXJvbGVzLW1hc3RlciIsImRldm9wIiwib2ZmbGluZV9hY2Nlc3MiLCJhZG1pbiIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYnVyZy1yZWFsbSI6eyJyb2xlcyI6WyJ2aWV3LXJlYWxtIiwidmlldy1pZGVudGl0eS1wcm92aWRlcnMiLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyJdfSwiYmx1bV90ZXN0LXJlYWxtIjp7InJvbGVzIjpbInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwidmlldy1yZWFsbSIsIm1hbmFnZS1pZGVudGl0eS1wcm92aWRlcnMiLCJpbXBlcnNvbmF0aW9uIiwiY3JlYXRlLWNsaWVudCIsIm1hbmFnZS11c2VycyIsInF1ZXJ5LXJlYWxtcyIsInZpZXctYXV0aG9yaXphdGlvbiIsInF1ZXJ5LWNsaWVudHMiLCJxdWVyeS11c2VycyIsIm1hbmFnZS1ldmVudHMiLCJtYW5hZ2UtcmVhbG0iLCJ2aWV3LWV2ZW50cyIsInZpZXctdXNlcnMiLCJ2aWV3LWNsaWVudHMiLCJtYW5hZ2UtYXV0aG9yaXphdGlvbiIsIm1hbmFnZS1jbGllbnRzIiwicXVlcnktZ3JvdXBzIl19LCJkZXZvcHNfbWV0cmljcyI6eyJyb2xlcyI6WyJhZG1pbiJdfSwiaW50ZWdyYXRpb24tdGVzdHMtcmVhbG0iOnsicm9sZXMiOlsidmlldy1yZWFsbSIsInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sIk0yTUdhdGUtcmVhbG0iOnsicm9sZXMiOlsidmlldy1yZWFsbSIsInZpZXctaWRlbnRpdHktcHJvdmlkZXJzIiwibWFuYWdlLWlkZW50aXR5LXByb3ZpZGVycyIsImltcGVyc29uYXRpb24iLCJjcmVhdGUtY2xpZW50IiwibWFuYWdlLXVzZXJzIiwicXVlcnktcmVhbG1zIiwidmlldy1hdXRob3JpemF0aW9uIiwicXVlcnktY2xpZW50cyIsInF1ZXJ5LXVzZXJzIiwibWFuYWdlLWV2ZW50cyIsIm1hbmFnZS1yZWFsbSIsInZpZXctZXZlbnRzIiwidmlldy11c2VycyIsInZpZXctY2xpZW50cyIsIm1hbmFnZS1hdXRob3JpemF0aW9uIiwibWFuYWdlLWNsaWVudHMiLCJxdWVyeS1ncm91cHMiXX0sIm1hc3Rlci1yZWFsbSI6eyJyb2xlcyI6WyJ2aWV3LWlkZW50aXR5LXByb3ZpZGVycyIsInZpZXctcmVhbG0iLCJtYW5hZ2UtaWRlbnRpdHktcHJvdmlkZXJzIiwiaW1wZXJzb25hdGlvbiIsImNyZWF0ZS1jbGllbnQiLCJtYW5hZ2UtdXNlcnMiLCJxdWVyeS1yZWFsbXMiLCJ2aWV3LWF1dGhvcml6YXRpb24iLCJxdWVyeS1jbGllbnRzIiwicXVlcnktdXNlcnMiLCJtYW5hZ2UtZXZlbnRzIiwibWFuYWdlLXJlYWxtIiwidmlldy1ldmVudHMiLCJ2aWV3LXVzZXJzIiwidmlldy1jbGllbnRzIiwibWFuYWdlLWF1dGhvcml6YXRpb24iLCJtYW5hZ2UtY2xpZW50cyIsInF1ZXJ5LWdyb3VwcyJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgcHJvZmlsZSBlbWFpbCIsInNpZCI6ImEzODc0MDEyLWRiNzctNGIwMS1iNTE1LTZmMWNlMzcwNmQ5YyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiQWRtaW4gVXNlciIsInByZWZlcnJlZF91c2VybmFtZSI6ImFkbWluIiwiZ2l2ZW5fbmFtZSI6IkFkbWluIiwibG9jYWxlIjoiZGUiLCJmYW1pbHlfbmFtZSI6IlVzZXIiLCJlbWFpbCI6ImFkbWluQG0ybWdhdGUuZGV2In0.TJV-J0zm33VXeADaFnAUomaSc1YVFbDmfXoBRYipNigyrbXS9wSnHmgyizXmPVzvgpjEgYMgUZ-ktkr8TTCMgsCKZXw_C5yPK4vqmMBRnh67iZUOaUttZyqx0wTJTBALrbhy7WRZJ2sNU-5I2ju8xO7OfWCV8WRRcjb4nW3iN-sWS62IAgks_LRzCQ4vyTOHkXmP-QQahpbwcNJcF9355NU7r55qZUAGVXs0VnV19JvPY3SR9oDvlNty-r6iHCBGKbKrBGYhBfPwJ_5-CBOZ9mTgbxfZBThjAb9s95bDAhlssfZVx3uTN-ElPag-_zG9qnGaPV0o4n6H9koSK12ncwdf"
  const decoded = jwt.decode(newToken, { complete: true });

  if (!decoded || !decoded.header || !decoded.header.kid) {
    throw new Error('Invalid token format');
  }

  const kid = decoded.header.kid;

  const key = await new Promise<any>((resolve, reject) => {
    client.getSigningKey(kid, (err, key) => {
      if (err) {
        reject(err);
      }
      resolve(key?.getPublicKey());
    });
  });

  // Verify the token with the public key
  try {
    const verified = jwt.verify(newToken, key, { algorithms: ['RS256'] });
    return verified;
  } catch (error: any) {
    throw new Error('JWT verification failed: ' + error.message);
  }
};

function checkRoles(token: jwt.JwtPayload, scopes: string[]) {
  return scopes.every((scope) => token.realm_access?.roles?.includes(scope));
}
