import React from "react";

export default function Collections() {
  const TAGS: string[] = ["Profile", "New York", "Relax", "Person", "Fashion"];
  return (
    <div className="w-full rounded-lg bg-[#EFF0F1] p-16 shadow-lg text-[#0E0E38]">
      <h1 className="text-3xl font-bold">Collections</h1>

      <div className="mt-6 space-x-2">
        {TAGS.map((tag, index) => (
          <a
            className="mb-2 inline-block px-4 py-3 bg-white rounded-lg cursor-pointer hover:text-blue-950"
            key={index}
            href="#"
            id={tag}
          >
            {tag}
          </a>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-14 gap-4">
        <div className="bg-white p-6 rounded-3xl">
          <div>
            <img
              src="https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg"
              alt=""
              className="w-full aspect-video rounded-2xl"
            />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-5">
            <img
              src="https://i.pinimg.com/736x/fa/d5/e7/fad5e79954583ad50ccb3f16ee64f66d.jpg"
              className="aspect-square w-full rounded-2xl border"
              alt=""
            />
            <img
              src="https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/hinh-anime-1.jpg"
              alt=""
              className="aspect-square w-full rounded-2xl border"
            />
            <img
              src="https://i.pinimg.com/236x/c7/58/7e/c7587eec8e58a3eb06f5931d51f6e436.jpg"
              alt=""
              className="aspect-square w-full rounded-2xl border"
            />
          </div>
          <div className="flex pt-6">
            <p className="font-medium text-2xl grow">People</p>
            <p className="flex items-center">
              144{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7 ms-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl">
          <div>
            <img
              src="https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg"
              alt=""
              className="w-full aspect-video rounded-2xl"
            />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-5">
            <img
              src="https://i.pinimg.com/736x/fa/d5/e7/fad5e79954583ad50ccb3f16ee64f66d.jpg"
              className="aspect-square w-full rounded-2xl border"
              alt=""
            />
            <img
              src="https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/hinh-anime-1.jpg"
              alt=""
              className="aspect-square w-full rounded-2xl border"
            />
            <img
              src="https://i.pinimg.com/236x/c7/58/7e/c7587eec8e58a3eb06f5931d51f6e436.jpg"
              alt=""
              className="aspect-square w-full rounded-2xl border"
            />
          </div>
          <div className="flex pt-6">
            <p className="font-medium text-2xl grow">People</p>
            <p className="flex items-center">
              144{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7 ms-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl">
          <div>
            <img
              src="https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg"
              alt=""
              className="w-full aspect-video rounded-2xl"
            />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-5">
            <img
              src="https://i.pinimg.com/736x/fa/d5/e7/fad5e79954583ad50ccb3f16ee64f66d.jpg"
              className="aspect-square w-full rounded-2xl border"
              alt=""
            />
            <img
              src="https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/hinh-anime-1.jpg"
              alt=""
              className="aspect-square w-full rounded-2xl border"
            />
            <img
              src="https://i.pinimg.com/236x/c7/58/7e/c7587eec8e58a3eb06f5931d51f6e436.jpg"
              alt=""
              className="aspect-square w-full rounded-2xl border"
            />
          </div>
          <div className="flex pt-6">
            <p className="font-medium text-2xl grow">People</p>
            <p className="flex items-center">
              144{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-7 ms-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
