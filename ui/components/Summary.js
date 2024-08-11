import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { People } from '../../people/people';
import { Meteor } from 'meteor/meteor';

export const Summary = ({ selectedEvent }) => {
  const summary = useTracker(() => {
    if (selectedEvent) {
      Meteor.subscribe('people', selectedEvent._id);

      const peopleData = People.find({
        communityId: selectedEvent._id,
      }).fetch();

      const peopleCheckedIn = peopleData.filter(
        (person) => person.checkInDate && !person.checkOutDate
      ).length;

      const peopleNotCheckedIn = peopleData.length - peopleCheckedIn;

      const peopleByCompany = peopleData.reduce((acc, person) => {
        if (person.checkInDate && !person.checkOutDate) {
          const company = person.companyName || 'N/A';
          acc[company] = (acc[company] || 0) + 1;
        }
        return acc;
      }, {});

      return {
        peopleCheckedIn,
        peopleByCompany,
        peopleNotCheckedIn,
      };
    }
    return {
      peopleCheckedIn: 0,
      peopleByCompany: {},
      peopleNotCheckedIn: 0,
    };
  }, [selectedEvent, People.find({ communityId: selectedEvent?._id }).count()]);

  const renderCompanies = () =>
    Object.entries(summary.peopleByCompany)
      .map(([company, count]) => `${company || 'N/A'} (${count})`)
      .join(', ');

  return (
    <div className="mb-4">
      <p>
        <strong>People in the event right now:</strong>{' '}
        {summary.peopleCheckedIn}
      </p>
      <p>
        <strong>People by company in the event right now:</strong>{' '}
        {renderCompanies()}
      </p>
      <p>
        <strong>People not checked in:</strong> {summary.peopleNotCheckedIn}
      </p>
    </div>
  );
};
