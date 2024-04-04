const style = {
  main: `
          bg-gray-100 h-screen flex  
          items-center justify-center p-5 dark:bg-gray-700
          sm:bg-green-100  
          md:bg-red-100
          xl:bg-slate-200
          2xl:bg-neutral-200
          `,
  box:{
    global:`
            bg-white shadow-md p-5 rounded-3xl w-full
            max-w-screen-sm flex flex-col gap-2 
            `,
  },
  
  test: <div className=""/>
};

export default function Home() {
  return ( 
        <main className={`${style["main"]}`}>
           {/* card box */}
          <div className={`${style["box"]["global"]}`}>
            {["Nico", "Me", "You", "Yourself"].map((name, index) => (
              <div key={index} className="
              flex items-center gap-5
              p-2.5 rounded-xl 
              ">
                <div className="size-10 bg-cyan-600 rounded-full"/>
                <span className="text-lg font-medium 
                ">{name}</span>
                <div className="
                  flex justify-center items-center
                  size-6 bg-red-600 rounded-full
                  text-white 
                ">
                  <span className="z-10">{index}</span>
                  <div className="
                  size-6 bg-red-600 rounded-full
                  absolute animate-ping
                  "/>
                </div>
              </div>
            ))}
          </div>
        </main>
  );
}
//