export function getRuntime() {
  if (typeof window === "undefined") {
    return "server";
  } else {
    return "client";
  }
}