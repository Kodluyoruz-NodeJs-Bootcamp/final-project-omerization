import {  Request, Response} from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getRepository } from "typeorm";
import { User } from "../entity/User";



const secret = 'speak friend, and enter';

export const signin = async (req:Request, res:Response) => {
  const { email, password } = req.body;

  const userRepository = getRepository(User);

  try {
    const oldUser = await userRepository.findOne({ email });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: oldUser.email, id: oldUser.id, firstName: oldUser.firstName,lastName: oldUser.lastName  }, secret, { expiresIn: "3h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};





export const signup = async (req:Request, res:Response) => {

  const { email,firstName,lastName, password } = req.body;
  const userRepository = getRepository(User);

  try {
    const oldUser = await userRepository.findOne({ email });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await userRepository.save({ email,firstName, lastName, password: hashedPassword });
    const token = jwt.sign( { email: result.email, id: result.id, firstName: result.firstName,lastName: result.lastName  }, secret, { expiresIn: "3h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};




export const googleSignIn = async (req:Request, res:Response) => {
  const { email, givenName, familyName, googleId } = req.body;
  const userRepository = getRepository(User);
  try {
    const oldUser = await userRepository.findOne({ googleId });

    if (oldUser){
      const token = jwt.sign( { email: oldUser.email, id: oldUser.id, firstName: oldUser.firstName,lastName: oldUser.lastName  }, secret, { expiresIn: "3h" } );
      res.status(201).json({ result: oldUser, token });
    } else{
      const result = await userRepository.save({ email, firstName:givenName, lastName:familyName, googleId });
      const token = jwt.sign( { email: result.email, id: result.id, firstName: result.firstName,lastName: result.lastName  }, secret, { expiresIn: "3h" } );
      res.status(201).json({ result, token });
    }

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const facebookSignIn = async (req:Request, res:Response) => {
  const { email, first_name, last_name, id } = req.body;
  const userRepository = getRepository(User);
  try {
    const oldUser = await userRepository.findOne({ facebookId:id });

    if (oldUser){
      const token = jwt.sign( { email: oldUser.email, id: oldUser.id, firstName: oldUser.firstName,lastName: oldUser.lastName  }, secret, { expiresIn: "3h" } );
      res.status(201).json({ result: oldUser, token });
    } else{
      const result = await userRepository.save({ email, firstName:first_name, lastName:last_name, facebookId:id });
      const token = jwt.sign( { email: result.email, id: result.id, firstName: result.firstName,lastName: result.lastName  }, secret, { expiresIn: "3h" } );
      res.status(201).json({ result, token });
    }

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};