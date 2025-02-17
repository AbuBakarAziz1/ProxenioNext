import Link from "next/link";

const StepIndicator = ({ currentStep }) => {
  const steps = [
    { id: 1, title: "Profile Creation", path: "/profile-creation" },
    { id: 2, title: "Profile Details", path: "/profile-details" },
    { id: 3, title: "Video Introduction", path: "/video-introduction" },
    { id: 4, title: "Review and Submit", path: "/review-submit" },
  ];

  return (
    <div className="step-indicator flex flex-wrap justify-between mb-6">
      {steps.map((step) => (
        <Link key={step.id} href={step.path} className="text-decoration-none text-reset">
          <div className="flex items-center gap-3">
            <div className={`step ${currentStep === step.id ? "active" : ""}`}>{step.id}</div>
            <div className="step-title">{step.title}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default StepIndicator;
