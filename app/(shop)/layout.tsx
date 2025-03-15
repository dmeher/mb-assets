import NavigationBar from "@/components/navigation-bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container flex-grow">
      {children}
      <div className="sticky bottom-[0] w-screen shadow-[2px_-5px_25px_0px_rgba(85,_94,_88,_0.5)] rounded-t-[1rem] pt-[.5rem] px-[1rem] flex items-center justify-center">
        <NavigationBar />
      </div>
    </div>
  );
}
