import type React from "react";

// Allow TSX usage of the Wistia custom element
type WistiaPlayerProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  "media-id"?: string;
  aspect?: number | string;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "wistia-player": WistiaPlayerProps;
    }
  }

  namespace React.JSX {
    interface IntrinsicElements {
      "wistia-player": WistiaPlayerProps;
    }
  }
}

export {};
