import React from "react";
import { Rating } from "@material-ui/lab";

const ReviewCard = ({ review }) => {
  const options = {
    activeColor: "tomato",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <>
      <div className="reviewCard">
        <img src="/images/Profile.png" alt="User" />
        <p>{review.name}</p>
        <Rating {...options} />
        <span className="reviewCardComment">{review.comment}</span>
      </div>
    </>
  );
};

export default ReviewCard;
