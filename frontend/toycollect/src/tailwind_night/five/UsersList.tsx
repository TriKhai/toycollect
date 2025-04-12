import { useState } from "react";

interface User {
  name: string;
  job: string;
  avatar: string;
  tags: string[];
}

const users: User[] = [
  {
    name: "Nguyễn Văn A",
    job: "Frontend Developer",
    avatar: "https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/avatar-anime-40.jpg",
    tags: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    name: "Trần Thị B",
    job: "Backend Developer",
    avatar: "https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/avatar-anime-43.jpg",
    tags: ["Node.js", "Express", "MongoDB"],
  },
  {
    name: "Lê Văn C",
    job: "Full Stack Developer",
    avatar: "https://i.pinimg.com/236x/6a/04/e3/6a04e3c281256a5bd0c39e331def7a05.jpg",
    tags: ["Next.js", "Prisma", "GraphQL"],
  },
  {
    name: "Phạm Thị D",
    job: "UI/UX Designer",
    avatar: "https://i.pinimg.com/236x/75/cf/92/75cf927bfef0accf2b920c14dfeb4680.jpg",
    tags: ["Figma", "Adobe XD", "Illustrator"],
  },
];

export const UsersList = () => {
  const [query, setQuery] = useState("");

  const FILTERS: string[] = [
    "Profile",
    "New York",
    "Relax",
    "Person",
    "Fashion",
  ];

  const filterUsers: User[] =
    query.length > 0
      ? users.filter((user: User) => {
          return user.name.toLowerCase().includes(query.toLowerCase());
        })
      : users;

  return (
    <div className="min-w-[40rem] bg-white p-16 rounded-2xl shadow ">
      <h1 className="text-3xl font-bold mb-2">Users</h1>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="mr-2">
          <input
            type="text"
            placeholder="Search for a part-time job"
            className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-purple-500"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
          />
        </div>

        <div className="space-x-2">
          {FILTERS.map((flt: string) => (
            <a
              href=""
              key={flt}
              className="mb-2 inline-block cursor-pointer rounded-lg bg-white px-4 py-3 hover:bg-purple-500 hover:text-white"
            >
              {flt}
            </a>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filterUsers.map((user: User, index: number) => (
          <div
            key={index}
            className="flex bg-[#ffffff] gap-x-4 p-6 border-[1px] border-white hover:border-gray-400 hover:shadow-lg cursor-pointer"
          >
            <img src={user.avatar} alt="" className="h-24 w-24 rounded-full" />
            <div>
              <h3 className="font-bold">{user.name}</h3>
              <p className="text-sm">{user.job}</p>
              <div className="mt-4 space-x-2">
                {user.tags.map((tag) => (
                  <span
                    className="inline-block rounded-full text-xs text-blue-900 border-slate-400 border-[1px] px-1 "
                    key={tag}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
