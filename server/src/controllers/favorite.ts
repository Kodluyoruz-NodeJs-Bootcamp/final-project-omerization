import express from 'express';
import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Favorite } from "../entity/Favorite";



const router = express.Router();


interface IGetUserAuthInfoRequest extends Request {
    user?: String;
}

// create a new favorite 
export const createFavorite = async (req: IGetUserAuthInfoRequest, res: Response) => {

    const favoriteRepository = getRepository(Favorite);
    const info = req.body;
    const newFavorite = { ...info, owner: req.user }

    try {
        const result = await favoriteRepository.save(newFavorite);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}

// update a favorite with unique id
export const updateFavorite = async (req: IGetUserAuthInfoRequest, res: Response) => {
    const { favoriteId } = req.params;
    const favoriteRepository = getRepository(Favorite);
    const {name, image} = req.body;

 
    const favoriteToUpdate = await favoriteRepository.findOne({id:favoriteId});

    if(!favoriteToUpdate) return res.status(404).send(`No favorite with id: ${favoriteId}`);

    favoriteToUpdate.name  = name;
    favoriteToUpdate.image = image;
    try {
        const result = await favoriteRepository.save(favoriteToUpdate);
     
        res.status(200).json(result);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}

// delete a favorite with unique id
export const deleteFavorite = async (req: IGetUserAuthInfoRequest, res: Response) => {

    const { favoriteId } = req.params;
    const favoriteRepository = getRepository(Favorite);
    const favoriteToRemove = await favoriteRepository.findOne({id:favoriteId});
 
    try {
        await favoriteRepository.remove(favoriteToRemove as Favorite);
        res.status(200).json({ message: "Favorite deleted successfully." });
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}

// get all favorite movies of a user 
export const getUserFavoriteMovies = async (req: Request, res: Response) => { 

    const {userId} = req.params;
    const favoriteRepository = getRepository(Favorite);

    try {
        const userFavorites = await favoriteRepository.find({owner:userId, type:"movie"});
        res.status(200).json(userFavorites);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}

// get all favorite actor of a user 
export const getUserFavoriteActors = async (req: Request, res: Response) => { 

    const {userId} = req.params;
    const favoriteRepository = getRepository(Favorite);

    try {
        const userFavorites = await favoriteRepository.find({owner:userId, type:"actor"});
        res.status(200).json(userFavorites);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}

//get a favorite with unique id 
export const getFavoriteById = async (req: Request, res: Response) => { 

    const {favoriteId} = req.params;
    const favoriteRepository = getRepository(Favorite);

    try {
        const favorite = await favoriteRepository.findOne({id:favoriteId});
        res.status(200).json(favorite);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}


