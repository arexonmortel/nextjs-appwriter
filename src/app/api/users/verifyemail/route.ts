import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'

connect()

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log(reqBody)
        const user = await User.findOne({verifyToken: token, verifyExpiry: {$gt: Date.now()}})
        if(!user){
            return NextResponse.json({
                message: 'Invalid token'
            }, {
                status: 400
            })
        }
        console.log(user)
        user.isVerified = true
        user.verifyToken = undefined
        user.verifyExpiry = undefined 
        await user.save()
        return NextResponse.json({
            message: 'Email verified successfully',
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