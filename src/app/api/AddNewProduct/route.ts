import { checkProductName, insertNewProduct } from '@/app/Models/insertNewProduct';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const queryParams = new URL(req.url).searchParams;
    const ProductName = queryParams.get('ProductName');
    
    const existingProductName:any = await checkProductName(ProductName as string);

    if (existingProductName.length > 0) {
    return NextResponse.json({ error: ' هذا الإسم موجود بالفعل' }, { status: 409 });
    }
    const result= await insertNewProduct(ProductName as string)
    return NextResponse.json({
      result,
      message: 'Operation of add new product managed successfully',
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
