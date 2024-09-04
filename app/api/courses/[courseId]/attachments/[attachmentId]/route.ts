import prismadb from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function DELETE (req: Request, {params}: {params:{courseId: string, attachmentId: string}}){

    try {
        const {userId} = auth()

        if(!userId){
            return new NextResponse("Unauthorized", {status: 401})
        }
        
        const courseOwner = await prismadb.course.findUnique({
            where:{
                id: params.courseId,
                userId: userId
            }
        })
        if(!courseOwner){
            return new NextResponse("Unauthorized", {status: 401})
        }

        const attachment = await prismadb.attachment.delete({
            where: {
                id: params.attachmentId,
                courseId: params.courseId
            }
        })

        return NextResponse.json(attachment)
    } catch (error) {
        console.log("[COURSE_ID_ATTACHMENTS]", error)  
        return new NextResponse("Internal Error", { status: 500 })
    }

}