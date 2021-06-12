import React from "react";
import AddReview from "./AddReview";
import StarRating from "./StarRating";

const Reviews = ({reviews}) => {
    return (
        <div className="row">
            <div className="col-md-6 order-1">
                <h1 className="display-5">Reviews</h1>

                {reviews.map((review) => {
                    return (
                        <div key={review.id} className="card text-dark bg-light mb-3 w-100">
                            <div className="card-header"><StarRating rating={review.rating}/></div>
                            <div className="card-body">
                                <h5 className="card-title">{review.name}</h5>
                                <p className="card-text">
                                    {review.review}
                                </p>
                            </div>
                        </div>                    
                    )
                })}
            </div>            
            
            <AddReview/>
            
        </div>
    );
};

export default Reviews;
