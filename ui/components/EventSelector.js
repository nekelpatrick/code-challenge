import React, { useEffect, useState } from 'react';

export const EventSelector = ({ setSelectedEvent }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the database (dummy data used here)
    const fetchEvents = async () => {
      // Simulating a database fetch with dummy data
      const dummyEvents = [
        { _id: '1', name: 'Tech Conference 2024' },
        { _id: '2', name: 'Music Festival' },
      ];
      setEvents(dummyEvents);
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
