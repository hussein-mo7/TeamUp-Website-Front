"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { Check, ChevronLeft, ShieldCheck, X } from "lucide-react";
import Modal from "./Modal";
import { Button } from "@/components/ui/buttons";
import Input from "@/components/ui/forms/Input";

export interface ProjectIdeaCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  priceLabel: string;
  onPurchased: () => void;
}

const ProjectIdeaCheckoutModal = ({
  isOpen,
  onClose,
  projectName,
  priceLabel,
  onPurchased,
}: ProjectIdeaCheckoutModalProps) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardError, setCardError] = useState("");

  const resetState = () => {
    setIsSuccess(false);
    setCardNumber("");
    setCardError("");
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleCheckout = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cardNumber.replace(/\s/g, "").length < 12) {
      setCardError("Incorrect card number");
      return;
    }

    setCardError("");
    setIsSuccess(true);
    onPurchased();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="w-full max-w-[720px] p-5 sm:p-6"
      closeButtonClassName="text-content-light hover:bg-gray-100 hover:text-content"
    >
      {!isSuccess ? (
        <form onSubmit={handleCheckout} className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="font-primary text-2xl font-semibold text-content">Checkout</h2>
            <button
              type="button"
              onClick={handleClose}
              className="flex h-8 w-8 items-center justify-center rounded-md text-content-light transition-colors hover:bg-gray-100 hover:text-content"
              aria-label="Close checkout"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <section className="space-y-4">
            <h3 className="font-primary text-lg font-semibold text-content-light">Order Summary</h3>
            <div className="flex items-center justify-between">
              <p className="font-primary text-sm font-semibold text-primary">{projectName}</p>
              <p className="font-primary text-sm font-semibold text-emerald-500">{priceLabel}</p>
            </div>
          </section>

          <section className="space-y-5">
            <h3 className="font-primary text-lg font-semibold text-content-light">Card information</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <Input id="first-name" label="First name" placeholder="enter first name" />
              <Input id="last-name" label="Last name" placeholder="enter last name" />
            </div>

            <Input
              id="card-number"
              label="Card Number"
              placeholder="enter card number"
              value={cardNumber}
              onChange={(event) => setCardNumber(event.target.value)}
              error={cardError || undefined}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Input id="expiry-date" label="Expiry Date" placeholder="mon/Y" />
              <Input id="cvv" label="CVV" placeholder="****" type="password" />
            </div>

            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide text-content-muted">
              <ShieldCheck size={14} aria-hidden="true" />
              <span>Secured by Stripe</span>
            </div>
          </section>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex items-center gap-2 font-primary text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              <ChevronLeft size={18} aria-hidden="true" />
              Back
            </button>

            <Button type="submit" variant="primary" size="md" className="min-w-44 px-8">
              Check out {priceLabel}
            </Button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col items-center px-4 py-8 text-center sm:px-8 sm:py-10">
          <div className="mt-4 flex items-center justify-center">
            <Image
              src="/images/elements (3).svg"
              alt="Purchase successful"
              width={120}
              height={120}
              unoptimized
              priority
            />
          </div>

          <h2 className="mt-8 font-primary text-xl font-semibold text-content">Purchase Successful!</h2>
          <p className="mt-3 max-w-lg font-primary text-sm leading-relaxed text-content-light">
            You can now download the complete idea files and start turning them into a graduation project immediately.
          </p>

          <Button
            type="button"
            variant="primary"
            size="md"
            className="mt-8 min-w-44 px-8"
            onClick={handleClose}
          >
            Download Files
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default ProjectIdeaCheckoutModal;