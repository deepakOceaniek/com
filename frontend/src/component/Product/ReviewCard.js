import React from "react";
import ReactStars from "react-rating-stars-component";

const ReviewCard = ({ review }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    size: window.innerWidth < 600 ? 15 : 25,
    activeColor: "tomato",
    value: review.rating,
    isHalf: true,
  };
  return (
    <>
      <div className="reviewCard">
        <img src="/images/Profile.png" alt="User" />
        <p>{review.name}</p>
        <ReactStars {...options} />
        <span>{review.comment}</span>
      </div>
    </>
  );
};

export default ReviewCard;
