import BaseUrl from "@/constant/BaseApi";

// async function getAllPlans() {
//   const res = await fetch(`${BaseUrl}/plans/getAllPlan`, {
//     next: { revalidate: 60 },
//   });
//   const data = await res?.json();
//   return data;
// }

// export default async function ServerPlans({ children }) {
//   const plans = await getAllPlans();
//   return children({ plans });
// }
