import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Wordle {
    @Prop({
        required: true,
        unique: true,
        trim: true
    })
    word: string;

    @Prop({
        default: 0
    })
    attempts: number;

    @Prop({
        default: false
    })
    done: boolean;
}

export const WordleSchema = SchemaFactory.createForClass(Wordle);