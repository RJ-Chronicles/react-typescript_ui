// import { useEffect, useState } from "react";

// const useLogoutTimer = () => {
//   const [currentTime, setCurrentTime] = useState(Date.now());
//   const [logoutTime, setLogoutTime] = useState(undefined);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(Date.now());
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     const logoutTimeFromStorage = localStorage.getItem("expirationTime");
//     if (logoutTimeFromStorage) {
//       setLogoutTime(parseInt(logoutTimeFromStorage, 10));
//     }
//   }, []);

//   useEffect(() => {
//     if (currentTime >= logoutTime) {
//       logoutUser();
//     }
//   }, [currentTime, logoutTime]);

//   const logoutUser = () => {
//     localStorage.removeItem("logoutTime");
//     alert("You have been logged out due to inactivity.");
//     // Perform additional logout logic here if needed
//   };

//   return { currentTime, logoutTime };
// };

// export default useLogoutTimer;

import { useState, useEffect } from "react";

const useRemainingTime = (targetEpochTime) => {
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const remaining = targetEpochTime - currentTime;
    setRemainingTime(
      remaining > 0 ? Math.floor((remaining % (1000 * 60)) / 1000) : 0
    );
  }, [currentTime, targetEpochTime]);

  return { remainingTime };
};

export default useRemainingTime;
