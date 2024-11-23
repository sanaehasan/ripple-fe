"use client";
import { useState, useEffect, useContext } from "react";
import { LocationContext } from "@/context/LocationContext";
import { UserContext } from "@/context/UserContext";
import ItemForm from "@/components/Items/ItemForm";
import { postItem } from "../functions/api";

const PostItemPage = () => {
  const { user } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFormSubmit = (FormData) => {
    if (!user) {
      setError("You must be logged in to post an item!");
      setMessage("");
      return;
    }

    const itemData = {
      ...FormData,
      user_id: user.user_id,
      date_listed: new Date().toISOString(),
      date_of_expire: FormData.date_of_expire || null,
    };

    postItem(itemData)
      .then((response) => {
        setMessage("Item Posted Successfully!");
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to post item. Please try again.");
        setMessage("");
      });
  };

  return (
    <section className="min-h-screen">
      <div className="max-w-3xl mx-auto p-4">
        <h2 className="text-3xl font-Quicksand font-bold mb-6 text-center text-textPrimary-light dark:text-textPrimary-dark">LIST AN ITEM</h2>
        <ItemForm onSubmit={handleFormSubmit} user={user} />
        {message && <p className="text-green-500 mt-4">{message}</p>}
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </section>
  );
};

export default PostItemPage;
