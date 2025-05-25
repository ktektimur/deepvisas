
export interface Testimonial {
  name: string;
  comment: {
    en: string;
    tr: string;
  };
  rating: number;
  flag: string;
  role: string;
}

export interface TestimonialWithLanguage {
  name: string;
  comment: string;
  rating: number;
  flag: string;
  role: string;
}
