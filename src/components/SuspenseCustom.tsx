import { Suspense } from "react";
import ErrorBoundary from "./ErrorBoundary";

import { Spinner } from "@heroui/react";

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
            <Spinner color="secondary" />
          </span>
        }
      >
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}
