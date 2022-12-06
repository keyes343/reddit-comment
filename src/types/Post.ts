import { Document, Schema } from 'mongoose';

export interface Post {
    owner: Schema.Types.ObjectId,
    content: string,
    reply_tree: Schema.Types.ObjectId[]
}

export interface Comment {
    commented_by_user: Schema.Types.ObjectId,
    commented_to_post: Schema.Types.ObjectId | false,
    replied_to_comment: Schema.Types.ObjectId | false,
    content: string,
    reply_tree: Schema.Types.ObjectId[],
}