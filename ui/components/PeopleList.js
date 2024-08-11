import React, { useEffect, useState } from 'react';
import { People } from '../../people/people';

import PersonCard from './PersonCard';

export const PeopleList = ({ selectedEvent }) => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    // Fetch people data from the People collection based on the selected event
    const fetchPeople = async () => {
      const peopleData = People.find({ eventId: selectedEvent._id }).fetch();
      setPeople(peopleData);
    };

    if (selectedEvent) {
      fetchPeople();
    }
  }, [selectedEvent]);

  return (
    <div className="grid grid-cols-1 gap-4">
      {people.map((person) => (
        <PersonCard key={person._id} person={person} />
      ))}
    </div>
  );
};
