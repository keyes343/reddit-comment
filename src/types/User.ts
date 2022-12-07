import { Document, Schema } from 'mongoose';

export interface User extends Document {
    name: string;
}