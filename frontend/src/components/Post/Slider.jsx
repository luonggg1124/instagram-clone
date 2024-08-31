import {Carousel} from "@material-tailwind/react";
import {ChevronLeftIcon, ChevronRightIcon} from "lucide-react";

export function Slider({items}) {
    const prevArrow=({loop, handlePrev, firstIndex}) => {

        if(!firstIndex){
            return (
                <button
                    onClick={handlePrev}
                    disabled={!loop && firstIndex}
                    className={"!absolute top-2/4 left-4 -translate-y-2/4 rounded-full select-none transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none size-8 max-w-[48px] max-h-[48px] text-white hover:bg-white/10 active:bg-white/30 grid place-items-center "}
                >
                    <ChevronLeftIcon strokeWidth={3} className="-ml-1 size-4"/>

                </button>
            );
        }
    };
    const nextArrow = ({loop, handleNext, lastIndex}) => {
        if(!lastIndex) {
            return <button
                onClick={handleNext}
                disabled={!loop && lastIndex}
                className="!absolute top-2/4 right-4 -translate-y-2/4 rounded-full select-none transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none size-8 max-w-[48px] max-h-[48px] text-white hover:bg-white/10 active:bg-white/30 grid place-items-center"
            >
                <ChevronRightIcon strokeWidth={3} className="ml-1 size-4"/>
            </button>
        }
    };

    return (
        <Carousel className="rounded-sm"
                  prevArrow={prevArrow}
                  nextArrow={nextArrow}
                  navigation={({setActiveIndex, activeIndex, length}) => (
                      <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                          {new Array(length).fill("").map((_, i) => (
                              <span
                                  key={i}
                                  className={`block size-2 cursor-pointer rounded-full transition-colors content-[''] ${
                                      activeIndex === i ? "bg-white" : "bg-white/50"
                                  }`}
                                  onClick={() => setActiveIndex(i)}
                              />
                          ))}
                      </div>
                  )}
        >
            {items.map((item, index) => (<img
                key={index}
                src={item.url ? item.url : "https://picsum.photos/1000"}
                alt={"image " + index}
                className="h-full w-full object-cover"
            />))}


        </Carousel>
    );
}