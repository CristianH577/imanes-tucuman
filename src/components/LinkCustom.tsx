import type { ReactNode } from "react";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";

type TypeLinkCustomProps = {
  children: ReactNode;
  href?: string;
  title?: string;
  className?: string;
  target?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  custom1?: boolean;
  isExternal?: boolean;
};

export default function LinkCustom({
  children = null,
  href = undefined,
  title = undefined,
  className = undefined,
  target = "_blank",
  startIcon = <></>,
  endIcon = <></>,
  custom1 = false,
  isExternal = false,
  ...props
}: TypeLinkCustomProps) {
  return (
    <a
      href={href}
      target={target}
      rel={isExternal ? "noopener noreferrer" : undefined}
      title={title}
      className={
        "inline-block hover:underline" +
        (className ? " " + className : "") +
        (custom1 ? " font-bold text-custom1--9 dark:text-custom1" : "")
      }
      {...props}
    >
      {startIcon}
      {children}
      {endIcon}
      {isExternal && (
        <OpenInNewIcon className="ms-0.5" style={{ fontSize: "inherit" }} />
      )}
    </a>
  );
}
