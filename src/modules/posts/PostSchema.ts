import { Schema } from 'mongoose';
import * as t from "@/types/Post"

export const PostSchema = new Schema<t.Post>({
    owner: { type: Schema.Types.ObjectId, ref: 'user', required: true }
})

// export default Post;