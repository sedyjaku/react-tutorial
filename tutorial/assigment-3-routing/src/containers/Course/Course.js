import React, { Component } from 'react';

class Course extends Component {
    render () {
        console.log(this.props);
        const id = this.props.match.params.id;
        const searchParam = this.props.location.search;
        const title = searchParam.substring(searchParam.lastIndexOf("title=")+6);
        console.log(searchParam);
        console.log(title);
        return (
            <div>
                <h1>{title}</h1>
                <p>You selected the Course with ID:{id}</p>
            </div>
        );
    }
}

export default Course;