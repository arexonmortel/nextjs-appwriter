import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'

connect()

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const {token, password} = reqBody
        console.log(reqBody)
        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordExpiry: {$gt: Date.now()}})
        if(!user){
            return NextResponse.json({
                message: 'Invalid token'
            }, {
                status: 400
            })
        }
        console.log(user)
        
        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        user.password = hashedPassword
        user.forgotPasswordToken = undefined
        user.forgotPasswordExpiry = undefined 
        await user.save()

        return NextResponse.json({
            message: 'New password set successfully',
            success: true
        }, {
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