import React, {useEffect, useState} from "react";
import Order from "../../components/Order/Order";
import axiosInstance from "../../axios-orders"
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";


const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axiosInstance.get('http://127.0.0.1:8000/api/v1/order/?limit=5&offset=90')
            .then(res => {
                console.log(res);
                const resOrders = res.data.objects;
                const newOrders = [];
                resOrders.forEach(order =>
                    newOrders.push(fetchOrder(order))
                );
                console.log(newOrders);
                setLoading(false);
                setOrders(newOrders);
            })
            .catch(err =>
                setLoading(false)
            )
    }, []);

    const fetchOrder = (order) => {
        const burgers = order.burgers;
        const newBurgers = [];
        burgers.forEach(burger => {
            newBurgers.push(fetchBurger(burger))
        });
        return {
            id: order.id,
            deliveryMethod: order.delivery_method,
            price: order.price,
            burgers: newBurgers
        };
    };

    const fetchBurger = (burger) => {
        const ingredients = burger.ingredients;
        const newIngredients = {};
        ingredients.forEach(burger => {
            fetchIngredient(burger, newIngredients)
        });
        return {
            id: burger.id,
            name: burger.name,
            description: burger.body,
            ingredients: newIngredients
        };
    };

    const fetchIngredient = (ingredient, newIngredients) => {
        newIngredients[ingredient.name] = ingredient.count;
    };

    let ordersToRender = <Spinner/>;

    if (!loading) {
        ordersToRender = [];
        orders.forEach(order => {
            ordersToRender.push(<Order key={order.id} order={order}/>)
        });
    }

    return (
        <div>
            {ordersToRender}
        </div>
    );
};

export default withErrorHandler(Orders, axiosInstance)