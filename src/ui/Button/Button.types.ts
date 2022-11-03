import { LinkProps } from "next/link";

type SVGComponent = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

export type ButtonBaseProps = {
  color?: "primary" | "secondary" | "minimal" | "warn";
  size?: "base" | "sm" | "lg" | "fab" | "icon";
  loading?: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  StartIcon?: SVGComponent;
  EndIcon?: SVGComponent;
  shallow?: boolean;
};
export type ButtonProps = ButtonBaseProps &
  (
    | (Omit<JSX.IntrinsicElements["a"], "href"> & { href: LinkProps["href"] })
    | (JSX.IntrinsicElements["button"] & { href?: never })
  );
