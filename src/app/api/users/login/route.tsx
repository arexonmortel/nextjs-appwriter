import {connect} from '@/dbConfig/dbConfig'
import  User from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody
        console.log(reqBody)

        //check if user already exists
        const user = await User.findOne({email})

            if(!user){
                return NextResponse.json({
                    message: 'You do not have an account'
                },{
                    status: 400
                })
            }
        //compare password
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({
                message: 'Invalid password'
            },{
                status: 400
            })
        }
        const tokenData = {
            id : user._id,
            username: user.username,
            email: user.email
        }

        //Create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'})
        const response = NextResponse.json({
            message: 'Login successful',
            success: true,
        });
        response.cookies.set('token', token, {
            httpOnly: true,
        });
        return response
   
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 500
        })
        
    }
}
