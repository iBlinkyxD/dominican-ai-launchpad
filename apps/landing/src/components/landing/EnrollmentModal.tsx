import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { lookupByEmail } from "@/api/auth";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { X, ChevronRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createSetupIntent, enrollWaitlist } from "@/api/waitlist";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// ── Step indicators ───────────────────────────────────────────────────────────

const StepBar = ({ current, steps }: { current: number; steps: string[] }) => (
  <div className="flex items-center gap-2 mb-8">
    {steps.map((label, i) => (
      <div key={i} className="flex items-center gap-2 flex-1 last:flex-none">
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
            i < current   ? "bg-green-500 text-white"
            : i === current ? "bg-[#0B1E40] text-white"
            : "bg-gray-100 text-gray-400"
          }`}>
            {i < current ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
          </div>
          <span className={`text-xs font-medium hidden sm:block ${
            i === current ? "text-[#0B1E40]" : "text-gray-400"
          }`}>{label}</span>
        </div>
        {i < steps.length - 1 && (
          <div className={`flex-1 h-px mx-1 ${i < current ? "bg-green-400" : "bg-gray-200"}`} />
        )}
      </div>
    ))}
  </div>
);

// ── Step 1: Account info ──────────────────────────────────────────────────────

interface Step1Data { first_name: string; last_name: string; email: string; password: string; has_account: boolean }

const INPUT = "w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20 focus:border-[#0B1E40]";

const Step1 = ({
  data, onChange, onNext,
}: {
  data: Step1Data;
  onChange: (d: Partial<Step1Data>) => void;
  onNext: () => void;
}) => {
  const { t } = useTranslation("courses");
  const [showPass, setShowPass] = useState(false);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [lookupDone, setLookupDone] = useState(false);

  const handleAccountToggle = (hasAccount: boolean) => {
    onChange({ has_account: hasAccount, password: "", first_name: "", last_name: "" });
    setLookupDone(false);
    setLookupError(null);
  };

  const handleLookup = async () => {
    setLookupLoading(true);
    setLookupError(null);
    try {
      const result = await lookupByEmail(data.email);
      onChange({ first_name: result.first_name, last_name: result.last_name });
      setLookupDone(true);
    } catch {
      setLookupError("No account found with this email.");
    } finally {
      setLookupLoading(false);
    }
  };

  const valid = data.has_account
    ? lookupDone && data.first_name && data.last_name
    : data.first_name && data.last_name && data.email && data.password.length >= 8;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-[#0B1E40] mb-1">{t("enrollment.step1.title")}</h2>
        <p className="text-sm text-muted-foreground">{t("enrollment.step1.subtitle")}</p>
      </div>

      {/* Has account toggle */}
      <div className="flex rounded-xl border border-gray-200 overflow-hidden text-sm font-medium">
        <button
          type="button"
          onClick={() => handleAccountToggle(false)}
          className={`flex-1 py-2.5 transition-colors ${!data.has_account ? "bg-[#0B1E40] text-white" : "text-gray-500 hover:bg-gray-50"}`}
        >
          {t("enrollment.step1.newUser")}
        </button>
        <button
          type="button"
          onClick={() => handleAccountToggle(true)}
          className={`flex-1 py-2.5 transition-colors ${data.has_account ? "bg-[#0B1E40] text-white" : "text-gray-500 hover:bg-gray-50"}`}
        >
          {t("enrollment.step1.hasAccount")}
        </button>
      </div>

      {data.has_account ? (
        <>
          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">{t("enrollment.step1.email")}</label>
            <div className="flex gap-2">
              <input
                type="email"
                value={data.email}
                onChange={e => { onChange({ email: e.target.value }); setLookupDone(false); setLookupError(null); }}
                className={INPUT}
                placeholder="you@example.com"
              />
              <Button
                type="button"
                onClick={handleLookup}
                disabled={!data.email || lookupLoading}
                className="shrink-0 bg-[#0B1E40] hover:bg-[#0B1E40]/90 px-4"
              >
                {lookupLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Find"}
              </Button>
            </div>
          </div>

          {lookupError && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{lookupError}</p>
          )}

          {lookupDone && (
            <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2.5 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              <span className="text-sm text-green-800 font-medium">
                {data.first_name} {data.last_name}
              </span>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">{t("enrollment.step1.firstName")}</label>
              <input value={data.first_name} onChange={e => onChange({ first_name: e.target.value })} className={INPUT} placeholder="John" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 mb-1 block">{t("enrollment.step1.lastName")}</label>
              <input value={data.last_name} onChange={e => onChange({ last_name: e.target.value })} className={INPUT} placeholder="Doe" />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">{t("enrollment.step1.email")}</label>
            <input type="email" value={data.email} onChange={e => onChange({ email: e.target.value })} className={INPUT} placeholder="you@example.com" />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 mb-1 block">{t("enrollment.step1.password")}</label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={data.password}
                onChange={e => onChange({ password: e.target.value })}
                className={`${INPUT} pr-16`}
                placeholder={t("enrollment.step1.passwordPlaceholder")}
              />
              <button
                type="button"
                onClick={() => setShowPass(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
              >
                {showPass ? t("enrollment.step1.hidePassword") : t("enrollment.step1.showPassword")}
              </button>
            </div>
          </div>
        </>
      )}

      <Button onClick={onNext} disabled={!valid} className="w-full bg-[#0B1E40] hover:bg-[#0B1E40]/90 h-11 font-semibold">
        {t("enrollment.step1.continue")} <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
};

// ── Step 2: Learning context ──────────────────────────────────────────────────

interface Step2Data { goal: string; availability: string }

const Step2 = ({
  data, onChange, onNext, onBack,
}: {
  data: Step2Data;
  onChange: (d: Partial<Step2Data>) => void;
  onNext: () => void;
  onBack: () => void;
}) => {
  const { t } = useTranslation("courses");
  const availabilityOptions = t("enrollment.step2.availabilityOptions", { returnObjects: true }) as string[];
  const valid = data.goal.trim().length > 10 && data.availability;

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-[#0B1E40] mb-1">{t("enrollment.step2.title")}</h2>
        <p className="text-sm text-muted-foreground">{t("enrollment.step2.subtitle")}</p>
      </div>
      <div>
        <label className="text-xs font-medium text-gray-700 mb-1 block">{t("enrollment.step2.goalLabel")}</label>
        <textarea
          rows={4}
          value={data.goal}
          onChange={e => onChange({ goal: e.target.value })}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B1E40]/20 focus:border-[#0B1E40] resize-none"
          placeholder={t("enrollment.step2.goalPlaceholder")}
        />
      </div>
      <div>
        <label className="text-xs font-medium text-gray-700 mb-2 block">{t("enrollment.step2.availabilityLabel")}</label>
        <div className="grid grid-cols-2 gap-2">
          {availabilityOptions.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => onChange({ availability: opt })}
              className={`text-left px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                data.availability === opt
                  ? "bg-[#0B1E40] border-[#0B1E40] text-white"
                  : "border-gray-200 text-gray-600 hover:border-[#0B1E40]/40"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1 h-11">{t("enrollment.step2.back")}</Button>
        <Button onClick={onNext} disabled={!valid} className="flex-1 bg-[#0B1E40] hover:bg-[#0B1E40]/90 h-11 font-semibold">
          {t("enrollment.step2.continue")} <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

// ── Step 3: Payment (inner — needs Stripe context) ────────────────────────────

const PaymentForm = ({
  formData, customerId, onSuccess, onBack,
}: {
  formData: { first_name: string; last_name: string; email: string; password: string; goal: string; availability: string };
  customerId: string;
  onSuccess: () => void;
  onBack: () => void;
}) => {
  const { t } = useTranslation("courses");
  const stripe   = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!stripe || !elements) return;
    setLoading(true);
    setError(null);

    const { setupIntent, error: stripeError } = await stripe.confirmSetup({
      elements,
      redirect: "if_required",
    });

    if (stripeError) {
      setError(stripeError.message ?? t("enrollment.errors.paymentFailed"));
      setLoading(false);
      return;
    }

    if (!setupIntent) {
      setError(t("enrollment.errors.paymentFailed"));
      setLoading(false);
      return;
    }

    try {
      await enrollWaitlist({
        ...formData,
        stripe_customer_id: customerId,
        setup_intent_id: setupIntent.id,
      });
      onSuccess();
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail;
      setError(msg ?? t("enrollment.errors.enrollmentFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-[#0B1E40] mb-1">{t("enrollment.payment.title")}</h2>
        <p className="text-sm text-muted-foreground">
          {t("enrollment.payment.subtitlePre")}{" "}
          <strong>{t("enrollment.payment.subtitleBold")}</strong>{" "}
          {t("enrollment.payment.subtitlePost")}
        </p>
      </div>

      <div className="bg-[#F8F7F4] rounded-xl p-4 text-sm text-gray-600 border border-gray-200">
        <div className="flex justify-between mb-1">
          <span>{t("enrollment.payment.planLabel")}</span>
          <span className="font-semibold text-[#0B1E40]">{t("enrollment.payment.planPrice")}</span>
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>{t("enrollment.payment.billingNote")}</span>
          <span>{t("enrollment.payment.noCharge")}</span>
        </div>
      </div>

      <PaymentElement />

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
      )}

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} disabled={loading} className="flex-1 h-11">
          {t("enrollment.payment.back")}
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={loading || !stripe}
          className="flex-1 bg-[#C72B2B] hover:bg-[#C72B2B]/90 h-11 font-semibold"
        >
          {loading
            ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{t("enrollment.payment.submitting")}</>
            : t("enrollment.payment.submit")}
        </Button>
      </div>

      <p className="text-center text-xs text-gray-400">🔒 {t("enrollment.payment.stripeNote")}</p>
    </div>
  );
};

// ── Success screen ────────────────────────────────────────────────────────────

const SuccessScreen = ({ firstName, onClose }: { firstName: string; onClose: () => void }) => {
  const { t } = useTranslation("courses");
  return (
    <div className="text-center py-6">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
        <CheckCircle2 className="w-9 h-9 text-green-500" />
      </div>
      <h2 className="text-2xl font-semibold text-[#0B1E40] mb-2">
        {t("enrollment.success.title", { name: firstName })}
      </h2>
      <p className="text-muted-foreground mb-2">{t("enrollment.success.subtitle")}</p>
      <p className="text-sm text-gray-400 mb-8">{t("enrollment.success.note")}</p>
      <Button onClick={onClose} className="bg-[#0B1E40] hover:bg-[#0B1E40]/90 px-8 h-11 font-semibold">
        {t("enrollment.success.done")}
      </Button>
    </div>
  );
};

// ── Root modal ────────────────────────────────────────────────────────────────

export const EnrollmentModal = ({ onClose }: { onClose: () => void }) => {
  const { t, i18n } = useTranslation("courses");
  const stripeLocale = i18n.language?.startsWith("es") ? "es" : "en";
  const steps = t("enrollment.steps", { returnObjects: true }) as string[];

  const [step,          setStep]          = useState(0);
  const [succeeded,     setSucceeded]     = useState(false);
  const [clientSecret,  setClientSecret]  = useState<string | null>(null);
  const [customerId,    setCustomerId]    = useState<string>("");
  const [loadingIntent, setLoadingIntent] = useState(false);

  const [step1, setStep1] = useState({ first_name: "", last_name: "", email: "", password: "", has_account: false });
  const [step2, setStep2] = useState({ goal: "", availability: "" });

  useEffect(() => {
    if (step !== 2 || clientSecret) return;
    setLoadingIntent(true);
    createSetupIntent(step1.email)
      .then(res => { setClientSecret(res.client_secret); setCustomerId(res.customer_id); })
      .catch(() => {})
      .finally(() => setLoadingIntent(false));
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 bg-[#C72B2B] rounded-full" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#0B1E40]">
                {t("enrollment.header")}
              </span>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {!succeeded && <StepBar current={step} steps={steps} />}

          {succeeded ? (
            <SuccessScreen firstName={step1.first_name} onClose={onClose} />
          ) : step === 0 ? (
            <Step1 data={step1} onChange={d => setStep1(p => ({ ...p, ...d }))} onNext={() => setStep(1)} />
          ) : step === 1 ? (
            <Step2
              data={step2}
              onChange={d => setStep2(p => ({ ...p, ...d }))}
              onNext={() => setStep(2)}
              onBack={() => setStep(0)}
            />
          ) : loadingIntent || !clientSecret ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-[#0B1E40]" />
              <p className="text-sm text-muted-foreground">{t("enrollment.loadingPayment")}</p>
            </div>
          ) : (
            <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "stripe" }, locale: stripeLocale }}>
              <PaymentForm
                formData={{ ...step1, ...step2 }}
                customerId={customerId}
                onSuccess={() => setSucceeded(true)}
                onBack={() => setStep(1)}
              />
            </Elements>
          )}
        </div>
      </div>
    </div>
  );
};
