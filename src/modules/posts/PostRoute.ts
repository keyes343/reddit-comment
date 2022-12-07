import express, { Router, Request, Response, NextFunction } from 'express';
import mongoose, { Schema, model, Model, Document } from 'mongoose';
import * as t from '@/types/';

export class PostRoute {
    model_post: Model<t.Post>;
    model_comment: Model<t.Comment>;

    router: Router;
    constructor(public post: Model<t.Post>, public comment: Model<t.Comment>) {
        this.model_post = post;
        this.model_comment = comment;
        this.router = express.Router();
        this.init()
    }

    private init() {
        this.router.get('/test', async (req: Request, res: Response) => {
            console.log('test working');
            res.send('test working');
        })

        this.router.post('/create_post', async (req: Request<{}, {}, t.Post>, res: Response) => {
            const { username, content } = req.body;
            try {
                let created = await this.model_post.create({
                    content, username, reply_tree: []
                })
                res.send({
                    created
                })
            } catch (error) {
                console.log({ error });
                res.send(error)
            }
        })

        this.router.post('/create_comment', async (req: Request<{}, {}, t.Comment>, res: Response) => {
            const { username, content, root_post_id, parent_comment_id } = req.body;
            try {
                let created = await this.model_comment.create({
                    content, username, root_post_id, parent_comment_id, reply_tree: []
                })

                // if comment is for root post, push self into "reply_tree"
                if (parent_comment_id === false) {
                    const edit_this_post = await this.model_post.findById(root_post_id);
                    if (created && edit_this_post) {
                        edit_this_post.reply_tree.push(created._id);
                        await edit_this_post.save();
                    }
                } else {
                    // if comment is a reply, push self into "reply_tree" of the parent_comment
                    const edit_this_post = await this.model_comment.findById(parent_comment_id);
                    if (created && edit_this_post) {
                        edit_this_post.reply_tree.push(created._id);
                        await edit_this_post.save();
                    } else {
                        console.log({
                            created, edit_this_post
                        })
                    }
                }

                res.send({
                    created
                })
            } catch (error) {
                console.log({ error });
                res.send({
                    error
                })
            }
        })

        this.router.post('/get_post', async (req: Request<{}, {}, {
            post_id: string
        }>, res: Response) => {
            const { post_id } = req.body;

            try {
                const found = await this.model_post.findById(post_id).populate('reply_tree');
                res.send({ found })
            } catch (error) {
                console.log(error)
            }
        })

        this.router.post('/get_comment', async (req: Request<{}, {}, {
            comment_id: string,
            level?: number
        }>, res: Response) => {
            const { comment_id, level } = req.body;

            let found: t.Comment | null;
            try {
                if (level) {
                    found = await this.model_comment.findById(comment_id).populate({
                        path: 'reply_tree',
                        populate: {
                            path: 'reply_tree',
                            populate: {
                                path: 'reply_tree',
                            }
                        }
                    });
                } else {
                    found = await this.model_comment.findById(comment_id).populate('reply_tree');

                }
                res.send({ found })
            } catch (error) {
                console.log(error)
            }
        })

        // get trimmed array of comments
        this.router.post('/get_trimmed_comments', async (req: Request<{}, {}, {
            comment_id: string,
            trim_upto: 3,
            starting_pos: 1
        }>, res: Response) => {
            const { comment_id, trim_upto, starting_pos } = req.body;
            try {
                const found = await this.model_comment.findById(comment_id, {
                    reply_tree: {
                        $slice: [trim_upto, starting_pos]
                    }
                });
                res.send({
                    found
                })
            } catch (error) {
                console.log({ error })
            }
        })

        // delete
        this.router.delete('/delete_comment', async (req: Request<{
        }, {}, {
            comment_id: string
        }>, res: Response) => {
            const { comment_id } = req.body;
            try {
                const found = await this.model_comment.findById(comment_id);
                if (found && found.parent_comment_id) {
                    const parent = await this.model_comment.findById(found.parent_comment_id);
                    if (parent) {
                        const indx = parent.reply_tree.indexOf(found.parent_comment_id)
                        parent.reply_tree.splice(indx, 1);
                        await parent.save();
                    }
                    await found.deleteOne();
                }
            } catch (error) {

            }
            res.send('ok')
        })
    }
}