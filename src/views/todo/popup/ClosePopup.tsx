import Popup from "@/components/molecules/popup/Popup";

interface ClosePopupProps {
  onConfirm: () => void;
  onClose: () => void;
}

export default function ClosePopup({ onConfirm, onClose }: ClosePopupProps) {
  return (
    <div>
      <Popup onConfirm={onConfirm} onClose={onClose} isCancelEnabled={true}>
        정말 나가시겠어요?
        <br />
        작성된 내용이 모두 삭제됩니다.
      </Popup>
    </div>
  );
}
