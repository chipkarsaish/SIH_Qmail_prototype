import { Shield, Inbox, Send, FileText, AlertTriangle, Archive, StickyNote, Folder } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface FolderItem {
  id: string;
  name: string;
  icon: React.ElementType;
  count?: number;
  isSpecial?: boolean;
}

const folders: FolderItem[] = [
  { id: "index", name: "Inbox", icon: Inbox, count: 2 },
  { id: "sent", name: "Sent Items", icon: Send },
  { id: "draft", name: "Drafts", icon: FileText, count: 2 },
  { id: "junk", name: "Junk Email", icon: AlertTriangle },
  { id: "archive", name: "Archive", icon: Archive },
];



export function EmailSidebar() {
  const navigate = useNavigate();

  return (
    <div className="w-60 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Header */}


      {/* Folders Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          <div className="text-xs font-semibold text-muted-foreground px-3 py-2">
            Favourites
          </div>

          
          {folders.slice(0, 3).map((folder) => (
            <button
              key={folder.id}
              onClick={() => navigate(`/${folder.id}`)} 
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-sidebar-accent transition-colors text-sm",
                folder.id === "inbox" && "bg-sidebar-accent text-sidebar-primary font-medium"
              )}
            >
              <folder.icon className="w-4 h-4" />
              <span className="flex-1 text-left">{folder.name}</span>
              {folder.count && (
                <span className="text-xs text-muted-foreground">{folder.count}</span>
              )}
            </button>
          ))}

          <div className="text-xs font-semibold text-muted-foreground px-3 py-2 mt-4">
            Folders
          </div>

          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => navigate(`/${folder.id}`)}  // 👈 Add this line
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-sidebar-accent transition-colors text-sm",
                folder.id === "inbox" && "bg-sidebar-accent text-sidebar-primary font-medium"
              )}
            >
              <folder.icon className="w-4 h-4" />
              <span className="flex-1 text-left">{folder.name}</span>
              {folder.count && (
                <span className="text-xs text-muted-foreground">{folder.count}</span>
              )}
            </button>
          ))}

          {/* Security Center - Special Section */}
          <div className="mt-6 border-t border-sidebar-border pt-4">
            <button
              onClick={() => navigate('/security-center')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-quantum/10 transition-colors text-sm group"
            >
              <div className="relative">
                <Shield className="w-4 h-4 text-quantum" />
                <span className="absolute -top-1 -right-1 text-[10px]">⚛️</span>
              </div>
              <span className="flex-1 text-left font-semibold text-quantum">Security Center</span>
            </button>
          </div>


        </div>
      </div>
    </div>
  );
}
