import { AppSidebar } from '@/components/Sidebar';
import { TemplateViewer } from '@/components/TemplateViewer';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import './App.css';

function App() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <AppSidebar />
        <SidebarInset className="flex-1 overflow-hidden flex flex-col">
          <TemplateViewer />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

export default App;
