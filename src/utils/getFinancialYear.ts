//date format dd/mm/yyyy or d/mm/yyyy or dd/m/yyyy or d/m/yyyy
//returns financial year in string format "20xx-20xx"
export const getFinancialYear = (date: string): string | null => {
	const dateArray = date !== null ? date.split('/') : [];
	if (dateArray.length === 3)
		return +dateArray[1] < 7 ? +dateArray[2] - 1 + "-" + dateArray[2] : dateArray[2] + "-" + (+dateArray[2] + 1)
	else return null
}