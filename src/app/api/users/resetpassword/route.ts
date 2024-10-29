import {connect} from '@/dbConfig/dbConfig'
import { sendEmail } from '@/helpers/mailer'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'


connect()

export async function POST(request: NextRequest){
    try {
        const { email } = await request.json()
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({
                message: 'You do not have an account'
            }, {
                status: 400
            })
        }
        // Send and email for password reset
        await sendEmail({ email: user.email, emailType: 'RESET', userId: user._id })

        return NextResponse.json({
            message: 'Email sent',
            success: true
        },{
            status: 200
        })
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 500
        })
        
    }
}