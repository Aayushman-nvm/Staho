"use client";

import { ReactElement, useCallback, useEffect, useState } from "react";
import Button from "../ui/Button";

interface Modal {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  body?: ReactElement;
  footer?: ReactElement;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

function Modal({
  isOpen,
  onClose,
  onSubmit,
  title,
  body,
  footer,
  actionLabel,
  disabled,
  secondaryAction,
  secondaryActionLabel,
}: Modal) {
  const [showModal, setShowModal] = useState(isOpen);
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }

    setShowModal(false);

    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }

    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction=useCallback(()=>{
    if(disabled||!secondaryAction){
        return;
    }

    secondaryAction();
  },[disabled,secondaryAction]);

  if(!isOpen){
    return null;
  }

  return <div>Modal
    <button onClick={handleClose}>Close</button>
    <div>{title}</div>
    <div>{body}</div>
    {secondaryAction && secondaryActionLabel && (
        <Button label={secondaryActionLabel} disabled={disabled} onClick={handleSecondaryAction}/>
    )}
    <Button label={actionLabel} disabled={disabled} onClick={handleSubmit}/>
    {footer}
  </div>;
}

export default Modal;
