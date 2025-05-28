interface DeleteModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal = ({ visible, onConfirm, onCancel }: DeleteModalProps) => {
  if (!visible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this task?</p>
        <div className="modal-actions">
          <button className="modal-button confirm" onClick={onConfirm}>
            Yes, Delete
          </button>
          <button className="modal-button cancel" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
