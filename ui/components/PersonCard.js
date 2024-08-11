import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';

export const PersonCard = ({ person }) => {
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    setCheckedIn(!!person.checkInDate && !person.checkOutDate);
    const initialCheckInTime = person.checkInDate
      ? new Date(person.checkInDate)
      : null;
    setCheckInTime(initialCheckInTime);

    if (initialCheckInTime && !person.checkOutDate) {
      const timeElapsedSinceCheckIn = Math.floor(
        (new Date() - initialCheckInTime) / 1000
      );

      if (timeElapsedSinceCheckIn > 5) {
        setElapsedTime(6); // Set to 6 to immediately enable the "Check-out" button
      } else {
        setElapsedTime(timeElapsedSinceCheckIn);
        const interval = setInterval(() => {
          setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
        }, 1000);

        return () => clearInterval(interval); // Cleanup the interval on component unmount
      }
    } else {
      setElapsedTime(0); // Reset elapsed time when the person is checked out
    }

    return undefined; // Explicitly return undefined when no cleanup is needed
  }, [person]);

  const handleCheckIn = () => {
    const currentTime = new Date();
    Meteor.call('people.checkIn', person._id, currentTime, (error) => {
      if (!error) {
        setCheckedIn(true);
        setCheckInTime(currentTime);
        setElapsedTime(0); // Reset the timer when checked in
      }
    });
  };

  const handleCheckOut = () => {
    Meteor.call('people.checkOut', person._id, (error) => {
      if (!error) {
        setCheckedIn(false);
        setCheckInTime(null);
        setElapsedTime(0);
      }
    });
  };

  const formatDateTime = (date) => {
    if (!date) return 'N/A';
    return `${date.toLocaleDateString('en-US')} ${date.toLocaleTimeString('en-US')}`;
  };

  const renderButton = () => {
    if (checkedIn && elapsedTime > 5) {
      return (
        <button
          className="bg-red-500 px-4 py-2 text-white"
          onClick={handleCheckOut}
        >
          Check-out {person.firstName} {person.lastName}
        </button>
      );
    }

    if (checkedIn) {
      return (
        <button
          className="cursor-not-allowed bg-gray-400 px-4 py-2 text-white"
          disabled
        >
          Check-out {person.firstName} {person.lastName} (Available in{' '}
          {5 - elapsedTime}s)
        </button>
      );
    }

    return (
      <button
        className="bg-green-500 px-4 py-2 text-white"
        onClick={handleCheckIn}
      >
        Check-in {person.firstName} {person.lastName}
      </button>
    );
  };

  return (
    <div className="border p-4">
      <h2 className="text-xl font-bold">
        {person.firstName} {person.lastName}
      </h2>
      <p>Company: {person.companyName || 'N/A'}</p>
      <p>Title: {person.title || 'N/A'}</p>
      <p>Check-in date: {formatDateTime(checkInTime)}</p>
      <p>Check-out date: {formatDateTime(person.checkOutDate)}</p>
      {renderButton()}
    </div>
  );
};
