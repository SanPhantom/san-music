import { Suspense } from "react";
import Loading from "../components/common/Loading";

const modules = import.meta.glob("../pages/*");

const LazyComponent = ({ pageId }: { pageId: string }) => {
  const Components = lazy(modules[`../pages/${pageId}.tsx`] as any);

  return (
    <Suspense
      fallback={
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loading />
        </div>
      }
    >
      <Components />
    </Suspense>
  );
};

export default LazyComponent;
