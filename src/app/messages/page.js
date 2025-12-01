import Messages from "@/components/Messages";

export const metadata = {
  title: "Mail | Sheffgram",
};

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-4xl px-5 pb-16 pt-10 sm:px-8">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">Mail</h1>
          <p className="text-sm text-slate-600">
            Your inbox — mark messages as read.
          </p>
        </header>
        <Messages />
      </div>
    </div>
  );
}
