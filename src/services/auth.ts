/* eslint-disable prettier/prettier */

interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  }
}


export function signIn(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'asofhhspdfhhdpfdtpvasghpdhgsudyg089wr7we98ewfdh',
        user: {
          name: 'Gustavo',
          email: 'samtapes48@gmail.com',
        },
      });
    }, 2000);
  });
}
