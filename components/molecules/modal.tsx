"use client";
import { DoorClosed } from "lucide-react";
import { ReactNode, useCallback, useEffect, useState } from "react";
import Button from "../atoms/button";


type Props = {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: ReactNode;
  footer?: ReactNode;
  actionLabel: string;
  disabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
};

export default function Modal({
  actionLabel,
  onClose,
  onSubmit,
  secondaryAction,
  body,
  disabled,
  footer,
  isOpen,
  secondaryActionLabel,
  title,
}: Props) {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setShowModal(false);
    const timeout = setTimeout(() => {
      onClose();
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);
  const handleSecondayAction = useCallback(() => {
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
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0
      z-50 outline-none focus:outline-none bg-neutral-800/70"
      >
        <div className="relative w-full md:w-4/6 lg:w-4/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
          <div
            className={`translate duration-300 h-full ${
              showModal ? "translate-y-0" : "translate-y-full"
            } ${showModal ? "opacity-100" : "opacity-0"}`}
          >
            <div
              className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative
            flex flex-col w-full bg-white outline-none focus:outline-none"
            >
              <div className="flex items-center p-5 rounded-t justify-center relative border-b-[1px]">
                <button
                  onClick={handleClose}
                  className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                >
                  <DoorClosed size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>
              <div className="relative p-6 flex-auto">{body}</div>
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryAction && secondaryActionLabel ? (
                    <Button
                      outline
                      label={secondaryActionLabel}
                      disabled={disabled}
                      onClick={handleSecondayAction}
                    />
                  ) : null}
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
      </div>
    </>
  );
}
