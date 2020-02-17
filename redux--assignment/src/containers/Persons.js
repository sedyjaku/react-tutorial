import React, {Component} from 'react';
import * as actionTypes from '../store/actions'

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';
import {connect} from "react-redux";

class Persons extends Component {


    personAddedHandler = (name, age) => {
        const newPerson = {
            id: Math.random(), // not really unique but good enough here!
            name: name,
            age: age
        };
        this.props.onAddPerson(newPerson);
    };

    personDeletedHandler = (personId) => {
        this.setState((prevState) => {
            return {persons: prevState.persons.filter(person => person.id !== personId)}
        });
    };

    render() {
        return (
            <div>
                <AddPerson personAdded={this.personAddedHandler}/>
                {this.props.persons.map(person => (
                    <Person
                        key={person.id}
                        name={person.name}
                        age={person.age}
                        clicked={() => this.props.onRemovePerson(person.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        persons: state.persons
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddPerson: (newPerson) => {
            dispatch({type: actionTypes.ADD_PERSON, newPerson: newPerson})
        },
        onRemovePerson: (personId) => {
            dispatch({type: actionTypes.REMOVE_PERSON, personId: personId})
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Persons);