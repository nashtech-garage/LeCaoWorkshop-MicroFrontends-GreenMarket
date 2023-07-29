import { LifeCycles } from 'single-spa';

class ToastService implements LifeCycles {

  private toastChannel: BroadcastChannel = new BroadcastChannel('TOAST_CHANNEL');

  constructor() {
    this.toastChannel.onmessage = (e) => {
      if (e) {
        switch (e.data.type) {
          case 'success':
            this.showSuccess(e.data.message);
            break;
          case 'error':
            this.showError(e.data.message);
            break;
          case 'warning':
            this.showWarning(e.data.message);
            break;
          case 'information':
            this.showInformation(e.data.message);
            break;
        }
      }
    };
  }

  bootstrap(): Promise<void> { return Promise.resolve(); }

  mount(): Promise<void> {
    const toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);
    return Promise.resolve();
  }

  unmount(): Promise<void> {
    const toastContainer = document.getElementById('toast-container');
    toastContainer.remove();
    return Promise.resolve();
  }

  showSuccess(message: string) { this.showMessage(message, 'success'); }

  showError(message: string) { this.showMessage(message, 'error'); }

  showWarning(message: string) { this.showMessage(message, 'warning'); }

  showInformation(message: string) { this.showMessage(message, 'information'); }

  private showMessage(message: string, type: string): void {
    const toastContainer = document.getElementById('toast-container');
    const toastElement = document.createElement('div');

    toastElement.classList.add('toast-message');

    let toastTypeIcon = '';
    switch (type) {
      case 'success':
        toastTypeIcon = 'fa-check-circle';
        toastElement.style.backgroundColor = '#28a745';
        break;
      case 'error':
        toastTypeIcon = 'fa-times-circle';
        toastElement.style.backgroundColor = '#dc3545';
        break;
      case 'warning':
        toastTypeIcon = 'fa-exclamation-triangle';
        toastElement.style.backgroundColor = '#ffc107';
        break;
      case 'information':
        toastTypeIcon = 'fa-info-circle';
        toastElement.style.backgroundColor = '#17a2b8';
        break;
    }

    toastElement.innerHTML = `<i class="fa ${toastTypeIcon}" aria-hidden="true"></i> ${message}`;

    toastContainer.appendChild(toastElement);
    toastElement.classList.add('toast-message-show');

    setTimeout(() => { toastElement.classList.add('toast-message-show'); }, 10);
    setTimeout(() => {
      toastElement.classList.remove('toast-message-show');
      setTimeout(() => {
        toastElement.remove();
      }, 300);
    }, 3000);
  }
}

export default ToastService;
