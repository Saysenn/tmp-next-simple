import ApplicationForm from "@/components/forms/ApplicationForm";

export default function Contact() {
  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-xl mx-auto">
        <h1>Apply</h1>
        <p className="text-gray-500 mb-8">Fill in the form below and attach your CV if you have one.</p>
        <ApplicationForm />
      </div>
    </main>
  );
}
