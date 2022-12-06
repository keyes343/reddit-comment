import express, { Router, Request, Response, NextFunction } from 'express';
import mongoose, { Schema, model, Model, Document } from 'mongoose';
import * as t from '@/types/';

export class PostRoute {
    model_post: Model<t.Post>;
    router: Router;
    constructor(public post: Model<t.Post>) {
        this.model_post = post;
        this.router = express.Router();
        this.init()
    }

    private init() {
        this.router.get('/yoo', async (req: Request, res: Response) => {
            console.log('yoo working');
            res.send('yoo working');
        })
    }
}