import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import * as jwksClient from 'jwks-rsa';
import { config } from './config';
import { UserNotAuthenticatedError } from './errors';
import { logger } from './logger';

// TODO should I log here even? since I throw erros and catch them in the error handler
// logging the errors here might be redundant. throwing the errors should be enough

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
          logger.info('token verified...');
          if (checkRoles(verifiedData as jwt.JwtPayload, scopes)) {
            logger.info('user has the required roles...');
            resolve(verifiedData);
          } else {
            reject(
              new UserNotAuthenticatedError(
                'User does not have the required role'
              )
            );
          }
        })
        .catch((error) => {
          // Reject the new promise with the error from verifyJwt
          reject(new UserNotAuthenticatedError(error.message));
        });
    });
  }
  return Promise.reject(
    new UserNotAuthenticatedError('Unsupported security name')
  );
}

// Initialize a JSON Web Key Set (JWKS) client with Keycloak's public key endpoint
// TODO make this call only once maybe?
const jwksUri = config.auth.certsUrl;
const client = new jwksClient.JwksClient({
  jwksUri,
});

// Verify and decode the JWT token
const verifyJwt = async (token: string) => {
  if (!token) {
    throw new UserNotAuthenticatedError('No token provided');
  }

  const newToken = token.substring(7, token.length);
  const decoded = jwt.decode(newToken, { complete: true });

  if (!decoded || !decoded.header || !decoded.header.kid) {
    throw new UserNotAuthenticatedError('Invalid token format');
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
    throw new UserNotAuthenticatedError(
      'JWT verification failed: ' + error.message
    );
  }
};

function checkRoles(token: jwt.JwtPayload, scopes: string[]) {
  return scopes.every((scope) => token.realm_access?.roles?.includes(scope));
}

export function getEmailFromToken(verifiedData: jwt.JwtPayload) {
  logger.debug('getEmailFromToken', verifiedData);
  return 'hier das hat geklappt';
}
