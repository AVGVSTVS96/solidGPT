import { onMount } from 'solid-js';
import markdownit from 'markdown-it';
import hljs from 'highlight.js';

export function renderMarkdown(content) {
  const md = new markdownit();
  return md.render(content);
}

export function highlightCode(element) {
  onMount(() => {
    const codeElements = element.querySelectorAll("pre code");
    codeElements.forEach((codeElement) => {
      hljs.highlightElement(codeElement);
    });
  });
}