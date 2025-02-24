import BaseUrl from "@/constant/BaseApi";

export async function getUserInstance(userId) {
  const res = await fetch(`${BaseUrl}/instances/getAllClientIds/${userId}`);
  const data = await res.json();
  return data;
}

// export default async function ServerPlans({ children }) {
//   const plans = await getAllPlans();
//   return children({ plans });
// }
