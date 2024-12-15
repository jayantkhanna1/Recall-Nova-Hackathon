import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
export const successToast = (text) => {
  toast.success(text, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
export const reminderToast = (html) => {
  toast.success(<div dangerouslySetInnerHTML={{ __html: html }} />, {
    position: "top-right",
    autoClose: false,
    hideProgressBar: false,
    width: 1400,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    toastClassName: "custom-toast-class",
  });
};

export const errorToast = (text) => {
  toast.error(text, {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
