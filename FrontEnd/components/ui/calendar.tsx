"use client";

import * as React from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import {
  DayPicker,
  getDefaultClassNames,
  type DayButton,
} from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      className={cn(
        "bg-emerald-950 text-emerald-100 group/calendar p-3 rounded-xl border border-emerald-900",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className,
      )}
      classNames={{
        root: cn("", defaultClassNames.root),

        months: cn(
          "flex gap-4 flex-col md:flex-row relative",
          defaultClassNames.months,
        ),

        month: cn("flex flex-col w-full gap-4", defaultClassNames.month),

        nav: cn(
          "flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between",
          defaultClassNames.nav,
        ),

        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none hover:bg-emerald-800/40 hover:text-emerald-200 transition-all",
          defaultClassNames.button_previous,
        ),

        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "size-(--cell-size) aria-disabled:opacity-50 p-0 select-none hover:bg-emerald-800/40 hover:text-emerald-200 transition-all",
          defaultClassNames.button_next,
        ),

        month_caption: cn(
          "flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)",
          defaultClassNames.month_caption,
        ),

        caption_label: cn(
          "select-none font-medium text-sm text-emerald-200",
          defaultClassNames.caption_label,
        ),

        table: "w-full border-collapse",

        weekdays: cn("flex", defaultClassNames.weekdays),

        weekday: cn(
          "text-emerald-400 rounded-md flex-1 font-normal text-[0.8rem] select-none",
          defaultClassNames.weekday,
        ),

        week: cn("flex w-full mt-2", defaultClassNames.week),

        day: cn(
          "relative w-full h-full p-0 text-center aspect-square select-none",
          defaultClassNames.day,
        ),

        today: cn(
          "border border-emerald-500 text-emerald-400 rounded-md",
          defaultClassNames.today,
        ),

        outside: cn("text-emerald-700 opacity-50", defaultClassNames.outside),

        disabled: cn("text-emerald-800 opacity-40", defaultClassNames.disabled),

        hidden: cn("invisible", defaultClassNames.hidden),

        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => (
          <div
            data-slot="calendar"
            ref={rootRef}
            className={cn(className)}
            {...props}
          />
        ),

        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            );
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                {...props}
              />
            );
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          );
        },

        DayButton: CalendarDayButton,

        ...components,
      }}
      {...props}
    />
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "flex aspect-square size-auto w-full min-w-(--cell-size) flex-col gap-1 leading-none font-normal transition-all duration-200",
        "hover:bg-emerald-800/40 hover:text-emerald-200",
        "data-[selected-single=true]:bg-emerald-600 data-[selected-single=true]:text-white",
        "data-[range-start=true]:bg-emerald-600 data-[range-start=true]:text-white",
        "data-[range-end=true]:bg-emerald-600 data-[range-end=true]:text-white",
        "data-[range-middle=true]:bg-emerald-700/40 data-[range-middle=true]:text-emerald-100",
        "data-[range-middle=true]:rounded-none",
        "data-[range-start=true]:rounded-l-md",
        "data-[range-end=true]:rounded-r-md",
        "group-data-[focused=true]/day:ring-[3px] group-data-[focused=true]/day:ring-emerald-500/40",
        "[&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className,
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
