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
const commentSchema = new Schema (
    {
        user: {
            type: String,
            required: true
        },
        post: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
    },

    {
        collection: "userComments",
        timestamps: true
    }
)

export default model("userComment", commentSchema);