import { Leaf, type LucideProps } from "lucide-react";

export const Icons = {
  Logo: (props: LucideProps) => (
    <Leaf {...props} />
  ),
  google: (props: LucideProps) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>Google</title>
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.05 1.05-2.86 2.25-4.82 2.25-3.64 0-6.55-3.05-6.55-6.85s2.91-6.85 6.55-6.85c2.06 0 3.49.83 4.3 1.65l2.65-2.65C18.05 3.22 15.61 2 12.48 2 7.18 2 3.13 6.02 3.13 11.35s4.05 9.35 9.35 9.35c3.03 0 5.3-1.01 7.01-2.72 1.79-1.7 2.33-4.35 2.33-6.39 0-.6-.05-1.16-.16-1.71l-9.05-.01z" />
    </svg>
  ),
};
