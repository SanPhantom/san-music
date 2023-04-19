import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import {
  useBoolean,
  useCreation,
  useDebounceFn,
  useLatest,
  useMemoizedFn,
  usePrevious,
  useSetState,
  useUpdateEffect,
} from "ahooks";
import React, { useRef } from "react";
import "./banner.less";

interface IBannerProps {
  list: any[];
  hideDot?: boolean;
  renderItem: (item: any, index: number) => React.ReactNode;
}

const Banner = ({ list, hideDot = false, renderItem }: IBannerProps) => {
  const theme = useTheme();

  const bannerTranslateStyle: React.CSSProperties = {
    transition: "transform 700ms ease-in-out",
  };
  const bannerRootRef = useRef<HTMLDivElement>(null);
  const bannerRootWidth =
    bannerRootRef.current?.getBoundingClientRect()?.width ?? 0;

  // banner translating
  const [isPlay, { setTrue: startPlay, setFalse: stopPlay }] = useBoolean(true);
  const [state, setState] = useSetState({
    current: 0, // current banner number [0 ~~ list.length + 1]
  });
  const currentRef = useLatest(state.current); // latest current dot number
  const prevCurrent = usePrevious(state.current); // previous current dot number

  const isInterface = useCreation(() => {
    const result =
      (currentRef.current >= list.length + 1 || currentRef.current <= 0) &&
      isPlay;
    return result;
  }, [currentRef.current, isPlay]);

  // translate offset width
  const offsetWidth = useCreation(() => {
    return currentRef.current * bannerRootWidth;
  }, [currentRef.current, bannerRootWidth]);

  const currentDot = useCreation(() => {
    if (currentRef.current === 0) return list.length - 1;
    if (currentRef.current === list.length + 1) return 0;
    return currentRef.current - 1;
  }, [currentRef.current, list]);

  const nextItem = useMemoizedFn(() => {
    setState({
      current: currentRef.current + 1,
    });
  });

  const prevItem = useMemoizedFn(() => {
    setState({
      current: currentRef.current - 1,
    });
  });

  const { run: startNextItem } = useDebounceFn(
    () => {
      nextItem();
    },
    { wait: 2000 }
  );

  // banner translate complied
  const handleTransitionEnd = useMemoizedFn(() => {
    if (isInterface) {
      stopPlay();
      setState({
        current: currentRef.current <= 0 ? list.length : 1,
      });
    }
    startNextItem();
  });

  useUpdateEffect(() => {
    if (prevCurrent === 0 || prevCurrent === list.length + 1) {
      startPlay();
    }
  }, [prevCurrent]);

  useCreation(() => {
    startNextItem();
  }, [list]);

  return (
    <div className="banner-root" id="banner-root" ref={bannerRootRef}>
      {list.length ? (
        <React.Fragment>
          <div
            className="banner-item-container"
            style={{
              width: `${list.length + 2}00%`,
              transform: `translateX(-${offsetWidth}px)`,
              ...(isPlay ? bannerTranslateStyle : {}),
            }}
            onTransitionEnd={() => handleTransitionEnd()}
          >
            {renderItem(list[list.length - 1], list.length - 1)}
            {list.map((item, index) => renderItem(item, index))}
            {renderItem(list[0], 0)}
          </div>
          {!hideDot && (
            <div className="banner-dot-container">
              {list.map((item, index) => (
                <div
                  key={`dot_${index}`}
                  className="banner-dot"
                  style={{
                    width: index === currentDot ? "24px" : "16px",
                    backgroundColor:
                      index === currentDot
                        ? theme.palette.primary.main
                        : theme.palette.grey[50],
                  }}
                ></div>
              ))}
            </div>
          )}
          <div className="banner-control-container">
            <div
              className="banner-control-item banner-control-left"
              onClick={prevItem}
            >
              <ChevronLeft color="primary" />
            </div>
            <div
              className="banner-control-item banner-control-right"
              onClick={nextItem}
            >
              <ChevronRight color="primary" />
            </div>
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default Banner;
