"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateTimePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  className?: string;
}

export function DateTimePicker({
  value,
  onChange,
  className,
}: DateTimePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(value);
  const [hour, setHour] = React.useState("12");
  const [minute, setMinute] = React.useState("00");

  React.useEffect(() => {
    if (date) {
      const newDate = new Date(date);
      newDate.setHours(parseInt(hour));
      newDate.setMinutes(parseInt(minute));
      onChange?.(newDate);
    }
  }, [date, hour, minute]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="chrono"
          className={cn(
            "w-full justify-start text-left font-normal bg-emerald-950 border-emerald-800",
            !date && "text-muted-foreground",
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-emerald-400" />
          {date ? (
            format(
              new Date(date.setHours(parseInt(hour), parseInt(minute))),
              "PPP HH:mm",
            )
          ) : (
            <span>Select date & time</span>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-4 bg-emerald-950 border-emerald-800 rounded-xl">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          className="rounded-md"
        />

        <div className="flex items-center justify-between gap-2 mt-4">
          <Clock className="h-4 w-4 text-emerald-600" />

          <Select value={hour} onValueChange={setHour}>
            <SelectTrigger className="w-[80px] bg-emerald-950 border-emerald-800">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 24 }).map((_, i) => (
                <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                  {i.toString().padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <span className="text-muted-foreground">:</span>

          <Select value={minute} onValueChange={setMinute}>
            <SelectTrigger className="w-[80px] bg-emerald-950 border-emerald-800">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 60 }).map((_, i) => (
                <SelectItem key={i} value={i.toString().padStart(2, "0")}>
                  {i.toString().padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  );
}
