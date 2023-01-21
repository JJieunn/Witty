import { DataSource } from "typeorm"
import { Categories } from "../entities/category_entity";
import { Comments } from "../entities/comments_entity";
import { Comment_likes } from "../entities/comment_likes_entity";
import { Post_bookmarks } from "../entities/post_bookmarks_entity";
import { Posts } from "../entities/post_entity";
import { Post_images } from "../entities/post_images_entity";
import { Post_likes } from "../entities/post_likes_entity";
import { Users } from "../entities/user_entity";

const myDataSource = new DataSource ({
  type: "mysql",
  host: process.env.TYPEORM_HOST,
  port: 3306,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [Categories ,Users, Posts, Post_likes, Post_images, Comments, Post_bookmarks, Comment_likes],
  synchronize: false,
  logging: true
});

myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initailized!");
  })
  .catch(() => {
    console.log("Database initialize failed.");
  });

  export { myDataSource }
