import React from "react";
import NavBar from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const SubscriptionPage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/login");
  }

  return (
    <>
      <NavBar />
      <div>SubscriptionPage</div>;
    </>
  );
};

export default SubscriptionPage;
