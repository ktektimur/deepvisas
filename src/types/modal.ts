
export interface AddTrackingModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { country: string; city: string; visaType: string }) => void;
}
