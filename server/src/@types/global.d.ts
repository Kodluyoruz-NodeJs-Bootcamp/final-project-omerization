interface JwtPayload {
  name: string;
  exp: number;
  user?: object;
  id: string;
}


export interface IGetUserAuthInfoRequest extends Request {
  userId?: String;
}