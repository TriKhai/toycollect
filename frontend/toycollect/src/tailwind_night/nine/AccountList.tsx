interface Account {
  logo: string;
  title: string;
  subtitle: string;
  account: number;
}

const accounts: Account[] = [
  {
    logo: "https://www.logo.wine/a/logo/Dropbox_(service)/Dropbox_(service)-Icon-Logo.wine.svg",
    title: "Dropbox",
    subtitle: "dropbox.com",
    account: 24,
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/768px-Facebook_Logo_%282019%29.png",
    title: "Facebook",
    subtitle: "facebook.com",
    account: 18,
  },
  {
    logo: "https://cdn1.iconfinder.com/data/icons/flat-and-simple-part-1/128/microsoft-512.png",
    title: "Microsoft",
    subtitle: "microsoft.com",
    account: 29,
  },
  {
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png",
    title: "Pinterest",
    subtitle: "pinterest.com",
    account: 96,
  },
];

export default function AccountList() {
  return (
    <div className="w-[60rem] rounded-3xl p-16 bg-white space-y-8">
      <div className="mr-2 flex space-x-5">
        <input
          type="text"
          placeholder="Search for a part-time job"
          className="w-full p-3 rounded-lg border border-gray-200 focus:outline-none focus:border-purple-500"
        />
        <button className="border-[1px] border-[#cccccc] px-2 size-12 hover:bg-amber-200">
          search
        </button>
      </div>

      <h1 className="text-3xl font-bold">Accounts</h1>
      <div className="w-full space-y-5">
        {accounts.map((account: Account, index: number) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-3xl bg-[#FAF2FE] p-6 cursor-pointer"
          >
            <div className="flex items-center justify-between gap-x-4">
              <img className="size-15" src={account.logo} alt="logo" />
              <div>
                <h2 className="text-2xl font-semibold">{account.title}</h2>
                <p>{account.subtitle}</p>
              </div>
            </div>
            <div>{account.account} accounts</div>
            <button className="rounded-full bg-white size-10 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
