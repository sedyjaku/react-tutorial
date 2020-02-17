import React, {useState} from "react";

import './AddPerson.css';

const addPerson = (props) => {
    const [person, setPerson] = useState(
        {
        name: "",
        age: null
    });

    const onChangeNameHandler = (event) => {
        setPerson(
            {
                ...person,
                name: event.target.value
            }
        )
    };

    const onChangeAgeHandler = (event) => {
        setPerson(
            {
                ...person,
                age: event.target.value
            }
        )
    };

    return <div className="AddPerson">
        <input type="text" placeholder="Name" onChange={onChangeNameHandler}/>
        <input type="number" placeholder="Age" onChange={onChangeAgeHandler}/>
        <button onClick={() => props.personAdded(person.name, person.age)}>Add Person</button>
    </div>
};

export default addPerson;