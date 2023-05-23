import { Suspense } from "react";
import Loading from "../components/common/Loading";
import PageContainer from "../components/layout/PageContainer";

const modules = import.meta.glob("../pages/*");

const LazyComponent = ({
  pageId,
  autoHeight = true,
}: {
  pageId: string;
  autoHeight?: boolean;
}) => {
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
      <PageContainer autoHeight={autoHeight}>
        <Components />
      </PageContainer>
    </Suspense>
  );
};

export default LazyComponent;
