import { getModelForClass, prop } from "@typegoose/typegoose";

export class User {
  @prop({ required: [true, 'Password is required'] })
  password!: string;

  @prop({ required: [true, 'Email is required'], unique: true })
  email!: string;

  @prop({ default: null })
  token: string | null = null;

  @prop({ enum: ["starter", "pro", "business"], default: "starter" })
  subscription: "starter" | "pro" | "business" = "starter";
}

export default getModelForClass(User);

