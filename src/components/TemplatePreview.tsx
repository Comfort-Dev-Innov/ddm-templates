import { useState, useEffect } from 'react';
import type { Template } from '@/data/templates';

interface TemplatePreviewProps {
  template: Template;
}

export function TemplatePreview({ template }: TemplatePreviewProps) {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const resolveTemplateUrl = (path: string) => {
    if (path.startsWith("/src/content")) {
      return path.replace("/src/content", "/content");
    }
    return path;
  };

  useEffect(() => {
    const loadTemplate = async () => {
      setLoading(true);
      try {
        const response = await fetch(resolveTemplateUrl(template.path));
        if (response.ok) {
          const html = await response.text();
          setHtmlContent(html);
        }
      } catch (err) {
        console.error('Failed to load template preview:', err);
      } finally {
        setLoading(false);
      }
    };

    loadTemplate();
  }, [template.path]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-sm text-muted-foreground">Loading preview...</div>
      </div>
    );
  }

  return (
    <div className="w-[600px] h-[400px] rounded-lg border bg-white relative overflow-hidden">
      <div className="w-full h-full overflow-y-auto overflow-x-hidden">
        <iframe
          srcDoc={htmlContent}
          className="border-0"
          title={`Preview of ${template.name}`}
          sandbox="allow-same-origin"
          style={{
            height: '800px',
            transform: 'scale(0.75)',
            transformOrigin: 'top left',
            width: '800px'
          }}
        />
      </div>
    </div>
  );
}
