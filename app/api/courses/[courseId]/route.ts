import prisma from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function PATCH (req:Request, {params}: {params: {courseId:string}}){

    try {
        const {userId} = auth()
        const {courseId} = params
        const values = await req.json()

        if(!userId){
            return new NextResponse ("Unauthorized", {status: 401})
        }

        const course = await prisma.course.update({
            where: {
                id: courseId,
                userId
            },
            data:{
                ...values
            }
        })

        return  NextResponse.json(course)
    } catch (error) {
        console.log("[COURSEID]", error)
        return new Response("Internal Error", { status: 500 })
    }
}