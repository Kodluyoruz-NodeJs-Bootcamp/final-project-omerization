import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Post } from "../entity/Post";



interface IGetUserAuthInfoRequest extends Request {
    user?: String | Function;
    userName?: String | Function;
}


const isPostOwner = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    const { postId } = req.params;
    const postRepository = getRepository(Post);

    const postData = await postRepository.findOne({id:postId});

    try {

        if (postData?.owner === req.user) {
            next();
        } else {
            res.status(403).send("User is not the post owner");
        }

    } catch (error) {
        res.status(403).send("User is not the favorite owner or" + error);
    }
};

export default isPostOwner;