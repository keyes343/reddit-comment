import { Schema } from 'mongoose';
import * as t from "@/types"

export const UserSchema = new Schema<t.User>({
    name: { type: Schema.Types.String, required: true }
})

// export default Post;