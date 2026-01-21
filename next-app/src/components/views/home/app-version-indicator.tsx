import { buildConstants } from "@/constants/build";
import { Badge } from "@/components/ui/badge";

export function AppVersionIndicator() {
  return (
    <Badge>
      <span className="mx-2">
        App Version:
        {" "}
        {buildConstants.APP_VERSION}
      </span>
    </Badge>
  );
}