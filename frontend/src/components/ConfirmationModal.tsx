interface Props {
  message: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void;
}

const ConfirmationModal = ({ message, onConfirm, onCancel }: Props) => {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onCancel();
    }
  };

  return (
    <section
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <section
        className="bg-white p-6 rounded shadow-md max-w-sm w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl mb-4">{message}</h3>
        <section className="flex gap-4 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-black rounded cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer"
          >
            Confirm
          </button>
        </section>
      </section>
    </section>
  );
};

export default ConfirmationModal;
