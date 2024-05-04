import DOMPurify from 'dompurify'; // Import DOMPurify library for sanitization

function HTMLRenderer({
  jsonData,
}: {
  jsonData: { content: Node, [key: string]: any, }
}) {
  // Sanitize HTML content using DOMPurify
  const sanitizedContent = DOMPurify.sanitize(jsonData.content);

  return (
    <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
  );
}

export default HTMLRenderer;
