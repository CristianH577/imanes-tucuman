import { Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";

import { CircularProgress } from "@mui/material";

export default function SuspenseCustom({ children = <></>, classFall = "" }) {
  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <span
            className={
              "w-full flex items-center justify-center" +
              (classFall ? " " + classFall : "")
            }
          >
            <CircularProgress color="secondary" />
          </span>
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}
