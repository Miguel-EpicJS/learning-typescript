import { Request, Response, NextFunction, response } from "express";
import axios, { Axios, AxiosResponse } from "axios";

interface Post {
    userId: Number;
    id: Number;
    title: String;
    body: String;
};

const getPosts = async ( req: Request, res: Response, next: NextFunction ) => {
    const result: AxiosResponse = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const posts: [Post] = result.data;
    return res.status(200).json({ message: posts });
};

const getPost = async ( req: Request, res: Response, next: NextFunction ) => {
    const id: string = req.params.id;

    const result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const post: Post = result.data;
    return res.status(200).send({ message: post });
};

const updatePost = async ( req: Request, res: Response, next: NextFunction ) => {
    const id: string = req.params.id;
    const title: string = req.body.title ?? null;
    const body: string = req.body.body ?? null;

    const result: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        ...(title && { title }),
        ...(body && { body })
    });

    return res.status(200).json( { message: result.data } );
};

const deletePost = async ( req: Request, res: Response, next: NextFunction ) => {
    const id: string = req.params.id;

    const result: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);

    return res.status(200).json({ message: result.data });
};

const addPost = async ( req: Request, res: Response, next: NextFunction ) => {
    const title: string = req.body.title;
    const body: string = req.body.body;

    const result: AxiosResponse = await axios.post(`https://jsonplaceholder.typicode.com/posts`, {
        title,
        body
    });

    return res.status(200).json( { message: result.data } );
};


export default { getPosts, getPost, updatePost, deletePost, addPost };
