import { useEffect, useState } from "react";
import api from "../lib/axios";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | undefined;
  bio: string | undefined;
}

export function useUsers(search: string) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await api.get("/users", {
          params: { search },
        });

        setUsers(res.data.users);
      } catch (error) {
        console.error("Fetch users error:", error);
      } finally {
        setLoading(false);
      }
    };

    const timeout = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  return { users, loading };
}