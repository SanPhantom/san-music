import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useTheme } from "@mui/material";
import {
  useBoolean,
  useCreation,
  useDebounceFn,
  useMemoizedFn,
  useSetState,
  useSize,
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
  const currentRef = useRef<number>(1);

  const bannerRootSize = useSize(bannerRootRef);
  const bannerRootWidth = bannerRootSize?.width ?? 0;

  // const [isTouch, { setTrue: startTouch, setFalse: endTouch }] =
  //   useBoolean(false);
  const [isToggle, { setTrue: startToggle, setFalse: endToggle }] =
    useBoolean(false);

  const [state, setState] = useSetState({
    current: currentRef.current,
    startTouchX: 0,
    touchDistance: 0,
  });

  const nextItem = useMemoizedFn(() => {
    // currentRef.current = state.current + 1;
    setState({
      current: state.current + 1,
    });
  });

  const prevItem = useMemoizedFn(() => {
    // cleanTimeout();
    // currentRef.current = state.current - 1;
    setState({
      current: state.current - 1,
    });
  });

  const { run: cycleBanner, cancel } = useDebounceFn(
    () => {
      nextItem();
    },
    {
      wait: 2000,
    }
  );

  const isTransition = useCreation(() => {
    cancel();
    return state.touchDistance === 0 && !isToggle;
  }, [state.touchDistance, isToggle]);

  const isSelectDot = useMemoizedFn((index: number) => {
    if (state.current > list.length) {
      return index === 0;
    } else if (state.current === 0) {
      return index === list.length - 1;
    } else {
      return index === state.current - 1;
    }
  });

  const isBack = useMemoizedFn(() => {
    if (list.length > 1) {
      if (state.current === 0) {
        currentRef.current = list.length;
        return false;
      }
      if (state.current === list.length + 1) {
        currentRef.current = 1;
        return false;
      }
    }
    currentRef.current = -1;
  });

  const transitionEnd = useMemoizedFn(() => {
    // startTouch();
    isBack();
    if (currentRef.current !== -1) {
      startToggle();
    } else {
      cycleBanner();
    }
  });

  const translateX = useCreation(() => {
    // cleanTimeout();
    return state.current * bannerRootWidth - state.touchDistance;
  }, [state.current, state.touchDistance, bannerRootWidth]);

  useCreation(() => {
    if (isToggle) {
      cancel();
      setState({
        current: currentRef.current,
      });
    } else {
      currentRef.current = state.current;
    }
  }, [isToggle, list]);

  useCreation(() => {
    if (!isToggle) {
      isBack();
      if (currentRef.current === -1) {
        cycleBanner();
      }
    }
  }, [cycleBanner, state.current, isToggle]);

  useCreation(() => {
    if (
      translateX === bannerRootWidth ||
      translateX === list.length * bannerRootWidth
    ) {
      setTimeout(() => {
        endToggle();
      }, 50);
    }
  }, [list, translateX, endToggle, bannerRootWidth]);

  return (
    <div className="banner-root" id="banner-root" ref={bannerRootRef}>
      {list.length ? (
        <React.Fragment>
          <div
            className="banner-item-container"
            style={{
              width: `${list.length + 2}00%`,
              transform: `translateX(-${translateX}px)`,
              ...(isTransition ? bannerTranslateStyle : {}),
            }}
            onTransitionEnd={() => transitionEnd()}
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
                    backgroundColor: isSelectDot(index)
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
