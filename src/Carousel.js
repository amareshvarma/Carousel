import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import "./Carousel.css";
const Carousel = ({
  images,
  height,
  width,
  loop,
  autoPlay,
  autoPlayDuration
}) => {
  const carouselWrapper = useRef();
  const imageWrapper = useRef();
  const activeIndex = useRef(0);

  useLayoutEffect(() => {
    carouselWrapper.current.style.setProperty("--height", `${height}px`);
    carouselWrapper.current.style.setProperty("--width", `${width}px`);
    carouselWrapper.current.style.setProperty("--aspect-ratio", width / height);
  }, [height, width]);

  const handleSwipe = useCallback(
    (direction) => {
      activeIndex.current =
        direction === "prev"
          ? activeIndex.current - 1
          : activeIndex.current + 1;
      if (activeIndex.current < 0)
        activeIndex.current = loop ? images.length - 1 : 0;
      if (activeIndex.current >= images.length)
        activeIndex.current = loop ? 0 : images.length - 1;
      imageWrapper.current.scrollTo({
        left: activeIndex.current * width,
        behavior: "smooth"
      });
    },
    [width, images.length, loop]
  );

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      handleSwipe("next");
      if (
        !loop &&
        (activeIndex.current === 0 || activeIndex.current === images.length - 1)
      )
        clearInterval(timer);
    }, autoPlayDuration);

    return () => {
      clearInterval(timer);
    };
  }, [handleSwipe, autoPlay, images.length, loop, autoPlayDuration]);

  return (
    <div className="carousel" ref={carouselWrapper}>
      <div className="image-wrapper" ref={imageWrapper}>
        {images.map(({ src, alt }, index) => (
          <img
            key={index}
            className="carousel-image"
            src={src}
            alt={alt}
            height={height}
            width={width}
            loading="lazy"
          />
        ))}
      </div>
      <button
        className="carousel-button prev"
        onClick={() => handleSwipe("prev")}
      >
        &lt;
      </button>
      <button
        className="carousel-button next"
        onClick={() => handleSwipe("next")}
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
