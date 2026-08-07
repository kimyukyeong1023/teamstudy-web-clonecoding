import React from "react";
import { useParams } from "react-router-dom";
import { cars } from "../components/mainBanner/cars";

export default function CarDetail() {
  let { id } = useParams();
  const car = cars.find((car) => {
    return car.id === id;
  });
  return (
    <div>
      <p>{car.name}</p>
      <img src={`${car.image}`} alt="" />
      <p>{car.description}</p>
    </div>
  );
}
