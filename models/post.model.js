import { Schema, model } from "mongoose";

/*
template for Postman
{
    "category": "test_cat",
    "title": "test_title",
    "cover": "test_cover",
    "readTime": {"value": 1, "unit": "minute"},
    "author": {"name": "test_auth", "img": "https://fumettologica.it/wp-content/uploads/2022/04/scrat-era-glaciale.jpg"},
    "content": "https://fumettologica.it/2022/04/era-glaciale-scrat-video-finale/"
}
*/
const postSchema = new Schema (
    {    
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "userComment"
            }
        ]
    },

    {
        collection: "posts",
        timestamps: true
    }
)

export default model("Post", postSchema);