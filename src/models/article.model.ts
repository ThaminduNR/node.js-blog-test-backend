import mongoose, {ObjectId} from "mongoose";

interface iArticle extends mongoose.Document{
    title:string;
    description: string;
    publishDate: Date;
    user: ObjectId;
}

const articleSchema =  new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    publishDate: {type: Date, required: true, default: Date.now()},
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "User"}
})

const ArticleModel = mongoose.model<iArticle>("article",articleSchema);
export default ArticleModel;