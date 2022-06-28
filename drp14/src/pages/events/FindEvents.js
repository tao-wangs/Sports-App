import React, { useState, useEffect, useCallback } from "react";
import Events from "./Events";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import "./FindEvents.css";
import { Button } from "@mui/material";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsTennisIcon from "@mui/icons-material/SportsTennis";
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";
import SportsCricketIcon from "@mui/icons-material/SportsCricket";
import PoolIcon from "@mui/icons-material/Pool";

function FindEvents(props) {
  const location = useLocation();
  const { register, handleSubmit } = useForm();
  const [query, setQuery] = useState({
    include: [],
    exclude: [],
  });
  const [categories, setCategories] = useState([]);
  const [toggle, setToggle] = useState({ events: [], query: {} });

  useEffect(() => {
    async function getEvents() {
      var finalQuery = {
        include: query.include,
        exclude: query.exclude,
        categories: categories,
      };

      const params = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: finalQuery,
        }),
      };

      const response = await fetch("/filter_events", params);
      const body = await response.json();
      setToggle({ events: body.events, query: finalQuery });
    }
    getEvents();
  }, [query, categories]);

  const onFormSubmit = useCallback(async (data) => {
    var include = [];
    var exclude = [];
    for (let sport of data.query
      .split(",")
      .filter((x) => x !== "")
      .map((x) => x.trim())) {
      if (sport[0] === "-") {
        exclude.push(sport.slice(1));
      } else {
        include.push(sport);
      }
    }

    setQuery({
      include: include,
      exclude: exclude,
    });
  }, []);

  const toggleCategory = (category) => {
    if (!categories.includes(category)) {
      setCategories([category, ...categories]);
    } else {
      setCategories(categories.filter((x) => x !== category));
    }
  };

  useEffect(() => {
    if (location.state) {
      onFormSubmit(location.state);
    }
  }, [location.state, onFormSubmit]);

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
        <Button variant="outlined" onClick={() => toggleCategory("athletic")}>
          <DirectionsRunIcon />
          Athletic
        </Button>
        <Button variant="outlined" onClick={() => toggleCategory("ball")}>
          <SportsSoccerIcon />
          Ball
        </Button>
        <Button variant="outlined" onClick={() => toggleCategory("bat")}>
          <SportsCricketIcon />
          Bat
        </Button>
        <Button
          variant="outlined"
          onClick={() => toggleCategory("martial_arts")}
        >
          <SportsMartialArtsIcon />
          Martial Arts
        </Button>
        <Button variant="outlined" onClick={() => toggleCategory("racket")}>
          <SportsTennisIcon />
          Racket
        </Button>
        <Button variant="outlined" onClick={() => toggleCategory("water")}>
          <PoolIcon />
          Water Sports
        </Button>
        {/* can always add more here */}
      </div>
      <Events events={toggle.events} filter={toggle.query} />
    </div>
  );
}

export default FindEvents;
