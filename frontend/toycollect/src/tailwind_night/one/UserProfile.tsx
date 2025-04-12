// Default export
const UserProfile = () => {
  return (
    <div className="w-[36rem] mt-5 rounded-lg p-12 flex gap-x-4 bg-white">
      <img
        src="https://i.pinimg.com/1200x/94/e8/64/94e864222b76e482146757dedb754b4d.jpg"
        className="w-32 self-start rounded-full border-[11px] border-[#E6EFFA]"
        alt=""
      />
      <div className="space-y-7 text-[#1C2B62]">
        <div>
          <h1 className="text-3xl font-bold">Lý Trí Khải</h1>
          <h2 className="mt-1">3D Artist</h2>
        </div>
        <div className="space-i-4">
          <p className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6 inline-block mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
            4.5 Raiting
          </p>
          <p className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6 inline-block mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
            4998 Reviews
          </p>
          <p className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6  inline-block mr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            423 Students
          </p>
        </div>
        <p className="text-lg">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sint
          voluptatem illo aperiam? Ipsum modi, officia deleniti sed doloremque
          exercitationem autem, officiis aut nesciunt maiores recusandae
          distinctio. Vel recusandae nemo rerum dolorum cumque. Doloribus
          commodi numquam aliquid ipsam nostrum eius recusandae, totam tempora
          ad maiores sed, corrupti consequuntur earum non nesciunt.
        </p>
        <button className="rounded-md border-2 border-[#C4CADF] p-2">Show more</button>
      </div>
    </div>
  );
};

export default UserProfile;
