import { Schema, model } from "mongoose";

/* template for Postman
// author model
{
	  "name": "test5",
      "surname": "test5",
      "email":"test5@test.test",
      "dob":"na",
      "pfp":"na"
}
*/
const userSchema = new Schema (
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },       
        password: {
            type: String,
            required: true
        },
        dob: {
            type: String,
            required: false
        },
        pfp: {
            type: String,
            required: false
        },
        auth:{
            type: String,
            required: false
        },
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Post"
            }
        ]
    },

    {
        collection: "users"
    }
)

export default model("User", userSchema);
