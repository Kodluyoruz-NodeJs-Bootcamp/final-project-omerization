import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Favorite } from "../entity/Favorite";



interface IGetUserAuthInfoRequest extends Request {
    user?: String | Function;
    userName?: String | Function;
}

//check if current user is the owner of favorite
const isFavoriteOwner = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const { favoriteId } = req.params;
    const favoriteRepository = getRepository(Favorite);

    const favoriteData = await favoriteRepository.findOne({id: favoriteId});

    try {

        if (favoriteData?.owner === req.user) {
            next();
        } else {
            res.status(403).send("User is not the favorite owner");
        }

    } catch (error) {
        res.status(403).send("User is not the favorite owner or" + error);
    }
};

export default isFavoriteOwner;