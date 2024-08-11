import React, { useState } from 'react';
import EventSelector from './components/EventSelector';
import PeopleList from './components/PeopleList';
import Summary from './components/Summary';

export const App = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">Event Check-In System</h1>
      <EventSelector setSelectedEvent={setSelectedEvent} />
      {selectedEvent && (
        <>
          <Summary selectedEvent={selectedEvent} />
          <PeopleList selectedEvent={selectedEvent} />
        </>
      )}
    </div>
  );
};
