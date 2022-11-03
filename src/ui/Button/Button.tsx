import Link from "next/link";
import React, { createElement, forwardRef } from "react";

import classNames from "classnames";
import { ButtonProps } from "./Button.types";
import Loader from "../Loader";

export const Button = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  ButtonProps
>(function Button(props: ButtonProps, forwardedRef) {
  const {
    loading = false,
    color = "primary",
    size = "base",
    StartIcon,
    EndIcon,
    // attributes propagated from `HTMLAnchorProps` or `HTMLButtonProps`
    ...passThroughProps
  } = props;
  // Buttons are **always** disabled if we're in a `loading` state
  const disabled = props.disabled || loading;

  // If pass an `href`-attr is passed it's `<a>`, otherwise it's a `<button />`
  const isLink = typeof props.href !== "undefined";
  const elementType = isLink ? "a" : "button";

  const element = createElement(
    elementType,
    {
      ...passThroughProps,
      disabled,
      ref: forwardedRef,
      className: classNames(
        // base styles independent what type of button it is
        "inline-flex items-center relative",
        // different styles depending on size
        size === "sm" && "px-3 py-2 text-sm leading-4 font-medium rounded-sm",
        size === "base" && "px-3 py-2 text-sm font-medium rounded-sm",
        size === "lg" && "px-4 py-2 text-base font-medium rounded-sm",
        size === "icon" &&
          "group p-2 border rounded-sm border-transparent text-neutral-400 hover:border-gray-200 transition",

        // different styles depending on color
        color === "primary" &&
          (disabled
            ? "border border-transparent bg-gray-400 text-white"
            : "border border-transparent text-white bg-primary hover:bg-opacity-90 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-900"),
        color === "secondary" &&
          (disabled
            ? "border border-gray-200 text-gray-400 bg-white"
            : "border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-900"),
        color === "minimal" &&
          (disabled
            ? "text-gray-400 bg-transparent"
            : "text-gray-700 bg-transparent hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:bg-gray-100 focus:ring-neutral-500"),
        color === "warn" &&
          (disabled
            ? "text-gray-400 bg-transparent"
            : "text-gray-700 bg-transparent hover:text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:bg-red-50 focus:ring-red-500"),
        // set not-allowed cursor if disabled
        loading ? "cursor-wait" : disabled ? "cursor-not-allowed" : "",
        props.className
      ),
      // if we click a disabled button, we prevent going through the click handler
      onClick: disabled
        ? (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
            e.preventDefault();
          }
        : props.onClick,
    },
    <>
      {StartIcon && (
        <StartIcon
          className={classNames(
            "inline",
            size === "icon" ? "h-5 w-5 " : "-ml-1 h-5 w-5"
          )}
        />
      )}
      {props.children}
      {loading && (
        <Loader color={color === "primary" ? "secondary" : "primary"} />
      )}
      {EndIcon && (
        <EndIcon className="inline w-5 h-5 -mr-1 ltr:ml-2 rtl:mr-2" />
      )}
    </>
  );
  return props.href ? (
    <Link passHref href={props.href}>
      {element}
    </Link>
  ) : (
    element
  );
});

export default Button;
