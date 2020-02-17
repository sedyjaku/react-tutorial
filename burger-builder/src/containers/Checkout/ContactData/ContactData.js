import React, {useState} from "react";
import Button from "../../../components/UI/Button/Button";
import styles from "./contactdata.module.css"
import axiosInstance from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Forms/Input/Input";
import {connect} from "react-redux";

const ContactData = (props) => {

    const [contact, setContact] = useState(
        {
            orderForm: {
                username: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                street: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Street'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                zip_code: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Zipcode'
                    },
                    value: '',
                    validation: {
                        required: true,
                        minLength: 5,
                        maxLength: 5,
                    },
                    valid: false,
                    touched: false
                },
                country: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Country'
                    },
                    value: '',
                    validation: {
                        required: true,
                    },
                    valid: false,
                    touched: false
                },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your E-Mail'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                delivery_method: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'Fastest'},
                            {value: 'cheapest', displayValue: 'Cheapest'},
                            {value: 'basic', displayValue: 'Basic'}

                        ]
                    },
                    valid: true,
                    value: 'cheapest',
                    touched: false
                },
            },
            validForm: false,
            name: '',
            email: '',
            address: {
                street: '',
                postalCode: ''
            }
        }
    );

    const [loading, setLoading] = useState(false);



    const inputChangedHandler = (event, inputIdentifier) => {
        console.log(event.target.value);
        const updatedContact = {...contact};
        const updatedOrderForm = {...updatedContact.orderForm};
        const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(event.target.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        updatedContact.orderForm = updatedOrderForm;
        let formIsValid = true;
        for (let inputKey in updatedOrderForm){
            formIsValid = updatedOrderForm[inputKey].valid && formIsValid;
        }
        updatedContact.validForm = formIsValid;
        console.log(updatedFormElement);
        setContact(updatedContact);
    };

    const checkValidity = (value, rules) => {
        let isValid = true;
        if(rules == null){
            return true;
        }
        if(rules.required) {
            isValid = isValid && value.trim() !== '';
        }

        if(rules.minLength) {
            isValid = isValid && value.length >= rules.minLength;
        }

        if(rules.maxLength) {
            isValid = isValid && value.length <= rules.maxLength;
        }

        return isValid;
    };

    const orderHandler = (event) => {
        setLoading(true);
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in contact.orderForm) {
            formData[formElementIdentifier] = contact.orderForm[formElementIdentifier].value;
        }
        console.log(props.ingredients);
        const order = {
            name: "new Random order",
            price: props.price,
            user: {
                username: formData.username,
                address: {
                    street: formData.street,
                    zip_code: formData.zip_code,
                    country: formData.country
                },
                email: formData.email
            },
            delivery_method: formData.delivery_method,
            burgers: [
                {
                    name: "JustThisOneBurgerFromReact!",
                    body: "DoesBurgerFromReactNeedABody?",
                    ingredients: props.ingredients,
                }
            ]
        };
        console.log("ORDERING");
        console.log(order);
        axiosInstance.post('http://127.0.0.1:8000/api/v1/order/', order)
            .then(response => {
                    setLoading(false);
                    props.history.push('/');
                }
            )
            .catch(error => {
                    setLoading(false);
                    props.history.push('/');
                }
            );
    };

    const formElements = [];
    for (let key in contact.orderForm) {
        formElements.push({
            id: key,
            config: contact.orderForm[key]
        })
    }


    let form = (
        <form onSubmit={orderHandler}>
            {formElements.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    invalid={!formElement.config.valid}
                    touched={formElement.config.touched}
                    shouldValidate={formElement.config.validation}
                    value={formElement.config.value}
                    changed={(event) => inputChangedHandler(event, formElement.id)}
                />
            ))}
            {/*<Input inputtype="input" type="text" name="name" placeholder="Your name"/>*/}
            {/*<Input inputtype="input" type="text" name="name" placeholder="Your name"/>*/}
            {/*<Input inputtype="input" type="email" name="email" placeholder="Your email"/>*/}
            {/*<Input inputtype="input" type="text" name="street" placeholder="Street"/>*/}
            {/*<Input inputtype="input" type="text" name="postal" placeholder="Postal Code"/>*/}
            <Button buttonType="Success" disabled={!contact.validForm}>ORDER</Button>
        </form>
    );
    if (loading) {
        form = <Spinner/>
    }

    return (
        <div className={styles.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
    )
};

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    }
};

export default connect(mapStateToProps)(ContactData);