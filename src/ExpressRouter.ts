import express, { Router, Request, Response, NextFunction } from 'express';
import { MongooseDatabase } from './mongoose';

export class ExpressRouter {
    router: Router;
    MongooseInstance: MongooseDatabase;

    constructor() {
        this.router = express.Router();
        this.MongooseInstance = new MongooseDatabase();

        this.router.use('/post', this.MongooseInstance.PostRouter);
        this.router.use('/user', this.MongooseInstance.UserRouter);
    }
}