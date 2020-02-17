import React, {useEffect, useState} from 'react';
import Post from "../../../components/Post/Post";
import axios from "../../../axios";
import "./Posts.css"
import {Route} from "react-router";
import FullPost from "../FullPost/FullPost";

const Posts = (props) => {
    const [state, setState] = useState({
        posts: [],
        selectedPostId: null,
        error: false
    });

    useEffect(() => {
        axios.get("posts").then(
            response => {
                const posts = response.data.slice(0, 4);
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
    }, []);

    const postSelectedHandler = (id) => {
        let newState = {...state};
        newState['selectedPostId'] = id;
        setState(newState);
        props.history.push({pathname: props.match.url + '/' + id});
        // props.history.push(props.match.url + '/' + id);
    };

    let posts = <p>Something Went Wrong!</p>;
    if (!state.error) {
        posts = state.posts.map(post => {
            return (
                // <Link
                //     to={'/' + post.id}>
                <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={() => postSelectedHandler(post.id)}/>
                // </Link>
            )
        });
    }
    return (
        <div>
            <section className="Posts">
                {posts}
            </section>
            <Route path={props.match.url + "/:id"} component={FullPost}/>
        </div>
    );
};

export default Posts;