import React, { useEffect, useState } from 'react';
import { People } from '../../people/people';

export const Summary = ({ selectedEvent }) => {
  const [summary, setSummary] = useState({
    peopleCheckedIn: 0,
    peopleByCompany: {},
    peopleNotCheckedIn: 0,
  });

  useEffect(() => {
    // Calculate summary data from the People collection based on the selected event
    const calculateSummary = async () => {
      const peopleData = People.find({ eventId: selectedEvent._id }).fetch();

      const peopleCheckedIn = peopleData.filter(
        (person) => person.checkInDate
      ).length;
      const peopleNotCheckedIn = peopleData.length - peopleCheckedIn;

      const peopleByCompany = peopleData.reduce((acc, person) => {
        if (person.checkInDate) {
          acc[person.company] = (acc[person.company] || 0) + 1;
        }
        return acc;
      }, {});

      setSummary({
        peopleCheckedIn,
        peopleByCompany,
        peopleNotCheckedIn,
      });
    };

    if (selectedEvent) {
      calculateSummary();
    }
  }, [selectedEvent]);

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
