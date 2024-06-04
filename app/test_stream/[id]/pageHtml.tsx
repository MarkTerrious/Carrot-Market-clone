"use client";

import { RealtimeChannel, createClient } from "@supabase/supabase-js";
import { useEffect, useRef } from "react";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY!
);

export default function TestStreamHtml()
{
    const channel = useRef<RealtimeChannel>();


    useEffect(()=>{

    }, []);
    
    
    return (
        <div>
            
        </div>
    )
}