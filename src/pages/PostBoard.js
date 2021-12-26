import datas from '../posts.json';
import { useNavigate,useParams } from 'react-router-dom';
export default function PostBoard(){
    const navigate = useNavigate();
    let { id } = useParams();
    const post = datas.find((p) => p.id === id);
    return(
        <div class="container">
            <button class="btn btn-lg btn-secondary" onClick={() => navigate('/')}>Back</button>
            <h1 class="posthead">{post.title}</h1>
            <div class="para"><p class="paragragh">{post.contents}</p></div>
        </div>
    )
}