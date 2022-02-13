import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = 'speak friend, and enter';


interface IGetUserAuthInfoRequest extends Request {
  user?: String | Function;
  userName?: String | Function;
}

interface JwtPayload {
  name: string;
  exp: number;
  user?: object;
  id: string;
  firstName: string;
  lastName: string;
}


const auth = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  try {

    const token = <string>req.headers.authorization?.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret) as JwtPayload;

      req.user = decodedData?.id;
      req.userName = decodedData?.firstName + " " + decodedData?.lastName;
    } else {
      decodedData = jwt.decode(token);
      req.user = decodedData?.sub;
    }

    next();
  } catch (error) {
    res.status(403).send("Authentication failed");
  }
};

export default auth;