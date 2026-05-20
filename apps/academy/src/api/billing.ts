import { daiaAPI } from "./axios";

export interface StripeSubscription {
  id: string;
  status: string;
  cancel_at_period_end: boolean;
  current_period_end: number;
  amount: number;
  currency: string;
  interval: string;
}

export const getSubscription = async (): Promise<StripeSubscription | null> => {
  const res = await daiaAPI.get("/billing/subscription");
  return res.data.subscription;
};

export const cancelSubscription = async (): Promise<void> => {
  await daiaAPI.post("/billing/subscription/cancel");
};

export const reactivateSubscription = async (): Promise<void> => {
  await daiaAPI.post("/billing/subscription/reactivate");
};
