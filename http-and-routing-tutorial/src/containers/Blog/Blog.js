import React, { Component } from 'react';

import './Blog.css';
import Posts from "./Posts/Posts";
import {Route} from "react-router";
import NewPost from "./NewPost/NewPost";
import FullPost from "./FullPost/FullPost";
import {Link} from "react-router-dom";

class Blog extends Component {

    render () {

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</Link></li>
                            <li><Link to="google.com">google</Link></li>
                            {/*<li><a href="/">All posts</a></li>*/}
                            {/*<li><a href="/">About</a></li>*/}
                            {/*<li><a href="/">Contact</a></li>*/}
                        </ul>
                    </nav>
                </header>
                <Route exact path="/" component={Posts}/>
                <Route path="/new-post" component={NewPost}/>
                <Route path="/full-post" component={FullPost}/>
                {/*<section>*/}
                {/*    <FullPost id={this.state.selectedPostId}/>*/}
                {/*</section>*/}
                {/*<section>*/}
                {/*    <NewPost />*/}
                {/*</section>*/}
            </div>
        );
    }
}

export default Blog;