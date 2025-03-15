export default function NavigationBar() {
  return (
    <div className="flex justify-around w-[100%] items-center">
      <div className="flex flex-col justify-center items-center gap-[.125rem]">
        <div className="flex items-center justify-center h-[2rem] w-[2rem]">
          <i className="bi bi-shop text-[1.75rem] text-secondary"></i>
        </div>
        <div className="font-semibold text-secondary text-[1rem]">Shop</div>
      </div>
      <div className="flex flex-col justify-center items-center gap-[.125rem]">
        <div className="flex items-center justify-center h-[2rem] w-[2rem]">
          <i className="bi bi-search text-[1.75rem] text-secondary"></i>
        </div>
        <div className="font-semibold text-secondary text-[1rem]">Explore</div>
      </div>
      <div className="flex flex-col justify-center items-center gap-[.125rem]">
        <div className="flex items-center justify-center h-[2rem] w-[2rem]">
          <i className="bi bi-basket text-[1.75rem] text-secondary"></i>
        </div>
        <div className="font-semibold text-secondary text-[1rem]">Cart</div>
      </div>
      <div className="flex flex-col justify-center items-center gap-[.125rem]">
        <div className="flex items-center justify-center h-[2rem] w-[2rem]">
          <i className="bi bi-heart text-[1.75rem] text-secondary"></i>
        </div>
        <div className="font-semibold text-secondary text-[1rem]">Favourite</div>
      </div>
      <div className="flex flex-col justify-center items-center gap-[.125rem]">
        <div className="flex items-center justify-center h-[2rem] w-[2rem]">
          <i className="bi bi-person text-[1.75rem] text-secondary"></i>
        </div>
        <div className="font-semibold text-secondary text-[1rem]">Account</div>
      </div>
    </div>
  );
}
