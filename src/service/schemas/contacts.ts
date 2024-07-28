import { getModelForClass, prop, Ref } from "@typegoose/typegoose";

export class Contact {
  @prop({ required: [true, 'Set name for contact'] })
  name!: string;

  @prop()
  email?: string;

  @prop()
  phone?: string;

  @prop({ default: false })
  favorite?: boolean = false;
}

export default getModelForClass(Contact);
