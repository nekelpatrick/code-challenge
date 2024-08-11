import React, { useState, useEffect } from 'react';

export const PersonCard = ({ person }) => {
  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);

  useEffect(() => {
    if (person.checkInDate) {
      setCheckedIn(true);
      setCheckInTime(new Date(person.checkInDate));
    }
  }, [person]);

  const handleCheckIn = () => {
    // Simulating a check-in
    setCheckedIn(true);
    setCheckInTime(new Date());
  };

  const handleCheckOut = () => {
    // Simulating a check-out
    setCheckedIn(false);
    setCheckInTime(null);
  };

  const formatDateTime = (date) => {
    if (!date) return 'N/A';
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const renderButton = () => {
    const fiveSecondsAgo = new Date(Date.now() - 5000);
    if (checkedIn && checkInTime > fiveSecondsAgo) {
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
          className="bg-red-500 px-4 py-2 text-white"
          onClick={handleCheckOut}
        >
          Check-out {person.firstName} {person.lastName}
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
