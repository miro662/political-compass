import { PropsWithChildren } from "react";

export function H({
  level,
  children,
}: PropsWithChildren<{
  level: 1 | 2;
}>) {
  switch (level) {
    case 1:
      return (
        <h1 className="font-serif text-2xl font-semibold tracking-wider">
          {children}
        </h1>
      );
    case 2:
      return (
        <h1 className="text-1xl font-serif font-semibold tracking-wider">
          {children}
        </h1>
      );
  }
}

export function P({
  justify = false,
  children,
}: PropsWithChildren<{
  justify?: boolean;
}>) {
  return <p className={`font-sans  ${justify ? "justify" : ""}`}>{children}</p>;
}
