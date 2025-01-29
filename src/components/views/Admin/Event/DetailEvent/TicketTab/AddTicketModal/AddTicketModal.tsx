import CustomInput from "@/components/ui/CustomInput";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import React, { useEffect } from "react";
import useAddTicketModal from "./useAddTicketModal";
import { Controller } from "react-hook-form";
import CustomTextArea from "@/components/ui/CustomTextArea";

interface PropTypes {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  refectTicket: () => void;
}

export default function AddTicketModal(props: PropTypes) {
  const { isOpen, onClose, onOpenChange, refectTicket } = props;
  const {
    control,
    errors,
    handleFormSubmit,
    handleAddTicket,
    isPendingMutateAddTicket,
    isSuccessMutateAddTicket,
    reset,
  } = useAddTicketModal();

  useEffect(() => {
    if (isSuccessMutateAddTicket) {
      onClose();
      refectTicket();
    }
  }, [isSuccessMutateAddTicket]);

  const handleOnClose = () => {
    onClose();
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
      onClose={handleOnClose}
    >
      <form onSubmit={handleFormSubmit(handleAddTicket)}>
        <ModalContent className="m-4">
          <ModalHeader>Add Ticket</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    autoFocus
                    label="Name"
                    variant="bordered"
                    labelPlacement="inside"
                    type="text"
                    isInvalid={errors.name !== undefined}
                    errorMessage={errors.name?.message}
                  />
                )}
              />
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    label="Price"
                    variant="bordered"
                    labelPlacement="inside"
                    type="number"
                    isInvalid={errors.price !== undefined}
                    errorMessage={errors.price?.message}
                  />
                )}
              />
              <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    label="Quantity"
                    variant="bordered"
                    labelPlacement="inside"
                    type="number"
                    isInvalid={errors.quantity !== undefined}
                    errorMessage={errors.quantity?.message}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <CustomTextArea
                    {...field}
                    label="Description"
                    variant="bordered"
                    labelPlacement="inside"
                    type="text"
                    isInvalid={errors.description !== undefined}
                    errorMessage={errors.description?.message}
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={handleOnClose}
              disabled={isPendingMutateAddTicket}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              type="submit"
              disabled={isPendingMutateAddTicket}
            >
              {isPendingMutateAddTicket ? (
                <div className="flex gap-2">
                  <Spinner color="white" size="sm" />
                  Loading...
                </div>
              ) : (
                "Create Ticket"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
