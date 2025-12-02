import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { allAvailableTemplates } from "@/data/templates";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Eye, Code2, Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

export function TemplateViewer() {
  const { category, fileName } = useParams<{
    category: string;
    fileName: string;
  }>();
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadTemplate = async () => {
      setLoading(true);
      setError(null);

      try {
        const template = allAvailableTemplates.find(
          (t) => t.category === category && t.fileName === fileName
        );

        if (!template) {
          setError("Template not found");
          setLoading(false);
          return;
        }

        const response = await fetch(template.path);
        if (!response.ok) {
          throw new Error("Failed to load template");
        }

        const html = await response.text();
        setHtmlContent(html);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load template"
        );
      } finally {
        setLoading(false);
      }
    };

    if (category && fileName) {
      loadTemplate();
    }
  }, [category, fileName]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(htmlContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg">Loading template...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  if (!category || !fileName) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-muted-foreground">
          Select a template from the sidebar to preview
        </div>
      </div>
    );
  }

  return (
    <Tabs defaultValue="preview" className="h-full flex flex-col">
      <TabsList className="w-full justify-start rounded-none border-b bg-background px-4 h-12">
        <TabsTrigger value="preview" className="gap-2">
          <Eye className="size-4" />
          <span>Preview</span>
        </TabsTrigger>
        <TabsTrigger value="code" className="gap-2">
          <Code2 className="size-4" />
          <span>Code</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="preview"
        className="flex-1 m-0 overflow-auto bg-white"
      >
        <iframe
          srcDoc={htmlContent}
          className="w-full h-full border-0"
          title="Template Preview"
          sandbox="allow-same-origin"
        />
      </TabsContent>

      <TabsContent value="code" className="flex-1 m-0 overflow-auto relative">
        <Button
          onClick={handleCopy}
          size="sm"
          variant="secondary"
          className="absolute top-4 right-4 z-10 gap-2 "
          style={{ marginRight: "20px" }}
        >
          {copied ? (
            <span className="p-4 flex " style={{ padding: "10px" }}>
              <Check className="size-4" />
              <span>Copied!</span>
            </span>
          ) : (
            <span className="p-4 flex " style={{ padding: "10px" }}>
              <Copy className="size-4" />
              <span>Copy</span>
            </span>
          )}
        </Button>
        <SyntaxHighlighter
          language="html"
          style={vscDarkPlus}
          showLineNumbers
          customStyle={{
            margin: 0,
            height: "100%",
            fontSize: "14px",
          }}
        >
          {htmlContent}
        </SyntaxHighlighter>
      </TabsContent>
    </Tabs>
  );
}
