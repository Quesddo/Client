import Popup from "@/components/molecules/popup/Popup";

interface DeletePopupProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeletePopup({ onConfirm, onCancel }: DeletePopupProps) {
  return (
    <div>
      <Popup onConfirm={onConfirm} onClose={onCancel} isCancelEnabled={true}>
        할 일을 삭제하시겠어요?
        <br />
        삭제된 할 일은 복구할 수 없습니다.
      </Popup>
    </div>
  );
}
