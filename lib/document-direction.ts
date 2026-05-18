/** Whether the document is in right-to-left layout (Arabic, Urdu, etc.). */
export function getIsRtl(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.dir === "rtl";
}
