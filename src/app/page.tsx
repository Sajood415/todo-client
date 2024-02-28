import Image from "next/image";
import { Input } from "../app/components/Input";
import { TodoList } from "../app/components/TodoList";

const Home = () => {
  return (
    <main className="relative min-h-screen w-[100%] flex items-center justify-center bg-cover bg-center bg-no-repeat before:bg-inherit before:h-full before:w-full before:absolute before:backdrop-blur overflow-hidden" style={{ backgroundImage: "url(/images/image.webp)" }}>
      <div className="max-w-md mx-auto z-10 w-full flex flex-col gap-6 items-center justify-center p-4 sm:p-6">
        <Image
          src="/images/profile.jpg"
          alt="User Profile"
          width={120}
          height={120}
          priority
          className="rounded-full border-4 border-gray-100 h-24 w-24 sm:h-32 sm:w-32 max-w-full"
        />
        <Input />
        <TodoList />
      </div>
    </main>
  );
};

export default Home;
