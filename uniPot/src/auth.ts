import { sign, SignOptions, verify } from 'jsonwebtoken';

const PRIVATE_KEY = 'PRIVATE_KEY';

interface TokenPayload {
  exp: number;
  accessTypes: string[];
  name: string;
  userId: number;
}

export const validateToken = (token: string) => {

  return new Promise((resolve, reject) => {
    verify(token, PRIVATE_KEY, (error, decoded) => {
      if (error) return reject(error);

      resolve(decoded);
    })
  });
}
export const generateToken = async () => {
  const payload = {
    name: 'Usuário da API',
    userId: 123,
    accessTypes: [
      'getExtrato'
    ]
  };
  const signInOptions: SignOptions = {
    // RS256 uses a public/private key pair. The API provides the private key
    // to generate the JWT. The client gets a public key to validate the
    // signature
    algorithm: 'HS256',
    expiresIn: '20000',// 20 seg
    allowInvalidAsymmetricKeyTypes: true,
  };
  // generate JWT
  return sign(payload, PRIVATE_KEY, signInOptions);
}