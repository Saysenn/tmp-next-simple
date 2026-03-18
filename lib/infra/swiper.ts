// Swiper core + modules — import from here instead of "swiper" directly
import { Swiper } from "swiper";
import { Autoplay, Navigation, Pagination, FreeMode, Thumbs, EffectFade, EffectCards } from "swiper/modules";

// CSS — import once here so pages don't need to repeat it
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";
import "swiper/css/effect-cards";

export { Swiper, Autoplay, Navigation, Pagination, FreeMode, Thumbs, EffectFade, EffectCards };
