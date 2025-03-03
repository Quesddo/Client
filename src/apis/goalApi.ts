import {
  CreateGoalBodyDto,
  TeamIdGoalsGet200ResponseGoalsInner,
} from "@/types/types";

import instance from "./apiClient";

const goalApi = {
  createGoal: async (
    body: CreateGoalBodyDto,
  ): Promise<TeamIdGoalsGet200ResponseGoalsInner> => {
    return (await instance.post("/goals", body)).data;
  },
};

export default goalApi;
