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
            <div className="group flex flex-col *:rounded-full">
              <input placeholder="email address" type="email"
              className="input"
              />
              <span
              className="group-focus-within:block hidden"
              >input your email address</span>
              <button className="
              group-invalid:bg-red-500 
              ">submit</button>
              <a href="#" className="text-bigger-hello">Link</a>
            </div>
          </div>
        </main>
  );
}
//