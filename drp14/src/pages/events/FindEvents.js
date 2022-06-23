import React, { useState, useEffect, useCallback } from "react";
import Events from "./Events";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import "./FindEvents.css";

function FindEvents(props) {
  const location = useLocation();
  const { register, handleSubmit } = useForm();
  const [search, setSearch] = useState(false);
  const [events, setEvents] = useState([]);
  const [toggle, setToggle] = useState(false);

  const onFormSubmit = useCallback(
    async (data) => {
      var queries = { include: [], exclude: [] };
      for (let sport of data.query
        .split(",")
        .filter((x) => x !== "")
        .map((x) => x.trim())) {
        if (sport[0] === "-") {
          queries.exclude.push(sport.slice(1));
        } else {
          queries.include.push(sport);
        }
      }

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
