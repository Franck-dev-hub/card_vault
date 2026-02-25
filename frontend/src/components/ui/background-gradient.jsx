import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

/**
 * Decorative wrapper that renders an animated multi-colour gradient border
 * around its children using two layered Framer Motion `<div>` elements.
 *
 * Two gradient layers are stacked at z-index 1 beneath the content (z-index 10):
 *  - The outer layer is blurred and fades from 60 % to 100 % opacity on hover,
 *    creating a soft glow effect.
 *  - The inner layer is sharp and always visible, providing the solid border colour.
 *
 * When `animate` is true the background-position cycles over a 400 % × 400 %
 * canvas so the gradient appears to shift continuously. Setting `animate` to
 * false freezes the gradient at the initial position, which is useful when
 * reduced-motion is preferred or the component is used as a static badge.
 *
 * @param {{ children: React.ReactNode, className?: string, containerClassName?: string, animate?: boolean }} props
 */
export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}) => {
  // Framer Motion variants that slide the background-position across the
  // oversized 400% canvas to produce the travelling-gradient animation.
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };

  return (
    // 4 px padding leaves room for the gradient layers to show as a border.
    // `group` enables the hover-opacity transition on the blurred outer layer.
    <div className={cn("relative p-[4px] group", containerClassName)}>
      {/* Outer blurred glow layer — amplifies the border on hover */}
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          // Only set backgroundSize when animating; static mode uses default cover.
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] opacity-60 group-hover:opacity-100 blur-xl transition duration-500 will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#1d4ed8,transparent),radial-gradient(circle_farthest-side_at_100%_0,#3b82f6,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#60a5fa,transparent),radial-gradient(circle_farthest-side_at_0_0,#93c5fd,transparent)]"
        )}
      />
      {/* Inner sharp layer — always fully opaque, forms the visible border */}
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={
          animate
            ? {
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
              }
            : undefined
        }
        style={{
          backgroundSize: animate ? "400% 400%" : undefined,
        }}
        className={cn(
          "absolute inset-0 rounded-3xl z-[1] will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
        )}
      />

      {/* Content sits above both gradient layers */}
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};