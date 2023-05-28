import moment from 'moment';
import { isUndefined } from 'ramda-adjunct';

export const formatCurrency = (
	n: number | string | undefined,
	format?: string
) => {
	if (isUndefined(n)) return 0;
	return new Intl.NumberFormat('en-US').format(Number(n));
};

export const formatTableDate = (row: { createdAt: string }) => {
	return moment(row?.createdAt).format('YYYY-MM-DD HH:mm');
};
export const formatTableDate2 = (date?: string) => {
	if (!date) return '';
	return moment(date).format('YYYY-MM-DD');
};
export const formatDate = (createdAt: string) => {
	return moment(createdAt).format('dddd, MMMM Do YYYY');
};
