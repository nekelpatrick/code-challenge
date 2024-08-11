import React from 'react';
import { People } from '../../people/people';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import PersonCard from './PersonCard';

export const PeopleList = ({ selectedEvent }) => {
  const people = useTracker(() => {
    if (selectedEvent) {
      const handler = Meteor.subscribe('people', selectedEvent._id);
      if (handler.ready()) {
        return People.find({ communityId: selectedEvent._id }).fetch();
      }
    }
    return [];
  }, [selectedEvent]);

  return (
    <div className="grid grid-cols-1 gap-4">
      {people.map((person) => (
        <PersonCard key={person._id} person={person} />
      ))}
    </div>
  );
};
