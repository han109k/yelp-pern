import React from 'react'
import AddRestaurant from '../components/AddRestaurant';
import RestaurantsList from '../components/RestaurantsList';
import Header from "../components/Header";

export const Home = () => {
    return (       
        <div>
            <Header/>
            <AddRestaurant />
            <RestaurantsList />
        </div> 
    )
}

export default Home;