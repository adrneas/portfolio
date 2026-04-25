import type { AnchorHTMLAttributes, ImgHTMLAttributes } from "react";

export const mdxComponents = {
  a: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      {...props}
      rel={props.href?.startsWith("http") ? "noreferrer" : props.rel}
      target={props.href?.startsWith("http") ? "_blank" : props.target}
    />
  ),
  img: (props: ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={props.alt ?? ""} />
  ),
};
