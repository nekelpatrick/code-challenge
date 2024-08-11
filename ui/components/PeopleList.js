import React, { useEffect, useState } from 'react';

export const Summary = ({ selectedEvent }) => {
  const [summary, setSummary] = useState({
    peopleCheckedIn: 0,
    peopleByCompany: {},
    peopleNotCheckedIn: 0,
  });

  useEffect(() => {
    // Fetch summary data from the database based on the selected event
    const fetchSummary = async () => {
      // Simulating a database fetch with dummy data
      const dummySummary = {
        peopleCheckedIn: 10,
        peopleByCompany: {
          'Green Group': 10,
          'Hoppe Group': 5,
        },
        peopleNotCheckedIn: 200,
      };
      setSummary(dummySummary);
    };

    if (selectedEvent) {
      fetchSummary();
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
