"use client";

import React from "react";
import axios from "axios";

import { TodoType } from '../types/types'
import { CheckCircleIcon } from "../../../public/icons/CheckCircleIcon";
import { DotIcon } from "../../../public/icons/DotIcon";
import { BASE_API_URL } from "../constants";

export const Todo = ({ title, id, completed, createdAt, updatedAt }: TodoType) => {
  const truncatedTitle = title.length > 20 ? `${title.slice(0, 20)}...` : title;

  const onClick = async (event: React.MouseEvent, id: string, action: string) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      if (action === "UPDATE") {
        await axios.put(`${BASE_API_URL}/todo/${id}`, { completed: !completed }, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else if (action === "DELETE") {
        await axios.delete(`${BASE_API_URL}/todo/${id}`);
      }

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  return (
    <details
      id={id}
      className="mt-2 py-4 text-black cursor-pointer"
    >
      <summary className="flex items-center text-xl border-primary-800 border-b px-4 pb-2">
        <CheckCircleIcon
          onClick={(e: React.MouseEvent) => onClick(e, id, "UPDATE")}
          className="w-6 h-6 mr-4 mark-complete cursor-pointer"
          fill={completed ? "#10B981" : "rgba(0,0,0,0.2)"}
        />
        {truncatedTitle}
        <DotIcon className="w-6 h-6 ml-auto" />
      </summary>

      <div className="flex flex-col py-4 bg-white-800 cursor-auto">
        <p className="px-4 py-1 rounded-md">
          <b>Completed: </b>
          {completed ? "Completed" : "Not Completed"}
        </p>

        {completed && (
          <p className="px-4 py-1 rounded-md">
            <b>Completed At: </b>
            {convertDate(updatedAt as string)}
          </p>
        )}

        <p className="px-4 py-2 rounded-md">
          <b>Created At: </b>
          {convertDate(createdAt)}
        </p>
        <button
          onClick={(e: React.MouseEvent) => onClick(e, id, "DELETE")}
          className="bg-danger-300 transition hover:scale-95 text-danger px-4 py-2 mt-4 mx-4 rounded-md"
        >
          Delete
        </button>
      </div>
    </details>
  );
};

function convertDate(date: string) {
  const dateObj = new Date(date);
  return dateObj.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}
