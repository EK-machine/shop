import Swal, { SweetAlertOptions, SweetAlertPosition } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import '../../common.css';

const infoBannerSwal = withReactContent(Swal);

export default {
  success: (body: string, timer?: number, title?: string, persistent?: boolean, settings?: SweetAlertOptions) => {
    const data = {
      title,
      text: body,
      padding: '10px',
      customClass: {
        htmlContainer: 'alertSuccess',
        container: 'alertWrapper',
      },
      showConfirmButton: false,
      position: 'top' as SweetAlertPosition,
      background: '#60D179',
      backdrop: false,
      ...settings,
    };

    if (persistent) {
      data.showCloseButton = true;
    } else {
      data.timer = timer || 3000;
    }

    infoBannerSwal.fire(data);
  },
  error: (body: string, timer?: number, title?: string, persistent?: boolean, settings?: SweetAlertOptions) => {
    const data = {
      title,
      text: body,
      padding: '10px',
      customClass: {
        htmlContainer: 'alertSuccess',
        container: 'alertWrapper',
      },
      showConfirmButton: false,
      position: 'top' as SweetAlertPosition,
      background: 'linear-gradient(90.65deg, #F06537 0%, #E67753 100%)',
      backdrop: false,
      ...settings,
    };

    if (persistent) {
      data.showCloseButton = true;
    } else {
      data.timer = timer || 6000;
    }

    infoBannerSwal.fire(data);
  },
};
