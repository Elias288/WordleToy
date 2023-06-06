import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Word {
    @Prop({
        required: true,
        unique: true,
        trim: true
    })
    word: string;
}

export const WordSchema = SchemaFactory.createForClass(Word);