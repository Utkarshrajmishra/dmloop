"use client";

import useSWR from "swr";

interface User {
  id: number;
  name: string;
  email: string;
  averageWPM: number;
  averageAccuracy: number;
  totalTime: number;
}

// Fetcher function to get users
const fetcher = async (url: string): Promise<User[]> => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.statusText}`);
  }

  return response.json();
};

const LeaderBoard = () => {
  const {
    data: users,
    error,
    isValidating,
  } = useSWR<User[]>("/api/db/getUsers", fetcher, {
    refreshInterval: 30000, 
    revalidateOnFocus: true,
  });

  if (error) return <div>Error loading data: {error.message}</div>;
  if (!users) return <div>Loading...</div>;

  return (
    <div>
      <h1>Leaderboard</h1>
      {isValidating && <p>Updating...</p>}
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - WPM: {user.averageWPM} - Accuracy:{" "}
            {user.averageAccuracy}% - Total Time: {user.totalTime}s
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderBoard;
