import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faXmark } from "@fortawesome/free-solid-svg-icons";
import './PickPlayer.css'

const PickPlayer = (props) => {
    const {Name,Image} = props.player;
    const {deletePlayer} = props;
    return (
        <div className="pick-player">
          <div className="short-details">
            <img className="player-small-img" src={Image} alt="" />
            <p className="short-player-name">{Name}</p>
          </div>
          <div className="cross" onClick={()=>deletePlayer(props.player)}>
            <FontAwesomeIcon icon={faXmark} size="xl" />
          </div>
        </div>
    );
};

export default PickPlayer;