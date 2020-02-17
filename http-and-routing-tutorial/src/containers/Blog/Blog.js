import React, {Component, Suspense} from 'react';

import './Blog.css';
import Posts from "./Posts/Posts";
import {Redirect, Route, Switch} from "react-router";
// import NewPost from "./NewPost/NewPost";
import FullPost from "./FullPost/FullPost";
import {NavLink} from "react-router-dom";
import asyncComponent from '../../hoc/asyncComponent'

// const Posts = React.lazy(() => import('./Posts/Posts'));
const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost')
});

class Blog extends Component {

    state = {
        auth: true
    };

    render() {

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/posts"
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'none'
                                }}
                            >Home</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                            <li><NavLink to="google.com">google</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    {this.state.auth ? <Route path="/new-post" component={AsyncNewPost}/> : null}
                    <Route path="/posts" component={Posts}/>
                    {/*<Route path="/posts" render={() => <Suspense fallback={<div>Loading...</div>}><Posts/></Suspense>}/>*/}
                    <Route render = {() => <h1>Not Found</h1>}/>
                    <Redirect from="/" to="/posts"/>
                </Switch>
            </div>
        );
    }
}

export default Blog;