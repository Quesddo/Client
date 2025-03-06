import Section from "../component/Section";

export default function GoalDoneList() {
  return (
    <Section className="flex-1 bg-slate-200 hover:shadow">
      <div className="mb-[16px] flex justify-between">
        <p className="text-lg font-bold">done</p>
      </div>
      <div className="h-[168px] overflow-x-hidden overflow-y-auto pr-4 md:h-[512px]">
        <div className="flex h-full items-center justify-center text-sm font-normal text-slate-500">
          다 한 일이 아직 없어요
        </div>
        {/* {dones?.length ? (
          <TodoList
            data={dones}
            handleToggleTodo={handleToggleTodo}
            setSelectedTodoId={setSelectedTodoId}
            onOpenDeletePopup={() => setIsPopupOpen(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-normal text-slate-500">
            다 한 일이 아직 없어요
          </div>
        )} */}
      </div>
    </Section>
  );
}
