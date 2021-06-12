import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";

const AddReview = () => {

    const {id} = useParams(); 
    const history = useHistory();
    const location = useLocation();

    const [name, setName] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState("Rating");

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        try {
            const response = await RestaurantFinder.post(`/${id}/addreview`, {
                name,
                review,
                rating
            });
            console.log(response);
            history.push("/");  // quickly redirecting to home page then redirect back to current page to load new review
            history.push(location.pathname);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="col-md-6 order-2">
            <h1 className="display-6">Add a Review</h1>
            <form action="">
                <div className="row mb-3">
                    <div className="col-8">
                        <label className="form-label" htmlFor="name">Name</label>
                        <input value={name} onChange={e => setName(e.target.value)} type="text" id="name" className="form-control" placeholder="John Smith" required/>
                    </div>
                    <div className="col-2">
                        <label className="form-label" htmlFor="rating">Rating</label>
                        <select value={rating} onChange={e => setRating(e.target.value)} className="custom-select py-2 me-0" id="rating">
                            <option disabled>Rating</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>                
                </div>
                <div className="mb-3">
                    <label htmlFor="textArea" className="form-label">Review</label>
                    <textarea value={review} onChange={e => setReview(e.target.value)} className="form-control" id="textArea" rows="5" placeholder="Type your review here..." required></textarea>
                </div>
                <div className="text-center">
                    <button onClick={handleSubmitReview} className="btn btn-primary">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddReview;
