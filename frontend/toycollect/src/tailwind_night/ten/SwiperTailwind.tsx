export default function SwiperTailwind() {
  const items = [
    {
      img: "assets/images/box-item/banner-08.jpg",
      avatar: "assets/images/avatar/avatar-box-06.jpg",
    },
    {
      img: "assets/images/box-item/banner-09.jpg",
      avatar: "assets/images/avatar/avatar-box-02.jpg",
    },
    {
      img: "assets/images/box-item/banner-10.jpg",
      avatar: "assets/images/avatar/avatar-box-03.jpg",
    },
    {
      img: "assets/images/box-item/banner-08.jpg",
      avatar: "assets/images/avatar/avatar-box-04.jpg",
    },
    {
      img: "assets/images/box-item/banner-09.jpg",
      avatar: "assets/images/avatar/avatar-box-01.jpg",
    },
  ];

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="relative w-[800px] h-[500px]">
        {items.map((item, index) => (
          <div
            key={index}
            className={`absolute w-[700px] h-[400px] rounded-lg overflow-hidden transition-all duration-300 hover:z-50 hover:scale-105
              ${
                index > 0
                  ? `translate-x-${index * 14} z-[${50 - index * 10}]`
                  : "z-50"
              }`}
            style={{
              left: `${index * 50}px`,
              zIndex: 50 - index * 10,
              transform: `scale(${1 - index * 0.1})`,
            }}
          >
            <img
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              src={item.img}
              alt=""
            />
            <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-md">
              <img
                src={item.avatar}
                className="w-10 h-10 rounded-full"
                alt="Avatar"
              />
              <div>
                <span className="text-gray-500 text-sm">Posted by:</span>
                <h6 className="text-gray-900 font-bold">Cody Fisher</h6>
              </div>
            </div>
            <button className="absolute bottom-2 right-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Place Bid
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
