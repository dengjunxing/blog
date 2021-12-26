import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from 'axios';

export default function MessageBoard(){

    const [ post,setPost ] = useState({
        email:'',
        message:'',
        time: '',
    })

    const [ posts,setPosts ] = useState([{
        email:"",
        message:"",
        _id:"",
    }])

    const [updateOpen,setUpdateOpen] = useState(false);
    const [newUpdatePost,setNewUpdatePost] = useState({
        email:"",
        message:"",
        _id:"",
    })

    useEffect(() => {
        fetch('https://boiling-retreat-28017.herokuapp.com/posts')
        .then((res) => {
            if(res.ok) {
                return res.json();
            }
        })
        .then((jsonRes) => setPosts(jsonRes))
        .catch((err) => console.log(err));
    },[posts]);

    function handleChange(event){
        const { name,value } = event.target;
        setPost(prevInput => {
            return({
                ...prevInput,
                [name]:value,
            })
        })

    }

    function addPost(event){
        event.preventDefault();
        const newPost = {
            email:post.email,
            message:post.message,
        };
        axios.post("https://boiling-retreat-28017.herokuapp.com/newpost",newPost);
        alert("Post added!");
        setPost({
            email:"",
            message:"",
        })
    }

    function openUpdatePost(id){
        setUpdateOpen(true);
        setNewUpdatePost(prevInput => {
            return({
                ...prevInput,
                _id: id,
            })
        })
    }

    function updatePost(id){
        axios.put("https://boiling-retreat-28017.herokuapp.com/put/" + id, newUpdatePost)
        .then(alert("Post updated!"))
        .catch((err) => alert("Update failed!" + "\n" + err));
        setPost({
            email:"",
            message:"",
        })
        setUpdateOpen(false);
    }

    function handleUpdate(event){
        const { name,value } = event.target;
        setNewUpdatePost(prevInput => {
            return({
                ...prevInput,
                [name]: value,
            })
        })
    }

    function deletePost(id){

        axios.delete("https://boiling-retreat-28017.herokuapp.com/delete/" + id);
        alert("Post deleted!");
        console.log(`Post with id ${id} deleted`);
    }

    const navigate = useNavigate();

    return(
        <div class="container">
            <h1 class="posthead">Message Board</h1>
            {!updateOpen?(
            <div class="form">
                <div class="form-group">
                    <label class="form-label">
                        Email Address
                    </label>
                    <input type="email" value={post.email} onChange={handleChange} name="email" class="form-control" placeholder="name@example.com" style={{opacity:0.7}}>
                    </input>
                </div>
                <div class="form-group">
                    <label class="form-label">
                        Message
                    </label>
                    <textarea type="text" value={post.message} onChange={handleChange} name="message" class="form-control" style={{opacity:0.7}} placeholder="eg:Please send me a call." rows="3">
                    </textarea>
                </div>
                <br />
                <div class="btnbox">
                <button class="formbtn btn btn-outline-dark" onClick={addPost} type="Submit">Send post</button>
                &nbsp;&nbsp;
                <button  onClick={() => navigate('/')} class="formbtn btn btn-outline-dark">Back</button>
                </div>
            </div>):
            (
            <div class="form">
            <div class="form-group">
                <label class="form-label">
                    Email Address
                </label>
                <input type="email" value={newUpdatePost.email} onChange={handleUpdate} name="email" class="form-control" placeholder="name@example.com" style={{opacity:0.7}}>
                </input>
            </div>
            <div class="form-group">
                <label class="form-label">
                    Message
                </label>
                <textarea type="text" value={newUpdatePost.message} onChange={handleUpdate} name="message" class="form-control" style={{opacity:0.7}} placeholder="eg:Please send me a call." rows="3">
                </textarea>
            </div>
            <br />
            <div class="btnbox">
                <button class="formbtn btn btn-outline-dark" onClick={() => updatePost(newUpdatePost._id)} type="Submit">Update post</button>
                &nbsp;&nbsp;
                <button  onClick={() => navigate('/')} class="formbtn btn btn-outline-dark">Back</button>
            </div>
            </div>
        )}
        <br></br>
        <h1 class="posthead">Message List</h1>
            {posts.map(post => {
                return(
                    <div class="msg card" key={post._id}>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item list-group-item-success">
                                <span><strong>
                                    Email:
                                </strong></span>
                                {post.email}
                            </li>
                            <li class="list-group-item list-group-item-success" >
                                <span><strong>
                                    Msg:
                                </strong></span>
                                {post.message}
                            </li>
                            <li class="list-group-item list-group-item-success" style={{textAlign: "right"}}>
                                <small>{post.time}</small>
                                &nbsp;&nbsp;&nbsp;
                                <button class="btn btn-warning btn-sm" onClick={() => openUpdatePost(post._id)}>Update</button>
                                &nbsp;&nbsp;&nbsp;
                                <button class="btn btn-danger btn-sm" onClick={() => deletePost(post._id)}>Delete</button>
                            </li>
                        </ul>
                    </div>
                )
            })}
        </div>
    );
}