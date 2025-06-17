import { tv } from "tailwind-variants";

// import { button as buttonStyles } from "@nextui-org/theme";

export const title = tv({
  base: "uppercase font-[calvera]",
  variants: {
    size: {
      sm: "text-2xl sm:text-3xl lg:text-5xl",
      md: "text-3xl sm:text-5xl md:text-6xl lg:text-7xl",
    },
    color: {
      custom1: "from-custom1 to-custom1-3",
      custom2: "from-custom2-8 to-custom2-10/80",
    },
    shadow: {
      sm: "drop-shadow-sm",
      md: "drop-shadow-md",
      lg: "drop-shadow-lg",
      custom: "drop-shadow-custom",
    },
    darkColor: {
      custom1: "dark:from-custom1 dark:to-custom1-3",
    },
  },
  defaultVariants: {
    size: "sm",
    color: "custom1",
  },
  compoundVariants: [
    {
      color: ["custom1", "custom2"],
      class: "bg-clip-text text-transparent bg-gradient-to-t",
    },
  ],
});

export const title1 = tv({
  base: "tracking-tight inline font-semibold",
  variants: {
    color: {
      violet: "from-[#FF1CF7] to-[#b249f8]",
      yellow: "from-[#FF705B] to-[#FFB457]",
      blue: "from-[#5EA2EF] to-[#0072F5]",
      cyan: "from-[#00b7fa] to-[#01cfea]",
      green: "from-[#6FEE8D] to-[#17c964]",
      pink: "from-[#FF72E1] to-[#F54C7A]",
      foreground: "dark:from-[#FFFFFF] dark:to-[#4B4B4B]",
      custom1: "from-custom1 to-custom1-3",
      custom2: "from-custom2-8 to-custom2-10/80",
    },
    darkColor: {
      custom1: "dark:from-custom1 dark:to-custom1-3",
    },
    size: {
      "": "font-size-primary",
      sm: "text-xl sm:text-2xl",
      md: "text-2xl lg:text-3xl leading-9",
    },
    fullWidth: {
      true: "w-full block",
    },
  },
  defaultVariants: {
    size: "md",
  },
  compoundVariants: [
    {
      color: [
        "violet",
        "yellow",
        "blue",
        "cyan",
        "green",
        "pink",
        "foreground",
        "custom1",
        "custom2",
      ],
      class: "bg-clip-text text-transparent bg-gradient-to-t",
    },
  ],
});

export const scrollStyle =
  "scrollbar scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-custom1 scrollbar-track-custom2-10 scrollbar-w-2 scrollbar-h-2 sm:scrollbar-w-3 sm:scrollbar-h-3 hover:scrollbar-thumb-custom1-6";
