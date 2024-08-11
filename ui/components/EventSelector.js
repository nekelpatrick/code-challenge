import React, { useEffect, useState } from 'react';
import { Communities } from '../../communities/communities';

export const EventSelector = ({ setSelectedEvent }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the Communities collection
    const fetchEvents = async () => {
      const eventsData = Communities.find().fetch(); // Fetch all events
      setEvents(eventsData);
    };

    fetchEvents();
  }, []);

  const handleSelect = (event) => {
    const eventId = event.target.value;
    const selected = events.find((e) => e._id === eventId);
    setSelectedEvent(selected);
  };

  return (
    <div className="mb-4">
      <select
        className="w-full border p-2"
        onChange={handleSelect}
        defaultValue=""
      >
        <option value="" disabled>
          Select an event
        </option>
        {events.map((event) => (
          <option key={event._id} value={event._id}>
            {event.name}
          </option>
        ))}
      </select>
    </div>
  );
};
