import { NextResponse } from 'next/server';
import { CreateBlogData } from '@/types/blog';

export async function POST(req: Request) {
    try {
        const data: CreateBlogData = await req.json();
        const res = await fetch('http://localhost:8000/api/v1/blog', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                // Authorization: `Bearer ${process.env.API_TOKEN}`,
            },
        });
        console.log({ res })
        if (!res.ok) {
            return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
        }

        const responseData = await res.json();
        return NextResponse.json(responseData, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
