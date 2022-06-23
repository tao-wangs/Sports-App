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

  // async function onFormSubmit(data) {
  //   const params = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ query: data.query }),
  //   };

  //   const response = await fetch("/filter_events", params);
  //   const body = await response.json();
  //   setEvents(body.events);
  //   setSearch(true);
  //   setToggle(!toggle);
  // }

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
    if (location.state) {
      onFormSubmit(location.state);
    }
  }, [onFormSubmit, location.state]);

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
