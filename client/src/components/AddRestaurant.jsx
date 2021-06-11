import React, { useContext, useState } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddRestaurant = () => {
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Price Range");
    const { addRestaurants } = useContext(RestaurantsContext);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await RestaurantFinder.post("/", {
                name,   // name: name,
                location,   // location: location,
                price_range: priceRange
            });     // localhost:5000/api/v1/restaurants'/'
            addRestaurants(response.data.data.restaurant);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="mb-4">
            <form action="" className="row g-3">                             
                <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control col mx-2" placeholder="Restaurant Name"/>
                <input value={location} onChange={e => setLocation(e.target.value)} type="text" className="form-control col mx-2" placeholder="Location"/>
                <select value={priceRange} onChange={e => setPriceRange(e.target.value)} className="custom-select mt-3 col-2 mx-2">
                    <option disabled>Price Range</option>
                    <option value="1">$</option>
                    <option value="2">$$</option>
                    <option value="3">$$$</option>
                    <option value="4">$$$$</option>
                    <option value="5">$$$$$</option>
                </select>
                <button onClick={handleSubmit} className="btn btn-primary col-1">Add</button>  
            </form>
        </div>
    )
}

export default AddRestaurant;
