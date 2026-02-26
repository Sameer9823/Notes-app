'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react'


async function fetchUsers() {
    const res = await fetch('/api/users');
    return res.json();
}

const UserList = () => {

    const { data, error, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    })

  return (
    <div>
        <h2 className="text-xl font-bold mb-4">User List</h2>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && (
            <ul className="space-y-2">
                {data.map((user: { id: number; name: string; email: string }) => (
                    <li key={user.id} className="p-4 border rounded">
                        <h3 className="text-lg font-semibold">{user.name}</h3>
                        <p className="text-gray-600">{user.email}</p>
                    </li>
                ))}
            </ul>       
        )}
    </div>
  )
}

export default UserList