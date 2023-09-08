import React from "react";
import { CapitalizeFirstLetter } from "../../utils";

interface BaseStatsType {
  baseStats: {
    name: string;
    value: number;
  }[];
}

const BaseStats = ({ baseStats }: BaseStatsType) => {
  const isGreen = (value: number) => {
    return value >= 50 ? "Green" : "Red";
  };

  return (
    <div className="about stats">
      <ul>
        {baseStats.map((base, index) => (
          <li key={index}>
            <h6 className="title">
              {CapitalizeFirstLetter(
                base.name
                  .replace("special-attack", "Sp. Atk")
                  .replace("special-defense", "Sp. Def")
              )}
            </h6>
            <h6>
              {base.value}
              <div className="line">
                <div
                  className={`lines line-${isGreen(base.value)}`}
                  style={{ width: `${base.value}%` }}
                />
              </div>
            </h6>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BaseStats;
