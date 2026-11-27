import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { file } = body; // This is the compressed base64 string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const formData = new URLSearchParams();
    formData.append('image', file);

    const IMGBB_API_KEY = process.env.IMGBB_API_KEY;
    
    // Send directly to ImgBB
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      // Returns the public image link to the frontend
      return NextResponse.json({ link: data.data.url });
    } else {
      console.error("ImgBB Error:", data);
      throw new Error("ImgBB API rejected the upload");
    }

  } catch (error: any) {
    console.error("Image Upload Error:", error.message);
    return NextResponse.json({ error: 'Failed to upload payment screenshot' }, { status: 500 });
  }
}