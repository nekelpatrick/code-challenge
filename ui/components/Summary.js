import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { People } from '../../people/people';
import { Meteor } from 'meteor/meteor';

export const Summary = ({ selectedEvent }) => {
  const summary = useTracker(() => {
    if (selectedEvent) {
      Meteor.subscribe('people', selectedEvent._id);

      // Fetch the people data associated with the selected event
      const peopleData = People.find({
        communityId: selectedEvent._id,
      }).fetch();

      // Calculate the number of people currently checked in
      const peopleCheckedIn = peopleData.filter(
        (person) => person.checkInDate && !person.checkOutDate
      ).length;

      // Calculate the number of people not checked in
      const peopleNotCheckedIn = peopleData.length - peopleCheckedIn;

      // Group people by company who are currently checked in
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
  }, [selectedEvent]);

  // Helper function to render the companies and their counts
  const renderCompanies = () =>
    Object.entries(summary.peopleByCompany)
      .map(([company, count]) => `${company} (${count})`)
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
