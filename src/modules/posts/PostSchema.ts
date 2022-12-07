import { Schema } from 'mongoose';
import * as t from "@/types/Post"

export const PostSchema = new Schema<t.Post>({
    // owner: { type: Schema.Types.ObjectId, ref: 'user', required: true }
    username: { type: Schema.Types.String, required: true, enum: ['sam', 'max', 'lucy', 'admin'] },
    content: { type: Schema.Types.String, required: true },
    reply_tree: [{ type: Schema.Types.ObjectId, ref: 'comment', required: false, default: [] }]
}, { timestamps: true })

export const CommentSchema = new Schema<t.Comment>({
    username: { type: Schema.Types.String, required: false, enum: ['sam', 'max', 'lucy', 'admin'], default: 'admin' },
    root_post_id: { type: Schema.Types.ObjectId, ref: 'post', required: true },
    parent_comment_id: { type: Schema.Types.Mixed, ref: 'post', required: false, default: false },
    content: { type: String, required: true },
    reply_tree: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
}, { timestamps: true })

// export default Post;