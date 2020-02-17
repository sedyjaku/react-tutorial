import React, {Component} from 'react';

import './Courses.css';
import {Route} from "react-router-dom";
import Course from "../Course/Course";

class Courses extends Component {
    state = {
        courses: [
            {id: 1, title: 'Angular - The Complete Guide'},
            {id: 2, title: 'Vue - The Complete Guide'},
            {id: 3, title: 'PWA - The Complete Guide'}
        ]
    };

    courseSelectedHandler(id, title) {
        const currentPath = "/courses";
        this.props.history.push({pathname: currentPath + '/' + id});
        this.props.history.push({
            pathname: currentPath + '/' + id,
            search: "title=" + title
        });
    }

    render() {
        return (
            <div>
                <h1>Amazing Udemy Courses</h1>
                <section className="Courses">
                    {
                        this.state.courses.map(course => {
                            return <article onClick={() => this.courseSelectedHandler(course.id, course.title)} className="Course"
                                            key={course.id}>{course.title}</article>;
                        })
                    }
                </section>
                <Route path="/courses/:id" component={Course}/>
            </div>
        );
    }
}

export default Courses;