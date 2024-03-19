export interface ModalCarouselItem {
    id: string;
    imagePath: string;
    caption?: string;
}

export interface ModalCarouse {
    openFancyBoxSlide: (id: string) => void;
}