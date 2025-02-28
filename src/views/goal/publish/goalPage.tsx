import arrowRight from "@public/icons/ic_arrow_right.svg";
import linkAlt from "@public/icons/link_alt.svg";
import meatBalls from "@public/icons/meatballs_menu.svg";
import note from "@public/icons/note.svg";
import uploaded from "@public/icons/uploaded.svg";
import { cva } from "class-variance-authority";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ActionDropdown from "@/components/atoms/action-dropdown/ActionDropdown";
import GoalItem from "@/components/atoms/goal-item/GoalItem";
import PageTitle from "@/components/atoms/page-title/PageTitle";
import PlusIcon from "@/components/atoms/plus-icon/PlusIcon";
import { cn } from "@/utils/cn";
import frame from "@public/icons/frame.svg";

const layoutVariants = cva(
  "h-full bg-slate-100 px-[16px] pt-[64px] sm:pl-[84px] sm:pr-[24px] sm:pt-[24px] md:px-[360px] flex flex-col gap-[16px]",
);

const sectionVariants = cva(
  "px-[24px] py-[16px] rounded-xl border border-slate-100",
);

export default function GoalDetailPage() {
  const router = useRouter();
  const [isMobileSize, setisMobileSize] = useState(false);
  const [isOpenActionDropDown, setIsOpenActionDropDown] = useState(false);

  const handleClick = () => {
    setIsOpenActionDropDown(true);
  };

  useEffect(() => {
    if (window.innerWidth < 744) {
      setisMobileSize(true);
      console.log(isMobileSize);
    }
  }, []);

  return (
    <>
      <div>
        <Head>
          <title>{router.query.goalId}</title>
        </Head>
      </div>
      <div className={cn(layoutVariants())}>
        {/* pagename */}
        <section className={cn(sectionVariants())}>
          <PageTitle title="목표" isMobileFixed={isMobileSize} />
        </section>
        {/* goalTitle */}
        <section
          className={cn(sectionVariants({ className: "relative bg-white" }))}
        >
          <div className="mb-[24px] flex justify-between">
            <GoalItem
              goal="자바스크립트로 웹 서비스 만들기"
              fontWeight="semibold"
              iconSize="lg"
              textSize="sm"
            />
            <Image
              src={meatBalls}
              alt="meat-balls"
              width={24}
              height={24}
              onClick={handleClick}
            />
            <ActionDropdown
              isOpen={isOpenActionDropDown}
              items={[
                {
                  label: "수정하기",
                  onClick: () => {
                    console.log(1);
                    setIsOpenActionDropDown(() => false);
                  },
                },
                {
                  label: "삭제하기",
                  onClick: () => {
                    console.log(2);
                    setIsOpenActionDropDown(() => false);
                  },
                },
              ]}
              setIsOpen={setIsOpenActionDropDown}
              className="absolute top-[56px] right-6"
            />
          </div>
          <p className="color-slate-900 mb-[8px] text-xs font-semibold">
            Progress
          </p>
          <div className="flex h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-neutral-700"></div>
        </section>
        {/* 노트 모아보기 */}
        <section className={cn(sectionVariants({ className: "bg-blue-100" }))}>
          <div className="flex justify-between">
            <div className="flex gap-[8px]">
              <Image
                src={note}
                width={24}
                height={24}
                alt="note"
                className="inline-block"
              />
              <span className="text-lg font-bold text-slate-800">
                노트 모아보기
              </span>
            </div>
            <Image src={arrowRight} alt="arrow-right" />
          </div>
        </section>
        <section
          className={cn(
            sectionVariants({
              className:
                "flex flex-col gap-[16px] p-[0px] md:flex-row md:justify-between md:gap-[24px]",
            }),
          )}
        >
          {/* todo  */}
          <section
            className={cn(sectionVariants({ className: "bg-white sm:grow" }))}
          >
            {/* todo head */}
            <div className="mb-[16px] flex justify-between">
              <p className="text-lg font-bold">To do</p>
              <div className="flex justify-between gap-[4px]">
                <div>
                  <PlusIcon
                    width={16}
                    height={16}
                    className="inline"
                    color="#3b82f6"
                  />
                </div>
                <p className="content-center text-sm font-semibold text-blue-500">
                  할일 추가
                </p>
              </div>
            </div>
            {/* todo list */}
            <li className="mb-[10px] flex justify-between">
              <div className="flex align-middle">
                <input type="checkbox" name="" className="mr-[8px]" />
                <span className="text-sm font-normal">
                  자바스크립트 쳅터 1듣기
                </span>
              </div>
              <div className="flex gap-[8px]">
                <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-slate-50">
                  <Image
                    src={uploaded}
                    height={14}
                    width={14}
                    alt="note-view"
                  />
                </div>
                <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-blue-100">
                  <Image src={linkAlt} height={14} width={14} alt="note-view" />
                </div>
                <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-slate-50">
                  <Image src={frame} width={9} height={10.3} alt="note-view" />
                </div>
                <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-slate-50">
                  <Image
                    src={meatBalls}
                    height={14}
                    width={14}
                    alt="note-view"
                  />
                </div>
              </div>
            </li>
          </section>
          {/* done */}
          <section
            className={cn(
              sectionVariants({ className: "bg-slate-200 sm:grow" }),
            )}
          >
            {/* todo head */}
            <div className="mb-[16px] flex justify-between">
              <p className="text-lg font-bold">done</p>
            </div>
            {/* todo list */}
            <li className="mb-[10px] flex justify-between">
              <div>
                <input type="checkbox" name="" className="mr-[8px]" checked />
                <span className="text-sm font-normal">
                  <del>자바스크립트 쳅터 1듣기</del>
                </span>
              </div>
              <div className="flex gap-[8px]">
                <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-white">
                  <Image src={frame} width={9} height={10.3} alt="note-view" />
                </div>
                <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-white">
                  <Image
                    src={meatBalls}
                    height={14}
                    width={14}
                    alt="note-view"
                  />
                </div>
              </div>
            </li>
          </section>
        </section>
      </div>
    </>
  );
}
