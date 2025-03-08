import {
  CreateGoalBodyDto,
  TeamIdGoalsGet200Response,
  TeamIdGoalsGet200ResponseGoalsInner,
  teamIdGoalsGetParams,
} from "@/types/types";

import instance from "./apiClient";

const goalApi = {
  /**
   * 내 목표 리스트 조회
   */
  fetchGoals: async (
    pageParam: number | undefined,
    size: number,
  ): Promise<TeamIdGoalsGet200Response> => {
    const params: teamIdGoalsGetParams = {
      sortOrder: "newest",
      cursor: pageParam,
      size,
    };
    return (await instance.get("/goals", { params })).data;
  },

  /**
   * 내 목표 생성
   */
  createGoal: async (
    body: CreateGoalBodyDto,
  ): Promise<TeamIdGoalsGet200ResponseGoalsInner> => {
    return (await instance.post("/goals", body)).data;
  },
};

export default goalApi;
