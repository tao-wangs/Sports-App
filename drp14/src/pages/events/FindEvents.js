import React, { useState, useEffect, useCallback } from "react";
import Events from "./Events";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import "./FindEvents.css";
import { Button } from "@mui/material"
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun"
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer"
import SportsTennisIcon from "@mui/icons-material/SportsTennis"
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts"
import SportsCricketIcon from "@mui/icons-material/SportsCricket"
import PoolIcon from "@mui/icons-material/Pool"

function FindEvents(props) {
  const location = useLocation();
  const { register, handleSubmit } = useForm();
  const [search, setSearch] = useState(false);
  const [events, setEvents] = useState([]);
  const [toggle, setToggle] = useState(false);

  const onFormSubmit = useCallback(
    async (data) => {
      const queries = data.query.split(" ").filter((x) => x !== "");
      const params = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queries }),
      };

      const response = await fetch("/filter_events", params);
      const body = await response.json();
      setEvents(body.events);
      setSearch(true);
      setToggle(!toggle);
    },
    [toggle]
  );

  useEffect(() => {
    async function onFormSubmit(data) {
      const queries = data.query.split(" ").filter((x) => x !== "");
      const params = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queries }),
      };

      const response = await fetch("/filter_events", params);
      const body = await response.json();
      setEvents(body.events);
      setSearch(true);
      setToggle(data.query);
    }
    if (location.state) {
      onFormSubmit(location.state);
    }
  }, [location.state]);

  return (
    <div className="findEventsPage">
      <div className="findEventsPage__info">
        <h1>Events</h1>
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="form-inline my-2 my-lg-0"
        >
          <input
            name="query"
            {...register("query")}
            className="form-control mr-sm-2 m-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
        <Button variant="outlined">
          <DirectionsRunIcon/>
          Athletic
        </Button>
        <Button variant="outlined">
          <SportsSoccerIcon/>
          Ball
        </Button>
        <Button variant="outlined">
          <SportsTennisIcon/>
          Racket
        </Button>
        <Button variant="outlined">
          <SportsMartialArtsIcon/>
          Martial Arts
        </Button>
        <Button variant="outlined">
          <SportsCricketIcon/>
          Bat
        </Button>
        <Button variant="outlined">
          <PoolIcon/>
          Water Sports
        </Button>
        {/* can always add more here */}
      </div>
      {search || location.state ? (
        <Events events={events} filter={toggle} />
      ) : (
        <Events />
      )}
    </div>
  );
}

export default FindEvents;
