import { cn } from "@/lib/utils/cn";
import { fontClashVariable } from "./fonts";

export default async function MarketingLayout({ children }) {
  return <main className={cn(fontClashVariable.variable)}>{children}</main>;
}
