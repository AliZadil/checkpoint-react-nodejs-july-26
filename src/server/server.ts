import express, {Request, Response} from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

type Post = {
    id : number;
    text : string;
}

let posts: Post[] = [];
let idCounter = 1;

app.get("/api/posts", (req: Request , res : Response) => {
    res.json(posts);
})

app.post("/api/posts", (req: Request , res : Response) => {
    const { text } = req.body;
    const newPost : Post= { id:idCounter++, text};
    posts.push(newPost);
    res.json(newPost);
})

app.put("api/posts/:id", (req: Request , res : Response) => {
    const { id } = req.params;
    const { text } = req.body;
    posts = posts.map((post) => post.id === Number(id) ? { id: Number(id), text } : post);
    res.json( {message: "Post updated"});
})

app.delete("/api/posts/:id", (req: Request , res : Response) => {
    const { id } = req.params;
    posts = posts.filter((post) => post.id !== Number(id));
    res.json({ message: "Post deleted"});
})

app.listen(port, () => console.log('server running'));

