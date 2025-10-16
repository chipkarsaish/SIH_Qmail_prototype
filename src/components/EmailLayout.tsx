import { Outlet } from "react-router-dom";
import { EmailSidebar } from "@/components/EmailSidebar";

export function EmailLayout() {
  return (
    <div className="flex h-screen">
      <EmailSidebar />
      <div className="flex-1 flex flex-col">
        <Outlet />  {/* The child pages like InboxPage, SentPage will render here */}
      </div>
    </div>
  );
}
