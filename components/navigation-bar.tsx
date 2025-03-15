export default function NavigationBar() {
  return (
    <div className="flex justify-around w-[100%] items-center">
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="flex items-center justify-center h-[2rem] w-[2rem]">
          <i className="bi bi-shop text-[2.5rem] text-secondary"></i>
        </div>
        <div className="font-bold text-secondary">Shop</div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="flex items-center justify-center h-[2rem] w-[2rem]">
          <i className="bi bi-search text-[2.5rem] text-secondary"></i>
        </div>
        <div className="font-bold text-secondary">Explore</div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="flex items-center justify-center h-[2rem] w-[2rem]">
          <i className="bi bi-basket text-[2.5rem] text-secondary"></i>
        </div>
        <div className="font-bold text-secondary">Cart</div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="flex items-center justify-center h-[2rem] w-[2rem]">
          <i className="bi bi-heart text-[2.5rem] text-secondary"></i>
        </div>
        <div className="font-bold text-secondary">Favourite</div>
      </div>
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="flex items-center justify-center h-[2rem] w-[2rem]">
          <i className="bi bi-person text-[2.5rem] text-secondary"></i>
        </div>
        <div className="font-bold text-secondary">Account</div>
      </div>
    </div>
  );
}
