export function handleOnboardingSubmit(e) {
  e.preventDefault();
  const formData = e.target instanceof FormData ? e.target : new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  console.log("Onboarding form submitted:", data);
  return data;
}
