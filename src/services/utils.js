import { toast } from "react-toastify";
import './utils.css'



export const showSuccessToast = (message) => {
  
  toast.success(message, {
    position: 'bottom-center',
    autoClose: 3000,
    hideProgressBar: true, // Show/hide progress bar
    newestOnTop: true,
    className: window.innerWidth < 900? 'toast-mobile-message': 'toast-message',
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

export const handleScrollNavigate = (target, location, navigate, setMenuOpen = null) => {
  
  if (setMenuOpen){
    setMenuOpen(false)
  }
  
  if (location.pathname !== '/') {
    navigate('/');
  }
  setTimeout(() => {
    const element = document.querySelector(`#${target}`);
    if (element) element.scrollIntoView({ 
      behavior: 'smooth' 
    })
  }, 100)
}

export const resetScroll = () => {
  if(window.pageYOffset !== 0){
    window.scrollTo(0, 0)
  }
}
