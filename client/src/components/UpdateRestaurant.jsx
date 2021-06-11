import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import RestaurantFinder from '../apis/RestaurantFinder';

const UpdateRestaurant = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("");
    
    let history = useHistory();

    useEffect(() => {
        const fetchRestaurant = async() => {
            const response = await RestaurantFinder(`/${id}`);
            setName(response.data.data.restaurant.name);
            setLocation(response.data.data.restaurant.location);
            setPriceRange(response.data.data.restaurant.price_range);
        };
        fetchRestaurant();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
            name,
            location,
            price_range: priceRange
        });
        console.log(updatedRestaurant);
        history.push("/");
    }

    return (
        <div className="d-flex row mx-5 my-4">
            <form action="">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input value={name} onChange={e => setName(e.target.value)} className="form-control" name="name" id="name" type="text" />    
                </div>
                
                <div className="mb-5">
                    <label htmlFor="location" className="form-label">Location</label>
                    <input value={location} onChange={e => setLocation(e.target.value)} className="form-control" name="location" id="location" type="text" />    
                </div>

                <div className="mb-3 text-center">
                    <label htmlFor="priceRange" className="form-label me-4">Price Range</label>
                    <select value={priceRange} onChange={e => setPriceRange(e.target.value)} className="form-select w-50 d-inline" name="price_range" id="priceRange">
                        <option value="1">$</option>
                        <option value="2">$$</option>
                        <option value="3">$$$</option>
                        <option value="4">$$$$</option>
                        <option value="5">$$$$$</option>
                    </select>
                </div>
                <div className="text-center mt-5">
                    <button onClick={handleSubmit} className="btn btn-lg btn-light">Submit</button>
                </div>                
            </form>
        </div>
    )
};

export default UpdateRestaurant;
