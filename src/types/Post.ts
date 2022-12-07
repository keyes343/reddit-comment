import { Document, Schema } from 'mongoose';

export interface Post extends Document {
    // owner: Schema.Types.ObjectId,
    username: 'sam' | 'max' | 'lucy' | 'admin',
    content: string,
    reply_tree: Schema.Types.ObjectId[]
}

export interface Comment extends Document {
    username: 'sam' | 'max' | 'lucy' | 'admin',
    // commentor_id: Schema.Types.ObjectId,
    root_post_id: Schema.Types.ObjectId | false,
    parent_comment_id: Schema.Types.ObjectId | false,
    content: string,
    reply_tree: Schema.Types.ObjectId[],
}