import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_DAIA_API,
  withCredentials: true,
});

export interface SetupIntentResponse {
  client_secret: string;
  customer_id: string;
}

export interface EnrollPayload {
  first_name:         string;
  last_name:          string;
  email:              string;
  password?:          string;
  has_account?:       boolean;
  goal:               string;
  availability:       string;
  stripe_customer_id: string;
  setup_intent_id:    string;
}

export const createSetupIntent = (email: string): Promise<SetupIntentResponse> =>
  api.post(`/waitlist/setup?email=${encodeURIComponent(email)}`).then(r => r.data);

export const enrollWaitlist = (payload: EnrollPayload): Promise<{ waitlist_id: string }> =>
  api.post("/waitlist/enroll", payload).then(r => r.data);
