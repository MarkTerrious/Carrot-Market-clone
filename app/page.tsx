const style = {
  main: `bg-gray-100 h-screen flex  
          items-center justify-center p-5 dark:bg-gray-700`,
  box:{
    global:`bg-white shadow-md p-5 rounded-3xl w-full
            max-w-screen-sm dark:bg-gray-500`,
    top: `flex justify-between items-center`,
    topTxtLayout: `flex flex-col`,
    topTransit: `"text-gray-600 font-semibold -mb-1 dark:text-gray-200`,
    topCoolBlue: `text-4xl font-semibold dark:text-gray-100`,
    topCircle: `size-12 rounded-full bg-orange-400`,

    middle: `my-2 flex items-center gap-2`,
    today: `bg-green-400 text-white 
            uppercase px-2.5 py-1.5 text-xs font-medium rounded-full
            hover:bg-green-600 hover:scale-120 hover:duration-300`,
    time: `dark:text-gray-100`,
    progressBar: `relative mb-5`,
    whitePgrsBar: `bg-gray-200 absolute rounded-full w-full h-2`,
    greenPgrsBar: `bg-green-400 absolute rounded-full w-2/3 h-2`,
    textWidget: `flex justify-between text-gray-600 dark:text-black`,
    textDelivered: `text-gray-400 dark:text-gray-200 `,
  },

};

export default function Home() {
  
  return ( 
        <main className={`${style["main"]}`}>
           {/* card box */}
          <div className={`${style["box"]["global"]}`}>
           {/* top of card box */}
            <div className={`${style["box"]["top"]}`}>
              <div className={`${style["box"]["topTxtLayout"]}`}>
                <span className={`${style["box"]["topTransit"]}`}>In transit</span>
                <span className={`${style["box"]["topCoolBlue"]}`}>CoolBlue</span>
              </div>
              <div className={`${style["box"]["topCircle"]}`}/>
            </div>
            {/* middle of card box */}
            <div className={`${style["box"]["middle"]}`}>
              <span className={`${style["box"]["today"]}`}>
                Today
              </span>
              <span className={`${style["box"]["time"]}`}>9:30-10:30</span>
            </div>
            {/* progress bar of card box */}
            <div className={`${style["box"]["progressBar"]}`}>
              <div className={`${style["box"]["whitePgrsBar"]}`}/>
              <div className={`${style["box"]["greenPgrsBar"]}`}/>
            </div>
            {/* text widget of progress bar */}
            <div className={`${style["box"]["textWidget"]}`}>
              <span>Experted</span>
              <span>Sorting center</span>
              <span>In transit</span>
              <span className={`${style["box"]["textDelivered"]}`}>Delivered</span>
            </div>
          </div>
        </main>
  );
}
