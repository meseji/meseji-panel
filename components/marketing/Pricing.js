"use client";

import BaseUrl from "@/constant/BaseApi";
import {
  useCreateOrderMutation,
  useCreatePaymentMutation,
  useVerifyPaymentMutation,
} from "@/lib/features/api/paymentApiSlice";
import { useEffect, useState } from "react";
import { CheckIcon, RightArrowIcon } from "../Icon";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { load } from "@cashfreepayments/cashfree-js";
import { useToast } from "../shared/toast/ToastContext";

export function Pricing({ plans }) {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const [cashfree, setCashfree] = useState(null);
  const { addToast } = useToast();
  // const [planId,setPlanId] = useState(null)

  useEffect(() => {
    const initializeCashfree = async () => {
      try {
        const cashfreeInstance = await load({
          mode: process.env.NEXT_PUBLIC_CASHFREE_ENVIRONMENT,
        });
        setCashfree(cashfreeInstance);
      } catch (error) {
        console.error("Error initializing Cashfree:", error);
      }
    };

    initializeCashfree();
  }, []);

  const [createOrder, { error: orderError }] = useCreateOrderMutation();
  const [verifyPayment, { error: verifyError }] = useVerifyPaymentMutation();

  const handleBuyPlan = async (planId) => {
    if (!user && !user?.email) {
      router.push("/login");
      return;
    }

    try {
      
      const result = await createOrder({ planId });
      const { order_id, payment_session_id } = result.data.data;

      const checkoutOptions = {
        paymentSessionId: payment_session_id,
        redirectTarget: "_modal",
      };

      if (cashfree) {
        cashfree.checkout(checkoutOptions).then((res) => {
          if (res) {
            handleVerifyPayment({
              orderId: order_id,
              userId: user.userId,
              planId: planId,
            }); // Proceed to verify payment on success
          } else {
            console.error("Payment failed or was canceled");
          }
        });
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handleVerifyPayment = async (data) => {
    try {
      const result = await verifyPayment(data).unwrap();
      addToast("Payment successful!", "success");
      router.push("/dashboard");
    } catch (error) {
      addToast("Payment failed or was canceled", "error");

      console.error("Error verifying payment:", error);
      // Handle error state or show error message
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="py-14 lg:py-24 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-manrope font-bold text-5xl text-gray-900 text-center mb-4">
            Meseji&apos;s Great Pricing with Great Features
          </h1>
          <p className="font-normal text-base leading-7 text-gray-500 mb-8 text-center">
            7 Days free trial. No credit card required.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-md mx-auto md:max-w-3xl lg:max-w-full">
            {plans?.plans.map((plan) => (
              <div
                key={plan._id}
                className="starter rounded-2xl border border-gray-300 p-4 xl:p-6 flex flex-col justify-between transition-all duration-500 hover:border-indigo-600"
              >
                <div className="data ">
                  <h6 className="font-semibold text-base leading-7 text-emerald-400 mb-3">
                    {plan.planName}
                  </h6>
                  <h5 className="font-manrope font-bold text-xl text-gray-700 leading-tight mb-2">
                    <span className="line-through tracking-wide">
                      ₹{plan.discountedAmount}
                    </span>
                    <span className="font-medium text-xs leading-5 text-red-400 ml-2.5">
                      / {plan.discountPercent}%
                    </span>
                  </h5>
                  <h4 className="font-manrope font-bold text-5xl text-gray-900 leading-tight mb-2 flex items-center">
                    <span className="text-base font-normal leading-6 text-gray-600">
                      ₹
                    </span>
                    {plan.planAmount}
                    <span className="text-sm font-normal leading-6 text-gray-600">
                      /instacne/month
                    </span>
                  </h4>
                  <span className="text-sm font-normal leading-6 text-gray-600">
                    From {plan.planAmount * plan.instanceCount.toFixed(1)} INR
                    /month for {plan.instanceCount} instances
                  </span>
                  <p className="font-normal text-md text-base leading-8 text-gray-600 mb-6">
                    {plan.planDescription}
                  </p>
                  {plan.feature.map((feature, index) => (
                    <div
                      key={index}
                      className="items-center gap-4 mb-3 hidden lg:flex"
                    >
                      <CheckIcon className="stroke-gray-900" />
                      <span className="font-normal text-sm leading-6 text-gray-500">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="card-data mt-5 block lg:hidden">
                  <ul className="mb-7">
                    {" "}
                    {plan.feature.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center justify-between py-1.5 border-b border-gray-100"
                      >
                        {/* <p className="font-normal text-sm text-gray-400">{feature}</p> */}
                        <p className="font-normal text-sm text-gray-900">
                          {feature}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleBuyPlan(plan?.planId)}
                  className="group flex items-center justify-center py-3 px-3 xl:px-6 rounded-full bg-indigo-50 shadow-sm shadow-indigo-100 mt-auto relative bottom-0 transition-all duration-500 hover:bg-indigo-600"
                >
                  <span className="px-2 font-semibold text-sm text-indigo-600 group-hover:text-white whitespace-nowrap">
                    Buy this plan
                  </span>
                  <RightArrowIcon className="stroke-indigo-600 group-hover:stroke-white" />
                </button>
              </div>
            ))}

            {/* <div className="Enterprise rounded-2xl border border-gray-300 p-4 xl:p-6 flex flex-col justify-between transition-all duration-500 hover:border-indigo-600">
              <div className="data">
                <h6 className="font-semibold text-base leading-7 text-blue-400 mb-3">
                  Enterprise
                </h6>
                <h4 className="font-manrope font-bold text-3xl text-gray-900 leading-tight mb-2 flex items-center">
                  Contact us{" "}
                </h4>
                <p className="font-normal text-base leading-8 text-gray-600 mb-6">
                  For custom needs
                </p>

                <div className="hidden lg:flex items-center gap-4 mb-3">
                  <CheckIcon className="stroke-gray-900" />

                  <span className="font-normal text-sm leading-6 text-gray-500">
                    custom MAUs
                  </span>
                </div>

                <div className="hidden lg:flex items-center gap-4 mb-3">
                  <CheckIcon className="stroke-gray-900" />

                  <span className="font-normal text-sm leading-6 text-gray-500">
                    Custom seats
                  </span>
                </div>

                <div className="hidden lg:flex items-center gap-4 mb-3">
                  <CheckIcon className="stroke-gray-900" />

                  <span className="font-normal text-sm leading-6 text-gray-500">
                    Priority support
                  </span>
                </div>

                <div className="hidden lg:flex items-center gap-4 mb-3">
                  <CheckIcon className="stroke-gray-900" />

                  <span className="font-normal text-sm leading-6 text-gray-500">
                    Webhooks
                  </span>
                </div>

                <div className="hidden lg:flex items-center gap-4 mb-3">
                  <CheckIcon className="stroke-gray-900" />

                  <span className="font-normal text-sm leading-6 text-gray-500">
                    Optional custom solution
                  </span>
                </div>

                <div className="hidden lg:flex items-center gap-4 mb-12">
                  <CheckIcon className="stroke-gray-900" />

                  <span className="font-normal text-sm leading-6 text-gray-500">
                    Optional SLAs and DPAs
                  </span>
                </div>
              </div>

              <div className="card-data mt-5 block lg:hidden">
                <h5 className="font-medium text-xl leading-8 text-gray-900 mb-4">
                  Usage
                </h5>
                <ul className="mb-7">
                  <li className="flex items-center justify-between py-1.5 border-b border-gray-100">
                    <p className="font-normal text-sm text-gray-400">MAUs</p>
                    <p className="font-normal text-sm text-gray-900">Custom</p>
                  </li>
                  <li className="flex items-center justify-between py-1.5 border-b border-gray-100">
                    <p className="font-normal text-sm text-gray-400">
                      Simultaneous Connections per room
                    </p>
                    <p className="font-normal text-sm text-gray-900">Custom</p>
                  </li>
                  <li className="flex items-center justify-between py-1.5 border-b border-gray-100">
                    <p className="font-normal text-sm text-gray-400">
                      Projects
                    </p>
                    <p className="font-normal text-sm text-gray-900">Custom</p>
                  </li>
                  <li className="flex items-center justify-between py-1.5 border-b border-gray-100">
                    <p className="font-normal text-sm text-gray-400">Seats</p>
                    <p className="font-normal text-sm text-gray-900">Custom</p>
                  </li>
                </ul>

                <h5 className="font-medium text-xl leading-8 text-gray-900 mb-4">
                  Collaborative document
                </h5>
                <ul className="mb-7">
                  <li className="flex items-center justify-between py-1.5 border-b border-gray-100">
                    <p className="font-normal text-sm text-gray-400">
                      Presence
                    </p>
                    <span>
                      <CheckIcon className="stroke-gray-900" />
                    </span>
                  </li>
                  <li className="flex items-center justify-between py-1.5 border-b border-gray-100">
                    <p className="font-normal text-sm text-gray-400">
                      Broadcast
                    </p>
                    <span>
                      <CheckIcon className="stroke-gray-900" />
                    </span>
                  </li>
                  <li className="flex items-center justify-between py-1.5 border-b border-gray-100">
                    <p className="font-normal text-sm text-gray-400">
                      Conflict-free data types
                    </p>
                    <span>
                      <CheckIcon className="stroke-gray-900" />
                    </span>
                  </li>
                </ul>

                <h5 className="font-medium text-xl leading-8 text-gray-900 mb-4">
                  Platform Security and Compliance
                </h5>
                <ul className="mb-7">
                  <li className="flex items-center justify-between py-1.5 border-b border-gray-100">
                    <p className="font-normal text-sm text-gray-400">SSO</p>
                    <p className="font-normal text-sm text-gray-900">
                      G suite, GitHub
                    </p>
                  </li>
                  <li className="flex items-center justify-between py-1.5 border-b border-gray-100">
                    <p className="font-normal text-sm text-gray-400">SOC 2</p>
                    <p className="font-normal text-sm text-gray-900">
                      Coming soon
                    </p>
                  </li>
                  <li className="flex items-center justify-between py-1.5 border-b border-gray-100">
                    <p className="font-normal text-sm text-gray-400">
                      Security questionnaires
                    </p>
                    <p className="font-normal text-sm text-gray-900">Custom</p>
                  </li>
                  <li className="flex items-center justify-between py-1.5 border-b border-gray-100">
                    <p className="font-normal text-sm text-gray-400">
                      99.99% Uptime SLA
                    </p>
                    <p className="font-normal text-sm text-gray-900">
                      Optional
                    </p>
                  </li>
                  <li className="flex items-center justify-between py-1.5 border-b border-gray-100">
                    <p className="font-normal text-sm text-gray-400">
                      Data Processing Agreement
                    </p>
                    <p className="font-normal text-sm text-gray-900">
                      Optional
                    </p>
                  </li>
                </ul>
              </div> 

              <button className="group flex items-center justify-center py-3 px-3 xl:px-6 rounded-full bg-indigo-50 shadow-sm shadow-indigo-100 mt-auto relative bottom-0 transition-all duration-500 hover:bg-indigo-600">
                <span className="px-2 font-semibold text-sm text-indigo-600 group-hover:text-white whitespace-nowrap">
                  Get started for free
                </span>
                <RightArrowIcon className="stroke-indigo-600 group-hover:stroke-white" />
              </button>
            </div>  */}
          </div>
        </div>
      </div>
    </section>
  );
}
