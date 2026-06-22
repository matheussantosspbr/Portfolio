// app/api/users/route.ts
import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";


export async function POST(request: NextRequest) {

    try {
        const body = await request.json();
        const { name, email, message, phone } = body;

        const {RESEND_EMAIL_TO, RESEND_API_KEY} = process.env
        const resend = new Resend(RESEND_API_KEY)

        if(!name) return NextResponse.json({ error: "NAME_IS_REQUIRED" }, { status: 400 })
        if(!email) return NextResponse.json({ error: "EMAIL_IS_REQUIRED"}, { status: 400 })
        if(!message) return NextResponse.json({ error: "MESSAGE_IS_REQUIRED"}, { status: 400 })

        const res = await resend.emails.send({
            from: `Contact <${RESEND_EMAIL_TO}>`,
            to: RESEND_EMAIL_TO || "",
            template:{
                id:"contact",
                variables:{
                    name,
                    email,
                    message,
                    phone
                }
            }
        })

        if (res.data == null) {
            return NextResponse.json({ error: "INTERNAL_SERVER_ERROR", status: 500 });
        }

        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: "INTERNAL_SERVER_ERROR", status: 500 });
    }
}
