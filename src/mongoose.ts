import mongoose, { Schema, model, Model, Document } from 'mongoose';
import * as post from './modules/posts/index';
import * as user from './modules/users/index';
import { Router } from 'express';

import * as t from '@/types'

export class MongooseDatabase {
    db: typeof mongoose;
    Post_model: Model<t.Post>;
    User_model: Model<t.User>;
    PostRouter: Router;
    UserRouter: Router;

    constructor() {
        this.db = mongoose;
        this.Post_model = model('post', post.PostSchema)
        this.User_model = model('user', user.UserSchema);

        this.PostRouter = new post.PostRoute(this.Post_model).router;
        this.UserRouter = new user.UserRoute(this.User_model).router;

        this.initialize();
    }

    private async initialize() {
        const uri = 'mongodb+srv://testUser:Vn68p6XgOIvlCcNw@testdbcluster.jkb3nhq.mongodb.net/reddit';
        const aa = new post.PostRoute(this.Post_model)
        try {
            await this.db.connect(uri, {
                // useNewUrlParser: true,
                // useUnifiedTopology: true,
                // useFindAndModify: false,
                // useCreateIndex: true,
            })
        } catch (error) {
            console.log(error);
        }
    }
}