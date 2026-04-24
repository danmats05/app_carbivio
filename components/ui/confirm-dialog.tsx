"use client";

import { X } from "@phosphor-icons/react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmation",
  message = "Êtes-vous sûr de vouloir continuer ?",
  confirmText = "Confirmer",
  cancelText = "Annuler",
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const handleClose = () => {
    // Ajouter une classe d'animation de fermeture
    const dialog = document.querySelector(".confirm-dialog-content");
    const backdrop = document.querySelector(".confirm-dialog-backdrop");

    if (dialog && backdrop) {
      dialog.classList.add("animate-out", "zoom-out-95", "duration-200");
      backdrop.classList.add("animate-out", "fade-out-0", "duration-200");

      setTimeout(() => {
        onClose();
      }, 200);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 confirm-dialog-backdrop animate-in fade-in-0 duration-200">
      <div className="bg-card border border-border rounded-lg p-6 shadow-lg max-w-md w-full mx-4 confirm-dialog-content animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">
            {title}
          </h3>
          <button
            onClick={handleClose}
            className="text-muted-foreground hover:text-foreground transition-colors hover:scale-110 duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-muted-foreground mb-6">{message}</p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:scale-105 duration-200"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md transition-all duration-200 hover:scale-105 active:scale-95"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
