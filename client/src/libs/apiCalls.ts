import { FieldValues } from "react-hook-form";
import { myAxios } from "../api/myAxios";

export async function auth({
  endPoint,
  data,
}: {
  endPoint: string;
  data: FieldValues;
}) {
  return await myAxios.post(`auth/${endPoint}`, data);
}
export async function chosePlan({ plan, id }: { plan: string; id: string }) {
  return await myAxios
    .post("/user/plan", { plan, id })
    .then(({ data }) => data);
}

export async function newMeet({
  id,
  meetCode,
}: {
  id: string;
  meetCode: string;
}) {
  return await myAxios.post("/meet", { id, meetCode }).then(({ data }) => data);
}
export async function joinMeet({
  userId,
  meetCode,
}: {
  userId: string;
  meetCode: string;
}) {
  return await myAxios.patch("/meet", { userId, meetCode });
}
export async function getMembers({ meetCode }: { meetCode: string }) {
  return await myAxios
    .get(`/meet/${meetCode}`)
    .then(({ data }) => data)
    .catch((err) => err);
}
export async function deleteMeet({ meetCode }: { meetCode: string }) {
  return await myAxios
    .post(`/meet/${meetCode}`)
    .then(({ data }) => data)
    .catch((err) => err);
}
