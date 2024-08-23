import { format } from "date-fns";

import { FormatDateType } from "../enums/format-date.enum.js";
import { type ValueOf } from "../types/valueOf.type.js";

const getFormattedDate = (
	date: string,
	formatType: ValueOf<typeof FormatDateType>,
): string => {
	const inputDate = new Date(date);

	return format(inputDate, formatType);
};

export { getFormattedDate };