import data from '../posts.json';
import { useNavigate } from 'react-router-dom';
export default function PostThumbnail(props){
    const navigate = useNavigate();
    return(
        <div className="col col-6">
            <div class="pos card" onClick={() => navigate(`/posts/${data[props.value].id}`,{state:{index:props.value}})}>
                <img class="image"  src={data[props.value].featureImageUrl} alt='Sorry,wrong connection!'></img>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">
                        <h4 class="card-title">{data[props.value].title}</h4>
                    </li>
                    <li class="list-group-item">
                        <p className="paragraph"><small>{data[props.value].description}</small></p>
                    </li>
                </ul>
            </div>
        </div>
    )
}