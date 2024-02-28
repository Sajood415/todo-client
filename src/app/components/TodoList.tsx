"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import { BASE_API_URL } from "../constants";
import { TodoType } from "../types/types";
import { Todo } from "./Todo";
import { ChevronIcon } from "../../../public/icons/ChevronIcon";
import { ListIcon } from "../../../public/icons/ListIcon";

export const TodoList = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTodos() {
      try {
        const response = await axios.get(`${BASE_API_URL}/todo`);
        const data = response.data;

        data.forEach((todo: any) => {
          todo.id = todo._id;
          delete todo._id;
        });

        setTodos(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }

    getTodos();
  }, []);

  return (
    <details className="w-full" open>
      <summary className="flex border-1 shadow cursor-pointer items-center w-full bg-primary-700 p-4 rounded-md">
        <ListIcon className="basis-10" />
        <span className="font-bold ml-4 text-xl text-white w-full">Your todos</span>
        <ChevronIcon className="w-8 expand" />
      </summary>

      <div
        className={`flex shadow flex-col text-black max-h-[30rem] overflow-x-hidden overflow-scroll bg-white-600 mt-2 rounded-md ${loading || !todos.length ? "justify-center items-center text-2xl h-60" : ""
          }`}
      >
        {loading ? (
          <p>Loading...</p>
        ) : !todos.length && !loading ? (
          <p>No tasks today</p>
        ) : (
          todos.map(({ id, title, completed, createdAt, updatedAt }) => (
            <Todo
              key={id}
              id={id}
              title={title}
              completed={completed}
              createdAt={createdAt}
              updatedAt={updatedAt}
            />
          ))
        )}
      </div>
    </details>
  );
};
