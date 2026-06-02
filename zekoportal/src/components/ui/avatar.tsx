import * as React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, ...props }, ref) => {
    const [hasError, setHasError] = React.useState(false);

    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full border border-border bg-muted select-none items-center justify-center font-medium text-xs text-white",
          className
        )}
        {...props}
      >
        {src && !hasError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt || "avatar"}
            className="aspect-square h-full w-full object-cover"
            onError={() => setHasError(true)}
          />
        ) : (
          <span className="uppercase">{fallback.slice(0, 2)}</span>
        )}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

export { Avatar };
