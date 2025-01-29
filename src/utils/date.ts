import { parseAbsoluteToLocal } from "@internationalized/date";
import { DateValue } from "@heroui/react";

const toStandardTime = (time: number) => {
  if (time < 10) {
    return `0${time}`;
  } else {
    return time;
  }
};

const toStandardDate = (date: DateValue) => {
  const year = date.year;
  const month = date.month;
  const day = date.day;
  const hour = "hour" in date ? date.hour : 0;
  const minute = "minute" in date ? date.minute : 0;
  const second = "second" in date ? date.second : 0;

  const result = `${year}-${toStandardTime(month)}-${toStandardTime(day)} ${toStandardTime(hour)}:${toStandardTime(minute)}:${toStandardTime(
    second,
  )}`;

  console.log("toStandardDate", result);
  return result;
};

const toInputDate = (date: string) => {
  const formattedDate = parseAbsoluteToLocal(`${date.replace(" ", "T")}+07:00`);
  return formattedDate;
};

export { toStandardDate, toInputDate };
