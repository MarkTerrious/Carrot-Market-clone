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
            md:flex-row 
            *:outline-none
            has-[:invalid]:bg-red-100
            `,
  },
  
  test: <div className=""/>
};

export default function Home() {
  return ( 
        <main className={`${style["main"]}`}>
           {/* card box */}
          <div className={`${style["box"]["global"]}`}>
           <input className="w-full rounded-full h-12
           bg-gray-200 px-5 focus:ring ring-gray-800 
           duration-200 
           placeholder:drop-shadow-sm
           focus:placeholder:text-gray-700
           invalid:placeholder:text-red-300
           invalid:text-red-500
           peer
           "
           placeholder="Search here..." 
           type="email" 
           required/>
           <span className="hidden text-red-400 font-bold text-sm 
           peer-invalid:block">incorrect</span>
           <button className="bg-opacity-80 text-white py-2 
           rounded-full active:scale-90 transition-transform
           duration-100
           font-medium bg-gradient-to-tr from-cyan-500 to-purple-400
           md:px-10 md:py-1 
           peer-invalid:bg-gradient-to-tr 
           peer-invalid:from-cyan-500/50
           peer-invalid:to-purple-400/40
           ">Search</button>
          </div>
        </main>
  );
}
//