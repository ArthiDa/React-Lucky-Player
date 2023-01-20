import React from "react";
import "./Player.css";

const Player = (props) => {
  const { id, Name, Role, Age, Born, Image } = props.player;
  const {pickPlayer} = props;
  return (
    <div className="single-player">
      <img className="single-player-img" src={Image} alt="" />
      <div className="single-player-details">
        <p className="player-name">{Name}</p>
        <p>Role: {Role}</p>
        <p>Born: {Born}</p>
        <p>Age: {Age}</p>
      </div>
      <button className="pick-btn" onClick={()=>pickPlayer(props.player)}>
        <p>Pick The Player</p>
      </button>
    </div>
  );
};

export default Player;
