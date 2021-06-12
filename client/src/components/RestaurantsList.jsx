import React, {useContext, useEffect} from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { useHistory } from "react-router-dom";
import StarRating from "./StarRating";

const RestaurantsList = (props) => {

    const {restaurants, setRestaurants} = useContext(RestaurantsContext);
    let history = useHistory(); // history of browser react-dom library

    // When restaurant renders it will call useEffect. Since we added empty array argument [] will be called once.
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await RestaurantFinder.get("/");   // calling axios api localhost:5000/api/v1/restaurants'/', we're using baseURL
                setRestaurants(response.data.data.restaurants);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const handleDelete = async (e, id) => {
        e.stopPropagation();    //
        try {
            await RestaurantFinder.delete(`/${id}`);
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id
            }));
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = (e, id) => {
        e.stopPropagation();    //
        history.push(`/restaurants/${id}/update`);   //pushing to history, directing to localhost:3000/restaurants/:id/update page
    }

    const handleRestaurantSelect = (id) => {
        history.push(`/restaurants/${id}`);     //pushing to history, directing to localhost:3000/restaurants/:id page
    }

    const renderRating = (restaurant) => {
        if(!restaurant.count) {
            return (
                <>
                <StarRating rating={restaurant.average_rating}/>
                <span className="text-dark ms-1">(0)</span>
                </>
            )
        }
        return (
            <>
            <StarRating rating={restaurant.average_rating}/>
            <span className="text-dark ms-1">({restaurant.count})</span>
            </>
        )
    }

    return (
        <div>
            <table className="table table-striped table-light table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>Restaurant</th>
                        <th>Location</th>
                        <th>Price Range</th>
                        <th>Ratings</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {/* table rows */}
                    {restaurants && restaurants.map(restaurant => {
                        return (
                            <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{"$".repeat(restaurant.price_range)}</td>
                                <td>{renderRating(restaurant)}</td>
                                <td>
                                    <button onClick={(e) => handleUpdate(e, restaurant.id)} className="btn btn-sm btn-warning pb-0">Update</button>
                                </td>
                                <td>
                                    {/* Arrow function is used for onClick otherwise handleDelete will be called right away */}
                                    <button onClick={(e) => handleDelete(e, restaurant.id)} className="btn btn-sm btn-danger pb-0">Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default RestaurantsList;
