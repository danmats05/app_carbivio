"use client";

import { useEffect } from "react";

/**
 * Component that enforces numbers-idgrotesk font on ALL numeric content
 * This component ensures that ALL numbers in the app use the correct font,
 * including those in external libraries like Recharts that are hard to target with CSS alone.
 */
export function NumberFontEnforcer() {
  useEffect(() => {
    // Function to enforce numbers-idgrotesk font on all numeric content
    const enforceNumberFont = () => {
      // Target all text nodes that contain numbers
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false,
      );

      const textNodes = [];
      let node;
      while ((node = walker.nextNode())) {
        if (node.nodeValue && /\d/.test(node.nodeValue.trim())) {
          textNodes.push(node);
        }
      }

      // Apply font class to parent elements of numeric text
      textNodes.forEach((textNode) => {
        const parent = textNode.parentElement;
        if (parent && !parent.classList.contains("numbers-idgrotesk")) {
          // Check if the text contains any numbers
          const text = textNode.nodeValue || "";
          const hasNumbers = /\d/.test(text);

          // Apply font if text contains numbers (even mixed with text)
          if (hasNumbers) {
            parent.classList.add("numbers-idgrotesk");
            // Force inline style for maximum specificity
            (parent as HTMLElement).style.fontFamily =
              '"IDGrotesk", sans-serif !important';
          }
        }
      });

      // Target Recharts elements specifically
      const rechartsElements = document.querySelectorAll(
        ".recharts-wrapper tspan, .recharts-wrapper text, .recharts-cartesian-axis-tick, " +
          ".recharts-tooltip-wrapper tspan, .recharts-tooltip-wrapper text, " +
          ".recharts-layer tspan, .recharts-layer text, .recharts-surface tspan, .recharts-surface text",
      );

      rechartsElements.forEach((element) => {
        const textContent = element.textContent || "";
        if (/\d/.test(textContent)) {
          element.classList.add("numbers-idgrotesk");
          element.style.fontFamily = '"IDGrotesk", sans-serif !important';
        }
      });

      // Target SVG text and tspan elements
      const svgElements = document.querySelectorAll("svg text, svg tspan");
      svgElements.forEach((element) => {
        const textContent = element.textContent || "";
        if (/\d/.test(textContent)) {
          element.classList.add("numbers-idgrotesk");
          element.style.fontFamily = '"IDGrotesk", sans-serif !important';
        }
      });

      // Target elements with numeric patterns
      const numericPatterns = [
        '[class*="number"]',
        '[class*="count"]',
        '[class*="amount"]',
        '[class*="quantity"]',
        '[class*="value"]',
        '[class*="percentage"]',
        '[class*="price"]',
        '[class*="total"]',
        '[class*="sum"]',
        '[class*="metric"]',
        '[class*="kpi"]',
        '[class*="chart"]',
        '[class*="data"]',
      ];

      numericPatterns.forEach((pattern) => {
        try {
          const elements = document.querySelectorAll(pattern);
          elements.forEach((element) => {
            const textContent = element.textContent || "";
            if (/\d/.test(textContent)) {
              element.classList.add("numbers-idgrotesk");
              (element as HTMLElement).style.fontFamily =
                '"IDGrotesk", sans-serif !important';
            }
          });
        } catch (error) {
          // Skip invalid selectors
          console.warn(`Invalid selector: ${pattern}`, error);
        }
      });

      // Target specific elements that contain numbers in their text content
      const allElements = document.querySelectorAll(
        "span, div, td, th, p, h1, h2, h3, h4, h5, h6",
      );
      allElements.forEach((element) => {
        const textContent = element.textContent || "";
        // Check if element contains numbers (including mixed content like "Sans Plomb 95")
        if (
          /\d/.test(textContent) &&
          !element.classList.contains("numbers-idgrotesk")
        ) {
          element.classList.add("numbers-idgrotesk");
          (element as HTMLElement).style.fontFamily =
            '"IDGrotesk", sans-serif !important';
        }
      });
    };

    // Run immediately
    enforceNumberFont();

    // Run periodically to catch dynamically loaded content
    const interval = setInterval(enforceNumberFont, 1000);

    // Also run on DOM changes
    const observer = new MutationObserver(() => {
      enforceNumberFont();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    // Cleanup
    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  // This component doesn't render anything visible
  return null;
}
