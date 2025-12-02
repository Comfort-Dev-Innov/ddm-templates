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
  wpBaseTemplates,
  motivePages,
  wixPages,
  wpPages,
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

  // Load template type from localStorage on mount, default to "motive-templates"
  const [templateType, setTemplateType] = useState<
    | "motive-templates"
    | "motive"
    | "wix"
    | "wp"
    | "wix-pages"
    | "wp-pages"
  >(() => {
    const saved = localStorage.getItem("templateType");
    return (
      (saved as
        | "motive-templates"
        | "motive"
        | "wix"
        | "wp"
        | "wix-pages"
        | "wp-pages") || "motive-templates"
    );
  });

  // Save template type to localStorage whenever it changes
  const handleTemplateTypeChange = (
    value:
      | "motive-templates"
      | "motive"
      | "wix"
      | "wp"
      | "wix-pages"
      | "wp-pages"
  ) => {
    setTemplateType(value);
    localStorage.setItem("templateType", value);
  };

  const isActive = (templateCategory: string, templateFileName: string) => {
    return category === templateCategory && fileName === templateFileName;
  };

  const isHovered = (templateFileName: string) => {
    return hoveredTemplate === templateFileName;
  };

  // Derive a human-readable name from the file name
  // Example: "2026-hyundai-santa-cruz.html" -> "2026 hyundai santa cruz"
  const getDisplayName = (template: { fileName: string }) => {
    const baseName = template.fileName.replace(/\.(html|txt)$/i, "");
    return baseName.replace(/-/g, " ");
  };

  const currentBaseTemplates = useMemo(() => {
    if (templateType === "motive-templates") return baseTemplates;
    if (templateType === "wix") return wixBaseTemplates;
    if (templateType === "wp") return wpBaseTemplates;
    if (templateType === "wix-pages") return wixPages;
    if (templateType === "wp-pages") return wpPages;
    return []; // For "motive" we'll use special grouping
  }, [templateType]);

  const currentCombinedTemplates = useMemo(() => {
    return templateType === "motive-templates" ? combinedTemplates : [];
  }, [templateType]);

  const filteredBaseTemplates = useMemo(() => {
    if (!searchQuery) return currentBaseTemplates;
    return currentBaseTemplates.filter((template) =>
      getDisplayName(template)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, currentBaseTemplates]);

  const filteredCombinedTemplates = useMemo(() => {
    if (!searchQuery) return currentCombinedTemplates;
    return currentCombinedTemplates.filter((template) =>
      getDisplayName(template)
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, currentCombinedTemplates]);

  // Group WP templates by project folder
  const wpProjectGroups = useMemo(() => {
    if (templateType !== "wp-pages") return {};

    const groups: Record<string, typeof wpPages> = {};
    const templatesToGroup = searchQuery
      ? wpPages.filter((template) =>
          getDisplayName(template)
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (template.project || "")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : wpPages;

    templatesToGroup.forEach((template) => {
      const projectName = template.project || "misc";
      if (!groups[projectName]) {
        groups[projectName] = [];
      }
      groups[projectName].push(template);
    });

    return groups;
  }, [templateType, searchQuery]);

  // Group Wix pages by folder (e.g. "3-misleading-google-ads" vs root files)
  const wixPageGroups = useMemo(() => {
    if (templateType !== "wix-pages") return {};

    const groups: Record<string, typeof wixPages> = {};
    const templatesToGroup = searchQuery
      ? wixPages.filter((template) =>
          getDisplayName(template)
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : wixPages;

    templatesToGroup.forEach((template) => {
      const afterPages = template.path.split("/src/content/wix/pages/")[1] || "";
      const parts = afterPages.split("/").filter(Boolean);
      const folder = parts.length > 1 ? parts[0] : "_root_";
      if (!groups[folder]) {
        groups[folder] = [];
      }
      groups[folder].push(template);
    });

    return groups;
  }, [templateType, searchQuery]);

  // Group Motive templates by brand, then by project (two-level grouping)
  const motiveBrandGroups = useMemo(() => {
    if (templateType !== "motive") return {};

    const templatesToGroup = searchQuery
      ? motivePages.filter((template) =>
          getDisplayName(template)
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (template.brand || "")
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (template.project || "")
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
      : motivePages;

    const brands: Record<string, Record<string, typeof motivePages>> = {};

    templatesToGroup.forEach((template) => {
      if (!template.brand) return;

      if (!brands[template.brand]) {
        brands[template.brand] = {};
      }

      if (template.project) {
        // Has project folder - group under project
        if (!brands[template.brand][template.project]) {
          brands[template.brand][template.project] = [];
        }
        brands[template.brand][template.project].push(template);
      } else {
        // Direct file in brand folder - put in special "root" group
        if (!brands[template.brand]["_root_"]) {
          brands[template.brand]["_root_"] = [];
        }
        brands[template.brand]["_root_"].push(template);
      }
    });

    return brands;
  }, [templateType, searchQuery]);

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
                  onValueChange={handleTemplateTypeChange}
                >
                  <SelectTrigger className="h-auto! p-0! border-0! shadow-none! bg-transparent! focus:ring-0! hover:bg-transparent! font-semibold! text-left! w-auto!">
                    <SelectValue placeholder="Select template type" />
                  </SelectTrigger>
                  <SelectContent className="p-4" style={{ padding: "10px" }}>
                    <SelectItem
                      style={{ padding: "4px 0" }}
                      value="motive-templates"
                    >
                      Motive Templates
                    </SelectItem>
                    <SelectItem style={{ padding: "4px 0" }} value="wix">
                      Wix Templates
                    </SelectItem>
                    <SelectItem style={{ padding: "4px 0" }} value="wp">
                      WP Templates
                    </SelectItem>
                    <SelectItem style={{ padding: "4px 0" }} value="motive">
                      Motive Pages
                    </SelectItem>
                    <SelectItem style={{ padding: "4px 0" }} value="wix-pages">
                      Wix Pages
                    </SelectItem>
                    <SelectItem style={{ padding: "4px 0" }} value="wp-pages">
                      WP Pages
                    </SelectItem>
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
        {/* Motive Templates - Two-level grouping (Brand > Project) */}
        {templateType === "motive" ? (
          <>
            {Object.entries(motiveBrandGroups).map(([brandName, projects]) => (
              <Collapsible key={brandName} className="group/collapsible">
                <SidebarGroup>
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="w-full flex justify-between items-center gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                      <div className="flex items-center gap-2">
                        <Layers className="size-4" />
                        <span className="text-base font-extrabold">
                          {brandName}
                        </span>
                      </div>

                      <ChevronDown className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                    </CollapsibleTrigger>
                  </SidebarGroupLabel>
                  <CollapsibleContent>
                    <SidebarGroupContent>
                      {Object.entries(projects).map(
                        ([projectName, templates]) => (
                          <div key={projectName}>
                            {projectName === "_root_" ? (
                              // Direct files in brand folder - no nested collapsible
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
                                            <span>{getDisplayName(template)}</span>
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
                            ) : (
                              // Project folder - nested collapsible
                              <Collapsible
                                key={projectName}
                                className="group/project-collapsible ml-4"
                              >
                                <CollapsibleTrigger
                                  style={{
                                    marginLeft: "15px",
                                    padding: "5px 0",
                                  }}
                                  className="w-full gap-2  hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex items-center py-2 px-2 rounded-md"
                                >
                                  <Layers className="mr-2 size-4" />
                                  <span className="text-sm font-medium">
                                    {(projectName === "_root_"
                                      ? "root"
                                      : projectName.replace(/-/g, " ")
                                    ).length > 20
                                      ? (projectName === "_root_"
                                          ? "root"
                                          : projectName.replace(/-/g, " ")
                                        ).substring(0, 18) + "..."
                                      : projectName === "_root_"
                                        ? "root"
                                        : projectName.replace(/-/g, " ")}
                                  </span>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
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
                                              style={{ paddingLeft: "30px" }}
                                            >
                                              <Link
                                                to={`/template/${template.category}/${template.fileName}`}
                                              >
                                                <FileCode2 className="mr-2 size-4" />
                                                <span>
                                                  {getDisplayName(template)}
                                                </span>
                                              </Link>
                                            </SidebarMenuButton>
                                          </HoverCardTrigger>
                                          <HoverCardContent
                                            side="right"
                                            align="start"
                                            className="w-auto p-0"
                                          >
                                            <TemplatePreview
                                              template={template}
                                            />
                                          </HoverCardContent>
                                        </HoverCard>
                                      </SidebarMenuItem>
                                    ))}
                                  </SidebarMenu>
                                </CollapsibleContent>
                              </Collapsible>
                            )}
                          </div>
                        )
                      )}
                    </SidebarGroupContent>
                  </CollapsibleContent>
                </SidebarGroup>
              </Collapsible>
            ))}
          </>
        ) : templateType === "wix-pages" ? (
          /* Wix Pages - Grouped by folder (project) */
          <>
            {Object.entries(wixPageGroups).map(([folderName, templates]) => (
              <Collapsible key={folderName} className="group/collapsible">
                <SidebarGroup>
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="w-full flex justify-between items-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                      {/* Left group */}
                      <div className="flex items-center gap-2">
                        <Layers className="size-4" />
                        <span className="text-base font-extrabold">
                          {folderName === "_root_"
                            ? "root"
                            : folderName.replace(/-/g, " ")}
                        </span>
                      </div>

                      {/* Chevron stays at the end */}
                      <ChevronDown className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
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
                                    <span>{getDisplayName(template)}</span>
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
        ) : templateType === "wp-pages" ? (
          /* WP Pages - Grouped by Project */
          <>
            {Object.entries(wpProjectGroups).map(([projectName, templates]) => (
              <Collapsible key={projectName} className="group/collapsible">
                <SidebarGroup>
                  <SidebarGroupLabel asChild>
                    <CollapsibleTrigger className="w-full flex justify-between items-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                      {/* Left group */}
                      <div className="flex items-center gap-2">
                        <Layers className="size-4" />
                        <span className="text-base font-extrabold">
                          {projectName.length > 17
                            ? projectName.substring(0, 15) + "..."
                            : projectName}
                        </span>
                      </div>

                      {/* Chevron stays at the end */}
                      <ChevronDown className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
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
                                    <span>{getDisplayName(template)}</span>
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
                <CollapsibleTrigger className="w-full flex justify-between items-center hover:bg-sidebar-accent hover:text-sidebar-accent-foreground font-extrabold text-2xl">
                  {/* Left group */}
                  <div className="flex items-center gap-2">
                    <Layers className="size-4" />
                    <span className="text-base font-extrabold">
                      Base Templates
                    </span>
                  </div>

                  {/* Chevron always at the end */}
                  <ChevronDown className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
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
                                <span>{getDisplayName(template)}</span>
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

        {/* Combined Templates Group - Only for Motive Templates */}
        {templateType === "motive-templates" && (
          <Collapsible className="group/collapsible">
            <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger className="w-full gap-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                  <Layers className="mr-2 size-4" />
                  <span className="text-base font-extrabold text-left">
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
                            <span>{getDisplayName(template)}</span>
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
