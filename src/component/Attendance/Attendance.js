import React from "react";
import { useEffect } from "react";
// import { useState } from "react";

const Attendance = () => {
    // const [attendance, setAttendance] = useState([]);
    
  useEffect(() => {
    fetch(`https://test.nexisltd.com/test`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
    
  return (
    <div className="my-10">
      <h2 className="text-2xl text-center font-bold mb-5">Attendance information</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Employee Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>11/7/16</td>
              <td>Arlene McCoy</td>
              <td>Present</td>
            </tr>
            <tr>
              <td>11/7/16</td>
              <td>Arlene McCoy</td>
              <td>Present</td>
            </tr>
            <tr>
              <td>11/7/16</td>
              <td>Arlene McCoy</td>
              <td>Present</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attendance;
