import React, {useEffect, useState} from 'react';
import Post from "../../../components/Post/Post";
import axios from "../../../axios";
import "./Posts.css"

const Posts = (props) => {
    const [state, setState] = useState({
        posts: [],
        selectedPostId: null,
        error: false
    });

    useEffect( () =>{
        axios.get("posts").then(
            response => {
                const posts = response.data.slice(0,4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Ruprt'
                    }
                });
                console.log(response);
                let newState = {...state};
                newState['posts'] = posts;
                setState(newState)
            }
        )
            .catch(error => {
                console.log(error);
                let newState = {...state};
                newState['error'] = true;
                setState(newState)
            })
    });

    const postSelectedHandler = (id) => {
        let newState = {...state};
        newState['selectedPostId'] = id;
        setState(newState)
    };

    let posts = <p>Something Went Wrong!</p>;
    if (!state.error) {
        posts = state.posts.map(post => {
            return <Post key={post.id} title={post.title} author={post.author}
                         clicked={() => postSelectedHandler(post.id)}/>
        });
    }
    return <section className="Posts">
        {posts}
    </section>;
};

export default Posts;