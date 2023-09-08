import React from "react";
import { CapitalizeFirstLetter } from "../utils";

interface BadgeType {
  text: string;
  variant?:
    | "Bug"
    | "Dark"
    | "Dragon"
    | "Electric"
    | "Fairy"
    | "Fighting"
    | "Fire"
    | "Flying"
    | "Ghost"
    | "Grass"
    | "Ground"
    | "Ice"
    | "Normal"
    | "Poison"
    | "Psychic"
    | "Rock"
    | "Steel"
    | "Water"
    | string;
}

const Badge = ({ text, variant = "grass" }: BadgeType) => {
  return (
    <div className={`badge badge-${CapitalizeFirstLetter(variant)}`}>
      {CapitalizeFirstLetter(text)}
    </div>
  );
};

export default Badge;
