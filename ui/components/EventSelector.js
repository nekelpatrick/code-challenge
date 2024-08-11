import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Communities } from '../../communities/communities';

export const EventSelector = ({ setSelectedEvent }) => {
  const events = useTracker(() => {
    Meteor.subscribe('communities');
    return Communities.find().fetch();
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
