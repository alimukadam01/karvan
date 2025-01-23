import { toast } from "react-toastify";
import './utils.css'

export const showSuccessToast = (message) => {
  toast.success(message, {
    position: 'bottom-center',
    autoClose: 3000,
    hideProgressBar: true, // Show/hide progress bar
    newestOnTop: true,
    className: 'toast-message',
    closeButton: false,
    icon: false
  })
}

export const showErrorToast = (message) => {
  toast.error(message, {
    position: 'bottom-center',
    autoClose: 3000,
    hideProgressBar: true,
    newestOnTop: true,
    className: 'toast-message',
    closeButton: false,
    icon: false
  })
}