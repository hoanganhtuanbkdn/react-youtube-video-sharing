import { toast } from 'react-toastify';

const showToastSuccess = (mess: string = 'Thành công!') => toast.success(mess);
const showToastError = (mess: string = 'Thất bại!') => toast.error(mess);

export { showToastError, showToastSuccess };
