import { Link, useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  baseTemplates,
  combinedTemplates,
  wixBaseTemplates,
  wpTemplates,
} from "@/data/templates";
import { TemplatePreview } from "./TemplatePreview";
import {
  FileCode2,
  Layers,
  PanelLeftClose,
  PanelLeft,
  ChevronDown,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const { category, fileName } = useParams<{
    category: string;
    fileName: string;
  }>();
  const { state, toggleSidebar } = useSidebar();
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [templateType, setTemplateType] = useState<"motive" | "wix" | "wp">(
    "motive"
  );

  const isActive = (templateCategory: string, templateFileName: string) => {
    return category === templateCategory && fileName === templateFileName;
  };

  const isHovered = (templateFileName: string) => {
    return hoveredTemplate === templateFileName;
  };

  const currentBaseTemplates =
    templateType === "motive"
      ? baseTemplates
      : templateType === "wix"
      ? wixBaseTemplates
      : wpTemplates;
  const currentCombinedTemplates =
    templateType === "motive" ? combinedTemplates : [];

  const filteredBaseTemplates = useMemo(() => {
    if (!searchQuery) return currentBaseTemplates;
    return currentBaseTemplates.filter((template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, currentBaseTemplates]);

  const filteredCombinedTemplates = useMemo(() => {
    if (!searchQuery) return currentCombinedTemplates;
    return currentCombinedTemplates.filter((template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, currentCombinedTemplates]);

  // Group WP templates by project folder
  const wpProjectGroups = useMemo(() => {
    if (templateType !== "wp") return {};

    const groups: Record<string, typeof wpTemplates> = {};
    const templatesToGroup = searchQuery ? filteredBaseTemplates : wpTemplates;

    templatesToGroup.forEach((template) => {
      const projectName = template.name.split(" / ")[0];
      if (!groups[projectName]) {
        groups[projectName] = [];
      }
      groups[projectName].push(template);
    });

    return groups;
  }, [templateType, searchQuery, filteredBaseTemplates]);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader style={{ padding: "20px" }}>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2 px-2">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <FileCode2 className="size-4" />
              </div>
              <div className="flex-1">
                <Select
                  value={templateType}
                  onValueChange={(value: "motive" | "wix" | "wp") =>
                    setTemplateType(value)
                  }
                >
                  <SelectTrigger className="h-auto py-1 border-0 shadow-none focus:ring-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="motive">Motive Templates</SelectItem>
                    <SelectItem value="wix">Wix Templates</SelectItem>
                    <SelectItem value="wp">WP Templates</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-xs text-muted-foreground">
                  Browse Components
                </span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="relative mt-4">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            style={{ paddingLeft: "20px" }}
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="p-6" style={{ padding: "20px" }}>
        {/* WP Templates - Grouped by Project */}
        {templateType === "wp" ? (
          <>
            {Object.entries(wpProjectGroups).map(([projectName, templates]) => (
              <Collapsible key={projectName} className="group/collapsible">
                <SidebarGroup>
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="w-full gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                      <Layers className="mr-2 size-4" />
                      <span className="text-base font-extrabold">
                        {projectName.length > 17
                          ? projectName.substring(0, 15) + "..."
                          : projectName}
                      </span>
                      <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        {templates.map((template) => (
                          <SidebarMenuItem key={template.path}>
                            <HoverCard
                              openDelay={300}
                              onOpenChange={(open) => {
                                setHoveredTemplate(
                                  open ? template.fileName : null
                                );
                              }}
                            >
                              <HoverCardTrigger asChild>
                                <SidebarMenuButton
                                  asChild
                                  isActive={isActive(
                                    template.category,
                                    template.fileName
                                  )}
                                  tooltip={template.name}
                                  className={cn(
                                    isHovered(template.fileName) &&
                                      "bg-accent text-accent-foreground ring-2 ring-primary/20"
                                  )}
                                  style={{ paddingLeft: "20px" }}
                                >
                                  <Link
                                    to={`/template/${template.category}/${template.fileName}`}
                                  >
                                    <FileCode2 className="mr-2 size-4" />
                                    <span>{template.name.split(" / ")[1]}</span>
                                  </Link>
                                </SidebarMenuButton>
                              </HoverCardTrigger>
                              <HoverCardContent
                                side="right"
                                align="start"
                                className="w-auto p-0"
                              >
                                <TemplatePreview template={template} />
                              </HoverCardContent>
                            </HoverCard>
                          </SidebarMenuItem>
                        ))}
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            ))}
          </>
        ) : (
          /* Base Templates Group - For Motive and Wix */
          <Collapsible className="group/collapsible ">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="w-full gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground font-extrabold text-2xl">
                  <Layers className="mr-2 size-4" />
                  <span className="text-base font-extrabold">
                    Base Templates
                  </span>
                  <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {filteredBaseTemplates.map((template) => (
                      <SidebarMenuItem key={template.fileName}>
                        <HoverCard
                          openDelay={300}
                          onOpenChange={(open) => {
                            setHoveredTemplate(open ? template.fileName : null);
                          }}
                        >
                          <HoverCardTrigger asChild>
                            <SidebarMenuButton
                              asChild
                              isActive={isActive(
                                template.category,
                                template.fileName
                              )}
                              tooltip={template.name}
                              className={cn(
                                isHovered(template.fileName) &&
                                  "bg-accent text-accent-foreground ring-2 ring-primary/20"
                              )}
                              style={{ paddingLeft: "20px" }}
                            >
                              <Link
                                to={`/template/${template.category}/${template.fileName}`}
                              >
                                <FileCode2 className="mr-2 size-4" />
                                <span>{template.name}</span>
                              </Link>
                            </SidebarMenuButton>
                          </HoverCardTrigger>
                          <HoverCardContent
                            side="right"
                            align="start"
                            className="w-auto p-0"
                          >
                            <TemplatePreview template={template} />
                          </HoverCardContent>
                        </HoverCard>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        )}

        {/* Combined Templates Group - Only for Motive */}
        {templateType === "motive" && (
          <Collapsible className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="w-full gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                  <Layers className="mr-2 size-4" />
                  <span className="text-base font-extrabold">
                    Combined Templates
                  </span>
                  <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {filteredCombinedTemplates.map((template) => (
                      <SidebarMenuItem key={template.fileName}>
                        <HoverCard
                          openDelay={300}
                          onOpenChange={(open) => {
                            setHoveredTemplate(open ? template.fileName : null);
                          }}
                        >
                          <HoverCardTrigger asChild>
                            <SidebarMenuButton
                              asChild
                              isActive={isActive(
                                template.category,
                                template.fileName
                              )}
                              tooltip={template.name}
                              className={cn(
                                isHovered(template.fileName) &&
                                  "bg-accent text-accent-foreground ring-2 ring-primary/20"
                              )}
                              style={{ paddingLeft: "20px" }}
                            >
                              <Link
                                to={`/template/${template.category}/${template.fileName}`}
                              >
                                <FileCode2 className="mr-2 size-4" />
                                <span>{template.name}</span>
                              </Link>
                            </SidebarMenuButton>
                          </HoverCardTrigger>
                          <HoverCardContent
                            side="right"
                            align="start"
                            className="w-auto p-0"
                          >
                            <TemplatePreview template={template} />
                          </HoverCardContent>
                        </HoverCard>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={toggleSidebar}
              tooltip={state === "expanded" ? "Collapse" : "Expand"}
            >
              {state === "expanded" ? (
                <>
                  <PanelLeftClose className="size-4" />
                  <span>Collapse</span>
                </>
              ) : (
                <PanelLeft className="size-4" />
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
