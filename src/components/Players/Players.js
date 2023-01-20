import { faBook, faTrash, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import PickPlayer from "../PickPlayer/PickPlayer";
import Player from "../Player/Player";
import "./Players.css";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [pickPlayers, setPickPlayers] = useState([]);
  useEffect(() => {
    fetch("data.json")
      .then((res) => res.json())
      .then((data) => setPlayers(data));
  }, []);

  const pickPlayer = (pickedPlayer) => {
    if (pickPlayers.length > 11) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You Already Selected 11 Players",
      });
      return;
    }
    let newPick = [];
    const exists = pickPlayers.find((player) => player.id === pickedPlayer.id);
    if (!exists) {
      newPick = [...pickPlayers, pickedPlayer];
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Player Already Selected",
      });
      newPick = pickPlayers;
    }
    setPickPlayers(newPick);
  };

  const deletePlayer = (deletedPlayer) => {
    const restPlayer = pickPlayers.filter(
      (player) => player.id !== deletedPlayer.id
    );
    setPickPlayers(restPlayer);
  };

  const clearAll = () => {
    setPickPlayers([]);
  };

  const luckyPlayer = () => {
    if (!pickPlayers.length) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "First Select Some Players",
      });
    } else {
      const random = Math.floor(Math.random() * pickPlayers.length);
      const luckyPlayerName = pickPlayers[random].Name;
      let timerInterval;
      Swal.fire({
        title: "Auto close alert!",
        html: "I will close in <b></b> milliseconds.",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            Swal.fire({
                icon: "success",
                title: "Hurry... Your Lucky Player is",
                text: luckyPlayerName,
              });
        }
      });
    }
  };

  return (
    <div className="player-container">
      <div>
        <h1 className="player-list-title">Players List</h1>
        <div className="player-list-container">
          {players.map((player) => (
            <Player
              key={player.id}
              player={player}
              pickPlayer={pickPlayer}
            ></Player>
          ))}
        </div>
      </div>
      <div className="top-player-container">
        <p className="top-player">Pick Top 11 Players</p>
        {pickPlayers.map((player) => (
          <PickPlayer
            key={player.id}
            player={player}
            deletePlayer={deletePlayer}
          ></PickPlayer>
        ))}
        <div className="lucky" onClick={luckyPlayer}>
          <p className="clear-font">Click To See Your Lucky Player</p>
          <FontAwesomeIcon icon={faTrophy} size="xl" />
        </div>
        <div className="clear" onClick={clearAll}>
          <p className="clear-font">Clear All</p>
          <FontAwesomeIcon icon={faTrash} size="xl" />
        </div>
      </div>
    </div>
  );
};

export default Players;
