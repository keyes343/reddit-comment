import express, { Router, Request, Response, NextFunction } from 'express';
import mongoose, { Schema, model, Model, Document } from 'mongoose';
import * as t from '@/types/';

export class UserRoute {
    model_user: Model<t.User>;
    router: Router;

    constructor(public user: Model<t.User>) {
        this.model_user = user;
        this.router = express.Router();
        this.init()
    }

    private init() {
        this.router.get('/yoo user', async (req: Request, res: Response) => {
            console.log('yoo user working');
            res.send('yoo user working');
        })
    }
}
