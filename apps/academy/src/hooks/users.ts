import { useState, useEffect } from "react";
import { getMe } from "../api/users";

interface AcademyUser {
  id: string;
  daia_user_id: string;
  total_xp: number;
  level: number;
  created_at: string;
}

export const useAcademyUser = () => {
  const [academyUser, setAcademyUser] = useState<AcademyUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getMe();
        setAcademyUser(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { academyUser, loading, error };
};