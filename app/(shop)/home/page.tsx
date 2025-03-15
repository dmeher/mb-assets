import NavigationBar from "@/components/navigation-bar";

export default function Home() {
  return (
    <div className="h-screen">
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 px-6">
        Start shopping!
      </section>
      <div className="fixed bottom-[0] w-screen shadow-[2px_-5px_25px_0px_rgba(85,_94,_88,_0.5)] h-[4rem] rounded-t-[1rem] p-[1rem] flex items-center justify-center">
        <NavigationBar />
      </div>
    </div>
  );
}
