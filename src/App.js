import Carousel from "./Carousel";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Carousel
        images={[
          {
            src:
              "https://images.pexels.com/photos/1841133/pexels-photo-1841133.jpeg",
            alt: "image alt 1"
          },
          {
            src:
              "https://images.pexels.com/photos/3894868/pexels-photo-3894868.jpeg",
            alt: "image alt 2"
          },
          {
            src:
              "https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg",
            alt: "image alt 3"
          },
          {
            src:
              "https://images.pexels.com/photos/358358/pexels-photo-358358.jpeg",
            alt: "image alt 4"
          }
        ]}
        height={"300"}
        width={"500"}
        loop={true}
        autoPlay={true}
        autoPlayDuration={3000}
      />
    </div>
  );
}
