import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import Reviews from "../components/Reviews";
import StarRating from "../components/StarRating";
import { RestaurantsContext } from "../context/RestaurantsContext";

const RestaurantDetailsPage = () => {
    const { id } = useParams();
    const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);

    useEffect(() => {        
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get(`/${id}`);
                // console.log(response.data.data.reviews[0]);

                setSelectedRestaurant(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();   
    }, []);

    return (
        <div>{selectedRestaurant && (
            <>
                <h1 className="display-2 text-center">{selectedRestaurant.restaurant.name}</h1>
                <div className="text-center">
                    <StarRating rating={selectedRestaurant.restaurant.average_rating}/>
                    <span className="text-white ms-1">
                        {selectedRestaurant.restaurant.count
                        ? `(${selectedRestaurant.restaurant.count})`
                        : "(0)"}
                    </span>
                </div>
                <div className="mt-3">
                    <Reviews reviews={selectedRestaurant.reviews}/>
                </div>
            </>  
        )}
        </div>
    )
};

export default RestaurantDetailsPage;
