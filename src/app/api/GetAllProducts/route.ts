import { getallproducts } from '@/app/Models/getAllProducts';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    
    // const existingProductName:any = await checkProductName(ProductName as string);

    // if (existingProductName.length > 0) {
    // return NextResponse.json({ error: ' هذا الإسم موجود بالفعل' }, { status: 409 });
    // }
    const result= await getallproducts()
    return NextResponse.json({
      result,
      message: 'Operation of get all products managed successfully',
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
