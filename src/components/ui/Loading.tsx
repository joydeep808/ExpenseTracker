import { Suspense } from "react";


const Loading = () =>{
    return(
        <div className="container w-[350px] min-h-fit rounded-xl shadow-xl p-8  flex flex-col gap-5 mt-6">
                <div className="flex justify-between">
                    <b>Category</b>
                    <span className="w-1/2 h-4 self-center bg-slate-300 rounded-full animate-pulse"></span>
                </div>
                <div className="flex justify-between">
                    <b>Date</b>
                    <span className="w-1/3 h-4 self-center bg-slate-300 rounded-full animate-pulse"></span>
                </div>
                <div className="flex justify-between">
                    <b>Amount</b>
                    <span className="w-1/4 h-4 self-center bg-slate-300 rounded-full animate-pulse"></span>
                </div>
                {/* <div className="flex flex-col gap-4">
                    <b>Description</b>
                    <span className="w-full h-4  bg-slate-300 rounded-full animate-pulse"></span>
                    <span className="w-full h-4  bg-slate-300 rounded-full animate-pulse"></span>
                    <span className="w-1/2 h-4  bg-slate-300 rounded-full animate-pulse"></span>
                </div> */}
            </div>
    )
}

export default Loading;

//things required: expense category, date, amount/money, description.

