"use client";

import { ReactElement, useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../ui/Button";

interface ModalProps {
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
}: ModalProps) {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  // BUG FIX #4: Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
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

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }

    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* BUG FIX #1: Backdrop overlay */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-800/70 overflow-x-hidden overflow-y-auto outline-none focus:outline-none"
        onClick={handleClose}
      >
        {/* Modal Container - BUG FIX #3: Animations */}
        <div
          className={`
            relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 
            my-6 mx-auto h-full md:h-auto lg:h-auto
            transition-all duration-300
            ${showModal ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Content */}
          <div className="h-full md:h-auto lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* Header */}
            <div className="flex items-center justify-center p-6 rounded-t relative border-b border-gray-200">
              {/* BUG FIX #6: Close icon button */}
              <button
                onClick={handleClose}
                className="absolute left-9 p-1 border-0 hover:opacity-70 transition-opacity"
                aria-label="Close modal"
              >
                <IoMdClose size={18} />
              </button>
              <h2 className="text-lg font-semibold">{title}</h2>
            </div>

            {/* Body */}
            <div className="relative p-6 flex-auto max-h-[60vh] overflow-y-auto">
              {body}
            </div>

            {/* Footer */}
            <div className="flex flex-col gap-2 p-6">
              <div className="flex flex-row items-center gap-4 w-full">
                {secondaryAction && secondaryActionLabel && (
                  <Button
                    label={secondaryActionLabel}
                    disabled={disabled}
                    onClick={handleSecondaryAction}
                    outline
                  />
                )}
                <Button
                  label={actionLabel}
                  disabled={disabled}
                  onClick={handleSubmit}
                />
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
