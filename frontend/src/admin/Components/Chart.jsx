import React, { useState, useEffect } from "react";
import axios from "axios";

const Chart = () => {
  const api = import.meta.env.VITE_URL;
  const [userCounts, setUserCounts] = useState({
    teacher: 0,
    student: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${api}/users`);
        if (response.status === 200) {
          const users = response.data.data;
          const counts = {
            teacher: users.filter((user) => user.role === "teacher").length,
            student: users.filter((user) => user.role === "student").length,
          };
          setUserCounts(counts);
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-center mt-4">Loading data...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-red-500">Error: {error}</div>;
  }

  const totalUsers = userCounts.teacher + userCounts.student;

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-md p-6">
      <h2 className="text-xl font-semibold mb-4 text-center">User Summary</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-100 p-4 rounded-md shadow-md text-center">
          <h3 className="text-lg font-semibold text-blue-700">Teachers</h3>
          <p className="text-3xl font-bold mt-2">{userCounts.teacher}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-md shadow-md text-center">
          <h3 className="text-lg font-semibold text-green-700">Students</h3>
          <p className="text-3xl font-bold mt-2">{userCounts.student}</p>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="text-gray-700 font-semibold">Total Users: {totalUsers}</p>
      </div>
    </div>
  );
};

export default Chart;
