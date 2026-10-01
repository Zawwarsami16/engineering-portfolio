import { PageTransition } from "@/components/transitions/PageTransition";
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
